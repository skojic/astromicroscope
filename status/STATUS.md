# Status

Updated: 2026-11-07 · Branch: `main` (D54: DNS move now, registrar transfer 2026-11-29) · Stages: idea → specced → approved → building → testing → review → done (or blocked) · Gates: `testing/gates.md`

## Now
- **Current focus:** **The site is live on `astromicroscope.com` in production** (2026-11-07, D60): every green merge to `main` deploys straight to the custom domain (D60: no preview stage, no preview Worker; `site-deploy` smoke-tests the production address after each deploy). All content modules are built (M00–M11, M12 forms), M02 content and M14 translations published (PR #39), M06–M10 SR + EN pages, home assembly (PRs #43, #47, #52). M12-03 double-opt-in email live and proven on production (D58), www→apex redirect live. M13 is closed except the registrar transfer (M13-08, 2026-11-29): redirects and the 410 are live (D59), the strict crawl is clean, Search Console and Bing are verified (issue #65), and HSTS preload is on the list (D62).
- **Last step:** 2026-11-07: the site check went from 9 min 20 s to under 2 minutes (D56); the production address was found serving the preview build and the preview is now a separate Worker (D57), with the production build redeployed on the custom domain. The weekly audit's `minimatch`/`glob` advisories are fixed by the version overrides (Dependabot alerts 9 and 10 closed, `npm audit` 0 vulnerabilities). The MailerLite double opt-in is proven live on `astromicroscope.com` (D58, issue #59 closed): the confirmation email arrived and the subscriber became `active`.
- **Last step:** 2026-11-06 PRs #42–#47 merged: site-wide alignment/spacing (D52), English `/en/` routes for M06–M10 (M14), M12-04 KV rate-limit store, home assembly review, Gorica's favicon, gold hairline + Jung quote on the home page. 2026-11-07: **D54** records the two DNS dates (see Next step).
- **Next step:** **the registrar transfer to Cloudflare on 2026-11-29** (M13-08: unlock, EPP code, ~$11, registrant contact unchanged; add the DNSSEC DS record once it is done). That is the only open item: M13-01/02/04/06 are done, M13-05/07 and the M04 Rich Results Test are dropped as not important (Srdjan, 2026-11-07), and the rest of the security hardening plan is withdrawn (the edge rate limit on `/api/` is live).
- **Blocked by:** nothing. The registrar transfer is scheduled (2026-11-29), not blocked.

## Specs
| ID | File | Status |
|---|---|---|
| SPEC-00 | specs/00-product.md | draft |
| SPEC-01 | specs/01-sitemap.md | draft |
| SPEC-02 | specs/02-design-system.md | approved (direction D, `brand/`) |
| SPEC-03 | specs/03-tech-stack.md | partly decided (P02b resolved by D44; payments open in iteration 2, D14) |
| SPEC-04 | specs/04-content.md | draft |
| SPEC-05 | specs/05-languages.md | draft |
| SPEC-06 | specs/06-seo-ai-search.md | draft |
| SPEC-07 | specs/07-performance-cwv.md | draft |
| SPEC-08 | specs/08-accessibility.md | draft |

## Modules
Details, next step and evidence: `plan/modules/MNN-*/REPORT.md`. Plan overview: `plan/README.md`.

| Module | Owner | Stage | Waiting for | Report |
|---|---|---|---|---|
| M00 Foundation | Srdjan | done | — | [REPORT](../plan/modules/M00-foundation/REPORT.md) |
| M01 Brand kit and logo | Srdjan | done | — | [REPORT](../plan/modules/M01-brand-kit/REPORT.md) |
| M02 Content migration | Filip | done | — (G1 2026-11-07: PR #39, both languages live) |
| M03 Site shell | Srdjan | done | — | [REPORT](../plan/modules/M03-site-shell/REPORT.md) |
| M04 SEO | Srdjan | done | — (Rich Results Test dropped 2026-11-07 as not important; the Schema Markup Validator passed) | [REPORT](../plan/modules/M04-seo/REPORT.md) |
| M05 Home page | Srdjan | building | G1 (green `site-ci`); lens built, English meta description approved (D55) | [REPORT](../plan/modules/M05-home/REPORT.md) |
| M06 Articles | Srdjan (reallocated 2026-11-05) | building | — SR + EN built 2026-11-06 (the M14 routes) | [REPORT](../plan/modules/M06-articles/REPORT.md) |
| M07 Yearly horoscope | Srdjan | building | Lens built and on `main` 2026-11-07 (G1 evidence = CI on main). SR + EN built 2026-11-06 (the M14 routes) | [REPORT](../plan/modules/M07-horoscope/REPORT.md) |
| M08 Education (free learning + waitlist) | Srdjan (reallocated 2026-11-05) | building | — SR + EN built 2026-11-06; waitlist send via M12 | [REPORT](../plan/modules/M08-education/REPORT.md) |
| M09 Private analyses | Srdjan (reallocated 2026-11-05) | building | — SR + EN built 2026-11-06; form send via M12 | [REPORT](../plan/modules/M09-analyses/REPORT.md) |
| M10 About, contact, legal | Srdjan (reallocated 2026-11-05) | building | — SR + EN built 2026-11-06; M10-05 out of scope by D33 | [REPORT](../plan/modules/M10-about-contact-legal/REPORT.md) |
| M11 Videos | Srdjan | done | — | [REPORT](../plan/modules/M11-videos/REPORT.md) |
| M12 Forms | Srdjan | building | double opt-in proven live (D58, issue #59 closed; the confirmation email is in English, Serbian needs a paid plan) | [REPORT](../plan/modules/M12-forms/REPORT.md) |
| M13 QA and launch | both | building | live and Search Console done (issue #65); **only the registrar transfer 2026-11-29 (M13-08) left**; M13-05/07 dropped | [REPORT](../plan/modules/M13-launch/REPORT.md) |
| M14 English translation | Filip | done | — (G1 2026-11-07: 22 sr/en pairs live, `/en/` routes PR #44) | [REPORT](../plan/modules/M14-translation/REPORT.md) |

## Brand
| Item | Stage | Notes |
|---|---|---|
| brand kit (`brand/`, direction D) | review | full kit built 2026-11-02: rules page SR/EN, tokens, fonts, logo SVG/PNG, social templates, home reference; directions A, B, C removed |
