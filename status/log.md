# Log

Newest first. Each entry: date, what was done, evidence, what is next.

## 2026-11-02
- **Contributor workflow live**: ruleset `main: pull requests only` (id 26369759) active on the Free personal repo; GitHub reports `current_user_can_bypass: always` for the owner. Repo settings: squash merge only, delete branch after merge. Live test: PR #1 from `test-wrong-name` → `branch-name` fail, bilingual comment posted by github-actions[bot], error annotation with suggestion `feature/test-wrong-name`; re-run updated the same comment (1 comment). PR #2 from `docs/test-branch-check` → pass, no comment. Both `BLOCKED` / `REVIEW_REQUIRED`. Test PRs closed, branches deleted. Not yet observed: a push to `main` from Filip's account being rejected, and the automatic review request on his PR (CODEOWNERS does not request the PR author, so it could not be shown with the owner's PRs).
- **Contributor workflow** (D07): `CONTRIBUTING.md`, `docs/workflow/review-guide.md`, `.github/CODEOWNERS`, `.github/pull_request_template.md`, `.github/workflows/branch-name.yml`. Branch-name script tested locally with 7 names (valid pass; invalid get a suggestion and the bilingual comment). Ruleset and repository settings applied after this commit; results in the next entry.
- **Pushed to `main`**: the four bilingual directions (approved by Srdjan as a reference), the harness folders, and a root README with step-by-step viewing instructions for Gorica. Download and clone links now point to `main`.
- **Harness created**: `AGENTS.md`, `CLAUDE.md`, `specs/` (00–08 + template), `modules/` (10 + template), `testing/` (gates, test plan, 5 checklists), `status/`. Approved by Srdjan, with SEO, AI search, Core Web Vitals, accessibility and performance as explicit requirements.
- **Sources checked for the specs**: web.dev/articles/vitals (LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 at p75); Google “AI features and your website” (no special files or markup needed); OpenAI bots page (OAI-SearchBot = ChatGPT search, GPTBot = training); Google structured data changelog (course info and learning video retired 2025, FAQ rich results deprecated); Google hreflang documentation; WCAG 2.2 on w3.org.
- **Designs made bilingual**: Serbian default, English via the SR/EN switch (`branding-directions/i18n/`). Click test on C: SR → EN → SR switches the headline, sign panel and `lang`.
- **Designs adapted to the brief** (`docs/brief-klijenta.md`): education first; natal, solar, karmic and life-area consultations as the premium offer; white and beige with blue and gold; three newest YouTube videos added.
- **Found**: astromicroscope.com registered (Hostinger, 2025-10-15) but HTTPS fails; YouTube videos have no subtitles.
- **Earlier the same day**: four directions built, D created from feedback on A (Midnight hero, star field, logo redrawn as SVG), branch `branding-directions` pushed (commit cb218fe).
- **Next**: design approval and push; Gorica chooses a direction.
