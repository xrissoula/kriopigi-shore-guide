import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { useT } from "@/i18n";
import { ArrowLeft } from "lucide-react";
import hero from "@/assets/hero-kriopigi.webp";
import timeScale from "@/assets/geologic-time-scale.webp";
import triassicMap from "@/assets/triassic-supercontinent.png";
import eoceneMap from "@/assets/eocene-world.png";
import plioceneMap from "@/assets/pliocene-world.png";
import holoceneMap from "@/assets/holocene-world.jpg";
import greeceGeoMap from "@/assets/greece-geological-map.webp";
import halkidikiGeoMap from "@/assets/halkidiki-geology.jpg";
import mioceneMap from "@/assets/miocene-world.png.asset.json";
import aegeanCirculation from "@/assets/aegean-circulation.png";

export const Route = createFileRoute("/field-notes/geology")({
  head: () => ({
    meta: [
      { title: "Geological & Natural History — Kriopigi Shore Guide" },
      { name: "description", content: "The deep-time formation of the Kriopigi cove: tectonics, limestone, springs, and the rise of its ecosystem." },
    ],
  }),
  component: Geology,
});

type Era = { age: string; title: string; body: string; image?: string; caption?: string; image2?: string; caption2?: string };

const eras: Era[] = [
  { age: "~250 Mya · Triassic", title: "An ancient ocean beneath future Kriopigi", body: "Beneath Kassandra lie much older rocks that formed in the warm Tethys Ocean during the Mesozoic Era. Marine sediments, volcanic rocks, and fragments of ancient oceanic crust were later caught up in the collision between Africa and Eurasia, becoming part of the geological basement beneath the peninsula. Today these rocks are exposed mainly in southern Kassandra and at depth beneath younger sediments.", image: triassicMap, caption: "Pangaea in the Triassic, with the Tethys Ocean opening to the east — the future Halkidiki lay along its northern shelf." },
  { age: "~50 Mya · Eocene", title: "Building the Hellenides", body: "As the African Plate continued moving northward, it collided with Eurasia, compressing and uplifting the rocks that now form Greece. This mountain-building episode created the Hellenides and established the structural framework on which the Halkidiki peninsulas would later develop.", image: eoceneMap, caption: "Eocene world — Africa drifts north into Eurasia, closing the Tethys and crumpling the Hellenic arc into being." },
  { age: "~10–5 Ma · Late Miocene", title: "The landscape beneath Kriopigi takes shape", body: "Rivers, lakes, floodplains and shallow coastal environments deposited thick layers of sand, gravel, clay, marl and limestone across what is now Kassandra. Around modern Kriopigi these Late Miocene sediments preserve fossil mammals and other terrestrial life, making the village itself part of the peninsula's paleontological record.", image: mioceneMap.url, caption: "Late Miocene world — rivers, lakes, and coastal plains spread across what is now Kassandra, depositing the sediments beneath modern Kriopigi." },
  { age: "~5 Mya · Pliocene", title: "Sculpting the coast", body: "Continued uplift, faulting, changing sea levels, and erosion gradually sculpt the Kassandra peninsula. Streams cut valleys into the young sediments, waves carve pocket coves and low cliffs, and beaches shift as sand and gravel move along the shore. Rainwater infiltrating fractured bedrock and overlying sediments re-emerges locally as coastal springs — one of them giving Kriopigi (“cold spring”) its name.", image: plioceneMap, caption: "Late Pliocene world — continents approach their modern configuration as the Mediterranean nears its present geography and the landscape of Kassandra continues to evolve." },
  { age: "~12,000 ya · Holocene", title: "The modern shoreline", body: "As glaciers melted after the last Ice Age, rising seas flooded the lower valleys and brought the coastline close to its modern position. Over the following millennia, Aleppo pine (Pinus halepensis) spread across the hillsides while extensive meadows of Posidonia oceanica became established on the shallow sandy shelf, stabilizing sediments and creating one of the Mediterranean’s most important marine habitats. By the late Holocene, the bay at Kriopigi had taken on much of the form visitors recognize today.", image: holoceneMap, caption: "Holocene world — rising seas reshape coastlines as the Mediterranean approaches its modern form." },
  { age: "Today", title: "A living equilibrium", body: "The cold spring still surfaces beneath the sand, lowering nearshore temperatures by 2–3°C in summer — a microclimate that shelters juvenile fish and keeps the seagrass meadow productive.", image: greeceGeoMap, caption: "Simplified geological map of Greece (modified after IGME, 1983 and Zachariadis, 2007). Kassandra-Sithonia (K-S) marks the Halkidiki peninsulas.", image2: halkidikiGeoMap, caption2: "Geological map of the Halkidiki peninsula and the Serbo-Macedonian Massif (modified after Melfos & Voudouris, 2012; Schmid et al., 2008; van Hinsbergen & Schmid, 2012). Source: ScienceDirect, S0169136822000221." },
];

function Geology() {
  const t = useT();
  return (
    <SiteLayout>
      <div className="relative h-64 overflow-hidden">
        <img src={hero} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-x-0 bottom-0 px-5 pb-6 max-w-3xl mx-auto">
          <Link to="/field-notes" className="inline-flex items-center gap-1 text-xs text-primary-foreground/80 hover:text-primary-foreground">
            <ArrowLeft size={14} /> {t("Field Notes")}
          </Link>
          <p className="mt-2 text-[11px] uppercase tracking-[0.25em] text-primary-foreground/80">{t("I · Deep Time")}</p>
          <h1 className="font-serif text-4xl text-primary-foreground">{t("Geological & Natural History")}</h1>
        </div>
      </div>
      <PageHeader eyebrow="Formation" title="How the cove was made" lead="Read downward through time — from a Triassic sea bed to the cold spring that still feeds the bay." />
      <div className="px-5 max-w-5xl mx-auto pb-8 grid lg:grid-cols-[260px_1fr] gap-8">
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <figure className="rounded-lg overflow-hidden border border-border bg-card shadow-soft">
            <img src={timeScale} alt={t("Geologic time scale, 650 million years ago to the present")} className="w-full h-auto" />
            <figcaption className="px-3 py-2 text-[11px] text-muted-foreground leading-snug">{t("Geologic time scale — 650 Mya to present. © Encyclopædia Britannica.")}</figcaption>
          </figure>
        </aside>
        <div className="space-y-6 max-w-2xl">
          {eras.map((e, i) => (
            <article key={i} className="relative pl-6 border-l-2 border-accent/40">
              <span className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-accent" />
              <p className="text-[10px] uppercase tracking-[0.25em] text-accent">{t(e.age)}</p>
              <h2 className="mt-1 font-serif text-2xl text-foreground">{t(e.title)}</h2>
              <p className="mt-2 text-[15px] text-foreground/80 leading-relaxed">{t(e.body)}</p>
              {e.image && (
                <figure className="mt-4 rounded-lg overflow-hidden border border-border bg-card shadow-soft">
                  <img src={e.image} alt={t(e.caption ?? e.title)} loading="lazy" className="w-full h-auto" />
                  {e.caption && (
                    <figcaption className="px-3 py-2 text-[11px] text-muted-foreground leading-snug">{t(e.caption)}</figcaption>
                  )}
                </figure>
              )}
              {e.image2 && (
                <figure className="mt-4 rounded-lg overflow-hidden border border-border bg-card shadow-soft">
                  <img src={e.image2} alt={t(e.caption2 ?? e.title)} loading="lazy" className="w-full h-auto" />
                  {e.caption2 && (
                    <figcaption className="px-3 py-2 text-[11px] text-muted-foreground leading-snug">{t(e.caption2)}</figcaption>
                  )}
                </figure>
              )}
              {i === eras.length - 1 && (
                <div className="mt-6 space-y-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-accent">{t("Reading the maps")}</p>
                    <h3 className="mt-1 font-serif text-xl text-foreground">{t("The deep story beneath Kassandra")}</h3>
                    <p className="mt-2 text-[15px] text-foreground/80 leading-relaxed">{t("The colored zones above are not decoration — they represent different tectonic terranes: fragments of crust with separate geological origins that were compressed and welded together over hundreds of millions of years during the formation of the Hellenides, Greece’s mountain system. The Halkidiki peninsulas occupy the southern margin of this tectonic collage, shaped by continental collision, mountain building, uplift, faulting, the closure of the ancient Tethys Ocean, and millions of years of erosion. The landscape you walk through today is the surface expression of that deep geological history.")}</p>
                  </div>

                  <div className="rounded-xl border border-border bg-card p-5 shadow-soft space-y-5">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-accent">{t("How geology shapes the coast today")}</p>

                    <div>
                      <h4 className="font-serif text-lg text-foreground">{t("1. Why the terrain is hilly and dissected")}</h4>
                      <p className="mt-1.5 text-sm text-foreground/80 leading-relaxed">{t("Kassandra is an uplifted, faulted peninsula characterized by steep slopes, gullies, drainage cuts, ridges, coves, and irregular shorelines. Mediterranean rainfall often arrives in intense bursts, and winter erosion, sediment transport, and slope instability continue to shape the landscape today.")}</p>
                    </div>

                    <div>
                      <h4 className="font-serif text-lg text-foreground">{t("2. Why the soils are thin and dry")}</h4>
                      <p className="mt-1.5 text-sm text-foreground/80 leading-relaxed">{t("Around Kriopigi, the landscape is developed largely on Neogene and Quaternary sediments resting above older geological basement. The resulting soils are generally thin, well-drained, and prone to summer drought, favoring Aleppo pine, Mediterranean maquis, phrygana, and aromatic shrubs rather than dense temperate forest. These conditions give the landscape its characteristic open, resinous, silver-green appearance.")}</p>
                    </div>

                    <div>
                      <h4 className="font-serif text-lg text-foreground">{t("3. Why the water is so clear")}</h4>
                      <p className="mt-1.5 text-sm text-foreground/80 leading-relaxed">{t("Low sediment input from the peninsula, together with the naturally oligotrophic waters of the Aegean Sea, results in exceptionally clear water. Without large muddy rivers delivering suspended sediment, light penetrates deeply into the coastal waters, supporting extensive seagrass meadows.")}</p>
                    </div>

                    <div>
                      <h4 className="font-serif text-lg text-foreground">{t("4. Why there are springs and cold-water pockets")}</h4>
                      <p className="mt-1.5 text-sm text-foreground/80 leading-relaxed">{t("Faults, fractures, and permeable sedimentary layers channel groundwater through the peninsula. Rainwater infiltrates the subsurface and re-emerges as coastal springs, seepage zones, and localized cold-water upwellings, creating small-scale differences in temperature, salinity, nutrients, fish distribution, and seagrass productivity. Kriopigi — “the cold spring” — takes its name from one of these freshwater sources.")}</p>
                    </div>

                    <div>
                      <h4 className="font-serif text-lg text-foreground">{t("5. Why the beaches alternate between sand, pebbles, and rock")}</h4>
                      <p className="mt-1.5 text-sm text-foreground/80 leading-relaxed">{t("Different rock types and sedimentary deposits erode at different rates. Within a few hundred metres the coast can shift through rocky shelves, pocket coves, coarse gravel beaches, sandy sections, cliffs, and submerged reefs — each one a readout of the rock beneath, the wave exposure above, and the sediment supply between.")}</p>
                    </div>
                  </div>

                  <div className="rounded-xl bg-gradient-sea p-5 text-primary-foreground shadow-deep">
                    <p className="text-[10px] uppercase tracking-[0.25em] opacity-80">{t("The bigger idea")}</p>
                    <h3 className="mt-1 font-serif text-xl">{t("Ecology begins with geology")}</h3>
                    <p className="mt-2 text-sm opacity-90 leading-relaxed">{t("The forests, shrubs, springs, beach types, erosion patterns, water clarity, and marine habitats around Kriopigi all arise from the same fundamental processes: geology, tectonics, climate, water movement, and time. Read the coast that way and it stops being scenery — it becomes a system.")}</p>
                  </div>
                </div>
              )}
            </article>
          ))}
          <Link
            to="/field-notes/biogeochemistry"
            className="group block mt-8 rounded-xl overflow-hidden border border-border bg-card shadow-soft hover:shadow-deep transition"
          >
            <div className="aspect-[4/3] overflow-hidden bg-muted">
              <img
                src={aegeanCirculation}
                alt={t("Schematic of Aegean Sea upper circulation")}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="p-5">
              <p className="text-[10px] uppercase tracking-[0.25em] text-accent">{t("Continue · Part II")}</p>
              <h3 className="mt-1 font-serif text-2xl text-foreground">{t("Wanna dive deeper?")}</h3>
              <p className="mt-2 text-[15px] text-foreground/80 leading-relaxed">{t("Click here to learn about the Biogeochemistry of the Aegean.")}</p>
            </div>
          </Link>
          <Link
            to="/field-notes/anthropology"
            hash="first-settlers"
            className="mt-4 block text-center text-[12px] uppercase tracking-[0.2em] text-muted-foreground hover:text-accent transition-colors"
          >
            <span className="normal-case tracking-normal italic">{t("…or wanna wade out? Stay shallow with the humans →")}</span>
          </Link>
        </div>
      </div>
    </SiteLayout>
  );
}
