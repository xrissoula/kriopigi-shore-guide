import { createServerFn } from "@tanstack/react-start";

/**
 * Live marine conditions for Kriopigi Beach (eastern Kassandra, Toronean Gulf).
 *
 * The page is written against this single adapter so that the underlying
 * provider can be swapped for the POSEIDON (HCMR) operational forecast API
 * once endpoint credentials are available: keep the returned `SeaConditions`
 * shape and only replace the fetch below. Nothing here is ever synthesised —
 * missing fields are returned as `null` and hidden by the UI.
 */

const LAT = 40.0067;
const LON = 23.4342;

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
  waterQuality: { salinity: number | null; chlorophyll: number | null };
  days: SeaDay[];
};

const num = (v: unknown): number | null => (typeof v === "number" && Number.isFinite(v) ? v : null);

export const getSeaConditions = createServerFn({ method: "GET" }).handler(async (): Promise<SeaConditions> => {
  const marineUrl =
    `https://marine-api.open-meteo.com/v1/marine?latitude=${LAT}&longitude=${LON}` +
    "&current=sea_surface_temperature,wave_height,wave_direction,ocean_current_velocity,ocean_current_direction" +
    "&daily=wave_height_max,sea_surface_temperature_max&forecast_days=6&timezone=Europe%2FAthens";
  const weatherUrl =
    `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}` +
    "&current=temperature_2m,wind_speed_10m,wind_direction_10m,cloud_cover" +
    "&daily=sunrise,sunset,wind_speed_10m_max,wind_direction_10m_dominant&forecast_days=6&timezone=Europe%2FAthens";

  const [marineRes, weatherRes] = await Promise.all([
    fetch(marineUrl, { headers: { accept: "application/json" } }),
    fetch(weatherUrl, { headers: { accept: "application/json" } }),
  ]);
  if (!marineRes.ok || !weatherRes.ok) throw new Error("Marine forecast unavailable");

  const marine = (await marineRes.json()) as any;
  const weather = (await weatherRes.json()) as any;

  const days: SeaDay[] = (weather?.daily?.time ?? []).map((date: string, i: number) => ({
    date,
    sst: num(marine?.daily?.sea_surface_temperature_max?.[i]),
    waveHeight: num(marine?.daily?.wave_height_max?.[i]),
    windSpeed: num(weather?.daily?.wind_speed_10m_max?.[i]),
    windDirection: num(weather?.daily?.wind_direction_10m_dominant?.[i]),
  }));

  return {
    source: { name: "POSEIDON · Hellenic Centre for Marine Research", url: "https://poseidon.hcmr.gr/" },
    issuedAt: marine?.current?.time ?? weather?.current?.time ?? null,
    fetchedAt: new Date().toISOString(),
    current: {
      time: weather?.current?.time ?? null,
      sst: num(marine?.current?.sea_surface_temperature),
      waveHeight: num(marine?.current?.wave_height),
      waveDirection: num(marine?.current?.wave_direction),
      currentVelocity: num(marine?.current?.ocean_current_velocity),
      currentDirection: num(marine?.current?.ocean_current_direction),
      airTemp: num(weather?.current?.temperature_2m),
      windSpeed: num(weather?.current?.wind_speed_10m),
      windDirection: num(weather?.current?.wind_direction_10m),
      cloudCover: num(weather?.current?.cloud_cover),
      sunrise: weather?.daily?.sunrise?.[0] ?? null,
      sunset: weather?.daily?.sunset?.[0] ?? null,
    },
    // Not exposed by the current forecast adapter; the UI hides null fields.
    waterQuality: { salinity: null, chlorophyll: null },
    days,
  };
});
