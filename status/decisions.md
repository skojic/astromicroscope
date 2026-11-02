# Decisions

Decided items are not changed silently. To change one, add a new entry that replaces it and says why.

## Decided
| ID | Date | Decision | Why |
|---|---|---|---|
| D01 | 2026-11-02 | The site is education-first; individual analyses are the premium offer | client brief |
| D02 | 2026-11-02 | Two languages: Serbian (Latin, default, at `/`) and English (at `/en/`) | Srdjan's request; Serbian audience first |
| D03 | 2026-11-02 | ~~`branding-directions/` is a separate, frozen showcase~~ replaced by D08 | Srdjan's request |
| D04 | 2026-11-02 | Harness structure: specs / modules / testing / status, with gates G0–G5 | approved by Srdjan |
| D05 | 2026-11-02 | SEO, AI search, Core Web Vitals and accessibility (WCAG 2.2 AA) are acceptance criteria | Srdjan's request |
| D06 | 2026-11-02 | The four bilingual directions are the approved reference on `main`; after Gorica's choice, one final branding kit is made from that direction | Srdjan's approval |
| D07 | 2026-11-02 | `main` is protected: changes only via pull request from `feature/`, `fix/` or `docs/` branches; 1 approval from the owner (CODEOWNERS); approvals reset on new commits; conversations resolved; required `branch-name` check that comments in Serbian and English; squash merge only; no force push or deletion. Filip merges after approval (the owner may too). The owner bypasses all rules | train Filip on a production-like workflow; Srdjan's request |
| D08 | 2026-11-02 | Design direction **D, Midnight Lens**. The brand kit lives in `brand/` and is the single source of truth (“use the brand kit” = `brand/`); directions A, B, C and the comparison page are removed (still in git history, commit 8d42c5d). Replaces D03 and resolves P01 | Gorica's choice; Srdjan's request |
| D09 | 2026-11-02 | Stack: **Astro** (static, Markdown content, SR/EN routes) on **Cloudflare Pages**; React only where a component needs it (first use recorded here) | Srdjan; content site, speed on phones (`specs/07`) |
| D10 | 2026-11-02 | **Every text in Serbian and English**, including the 20,000 words from the old site (module M14) | Srdjan |
| D11 | 2026-11-02 | Developers: **Srdjan Kojic** (M00, M01, M03, M04, M05, M07, M11, M12) and **Filip Vicentijevic** (M02, M06, M08, M09, M10, M14); M13 together | Srdjan |
| D12 | 2026-11-02 | Build plan in `plan/` (concept, contracts, challenge, 15 modules with PLAN.md + REPORT.md) replaces `modules/`; reports are the place to resume work | Srdjan approved the concept and plan |
| D13 | 2026-11-02 | Logo: Gorica's original mark from the old website, traced to vector (potrace), replaces the hand redraw in `brand/logo/` | Srdjan |
| D14 | 2026-11-02 | **Iteration 1 launches without courses.** Courses (2027) become a separate React platform or part of it, with their own plan; a CMS for Gorica is evaluated in iteration 2; until then Filip publishes all content (Srdjan helps). See `plan/iteration-2.md` | Srdjan; course videos not recorded yet |
| D15 | 2026-11-02 | Security baseline `specs/09-security.md`: static site without admin login, 2FA on every account, protected `main`, secret scanning and push protection, Dependabot alerts (on), security headers, cleanup of the old site's spam URLs | Srdjan, after the old site was hacked |
| D16 | 2026-11-02 | **Hosting on Filip's Cloudflare account**, not Srdjan's; Cloudflare Workers with static assets (Pages is now part of Workers). A test deploy to Srdjan's account was made and deleted the same minute | Srdjan |

## Pending
| ID | Question | Owner | Blocks |
|---|---|---|---|
| P02b | Remaining iteration-1 choices: form handling, newsletter provider, analytics (course platform and CMS moved to iteration 2, D14) | Srdjan | M12 |
| P03 | Allow AI training crawlers (for example GPTBot)? Search crawlers are allowed either way | Gorica, Srdjan | robots.txt |
| P04 | Domain astromicroscope.com in expired state at Hostinger: renew, auto-renew, registrar lock; DNS to Filip's Cloudflare later | Srdjan, Gorica | launch |
| P05 | Launch offer: which private analyses and prices (courses in 2027) | Gorica | M09 |
