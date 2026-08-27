import type { SeaConditions } from "./sea.functions";

/**
 * Ecological inference layer. Every sentence is a cautious likelihood
 * statement derived from measured sea state, temperature and season —
 * never a claim that an animal has been seen.
 */

export type Season = "spring" | "summer" | "autumn" | "winter";

export function seasonOf(date: Date): Season {
  const m = date.getMonth() + 1;
  if (m >= 3 && m <= 5) return "spring";
  if (m >= 6 && m <= 8) return "summer";
  if (m >= 9 && m <= 11) return "autumn";
  return "winter";
}

export const compass = (deg: number | null): string => {
  if (deg == null) return "—";
  const points = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  return points[Math.round(deg / 22.5) % 16];
};

export const knots = (kmh: number | null): number | null => (kmh == null ? null : Math.round(kmh / 1.852));

export type SeaState = "glassy" | "calm" | "moderate" | "rough";

export function seaState(waveHeight: number | null): SeaState {
  if (waveHeight == null) return "calm";
  if (waveHeight < 0.15) return "glassy";
  if (waveHeight < 0.5) return "calm";
  if (waveHeight < 1) return "moderate";
  return "rough";
}

export type Outlook = { verdict: string; detail: string };

export function snorkelOutlook(waveHeight: number | null, windKmh: number | null): Outlook {
  const kn = knots(windKmh) ?? 0;
  const w = waveHeight ?? 0;
  if (w >= 1 || kn >= 22)
    return {
      verdict: "Not recommended today",
      detail: "Breaking waves and strong wind make entry and orientation difficult along this shore.",
    };
  if (w >= 0.6 || kn >= 16)
    return {
      verdict: "Marginal due to wave action",
      detail: "Surge around the rocky edges and suspended sand are likely to reduce visibility close in.",
    };
  if (w >= 0.35 || kn >= 11)
    return {
      verdict: "Good for experienced swimmers",
      detail: "A light chop is likely; the sheltered coves stay the most comfortable option.",
    };
  return {
    verdict: "Excellent for snorkeling",
    detail: "Low wave energy and light wind often mean the meadow edge is clearly visible from the surface.",
  };
}

/** Short, translatable description of wind strength. */
export function windPhrase(windKmh: number | null): string {
  const kn = knots(windKmh);
  if (kn == null) return "wind unavailable";
  if (kn <= 6) return "light air";
  if (kn <= 14) return "a steady breeze";
  if (kn <= 21) return "a fresh wind";
  return "a strong wind";
}

export function naturalistNote(d: SeaConditions, season: Season): string[] {
  const state = seaState(d.current.waveHeight);
  const out: string[] = [];

  if (state === "glassy" || state === "calm")
    out.push(
      "Low swell and light wind make today good conditions for observing fish, and the edge of the Posidonia meadow is often clearly visible from the surface.",
    );
  else if (state === "moderate")
    out.push(
      "A moderate sea means surge around the rocks and suspended sand that may reduce visibility, especially in the first few metres.",
    );
  else
    out.push(
      "A rough sea makes the shoreline uncomfortable for beginners; today is better spent watching the water from land than entering it.",
    );


  if (season === "spring")
    out.push(
      "In spring, wrasse are often in breeding colours, cuttlefish egg clusters may be found attached to seagrass and debris, and Posidonia is in its flowering and fruiting period.",
    );
  if (season === "summer")
    out.push(
      "Warm summer water usually holds shoals of juvenile fish in the shallows, with sea bream and salema grazing over sand and seagrass through the day.",
    );
  if (season === "autumn")
    out.push(
      "In autumn, larger baitfish schools gather offshore and migratory predators such as tuna may pass through deeper water beyond the meadow.",
    );
  if (season === "winter")
    out.push(
      "Winter brings rougher seas and cold water, so snorkeling opportunities are few; the strand line after a storm is often the most rewarding thing to read.",
    );

  if (state !== "rough")
    out.push(
      "Early morning and late afternoon generally offer the calmest water and the best chance of seeing octopus near rocky crevices.",
    );

  return out;
}

export type BestTime = { label: string; note: string };

export function bestTimes(d: SeaConditions): BestTime[] {
  const rough = seaState(d.current.waveHeight) === "rough";
  return [
    {
      label: "Morning",
      note: rough
        ? "Usually the least wind-affected part of the day, though swell may persist from overnight."
        : "Calmest conditions before the afternoon breeze develops; low sun angle still lights the shallows.",
    },
    {
      label: "Afternoon",
      note: "Highest light penetration into the meadow, but the sea breeze often builds a surface chop.",
    },
    {
      label: "Sunset",
      note: "Wind commonly eases again; a good hour for watching cormorants fish and octopus emerge.",
    },
  ];
}

export type LikelySpecies = {
  sci: string;
  common: string;
  img: string;
  reason: string;
};

const S = {
  sarpa: {
    sci: "Sarpa salpa",
    common: "Salema porgy",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Salpa_%28Sarpa_salpa%29%2C_Parque_natural_de_la_Arr%C3%A1bida%2C_Portugal%2C_2020-07-31%2C_DD_54.jpg/330px-Salpa_%28Sarpa_salpa%29%2C_Parque_natural_de_la_Arr%C3%A1bida%2C_Portugal%2C_2020-07-31%2C_DD_54.jpg",
  },
  octopus: {
    sci: "Octopus vulgaris",
    common: "Common octopus",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Octopus2.jpg/330px-Octopus2.jpg",
  },
  tinca: {
    sci: "Symphodus tinca",
    common: "Peacock wrasse",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Symphodus_tinca_m%C3%A2le_avec_des_femelles_%28Linnaeus%2C_1758%29.jpg/330px-Symphodus_tinca_m%C3%A2le_avec_des_femelles_%28Linnaeus%2C_1758%29.jpg",
  },
  sepia: {
    sci: "Sepia officinalis",
    common: "Common cuttlefish",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Sepia_com%C3%BAn_%28Sepia_officinalis%29%2C_Parque_natural_de_la_Arr%C3%A1bida%2C_Portugal%2C_2020-07-21%2C_DD_62.jpg/330px-Sepia_com%C3%BAn_%28Sepia_officinalis%29%2C_Parque_natural_de_la_Arr%C3%A1bida%2C_Portugal%2C_2020-07-21%2C_DD_62.jpg",
  },
  atherina: {
    sci: "Atherina boyeri",
    common: "Big-scale sand smelt",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Atherina_boyeri.jpg/330px-Atherina_boyeri.jpg",
  },
  cormorant: {
    sci: "Phalacrocorax carbo sinensis",
    common: "Continental great cormorant",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/2021-05-05_Phalacrocorax_carbo_carbo%2C_Killingworth_Lake%2C_Northumberland_1-1.jpg/330px-2021-05-05_Phalacrocorax_carbo_carbo%2C_Killingworth_Lake%2C_Northumberland_1-1.jpg",
  },
  posidonia: {
    sci: "Posidonia oceanica",
    common: "Neptune grass",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Posidonia_oceanica_%28L.%29_Delile.jpg/330px-Posidonia_oceanica_%28L.%29_Delile.jpg",
  },
  diplodus: {
    sci: "Diplodus vulgaris",
    common: "Common two-banded sea bream",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Diplodus_vulgaris_Sardinia.jpg/330px-Diplodus_vulgaris_Sardinia.jpg",
  },
};

export function likelySpecies(d: SeaConditions, season: Season): LikelySpecies[] {
  const state = seaState(d.current.waveHeight);
  const sst = d.current.sst;
  const calm = state === "glassy" || state === "calm";
  const list: LikelySpecies[] = [];

  if (calm)
    list.push({
      ...S.sarpa,
      reason: "Grazing schools are often easiest to observe in calm water over the Posidonia meadow.",
    });
  if (state !== "rough")
    list.push({
      ...S.octopus,
      reason: "Early morning offers the best chance of seeing individuals near rocky crevices.",
    });
  if (sst != null && sst >= 19)
    list.push({
      ...S.tinca,
      reason: "Males remain active around rocky reefs while the water stays warm.",
    });
  if (season === "spring")
    list.push({
      ...S.sepia,
      reason: "Spring is the season when egg clusters may be found attached to seagrass and sunken branches.",
    });
  if (season === "summer" || season === "autumn")
    list.push({
      ...S.diplodus,
      reason: "Small schools often work the sand-and-rock boundary through the warmer half of the year.",
    });
  if (season === "autumn" || state === "moderate")
    list.push({
      ...S.atherina,
      reason: "Dense shimmering shoals tend to hold in the first metre, especially outside high summer.",
    });
  if (!calm)
    list.push({
      ...S.cormorant,
      reason: "Diving birds keep fishing when the sea is too rough for comfortable snorkeling.",
    });
  if (calm)
    list.push({
      ...S.posidonia,
      reason: "Low swell keeps sand out of suspension, so the meadow canopy reads clearly from the surface.",
    });

  return list.slice(0, 4);
}

export function daySummary(day: { waveHeight: number | null; windSpeed: number | null }): string {
  const state = seaState(day.waveHeight);
  const kn = knots(day.windSpeed) ?? 0;
  if (state === "rough") return "Building sea and strong wind; snorkeling is not recommended.";
  if (state === "moderate")
    return "A lively surface with moderate wind; snorkeling remains good inside the sheltered coves.";
  if (state === "calm")
    return kn >= 15
      ? "Low swell but a firm breeze; the water stays workable close inshore."
      : "Light wind and low swell; good conditions over the meadow.";
  return "Near-glassy water; likely the clearest viewing of the week.";

}
