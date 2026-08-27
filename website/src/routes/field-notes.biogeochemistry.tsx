import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { useT } from "@/i18n";
import { ArrowLeft } from "lucide-react";
import hellenicSubduction from "@/assets/hellenic-subduction.jpg";
import tectonicGraben from "@/assets/aegean-tectonic-graben.jpg";
import bathymetry from "@/assets/aegean-bathymetry.webp";
import aegeanCirculation from "@/assets/aegean-circulation.png";
import levantineOxygen from "@/assets/levantine-oxygen.png";
import anthropologyTower from "@/assets/anthropology-tower.webp";

export const Route = createFileRoute("/field-notes/biogeochemistry")({
  head: () => ({
    meta: [
      { title: "Biogeochemistry of the Aegean — Kriopigi Shore Guide" },
      { name: "description", content: "From plate tectonics to dissolved oxygen — how the Aegean's deep architecture shapes its living chemistry." },
    ],
  }),
  component: Biogeochemistry,
});

type Stage = { eyebrow: string; title: string; body: string; image: string; alt: string; caption: string };

const stages: Stage[] = [
  {
    eyebrow: "Tectonic foundation",
    title: "A subducting plate beneath the sea",
    body: "The Aegean sits above the Hellenic Subduction System, where the African plate dives beneath Eurasia along a curved trench south of Crete. This slow convergence drives the tectonic evolution of the region, creating the basins, volcanic arc, and seafloor topography that in turn influence circulation and the chemistry of the water column.",
    image: hellenicSubduction,
    alt: "Map of the Hellenic Subduction System in the Eastern Mediterranean showing trenches, earthquakes and mud volcanoes",
    caption: "The Hellenic Subduction System in the Eastern Mediterranean. After Mouslopoulou et al. (2025), Tectonics 44, e2025TC008943.",
  },
  {
    eyebrow: "Back-arc extension",
    title: "Graben, volcanoes, and a stretched crust",
    body: "Behind the arc, the Aegean crust pulls apart. The North Aegean and Skyros basins open as tectonic graben, while the volcanic arc — Methana, Milos, Santorini, Nisyros — punches through the thinned crust. This extensional architecture largely determines the depth and geometry of the basins that guide modern water circulation.",
    image: tectonicGraben,
    alt: "Map of tectonic graben and volcanism in the Aegean, Greece",
    caption: "Active tectonic graben and the Aegean volcanic arc. After Papanikolaou, Nomikou & Lampridou (2025), 'Tectonic graben and volcanism in the Aegean, Greece', Geological Society, London, Special Publications 560.",
  },
  {
    eyebrow: "Bathymetry",
    title: "The basins water settles into",
    body: "Tectonics and erosion together carved a complex bottom: the deep North Aegean trough, the Athos and Sporades basins, the Chios and Skyros depressions. Halkidiki occupies a shallow continental shelf bordering the Athos Basin, where local circulation reflects interactions between shelf waters, regional currents, and the deeper Aegean basins.",
    image: bathymetry,
    alt: "Bathymetric map of the Aegean Sea showing major basins",
    caption: "Bottom topography of the Aegean Sea. Map adapted from Karageorgis (1995).",
  },
  {
    eyebrow: "Surface circulation",
    title: "How water moves through the Aegean",
    body: "Cool, fresher Black Sea water enters from the Dardanelles and sweeps west and south along the Greek coast; warmer, saltier Levantine water pushes north along the Turkish side. The interaction between fresher Black Sea water and warmer, saltier Levantine water helps shape seasonal fronts, mixing, and circulation around Halkidiki, flushing coastal bays and influencing the distribution of nutrients.",
    image: aegeanCirculation,
    alt: "Schematic of Aegean Sea upper circulation",
    caption: "Schematic representation of the Aegean Sea upper circulation (following Theocharis et al., 1993 & 1999; Theocharis & Georgopoulos, 1993; Zodiatis, 1994; Zervakis & Georgopoulos, 2002).",
  },
  {
    eyebrow: "Biogeochemistry",
    title: "Oxygen, nutrients, and the open Mediterranean",
    body: "Water exchanged through the Cretan Straits links the Aegean to the wider Eastern Mediterranean. These exchanges contribute to the formation and transformation of intermediate and deep water masses, including Levantine Intermediate Water, which plays a major role in ventilating the eastern Mediterranean. The Rhodes Gyre, farther to the southeast, is one of the basin's principal sites of winter deep-water formation and oxygenation. The chemistry of the water at Kriopigi is one node within this much larger circulation.",
    image: levantineOxygen,
    alt: "Map of dissolved oxygen and circulation in the Levantine Sea",
    caption: "Dissolved oxygen and circulation in the Levantine Basin. From Habib et al. (2026), 'Dissolved oxygen budget in the Levantine Sea: a coupled physical-biogeochemical modelling approach', Biogeosciences 23, 2939–2958, https://doi.org/10.5194/bg-23-2939-2026 (CC BY 4.0).",
  },
];

function Biogeochemistry() {
  const t = useT();
  return (
    <SiteLayout>
      <PageHeader
        eyebrow={t("Deep Time · II")}
        title={t("Biogeochemistry of the Aegean")}
        lead={t("From a subducting plate to dissolved oxygen — five layers of process that meet at the Kriopigi shore.")}
      />
      <div className="px-5 max-w-3xl mx-auto pb-12">
        <Link to="/field-notes/geology" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
          <ArrowLeft size={14} /> {t("Back to Geology")}
        </Link>

        <div className="mt-8 space-y-8">
          {stages.map((s, i) => (
            <article key={i} className="relative pl-6 border-l-2 border-accent/40">
              <span className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-accent" />
              <p className="text-[10px] uppercase tracking-[0.25em] text-accent">{t(s.eyebrow)}</p>
              <h2 className="mt-1 font-serif text-2xl text-foreground">{t(s.title)}</h2>
              <p className="mt-2 text-[15px] text-foreground/80 leading-relaxed">{t(s.body)}</p>
              <figure className="mt-4 rounded-lg overflow-hidden border border-border bg-card shadow-soft">
                <img src={s.image} alt={t(s.alt)} loading="lazy" className="w-full h-auto" />
                <figcaption className="px-3 py-2 text-[11px] text-muted-foreground leading-snug">{t(s.caption)}</figcaption>
              </figure>
            </article>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-border">
          <Link
            to="/field-notes/anthropology"
            className="group block rounded-xl overflow-hidden border border-border bg-card shadow-soft hover:shadow-deep transition"
          >
            <div className="aspect-[4/3] overflow-hidden bg-muted">
              <img
                src={anthropologyTower}
                alt={t("The fortified arsanas (sea-gate tower) of the Great Lavra monastery")}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="p-5">
              <p className="text-[10px] uppercase tracking-[0.25em] text-accent">{t("Continue · II · Human Time")}</p>
              <h3 className="mt-1 font-serif text-2xl text-foreground">{t("Tired of the geology? How about archaeology?")}</h3>
              <p className="mt-2 text-[15px] text-foreground/80 leading-relaxed">{t("Click here to learn about the Anthropological History of Kriopigi.")}</p>
            </div>
          </Link>
        </div>
      </div>
    </SiteLayout>
  );
}
