import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { useT } from "@/i18n";
import posidonia from "@/assets/posidonia.jpg";
import gullyRunoff from "@/assets/gully-runoff.jpeg";
import lifecycleDiagram from "@/assets/posidonia-lifecycle-diagram.png";
import { Leaf, AlertTriangle, HandHeart, Shell, Sun } from "lucide-react";

export const Route = createFileRoute("/conservation")({
  head: () => ({
    meta: [
      { title: "Conservation — Kriopigi Shore Guide" },
      { name: "description", content: "Protecting Posidonia meadows, nesting habitats, and the fragile Mediterranean coast at Kriopigi." },
    ],
  }),
  component: Conservation,
});

function Conservation() {
  const t = useT();
  return (
    <SiteLayout>
      <PageHeader eyebrow="Care" title="Tread lightly. Watch closely." lead="The Aegean is patient but not infinite. A few habits keep this coast intact for the next visitor — and the next century." />
      <div className="px-5 max-w-3xl mx-auto">
        <figure className="rounded-2xl overflow-hidden shadow-deep">
          <img src={posidonia} alt={t("Posidonia meadow")} loading="lazy" className="w-full aspect-[16/9] object-cover" />
          <figcaption className="p-4 bg-card text-sm text-muted-foreground border border-t-0 border-border rounded-b-2xl">
            {t("Posidonia oceanica meadows — a priority habitat protected under the EU Habitats Directive — stabilize sediment, provide structurally complex habitat, and support rich coastal biodiversity.")}
          </figcaption>
        </figure>

        <div className="mt-8 space-y-4">
          <Tenet icon={Leaf} title="Anchor on sand, never on seagrass" body="A single anchor can uproot shoots and cut persistent scars through a Posidonia meadow. Because Posidonia oceanica grows and recolonizes very slowly, heavily damaged areas can take decades or even longer to recover." />
          <Tenet icon={AlertTriangle} title="Give nesting cliffs space" body="Coastal cliffs and headlands can provide nesting habitat for seabirds during spring and early summer. Give nesting birds plenty of space and stay on established paths." />
          <Tenet icon={HandHeart} title="Carry out what you carry in" body="There is no bin on the trail. Litter left along the shore can easily be carried into the sea by wind, runoff, and waves." />
          <Tenet icon={Shell} title="Leave the shells where they lie" body="Empty shells are not just souvenirs — they remain part of the coastal ecosystem. They provide shelter for hermit crabs and other small organisms, and as they break down they contribute biogenic carbonate to beach sediments. Photograph them and leave them where they are." />
          <Tenet icon={Sun} title="Wear the shirt, use less sunscreen" body="Some ultraviolet-filter ingredients used in sunscreens have been detected in coastal waters and sediments, and laboratory and field studies indicate that certain compounds can affect marine organisms at sufficient concentrations. Environmental effects vary by chemical, formulation, concentration, and exposure, so labels such as “reef-safe” should not be treated as a scientifically regulated guarantee. The simplest way to reduce both UV exposure and the amount of sunscreen entering the sea is physical protection: wear a UPF swim shirt, use a hat and shade when practical, and apply broad-spectrum sunscreen to exposed skin according to the product directions." />
        </div>

        <section className="mt-10">
          <p className="text-[10px] uppercase tracking-[0.25em] text-accent">{t("Ridge to reef")}</p>
          <h2 className="font-serif text-3xl text-foreground mt-1">{t("From hillside to sea")}</h2>
          <p className="mt-3 text-foreground/80 leading-relaxed">
            {t("During rainfall events, water from roads, gardens, developed land, agricultural areas, and hillsides above Kriopigi can move downslope through gullies and seasonal drainage channels toward the Aegean. Along the way it can carry sediments, fertilisers, herbicides, pesticides, plastics, oils, and organic waste into coastal waters and nearshore ecosystems.")}
          </p>
          <figure className="mt-5 rounded-2xl overflow-hidden shadow-soft border border-border bg-card">
            <img src={gullyRunoff} alt={t("An overgrown hillside gully above Kriopigi at dusk, with a tall cypress on the ridge and the Aegean visible beyond — a seasonal drainage line connecting the village to the sea.")} loading="lazy" className="w-full aspect-[4/3] object-cover" />
            <figcaption className="p-4 text-sm text-muted-foreground border-t border-border">
              {t("A vegetated gully on the slope above the bay. In dry months it looks like scrub; after the first autumn storms it becomes a pipeline from the village down to the shore.")}
            </figcaption>
          </figure>

          <div className="mt-5 rounded-2xl bg-card border border-border p-5 shadow-soft">
            <h3 className="font-serif text-xl text-foreground">{t("Why it matters here")}</h3>
            <p className="mt-2 text-sm text-foreground/80 leading-relaxed">
              {t("Mediterranean climates can produce intense runoff pulses after long dry periods. Steep slopes, compacted or disturbed soils, roads, development, wildfire, and other land-use changes can accelerate the movement of water and sediment toward the coast.")}
            </p>
            <p className="mt-3 text-sm text-foreground/80 leading-relaxed">
              {t("In naturally oligotrophic coastal waters, increased nutrient and sediment inputs can alter nearshore conditions by promoting algal growth, increasing turbidity, stressing seagrass, and changing local ecological communities. Runoff can also transport microbial contaminants and other pollutants depending on the surrounding land use.")}
            </p>
          </div>

          <p className="mt-5 text-xs text-muted-foreground italic leading-relaxed">
            {t("These are general mechanisms documented across Mediterranean coastal systems, not measurements taken at this specific bay. Treat the gully above as a way of seeing the connection between land and sea — observation, not accusation.")}
          </p>
        </section>

        <section className="mt-12">
          <p className="text-[10px] uppercase tracking-[0.25em] text-accent">{t("Beach life cycle")}</p>
          <h2 className="font-serif text-3xl text-foreground mt-1">{t("How a Mediterranean beach is built")}</h2>
          <p className="mt-3 text-foreground/80 leading-relaxed">
            {t("The sand at Kriopigi is part of a connected coastal sediment system shaped by erosion on land, waves and currents, biological carbonate production, and the Posidonia oceanica meadow offshore. Understanding those connections is the difference between a beach we use and a beach we keep.")}
          </p>

          <figure className="mt-5 rounded-2xl overflow-hidden shadow-soft border border-border bg-card">
            <img src={lifecycleDiagram} alt="Cross-section diagram showing the four zones of a Posidonia oceanica beach system: dry beach with egagropiles and banquettes, the sea/beach zone with dead mattes and ripple marks, the living Posidonia meadow exporting leaf litter, and the deep abyss where litter finally settles." loading="lazy" className="w-full object-contain bg-muted" />
            <figcaption className="p-4 text-sm text-muted-foreground border-t border-border">
              {t("The four zones of a Posidonia beach system, from dune to deep water. Diagram from Petrounias et al. (2023), Posidonia oceanica Balls (Egagropili) from Kefalonia Island Evaluated as Alternative Biomass Source for Green Energy, Journal of Marine Science and Engineering, 11(4), 749. Open access (CC BY 4.0).")}
            </figcaption>
          </figure>

          <div className="mt-6 space-y-4">
            <Stage letter="a" title="The dry beach — egagropiles and banquettes" body={"The fibrous brown mats piled at the high-tide line are not rubbish. They are banquettes: dead Posidonia leaves woven by waves into dense berms that can shelter the sand behind them from waves and storms. The small felted balls scattered around them — egagropiles — are rolled fragments of the same leaf fibre. Mechanical removal of banquettes can remove trapped sediment, reduce natural protection from waves and storms, and accelerate erosion on vulnerable Mediterranean beaches."} />
            <Stage letter="b" title="Sea / beach zone — dead mattes and ripple marks" body={"Where former Posidonia meadow has died back, compacted layers of old rhizomes, roots, and trapped sediment can remain as dead matte. These structures may persist for very long periods and can continue to influence seabed stability even after the living shoots are gone. Ripple marks in the shallow sand show how much water energy this zone is constantly absorbing."} />
            <Stage letter="c" title="The living meadow — part of the sediment cycle" body={"The Posidonia meadow is an important part of the coastal sediment system. The plants shed old leaves seasonally; some are transported shoreward and contribute to banquettes, while others move offshore. Within the meadow, leaves and rhizomes slow water movement and trap suspended particles. Shells, foraminifera, calcareous algae, and other organisms associated with the meadow also produce biogenic carbonate that can contribute to nearby beach sediments."} />
            <Stage letter="d" title="Long-term carbon storage" body={"Much of the long-term carbon associated with Posidonia oceanica is stored beneath the meadow itself. Roots, rhizomes, organic matter, and trapped sediments accumulate into thick matte deposits that can preserve carbon for centuries to millennia. Some detached plant material is also transported away from the meadow and may ultimately be buried in deeper marine sediments. Posidonia meadows are therefore important Mediterranean blue-carbon ecosystems."} />
          </div>

          <div className="mt-6 rounded-2xl bg-card border border-border p-5 shadow-soft">
            <h3 className="font-serif text-xl text-foreground">{t("What this means at Kriopigi")}</h3>
            <p className="mt-2 text-sm text-foreground/80 leading-relaxed">
              {t("The beach you walk on each summer is part of a connected system extending from the slopes and shoreline to the shallow seabed and Posidonia meadow offshore. Anchor damage, removal of beach-cast vegetation, litter and shell collecting, and polluted or sediment-rich runoff can each affect different parts of that connected coastal system. Protecting any one zone protects the rest.")}
            </p>
          </div>

          <p className="mt-5 text-xs text-muted-foreground italic leading-relaxed">
            {t("Source:")}{" "}Petrounias, P., Giannakopoulou, P. P., Rogkala, A., Antoniou, N., Koutsovitis, P., Zygouri, E., Krassakis, P., Islam, I., &amp; Koukouzas, N. (2023). <em>Posidonia oceanica Balls (Egagropili) from Kefalonia Island Evaluated as Alternative Biomass Source for Green Energy.</em> Journal of Marine Science and Engineering, 11(4), 749.{" "}
            <a href="https://doi.org/10.3390/jmse11040749" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground">https://doi.org/10.3390/jmse11040749</a>. {t("Blue-carbon context:")}{" "}Fourqurean et al. (2012), <em>Nature Geoscience</em>.
          </p>
        </section>

        <div className="mt-10 rounded-2xl bg-gradient-sea text-primary-foreground p-6 shadow-deep">
          <p className="text-[10px] uppercase tracking-[0.25em] opacity-80">{t("Citizen science")}</p>
          <h3 className="font-serif text-2xl mt-1">{t("Help us count the meadow")}</h3>
          <p className="mt-2 text-sm opacity-90">{t("Submit underwater photographs through the observation form to help build a local visual record of the meadow’s extent and condition over time.")}</p>
          <p className="mt-3 text-sm opacity-90">
            {t("You can also log sightings on")}{" "}
            <a
              href="https://www.inaturalist.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 font-medium hover:opacity-100"
            >
              iNaturalist
            </a>
            {" "}{t("— a global citizen-science platform where observations can be identified and reviewed by the community and, when they meet data-quality criteria, contribute to biodiversity datasets used in research and conservation.")}
          </p>
        </div>
      </div>
    </SiteLayout>
  );
}

function Tenet({ icon: Icon, title, body }: { icon: any; title: string; body: string }) {
  const t = useT();
  return (
    <div className="flex gap-4 rounded-xl border border-border bg-card p-4 shadow-soft">
      <span className="w-10 h-10 rounded-full bg-secondary grid place-items-center text-accent shrink-0"><Icon size={18} /></span>
      <div>
        <h3 className="font-serif text-lg text-foreground">{t(title)}</h3>
        <p className="text-sm text-muted-foreground mt-0.5">{t(body)}</p>
      </div>
    </div>
  );
}

function Stage({ letter, title, body }: { letter: string; title: string; body: string }) {
  const t = useT();
  return (
    <div className="flex gap-4 rounded-xl border border-border bg-card p-4 shadow-soft">
      <span className="w-10 h-10 rounded-full bg-gradient-sea grid place-items-center text-primary-foreground font-serif text-lg shrink-0">{letter}</span>
      <div>
        <h3 className="font-serif text-lg text-foreground">{t(title)}</h3>
        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{t(body)}</p>
      </div>
    </div>
  );
}
