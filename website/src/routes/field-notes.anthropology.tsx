import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { useT } from "@/i18n";
import { ArrowLeft } from "lucide-react";
import elder from "@/assets/anthropology-tower.webp";
import olynthusPlan from "@/assets/olynthus-megali-toumba.jpg";
import mendePithamphora from "@/assets/mende-pithamphora.jpg";
import philipII from "@/assets/philip-ii-vergina.webp";
import greatLavra from "@/assets/great-lavra-athos.jpg";
import ottomanMap from "@/assets/ottoman-chalcidique-map.jpg.asset.json";
import greekRevolution from "@/assets/greek-revolution.jpg";
import refugees1923 from "@/assets/refugees-1923.jpg";
import halkidikiBrochure from "@/assets/halkidiki-brochure.jpeg";
import olympicAirlines from "@/assets/olympic-airlines-1960s.jpg";

type Period = {
  age: string;
  title: string;
  body: string;
  image?: string;
  alt?: string;
  caption?: string;
  images?: { src: string; alt: string }[];
};

export const Route = createFileRoute("/field-notes/anthropology")({
  head: () => ({
    meta: [
      { title: "Anthropological History — Kriopigi Shore Guide" },
      { name: "description", content: "Human history of the Kassandra peninsula, from Neolithic settlers through Byzantine villages to today's tourist coast." },
    ],
  }),
  component: Anthropology,
});

const periods: Period[] = [
  {
    age: "5300–4500 BCE · Late Neolithic",
    title: "Early settled communities",
    body: "By the Late Neolithic, settled communities were established in Halkidiki. At Olynthus, north of Kassandra, excavations have revealed houses, pottery, stone tools, figurines, and weaving equipment dating to roughly 5300–4500 BCE, evidence of an established farming world in the region.",
    image: olynthusPlan,
    alt: "General plan of the southern projection of the Megali Toumba at Olynthus, showing Byzantine, Prehistoric, Classical, and unexcavated remains.",
    caption: "General plan of the southern projection of the Megali Toumba at Olynthus — a site in Halkidiki between the Kassandra and Sithonia peninsulas, not on Kassandra itself. From G. E. Mylonas, Excavations at Olynthus, Part I: The Neolithic Settlement (Johns Hopkins University Studies in Archaeology No. 6, ed. D. M. Robinson; Baltimore: The Johns Hopkins Press / London: Humphrey Milford / Oxford University Press, 1929).",
  },
  {
    age: "8th century BCE",
    title: "Ancient Mende & the Eretrian colonies",
    body: "Eretrian settlers established Mende as one of the important cities of Pallene, the ancient name of the Kassandra peninsula. By the Archaic and Classical periods, Mende was renowned for its wine, which was exported widely in locally produced transport amphorae.",
    image: mendePithamphora,
    alt: "Pithamphora with floral motifs recovered from the cemetery at Mende.",
    caption: "Pithamphora with floral motifs from the cemetery at Mende. From S. Moschonissioti, “Vases du cimetière de Mendè,” in Recherches récentes sur le monde hellénistique (Publications du Centre Jean Bérard), available via OpenEdition Books: https://books.openedition.org/pcjb/661.",
  },
  {
    age: "348 BCE",
    title: "Macedonian rule",
    body: "Philip II of Macedon destroys Olynthus in 348 BCE, breaking the power of the Chalcidian League and strengthening Macedonian control over Halkidiki. Mende was also destroyed or severely damaged during Philip's campaigns and subsequently declined as regional power shifted elsewhere.",
    image: philipII,
    alt: "Small ivory head identified as a portrait of Philip II of Macedon, recovered from the royal tumulus at Aigai (Vergina).",
    caption: "Ivory portrait head identified as Philip II of Macedon, recovered from Tomb II of the Great Tumulus at Aigai (modern Vergina), the royal necropolis of the Macedonian kings.",
  },
  {
    age: "Byzantine era",
    title: "Monastic landscape",
    body: "Mount Athos to the east develops into one of the great monastic centers of the Orthodox world. Across Halkidiki, agriculture, pastoralism, fishing, woodland use, and monastic estates shaped everyday life through the Byzantine and later Ottoman periods.",
    image: greatLavra,
    alt: "The fortified arsanas (sea-gate tower) of the Great Lavra monastery rising above the rocks on the Athos peninsula.",
    caption: "The Great Lavra (Megisti Lavra), founded in 963 CE by St. Athanasios the Athonite — the oldest and first-ranked of the twenty monasteries of Mount Athos.",
  },
  {
    age: "1430–1821",
    title: "Ottoman Kassandra",
    body: "After the fall of Thessaloniki in 1430, Halkidiki passed under Ottoman rule. Kassandra's villages were organised around agriculture, livestock, timber, and fishing, with taxation and land arrangements that included monastic estates and, elsewhere in Halkidiki, the semi-autonomous mining communities of Mademochoria. Settlement remained concentrated inland and on the hillsides rather than on the open shore.",
    image: ottomanMap.url,
    alt: "Eighteenth-century manuscript map of southeastern Chalkidiki showing the peninsulas of Kassandra, Sithonia (Longos), and Mount Athos.",
    caption: "Eighteenth-century map of southeastern Chalkidiki, showing the peninsulas of Kassandra, Sithonia (Longos), and Mount Athos. Bibliothèque nationale de France, Department of Maps and Plans, 1780. Public domain.",
  },
  {
    age: "1821 onward",
    title: "Revolution, destruction & return",
    body: "Kassandra became one of the principal centers of the 1821 uprising in Halkidiki. After months of resistance, Ottoman forces broke through the peninsula's defenses in November 1821 in the event remembered locally as the “Destruction of Kassandra.” Settlements were burned, inhabitants were killed, captured, or displaced, and the peninsula suffered severe depopulation before communities gradually recovered during the decades that followed.",
    image: greekRevolution,
    alt: "Hand-coloured lithograph depicting a battle scene from the Greek War of Independence, with Greek fighters in fustanella confronting Ottoman troops on a hillside.",
    caption: "Scene from the Greek War of Independence (1821), from the series of folk lithographs commissioned by General Yannis Makriyannis and painted by Panagiotis Zografos (1836–1839) to illustrate Makriyannis' Memoirs.",
  },
  {
    age: "1923",
    title: "Population exchange",
    body: "Following the Greco–Turkish War and the 1923 compulsory population exchange, refugees from Asia Minor and other former Ottoman territories were settled across Macedonia, including Halkidiki. Their arrival reshaped the region's settlement pattern and added new communities to the peninsula's social and cultural landscape.",
    image: refugees1923,
    alt: "Black-and-white photograph of Greek refugees from Asia Minor disembarking with their bundled belongings at the waterfront of Thessaloniki, c. 1923.",
    caption: "Greek refugees from Asia Minor arriving by caïque at the port of Thessaloniki in the wake of the 1923 Convention Concerning the Exchange of Greek and Turkish Populations. Photographer unknown; widely reproduced from the interwar press archive (see Margaret21, “Greek refugees from Smyrna arriving at Thessaloniki 1923”: https://margaret21.com/2015/02/18/nation-swap-house-swap/greek-refugees-from-smyrna-arriving-at-thessaloniki-1923/).",
  },
  {
    age: "1960s–today",
    title: "The tourist coast",
    body: "Improved roads and the rapid growth of Greek coastal tourism transformed Kassandra during the second half of the 20th century. Kriopigi expanded from its older hillside settlement into a major summer destination, while hotels, rented rooms, campsites, restaurants, and other tourism infrastructure spread toward the coast below. The change was rapid: published tourism data record 171 accommodation places in Kriopigi in 1976 and more than 2,200 by 1992. Tourism brought new livelihoods and development, while also increasing seasonal pressure on the shoreline and surrounding ecosystems.",
    images: [
      { src: halkidikiBrochure, alt: "Vintage Greek National Tourism Organisation fold-out brochure for Macedonia / Halkidiki, with sun-bleached coastal photographs." },
      { src: olympicAirlines, alt: "1960s Olympic Airways magazine advertisement showing a stylised passenger reading a newspaper above a clock-wheel, with the Acropolis and the White Tower of Thessaloniki at the base." },
    ],
    caption: "Left: fold-out tourism brochure for Macedonia / Halkidiki issued by the Greek National Tourism Organisation (EOT), c. 1970s. Right: Olympic Airways (Ολυμπιακή Αεροπορία) print advertisement, c. 1960s — “In a short while you will be at your destination, rested!” — emblematic of the jet-age opening of northern Greece to mass tourism.",
  },
];

function Anthropology() {
  const t = useT();
  return (
    <SiteLayout>
      <div className="relative h-64 overflow-hidden">
        <img src={elder} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-x-0 bottom-0 px-5 pb-6 max-w-3xl mx-auto">
          <Link to="/field-notes" className="inline-flex items-center gap-1 text-xs text-primary-foreground/80 hover:text-primary-foreground">
            <ArrowLeft size={14} /> {t("Field Notes")}
          </Link>
          <p className="mt-2 text-[11px] uppercase tracking-[0.25em] text-primary-foreground/80">{t("II · Human Time")}</p>
          <h1 className="font-serif text-4xl text-primary-foreground">{t("Anthropological History")}</h1>
        </div>
      </div>
      <PageHeader eyebrow={t("People of the cove")} title={t("Eight thousand years on a thin coast")} lead={t("From Neolithic communities to amphora merchants to modern summer arrivals — layers of human history remain visible across Kassandra and in the village above the bay.")} />
      <div className="px-5 max-w-2xl mx-auto pb-8 space-y-6">
        {periods.map((e, i) => (
          <article key={i} id={i === 0 ? "first-settlers" : undefined} className="relative pl-6 border-l-2 border-accent/40 scroll-mt-24">
            <span className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-accent" />
            <p className="text-[10px] uppercase tracking-[0.25em] text-accent">{t(e.age)}</p>
            <h2 className="mt-1 font-serif text-2xl text-foreground">{t(e.title)}</h2>
            <p className="mt-2 text-[15px] text-foreground/80 leading-relaxed">{t(e.body)}</p>
            {e.image && (
              <figure className="mt-4 rounded-xl overflow-hidden border border-border bg-card shadow-soft">
                <img src={e.image} alt={t(e.alt ?? "")} loading="lazy" className="w-full object-contain bg-[oklch(0.97_0.01_85)]" />
                {e.caption && (
                  <figcaption className="px-4 py-3 text-[11px] leading-relaxed text-muted-foreground border-t border-border">
                    {t(e.caption)}
                  </figcaption>
                )}
              </figure>
            )}
            {e.images && (
              <figure className="mt-4 rounded-xl overflow-hidden border border-border bg-card shadow-soft">
                <div className="grid grid-cols-2 gap-px bg-border">
                  {e.images.map((im, j) => (
                    <div key={j} className="bg-[oklch(0.97_0.01_85)] aspect-[3/4] flex items-center justify-center">
                      <img src={im.src} alt={t(im.alt)} loading="lazy" className="w-full h-full object-contain" />
                    </div>
                  ))}
                </div>
                {e.caption && (
                  <figcaption className="px-4 py-3 text-[11px] leading-relaxed text-muted-foreground border-t border-border">
                    {t(e.caption)}
                  </figcaption>
                )}
              </figure>
            )}
          </article>
        ))}
      </div>
    </SiteLayout>
  );
}
