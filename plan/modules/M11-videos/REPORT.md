# Report: M11 Videos

| | |
|---|---|
| Stage | testing |
| Last gate passed | G1 |
| Owner | Srdjan |
| Branch | `main` (owner bypass) |
| Last commit | see `git log` |
| Last updated | 2026-11-03 |

## Next step
Gates G2 and G3. Gorica's own summaries, key dates and transcripts: not built, the YouTube description is shown as the summary until they exist. Run `npm run import:videos` when a new video is published.

## Done
- M11-01 `scripts/import-videos.mjs`: channel feed (6 videos on 2026-11-03), thumbnails to `src/assets/videos/`, `src/data/videos.json` (D26).
- M11-02 video pages `/video/<slug>/` and `/en/videos/<slug>/`, hub `/video/`, `/en/videos/`: title, date, summary, link to YouTube, VideoObject JSON-LD, breadcrumbs; the same video on both routes, the video text marked `lang="sr-Latn"`.
- M11-03 facade player: no request to YouTube before a click (`scripts/e2e.mjs` loads a video page and records requests to other hosts: none); a click inserts a `youtube-nocookie.com` iframe; without JavaScript it is a link.
- M11-04 `components/sections/videos/HomeSection.astro` (three newest, used on the home page).

## Not done
- Key dates and transcripts (plan: transcript made automatically and marked unchecked); no transcript exists.
- Video duration (the feed has none).
- VideoObject validation in Google's Rich Results Test.
- A Lighthouse run on a video page (CI measures the two home pages only).

## Problems and blockers
- Video titles on YouTube are partly in capitals; they are shown as published.
- The importer relies on the shape of YouTube's RSS feed and on `maxresdefault.jpg`; it fails loudly if either changes.

## Decisions taken in this module
- Date, decision, why (move project-wide ones to `status/decisions.md`).

## Requests to other modules
- To MNN: what is needed and why.

## Test evidence
| Check | Result | Date |
|---|---|---|
| `npm test` (site/) | `ℹ pass 15`, `ℹ fail 0` | 2026-11-03 |
| `npm run build` | `18 page(s) built`, no warnings | 2026-11-03 |
| `npm run test:html` | no output, exit 0 (html-validate on `dist/`) | 2026-11-03 |
| `npm run test:axe` | `axe: 18 pages x 2 viewports, 0 violations` | 2026-11-03 |
| `npm run test:e2e` | `e2e: 18 pages, 0 failures` | 2026-11-03 |
| GitHub Actions `site-ci` on `main` | success for the last push (all steps incl. Lighthouse median of 3) | 2026-11-03 |
| `scripts/e2e.mjs` on a video page | 0 requests to other hosts before click; iframe `https://www.youtube-nocookie.com/embed/...` after click | 2026-11-03 |

## History
- 2026-11-02: plan created.
- 2026-11-03: built; G1 passed; CI green.
