import json
import math
import subprocess
import urllib.request
from datetime import datetime, timezone
from pathlib import Path
from zoneinfo import ZoneInfo

import pandas as pd
import xarray as xr


LAT = 40.046
LON = 23.480

COPERNICUS = "copernicusmarine"

CURRENT_FILE = Path("kriopigi_currents.nc")
TEMP_FILE = Path("kriopigi_temperature.nc")
WAVE_FILE = Path("kriopigi_waves.nc")


def run(cmd):
    subprocess.run(cmd, check=True)


def direction_label(degrees):
    labels = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
    return labels[int((degrees + 22.5) / 45) % 8]


def fetch_copernicus():
    now = datetime.now(timezone.utc)
    start = (now.replace(minute=0, second=0, microsecond=0)).strftime("%Y-%m-%d %H:%M:%S")
    end = (now + pd.Timedelta(hours=48)).strftime("%Y-%m-%d %H:%M:%S")

    # Currents
    run([
        COPERNICUS, "subset",
        "--dataset-id", "cmems_mod_med_phy-cur_anfc_4.2km_PT15M-i",
        "--minimum-longitude", str(LON),
        "--maximum-longitude", str(LON),
        "--minimum-latitude", str(LAT),
        "--maximum-latitude", str(LAT),
        "--start-datetime", start,
        "--end-datetime", end,
        "--output-filename", str(CURRENT_FILE),
        "--overwrite"
    ])

    # Surface temperature
    run([
        COPERNICUS, "subset",
        "--dataset-id", "cmems_mod_med_phy-tem_anfc_4.2km-2D_PT1H-m",
        "--minimum-longitude", str(LON),
        "--maximum-longitude", str(LON),
        "--minimum-latitude", str(LAT),
        "--maximum-latitude", str(LAT),
        "--start-datetime", start,
        "--end-datetime", end,
        "--output-filename", str(TEMP_FILE),
        "--overwrite"
    ])

    # Waves
    run([
        COPERNICUS, "subset",
        "--dataset-id", "cmems_mod_med_wav_anfc_4.2km_PT1H-i",
        "--variable", "VHM0",
        "--variable", "VMDR",
        "--variable", "VTM02",
        "--minimum-longitude", str(LON),
        "--maximum-longitude", str(LON),
        "--minimum-latitude", str(LAT),
        "--maximum-latitude", str(LAT),
        "--start-datetime", start,
        "--end-datetime", end,
        "--output-filename", str(WAVE_FILE),
        "--overwrite"
    ])


def read_copernicus():
    now_utc = pd.Timestamp.now(tz="UTC").tz_localize(None)

    # Currents
    cur = xr.open_dataset(CURRENT_FILE)
    c = cur.sel(time=now_utc, method="pad")

    u = c.uo.values.squeeze().item()
    v = c.vo.values.squeeze().item()

    current_speed = math.sqrt(u ** 2 + v ** 2)
    current_direction = (math.degrees(math.atan2(u, v)) + 360) % 360

    current_lat = c.latitude.values.squeeze().item()
    current_lon = c.longitude.values.squeeze().item()

    # Temperature
    temp = xr.open_dataset(TEMP_FILE)
    t = temp.sel(time=now_utc, method="pad")

    sea_temp = t.thetao.values.squeeze().item()

    # Waves
    wav = xr.open_dataset(WAVE_FILE)
    w = wav.sel(time=now_utc, method="pad")

    wave_height = w.VHM0.values.squeeze().item()
    wave_direction = w.VMDR.values.squeeze().item()
    wave_period = w.VTM02.values.squeeze().item()

    return {
        "marine_model_grid": {
            "latitude": round(current_lat, 4),
            "longitude": round(current_lon, 4),
        },
        "sea_temperature_c": round(sea_temp, 1),
        "current": {
            "speed_m_s": round(current_speed, 4),
            "speed_cm_s": round(current_speed * 100, 1),
            "toward_degrees": round(current_direction),
            "toward": direction_label(current_direction),
            "model_time": str(c.time.values),
        },
        "waves": {
            "significant_height_m": round(wave_height, 2),
            "mean_period_s": round(wave_period, 1),
            "from_degrees": round(wave_direction),
            "from": direction_label(wave_direction),
            "model_time": str(w.time.values),
        },
        "temperature_model_time": str(t.time.values),
    }


def fetch_weather():
    url = (
        "https://api.open-meteo.com/v1/forecast"
        f"?latitude={LAT}"
        f"&longitude={LON}"
        "&hourly=temperature_2m,apparent_temperature,cloud_cover,"
        "precipitation,weather_code,visibility,"
        "wind_speed_10m,wind_direction_10m,wind_gusts_10m"
        "&wind_speed_unit=ms"
        "&timezone=Europe%2FAthens"
        "&forecast_days=2"
    )

    with urllib.request.urlopen(url) as response:
        data = json.load(response)

    h = data["hourly"]

    now_local = datetime.now(ZoneInfo("Europe/Athens")).replace(tzinfo=None)
    times = [datetime.fromisoformat(t) for t in h["time"]]
    i = min(range(len(times)), key=lambda n: abs(times[n] - now_local))

    wind_direction = h["wind_direction_10m"][i]

    weather_codes = {
        0: "Clear sky",
        1: "Mainly clear",
        2: "Partly cloudy",
        3: "Overcast",
        45: "Fog",
        48: "Rime fog",
        51: "Light drizzle",
        53: "Moderate drizzle",
        55: "Dense drizzle",
        61: "Slight rain",
        63: "Moderate rain",
        65: "Heavy rain",
        80: "Slight rain showers",
        81: "Moderate rain showers",
        82: "Heavy rain showers",
        95: "Thunderstorm",
        96: "Thunderstorm with slight hail",
        99: "Thunderstorm with heavy hail",
    }

    code = h["weather_code"][i]

    return {
        "weather_model_grid": {
            "latitude": data["latitude"],
            "longitude": data["longitude"],
        },
        "forecast_time_local": h["time"][i],
        "air_temperature_c": h["temperature_2m"][i],
        "apparent_temperature_c": h["apparent_temperature"][i],
        "cloud_cover_percent": h["cloud_cover"][i],
        "precipitation_mm": h["precipitation"][i],
        "weather": weather_codes.get(code, f"Code {code}"),
        "atmospheric_visibility_km": round(h["visibility"][i] / 1000, 1),
        "wind": {
            "speed_m_s": h["wind_speed_10m"][i],
            "gust_m_s": h["wind_gusts_10m"][i],
            "from_degrees": wind_direction,
            "from": direction_label(wind_direction),
        },
    }


def main():
    fetch_copernicus()

    marine = read_copernicus()
    weather = fetch_weather()

    output = {
        "location": {
            "name": "Kriopigi Beach",
            "latitude": LAT,
            "longitude": LON,
        },
        "generated_at_utc": datetime.now(timezone.utc).isoformat(),
        "marine": marine,
        "weather": weather,
        "sources": {
            "marine": "Copernicus Marine Service",
            "weather": "Open-Meteo",
        },
    }

    json_text = json.dumps(output, indent=2, ensure_ascii=False)

    (Path(__file__).resolve().parent / "kriopigi_conditions.json").write_text(json_text + "\n")
    print(json_text)


if __name__ == "__main__":
    main()
