# Decisions

Decided items are not changed silently. To change one, add a new entry that replaces it and says why.

## Decided
| ID | Date | Decision | Why |
|---|---|---|---|
| D01 | 2026-11-02 | The site is education-first; individual analyses are the premium offer | client brief |
| D02 | 2026-11-02 | Two languages: Serbian (Latin, default, at `/`) and English (at `/en/`) | Srdjan's request; Serbian audience first |
| D03 | 2026-11-02 | `branding-directions/` is a separate, frozen showcase | Srdjan's request |
| D04 | 2026-11-02 | Harness structure: specs / modules / testing / status, with gates G0–G5 | approved by Srdjan |
| D05 | 2026-11-02 | SEO, AI search, Core Web Vitals and accessibility (WCAG 2.2 AA) are acceptance criteria | Srdjan's request |
| D06 | 2026-11-02 | The four bilingual directions are the approved reference on `main`; after Gorica's choice, one final branding kit is made from that direction | Srdjan's approval |
| D07 | 2026-11-02 | `main` is protected: changes only via pull request from `feature/`, `fix/` or `docs/` branches; 1 approval from the owner (CODEOWNERS); approvals reset on new commits; conversations resolved; required `branch-name` check that comments in Serbian and English; squash merge only; no force push or deletion. Filip merges after approval (the owner may too). The owner bypasses all rules | train Filip on a production-like workflow; Srdjan's request |

## Pending
| ID | Question | Owner | Blocks |
|---|---|---|---|
| P01 | Which design direction (A, B, C, D or a mix)? | Gorica, Srdjan | specs/02, most modules |
| P02 | Tech stack: framework, CMS, hosting, payments, newsletter, analytics | Srdjan | specs/03, build |
| P03 | Allow AI training crawlers (for example GPTBot)? Search crawlers are allowed either way | Gorica, Srdjan | robots.txt |
| P04 | Hosting and HTTPS for astromicroscope.com (registered at Hostinger) | Srdjan | launch |
| P05 | Launch offer: which courses, products and prices | Gorica | content |
