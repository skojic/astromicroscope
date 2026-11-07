# Status

Updated: 2026-11-07 · Branch: `main` (D54: DNS move now, registrar transfer 2026-11-29) · Stages: idea → specced → approved → building → testing → review → done (or blocked) · Gates: `testing/gates.md`

## Now
- **Current focus:** **The site is live on `astromicroscope.com` in production** (2026-11-07, D56/D57): the production build is the one deployed on the custom domain (run 42363873677, smoke 29/29, `x-astromicroscope-env: production`), and the preview now runs as its own Worker (`astromicroscope-preview`), so a preview deploy no longer touches the production address. All content modules are built (M00–M11, M12 forms), M02 content and M14 translations published (PR #39), M06–M10 SR + EN pages, home assembly (PRs #43, #47, #52). M12-03 double-opt-in email live and proven on production (D58), www→apex redirect live. Remaining: M13 (redirects file, crawl, Search Console, sitemap submit).
- **Last step:** 2026-11-07: the site check went from 9 min 20 s to under 2 minutes (D56); the production address was found serving the preview build and the preview is now a separate Worker (D57), with the production build redeployed on the custom domain. The weekly audit's `minimatch`/`glob` advisories are fixed by the version overrides (Dependabot alerts 9 and 10 closed, `npm audit` 0 vulnerabilities). The MailerLite double opt-in is proven live on `astromicroscope.com` (D58, issue #59 closed): the confirmation email arrived and the subscriber became `active`.
- **Last step:** 2026-11-06 PRs #42–#47 merged: site-wide alignment/spacing (D52), English `/en/` routes for M06–M10 (M14), M12-04 KV rate-limit store, home assembly review, Gorica's favicon, gold hairline + Jung quote on the home page. 2026-11-07: **D54** records the two DNS dates (see Next step).
- **Next step:** **M13**: (1) **issue #65** (Filip): Search Console + Bing, sitemap submit, Security issues / Manual actions (M13-04, M13-06), (2) `M13-02` done — the 143 spam URLs answer 410 (D59); (3) `M13-01` crawl both languages in `--mode production --strict`, (4) `M13-07` run the strict production audit and the three-browser check once by hand (the `PRODUCTION_AUDIT`/`FULL_BROWSER_CHECK` variables no longer do anything, D56). The production build itself is deployed and verified (production build on the custom domain, `site-deploy` green). The **registrar transfer to Cloudflare is scheduled for 2026-11-29** and is not a blocker. Dependabot auto-merge and the videos-import pull request still need a real green `ci-gate`/`branch-name` merge run to be proven.
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
| M02 Content migration | Filip | done | — (G1 2026-11-07: PR #39, both languages live) |
| M03 Site shell | Srdjan | done | — | [REPORT](../plan/modules/M03-site-shell/REPORT.md) |
| M04 SEO | Srdjan | testing | Rich Results Test for Article/ProfilePage (Schema Markup Validator done 2026-11-07), G2/G3 | [REPORT](../plan/modules/M04-seo/REPORT.md) |
| M05 Home page | Srdjan | building | G1 (green `site-ci`); lens built, English meta description approved (D55) | [REPORT](../plan/modules/M05-home/REPORT.md) |
| M06 Articles | Srdjan (reallocated 2026-11-05) | building | — SR + EN built 2026-11-06 (the M14 routes) | [REPORT](../plan/modules/M06-articles/REPORT.md) |
| M07 Yearly horoscope | Srdjan | building | Lens built and on `main` 2026-11-07 (G1 evidence = CI on main). SR + EN built 2026-11-06 (the M14 routes) | [REPORT](../plan/modules/M07-horoscope/REPORT.md) |
| M08 Education (free learning + waitlist) | Srdjan (reallocated 2026-11-05) | building | — SR + EN built 2026-11-06; waitlist send via M12 | [REPORT](../plan/modules/M08-education/REPORT.md) |
| M09 Private analyses | Srdjan (reallocated 2026-11-05) | building | — SR + EN built 2026-11-06; form send via M12 | [REPORT](../plan/modules/M09-analyses/REPORT.md) |
| M10 About, contact, legal | Srdjan (reallocated 2026-11-05) | building | — SR + EN built 2026-11-06; M10-05 out of scope by D33 | [REPORT](../plan/modules/M10-about-contact-legal/REPORT.md) |
| M11 Videos | Srdjan | done | — | [REPORT](../plan/modules/M11-videos/REPORT.md) |
| M12 Forms | Srdjan | building | double opt-in proven live (D58, issue #59 closed; the confirmation email is in English, Serbian needs a paid plan); the preview Worker's `FORM_SIGNING_SECRET` is set (D57) | [REPORT](../plan/modules/M12-forms/REPORT.md) |
| M13 QA and launch | both | building | production live on astromicroscope.com 2026-11-07; M13-02 done (410, D59); remaining M13-01/04/07 and issue #65; registrar transfer 2026-11-29 (not a blocker) | [REPORT](../plan/modules/M13-launch/REPORT.md) |
| M14 English translation | Filip | done | — (G1 2026-11-07: 22 sr/en pairs live, `/en/` routes PR #44) | [REPORT](../plan/modules/M14-translation/REPORT.md) |

## Brand
| Item | Stage | Notes |
|---|---|---|
| brand kit (`brand/`, direction D) | review | full kit built 2026-11-02: rules page SR/EN, tokens, fonts, logo SVG/PNG, social templates, home reference; directions A, B, C removed |
