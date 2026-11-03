// JSON-LD builders (M04-02, specs/06). Each returns a plain object; Seo.astro puts them in one @graph.
// Rule: the data comes from the same source as the visible text, so the two always match.
import type { Lang } from '../../i18n/core';

export const SITE = 'https://astromicroscope.com';
export const SOCIAL = ['https://www.instagram.com/astromicroscope/', 'https://www.youtube.com/@astromicroscope'];
const IN_LANGUAGE: Record<Lang, string> = { sr: 'sr-Latn', en: 'en' };
export const abs = (path: string, site: string = SITE) => new URL(path, site).href;

export type Json = Record<string, unknown>;

export function organization(site = SITE): Json {
  return {
    '@type': 'Organization',
    '@id': `${site}/#organization`,
    name: 'Astromicroscope',
    url: `${site}/`,
    logo: abs('/icon-512.png', site),
    sameAs: SOCIAL,
    founder: { '@id': `${site}/#gorica` },
  };
}

export function webSite(lang: Lang, site = SITE): Json {
  return {
    '@type': 'WebSite',
    '@id': `${site}/#website`,
    name: 'Astromicroscope',
    url: `${site}/`,
    inLanguage: ['sr-Latn', 'en'],
    publisher: { '@id': `${site}/#organization` },
  };
}

/** Gorica as a Person. `alumniOf` and the job title follow D20 (professional astrologer, Johannes Kepler Institute, 2025). */
export function person(lang: Lang, site = SITE): Json {
  return {
    '@type': 'Person',
    '@id': `${site}/#gorica`,
    name: 'Gorica Vićentijević',
    jobTitle: lang === 'sr' ? 'Profesionalni astrolog' : 'Professional astrologer',
    alumniOf: { '@type': 'EducationalOrganization', name: 'Johannes Kepler Institute' },
    sameAs: SOCIAL,
    url: `${site}/`,
  };
}

export interface Crumb { name: string; url: string }

export function breadcrumbList(crumbs: Crumb[], site = SITE): Json {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: abs(c.url, site) })),
  };
}

export function profilePage(lang: Lang, url: string, site = SITE): Json {
  return { '@type': 'ProfilePage', url: abs(url, site), inLanguage: IN_LANGUAGE[lang], mainEntity: { '@id': `${site}/#gorica` } };
}

export interface ArticleInput { headline: string; url: string; published: string; updated?: string; image?: string; lang: Lang; description?: string }
export function article(a: ArticleInput, site = SITE): Json {
  return {
    '@type': 'Article',
    headline: a.headline,
    ...(a.description ? { description: a.description } : {}),
    mainEntityOfPage: abs(a.url, site),
    datePublished: a.published,
    dateModified: a.updated ?? a.published,
    inLanguage: IN_LANGUAGE[a.lang],
    author: { '@id': `${site}/#gorica` },
    publisher: { '@id': `${site}/#organization` },
    ...(a.image ? { image: abs(a.image, site) } : {}),
  };
}

export interface VideoInput { name: string; description: string; thumbnail: string; uploadDate: string; duration?: string; embedUrl?: string; transcript?: string; lang: Lang }
export function videoObject(v: VideoInput, site = SITE): Json {
  return {
    '@type': 'VideoObject',
    name: v.name,
    description: v.description,
    thumbnailUrl: abs(v.thumbnail, site),
    uploadDate: v.uploadDate,
    inLanguage: IN_LANGUAGE[v.lang],
    ...(v.duration ? { duration: v.duration } : {}),
    ...(v.embedUrl ? { embedUrl: v.embedUrl } : {}),
    ...(v.transcript ? { transcript: v.transcript } : {}),
  };
}

/** One @graph for a page: the site-wide entities, the breadcrumbs if any, then the page's own types. */
export function graph(lang: Lang, extra: Json[], crumbs?: Crumb[], site = SITE): Json {
  return {
    '@context': 'https://schema.org',
    '@graph': [webSite(lang, site), organization(site), person(lang, site), ...(crumbs?.length ? [breadcrumbList(crumbs, site)] : []), ...extra],
  };
}
