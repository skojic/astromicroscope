---
id: MOD-youtube-feed
title: YouTube lessons
stage: idea
gate: none
specs: [SPEC-04, SPEC-06, SPEC-07]
updated: 2026-11-02
---

# YouTube lessons

## Purpose
Shows the newest videos from @astromicroscope, and links each to its own video page on the site (summary + transcript) as well as to YouTube.

## Content (sr and en)
Per video: title (original language), date, thumbnail, duration, link to the video page. Source: the channel RSS feed or YouTube Data API, fetched at build time, never in the visitor's browser.

## Structure and semantics
List of articles. The video page carries VideoObject JSON-LD (`specs/06`).

## States
Default, hover, focus, active, empty and error where they apply; both languages; 360 px and 1440 px; reduced motion.

## Performance budget
Thumbnails are self-hosted and resized at build time (no request to i.ytimg.com on page view); the player loads only on click (facade).

## Accessibility
Serbian titles on English pages have `lang="sr"`. The play button has a name that includes the video title.

## Tasks
| ID | Task | Stage | Notes |
|---|---|---|---|
| VIDEO-01 | Build-time feed import | idea | |
| VIDEO-02 | Video card | idea | |
| VIDEO-03 | Video page template with transcript | idea | |
| VIDEO-04 | Facade player | idea | |

## Tests
See `testing/test-plan.md`, row MOD-youtube-feed.
