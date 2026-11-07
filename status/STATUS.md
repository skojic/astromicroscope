# Status

Updated: 2026-11-07 · Branch: `main` (D54: DNS move now, registrar transfer 2026-11-29) · Stages: idea → specced → approved → building → testing → review → done (or blocked) · Gates: `testing/gates.md`

## Now
- **Current focus:** All content modules are built and live on the temporary address (D36): M00–M11, M12 forms (M12-01/02/04/05), M02 content and M14 translations published (PR #39), M06–M10 SR + EN pages (PRs #28–#32, #40, #44), home assembly (PRs #43, #47). Remaining: M12-03 + live double-opt-in proof (needs the DNS move, D54), M05 G1, M04 validators, M14 polish, then M13.
- **Last step:** 2026-11-06 PRs #42–#47 merged: site-wide alignment/spacing (D52), English `/en/` routes for M06–M10 (M14), M12-04 KV rate-limit store, home assembly review, Gorica's favicon, gold hairline + Jung quote on the home page. 2026-11-07: **D54** records the two DNS dates (see Next step).
- **Next step:** **DNS (D54):** the Cloudflare side is **done** (2026-11-07): zone `astromicroscope.com` created in Filip's account, custom domains `astromicroscope.com` + `www` attached to the Worker, HTTPS/TLS/HSTS and DNSSEC on, Email Routing destination `astromicroscope@gmail.com` added (unverified). **Two human steps left, assigned to Filip in issue #48** (Srdjan has no Hostinger access): paste `bradley.ns.cloudflare.com` and `demi.ns.cloudflare.com` at Hostinger, and click the verification email for `astromicroscope@gmail.com`. After the zone is active: enable Email Routing + catch-all, then M12-03 and the live double-opt-in proof. The **registrar transfer to Cloudflare is scheduled for 2026-11-29** and is not a blocker for anything. Do not treat the 29th as a wait for DNS-dependent work. Also open: M05 G1 (horoscope wheel lens, M07; English home meta description needs Gorica's approval), M04 validators on Article/ProfilePage pages, M14 optional English i18n polish, then M13 (launch: redirects file, crawl, Search Console, `PRODUCTION_AUDIT`/`FULL_BROWSER_CHECK`).
- **Blocked by:** real contact mail and the double-opt-in email: the DNS move (D54, no fixed date — not the 29th). Dependabot auto-merge and the videos-import pull request still need a real green `ci-gate`/`branch-name` merge run to be proven.

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
| M05 Home page | Srdjan | building | horoscope wheel lens (M07); English home meta description needs Gorica's approval | [REPORT](../plan/modules/M05-home/REPORT.md) |
| M06 Articles | Srdjan (reallocated 2026-11-05) | building | — SR + EN built 2026-11-06 (the M14 routes) | [REPORT](../plan/modules/M06-articles/REPORT.md) |
| M07 Yearly horoscope | Srdjan | building | Lens built and on `main` 2026-11-07 (G1 evidence = CI on main). SR + EN built 2026-11-06 (the M14 routes) | [REPORT](../plan/modules/M07-horoscope/REPORT.md) |
| M08 Education (free learning + waitlist) | Srdjan (reallocated 2026-11-05) | building | — SR + EN built 2026-11-06; waitlist send via M12 | [REPORT](../plan/modules/M08-education/REPORT.md) |
| M09 Private analyses | Srdjan (reallocated 2026-11-05) | building | — SR + EN built 2026-11-06; form send via M12 | [REPORT](../plan/modules/M09-analyses/REPORT.md) |
| M10 About, contact, legal | Srdjan (reallocated 2026-11-05) | building | — SR + EN built 2026-11-06; M10-05 out of scope by D33 | [REPORT](../plan/modules/M10-about-contact-legal/REPORT.md) |
| M11 Videos | Srdjan | done | — | [REPORT](../plan/modules/M11-videos/REPORT.md) |
| M12 Forms | Srdjan | building | DNS move for contact mail and the double-opt-in email (D54: no fixed date, not the 29th); consent wording approved (D53) | [REPORT](../plan/modules/M12-forms/REPORT.md) |
| M13 QA and launch | both | idea | all modules; Hostinger nameserver paste (D54); registrar transfer 2026-11-29 (not a blocker) | [REPORT](../plan/modules/M13-launch/REPORT.md) |
| M14 English translation | Filip | building | EN routes for M06–M10 built 2026-11-06; glossary + all 22 content files published (no drafts) PR #39 | [REPORT](../plan/modules/M14-translation/REPORT.md) |

## Brand
| Item | Stage | Notes |
|---|---|---|
| brand kit (`brand/`, direction D) | review | full kit built 2026-11-02: rules page SR/EN, tokens, fonts, logo SVG/PNG, social templates, home reference; directions A, B, C removed |
