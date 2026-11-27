# Site review against the Awwwards skill, 28 Nov 2026

What was run, what it found, what was fixed and what is still open. Numbers are measured in a real browser (Chromium) on a
local build of the `design/wheel-moment` branch; "lab" Lighthouse numbers use simulated mobile throttling.

## How it was reviewed (automation plus people-style review)
1. **Skill audit procedure** (`references/15-audit.md` and the pre-flight checklist), automated over 13 pages (home, Jyotish, Bach,
   Happiness, check-in, privacy, terms, refund, Telugu and Hindi home and Happiness, 404): console and network, eight widths
   (320, 390, 768, 1024, 1440, 1920, landscape phone, 200% zoom), tap targets, reduced motion, keyboard tab-through and focus
   visibility, heading order, landmarks, alt text, image sizes, metadata, placeholder text, text size, line length.
2. **Performance:** Lighthouse on six pages, and a whole-page scroll with the CPU slowed 4x.
3. **Feel as a visitor:** every screen of every main page photographed while scrolling (desktop and phone) and looked at one by one for
   proportions, spacing, order of the story and alignment.
4. **Measured layout feel:** gap between sections on every page; tone swings and abrupt colour steps down the page; text contrast
   measured behind every word; scroll behaviour (does it stall, does the End key work).
5. **Independent code and security review** by a separate reviewer who did not build the changes.

## Results
| Check | Result |
|---|---|
| Horizontal overflow, 8 widths x 13 pages | none |
| Keyboard: skip link first, focus visible on every stop, no traps | pass (after fixing the breathing orb, see below) |
| Reduced motion: nothing stuck invisible, nothing scaling | pass |
| Tap targets on a phone | pass (were 15 to 42px on 5 controls) |
| Console errors, failed requests | none (only the expected local 404 for the Netlify function) |
| Heading order, landmarks, alt text, duplicate ids, placeholder text | pass |
| Lighthouse accessibility | **100** on home, Jyotish, Bach, Happiness, check-in, privacy |
| Lighthouse performance (mobile, lab) | 93 to 98 |
| Lighthouse best practices / SEO | 96 / 100 (privacy SEO 66 is the intentional `noindex`) |
| Scroll smoothness, CPU 4x slower | steady 60 fps on every page |
| Page weight | 140 to 190 KB per page |
| Text contrast behind words | 5.0:1 or better (desktop), 4.5:1 or better (phone) |
| Empty space between sections (desktop) | average 195px -> 94px; largest 309px -> about 130px |
| Abrupt colour steps down the page | 28 -> 0; tone swings 18 -> about 1 |

## Fixed in this pass
- Breathing orb: focus ring was invisible (an undefined colour variable); now visible. Orb label switches to "Stop" while it runs.
- Smooth scrolling is now switched off for people who ask for reduced motion (the site forced it before).
- Screen-reader live regions stay in the page instead of being hidden until filled; focus moves to the Instagram player when it replaces the photo.
- Analytics no longer records whether the gentle or full breathing was chosen (counts only).
- Reading text is at least 16px on phones; labels are at least 12px; FAQ answers have a readable line length (they were up to 124 characters wide).
- Tap targets of at least 44px (Instagram link, video links, check-in buttons, the "talk it through" strip, booking tab).
- Story order: on Happiness, "Before you register" now comes before the registration card. On Bach, an empty "In their words" heading is hidden until there is content.
- Added `theme-color` and a conservative `_headers` file (no CSP on purpose, see below).

## Tried and rejected
- **Scroll-snapping** between sections: with proximity snapping, slow reading stalled on 73 to 79 of 80 scroll steps and the End key
  failed on 3 of 4 desktop pages. Not in. The pages tell their story through order and spacing instead.

## Still open (needs a decision or a asset)
1. **Largest Contentful Paint 1.8 to 2.5 s in the lab (target 1.5 s); layout shift 0.045 on home and 0.041 on Bach (limit 0.05).**
   Both come from web fonts loaded from Google. Self-hosting Karla and Marcellus (plus the Telugu and Hindi fonts) with a metric-matched
   fallback is the single biggest remaining win. It needs the font files downloaded, so it was not done here.
2. **Privacy page does not mention Instagram or YouTube.** Both load after the visitor presses play. A line should be added by you (it is
   legal copy, so it was not edited).
3. **No Content-Security-Policy.** Needs testing against the live booking and payment flow first.
4. **No iOS home-screen icon (apple-touch-icon)** and the favicon is an inline SVG only; a 180px PNG is needed.
5. **Page titles are long** (73 to 90 characters; search results cut at about 60). Shorter titles are a copy decision.
6. **Not testable here:** real iPhone Safari and a mid-range Android phone, a screen-reader pass (VoiceOver or NVDA), Firefox and Safari,
   real-user Core Web Vitals (INP). Please try the breathing practice and the booking flow on your own phone.
7. Gemini-supplied video: the second Bach Centre video is about children, and two channels were taken on trust (see `GEMINI-VIDEO-CURATION-PROMPT.md`).

## Self-score with the skill's sheet (pessimistic, mine and not a jury's)
Design about 6.6, Usability about 6.8 (held down by the lab LCP and CLS), Creativity about 5.6 (one real signature moment, the breathing
orb, but the rest is calm rather than distinctive), Content about 7.0. Weighted: **about 6.5**, which is Honorable Mention territory and not
yet a Site-of-the-Day contender. The fastest ways up: self-hosted fonts (Usability), then a second, owned piece of art direction (Creativity).


## Follow-up, 27 Nov 2026: open items closed

- **Fonts self-hosted.** Karla, Marcellus, Noto Sans Telugu and Noto Sans Devanagari are served from `/assets/fonts/` (SIL OFL, from the Fontsource npm packages). No request goes to Google Fonts any more. Only the needed subsets load (`unicode-range`): about 47 KB of fonts on an English page. Karla and Marcellus latin are preloaded; `font-display:swap`; two metric-matched fallback faces ("Karla Fallback", "Marcellus Fallback", sized from the real font metrics) so text does not jump when the real font arrives; fonts get a one-year immutable cache header. `tools/audit/fontcheck.js` lists the font files and external hosts each page uses.
- **Breathing orb is a balloon.** One volume value follows the breathing curve through a critically damped spring; the diameter comes from the volume (cube root, a full breath is about 2.5x the normal volume); a very small low-order outline wobble (a little more while air is moving) and a touch more height when full. Stopping mid-breath deflates smoothly to normal in about a second. The loop sleeps when the orb is off screen; reduced motion draws nothing moving. Measured: largest single-frame step 0.37 px on a 58 px range; 60 fps with a 4x CPU slowdown on a phone (`tools/audit/orbfps.js`, `balloon_checks.js`).
- **Privacy page** now says that YouTube preview pictures load when a page opens, that the video and the Instagram post load only after a press, and that those services may set their own cookies (en, te, hi; te/hi logged for native review).
- **Page titles** shortened to about 55 characters (en all five; te home, happiness; hi home, happiness, bach).
- **Apple touch icon** added (`/assets/apple-touch-icon.png`, the logo on the paper colour).
- Still open: no Content-Security-Policy (needs a test of the live payment flow); second Bach Centre video is about children (your decision); confirm the Instagram post plays on the live page and the two channel handles are official; Jyotish and Bach "taste" activities need your review.
