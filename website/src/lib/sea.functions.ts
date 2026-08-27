import { createServerFn } from "@tanstack/react-start";

/**
 * Current marine conditions for Kriopigi Beach.
 *
 * Immediate marine conditions come from the Kriopigi data pipeline:
 *   Copernicus Marine -> GitHub Actions -> kriopigi_conditions.json
 *
 * Atmospheric conditions come from Open-Meteo.
 *
 * The public-facing page consumes the normalized SeaConditions shape below,
 * so providers can change later without rewriting the UI.
 */

const LAT = 40.046;
const LON = 23.48;

const CONDITIONS_URL =
  "https://raw.githubusercontent.com/xrissoula/kriopigi-shore-guide/main/data-pipeline/kriopigi_conditions.json";

export type SeaDay = {
  date: string;
  sst: number | null;
  waveHeight: number | null;
  windSpeed: number | null;
  windDirection: number | null;
};

export type SeaConditions = {
  source: { name: string; url: string };
  issuedAt: string | null;
  fetchedAt: string;
  current: {
    time: string | null;
    sst: number | null;
    waveHeight: number | null;
    waveDirection: number | null;
    currentVelocity: number | null;
    currentDirection: number | null;
    airTemp: number | null;
    windSpeed: number | null;
    windDirection: number | null;
    cloudCover: number | null;
    sunrise: string | null;
    sunset: string | null;
  };
  waterQuality: {
    salinity: number | null;
    chlorophyll: number | null;
  };
  days: SeaDay[];
};

const num = (v: unknown): number | null =>
  typeof v === "number" && Number.isFinite(v) ? v : null;

export const getSeaConditions = createServerFn({ method: "GET" }).handler(
  async (): Promise<SeaConditions> => {
    /*
     * Immediate conditions produced hourly by our GitHub Actions pipeline.
     */
    const conditionsRes = await fetch(CONDITIONS_URL, {
      headers: { accept: "application/json" },
      cache: "no-store",
    });

    if (!conditionsRes.ok) {
      throw new Error("Current Kriopigi conditions unavailable");
    }

    const live = (await conditionsRes.json()) as any;

    /*
     * Open-Meteo remains useful for sunrise/sunset and the existing
     * multi-day auxiliary cards. These values are not used to replace
     * the Copernicus current marine conditions.
     */
    const weatherUrl =
      `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}` +
      "&daily=sunrise,sunset,wind_speed_10m_max,wind_direction_10m_dominant" +
      "&forecast_days=6&timezone=Europe%2FAthens";

    const marineDailyUrl =
      `https://marine-api.open-meteo.com/v1/marine?latitude=${LAT}&longitude=${LON}` +
      "&daily=wave_height_max,sea_surface_temperature_max" +
      "&forecast_days=6&timezone=Europe%2FAthens";

    const [weatherRes, marineDailyRes] = await Promise.all([
      fetch(weatherUrl, {
        headers: { accept: "application/json" },
        cache: "no-store",
      }),
      fetch(marineDailyUrl, {
        headers: { accept: "application/json" },
        cache: "no-store",
      }),
    ]);

    const weather = weatherRes.ok ? ((await weatherRes.json()) as any) : null;
    const marineDaily = marineDailyRes.ok
      ? ((await marineDailyRes.json()) as any)
      : null;

    const days: SeaDay[] = (weather?.daily?.time ?? []).map(
      (date: string, i: number) => ({
        date,
        sst: num(marineDaily?.daily?.sea_surface_temperature_max?.[i]),
        waveHeight: num(marineDaily?.daily?.wave_height_max?.[i]),

        // Open-Meteo wind values are km/h by default, which is exactly
        // what the existing sea-narrative helpers expect.
        windSpeed: num(weather?.daily?.wind_speed_10m_max?.[i]),
        windDirection: num(
          weather?.daily?.wind_direction_10m_dominant?.[i],
        ),
      }),
    );

    const currentSpeedMs = num(live?.marine?.current?.speed_m_s);
    const windSpeedMs = num(live?.weather?.wind?.speed_m_s);

    /*
     * Existing Conditions UI expects currentVelocity and windSpeed
     * in km/h.
     *
     * Copernicus/Open-Meteo pipeline JSON stores both in m/s.
     */
    const currentVelocityKmh =
      currentSpeedMs == null ? null : currentSpeedMs * 3.6;

    const windSpeedKmh =
      windSpeedMs == null ? null : windSpeedMs * 3.6;

    return {
      source: {
        name: "Copernicus Marine + Open-Meteo",
        url: "https://marine.copernicus.eu/",
      },

      /*
       * generated_at_utc records when our hourly pipeline assembled
       * this conditions snapshot.
       */
      issuedAt: live?.generated_at_utc ?? null,
      fetchedAt: new Date().toISOString(),

      current: {
        time: live?.generated_at_utc ?? null,

        sst: num(live?.marine?.sea_temperature_c),

        waveHeight: num(
          live?.marine?.waves?.significant_height_m,
        ),
        waveDirection: num(
          live?.marine?.waves?.from_degrees,
        ),

        currentVelocity: currentVelocityKmh,
        currentDirection: num(
          live?.marine?.current?.toward_degrees,
        ),

        airTemp: num(live?.weather?.air_temperature_c),

        windSpeed: windSpeedKmh,
        windDirection: num(
          live?.weather?.wind?.from_degrees,
        ),

        cloudCover: num(
          live?.weather?.cloud_cover_percent,
        ),

        sunrise: weather?.daily?.sunrise?.[0] ?? null,
        sunset: weather?.daily?.sunset?.[0] ?? null,
      },

      /*
       * Not yet supplied by the current Kriopigi pipeline.
       * The UI already hides null values.
       */
      waterQuality: {
        salinity: null,
        chlorophyll: null,
      },

      days,
    };
  },
);
