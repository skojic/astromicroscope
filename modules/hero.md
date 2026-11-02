---
id: MOD-hero
title: Home hero
stage: idea
gate: none
specs: [SPEC-00, SPEC-02, SPEC-07, SPEC-08]
updated: 2026-11-02
---

# Home hero

## Purpose
States in one screen what Astromicroscope is (learn astrology from a graduated astrologer) and offers two paths: courses (primary) and private analyses (secondary).

## Content (sr and en)
H1, one-sentence lede, two buttons; optional signature visual from the chosen direction (for example the chart lens and the star field).

## Structure and semantics
The H1 is the LCP element. It must be HTML text, not an image or canvas.

## States
Default, hover, focus, active, empty and error where they apply; both languages; 360 px and 1440 px; reduced motion.

## Performance budget
The text paints without waiting for JavaScript. The signature effect (canvas or SVG) starts after idle, only while visible, and is off under reduced motion. On mobile it is simplified or static. Layout shift 0.

## Accessibility
The interactive chart works with arrow keys and clicks, not only with the pointer (WCAG 2.5.7). Decorative canvas is `aria-hidden`.

## Tasks
| ID | Task | Stage | Notes |
|---|---|---|---|
| HERO-01 | Static hero (text and buttons) | idea | |
| HERO-02 | Signature visual, progressive enhancement | idea | |
| HERO-03 | Reduced-motion and mobile variants | idea | |

## Tests
See `testing/test-plan.md`, row MOD-hero.
