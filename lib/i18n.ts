export const LANGS = ["cs", "pl", "en"] as const;
export type Lang = (typeof LANGS)[number];

export const baseUrl = process.env.PUBLIC_BASE_URL || "http://localhost:3000";

export function normalizeLang(lang: string): Lang {
  if (LANGS.includes(lang as Lang)) return lang as Lang;
  return "cs";
}

export function localizedPath(lang: Lang, path: string): string {
  return `/${lang}${path.startsWith("/") ? path : `/${path}`}`;
}

export function withAlternates(pathWithoutLang: string) {
  return {
    canonical: `${baseUrl}/cs${pathWithoutLang}`,
    languages: {
      cs: `${baseUrl}/cs${pathWithoutLang}`,
      pl: `${baseUrl}/pl${pathWithoutLang}`,
      en: `${baseUrl}/en${pathWithoutLang}`
    }
  };
}
