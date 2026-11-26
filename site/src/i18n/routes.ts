// Routes that every page can link to, and the pair lookup behind the language switch (M03) and hreflang (M04).
// Slugs are translated (specs/01). Content pages (articles, horoscope) pass their own `paths` to the layout.
import { DEFAULT_LANG, LANGS, type Lang } from './core.ts';

export type Paths = Record<Lang, string>;

export const ROUTES = {
  home: { sr: '/', en: '/en/' },
  learn: { sr: '/edukacija/', en: '/en/learn/' },
  articles: { sr: '/tekstovi/', en: '/en/articles/' },
  videos: { sr: '/video/', en: '/en/videos/' },
  horoscope: { sr: '/horoskop/', en: '/en/horoscope/' },
  analyses: { sr: '/analize/', en: '/en/analyses/' },
  about: { sr: '/o-meni/', en: '/en/about/' },
  contact: { sr: '/kontakt/', en: '/en/contact/' },
} as const satisfies Record<string, Paths>;
export type RouteKey = keyof typeof ROUTES;

export function pathFor(key: RouteKey, lang: Lang): string {
  return ROUTES[key][lang];
}

/** A page inside a section: entryPath('articles', 'en', 'rising-sign') -> '/en/articles/rising-sign/'. */
export function entryPath(section: RouteKey, lang: Lang, slug: string): string {
  return `${ROUTES[section][lang]}${slug}/`;
}

/**
 * Both language paths of one entry. `slug` is one string when the slug is the same in both languages (analyses, videos),
 * or one per language when it is translated (articles, the Serbian sign slugs of the horoscope). A language without a
 * slug has no page, so it is left out (no hreflang, and the language switch falls back to that language's home page).
 */
export function entryPaths(section: RouteKey, slug: string | Partial<Record<Lang, string>>): Partial<Paths> {
  const out: Partial<Paths> = {};
  for (const lang of LANGS) {
    const s = typeof slug === 'string' ? slug : slug[lang];
    if (s) out[lang] = entryPath(section, lang, s);
  }
  return out;
}

/** The page in each language, or `undefined` for a language that has no pair (M04 then writes no hreflang for it). */
export function alternates(translationKey: string, paths?: Partial<Paths>): Partial<Paths> {
  const known = (ROUTES as Record<string, Paths>)[translationKey];
  const out: Partial<Paths> = {};
  for (const lang of LANGS) {
    const path = paths?.[lang] ?? known?.[lang];
    if (path) out[lang] = path;
  }
  return out;
}

/** Where the language switch points: the paired page, or the other language's home page if there is no pair yet. */
export function switchTarget(to: Lang, translationKey: string, paths?: Partial<Paths>): string {
  return alternates(translationKey, paths)[to] ?? ROUTES.home[to];
}

export { DEFAULT_LANG };
