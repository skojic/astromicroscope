// Article entry ids are `<lang>/<slug>` (src/content/articles/{sr,en}/<slug>.md). Pure, so `node --test` can run it.
import { LANGS, type Lang } from '../../../i18n/core.ts';

/** `sr/podznak` -> `podznak`. */
export function articleSlug(id: string): string {
  return id.slice(id.indexOf('/') + 1);
}

/** The slug of each language version of one article, found by its translationKey. A missing language is left out. */
export function articleSlugs(entries: { id: string; data: { translationKey: string } }[], translationKey: string): Partial<Record<Lang, string>> {
  const out: Partial<Record<Lang, string>> = {};
  for (const lang of LANGS) {
    const e = entries.find((x) => x.id.startsWith(`${lang}/`) && x.data.translationKey === translationKey);
    if (e) out[lang] = articleSlug(e.id);
  }
  return out;
}
