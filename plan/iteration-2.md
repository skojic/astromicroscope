# Iteration 2 (2027): not part of the first launch

Decided by Srdjan on 2026-11-02 (D14). Each item gets its own plan when work starts.

## Course platform
- Courses come next year; the course videos are not recorded yet.
- Built as a separate React platform, or a React part of this site (decide in its own plan).
- Its own plan must cover: logins, payments in Serbia (cards, invoices, VAT; depends on Gorica's business form, questionnaire 25), video hosting, progress tracking, certificates, legal terms for selling digital content.
- Iteration 1 prepares for it: education pages with a waitlist (M08), newsletter (M12), content schema already in Markdown.

## CMS so Gorica can publish herself
- Until then **Filip publishes** all content; Srdjan steps in when needed.
- Candidates to evaluate then (all exist on npm as of 2026-11-02; details not verified): git-based editors that keep content as Markdown in this repository, such as Sveltia CMS (`@sveltia/cms` 0.256.1), Decap CMS (`decap-cms` 3.17.3) and Keystatic (`@keystatic/core` 0.6.9, `@keystatic/astro` 6.0.0); TinaCMS (`tinacms` 3.15.1) works with its own cloud service.
- Requirements: Serbian and English fields side by side, image upload, preview, changes go through a pull request that Filip approves (keeps `main` protected), login that Gorica can manage.
- Rough effort: one short evaluation (1–2 days), then setup, schemas for articles and horoscope, login, and a training session for Gorica (about 4–7 working days). This is an estimate before evaluating any tool.

## Recorded courses and other video
Recording is planned for 2027. Video pages from iteration 1 (M11) already handle YouTube lessons.
