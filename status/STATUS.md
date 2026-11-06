# Status

Updated: 2026-11-06 · Branch: `main` (ruleset change and videos-import rework applied; M12-01 scaffold; see D45, D46) · Stages: idea → specced → approved → building → testing → review → done (or blocked) · Gates: `testing/gates.md`

## Now
- **Current focus:** All content modules are built (M00–M11, M12 forms built; M02 content and M14 translations published, PR #39; M06–M10 SR pages live, PRs #28–#32, #40). The unfinished site is live only on the temporary address (D36). Remaining: M05 home assembly over the now-existing sections, M12-03 + double-opt-in proof (DNS on Cloudflare), M12-04 rate-limit store, consent wording (D44), English `/en/` routes for M06–M10 (M14), then M13.
- **Last step:** Srdjan's modules built on `main` (owner bypass, CI green): M00 foundation (routing, layouts, tokens and reduced fonts, content schemas and checks, CI, headers), M03 shell, M04 SEO, M05 home hero, M11 videos. G0 for M00 (D23); M00-01 done (PR #8). M00-08: Worker deployed to `https://astromicroscope.filipvicentijevic99.workers.dev` (D36), preview workflow on `main`. M04 validators run on the preview (2026-11-04). Decisions D24–D36. Before that: domain renewed until 2027-10-15 (A1); Filip's module plans read; Gorica's answers (D18–D21).
- **Next step:** **D51 (2026-11-06) reduced the gates and checks** (Srdjan: "too many gates that could get stuck and too many checks"): pull-request layout check runs Chromium only, Firefox and WebKit join at launch (`FULL_BROWSER_CHECK=true`, task M13-07); Lighthouse runs once; `check-docs` warns instead of blocking; module gates collapse to G1 + the launch gate (`testing/gates.md`); `branch-name` leaves the required checks — Srdjan sets that in the dashboard (the API token cannot write rulesets). The strict production audit stays gated behind `PRODUCTION_AUDIT` until launch (D48). The DNS move is still blocked on access: the keychain Cloudflare token answers "Invalid API Token" (revoked or rolled); a fresh token from Filip's dashboard (zone + DNS + email routing + workers scripts) and the Hostinger nameserver paste are the two human steps. Then: M12-03 + double-opt-in proof, M12-04 rate-limit store, consent wording (D44), M05 home assembly, English `/en/` routes for M06–M10 (M14), and M13.
- **Blocked by:** M07 horoscope: M02 content and the M06/M10 components (the 2026 edition is used for now, D41); M05 home: sections of M06–M10 and M12; real contact mail: the domain's DNS on Cloudflare (M13). Dependabot auto-merge and the videos-import pull request still need a real green `ci-gate`/`branch-name` merge run to be proven.

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
| M04 SEO | Srdjan | testing | Article/ProfilePage validation (pages not built), G2/G3 | [REPORT](../plan/modules/M04-seo/REPORT.md) |
| M05 Home page | Srdjan | building | sections of M06–M10, M12 | [REPORT](../plan/modules/M05-home/REPORT.md) |
| M06 Articles | Srdjan (reallocated 2026-11-05) | building | — SR + EN built 2026-11-06 (the M14 routes) | [REPORT](../plan/modules/M06-articles/REPORT.md) |
| M07 Yearly horoscope | Srdjan | building | — SR + EN built 2026-11-06 (the M14 routes) | [REPORT](../plan/modules/M07-horoscope/REPORT.md) |
| M08 Education (free learning + waitlist) | Srdjan (reallocated 2026-11-05) | building | — SR + EN built 2026-11-06; waitlist send via M12 | [REPORT](../plan/modules/M08-education/REPORT.md) |
| M09 Private analyses | Srdjan (reallocated 2026-11-05) | building | — SR + EN built 2026-11-06; form send via M12 | [REPORT](../plan/modules/M09-analyses/REPORT.md) |
| M10 About, contact, legal | Srdjan (reallocated 2026-11-05) | building | — SR + EN built 2026-11-06; M10-05 out of scope by D33 | [REPORT](../plan/modules/M10-about-contact-legal/REPORT.md) |
| M11 Videos | Srdjan | done | — | [REPORT](../plan/modules/M11-videos/REPORT.md) |
| M12 Forms | Srdjan | building | DNS on Cloudflare for contact mail (M13); consent wording at the forms approved (D44) | [REPORT](../plan/modules/M12-forms/REPORT.md) |
| M13 QA and launch | both | idea | all, domain (A1) | [REPORT](../plan/modules/M13-launch/REPORT.md) |
| M14 English translation | Filip | building | EN routes for M06–M10 built 2026-11-06; glossary + all 22 content files published (no drafts) PR #39 | [REPORT](../plan/modules/M14-translation/REPORT.md) |

## Brand
| Item | Stage | Notes |
|---|---|---|
| brand kit (`brand/`, direction D) | review | full kit built 2026-11-02: rules page SR/EN, tokens, fonts, logo SVG/PNG, social templates, home reference; directions A, B, C removed |
