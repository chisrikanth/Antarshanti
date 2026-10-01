# Making ad spend convert

## The funnel
Ad → **landing page that matches the ad** → one hand-raise (check-in saved, WhatsApp message, or booking) → you follow up → paid session.

Cold audiences (Instagram/Facebook, YouTube Shorts) are not ready to book. Send them to the **free check-in**:
low commitment, personal, and it ends by pointing to the right path. Send **search-intent** audiences (Google) straight to the matching service page.

## Which ad lands where
| Ad | Landing URL | Conversion to optimise for |
|---|---|---|
| Insta/FB reel on stress, overthinking, low energy | `/checkin?utm_source=instagram&utm_medium=paid&utm_campaign=stress_checkin` | check-in saved (`Lead`) |
| Insta/FB for the dated Happiness batch | `/happiness?utm_source=instagram&utm_medium=paid&utm_campaign=happiness_<month>` | `register_click` (the click through to the Art of Living registration page; sent to Meta as `Lead`) |
| Google Search "bach flower therapist online" | `/bach?utm_source=google&utm_medium=cpc&utm_campaign=bach_search` | `pay_click` / `payment_success` |
| Google Search "vedic astrologer online" | `/jyotish?utm_source=google&utm_medium=cpc&utm_campaign=jyotish_search` | `slot_selected` / WhatsApp click |
| Organic Shorts and bio link | `/checkin?utm_source=youtube&utm_medium=organic&utm_campaign=<short_name>` | check-in saved |

Use one `utm_content` per creative (e.g. `reel_a`, `reel_b`) so you can see which creative converts.

## What is already built in
- UTM tags are remembered for the visit and attached to every WhatsApp message as `[ref: instagram/stress_checkin | bach]`, so you know where each chat came from.
- Check-in responses save the campaign, the landing page and the suggested path in Supabase.
- Events (`whatsapp_click`, `slot_selected`, `pay_click`, `payment_success`, `checkin_started`, `checkin_completed`, `checkin_saved`, `video_play`, `cta_click`) go to Plausible, GA4 and the Meta Pixel once you fill in the IDs at the top of `assets/site.js`.
- Meta mapping: check-in saved = `Lead`, WhatsApp click = `Contact`, payment = `Purchase`.
- GA4 mapping: check-in saved = `generate_lead`, payment = `purchase`.

## Before spending a rupee
1. Fill in the IDs in `assets/site.js` (`metaPixelId`, `ga4Id`, optionally `plausibleDomain`) and redeploy.
2. Run the Supabase setup (`SUPABASE-SETUP.md`).
3. Click through each landing URL on a phone: slots, pay button, WhatsApp, check-in. Confirm the events appear in Meta Events Manager / GA4 Realtime.
4. Put a real date, fee and seats into `assets/batches.js` before running a Happiness ad. An ad that lands on "announced soon" wastes money.

## Spend rules that protect ROI
- Start small: one audience, two creatives, one landing page per campaign. Run for 7 days before judging.
- Judge on **cost per lead** early (check-ins saved, WhatsApp chats), and on **cost per paying client** once you have 10+ leads. Update `status` and `revenue_inr` in Supabase, then read `campaign_scoreboard`.
- Pause any campaign that has spent about 3x your session value without a single lead. Move that budget to the best campaign.
- Reply to every lead within a few hours. Speed of reply moves conversion more than ad tweaks.
- Never run ads that promise cures or outcomes. The pages deliberately use "may help" language, and ad copy must match.
- Keep Jyotish donation-based. Use it as the trust-builder and let Bach and the Happiness Program carry the paid conversion.

## Happiness Program is measured differently
Registration and the donation happen on the Art of Living site (`aolt.in/...`), and the program is voluntary service. There is no revenue to count here, and the site cannot see who completes registration.
- Success metric: **cost per registration click**, then ask the Art of Living coordinator how many people registered for that batch, to get the real cost per registration.
- Only paid sessions (Bach, and any Jyotish contribution you choose to log) go into `revenue_inr`.
