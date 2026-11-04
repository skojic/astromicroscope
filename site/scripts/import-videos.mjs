// Imports the channel feed into src/data/videos.json and downloads thumbnails into src/assets/videos/ (M11-01).
//   npm run import:videos
// Run by a person, not on every build: the build stays offline and repeatable, and the result is reviewed in a pull request.
// Source: the public channel RSS feed (YouTube lists the newest 15 videos in it). No API key needed.
import { writeFile, readFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export const CHANNEL_ID = 'UCv3_4mUPiMaAY-TftEUfdKA';
const FEED = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

const decode = (s) => s.replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&quot;', '"').replaceAll('&#39;', "'").replaceAll('&apos;', "'").replaceAll('&amp;', '&');
const tag = (xml, name) => { const m = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`)); return m ? decode(m[1]).trim() : ''; };

/** Slug rules of specs/01: lowercase ASCII, words joined by hyphens, č ć -> c, š -> s, ž -> z, đ -> dj. */
export function slugify(title, max = 60) {
  const ascii = title.toLowerCase().replaceAll('đ', 'dj').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  if (ascii.length <= max) return ascii;
  const cut = ascii.slice(0, max);
  return cut.slice(0, Math.max(cut.lastIndexOf('-'), 20));
}

export function parseFeed(xml) {
  return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map(([, e]) => ({
    id: tag(e, 'yt:videoId'),
    title: tag(e, 'title').replace(/\s+/g, ' '),
    published: tag(e, 'published').slice(0, 10), // the date shown on the page
    publishedAt: tag(e, 'published'), // the full timestamp with its timezone, for structured data (uploadDate)
    description: tag(e, 'media:description'),
  }));
}

async function download(id) {
  // maxresdefault is 16:9 at 1280x720 when it exists; hqdefault (4:3 with bars) is the fallback.
  for (const name of ['maxresdefault', 'hqdefault']) {
    const res = await fetch(`https://i.ytimg.com/vi/${id}/${name}.jpg`);
    if (res.ok) return Buffer.from(await res.arrayBuffer());
  }
  throw new Error(`no thumbnail for ${id}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const root = new URL('../', import.meta.url);
  const res = await fetch(FEED, { headers: { 'user-agent': 'astromicroscope-site-import' } });
  if (!res.ok) throw new Error(`feed: HTTP ${res.status}`);
  const entries = parseFeed(await res.text()).sort((a, b) => b.published.localeCompare(a.published));
  if (!entries.length) throw new Error('feed has no entries; nothing written');
  await mkdir(new URL('src/assets/videos/', root), { recursive: true });
  const seen = new Set();
  const videos = [];
  for (const v of entries) {
    let slug = slugify(v.title);
    if (seen.has(slug)) slug = `${slug}-${v.id.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
    seen.add(slug);
    const file = new URL(`src/assets/videos/${v.id}.jpg`, root);
    if (!existsSync(file)) await writeFile(file, await download(v.id));
    videos.push({ id: v.id, slug, title: v.title, published: v.published, publishedAt: v.publishedAt, description: v.description, lang: 'sr' });
  }
  await writeFile(new URL('src/data/videos.json', root), JSON.stringify(videos, null, 2) + '\n');
  console.log(`wrote src/data/videos.json: ${videos.length} videos`);
}
