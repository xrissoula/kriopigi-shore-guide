import { createFileRoute, Link } from "@tanstack/react-router";
import { speciesSlug } from "@/lib/species";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { useT } from "@/i18n";
import posidonia from "@/assets/posidonia.jpg";

export const Route = createFileRoute("/snorkeling")({
  head: () => ({
    meta: [
      { title: "Snorkel Journey — Kriopigi Shore Guide" },
      {
        name: "description",
        content:
          "Swim out from the beach and watch the ecosystem change beneath you: six zones from the strand line to blue water, with things to look for in each.",
      },
      { property: "og:title", content: "Snorkel Journey — Kriopigi Shore Guide" },
      {
        property: "og:description",
        content: "A continuous underwater scavenger hunt at Kriopigi, from ghost crab burrows to the Posidonia forest and open blue.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Snorkeling,
});

type Zone = {
  id: string;
  eyebrow: string;
  title: string;
  depth: string;
  lead: string;
  hunt: string[];
  tip?: string;
  tipLabel?: string;
};

const zones: Zone[] = [
  {
    id: "shoreline",
    eyebrow: "Zone 1",
    title: "The Shoreline",
    depth: "Before your mask even goes on",
    lead: "The swim starts on dry sand. Walk the strand line slowly and the beach stops looking empty.",
    hunt: [
      "ghost crab burrows in the dry sand",
      "sea rocket flowering above the wrack",
      "sea holly with its blue-grey spines",
      "gulls working the shallows",
      "wave-worn shells and sea-tumbled pottery",
      "beach wrack alive with tiny isopods",
    ],
    tipLabel: "Tiny tip",
    tip: "Lift only with your eyes. Leave every shell, crab and flower where you found it.",
  },
  {
    id: "first-meter",
    eyebrow: "Zone 2",
    title: "The First Meter",
    depth: "Water to your knees",
    lead: "The moment you step in, things become alive. Stand still for a minute and the shallows fill back in around your ankles.",
    hunt: [
      "tiny mullet darting away from your shadow",
      "schools of sand smelt shimmering in the light",
      "juvenile sea bream in the warm edge water",
      "hermit crabs hauling borrowed shells",
      "transparent shrimp, visible only by their eyes",
      "sea cucumbers on the ripple crests",
      "swimming crabs buried to the eyes",
      "a little wrasse investigating your fins",
    ],
    tipLabel: "What people say here",
    tip: "\u201cThere are way more fish here than I expected.\u201d Almost everyone says it in the first two minutes.",
  },
  {
    id: "sandy-bottom",
    eyebrow: "Zone 3",
    title: "Sandy Bottom",
    depth: "2\u20135 m below you",
    lead: "Now you are floating. This is where you start slowing down — the sand looks blank until you give it time.",
    hunt: [
      "a salema school grazing",
      "a two-banded seabream",
      "a white seabream",
      "a striped seabream",
      "a painted comber sitting perfectly still",
      "a buried weever (look carefully — only the eyes show)",
      "a sea cucumber and the clean sand behind it",
      "a sand smelt shoal turning together",
    ],
  },
  {
    id: "rocky-patches",
    eyebrow: "Zone 4",
    title: "Rocky Patches",
    depth: "3\u20137 m, scattered blocks and reef",
    lead: "Every rock becomes interesting. Search the cracks rather than the open water.",
    hunt: [
      "an octopus den",
      "a peacock wrasse in breeding colour",
      "a rainbow wrasse",
      "a five-spotted wrasse",
      "a dusky grouper holding its ground",
      "damselfish clouding above the reef",
      "a stone crusted with algae and encrusting sponge",
      "a nudibranch grazing a rock face",
    ],
    tipLabel: "Look closely",
    tip: "Look for neat piles of empty shells outside a crack in the rocks. They often reveal an occupied octopus den.",
  },
  {
    id: "meadow",
    eyebrow: "Zone 5",
    title: "The Underwater Forest",
    depth: "Posidonia meadow, 5\u201312 m",
    lead: "Slow down. Stop kicking. Let the meadow come alive around you — nothing here rewards speed.",
    hunt: [
      "salema grazing the leaves",
      "a cuttlefish changing colour",
      "a seahorse holding onto a blade",
      "a noble pen shell standing upright in the sand",
      "juvenile sea bass among the shoots",
      "a wrasse sleeping among the leaves",
    ],
    tipLabel: "Look closely",
    tip: "Hover, do not swim. Thirty still seconds is worth more than thirty metres of kicking.",
  },
  {
    id: "blue-water",
    eyebrow: "Zone 6",
    title: "Blue Water",
    depth: "Beyond the meadow edge",
    lead: "You leave the meadow and everything suddenly becomes enormous. Sightings become rarer and far less predictable.",
    hunt: [
      "a bottlenose dolphin passing offshore",
      "tuna cutting through a bait ball",
      "a loggerhead turtle surfacing to breathe",
      "sea sparkle glowing in the wake after dark",
    ],
    tipLabel: "Before you go out",
    tip: "Always swim with a buddy, stay inside the swim area, and check the day's sea state before leaving the meadow behind.",
  },
];

/** Maps checklist phrases on this page to species entries on /flora-fauna. */
const linkedSpecies: Record<string, string> = {
  "ghost crab burrows in the dry sand": "Ocypode cursor",
  "sea rocket flowering above the wrack": "Cakile maritima",
  "sea holly with its blue-grey spines": "Eryngium maritimum",
  "gulls working the shallows": "Larus michahellis",
  "beach wrack alive with tiny isopods": "Tylos europaeus",
  "schools of sand smelt shimmering in the light": "Atherina hepsetus",
  "juvenile sea bream in the warm edge water": "Sparus aurata",
  "sea cucumbers on the ripple crests": "Holothuria tubulosa",
  "a little wrasse investigating your fins": "Coris julis",
  "a salema school grazing": "Sarpa salpa",
  "a two-banded seabream": "Diplodus vulgaris",
  "a white seabream": "Diplodus sargus",
  "a striped seabream": "Lithognathus mormyrus",
  "a painted comber sitting perfectly still": "Serranus scriba",
  "a sea cucumber and the clean sand behind it": "Holothuria tubulosa",
  "a sand smelt shoal turning together": "Atherina hepsetus",
  "an octopus den": "Octopus vulgaris",
  "a peacock wrasse in breeding colour": "Symphodus tinca",
  "a rainbow wrasse": "Coris julis",
  "a five-spotted wrasse": "Symphodus roissali",
  "a dusky grouper holding its ground": "Epinephelus marginatus",
  "damselfish clouding above the reef": "Chromis chromis",
  "salema grazing the leaves": "Sarpa salpa",
  "a cuttlefish changing colour": "Sepia officinalis",
  "a seahorse holding onto a blade": "Hippocampus hippocampus",
  "a noble pen shell standing upright in the sand": "Pinna nobilis",
  "juvenile sea bass among the shoots": "Dicentrarchus labrax",
  "a wrasse sleeping among the leaves": "Coris julis",
  "a bottlenose dolphin passing offshore": "Tursiops truncatus",
  "tuna cutting through a bait ball": "Thunnus thynnus",
  "a loggerhead turtle surfacing to breathe": "Caretta caretta",
  "sea sparkle glowing in the wake after dark": "Noctiluca scintillans",
  // Reward tiers
  "a wrasse": "Coris julis",
  "a seabream": "Diplodus vulgaris",
  "a school of fish": "Atherina hepsetus",
  "a sea cucumber": "Holothuria tubulosa",
  "a grazing salema": "Sarpa salpa",
  "a pen shell": "Pinna nobilis",
  "a cuttlefish": "Sepia officinalis",
  "a seahorse": "Hippocampus hippocampus",
  "a dolphin": "Tursiops truncatus",
  "a loggerhead turtle": "Caretta caretta",
  "sea sparkle after dark": "Noctiluca scintillans",
};

function SpeciesPhrase({ phrase }: { phrase: string }) {
  const t = useT();
  const sci = linkedSpecies[phrase];
  if (!sci) return <span>{t(phrase)}</span>;
  return (
    <Link
      to="/flora-fauna"
      hash={speciesSlug(sci)}
      className="underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
      title={sci}
    >
      {t(phrase)}
    </Link>
  );
}

type LookClosely = { name: string; sci: string; what: string; look: string };

const lookClosely: LookClosely[] = [
  {
    name: "Peacock wrasse",
    sci: "Symphodus tinca",
    what: "The males flash electric green and blue through the spring.",
    look: "Their colours shift as they turn toward the sun.",
  },
  {
    name: "Octopus",
    sci: "Octopus vulgaris",
    what: "Often invisible until it moves.",
    look: "Empty shell piles often reveal the entrance to its den.",
  },
  {
    name: "Sea cucumber",
    sci: "Holothuria tubulosa",
    what: "Slow recycler of the seabed.",
    look: "You will often see neat strings of cleaned sand behind it.",
  },
  {
    name: "Salema",
    sci: "Sarpa salpa",
    what: "One of the few herbivorous fish in the Mediterranean.",
    look: "Watch them bite individual Posidonia leaves one after another.",
  },
  {
    name: "Cuttlefish",
    sci: "Sepia officinalis",
    what: "Master of camouflage.",
    look: "Stay still for thirty seconds and watch waves of colour travel across its skin.",
  },
];

type Tier = { title: string; note: string; items: string[] };

const tiers: Tier[] = [
  {
    title: "First Snorkel",
    note: "Almost certain on any calm day.",
    items: ["a wrasse", "a seabream", "a school of fish", "a sea cucumber"],
  },
  {
    title: "Careful Observer",
    note: "For swimmers who stop moving and watch.",
    items: ["an octopus den", "a grazing salema", "a pen shell", "a cuttlefish"],
  },
  {
    title: "Lucky Day",
    note: "Rare, unplannable, worth remembering.",
    items: ["a seahorse", "a dolphin", "a loggerhead turtle", "sea sparkle after dark"],
  },
];

function Snorkeling() {
  const t = useT();
  return (
    <SiteLayout>
      <div className="relative h-64 overflow-hidden">
        <img
          src={posidonia}
          alt={t("Posidonia meadow in shallow water off Kriopigi")}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      <PageHeader
        eyebrow="Snorkel Journey"
        title="What will you discover as you swim farther from shore?"
        lead="Kriopigi has no famous dive sites. It has something better: you can walk in off the sand and watch the ecosystem change beneath you. Read this as one continuous swim, from dry sand to open blue."
      />

      <div className="px-5 max-w-3xl mx-auto space-y-10">
        {zones.map((z, i) => (
          <section key={z.id} id={z.id} className="relative pl-6">
            <span
              aria-hidden="true"
              className="absolute left-0 top-2 bottom-0 w-px bg-border"
            />
            <span
              aria-hidden="true"
              className="absolute left-[-4px] top-2 w-[9px] h-[9px] rounded-full bg-accent"
            />
            <p className="text-[11px] uppercase tracking-[0.25em] text-accent font-medium">{t(z.eyebrow)}</p>
            <h2 className="mt-1 font-serif text-3xl text-foreground">{t(z.title)}</h2>
            <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{t(z.depth)}</p>
            <p className="mt-3 text-muted-foreground leading-relaxed">{t(z.lead)}</p>

            <div className="mt-5 rounded-2xl bg-card border border-border shadow-soft p-5">
              <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                {i === 0 ? t("Look for") : t("Can you find\u2026")}
              </p>
              <ul className="mt-3 space-y-2">
                {z.hunt.map((h) => (
                  <li key={h} className="flex gap-3 text-sm text-foreground/90 leading-relaxed">
                    <span
                      aria-hidden="true"
                      className="mt-[3px] w-3.5 h-3.5 rounded-[3px] border border-accent/60 flex-shrink-0"
                    />
                    <SpeciesPhrase phrase={h} />
                  </li>
                ))}
              </ul>
            </div>

            {z.tip && (
              <div className="mt-4 rounded-xl border border-dashed border-border bg-muted/30 p-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-accent">{t(z.tipLabel ?? "Look closely")}</p>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{t(z.tip)}</p>
              </div>
            )}
          </section>
        ))}
      </div>

      <section className="px-5 max-w-3xl mx-auto mt-16">
        <p className="text-[11px] uppercase tracking-[0.25em] text-accent font-medium">{t("Look Closely")}</p>
        <h2 className="mt-2 font-serif text-3xl text-foreground">{t("Five things worth waiting for")}</h2>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          {t("Knowing a species' name is the easy part. These small observation challenges are what turn a swim into a field session.")}
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {lookClosely.map((s) => (
            <li key={s.sci} className="rounded-2xl bg-card border border-border shadow-soft p-5">
              <h3 className="font-serif text-xl text-foreground">{t(s.name)}</h3>
              <Link
                to="/flora-fauna"
                hash={speciesSlug(s.sci)}
                className="text-xs italic text-muted-foreground underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
              >
                {s.sci}
              </Link>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t(s.what)}</p>
              <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-accent">{t("Look closely")}</p>
              <p className="mt-1 text-sm text-foreground/90 leading-relaxed">{t(s.look)}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="px-5 max-w-3xl mx-auto mt-16">
        <p className="text-[11px] uppercase tracking-[0.25em] text-accent font-medium">{t("Reward curiosity")}</p>
        <h2 className="mt-2 font-serif text-3xl text-foreground">{t("Three levels of attention")}</h2>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          {t("Not a collection to complete. Three tiers of patience — most swimmers finish the first on their first morning, and the last is a matter of luck.")}
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {tiers.map((tier) => (
            <div key={tier.title} className="rounded-2xl bg-card border border-border shadow-soft p-5">
              <h3 className="font-serif text-xl text-foreground">{t(tier.title)}</h3>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{t(tier.note)}</p>
              <ul className="mt-3 space-y-2">
                {tier.items.map((it) => (
                  <li key={it} className="flex gap-2.5 text-sm text-foreground/90">
                    <span aria-hidden="true" className="mt-[5px] w-2.5 h-2.5 rounded-full border border-accent/60 flex-shrink-0" />
                    <SpeciesPhrase phrase={it} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 max-w-3xl mx-auto mt-16">
        <div className="rounded-2xl border border-border bg-secondary/40 p-6">
          <p className="text-[11px] uppercase tracking-[0.2em] text-accent">{t("Log what you saw")}</p>
          <h2 className="mt-2 font-serif text-2xl text-foreground">{t("Your swim can become a record")}</h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {t("Photograph anything you cannot name and upload it to iNaturalist — a free platform where naturalists help confirm identifications. Each verified photo turns a holiday sighting into an occurrence record for this stretch of coast.")}
          </p>
          <a
            href="https://www.inaturalist.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm text-accent hover:underline"
          >
            {t("Open iNaturalist \u2192")}
          </a>
        </div>
      </section>
    </SiteLayout>
  );
}
