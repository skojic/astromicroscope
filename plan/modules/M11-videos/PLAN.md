# M11 Videos

| | |
|---|---|
| Owner | Srdjan |
| Needs first | M00 |
| Size | M |
| Specs | specs/06, specs/07 |
| Branch | `feature/m11-videos` |

## Goal
YouTube lessons as pages on the site, with summaries and transcripts, loaded without third-party requests.

## Scope
- In: Build-time import, video page, facade player, home section
- Out: Recording or captioning videos

## Inputs
Channel @astromicroscope (UCv3_4mUPiMaAY-TftEUfdKA); questionnaire 18–19

## Deliverables
`site/src/components/sections/videos/`, `site/src/data/videos.*`, `site/src/pages/video/**`, `site/src/pages/en/videos/**`, `site/src/i18n/videos.json`

## Tasks
| ID | Task | Notes |
|---|---|---|
| M11-01 | Import feed at build time; download and resize thumbnails |  |
| M11-02 | Video page with summary, key dates, transcript |  |
| M11-03 | Facade player that loads YouTube on click |  |
| M11-04 | Home section |  |

## Acceptance criteria
- [ ] No request to YouTube before a click
- [ ] VideoObject data valid
- [ ] Gates passed as in `testing/gates.md`; evidence in `REPORT.md`

## Risks
Videos have no subtitles; transcripts need work. Gorica cannot subtitle the existing videos for now; new videos will have subtitles; no English videos yet


## Component specs (moved from `modules/`)

### Component spec: YouTube lessons

#### Purpose
Shows the newest videos from @astromicroscope, and links each to its own video page on the site (summary + transcript) as well as to YouTube.

#### Content (sr and en)
Per video: title (original language), date, thumbnail, duration, link to the video page. Source: the channel RSS feed or YouTube Data API, fetched at build time, never in the visitor's browser.

#### Structure and semantics
List of articles. The video page carries VideoObject JSON-LD (`specs/06`).

#### States
Default, hover, focus, active, empty and error where they apply; both languages; 360 px and 1440 px; reduced motion.

#### Performance budget
Thumbnails are self-hosted and resized at build time (no request to i.ytimg.com on page view); the player loads only on click (facade).

#### Accessibility
Serbian titles on English pages have `lang="sr"`. The play button has a name that includes the video title.

#### Tasks
| ID | Task | Stage | Notes |
|---|---|---|---|
| VIDEO-01 | Build-time feed import | idea | |
| VIDEO-02 | Video card | idea | |
| VIDEO-03 | Video page template with transcript | idea | |
| VIDEO-04 | Facade player | idea | |

#### Tests
See `testing/test-plan.md`, row MOD-youtube-feed.
