---
id: MOD-private-analyses
title: Private analyses
stage: idea
gate: none
specs: [SPEC-00, SPEC-04, SPEC-06]
updated: 2026-11-02
---

# Private analyses

## Purpose
Presents the premium one-to-one offer: natal, solar and karmic analysis and a consultation on one area of life, and leads to a booking request.

## Content (sr and en)
Per analysis: name, what it covers, what the client provides (birth date, time, place), format and length, price, request link. Each has its own page (`specs/01`).

## Structure and semantics
A section with an H2 and a list; on the analysis page, Service or Product data only if it matches the visible text.

## States
Default, hover, focus, active, empty and error where they apply; both languages; 360 px and 1440 px; reduced motion.

## Performance budget
No JavaScript unless an accordion is used (then ≤ 2 KB, works without it).

## Accessibility
An accordion, if used, follows the disclosure pattern (`button` + `aria-expanded`).

## Tasks
| ID | Task | Stage | Notes |
|---|---|---|---|
| ANALYSIS-01 | Section on home | idea | |
| ANALYSIS-02 | Analysis page template | idea | |
| ANALYSIS-03 | Request form (see contact) | idea | |

## Tests
See `testing/test-plan.md`, row MOD-private-analyses.
