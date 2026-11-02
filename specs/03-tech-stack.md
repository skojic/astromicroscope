---
id: SPEC-03
title: Tech stack
status: draft
updated: 2026-11-02
---

# Tech stack

No decisions yet. This file lists what must be decided and the criteria that follow from `specs/06`–`08`.

## Criteria
1. **HTML is ready on the server.** Pages are static or server-rendered, so search engines and AI crawlers read the full content without running JavaScript.
2. **Little JavaScript by default.** Interactive parts (lens, star field, accordion, language switch) are small islands, loaded late.
3. **Built-in image pipeline**: AVIF/WebP, responsive `srcset`, width and height on every image.
4. **Two languages as a first-class feature**: translated routes, hreflang, a translated sitemap.
5. **Editing for Gorica**: articles, courses and products editable without a developer (a headless CMS or Markdown in the repository).
6. **Cheap, fast hosting with a CDN.** The domain is at Hostinger; hosting can be elsewhere.

## To decide (record each in `status/decisions.md`)
| Item | Options to evaluate | Notes |
|---|---|---|
| Site framework | static site generator vs server-rendered framework | verify current versions before choosing |
| CMS | Markdown in the repository vs headless CMS | Gorica edits in Serbian and English |
| Hosting / CDN | Hostinger vs a static host with CDN | HTTPS must work |
| Course delivery | own pages + video host vs course platform | affects payments and logins |
| Payments | to be decided | Serbia: invoices, currency, VAT questions |
| Newsletter | to be decided | double opt-in, GDPR/ZZPL consent |
| Analytics | privacy-friendly, cookieless if possible | avoid a cookie banner if the law allows |

Do not use any library API before confirming it exists in the installed version.
