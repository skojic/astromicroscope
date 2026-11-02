---
id: MOD-language-switch
title: Language switch
stage: idea
gate: none
specs: [SPEC-05, SPEC-06, SPEC-08]
updated: 2026-11-02
---

# Language switch

## Purpose
Moves the visitor to the same page in the other language.

## Content (sr and en)
Labels “SR” and “EN”, with full names for assistive technology (“Srpski”, “English”).

## Structure and semantics
Plain links (`<a href hreflang lang>`) to the paired URL, not JavaScript buttons, so crawlers follow them too. The current language is marked with `aria-current="true"`.

## States
Default, hover, focus, active, empty and error where they apply; both languages; 360 px and 1440 px; reduced motion.

## Performance budget
Zero JavaScript. Never redirects automatically by browser language.

## Accessibility
Each target is at least 24×24 px; the link names include the language name in that language (`lang` attribute).

## Tasks
| ID | Task | Stage | Notes |
|---|---|---|---|
| LANG-01 | Paired-URL lookup for every page | idea | |
| LANG-02 | hreflang `<link>` tags in `<head>` (see seo-head) | idea | |

## Tests
See `testing/test-plan.md`, row MOD-language-switch.
