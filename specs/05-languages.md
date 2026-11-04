---
id: SPEC-05
title: Languages (Serbian and English)
status: draft
updated: 2026-11-02
---

# Languages

## Rules
1. Serbian (Latin script, ekavian) is the default and lives at `/`; English lives at `/en/`.
2. Every page exists in both languages, with translated slugs, titles, descriptions and alt texts.
3. The language is chosen by the URL, never by redirecting on browser language or IP. Crawlers must reach both versions.
4. `<html lang="sr-Latn">` on Serbian pages and `<html lang="en">` on English ones.
5. The language switch links to the **same page** in the other language, not to the home page.

## hreflang
Google's rules (developers.google.com/search/docs/specialty/international/localized-versions):
- Use one method: HTML `<link>` tags, HTTP headers or the XML sitemap. They are equivalent to Google.
- Each version lists itself and every other version. Links must go both ways, or they are ignored.
- Codes are ISO 639-1 for the language, optionally followed by an ISO 3166-1 region code. A country code on its own is not allowed.
- `x-default` names the fallback page.

For this site: `hreflang="sr"`, `hreflang="en"` and `hreflang="x-default"` pointing to the Serbian page. Each page is canonical to itself; never canonicalise one language to the other.

## Translation workflow
- Strings are stored per language; no machine translation at runtime.
- A native Serbian speaker (Gorica) approves the Serbian text. English is reviewed before release, by the assistant (D40).
- Grammatical gender: the site addresses the reader with “ti” and avoids gendered forms where possible.
- A missing translation fails the content gate (`testing/checklists/content.md`).
