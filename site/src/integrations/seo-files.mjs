// Writes dist/sitemap.xml and dist/robots.txt after the build (M04-04, specs/06).
// The sitemap is built from what the pages themselves say (canonical + hreflang links written by Seo.astro), so the two never disagree.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

async function htmlFiles(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await htmlFiles(p)));
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

const attr = (tag, name) => tag.match(new RegExp(`${name}="([^"]*)"`))?.[1];
const escape = (s) => s.replaceAll('&amp;', '&').replaceAll('&', '&amp;').replaceAll('<', '&lt;');

/** Extract canonical URL and alternates from a page's HTML; returns null for pages that must stay out of the sitemap. */
export function pageEntry(html, fileName = '') {
  if (fileName.endsWith('404.html')) return null;
  if (/<meta[^>]*data-page-noindex/.test(html)) return null;
  const links = html.match(/<link [^>]*>/g) ?? [];
  const canonical = links.map((l) => ({ rel: attr(l, 'rel'), href: attr(l, 'href') })).find((l) => l.rel === 'canonical')?.href;
  if (!canonical) return null;
  const alternates = links.filter((l) => attr(l, 'rel') === 'alternate' && attr(l, 'hreflang')).map((l) => ({ hreflang: attr(l, 'hreflang'), href: attr(l, 'href') }));
  return { canonical, alternates };
}

export function buildSitemap(entries) {
  const urls = entries.sort((a, b) => a.canonical.localeCompare(b.canonical)).map((e) => {
    const alts = e.alternates.map((a) => `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${escape(a.href)}"/>`).join('\n');
    return `  <url>\n    <loc>${escape(e.canonical)}</loc>${alts ? `\n${alts}` : ''}\n  </url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`;
}

/** Crawlers: all allowed in production (AI training crawlers are open decision P03, so no rule for them yet); nothing in previews. */
export function buildRobots({ isProduction, site }) {
  return isProduction
    ? `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`
    : `# Preview or local build: not for search engines.\nUser-agent: *\nDisallow: /\n`;
}

/** @param {{ isProduction: boolean, site: string }} options @returns {import('astro').AstroIntegration} */
export default function seoFiles({ isProduction, site }) {
  return {
    name: 'am-seo-files',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const root = fileURLToPath(dir);
        const entries = [];
        for (const file of await htmlFiles(root)) {
          const entry = pageEntry(await readFile(file, 'utf8'), file);
          if (entry) entries.push(entry);
        }
        await writeFile(join(root, 'sitemap.xml'), buildSitemap(entries));
        await writeFile(join(root, 'robots.txt'), buildRobots({ isProduction, site }));
      },
    },
  };
}
