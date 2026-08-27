import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { useT } from "@/i18n";
import { Mountain, Users, Leaf } from "lucide-react";
import posidonia from "@/assets/flora-fauna-damselfish.jpg";
import tower from "@/assets/anthropology-tower.webp";
import hero from "@/assets/hero-kriopigi.webp";

export const Route = createFileRoute("/field-notes")({
  head: () => ({
    meta: [
      { title: "Field Notes — Kriopigi Shore Guide" },
      { name: "description", content: "A chronological field guide to Kriopigi: geology, human history, and the living shore." },
    ],
  }),
  component: FieldNotesLayout,
});

const sections = [
  {
    to: "/field-notes/geology" as const,
    eyebrow: "I · Deep Time",
    title: "Geological & Natural History",
    desc: "How tectonics, limestone, and the cold spring shaped the cove and its ecosystem.",
    image: hero,
    icon: Mountain,
  },
  {
    to: "/field-notes/anthropology" as const,
    eyebrow: "II · Human Time",
    title: "Anthropological History",
    desc: "From the first settlers of Halkidiki through Byzantine villages to modern tourism.",
    image: tower,
    icon: Users,
  },
  {
    to: "/flora-fauna" as const,
    eyebrow: "III · Living Shore",
    title: "Flora & Fauna",
    desc: "A field catalogue from the dune line outward — beach, surf, shallows, and deep water.",
    image: posidonia,
    icon: Leaf,
  },
];

function FieldNotesLayout() {
  const t = useT();
  const { pathname } = useLocation();
  const isHub = pathname === "/field-notes" || pathname === "/field-notes/";
  if (!isHub) return <Outlet />;

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Field Notes"
        title="A chronological reading of the shore"
        lead="Three layers, in order: the rock beneath, the people upon it, and the life that returns each season."
      />
      <div className="px-5 max-w-3xl mx-auto space-y-5 pb-8">
        {sections.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.to}
              to={s.to}
              className="group block rounded-2xl overflow-hidden bg-card border border-border shadow-soft hover:shadow-deep transition-shadow"
            >
              <div className="grid sm:grid-cols-[180px_1fr]">
                <div className="aspect-[5/3] sm:aspect-auto overflow-hidden">
                  <img src={s.image} alt="" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-accent">
                    <Icon size={16} />
                    <span className="text-[10px] uppercase tracking-[0.25em]">{t(s.eyebrow)}</span>
                  </div>
                  <h2 className="mt-1 font-serif text-2xl text-foreground">{t(s.title)}</h2>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t(s.desc)}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm text-accent">
                    {t("Read section →")}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </SiteLayout>
  );
}
