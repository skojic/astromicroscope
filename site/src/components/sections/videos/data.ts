// Video data (contracts section 3). src/data/videos.json is written by `npm run import:videos`; thumbnails are local files.
import type { ImageMetadata } from 'astro';
import { z } from 'astro/zod';
import raw from '../../../data/videos.json';
import { type Lang } from '../../../i18n/core';
import { cleanText, shortDescription } from './text';

const schema = z.array(z.object({
  id: z.string().min(5),
  slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
  title: z.string().min(1),
  published: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  // Full ISO 8601 timestamp with timezone: Google's Rich Results Test wants this for VideoObject uploadDate (a bare date is flagged).
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})$/),
  description: z.string(),
  lang: z.enum(['sr', 'en']),
}).refine((v) => v.publishedAt.startsWith(v.published), { message: 'published must be the date part of publishedAt' }));

const thumbnails = import.meta.glob<{ default: ImageMetadata }>('../../../assets/videos/*.jpg', { eager: true });

type Entry = z.infer<typeof schema>[number];
export type Video = Entry & { thumbnail: ImageMetadata; url: string; embed: string };


export const videos: Video[] = schema.parse(raw).map((v) => {
  const thumb = thumbnails[`../../../assets/videos/${v.id}.jpg`];
  if (!thumb) throw new Error(`videos.json: no thumbnail src/assets/videos/${v.id}.jpg (run npm run import:videos)`);
  return { ...v, description: cleanText(v.description), thumbnail: thumb.default, url: `https://www.youtube.com/watch?v=${v.id}`, embed: `https://www.youtube-nocookie.com/embed/${v.id}` };
}).sort((a, b) => b.published.localeCompare(a.published));

export const CHANNEL_URL = 'https://www.youtube.com/@astromicroscope';

/** Both routes show every video: the interface follows the page language, the video stays in its own language. */
export function videoPaths(v: Pick<Video, 'slug'>) {
  return { sr: `/video/${v.slug}/`, en: `/en/videos/${v.slug}/` } as const;
}

export function formatDate(iso: string, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === 'sr' ? 'sr-Latn' : 'en-GB', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(iso));
}

// English titles and short summaries for the videos, so the /en/ videos pages and home render in English.
// The videos themselves are in Serbian (the YouTube description stays Serbian on the detail page); the title and a
// one-line summary are translated here for the interfaces that follow the page language.
const EN_TEXT: Record<string, { title: string; summary: string }> = {
  DKALRLQDYNO: {
    title: 'October and its challenges — what the retrograde Venus brings',
    summary: 'Retrograde Venus in Scorpio from 3 October to 14 November 2026, and what it can stir in love, relationships, money and values.',
  },
  PRHLFJM0Y08: {
    title: 'Retrograde Mercury in Pisces 2026 | Astromicroscope',
    summary: 'What the retrograde Mercury in Pisces means, how it shows up in daily life, and how to use the period.',
  },
  EFX7HCZQGSS: {
    title: 'Chaos or freedom? — Uranus in Gemini for every zodiac sign | Astromicroscope',
    summary: 'Uranus enters Gemini on 27 April 2026 and stays for about seven years, shaking up communication, information, trade and learning.',
  },
  WWEQ6JZTTYY: {
    title: 'Saturn in Aries — its influence on every zodiac sign | Astromicroscope',
    summary: 'Saturn, the planet of time, experience and maturity, moves through our chart and gathers lessons and karmic tasks.',
  },
  ZO1RYD4K928: {
    title: 'What awaits us in February? An astrological review of the month — key dates | Astromicroscope',
    summary: 'The key dates of February: the Sun in Aquarius until the 19th, and what each period asks of you.',
  },
  '-FDVR8NEZPQ': {
    title: 'Career in the stars — your natal chart knows what you should do | Astromicroscope',
    summary: 'How I work with a natal chart to read career direction, potential and development, shown through clients\u2019 real charts.',
  },
};

/** The video title in the page language. The videos are Serbian; /en/ pages show the English title here. */
export function videoTitle(v: { id: string; title: string }, lang: Lang): string {
  if (lang === 'en') return EN_TEXT[v.id.toUpperCase()]?.title ?? v.title;
  return v.title;
}

/** The one-line summary in the page language (the full description stays the video's own language). */
export function videoSummary(v: { id: string; description: string }, lang: Lang): string {
  if (lang === 'en') return EN_TEXT[v.id.toUpperCase()]?.summary ?? shortDescription(v.description);
  return shortDescription(v.description);
}

export { shortDescription, shortTitle } from './text';
