---
id: SPEC-08
title: Accessibility
status: draft
updated: 2026-11-02
---

# Accessibility

Target: **WCAG 2.2 level AA** (W3C Recommendation; the current edition on w3.org/TR/WCAG22 is dated 12 December 2024). Accessible pages also help SEO: semantic structure, text alternatives and clear link text are what crawlers and AI tools read.

## New in WCAG 2.2 at A and AA (all apply)
- 2.4.11 Focus Not Obscured (Minimum), AA: a sticky header or the review bar never hides the focused element.
- 2.5.7 Dragging Movements, AA: the chart lens also works with keys and clicks, not only by dragging.
- 2.5.8 Target Size (Minimum), AA: targets at least 24×24 CSS px, or enough spacing. The SR/EN switch counts.
- 3.2.6 Consistent Help, A: contact or help in the same place on every page.
- 3.3.7 Redundant Entry, A: forms do not ask twice for the same data.
- 3.3.8 Accessible Authentication (Minimum), AA: if logins exist (courses), no puzzle-only or memory-only tests.

## Rules for this site
- Landmarks: `header`, `nav` (labelled), `main`, `footer`; a skip link to main content.
- Headings in order; one H1.
- Colour contrast: text 4.5:1, large text 3:1, UI parts and focus indicators 3:1. Check every token pair in `specs/02`. Gold on white or beige is for decoration only.
- A visible focus style on every interactive element, in both themes (dark hero, light sections).
- Every interactive custom element (lens, accordion, sign tiles, language switch) has a role, a name and a state (`aria-expanded`, `aria-pressed`), and works with the keyboard.
- Motion: every animation stops under `prefers-reduced-motion`; nothing flashes more than three times per second; any motion longer than five seconds can be paused.
- Language: `lang` on `<html>`, and `lang` on any passage in the other language (for example Serbian video titles on English pages).
- Forms: visible labels, errors in text next to the field and announced, no placeholder-only labels.
- Media: captions and transcripts for videos (this also helps SEO; see `specs/06`).
- Zoom to 200% and a width of 320 CSS px without loss of content or two-way scrolling.

## Testing
Automated checks with axe show zero violations; manual keyboard and screen-reader passes (VoiceOver on macOS and iOS, NVDA on Windows if available). See `testing/checklists/accessibility.md`.
