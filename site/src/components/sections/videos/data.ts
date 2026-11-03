// Video data (contracts section 3). src/data/videos.json is written by `npm run import:videos`; thumbnails are local files.
import type { ImageMetadata } from 'astro';
import { z } from 'astro/zod';
import raw from '../../../data/videos.json';
import { type Lang } from '../../../i18n/core';

const schema = z.array(z.object({
  id: z.string().min(5),
  slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
  title: z.string().min(1),
  published: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  description: z.string(),
  lang: z.enum(['sr', 'en']),
}));

const thumbnails = import.meta.glob<{ default: ImageMetadata }>('../../../assets/videos/*.jpg', { eager: true });

type Entry = z.infer<typeof schema>[number];
export type Video = Entry & { thumbnail: ImageMetadata; url: string; embed: string };

/** YouTube descriptions come with trailing spaces and long runs of blank lines; clean them once here. */
const cleanText = (text: string) => text.split('\n').map((line) => line.trim()).join('\n').replace(/\n{3,}/g, '\n\n').trim();

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

/** First paragraph of the YouTube description, cut to fit a meta description. */
export function shortDescription(text: string, max = 155): string {
  const first = (text.split(/\n\s*\n/)[0] ?? '').replace(/\s+/g, ' ').trim();
  if (first.length <= max) return first;
  return first.slice(0, max - 1).replace(/\s+\S*$/, '') + '…';
}

/** Title for <title> and social cards: at most `max` characters, cut at a word boundary (the page's H1 keeps the full title). */
export function shortTitle(title: string, max = 60): string {
  if (title.length <= max) return title;
  return title.slice(0, max - 1).replace(/\s+\S*$/, '').replace(/[\s,;:–-]+$/, '') + '…';
}
