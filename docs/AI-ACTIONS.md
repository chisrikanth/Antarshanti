# AI action items (not for Srikanth)

Things Claude owns. Srikanth does not need to do anything here; this file just keeps them from being forgotten. Updated 17 Nov 2026.

## Translation quality
- [ ] **Second opinion from a dedicated Indian-language model.** No specialist Telugu/Hindi model (for example IndicTrans2, Sarvam, or a back-translation through another engine) is reachable from this session. When one is available, run it as a *reader and suggester*: (1) translate te.json and hi.json back into English and compare with `en.json`, flagging meaning drift and any claim that became stronger or weaker; (2) ask it to rate each string natural / acceptable / odd and suggest alternatives for the odd ones. Record the suggestions in `docs/TRANSLATION-CHANGES-LOG.md`; apply only the clear wins.
- [ ] **Re-run the naturalness read** (native-editor pass, headlines first) after Srikanth's reviewers send their corrections, so the corrected wording stays consistent across all pages (same word for the same idea).
- [ ] **Re-translate whenever the English changes.** Any edit to `en.json` needs the matching `te.json` / `hi.json` edit, and the legal pages first of all. A quick check: `node` script comparing keys and placeholders (the one used on 17 Nov is described in the log; turn it into a test in `tests/` so a missing key fails the build).
- [ ] **Add a test that the Telugu/Hindi pages build without English leaks** (strings identical to English except brand names) so new English text is noticed.
- [ ] **Keep a glossary file** (`docs/TRANSLATION-GLOSSARY.md`): one agreed Telugu and Hindi word per idea (session, contribute, hold a slot, gentle, mood, …), fed from the terms tables in `docs/TRANSLATION-REVIEW.md` Part 5, and give it to every future translation task.
- [ ] **Decide, once the reviewers answer, the open style questions** listed in Part 5 (Jyotish and Happiness hero choice, "Book a reading" wording, "హోల్డ్" vs a plainer phrase) and apply them.

## Before the Telugu and Hindi pages go live
- [ ] After Srikanth approves: set `te` and `hi` to `true` in `src/_data/i18n/review.json` on `staging`, check the staging pages once more, then (only on Srikanth's go-ahead) merge `staging` into `main`.
- [ ] Check the live site after the merge: production sitemap, `hreflang` tags, language banner on a Telugu phone, and the three language switches.

## Technical follow-ups
- [ ] Server error messages are now sent with a code and translated in the browser. Add the same codes to any new message a function adds (see `netlify/functions/lib/booking.js`), and a test that every code has a Telugu and Hindi text.
- [ ] The slot times use English digits with Telugu/Hindi day-period words. If readers prefer Telugu digits, add a digit map in `ASBook.timeLabel` (`src/assets/booking.js`).
- [ ] Add an automated page-flow test (the 25-question check-in in English, Telugu and Hindi, and both booking widgets) to `tests/`, so a broken script is caught before a push. (A broken check-in script was found by hand on 17 Nov, after it had briefly reached staging; the check used is in this session only.)
