# Status

Updated: 2026-11-07 · Branch: `main` (D54: DNS move now, registrar transfer 2026-11-29) · Stages: idea → specced → approved → building → testing → review → done (or blocked) · Gates: `testing/gates.md`

## Now
- **Current focus:** **The site is live on `astromicroscope.com`, but the production address is serving the preview build** (2026-11-07, D56): a preview deploy overwrote it, so it is `noindex` and `Disallow: /` again. A production dispatch (`site-deploy`, `production: true`) fixes it. Otherwise all content modules are built (M00–M11, M12 forms), M02 content and M14 translations published (PR #39), M06–M10 SR + EN pages, home assembly (PRs #43, #47, #52). M12-03 double-opt-in email live, www→apex redirect live. Remaining: prove the live double-opt-in, redeploy the production build, then M13 (redirects file, crawl, Search Console, sitemap submit).
- **Last step:** 2026-11-07: the site check went from 9 min 20 s to under 2 minutes and the production address was found serving the preview build (D56, see "Current focus" and "Next step").
- **Last step:** 2026-11-06 PRs #42–#47 merged: site-wide alignment/spacing (D52), English `/en/` routes for M06–M10 (M14), M12-04 KV rate-limit store, home assembly review, Gorica's favicon, gold hairline + Jung quote on the home page. 2026-11-07: **D54** records the two DNS dates (see Next step).
- **Next step:** **Prove the live double-opt-in** now that M12-03 email + production are live (a real newsletter/waitlist submission through the production `/api/newsletter` → confirmation email → `/api/confirm` → MailerLite `active`). Then **M13**: (1) `M13-02` redirects file (`site/public/_redirects`) for the old-site URLs + 410 for the ~143 spam URLs, (2) `M13-01` crawl both languages in `--mode production --strict`, (3) `M13-04` Search Console + Bing, submit sitemap, (4) `M13-07` run the strict production audit and the three-browser check once by hand and deploy the production build to the custom domain (the `PRODUCTION_AUDIT`/`FULL_BROWSER_CHECK` variables no longer do anything, D56). The **registrar transfer to Cloudflare is scheduled for 2026-11-29** and is not a blocker. Dependabot auto-merge and the videos-import pull request still need a real green `ci-gate`/`branch-name` merge run to be proven.
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
| M12 Forms | Srdjan | building | MailerLite double opt-in to enable — assigned to Filip in issue #59; then prove the live confirmation (G1) | [REPORT](../plan/modules/M12-forms/REPORT.md) |
| M13 QA and launch | both | building | production live on astromicroscope.com 2026-11-07; remaining M13-01/02/04/07; registrar transfer 2026-11-29 (not a blocker) | [REPORT](../plan/modules/M13-launch/REPORT.md) |
| M14 English translation | Filip | building | EN routes for M06–M10 built 2026-11-06; glossary + all 22 content files published (no drafts) PR #39 | [REPORT](../plan/modules/M14-translation/REPORT.md) |

## Brand
| Item | Stage | Notes |
|---|---|---|
| brand kit (`brand/`, direction D) | review | full kit built 2026-11-02: rules page SR/EN, tokens, fonts, logo SVG/PNG, social templates, home reference; directions A, B, C removed |
