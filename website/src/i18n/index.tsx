import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { el } from "./el";

export type Lang = "en" | "el";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (s: string) => string;
};

const LanguageContext = createContext<Ctx>({
  lang: "en",
  setLang: () => {},
  t: (s) => s,
});

const STORAGE_KEY = "kriopigi-lang";

async function fetchCountryCode(): Promise<string | null> {
  try {
    const res = await fetch("https://api.country.is/", {
      method: "GET",
      headers: { accept: "application/json" },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { country?: string };
    return data.country ?? null;
  } catch {
    return null;
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "el" || stored === "en") {
        setLangState(stored);
        return;
      }
    } catch {
      /* ignore */
    }

    fetchCountryCode().then((code) => {
      setLangState(code === "GR" ? "el" : "en");
    });
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "el" ? "el" : "en";
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  };

  const t = (s: string) => (lang === "el" ? (el[s] ?? s) : s);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

/** Shorthand: const t = useT(); t("English string") */
export function useT() {
  return useContext(LanguageContext).t;
}

