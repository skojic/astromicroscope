---
id: MOD-learn-formats
title: Learning formats
stage: idea
gate: none
specs: [SPEC-00, SPEC-04]
updated: 2026-11-02
---

# Learning formats

## Purpose
Shows the four ways to learn (programs, recorded courses, digital products, articles) and links each to its hub.

## Content (sr and en)
Per format: name, one-sentence description, status line (next date, price from), link. Data comes from the CMS, so dates and prices stay correct.

## Structure and semantics
A section with an H2 and a list of four items, each with an H3 and one link with descriptive text.

## States
Default, hover, focus, active, empty and error where they apply; both languages; 360 px and 1440 px; reduced motion.

## Performance budget
No JavaScript. Icons are inline SVG.

## Accessibility
Card links: the whole card may be clickable, but only one link is focusable per card.

## Tasks
| ID | Task | Stage | Notes |
|---|---|---|---|
| LEARN-01 | Section layout | idea | |
| LEARN-02 | CMS data binding | idea | |
| LEARN-03 | Empty state when a format has nothing yet (“Uskoro / Coming soon” + waitlist) | idea | |

## Tests
See `testing/test-plan.md`, row MOD-learn-formats.
