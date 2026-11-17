# How the site is built (Eleventy)

## What changed, in plain words
**Before:** eight hand-written HTML files (`index.html`, `jyotish.html`, ...). Each one contained its own copy of the 15 KB stylesheet, the header, the navigation, the footer, the mobile menu script and the search-engine tags. One change to the menu meant editing every file by hand, and Telugu and Hindi would have tripled that.

**Now:** the pieces live once, and [Eleventy](https://www.11ty.dev) assembles the pages. Eleventy is a free tool that runs on Netlify each time you save to GitHub. It writes ordinary HTML files into a folder called `_site`, and that folder is what visitors get. Nothing runs in the visitor's browser that did not run before. The site is exactly as fast as before.

**What Eleventy replaced:** only the copy-pasting. The payment functions (`netlify/functions`), Supabase, Razorpay and the page content are untouched. The old HTML pages had no content that Eleventy dropped; each rebuilt page was compared with its original and matches.

## Where to edit things
| You want to change | Edit this file |
|---|---|
| Menu items (add or rename a page) | `src/_data/nav.json` (links) and `src/_data/i18n/en.json` (labels, per language) |
| Telugu / Hindi text; switching a language on for the live site | `src/_data/i18n/te.json`, `hi.json`; `review.json` |
| Footer, logo, top of every page | `src/_includes/partials/` |
| Colours, fonts feel, spacing for the whole site | `src/assets/theme.css` |
| Text on a page | `src/index.njk`, `src/jyotish.njk`, `src/bach.njk`, `src/happiness.njk` (layout) and the words in `src/_data/i18n/*.json` |
| FAQ questions (the page and the Google markup update together) | the `faq` list of that page in `src/_data/i18n/en.json` (and `te.json`, `hi.json`) |
| Page title, description, address (SEO) | the top of that page file (between the `---` lines) |
| Happiness dates, registration links, announcement bar, testimonials | `src/data/site.json`, or Supabase tables (no deploy) |
| Sitemap | automatic (draft policy pages are left out until `noindex` is removed) |

## Output and deploy
- Build command: `npm run build` (set in `netlify.toml`). Publish folder: `_site`.
- Never edit files inside `_site`. They are regenerated and not stored in GitHub.
- To preview locally: `npm install`, then `npm start`.

## Next simplifications (not done yet)
- (done 17 Nov) The check-in page now uses the shared header, footer and styles; only `src/assets/checkin-only.css` is specific to it.
- Telugu and Hindi: the check-in, Home, Happiness, Jyotish and Bach pages are done (drafts behind the review gate) as a pattern (`src/*.njk` + `src/_data/i18n/*.json` + `src/*.11tydata.js`). Remaining pages: privacy, terms, refund; see `docs/TRANSLATION-REVIEW.md`.
