---
id: MOD-footer
title: Footer
stage: idea
gate: none
specs: [SPEC-01, SPEC-08]
updated: 2026-11-02
---

# Footer

## Purpose
Repeats the main routes, contact, legal pages and social links on every page.

## Content (sr and en)
Hub links, email, Instagram, YouTube, legal links, language switch, copyright.

## Structure and semantics
`<footer>` with labelled navigation lists. Contact sits in the same place on every page (WCAG 3.2.6).

## States
Default, hover, focus, active, empty and error where they apply; both languages; 360 px and 1440 px; reduced motion.

## Performance budget
No JavaScript; social icons inline SVG.

## Accessibility
Link texts name the destination (“Instagram @astromicroscope”).

## Tasks
| ID | Task | Stage | Notes |
|---|---|---|---|
| FOOTER-01 | Footer layout | idea | |
| FOOTER-02 | Legal pages linked | idea | |

## Tests
See `testing/test-plan.md`, row MOD-footer.
