import { Link, useLocation } from "@tanstack/react-router";
import { Map, BookOpen, Mic, Shield, Waves, Cloud, Send, Home, Leaf, User } from "lucide-react";
import type { ReactNode } from "react";
import { useLanguage } from "@/i18n";

export function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  return (
    <div className="flex items-center rounded-full border border-border overflow-hidden text-[11px] tracking-wide">
      <button
        type="button"
        onClick={() => setLang("el")}
        aria-pressed={lang === "el"}
        className={`px-2.5 py-1 flex items-center gap-1 transition-colors ${lang === "el" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"}`}
      >
        <span aria-hidden="true">🇬🇷</span>
        ΕΛ
      </button>
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`px-2.5 py-1 flex items-center gap-1 transition-colors ${lang === "en" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"}`}
      >
        <span aria-hidden="true">🇬🇧</span>
        EN
      </button>
    </div>
  );
}

const nav = [
  { to: "/", label: "Home", icon: Home },
  { to: "/flora-fauna", label: "Flora & Fauna", icon: Leaf },
  { to: "/map", label: "Map", icon: Map },
  { to: "/field-notes", label: "History", icon: BookOpen },
  { to: "/oral-history", label: "Voices", icon: Mic },
  { to: "/conservation", label: "Care", icon: Shield },
  { to: "/snorkeling", label: "Snorkel", icon: Waves },
  { to: "/conditions", label: "Sea", icon: Cloud },
  { to: "/submit", label: "Submit", icon: Send },
  { to: "/about", label: "About", icon: User },
] as const;

export function SiteLayout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const { lang, t } = useLanguage();
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="max-w-5xl mx-auto px-5 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="w-8 h-8 rounded-full bg-gradient-sea grid place-items-center text-primary-foreground text-xs font-semibold shadow-soft">
              {lang === "el" ? "ΟΑΚ" : "KS"}
            </span>
            <div className="leading-tight">
              <div className="font-serif text-lg text-foreground">{t("Kriopigi")}</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground -mt-0.5">{t("Shore Guide")}</div>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <nav className="hidden md:flex gap-1 text-sm">
              {nav.slice(1).map((n) => (
                <Link key={n.to} to={n.to} className="px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors" activeProps={{ className: "text-foreground bg-muted" }}>
                  {t(n.label)}
                </Link>
              ))}
            </nav>
            <LanguageToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 pb-24 md:pb-12">{children}</main>

      <footer className="border-t border-border py-8 px-5 text-center text-xs text-muted-foreground">
        <p className="font-serif italic text-base text-foreground/70">{t('"If you take Greece apart, in the end all that will remain are an olive tree, a vine, and a ship. Which means: with those three things, you can build her again." — Odysseas Elytis')}</p>
        <p className="mt-2">{t("Kriopigi Shore Guide · Halkidiki, Greece")}</p>
      </footer>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-background/95 backdrop-blur-md border-t border-border">
        <div className="grid grid-cols-5 px-1">
          {nav.slice(0, 5).map((n) => {
            const Icon = n.icon;
            const active = pathname === n.to;
            return (
              <Link key={n.to} to={n.to} className={`flex flex-col items-center gap-1 py-2.5 text-[10px] ${active ? "text-accent" : "text-muted-foreground"}`}>
                <Icon size={18} strokeWidth={1.6} />
                {t(n.label)}
              </Link>
            );
          })}
        </div>
        <div className="grid grid-cols-5 px-1 border-t border-border">
          {nav.slice(5).map((n) => {
            const Icon = n.icon;
            const active = pathname === n.to;
            return (
              <Link key={n.to} to={n.to} className={`flex flex-col items-center gap-1 py-2.5 text-[10px] ${active ? "text-accent" : "text-muted-foreground"}`}>
                <Icon size={18} strokeWidth={1.6} />
                {t(n.label)}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export function PageHeader({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  const { t } = useLanguage();
  return (
    <div className="px-5 pt-10 pb-6 max-w-3xl mx-auto">
      <p className="text-[11px] uppercase tracking-[0.25em] text-accent font-medium">{t(eyebrow)}</p>
      <h1 className="mt-2 text-4xl md:text-5xl font-serif text-foreground text-balance">{t(title)}</h1>
      {lead && <p className="mt-3 text-muted-foreground leading-relaxed text-balance">{t(lead)}</p>}
    </div>
  );
}
