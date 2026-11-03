// Language helpers (M00, plan/contracts.md section 2). Pure functions: no Astro imports, so `node --test` can run them.

export const LANGS = ['sr', 'en'] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = 'sr';

/** Value for <html lang>: Serbian is written in Latin script (specs/05 rule 4). */
export function htmlLang(lang: Lang): string {
  return lang === 'sr' ? 'sr-Latn' : 'en';
}

export function isLang(value: unknown): value is Lang {
  return typeof value === 'string' && (LANGS as readonly string[]).includes(value);
}

/** The language of a path: `/en/...` is English, everything else Serbian. */
export function langFromPath(pathname: string): Lang {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'sr';
}

export function langFromUrl(url: URL): Lang {
  return langFromPath(url.pathname);
}

export function otherLang(lang: Lang): Lang {
  return lang === 'sr' ? 'en' : 'sr';
}

/** Remove the language prefix: `/en/articles/x/` -> `/articles/x/`, `/en/` -> `/`. */
export function stripLang(pathname: string): string {
  if (pathname === '/en') return '/';
  return pathname.startsWith('/en/') ? pathname.slice(3) : pathname;
}

/** Path for a language. `path` is language-neutral and starts with `/`: localizedPath('en', '/') -> '/en/'. */
export function localizedPath(lang: Lang, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return lang === DEFAULT_LANG ? clean : `/en${clean}`;
}

export type Strings = Record<string, Record<Lang, string>>;

/** Check one `src/i18n/<module>.json`: every key needs a non-empty text in every language. Throws, so the build fails. */
export function defineStrings<T extends Strings>(name: string, data: T): T {
  const problems: string[] = [];
  for (const [key, texts] of Object.entries(data)) {
    for (const lang of LANGS) {
      const text = (texts as Record<string, unknown> | undefined)?.[lang];
      if (typeof text !== 'string' || text.trim() === '') problems.push(`${name}.json: "${key}" has no "${lang}" text`);
    }
  }
  if (problems.length) throw new Error(`Missing translations:\n${problems.join('\n')}`);
  return data;
}

export function t<T extends Strings>(strings: T, key: keyof T & string, lang: Lang): string {
  const text = strings[key]?.[lang];
  if (text === undefined) throw new Error(`Missing translation: "${key}" (${lang})`);
  return text;
}
