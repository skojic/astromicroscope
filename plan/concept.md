# Site concept

Approved by Srdjan on 2026-11-02. Visual rules come from the brand kit (`brand/index.html`, direction D); this file decides structure, content and the signature interactions.

## Idea: the sky under the lens
The lens from direction D is not only decoration on the home page. It becomes the way to move through the strongest content, the yearly horoscope. That is the one bold element; everything else stays calm and readable.

## What the content gives us
From the old site (`docs/sadrzaj/stari-sajt/`, about 20,000 words) and Filip's drafts (`docs/sadrzaj/01–07`):
- **Yearly horoscope 2026** for all 12 signs (475–953 words each). Most likely the most searched content. It is for 2026 and needs a 2027 edition (see `challenge.md`).
- **10 long articles** on transits, the rising sign (4,095 words), potential, finances, eclipses, children's horoscope.
- **Children's astrology**: Gorica's strongest personal angle (“mother astrologer”, since 2000). A topic of articles, not a separate service (D19). Her focus in her own words: family inheritance, genetic predispositions, unconscious patterns, early childhood, the child's development and the parent's role (`docs/sadrzaj/05-o-meni.md`).
- **The name story**: Virgo with Scorpio rising, “micro” as precision and attention to detail.
- **Credential**: on the site **professional astrologer / profesionalni astrolog** (D20); graduated from the Johannes Kepler Astrological Institute in 2025; more than 20 years of practice. Nikola Stojanović is **not** mentioned (no official confirmation of that training).
- **Quotes** she uses: Jung, Maslow. For English she chose: “When an inner situation is not made conscious, it happens outside, as fate.” (C. G. Jung)

## Sitemap (adds to `specs/01-sitemap.md`)
| Page | sr | en | Source |
|---|---|---|---|
| Home | `/` | `/en/` | drafts 01–07 |
| Education hub (free learning + course waitlist; courses in 2027) | `/edukacija/` | `/en/learn/` | draft 02 |
| **Yearly horoscope** hub | `/horoskop/` | `/en/horoscope/` | new |
| Sign page, current year | `/horoskop/2027/ovan/` … | `/en/horoscope/2027/aries/` … | Gorica is writing the new edition; the 2026 texts stay current about one more month |
| Sign page, archive | `/horoskop/2026/ovan/` … | `/en/horoscope/2026/aries/` … | old site, 12 texts |
| Articles hub, topic, article | `/tekstovi/…` | `/en/articles/…` | old site, 10 texts |
| **Topic: children's astrology** | `/tekstovi/tema/decja-astrologija/` | `/en/articles/topic/childrens-astrology/` | old article + future texts |
| Videos | `/video/…` | `/en/videos/…` | YouTube channel |
| Private analyses + one page each | `/analize/…` | `/en/analyses/…` | draft 04 + old “Konsultacije” |
| About, contact, legal | `/o-meni/`, `/kontakt/`, … | `/en/about/`, … | draft 05, 07 |

## Home page
```
┌──────────────────────────────────────────────────────────────┐
│ NIGHT SKY (stars follow the cursor)                          │
│  Astrologija u službi evolucije svesti.  ( chart + lens )    │
│  lede · [Explore courses] [Private analyses]                 │
├──────────────────────────────────────────────────────────────┤
│ EDUCATION: free learning now (articles, videos, horoscope)   │
│ + “Courses in 2027” with a waitlist                          │
├──────────────────────────────────────────────────────────────┤
│ YEARLY HOROSCOPE: zodiac wheel as navigation; the lens sits  │
│ on the chosen sign and shows its opening paragraph + “Read”  │
├──────────────────────────────────────────────────────────────┤
│ ARTICLES: one featured long read + three in a list           │
│ VIDEOS: three YouTube lessons (player loads on click)        │
│ PRIVATE ANALYSES: Midnight panel with gold hairline          │
│ ABOUT: arch portrait, Jung quote                             │
│ NEWSLETTER · FOOTER                                          │
└──────────────────────────────────────────────────────────────┘
```

## Sign page
```
Horoskop › 2027 › Ovan
H1  Ovan 2027: [title of the year]                 (sign in the lens)
[ Answer first: 2–3 sentences on the year ]
[ Transit timeline: Saturn in Aries ━━━━━━━ 14.2.2026 → 13.4.2028 ]
H2 sections worded as questions · author box (professional astrologer)
← Ribe     [ small wheel of 12 signs ]     Bik →
```

## Article page
Reading column of at most 62 characters, Newsreader; “answer first” box; quotes as pull quotes; transit timeline where dates are mentioned; author box; related articles by topic; previous/next.

## Signature interactions (only these)
1. **Star field** in the home hero (from direction D).
2. **Lens over the natal chart** in the hero (pointer and arrow keys).
3. **Zodiac wheel** on the horoscope hub and home section: choose a sign, the lens moves to it, the opening paragraph appears. Without JavaScript it is a plain list of 12 links; with the keyboard it works like a list of buttons.
4. **Transit timeline**: a static bar with dates; no animation.

## Mobile and tablet
- Hero: text first, chart below it, smaller; star field simplified on touch devices (no cursor).
- Zodiac wheel: on screens under 768 px it becomes a 3 × 4 grid of signs (same links); the lens effect is desktop-only.
- Navigation: menu button with the five sections and the language switch; header height fixed.
- Reading pages: one column, 19 px body text, comfortable side margins.
