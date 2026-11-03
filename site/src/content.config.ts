// Collection schemas from plan/contracts.md section 3 (M00-05). Files live in src/content/<collection>/{sr|en}/...
import { readdirSync, existsSync } from 'node:fs';
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** glob() warns when a folder has no Markdown yet; until the first file arrives (M02) use an empty loader so the build stays free of warnings. */
function markdown(base: string) {
  const dir = new URL(`./content/${base}/`, import.meta.url);
  const has = existsSync(dir) && readdirSync(dir, { recursive: true }).some((f) => String(f).endsWith('.md'));
  return has ? glob({ pattern: '**/*.md', base: `./src/content/${base}` }) : { name: `empty-${base}`, load: async () => {} };
}

const lang = z.enum(['sr', 'en']);
const date = z.coerce.date(); // YAML dates (2026-11-03) arrive as dates; strings are accepted too
const transit = z.object({ planet: z.string(), sign: z.string(), from: date, to: date });
const signs = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'] as const;
const topics = ['transits', 'signs', 'rising-sign', 'children', 'finances', 'eclipses', 'karmic', 'method'] as const;

const articles = defineCollection({
  loader: markdown('articles'),
  schema: z.object({
    title: z.string().max(70),
    description: z.string().max(155),
    lang,
    translationKey: z.string().min(1),
    published: date,
    updated: date.optional(),
    topics: z.array(z.enum(topics)).min(1),
    answer: z.string().refine((s) => { const n = s.trim().split(/\s+/).length; return n >= 40 && n <= 60; }, 'answer must be 40-60 words'),
    quote: z.object({ text: z.string(), author: z.string() }).optional(),
    transits: z.array(transit).optional(),
    ephemerisChecked: z.boolean(),
    oldUrl: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

const horoscope = defineCollection({
  loader: markdown('horoscope'),
  schema: z.object({
    sign: z.enum(signs),
    year: z.number().int(),
    title: z.string().max(70),
    description: z.string().max(155),
    lang,
    translationKey: z.string().min(1),
    answer: z.string(),
    ephemerisChecked: z.boolean(),
    transits: z.array(transit).optional(),
    oldUrl: z.string().optional(),
  }),
});

const pages = defineCollection({
  loader: markdown('pages'),
  schema: z.object({
    title: z.string().max(70),
    description: z.string().max(155),
    lang,
    translationKey: z.string().min(1),
    updated: date,
  }),
});

export const collections = { articles, horoscope, pages };
