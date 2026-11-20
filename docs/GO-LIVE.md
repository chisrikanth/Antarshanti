# Go-live checklist (staging to antarshanti.co.in)

Nothing here happens without Srikanth's say-so. Today (20 Nov 2026) the live site is still the **old static site** (two payment functions, no check-in, no calendar booking). The new site is on the `staging` branch: 41 commits, 108 files. Going live replaces the whole thing, in English only (Telugu and Hindi stay hidden until `src/_data/i18n/review.json` is switched on).

## 1. Where things stand

| Area | State |
|---|---|
| Check-in, Home, Happiness, Jyotish, Bach, legal pages (English) | built, tested on staging |
| Test payment with Razorpay test keys, webhook, booking, calendar event with full details | **passed on staging** (20 Nov) |
| Google Calendar: two calendars, robot account, sharing, staging reads the TEST calendar | **working on staging** |
| Database: both Supabase projects have the same 7 migrations; security advisor shows only the intended "private table, no public policy" notes | OK |
| Automated tests (payments, booking, calendar, languages, guards) | pass |
| Production Netlify variables | Razorpay live keys, `GOOGLE_*`, `SUPABASE_URL`, `GOOGLE_CALENDAR_ENV`, live webhook secret: set. **`SUPABASE_SERVICE_KEY` for Production: missing** |
| Live Razorpay webhook | not created yet (the function does not exist on the live site until the merge) |
| Legal pages | drafts, hidden from Google; lawyer review pending |
| Telugu and Hindi | drafts behind the review gate; will not appear on the live site |

## 2. Before the merge (you)
1. **Netlify, "Stop auto publishing"** (Deploys): on. The merge then builds but waits for your click.
2. **`SUPABASE_SERVICE_KEY` for Production:** in the **antarshanti-prod** Supabase project create a **secret key** (API Keys > Secret keys) and add it in Netlify for the **Production** context only.
3. **Production calendar:** confirm `GOOGLE_CALENDAR_ID` for Production is the **Antarshanti Bookings** ID and that this calendar is shared with the robot (`antarshanti-booking-bot@…`) with "Make changes to events".
4. **GitHub:** protect `main` (require a pull request) if you want that extra gate.
5. Read the English **Privacy, Terms and Refund** pages once (or send to a lawyer). They are hidden from Google and not linked from the site footer until you remove `noindex` and enable the footer links; Razorpay expects them to be public, so plan this soon after launch.

## 3. The go-live sequence
| # | Step | Who |
|---|---|---|
| 1 | Merge `staging` into `main` (Claude can do it when told, as a pull request you approve) | you say go, Claude |
| 2 | Netlify builds the deploy and holds it (auto publishing is off). Open that deploy's **preview link** | you |
| 3 | On the preview link: home page loads, `/.netlify/functions/slots` shows `"mode":"calendar"` and `"calendarName":"Antarshanti Bookings"` (not TEST), the Bach page shows the price | you, Claude reads the output |
| 4 | Razorpay **Live Mode** > Webhooks > add: URL `https://antarshanti.co.in/.netlify/functions/razorpay-webhook`, events `payment.captured`, `order.paid`, `payment.failed`, secret = the live value (ends `vqZg`, stored in Netlify Production) | you |
| 5 | **Publish deploy** in Netlify | you |
| 6 | Live check: pages, sitemap, language switcher absent, check-in saves a row in the **production** database, Jyotish hold creates an event in **Antarshanti Bookings** | Claude (database and calendar) with you on the site |
| 7 | **One real payment test:** in the production database set `services.bach_consultation.amount_inr` to **1**, pay Rs 1 with a real UPI app, check the payment row, booking and calendar event, **refund it in Razorpay**, then set the price back to **1000** | you pay, Claude checks and resets |
| 8 | Delete the test rows and calendar events from production | Claude |

**Rollback:** Netlify > Deploys > pick the last good deploy > **Publish deploy**. No code change needed.

## 4. Right after launch
- Analytics IDs (Meta Pixel, GA4) in `src/assets/site.js` if you want ad tracking.
- Submit the sitemap in Google Search Console.
- Turn on **new-event notifications** for the Antarshanti Bookings calendar (Google Calendar > the calendar's settings > Event notifications > New events) so your phone tells you when a booking arrives.
- Happiness batch dates and registration link (`batches` table or `src/data/site.json`).

## 5. Telugu and Hindi go-live (later, separate)
Review with native readers (`docs/TRANSLATION-REVIEW.md`), fix, then set `te` and `hi` to `true` in `src/_data/i18n/review.json`, redeploy staging, check, then publish the same way.
