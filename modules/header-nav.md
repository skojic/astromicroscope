---
id: MOD-header-nav
title: Header and navigation
stage: idea
gate: none
specs: [SPEC-01, SPEC-05, SPEC-08]
updated: 2026-11-02
---

# Header and navigation

## Purpose
Lets visitors reach courses, articles, videos, private analyses and About from any page, and switch language.

## Content (sr and en)
Logo lockup (links home); main nav items (sr/en labels from `specs/01`); primary button “Pogledaj kurseve / Explore courses”; language switch.

## Structure and semantics
`<header>` containing `<nav aria-label>` with a list of links; the current page gets `aria-current="page"`. A skip link “Preskoči na sadržaj / Skip to content” comes first in the DOM.

## States
Default, hover, focus, active, empty and error where they apply; both languages; 360 px and 1440 px; reduced motion.

## Performance budget
No JavaScript needed for the desktop menu; the mobile menu toggle is the only script (≤ 3 KB). The logo is inline SVG with no request. The header height is fixed so it never causes layout shift.

## Accessibility
Keyboard order: skip link, logo, nav, language switch, button. Mobile menu: a button with `aria-expanded`, focus moves into the menu and back on close, Escape closes it. Targets ≥ 24×24 px (WCAG 2.5.8).

## Tasks
| ID | Task | Stage | Notes |
|---|---|---|---|
| NAV-01 | Desktop navigation | idea | |
| NAV-02 | Mobile menu | idea | |
| NAV-03 | Skip link | idea | |
| NAV-04 | Active-page state | idea | |

## Tests
See `testing/test-plan.md`, row MOD-header-nav.
