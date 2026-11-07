// Helpers for the transit timeline (M06-02, used by M07). Pure functions: no Astro imports, so `node --test` can run them.
import { defineStrings, t, type Lang, type Strings } from './core.ts';
import transits from './transits.json' with { type: 'json' };

export const transitStrings = defineStrings('transits', transits as Strings);

export interface Transit { planet: string; sign: string; from: Date | string; to: Date | string }

const EN_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const toDate = (d: Date | string): Date => (d instanceof Date ? d : new Date(`${String(d).slice(0, 10)}T00:00:00Z`));

/** `14.2.2026.` in Serbian, `14 Feb 2026` in English. Read in UTC so the day never shifts with the build machine's time zone. */
export function formatTransitDate(value: Date | string, lang: Lang): string {
  const d = toDate(value);
  const day = d.getUTCDate(), month = d.getUTCMonth(), year = d.getUTCFullYear();
  return lang === 'sr' ? `${day}.${month + 1}.${year}.` : `${day} ${EN_MONTHS[month]} ${year}`;
}

export function planetName(planet: string, lang: Lang): string {
  return planet in transitStrings ? t(transitStrings, planet as keyof typeof transitStrings & string, lang) : planet;
}

export function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? '');
}

/** Where each transit sits on one shared scale (percent from the left, and width), from the earliest start to the latest end. */
export function transitBars(items: Transit[]): { left: number; width: number }[] {
  const starts = items.map((i) => toDate(i.from).getTime());
  const ends = items.map((i) => toDate(i.to).getTime());
  const min = Math.min(...starts), max = Math.max(...ends), span = max - min;
  if (!items.length || span <= 0) return items.map(() => ({ left: 0, width: 100 }));
  return items.map((_, n) => ({
    left: Math.round(((starts[n] - min) / span) * 1000) / 10,
    width: Math.max(2, Math.round(((ends[n] - starts[n]) / span) * 1000) / 10),
  }));
}
