# Srikanth's to-do list (kept up to date by Claude)

Tick items by changing `[ ]` to `[x]`. Claude re-reads this at the start of each session and reminds you of the next few open items.
**Last updated: 17 Nov 2026 (later).** AI-side follow-ups are tracked separately in `docs/AI-ACTIONS.md`.
Guiding principles for everything on the site: `docs/GUIDING-PRINCIPLES.md` (lower pressure and fear; tell the truth, not a rosy story).

## A. Blocking: the site cannot take real bookings until these are done
- [ ] **A1. Razorpay TEST keys.** Razorpay dashboard, Test Mode, Account & Settings, API Keys, Generate Test Key.
- [ ] **A2. Netlify variables, one value per deploy context.** Table in `docs/RELEASE-PROCESS.md`. Needs: `SUPABASE_URL`, `SUPABASE_SERVICE_KEY` (service_role key of each project, from Supabase Project Settings, API Keys), `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`. Production gets live values; previews and branch deploys get test values.
- [ ] **A3. Razorpay webhook** (once in Live mode for production, once in Test mode for staging). URLs and events: `docs/PAYMENTS-AND-PRICES.md`.
- [ ] **A4. Test the full payment flow on staging** with a Razorpay test card: pick a slot, pay, then check Supabase tables `payments` (status `paid`) and `bookings` (status `booked`).
- [ ] **A5. Test slot clashes on staging:** open the Bach page in two browsers, pick the same slot; the second one must be refused. Try the Jyotish "Hold this slot" too.
- [ ] **A7. Google Calendar setup:** (can be done by Gemini: see `docs/GEMINI-SETUP-PROMPT.md`) follow `docs/GOOGLE-CALENDAR-SETUP.md` (about 45 minutes): create the two calendars (Bookings + TEST), the Google Cloud robot account, share both calendars with it, add 4 Netlify variables (`GOOGLE_CLIENT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_CALENDAR_ID`, `GOOGLE_CALENDAR_ENV`). Until then the site simply uses the weekly schedule.
- [ ] **A8. Test the calendar on staging** (Part 6 of that guide) and tell Claude the result or any error text. The code has not yet run against your real Google account.
- [x] **A9. Availability.** Changed 20 Nov: no `Open` events are needed any more. Your normal hours are in the database (Mon-Thu 9-12 and 5-9 PM, Fri 9-1 and 5-9 PM, Sat-Sun 9 AM-9 PM) and the calendar only shows what is busy. Delete the old `Open` events from both calendars (Prompt 2 in `docs/GEMINI-SETUP-PROMPT.md` does it); they are harmless if left.
- [ ] **A6. Staging review feedback.** You said you tested staging and shared suggestions, but I did not receive them. Please paste them again.

## B. Before going live (merge `staging` into `main`)
- [ ] **B1. Review the draft Privacy, Terms and Refund pages** (`docs/policy-decisions.md`). They are hidden from Google and unlinked until you approve. Razorpay expects them. The booking form now stores name and WhatsApp number, so the Privacy page needs your OK on that.
- [ ] **B2. Open `telemanas.mohfw.gov.in`** once to confirm it is the official Tele-MANAS site (shown in the check-in safety box).
- [ ] **B3. Decide:** Jyotish confirmation window (site says "within 24 hours").
- [ ] **B4. Turn on Netlify "Stop auto publishing"** and protect `main` on GitHub (see `docs/RELEASE-PROCESS.md`), so nothing reaches antarshanti.co.in without your click.
- [ ] **B5. Look at `bookings` in Supabase** (view `upcoming_bookings`) as your daily booking list. There is no automatic notification yet (see D2).

## C. For ads and growth
- [ ] **C1. Analytics IDs** at the top of `assets/site.js`: Meta Pixel, GA4, optionally Plausible. Nothing is tracked until you add them.
- [ ] **C2. Happiness batch:** send me the registration link and dates when you have them (suggested: Thu 3 to Sun 6 Dec, Thu 24 to Sun 27 Dec, Thu 14 to Sun 17 Jan). Add to the `batches` table in Supabase (production) or `src/data/site.json`.
- [ ] **C3. Preview every video** (Happiness 3, Bach 3, Jyotish 2), picked by title only. Delete a `data-yt` line to remove one.
- [ ] **C4. Testimonials:** collect real ones with consent (method below), add to Supabase table `testimonials` (tick `consent_on_file` and `approved`).
- [ ] **C5. Record a 45 to 60 second video of you per service,** ending with the check-in link.
- [ ] **C6. Google Business Profile** for Hyderabad (online services); ask past clients for reviews.
- [ ] **C7. Weekly WhatsApp broadcast** note and a QR code to `/checkin` on Happiness Program materials.

## D. Decisions waiting for you / ideas
- [x] **D1. Booking widget "Next week" button** (done: you can page up to 6 weeks ahead).
- [ ] **D2. Get notified of new bookings** (WhatsApp or email). Suggested after the calendar link-up, since calendar events notify your phone.
- [ ] **D3. Check-in wording** was changed to bands (no 0 to 100 score). Please read the results screen once on staging and say if the tone is right.
- [ ] **D6. Check-in next-step wording (new).** Read the results on staging once. In particular please confirm you are happy with this sentence about Sudarshan Kriya: *"Several published studies report lower stress and anxiety after learning it, and many people simply find it deeply relaxing."* If you can, give me one specific study link (for example from the Art of Living research page) and I will link it; that makes the sentence stronger and safer.
- [ ] **D7. Watch the two short videos on the check-in results:** Sudarshan Kriya `gWwhIPAajfw` and Bach Flower `Cm5DVzkOo_U` (chosen by title). Say if you want others.
- [ ] **D4. Native review of all Telugu and Hindi pages (you coordinate; Claude has done the first and second drafts).** Start at the index at the top of `docs/TRANSLATION-REVIEW.md`: every page has its own notes. Newest and most important: **Part 7** (flagged critical lines: please have a native counsellor read the safety lines and a lawyer read the legal lines), **Part 6** (all questions rewritten; **please have a Telugu-speaking counsellor or trusted person read the self-harm item in the check-in first**) and **Part 5** (headline choices with alternatives, and a list of questions for you) and `docs/TRANSLATION-CHANGES-LOG.md` (every changed line, before and after). Staging links: `/te/` and `/hi/` for every page. Nothing goes live in these languages until the flags in `src/_data/i18n/review.json` are switched on. Send corrections as "page, key or item number, new wording".
- [ ] **D11. Lawyer review of the English Privacy, Terms and Refund pages** before they are linked (the Telugu and Hindi versions follow whatever the English says; their "legal-sensitive points" are in Part 4 of `docs/TRANSLATION-REVIEW.md`).
- [ ] **D8. Happiness page headline changed** from "Don't settle for happy-ish" (felt like pressure) to "A calmer mind, one breath at a time". Also removed "why haven't you tried it yet?". Happy with both?
- [ ] **D5. Bach headline** now says "Gentle support for the feelings words cannot reach". Happy with it?


## E. Operating notes (no action unless something looks wrong)
- Databases: `antarshanti-prod` (real data) and `antarshanti-test` (sample data), both Mumbai, Free plan. Process for changes: `docs/DATABASE-CHANGES.md`. Free projects pause after 7 days idle; a scheduled keep-alive handles this once on production.
- Change a price: Supabase `services` table (no deploy). Change availability: `availability_rules` (weekly times) and `slot_blocks` (days off). Details: `docs/BOOKING.md`.
- Before a large ad campaign: move **production only** to Supabase Pro (about USD 25/month) and export `checkin_responses`.

## How to collect testimonials (suggested)
1. Two to three days after a session or batch, send: *"Namaste, I hope the session is still helping. If it did, would you share one or two lines in your own words? May I show it on my website with your first name and city? Totally fine to say no."*
2. Ask one easy question: *"What was different for you afterwards?"*
3. Keep the screenshot of the reply as proof of consent. Show first name, role and city only. Never edit the meaning.
4. Do not ask anyone who is going through a hard time. Aim for 3 per service to start.
5. Quotes from other sites (Art of Living, etc.) only with that site's permission, naming the source.

## Done so far
- Site rebuilt on Eleventy; Golden Hour theme; check-in with gentler band results, a single Tele-MANAS helpline and an always-available WhatsApp option; Bach/Jyotish wording made non-promissory; two Supabase projects with row-level security; server-side editable prices; slot reservation with Google Calendar support; "Next week" button on the booking widget (D1).
- **Telugu and Hindi: every page translated as a draft** (check-in, Home, Happiness, Jyotish, Bach, Privacy, Terms, Refund), including booking messages and times in the reader's language, behind the review gate.
- 20 Nov: weekly availability opened to every day (weekdays keep your morning/evening windows, weekends 9 AM to 9 PM); Netlify variables `GOOGLE_CALENDAR_ENV` and `SUPABASE_URL` set per environment; Gemini setup brief written.
- Decisions settled by you on 17 Nov (no action left): keep the "English version applies" note on translated legal pages; leave the గారు / जी addressing as it is until something sounds very odd; "ఇవ్వండి" (not "సమర్పించండి") for contributing; use plain everyday words instead of bookish or church-like ones; booking server messages and times translated.
- 18 Nov: all check-in questions (25 items, stem, answer labels) and other questions/prompts rewritten to sound natural in Telugu and Hindi; you settled that the existing headings and the word "नर्म" are fine.
- 18 Nov: Telugu (and Hindi check-in) rewritten from the meaning instead of from the English phrasing; FeelBetter references removed from the planning docs; policy-decision items confirmed (Jyotish, Happiness) and the wording of the refund proposals fixed.
- A second read-through by a stronger editor model rewrote the Telugu headlines naturally and replaced about 140 uncommon-word uses (Part 5 of the review document).
