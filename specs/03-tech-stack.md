---
id: SPEC-03
title: Tech stack
status: partly decided
updated: 2026-11-05
---

# Tech stack

Framework, hosting, CMS, newsletter and analytics are decided (D09, D14, D16, D44, D47); payments stay open for iteration 2 (D14). This file lists the decisions and the criteria that follow from `specs/06`–`08`.

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
| Site framework | **Decided (D09): Astro**, React only where needed | latest on npm 2026-11-02: astro 7.4.5 |
| CMS | **Iteration 1: Markdown in the repository, Filip publishes. Iteration 2: CMS for Gorica (D14)** | `plan/iteration-2.md` |
| Hosting / CDN | **Decided (D16): Filip's Cloudflare account, Workers with static assets** (Pages is now part of Workers) | DNS must move to Cloudflare for the custom domain |
| Course delivery | **Iteration 2 (D14)**: separate React platform or part of the site | `plan/iteration-2.md` |
| Payments | to be decided | Serbia: invoices, currency, VAT questions |
| Newsletter | **Decided (D44): MailerLite** on Gorica's account; double opt-in implemented by the site (D47); the waitlist in its own group | GDPR/ZZPL consent wording at the forms still needs approval (D44) |
| Analytics | **Decided (D44): Cloudflare Web Analytics** (free, cookieless, production build only) | no cookie banner needed; the build check must confirm no cookie and no local storage (D44) |

Do not use any library API before confirming it exists in the installed version.
