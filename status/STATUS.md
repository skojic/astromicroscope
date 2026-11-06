# Status

Updated: 2026-11-06 · Branch: `main` (ruleset change and videos-import rework applied; M12-01 scaffold; see D45, D46) · Stages: idea → specced → approved → building → testing → review → done (or blocked) · Gates: `testing/gates.md`

## Now
- **Current focus:** M00, M01, M03 and M11 are done (G4 approved by Srdjan 2026-11-04). The unfinished site is live only on the temporary address (D36). P02b is decided (D44), so M12 forms can be built. M02 content migration is done (all tasks on `main`, PR #13). Filip: M10 and the M14 glossary, then M06, M08, M09.
- **Last step:** Srdjan's modules built on `main` (owner bypass, CI green): M00 foundation (routing, layouts, tokens and reduced fonts, content schemas and checks, CI, headers), M03 shell, M04 SEO, M05 home hero, M11 videos. G0 for M00 (D23); M00-01 done (PR #8). M00-08: Worker deployed to `https://astromicroscope.filipvicentijevic99.workers.dev` (D36), preview workflow on `main`. M04 validators run on the preview (2026-11-04). Decisions D24–D36. Before that: domain renewed until 2027-10-15 (A1); Filip's module plans read; Gorica's answers (D18–D21).
- **Next step:** The D45 ruleset change is applied (0 approvals, `ci-gate` + `branch-name` required; the Actions-app bypass actor is not possible on a personal repo — see D45, D46). The strict production audit in `site-ci` is gated behind the repository variable `PRODUCTION_AUDIT` until launch (D48; task M13-07 sets it). **The D45 verification found a defect (2026-11-05):** the two test pull requests (#26 docs-only, #27 site-touching unowned path) ran all their checks green, yet both stay blocked from merging — an approval requirement is still in force (the `required_approving_review_count` 1 → 0 change of D45 is not in effect, or a legacy branch-protection rule survives next to the ruleset). Srdjan checks the ruleset/branch protection in the dashboard; the pull requests stay open until then. The DNS move is blocked on access: the keychain Cloudflare token answers "Invalid API Token" (revoked or rolled), the local wrangler OAuth is Srdjan's own account (hosting must be on Filip's, D16), and no Hostinger access exists on the machine. `videos-import` opens a pull request with auto-merge instead of pushing to `main`. M12 (Srdjan): M12-03 and the full double-opt-in proof wait for the DNS move; M12-04 needs the real rate-limit store; the consent wording at the forms waits for approval (D44). Filip: M10 and the M14 glossary, then M06, M08, M09; the home page (M05) and M07 wait for them.
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
| M02 Content migration | Filip | building | English pairs (M14) for G1; PR to `main`. Done: all tasks M02-01 to M02-06 (7 articles, 12 signs of 2026, 3 pages) | [REPORT](../plan/modules/M02-content-migration/REPORT.md) |
| M03 Site shell | Srdjan | done | — | [REPORT](../plan/modules/M03-site-shell/REPORT.md) |
| M04 SEO | Srdjan | testing | Article/ProfilePage validation (pages not built), G2/G3 | [REPORT](../plan/modules/M04-seo/REPORT.md) |
| M05 Home page | Srdjan | building | sections of M06–M10, M12 | [REPORT](../plan/modules/M05-home/REPORT.md) |
| M06 Articles | Srdjan (reallocated 2026-11-05) | building | — (SR article template + hub + home section built; en mirrors M14) | [REPORT](../plan/modules/M06-articles/REPORT.md) |
| M07 Yearly horoscope | Srdjan | building | — (SR hub + wheel + sign pages built 2026-11-05; en mirrors M14) | [REPORT](../plan/modules/M07-horoscope/REPORT.md) |
| M08 Education (free learning + waitlist) | Srdjan (reallocated 2026-11-05) | building | — (SR hub + home section built; waitlist send via M12) | [REPORT](../plan/modules/M08-education/REPORT.md) |
| M09 Private analyses | Srdjan (reallocated 2026-11-05) | building | — (SR hub + 4 analysis pages built; form send via M12) | [REPORT](../plan/modules/M09-analyses/REPORT.md) |
| M10 About, contact, legal | Srdjan (reallocated 2026-11-05) | building | — (M10-01..04 built; M10-05 out of scope by D33) | [REPORT](../plan/modules/M10-about-contact-legal/REPORT.md) |
| M11 Videos | Srdjan | done | — | [REPORT](../plan/modules/M11-videos/REPORT.md) |
| M12 Forms | Srdjan | building | DNS on Cloudflare for contact mail (M13); consent wording at the forms approved (D44) | [REPORT](../plan/modules/M12-forms/REPORT.md) |
| M13 QA and launch | both | idea | all, domain (A1) | [REPORT](../plan/modules/M13-launch/REPORT.md) |
| M14 English translation | Filip | idea | M02 (glossary M14-01 may start) | [REPORT](../plan/modules/M14-translation/REPORT.md) |

## Brand
| Item | Stage | Notes |
|---|---|---|
| brand kit (`brand/`, direction D) | review | full kit built 2026-11-02: rules page SR/EN, tokens, fonts, logo SVG/PNG, social templates, home reference; directions A, B, C removed |
