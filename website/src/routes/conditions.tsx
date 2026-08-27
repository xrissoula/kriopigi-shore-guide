import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { Wind, Thermometer, Waves, Sun, Compass, Droplet, Navigation, CloudSun, Sunrise, Sunset } from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { useT } from "@/i18n";
import { speciesSlug } from "@/lib/species";
import { getSeaConditions } from "@/lib/sea.functions";
import {
  bestTimes,
  compass,
  daySummary,
  knots,
  likelySpecies,
  naturalistNote,
  seasonOf,
  snorkelOutlook,
  windPhrase,
} from "@/lib/sea-narrative";

const seaQuery = queryOptions({
  queryKey: ["sea-conditions"],
  queryFn: () => getSeaConditions(),
  staleTime: 60 * 60 * 1000, // refresh hourly
  refetchInterval: 60 * 60 * 1000,
});

export const Route = createFileRoute("/conditions")({
  head: () => ({
    meta: [
      { title: "The Sea Today — Kriopigi Shore Guide" },
      {
        name: "description",
        content:
          "Live marine conditions for Kriopigi Beach — sea temperature, waves, wind and currents, read as a marine naturalist's daily field note.",
      },
      { property: "og:title", content: "The Sea Today — Kriopigi Shore Guide" },
      {
        property: "og:description",
        content: "A live snapshot of the waters around Kriopigi, combining marine observations with natural history.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(seaQuery),
  component: Conditions,
});

const timeOnly = (iso: string | null) =>
  iso ? new Date(iso).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) : "—";

function Stat({
  icon: Icon,
  label,
  value,
  note,
}: {
  icon: typeof Wind;
  label: string;
  value: string;
  note?: string;
}) {
  const t = useT();
  return (
    <div className="rounded-xl bg-card border border-border p-4 shadow-soft">
      <div className="flex items-center justify-between text-muted-foreground">
        <span className="text-[10px] uppercase tracking-[0.2em]">{t(label)}</span>
        <Icon size={16} className="text-accent" strokeWidth={1.6} />
      </div>
      <p className="font-serif text-2xl text-foreground mt-2">{value}</p>
      {note && <p className="text-xs text-muted-foreground">{t(note)}</p>}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const t = useT();
  return (
    <section className="mt-12">
      <h2 className="font-serif text-2xl text-foreground">{t(title)}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Conditions() {
  const t = useT();
  const { data } = useSuspenseQuery(seaQuery);
  const c = data.current;
  const season = seasonOf(c.time ? new Date(c.time) : new Date());
  const note = naturalistNote(data, season);
  const outlook = snorkelOutlook(c.waveHeight, c.windSpeed);
  const times = bestTimes(data);
  const species = likelySpecies(data, season);
  const forecast = data.days.slice(1, 6);
  const windKn = knots(c.windSpeed);

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="The Sea Today"
        title="The sea today"
        lead="A live snapshot of the waters around Kriopigi, combining marine observations with natural history."
      />

      <div className="px-5 max-w-4xl mx-auto">
        {/* Hero snapshot */}
        <div className="rounded-2xl bg-gradient-sea p-6 md:p-8 text-primary-foreground shadow-deep">
          <p className="text-[10px] uppercase tracking-[0.25em] opacity-80">
            {t("Forecast issued")} {c.time ? new Date(c.time).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" }) : "—"}
          </p>
          <p className="font-serif text-5xl mt-2">
            {c.sst != null ? `${c.sst.toFixed(1)}°C` : "—"} <span className="text-2xl opacity-80">{t("sea surface")}</span>
          </p>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] opacity-75">{t("Wind")}</p>
              <p className="opacity-95">{windKn != null ? `${windKn} kn ${compass(c.windDirection)}` : "—"}</p>
              <p className="text-[11px] opacity-70">{t(windPhrase(c.windSpeed))}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] opacity-75">{t("Wave height")}</p>
              <p className="opacity-95">{c.waveHeight != null ? `${c.waveHeight.toFixed(2)} m` : "—"}</p>
            </div>
            {c.currentVelocity != null && (
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] opacity-75">{t("Surface current")}</p>
                <p className="opacity-95">
                  {c.currentVelocity.toFixed(1)} km/h {compass(c.currentDirection)}
                </p>
              </div>
            )}
          </div>
          <p className="mt-5 text-[11px] opacity-75">{t("Data source: POSEIDON · Hellenic Centre for Marine Research")}</p>
        </div>

        {/* Naturalist note — centrepiece */}
        <section className="mt-8 rounded-2xl border border-accent/30 bg-card p-6 md:p-8 shadow-soft">
          <p className="text-[11px] uppercase tracking-[0.25em] text-accent font-medium">{t("Today's naturalist note")}</p>
          <div className="mt-3 space-y-3 font-serif text-lg md:text-xl leading-relaxed text-foreground/90">
            {note.map((p) => (
              <p key={p}>{t(p)}</p>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground italic">
            {t("Inferred from today's sea state, water temperature and season — a statement of likelihood, not a record of sightings.")}
          </p>
        </section>

        {/* Marine conditions */}
        <Section title="Marine conditions">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{t("Sea")}</p>
          <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Stat icon={Droplet} label="Surface temperature" value={c.sst != null ? `${c.sst.toFixed(1)}°C` : "—"} />
            <Stat icon={Waves} label="Wave height" value={c.waveHeight != null ? `${c.waveHeight.toFixed(2)} m` : "—"} />
            <Stat
              icon={Navigation}
              label="Swell direction"
              value={c.waveDirection != null ? compass(c.waveDirection) : "—"}
              note={c.waveDirection != null ? `${Math.round(c.waveDirection)}°` : undefined}
            />
            <Stat
              icon={Compass}
              label="Current"
              value={c.currentVelocity != null ? `${c.currentVelocity.toFixed(1)} km/h` : "—"}
              note={c.currentDirection != null ? `setting ${compass(c.currentDirection)}` : undefined}
            />
          </div>

          <p className="mt-6 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{t("Weather")}</p>
          <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Stat
              icon={Wind}
              label="Wind"
              value={windKn != null ? `${windKn} kn` : "—"}
              note={c.windDirection != null ? `${compass(c.windDirection)} · ${t(windPhrase(c.windSpeed))}` : undefined}
            />
            <Stat icon={Thermometer} label="Air temperature" value={c.airTemp != null ? `${c.airTemp.toFixed(1)}°C` : "—"} />
            <Stat icon={CloudSun} label="Cloud cover" value={c.cloudCover != null ? `${Math.round(c.cloudCover)}%` : "—"} />
            <div className="rounded-xl bg-card border border-border p-4 shadow-soft">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-[10px] uppercase tracking-[0.2em]">{t("Sun")}</span>
                <Sun size={16} className="text-accent" strokeWidth={1.6} />
              </div>
              <p className="mt-2 text-sm text-foreground flex items-center gap-1.5">
                <Sunrise size={14} className="text-muted-foreground" /> {timeOnly(c.sunrise)}
              </p>
              <p className="text-sm text-foreground flex items-center gap-1.5">
                <Sunset size={14} className="text-muted-foreground" /> {timeOnly(c.sunset)}
              </p>
            </div>
          </div>

          {(data.waterQuality.salinity != null || data.waterQuality.chlorophyll != null) && (
            <>
              <p className="mt-6 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{t("Water quality")}</p>
              <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {data.waterQuality.salinity != null && (
                  <Stat icon={Droplet} label="Salinity" value={`${data.waterQuality.salinity.toFixed(1)} PSU`} />
                )}
                {data.waterQuality.chlorophyll != null && (
                  <Stat icon={Droplet} label="Chlorophyll" value={`${data.waterQuality.chlorophyll.toFixed(2)} mg/m³`} />
                )}
              </div>
            </>
          )}
        </Section>

        {/* Snorkeling outlook */}
        <Section title="Snorkeling outlook">
          <div className="rounded-2xl bg-card border border-border p-6 shadow-soft">
            <p className="font-serif text-3xl text-foreground">{t(outlook.verdict)}</p>
            <p className="mt-2 text-muted-foreground leading-relaxed">{t(outlook.detail)}</p>
            <Link to="/snorkeling" className="mt-4 inline-block text-sm text-accent hover:underline">
              {t("Follow the Snorkel Journey →")}
            </Link>
          </div>
        </Section>

        {/* Best time today */}
        <Section title="Best time today">
          <div className="grid sm:grid-cols-3 gap-3">
            {times.map((b) => (
              <div key={b.label} className="rounded-xl bg-card border border-border p-5 shadow-soft">
                <p className="text-[10px] uppercase tracking-[0.2em] text-accent">{t(b.label)}</p>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t(b.note)}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Species most likely today */}
        <Section title="Species most likely today">
          <p className="text-sm text-muted-foreground max-w-2xl">
            {t("Likelihood suggestions drawn from the species already documented in the Flora & Fauna guide — not sightings.")}
          </p>
          <div className="mt-4 grid sm:grid-cols-2 gap-3">
            {species.map((s) => (
              <Link
                key={s.sci}
                to="/flora-fauna"
                hash={speciesSlug(s.sci)}
                className="flex gap-4 rounded-xl bg-card border border-border p-4 shadow-soft hover:border-accent/40 transition-colors"
              >
                <img
                  src={s.img}
                  alt={s.common}
                  loading="lazy"
                  className="w-20 h-20 rounded-lg object-cover flex-none bg-muted"
                />
                <div className="min-w-0">
                  <p className="font-serif text-lg text-foreground leading-tight">{t(s.common)}</p>
                  <p className="text-xs italic text-muted-foreground">{s.sci}</p>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{t(s.reason)}</p>
                </div>
              </Link>
            ))}
          </div>
        </Section>

        {/* Recent local sightings */}
        <Section title="Recent local sightings">
          <div className="rounded-2xl border border-dashed border-border p-6 text-center">
            <p className="text-sm text-muted-foreground">
              {t("Verified observations from the shore will appear here — each marked ✓ Confirmed on iNaturalist, with photograph, species and observation date — once the iNaturalist feed for Kriopigi is connected.")}
            </p>
          </div>
        </Section>

        {/* Forecast timeline */}
        <Section title="Five-day outlook">
          <div className="rounded-2xl bg-card border border-border shadow-soft divide-y divide-border overflow-hidden">
            {forecast.map((d) => (
              <div key={d.date} className="px-5 py-4">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-serif text-lg text-foreground">
                    {new Date(d.date).toLocaleDateString("en-GB", { weekday: "long" })}
                  </span>
                  <span className="text-xs text-muted-foreground tabular-nums">
                    {d.sst != null ? `${d.sst.toFixed(1)}°C` : "—"} · {d.waveHeight != null ? `${d.waveHeight.toFixed(2)} m` : "—"} ·{" "}
                    {knots(d.windSpeed) != null ? `${knots(d.windSpeed)} kn ${compass(d.windDirection)}` : "—"}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{t(daySummary(d))}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Sources */}
        <section className="mt-12 mb-4 border-t border-border pt-6 text-xs text-muted-foreground leading-relaxed">
          <p>
            {t("Marine conditions provided by the Hellenic Centre for Marine Research (HCMR) through the POSEIDON ocean observing and forecasting system.")}{" "}
            <a href={data.source.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              poseidon.hcmr.gr
            </a>
          </p>
          <p className="mt-2">
            {t("Forecast issue time")}: {c.time ?? "—"} · {t("Last refreshed")}:{" "}
            {new Date(data.fetchedAt).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })} ·{" "}
            {t("Data refreshes hourly. No measurement on this page is estimated or invented; unavailable fields are hidden.")}
          </p>
        </section>
      </div>
    </SiteLayout>
  );
}
