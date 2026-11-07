# Status

Updated: 2026-11-07 · Branch: `main` (D54: DNS move now, registrar transfer 2026-11-29) · Stages: idea → specced → approved → building → testing → review → done (or blocked) · Gates: `testing/gates.md`

## Now
- **Current focus:** All content modules are built and live on the temporary address (D36): M00–M11, M12 forms (M12-01/02/04/05), M02 content and M14 translations published (PR #39), M06–M10 SR + EN pages (PRs #28–#32, #40, #44), home assembly (PRs #43, #47). Remaining: M12-03 + live double-opt-in proof (needs the DNS move, D54), M05 G1, M04 validators, M14 polish, then M13.
- **Last step:** 2026-11-06 PRs #42–#47 merged: site-wide alignment/spacing (D52), English `/en/` routes for M06–M10 (M14), M12-04 KV rate-limit store, home assembly review, Gorica's favicon, gold hairline + Jung quote on the home page. 2026-11-07: **D54** records the two DNS dates (see Next step).
- **Next step:** **DNS is done and live (2026-11-07):** Filip switched the nameservers to `bradley/demi.ns.cloudflare.com`, the zone is **active**, `astromicroscope.com` and `www.astromicroscope.com` serve the site (non-production build, `noindex` until M13), and the `astromicroscope@gmail.com` destination is **verified**. Email Routing is now **enabled** with a catch-all forwarding to `astromicroscope@gmail.com`. What's left: implement **M12-03** (send_email binding in `wrangler.jsonc` + double-opt-in email in the worker) which is now unblocked, then prove the live double-opt-in, do the live-test form submission, and set the `www`→apex redirect. The **registrar transfer to Cloudflare is scheduled for 2026-11-29** and is not a blocker. Also open: M05 G1 (green `site-ci` on main is the evidence), M04 validators on Article/ProfilePage pages (Schema Markup Validator done 2026-11-07), M14 optional English i18n polish, then M13 (launch: redirects file, crawl, Search Console, `PRODUCTION_AUDIT`/`FULL_BROWSER_CHECK`). Dependabot auto-merge and the videos-import pull request still need a real green `ci-gate`/`branch-name` merge run to be proven.
- **Blocked by:** the double-opt-in email needs M12-03 (now unblocked: Email Routing live); the launch production build waits on M13.

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
| M02 Content migration | Filip | building | G1 after PR #39 (English pairs, drafts removed 2026-11-06, Gorica approved). Done: all tasks M02-01 to M02-06 (7 articles, 12 signs of 2026, 3 pages) |
| M03 Site shell | Srdjan | done | — | [REPORT](../plan/modules/M03-site-shell/REPORT.md) |
| M04 SEO | Srdjan | testing | Rich Results Test for Article/ProfilePage (Schema Markup Validator done 2026-11-07), G2/G3 | [REPORT](../plan/modules/M04-seo/REPORT.md) |
| M05 Home page | Srdjan | building | G1 (green `site-ci`); lens built, English meta description approved (D55) | [REPORT](../plan/modules/M05-home/REPORT.md) |
| M06 Articles | Srdjan (reallocated 2026-11-05) | building | — SR + EN built 2026-11-06 (the M14 routes) | [REPORT](../plan/modules/M06-articles/REPORT.md) |
| M07 Yearly horoscope | Srdjan | building | Lens built and on `main` 2026-11-07 (G1 evidence = CI on main). SR + EN built 2026-11-06 (the M14 routes) | [REPORT](../plan/modules/M07-horoscope/REPORT.md) |
| M08 Education (free learning + waitlist) | Srdjan (reallocated 2026-11-05) | building | — SR + EN built 2026-11-06; waitlist send via M12 | [REPORT](../plan/modules/M08-education/REPORT.md) |
| M09 Private analyses | Srdjan (reallocated 2026-11-05) | building | — SR + EN built 2026-11-06; form send via M12 | [REPORT](../plan/modules/M09-analyses/REPORT.md) |
| M10 About, contact, legal | Srdjan (reallocated 2026-11-05) | building | — SR + EN built 2026-11-06; M10-05 out of scope by D33 | [REPORT](../plan/modules/M10-about-contact-legal/REPORT.md) |
| M11 Videos | Srdjan | done | — | [REPORT](../plan/modules/M11-videos/REPORT.md) |
| M12 Forms | Srdjan | building | M12-03 (Email Service) now unblocked — Email Routing live (2026-11-07); consent wording approved (D53) | [REPORT](../plan/modules/M12-forms/REPORT.md) |
| M13 QA and launch | both | idea | all modules; Hostinger nameserver paste (D54); registrar transfer 2026-11-29 (not a blocker) | [REPORT](../plan/modules/M13-launch/REPORT.md) |
| M14 English translation | Filip | building | EN routes for M06–M10 built 2026-11-06; glossary + all 22 content files published (no drafts) PR #39 | [REPORT](../plan/modules/M14-translation/REPORT.md) |

## Brand
| Item | Stage | Notes |
|---|---|---|
| brand kit (`brand/`, direction D) | review | full kit built 2026-11-02: rules page SR/EN, tokens, fonts, logo SVG/PNG, social templates, home reference; directions A, B, C removed |
