---
id: SPEC-06
title: SEO and AI search
status: draft
updated: 2026-11-02
---

# SEO and AI search

Goal: rank as high as possible in Google for Serbian (and English) astrology questions, and be the source that AI answers (Google AI Overviews and AI Mode, ChatGPT search, others) quote and link to.

## What the platforms say (checked 2026-11-02)
- **Google AI Overviews / AI Mode**: “There are no additional requirements to appear in AI Overviews or AI Mode, nor other special optimizations necessary.” Pages must be indexed and eligible for a snippet. Google lists the basics: robots.txt and the CDN allow crawling, content is reachable through internal links, important content is in text, and structured data matches the visible text. “You don't need to create new machine readable files, AI text files, or markup to appear in these features.” (developers.google.com/search/docs/appearance/ai-features)
- **ChatGPT search** uses the crawler **OAI-SearchBot**. **GPTBot** collects training data, and blocking it does not remove the site from ChatGPT search. (developers.openai.com/api/docs/bots)
- **Structured data**: Google retired the “course info” and “learning video” rich results (announced 12 Jun 2025, documentation removed 9 Sep 2025). FAQ rich results are also deprecated and no longer shown. Do not build features that depend on them. (Google's structured data changelog)

Re-check these sources before launch; they change.

## Technical SEO (every page)
- Server-rendered HTML with all content present without JavaScript (`specs/03`).
- Unique `<title>` (≈ 50–60 characters, main topic first) and meta description (≈ 140–160 characters), in both languages. These lengths are common guidance, not a Google rule.
- Self-referencing canonical; hreflang pairs (`specs/05`).
- One H1; logical headings; descriptive link text (never “click here”).
- Clean URLs (`specs/01`); 301 redirects for any changed URL; useful 404 pages in both languages.
- `sitemap.xml` with every page and its alternates; `robots.txt` that points to it.
- Open Graph and Twitter card tags with a 1200×630 image per page, in both languages.
- HTTPS everywhere; one host (choose www or not, and redirect the other).
- Breadcrumbs, visible and as structured data.
- Images: descriptive file names, alt text, modern formats, dimensions set (`specs/07`).

## robots.txt policy
- Allow: Googlebot, Bingbot, **OAI-SearchBot** (ChatGPT search).
- **GPTBot** (training) and other AI training crawlers: owner decision P03 in `status/decisions.md`. Default proposal: allow search crawlers, decide training separately.
- Before writing robots.txt, confirm each crawler's current user-agent name in its vendor's documentation. Do not copy lists from blogs.
- An `llms.txt` file is optional. Google says it is not needed; add one only if the decision log records why.

## Structured data (JSON-LD, matching the visible text)
| Page | Types |
|---|---|
| Every page | `WebSite`, `Organization` (name, logo, `sameAs`: Instagram, YouTube), `BreadcrumbList` |
| About | `ProfilePage` with `Person` (Gorica: name, jobTitle, alumniOf [institution], sameAs) |
| Article | `Article` (headline, author → Person, datePublished, dateModified, image, inLanguage) |
| Video page | `VideoObject` (name, description, thumbnailUrl, uploadDate, duration, embedUrl, transcript if available) |
| Course page | `Course` with provider and offers; check Google's current documentation for any rich result before relying on one (“course info” was retired) |
| Product (guide, workbook) | `Product` with `Offer` (price, currency, availability) |
| Live program with dates | `Event` (online event, dates, offers) |
Validate every template with the Rich Results Test and the Schema Markup Validator (`testing/checklists/seo.md`).

## Content strategy for search and AI answers
- **Topic clusters**: hub pages (signs, planets, houses, transits, retrogrades) link to every article in the cluster, and each article links back and across.
- **Answer first**: each article opens with a direct answer of 40–60 words, then the detail. These passages are easy for snippets and AI answers to quote. The length is a working heuristic, not a platform rule.
- **Show expertise**: author box on every article (degree, years, link to About), dates, sources, and real examples from her practice. Google's people-first content guidance asks for this kind of first-hand expertise (verify the current wording before quoting it).
- **Timely pages**: one evergreen page per long transit (for example Saturn in Aries 2026–2028), updated as it unfolds, rather than many thin posts.
- **Turn the videos into text**: every YouTube video gets a page with a summary, the key dates and a transcript. The current videos have no subtitles; add captions on YouTube as well.
- **Serbian first**: Serbian-language astrology queries are likely less competitive than English ones (assumption to check with keyword research). Publish in Serbian first, then adapt to English.
- **Consistent identity**: the same name, photo, description and links on the site, Instagram, YouTube and any directory profile. This helps search engines and AI tools recognise the same person and brand.

## Measurement
- Google Search Console and Bing Webmaster Tools for both languages; submit the sitemap.
- Track impressions, clicks and position per page and query; track which pages AI answers link to (manual checks every month).
- Review monthly; record changes and their effect in `status/log.md`.
