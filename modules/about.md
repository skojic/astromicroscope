---
id: MOD-about
title: About Gorica
stage: idea
gate: none
specs: [SPEC-04, SPEC-06]
updated: 2026-11-02
---

# About Gorica

## Purpose
Builds trust: education, credentials, approach, photo. It also serves as the author page every article links to.

## Content (sr and en)
Portrait, short bio, degree and institution, approach principles, links to Instagram and YouTube.

## Structure and semantics
ProfilePage + Person JSON-LD with `sameAs` to the social profiles.

## States
Default, hover, focus, active, empty and error where they apply; both languages; 360 px and 1440 px; reduced motion.

## Performance budget
Portrait as AVIF/WebP with `srcset`; not lazy if above the fold.

## Accessibility
Meaningful alt text on the portrait in both languages.

## Tasks
| ID | Task | Stage | Notes |
|---|---|---|---|
| ABOUT-01 | Home section | idea | |
| ABOUT-02 | About page | idea | |
| ABOUT-03 | Author box for articles | idea | |

## Tests
See `testing/test-plan.md`, row MOD-about.
