# Status

Updated: 2026-11-04 · Branch: `main` · Stages: idea → specced → approved → building → testing → review → done (or blocked) · Gates: `testing/gates.md`

## Now
- **Current focus:** Phase 0 (`plan/challenge.md`) is closed except passwords and 2FA on Gorica's accounts (deferred, D30); domain, Gorica's answers, Filip's Cloudflare account (Srdjan has access) and repository visibility (public, D29) are done. The unfinished site is live only on the temporary address (D36) while Filip starts M02 content migration and Srdjan finishes his modules.
- **Last step:** Srdjan's modules built on `main` (owner bypass, CI green): M00 foundation (routing, layouts, tokens and reduced fonts, content schemas and checks, CI, headers), M03 shell, M04 SEO, M05 home hero, M11 videos. G0 for M00 (D23); M00-01 done (PR #8). M00-08: Worker deployed to `https://astromicroscope.filipvicentijevic99.workers.dev` (D36), preview workflow on `main`. M04 validators run on the preview (2026-11-04). Decisions D24–D36. Before that: domain renewed until 2027-10-15 (A1); Filip's module plans read; Gorica's answers (D18–D21).
- **Next step:** Srdjan or Filip: dedicated CI token as `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` as GitHub secrets so the preview workflow (on `main`, runs on pull requests, i.e. Filip's) works; G2/G3 checks for M03, M04, M11. Filip: M02 content migration and the section modules (M06, M08, M09, M10) — the home page and M07 wait for them.
- **Blocked by:** M00-08 CI previews: `CLOUDFLARE_ACCOUNT_ID` secret missing and the existing `CLOUDFLARE_API_TOKEN` secret unverified (Filip or Srdjan); M07 horoscope: M02 content and M06/M10 components; M12 forms: P02b; passwords and 2FA on Gorica's accounts (A2, deferred, D30).

## Specs
| ID | File | Status |
|---|---|---|
| SPEC-00 | specs/00-product.md | draft |
| SPEC-01 | specs/01-sitemap.md | draft |
| SPEC-02 | specs/02-design-system.md | approved (direction D, `brand/`) |
| SPEC-03 | specs/03-tech-stack.md | draft (P02 open) |
| SPEC-04 | specs/04-content.md | draft |
| SPEC-05 | specs/05-languages.md | draft |
| SPEC-06 | specs/06-seo-ai-search.md | draft |
| SPEC-07 | specs/07-performance-cwv.md | draft |
| SPEC-08 | specs/08-accessibility.md | draft |

## Modules
Details, next step and evidence: `plan/modules/MNN-*/REPORT.md`. Plan overview: `plan/README.md`.

| Module | Owner | Stage | Waiting for | Report |
|---|---|---|---|---|
| M00 Foundation | Srdjan | building | M00-08: CI secrets for per-PR previews (workflow written, manual deploy to workers.dev done) | [REPORT](../plan/modules/M00-foundation/REPORT.md) |
| M01 Brand kit and logo | Srdjan | review | approval | [REPORT](../plan/modules/M01-brand-kit/REPORT.md) |
| M02 Content migration | Filip | approved | — (G0 passed 2026-11-04; Filip moves to building) | [REPORT](../plan/modules/M02-content-migration/REPORT.md) |
| M03 Site shell | Srdjan | testing | G2/G3 checks | [REPORT](../plan/modules/M03-site-shell/REPORT.md) |
| M04 SEO | Srdjan | testing | Article/ProfilePage validation (pages not built), G2/G3 | [REPORT](../plan/modules/M04-seo/REPORT.md) |
| M05 Home page | Srdjan | building | sections of M06–M10, M12 | [REPORT](../plan/modules/M05-home/REPORT.md) |
| M06 Articles | Filip | idea | M02 | [REPORT](../plan/modules/M06-articles/REPORT.md) |
| M07 Yearly horoscope | Srdjan | idea | M02 content, M06/M10 components, 2027 texts | [REPORT](../plan/modules/M07-horoscope/REPORT.md) |
| M08 Education (free learning + waitlist) | Filip | idea | — (waitlist button sends via M12) | [REPORT](../plan/modules/M08-education/REPORT.md) |
| M09 Private analyses | Filip | idea | — (questionnaire 14 open: page shows no number) | [REPORT](../plan/modules/M09-analyses/REPORT.md) |
| M10 About, contact, legal | Filip | idea | — | [REPORT](../plan/modules/M10-about-contact-legal/REPORT.md) |
| M11 Videos | Srdjan | testing | G2/G3 checks | [REPORT](../plan/modules/M11-videos/REPORT.md) |
| M12 Forms | Srdjan | idea | P02b | [REPORT](../plan/modules/M12-forms/REPORT.md) |
| M13 QA and launch | both | idea | all, domain (A1) | [REPORT](../plan/modules/M13-launch/REPORT.md) |
| M14 English translation | Filip | idea | M02 (glossary M14-01 may start) | [REPORT](../plan/modules/M14-translation/REPORT.md) |

## Brand
| Item | Stage | Notes |
|---|---|---|
| brand kit (`brand/`, direction D) | review | full kit built 2026-11-02: rules page SR/EN, tokens, fonts, logo SVG/PNG, social templates, home reference; directions A, B, C removed |
