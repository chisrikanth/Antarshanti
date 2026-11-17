# Notes for Srikanth: things only you can do

Living list. Newest items are added at the top of each section; tick items off by changing `[ ]` to `[x]`.
Last updated: 17 Nov 2026.

## Check-in wording to approve
- The helpline shown to someone in distress is now **only Tele-MANAS (14416)** with its official website `telemanas.mohfw.gov.in` (found via a secondary source; please click it once to confirm), plus "call 112 if in immediate danger". KIRAN and Vandrevala were removed at your request.
- "Talk to Srikanth on WhatsApp" is at the top of every check-in screen and again at the bottom of the results.
- Results say: keep gently watching how you feel; see a qualified doctor or counsellor if it stays heavy; Sudarshan Kriya is mentioned only as something many people enjoy to unwind. No program is pitched to someone whose answers raised the safety flag.

## Do these first (only you can)
- [ ] **Create Razorpay TEST keys** (Razorpay dashboard → switch to *Test Mode* → Account & Settings → API Keys → Generate Test Key). You get a Key ID `rzp_test_...` and a secret.
- [ ] **Add 4 variables in Netlify, with a different value per deploy context** (Environment variables → Add a variable → *Different value for each deploy context*). The exact table is in `docs/RELEASE-PROCESS.md`:
  - `SUPABASE_URL`: production `https://kntohzyxzoucymrmriva.supabase.co`; previews and branch deploys `https://rnofqxmfwqiogtlchkbp.supabase.co`.
  - `SUPABASE_SERVICE_KEY`: the **service_role** key of each project (Supabase → project → Project Settings → API Keys). I cannot see these and they never go in the repo.
  - `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`: live for Production, test for previews and branch deploys.
  - `RAZORPAY_WEBHOOK_SECRET`: a long random text you choose; add the webhook in Razorpay (live and test mode) as described in `docs/PAYMENTS-AND-PRICES.md`.
  A mistake here cannot move real money or write to the wrong database: the server refuses and shows an error.
- [ ] **Open the Netlify preview** of this branch and click through every page on your phone, then tell me what to change.
- [ ] **Send the Happiness registration link** whenever you have it (I will add the batch).
- [ ] **Review the draft Privacy, Terms and Refund pages** (`docs/policy-decisions.md`); they stay hidden from Google until you approve.

## Supabase project (created 17 Nov 2026)
- Two projects, both Mumbai, both Free: `antarshanti-prod` (real data, antarshanti.co.in) and `antarshanti-test` (sample data, all test addresses). Process: `docs/DATABASE-CHANGES.md`.
- Production: name `antarshanti-prod`, region Mumbai (ap-south-1, nearest to Hyderabad; Supabase has no Hyderabad region). Free plan.
- Tables: `checkin_responses` (private, server only), `batches`, `testimonials`, `site_settings` (public read-only for live items). Security advisor: clean (the one INFO note is intentional).
- Free projects pause after 7 days of no activity. A keep-alive job and a backup export are still to be added.
- The website reads dates and testimonials from this project first, then falls back to `data/site.json`.

## Next Happiness batch dates (suggestions, not yet on the site)
Your last batches ran Thu to Sun evenings (1–4 Oct, 22–25 Oct), about three weeks apart. Same pattern would give:
- Thu 3 – Sun 6 Dec 2026
- Thu 24 – Sun 27 Dec 2026 (holiday week, people have time; or skip if you travel)
- Thu 14 – Sun 17 Jan 2027
Pick what suits you, get the Art of Living registration link for each, then add it to `data/site.json` (copy the `_batch_example`). It disappears by itself after its `end` date.

## Changing dates and links without touching code
- Everything that changes (batches, registration links, announcement bar, WhatsApp number, testimonials) lives in `data/site.json`. Edit it on GitHub (open the file, pencil icon, commit); Netlify republishes in about a minute.
- For zero deploys, apply `supabase/site_content.sql` and fill `AS_SUPABASE` in `assets/content.js`; then you edit rows in Supabase's Table Editor and the site updates on next load. Falls back to `data/site.json` if Supabase is unreachable.

## Before any ad money is spent
- [ ] **Preview the site** on a real phone (see "How to preview" below).
- [ ] **Confirm the Happiness batch** in `assets/batches.js`: Thu 22 – Sun 25 Oct 2026, evening, online (Zoom), registration `https://aolt.in/1061195`.
  - The time shown is 6:00–8:30 PM IST, copied from the 1–4 Oct flyer. Confirm it for the 22–25 Oct batch.
  - The link came from the 1–4 Oct flyer. Open it and confirm it registers people for the **22–25 Oct** batch, not the earlier one.
  - Add seats and language if you want them shown.
- [ ] **Add tracking IDs** at the top of `assets/site.js`: `metaPixelId`, `ga4Id`, optionally `plausibleDomain`. Nothing is tracked until you do.
- [ ] **Run the Supabase setup**: `SUPABASE-SETUP.md`. It takes about 15 minutes.
- [ ] **Watch every video** (Happiness 3, Bach 3, Jyotish 2). They were picked by title only. Delete a `data-yt` line to remove one.
- [ ] Decide the Jyotish **confirmation window**. The site now says "within 24 hours" everywhere.
- [ ] Replace the placeholder portrait crop if you have a better, high-resolution photo (`assets/srikanth.webp`).

## Testimonials (none collected yet)
Nothing is shown to visitors until you add real ones. The three older Happiness testimonials were removed because they were not collected from named people.
What the site does now: Happiness links to the Art of Living page. Bach, Jyotish and home stay hidden until filled.

**Suggested way to collect them**
1. After each session or batch, 2–3 days later, send a WhatsApp note: *"Namaste, I hope the session is still helping. If it did help, would you share one or two lines in your own words? May I show it on my website with your first name and city? Totally fine to say no."*
2. Ask one easy question instead of "a testimonial": *"What was different for you after the session?"* People answer that more honestly.
3. Keep the screenshot of the reply as proof of consent. Save it in a folder.
4. Use first name, role and city only. Never use a full name or phone number.
5. Never edit the meaning. Light typo fixes are fine. Never invent or merge quotes.
6. For people in distress, do not ask for a testimonial while they are going through it.
7. Good moments to ask: end of the 4-day Happiness batch (ask the group on the last day), 2 weeks after a Bach consultation, after a Jyotish "that was accurate" message.
8. Add them to `assets/testimonials.js` (one entry each, the format is explained in the file). The right section appears automatically.
9. Aim for 3 per service to start. Even 1–2 real ones beat none.

**Using quotes from other sites.** Quotes on the Art of Living site belong to the participants and Art of Living. Show them only with permission, name the source, and do not present them as your own clients. I could not fetch the site, so no quotes were copied. If you get permission, paste the exact text and I will add it with the source line.

## FeelBetter profile learnings (pending)
- [ ] I cannot open your FeelBetter profile from my environment (the site is blocked for me). Paste its text here, or save the page as PDF into the repo, and I will carry over what works: bio wording, credentials, session description, FAQs, reviews (only your own, with their permission).
- [ ] Bach booking runs on Razorpay only; no FeelBetter link remains on the site.

## Content only you can supply
- [ ] A real number of sessions or years, only if true (hero proof line).
- [ ] A 45–60 second video of you for each service, ending with the check-in link. Better than third-party clips.
- [ ] Google Business Profile for Hyderabad (online services), and ask past clients for reviews.
- [ ] A weekly WhatsApp broadcast note (idea, next batch date, open slots).
- [ ] A QR code to `/checkin` on Happiness Program materials.

## After the first two weeks of ads
- [ ] In Supabase, update `status` and `revenue_inr` on leads; read `campaign_scoreboard`.
- [ ] Ask the Art of Living coordinator how many people registered through your link.
- [ ] Keep only the campaigns that produce WhatsApp chats or registrations.

## How to preview
1. **Netlify branch deploy** (best, because payments and the check-in save work): Netlify → your site → Site configuration → Build & deploy → Branches and deploy previews → set **Branch deploys** to include `claude/stoic-cori-xrotsf`. Netlify builds it; open **Deploys** to find its address (it looks like `claude-stoic-cori-xrotsf--yoursite.netlify.app`). Do not go live yet.
2. **Pull request preview:** if you ask me to open a pull request, Netlify can build a preview from it automatically.
3. **On your computer:** clone the repo, check out the branch, run `npx http-server -p 8080`, open `http://localhost:8080`. Pages and the check-in questions work; saving to Supabase and payments need a Netlify deploy.
4. Test on a real phone for the sticky bar and the "Open my UPI app" button.
