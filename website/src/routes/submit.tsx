import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { useT } from "@/i18n";
import { useState } from "react";
import { Camera, MapPin, Send } from "lucide-react";

export const Route = createFileRoute("/submit")({
  head: () => ({
    meta: [
      { title: "Submit an Observation — Kriopigi Shore Guide" },
      { name: "description", content: "Share what you saw at Kriopigi: species, weather, debris, anything worth recording." },
    ],
  }),
  component: Submit,
});

function Submit() {
  const t = useT();
  const [sent, setSent] = useState(false);

  return (
    <SiteLayout>
      <PageHeader eyebrow="Citizen science" title="Add to the record" lead="What did you see? Even small notes — a jellyfish bloom, an unusual bird — become part of the long memory of the bay." />
      <div className="px-5 max-w-2xl mx-auto">
        {sent ? (
          <div className="rounded-2xl bg-gradient-sea text-primary-foreground p-8 text-center shadow-deep">
            <h2 className="font-serif text-3xl">{t("Thank you.")}</h2>
            <p className="mt-2 opacity-90">{t("Your observation has been queued for review. The shore is wider for it.")}</p>
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="rounded-2xl bg-card border border-border shadow-soft p-6 space-y-5"
          >
            <Field label="Your name (or initials)">
              <input required className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder={t("e.g. M. Papadopoulos")} />
            </Field>
            <Field label="What did you see?">
              <input required className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder={t("Species, behavior, or event")} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Date">
                <input type="date" className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm" />
              </Field>
              <Field label="Approx. location">
                <div className="relative">
                  <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input className="w-full rounded-md border border-input bg-background pl-9 pr-3 py-2.5 text-sm" placeholder={t("e.g. North Cove")} />
                </div>
              </Field>
            </div>
            <Field label="Notes">
              <textarea rows={4} className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm resize-none" placeholder={t("Time of day, weather, behavior, count…")} />
            </Field>
            <button type="button" className="w-full inline-flex items-center justify-center gap-2 rounded-md border border-dashed border-border py-3 text-sm text-muted-foreground hover:text-foreground hover:border-accent transition">
              <Camera size={16} /> {t("Attach a photo (optional)")}
            </button>
            <button type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-accent text-accent-foreground py-3 text-sm font-medium shadow-soft hover:opacity-90 transition">
              <Send size={16} /> {t("Submit observation")}
            </button>
          </form>
        )}
      </div>
    </SiteLayout>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  const t = useT();
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-1.5">{t(label)}</span>
      {children}
    </label>
  );
}
