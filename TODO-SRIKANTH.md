# Srikanth's to-do list (kept up to date by Claude)

Tick items by changing `[ ]` to `[x]`. Claude re-reads this at the start of each session and reminds you of the next few open items.
**Last updated: 17 Nov 2026.**

## A. Blocking: the site cannot take real bookings until these are done
- [ ] **A1. Razorpay TEST keys.** Razorpay dashboard, Test Mode, Account & Settings, API Keys, Generate Test Key.
- [ ] **A2. Netlify variables, one value per deploy context.** Table in `docs/RELEASE-PROCESS.md`. Needs: `SUPABASE_URL`, `SUPABASE_SERVICE_KEY` (service_role key of each project, from Supabase Project Settings, API Keys), `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`. Production gets live values; previews and branch deploys get test values.
- [ ] **A3. Razorpay webhook** (once in Live mode for production, once in Test mode for staging). URLs and events: `docs/PAYMENTS-AND-PRICES.md`.
- [ ] **A4. Test the full payment flow on staging** with a Razorpay test card: pick a slot, pay, then check Supabase tables `payments` (status `paid`) and `bookings` (status `booked`).
- [ ] **A5. Test slot clashes on staging:** open the Bach page in two browsers, pick the same slot; the second one must be refused. Try the Jyotish "Hold this slot" too.
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
- [ ] **D1. Google Calendar link-up** (proposal in the chat): choose a separate bookings calendar or not; create the Google service account. Not started until you say go.
- [ ] **D2. Get notified of new bookings** (WhatsApp or email). Suggested after the calendar link-up, since calendar events notify your phone.
- [ ] **D3. Check-in wording** was changed to bands (no 0 to 100 score). Please read the results screen once on staging and say if the tone is right.
- [ ] **D4. Telugu and Hindi:** who will review the translations?
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
Site rebuilt on Eleventy; Golden Hour theme; check-in with gentler band results and a single Tele-MANAS helpline plus always-on WhatsApp option; Bach/Jyotish wording made non-promissory; two Supabase projects with row-level security; server-side pricing from the database; Razorpay webhook; slot reservation with a database-level no-double-booking guarantee; staging branch and safety guards between test and live.
