---
id: SPEC-02
title: Design system
status: draft
updated: 2026-11-02
---

# Design system

**Blocked until the design direction is chosen** (`status/decisions.md`, item P01). The four candidates are in `branding-directions/`. Once a direction is chosen, copy its tokens here and treat this file as the source of truth.

## To fill in after the choice
- Colour tokens (name, hex, role). Contrast pairs that pass WCAG 2.2 AA, checked with a tool and recorded here.
- Type: families, the weights actually used, scale, line heights. Fonts are self-hosted in woff2 and subset to Latin plus Latin Extended, so č, ć, š, ž and đ render (`specs/07`).
- Spacing scale, layout widths, breakpoints (at least 360, 768, 1024, 1440).
- Components: buttons, links, cards, forms, the language switch, the focus style.
- Motion: one signature effect at most (for example D's star field); always off under `prefers-reduced-motion`.
- Logo files and clear space. The vector mark is `branding-directions/logo/astromicroscope-mark.svg`, redrawn from a screenshot; replace it with the original if one exists.

## Fixed already (from the brief)
Mostly white and soft beige; blue from light to deep; gold only as detail; simple and practical.
