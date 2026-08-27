import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { useLanguage } from "@/i18n";
import kriopigi1998 from "@/assets/kriopigi-1998.jpg";
import { Camera } from "lucide-react";

export const Route = createFileRoute("/oral-history")({
  head: () => ({
    meta: [
      { title: "Voices & Images — Kriopigi Shore Guide" },
      { name: "description", content: "Recorded oral histories from locals and a community photo archive of the Kriopigi shore." },
    ],
  }),
  component: OralHistory,
});

type Photo = { src: string; caption: string; author: string; origin: "local" | "visitor"; date: string };

const photosRaw: Photo[] = [
  { src: kriopigi1998, caption: "The shore in summer — beach was much wider then", author: "Anonymous", origin: "visitor", date: "1998-07-15" },
];

const photos = [...photosRaw].sort((a, b) => a.date.localeCompare(b.date));

const formatDate = (iso: string, lang: string) =>
  new Date(iso).toLocaleDateString(lang === "el" ? "el-GR" : "en-GB", { month: "short", year: "numeric" });

const groupedByYear = photos.reduce<Record<string, Photo[]>>((acc, p) => {
  const y = p.date.slice(0, 4);
  (acc[y] ||= []).push(p);
  return acc;
}, {});

function OralHistory() {
  const { t, lang } = useLanguage();
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Voices & Images"
        title="What locals remember"
        lead="A community archive in two parts — recorded conversations with people who know this coast, and a slow-growing album of pictures sent in by locals and travellers."
      />

      <div className="px-5 max-w-3xl mx-auto">
        {/* Section nav */}
        <div className="flex gap-2 mb-8 border-b border-border">
          <a href="#voices" className="px-3 py-2 text-sm text-foreground border-b-2 border-accent -mb-px">{t("Oral Histories")}</a>
          <a href="#album" className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground">{t("Community Album")}</a>
        </div>

        {/* Oral Histories */}
        <section id="voices" className="scroll-mt-20">
          <div className="flex items-baseline justify-between mb-5">
            <h2 className="font-serif text-3xl text-foreground">{t("Oral Histories")}</h2>
            <span className="text-[10px] uppercase tracking-[0.25em] text-accent">{t("Part I")}</span>
          </div>
          <div className="rounded-2xl border border-dashed border-border bg-muted/30 px-6 py-12 text-center">
            <p className="font-serif text-2xl text-foreground/80">{t("Coming soon")}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {t("First recordings are being collected and verified.")}
            </p>
          </div>
        </section>

        {/* Community Album */}
        <section id="album" className="scroll-mt-20 mt-16 pb-8">
          <div className="flex items-baseline justify-between mb-2">
            <h2 className="font-serif text-3xl text-foreground">{t("Community Album")}</h2>
            <span className="text-[10px] uppercase tracking-[0.25em] text-accent">{t("Part II")}</span>
          </div>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            {t("Pictures of the cove submitted by locals and visitors — the seasons, the weather, the small things worth pointing a camera at.")}
          </p>

          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4">
            {t("Sorted oldest → newest · scroll for recent")}
          </p>

          <div className="space-y-8">
            {Object.keys(groupedByYear)
              .sort()
              .map((year) => (
                <div key={year}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-serif text-2xl text-accent">{year}</span>
                    <span className="flex-1 h-px bg-border" />
                    <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      {groupedByYear[year].length} {groupedByYear[year].length === 1 ? t("photo") : t("photos")}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {groupedByYear[year].map((p, i) => (
                      <figure key={i} className="group rounded-xl overflow-hidden bg-card border border-border shadow-soft">
                        <div className="aspect-square overflow-hidden">
                          <img src={p.src} alt={t(p.caption)} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        </div>
                        <figcaption className="p-3">
                          <p className="text-sm text-foreground leading-tight">{t(p.caption)}</p>
                          <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                            {p.author} · {t(p.origin)} · {formatDate(p.date, lang)}
                          </p>
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
              ))}
          </div>

          <a
            href="/submit"
            className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-muted/30 px-5 py-6 text-sm text-foreground/80 hover:bg-muted transition"
          >
            <Camera size={16} className="text-accent" />
            {t("Add your photo to the album")}
          </a>
        </section>
      </div>
    </SiteLayout>
  );
}
