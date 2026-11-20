# Antarshanti Website: Handoff Plan and Learnings (v3)

Status: DRAFT for approval. Nothing has been built, published or changed.
Last updated: 30 Oct 2026
Purpose: self-contained handoff. Copy this file into the project that holds your GitHub repo and continue there.

Contents
1. Decisions
2. Starter prompt for the next project
3. What the AI site builders do, and how we replicate it
4. Connectors and tools
5. Cost and free-plan limits
6. Current site: observations and correctness check
7. Target flow
8. Database design (Supabase, RLS)
9. Testing
10. Languages (English, Telugu, Hindi)
11. Free low-entry offers
12. Payments
13. Compliance notes
14. Phases and approval gates
15. Open questions
16. Sources and confidence

---

## 1. Decisions (as stated by Srikanth)

| Area | Decision |
|---|---|
| Site | antarshanti.co.in. Already live on Netlify. Domain managed on Netlify. |
| Source code | GitHub repo chisrikanth/Antarshanti (public). Framework and deploy method not yet reviewed. |
| Builder | No Webflow or other site-builder subscription. Claude improves the existing site as code. Webflow and the AI builders are used only as sources of flow and structure ideas. |
| Backend | Supabase Free plan. Pro not needed to start. Row-level security (RLS) on every table from the first migration. **Status: not created yet.** The Supabase project must be created and integrated with the site (Phase 3). |
| Payments | Online for most clients (Razorpay, already set up per earlier notes). Offline option: client connects on WhatsApp, then pays. Happiness Program: the site is only a landing page that hands off to the Art of Living payment link. |
| Art of Living name | Srikanth is an Art of Living teacher and directs registrations to the Art of Living payment link. He considers the name usable on this basis. |
| Languages | English, Telugu, Hindi. Switch on the site, and a suggestion based on the visitor's phone language. |
| Free offer | No free intro session for now. Claude suggests a low-entry alternative (section 11). |
| Newsletter | Parked for later. |
| Identity | Use "Srikanth" only on the public site. Keep corporate and practice identities separate. Never name the employer. The generic line "20+ years in corporate technology" is fine and stays. |
| Cost | Minimise new spend. Maximise what the Claude plan and connectors can do. |
| Approvals | Each phase needs Srikanth's approval. Nothing is published, and no database change is made, without sign-off. |

Domain: antarshanti.co.in (confirmed by Srikanth).

---

## 2. Starter prompt for the next project

Paste this into the project with the GitHub repo:

> I run antarshanti.co.in (Jyotish, Bach Flower therapy, Art of Living Happiness Program), hosted on Netlify with the domain on Netlify. The source is in my GitHub repo chisrikanth/Antarshanti. Read the attached handoff plan. Do Phase 1 only: audit the live site and the repo, and give me a ranked fix list. Do not change the repo, Netlify or Supabase until I approve each phase. The Supabase project does not exist yet: it must be created and integrated in Phase 3. Constraints: no new paid tools; Supabase Free with RLS on every table; English, Telugu, Hindi; Razorpay online payments with a WhatsApp offline option; Happiness Program hands off to the Art of Living payment link; use only "Srikanth" on the public site.

---

## 3. What the AI site builders do, and how we replicate it

General knowledge, not verified on each product's live site this session.

The builders (Lovable, Bolt, Emergent, Replit Agent, v0, Webflow AI and similar) mostly orchestrate a loop: prompt, generate code or layout, live preview, connect a backend, deploy. The language model does the generation. The rest is templates, preview, hosting and integrations.

| Builder feature | Our equivalent at near-zero cost |
|---|---|
| Prompt to full site | Claude writes and edits the code in the existing repo |
| Live preview | Netlify deploy previews (free, one per branch or pull request) |
| One-click database (Lovable and Supabase) | Supabase Free plus SQL migrations written by Claude, applied through the Supabase connector |
| Git sync | GitHub repo already exists |
| One-click deploy | Netlify, already connected to the domain |
| Built-in auth | Supabase Auth for the admin area only |
| Design templates | Section patterns borrowed from Webflow-style pages: hero, three paths, how it works, proof, FAQ, one clear call to action |
| Analytics and heatmaps | GA4 and Microsoft Clarity (free) |
| Testing | Not offered well by most builders. We add Vitest, pgTAP, Playwright, axe and Lighthouse, run in GitHub Actions |

Takeaway: paying a builder mainly buys convenience. With a GitHub repo and Netlify in place, and a Supabase project to be created in Phase 3, Claude plus the connectors covers the same loop.

Conversion patterns to apply: one primary action per page, repeated after each section; WhatsApp button on every page; short forms with a consent tick; clear price, duration and what happens in a session; real testimonials with consent (initials only); FAQ; mobile first.

---

## 4. Connectors and tools

Connector status in Srikanth's Claude account as of this session:
- Connected: Gmail, Google Drive, Expedia, lastminute.com.
- Set up but incomplete: Fireflies, TomTom Maps.
- Added later in this session: Netlify and Supabase (their tools are now available to Claude).
- Available in the directory, not connected: Webflow, Lovable, Figma, Canva, Vercel, Render, Railway, Cloudflare, Theysaid (AI usability tests), Magic Patterns, Wonder, Softr, Floot, Metabase, Chatbase, ElevenLabs and others.

Recommended to connect (keep approval prompts on):
1. Netlify: deploy and manage sites, secrets, access controls, aggregate form submissions. Needs sign-in. Connector URL: https://netlify-mcp.netlify.app/mcp. A third-party page did not confirm functions or domain management, so check Netlify's docs.
2. Supabase: manage databases, auth and storage (list projects, create a project, run SQL and migrations, security advisors, edge functions). Connected. The account has an organisation named Antarshanti and no projects yet.
3. Razorpay (in the directory, not connected): dashboard assistant that looks up payments, orders and payment links. Useful for testing the booking flow and reconciling payments. Needs your Razorpay login. It does not replace the payment code on the site.
4. Optional later: Figma for mockups; Theysaid for AI usability tests on the live site; OpenSEO for SEO audits and rank tracking (check its pricing first).

GitHub: no GitHub connector turned up in the directory search. The repo chisrikanth/Antarshanti can instead be attached to a Claude Code session in the project where you continue (the session can read it and, with your approval, push to it). Claude also has GitHub command-line access in its workspace.

Webflow connector (reference, since Webflow is not being bought):
- It is a connector inside the Claude app (Webflow MCP server, https://mcp.webflow.com/mcp), not a separate app.
- Who can connect: Workspace owner, admin or Site manager. Reviewers cannot.
- Claude asks for approval before each action by default. Settings: Claude, Customize, Connectors, Webflow.
- Can: read and update CMS, create pages, audit for broken links, missing alt text and meta descriptions, publish. Design changes need the Webflow MCP Bridge App open in the Designer.
- Cannot: create or edit Interactions (animations), change site access or roles, create new localized CMS items. One authorization covers one workspace.

Free engineering tools: GitHub Actions, Vitest, pgTAP, Playwright, axe, Lighthouse, GA4, Microsoft Clarity.

Environment limits to remember: the Claude workspace can usually reach only package registries and GitHub. Playwright and Lighthouse against the live site may be blocked from there. Plan to run them in GitHub Actions against Netlify deploy previews, or on Srikanth's computer.

---

## 5. Cost and free-plan limits

Prices change. Confirm on each vendor's pricing page before relying on any figure.

Netlify Free (third-party summary dated July 2026):
- 300 credits per month. A production deploy costs 15 credits. Bandwidth is 20 credits per GB (about 15 GB if all credits went to bandwidth). Web requests cost 2 credits per 10,000. Deploy previews and branch deploys are free. Form submissions are free and unlimited on credit plans.
- When credits run out, all sites on the team pause until the next cycle. Watch the credits meter.
- Accounts created before 4 Sep 2025 may be on a legacy plan (reported 100 GB bandwidth and 300 build minutes). Check which one applies.

Supabase Free (status: no project exists yet; the Antarshanti organisation is empty):
- 2 active projects, 500 MB database, 1 GB file storage, 5 GB egress, 50,000 monthly active users, 500,000 Edge Function calls per month.
- Projects pause after 7 days of inactivity. Fix: scheduled keep-alive request every few days (GitHub Actions or a Netlify scheduled function).
- No daily backups on Free. Fix: scheduled export of bookings and leads to a private location.
- Pro is about $25 per organization per month plus usage, with 8 GB database, no pausing and backups. Upgrade only if traffic or uptime needs grow.

Webflow (not being purchased; kept for reference):
- Free Starter: 2 static pages, webflow.io address, limited CMS, Webflow branding, no custom domain. Good for prototyping only.
- Paid site plans reported at roughly $14 to $23 per month (entry and CMS) and $39 (Business), billed yearly. Sources disagree and a May 2026 update reportedly merged plans into a Premium tier.
- Code export and publishing to a custom domain need a paid plan.

Claude: included in Srikanth's existing plan. Usage limits depend on the plan. See support.claude.com.

Expected extra monthly cost: none beyond the domain renewal and Razorpay per-transaction fees, as long as Netlify and Supabase stay within free limits.

---

## 6. Current site: observations and correctness check

- Four pages: Home, Jyotish, Bach Flower, Happiness Program. Home has WhatsApp and Instagram links.
- Home offers three paths with a call to action each. Main button: "Book Jyotish Reading", which goes to a booking widget on the Jyotish page. Also "Bach Flower Therapy", "Register for Happiness Program" and WhatsApp.
- Hours shown: online consultations every day of the week (weekday slots in the mornings and 5 to 9 PM evenings, weekends 9 AM to 9 PM; changed 20 Nov 2026). Location shown: Hyderabad.
- About section says 20+ years in corporate technology with a large multinational. Srikanth confirmed it stays: it describes who he is and names no employer. Keep it generic. Never add the employer name, job title or LinkedIn link. Worth checking your employment terms for any rule on disclosing outside business activity (not legal advice).
- Disclaimer present: complementary services, not a replacement for medical, psychological, legal or financial advice.
- Privacy line: personal details kept confidential and stored with consent. Needs a real consent step on every form.
- Copy to review: Bach Flower text mentions "anxiety, grief, fear and self-doubt" and "Gentle, safe, no side effects."

Phase 1 audit list: copy and claims, mobile layout, speed, forms and booking widget (custom or third party, does it take payment), consent handling, analytics, SEO (titles, descriptions, alt text, local keywords), accessibility, policy pages (terms, privacy, refund).

### Correctness check of all four pages (30 Oct 2026, read-only)

Method: text fetch of Home, Jyotish, Bach Flower and Happiness Program. Booking widgets are loaded by script, so their contents (slots, fields) may simply not have shown up in the fetch. Items marked "verify" need a check in a real browser or the repo. Visible "meta-viewport" text and some empty-looking sections are probably fetch artifacts, not site bugs.

Priority 1: claims that conflict with the site's own disclaimer (rewrite in Phase 2)
- Bach Flower: "No side effects, no drug interactions, safe for children, pregnant women and the elderly", "Yes, completely" (to "is it safe"), "without side effects, without dependency", "Some people feel a shift within days", "work gently on the emotional roots of stress, fear, grief and self-doubt", anxiety listed as a condition, "Nature's pharmacy for the emotional self".
- Happiness Program: "significantly reduces cortisol, anxiety and depression", "the most researched breathing technique in the world", "over 450 million people in 180 countries", "sharpens focus instantly", "clears stress", "peer-reviewed research" with no references.
- Jyotish: "5,000-year-old science", reveals "health, and timing of major events" while also saying it is "not about prediction".
- Safer pattern: describe what happens in the session and what people report, use "may support" wording, cite sources or remove the number, and keep the complementary-wellness disclaimer visible near each booking button.

Priority 2: missing trust and legal basics
- No privacy policy, terms or refund and cancellation page on any page. Razorpay and the data-protection rules both expect them.
- The footer says details are "stored with your consent" but no consent checkbox or consent step was visible. Verify in a browser.

Priority 3: payment and booking consistency
- Jyotish shows no fixed fee and a voluntary contribution via a PhonePe QR, yet the widget says "Book & pay securely" with UPI, cards and netbanking. Decide one model.
- Bach Flower is Rs 1,000 per consultation with remedy bottles billed separately, booked on this site and paid online through Razorpay (the old third-party widget has been removed).
- Confirmation time is stated three ways on the Jyotish page: "instantly", "within 2 hours", "within 24 hrs".
- "Open my UPI app" link on the Jyotish page points to "#". Fix or remove.
- Birth details are collected over WhatsApp, not on the site. Fine, but tell people what is collected and why.

Priority 4: Happiness Program page
- It has no dates or fees. Register buttons go to an on-page anchor, WhatsApp, or the Art of Living course search. Per your plan, the main Register button should go to the Art of Living payment link.
- Add one clear line that you are an Art of Living teacher, with a link to the official page, so visitors know the program is authentic.

Priority 5: housekeeping
- Page title repeats the brand: "Antarshanti Healing — Antarshanti".
- Possible double spaces in headlines ("Heal what words  cannot reach", "settle for  happy-ish"). Verify.
- "What is SKY?" button links to "#what-is"; the target was not found. Verify.
- Duplicate headings "What is Sudarshan Kriya?" and "What is Sudarshan Kriya (SKY)?".
- "Online & in-person" in one place, "online and in Hyderabad" in another. Make consistent.
- "Find a batch ... searchable by city" has no visible city filter.
- Missing space in "Jyotish ConsultationOne".

Good as is: clear three-path structure, WhatsApp on every page, Mon/Wed/Fri/Sat hours, disclaimer present, Instagram link, consistent phone number and WhatsApp link.

---

## 7. Target flow

Visitor journey:
1. Land on Home. Language suggested from phone settings, easy to switch.
2. Pick a path: Jyotish, Bach Flower or Happiness Program.
3. See what happens in a session, price, duration, FAQ.
4. One action:
   - Jyotish or Bach Flower: choose a slot, fill a short form with consent, pay online. Or tap WhatsApp, talk first, pay afterwards.
   - Happiness Program: tap Register and go to the Art of Living payment page.
5. Confirmation on screen and by WhatsApp or email.

Technical flow:
- Netlify serves the pages and runs small server functions for anything private.
- The browser never holds secret keys. Booking and payment steps call Netlify Functions, which call Supabase (server-side key) and Razorpay.
- A Razorpay webhook (Netlify Function) confirms payment and marks the booking paid.
- Public pages read only what RLS allows: active services, open slots, approved testimonials.

---

## 8. Database design (Supabase, RLS on every table)

Current state (checked 30 Oct 2026): the Supabase organisation "Antarshanti" exists and has zero projects. Nothing is created or integrated yet. The steps below are all still to do, each after approval.

Create and integrate (Phase 3):
1. Confirm cost is $0 (Free plan) before creating anything. Create one project in the Antarshanti organisation (suggested name: antarshanti-prod; nearest region to Hyderabad, Mumbai if offered). One more free project slot stays available for a separate test project.
2. Write the schema as migration files in the GitHub repo and apply them with the Supabase connector. RLS is enabled in the same migration that creates each table.
3. Run the Supabase security advisors and the pgTAP tests. Fix every warning before moving on.
4. Collect the project URL and publishable (anon) key. The publishable key may be used in the site code because RLS protects the data.
5. Store the secret service key only in Netlify environment variables, never in the repo or browser code. Use the Netlify connector or dashboard to set it, with approval.
6. Build Netlify Functions for bookings, consent log, leads and the Razorpay webhook. They call Supabase with the secret key.
7. Generate TypeScript types from the schema if the site uses TypeScript.
8. Add the keep-alive job and the scheduled backup export (section 5).
9. Test on a Netlify deploy preview with Razorpay in test mode before connecting anything to the live site.

| Table | Purpose | Public read | Write |
|---|---|---|---|
| services | Offerings, price, duration, language, active flag | Active rows only | Admin |
| availability | Open slots | Unbooked only | Admin |
| bookings | Name, contact, service, slot, status, payment reference, language | None | Server function only |
| leads | Free-offer sign-ups (name, WhatsApp, optional birth details, consent flag, source) | None | Insert with consent true |
| consent_log | What was agreed, when, which text version | None | Server function only |
| testimonials | Approved reviews with consent on file | Approved only | Admin |

Rules:
- Enable RLS at table creation. A migration that creates a table without RLS must fail the tests.
- Do not store health details. Store only what is needed.
- The Supabase service key lives only in Netlify environment variables.
- Admin sign-in through Supabase Auth with a role check.
- Scheduled jobs: keep-alive and backup export.

---

## 9. Testing (free, automatic on every change)

| Level | Tool | Covers |
|---|---|---|
| Unit | Vitest | Slot availability, pricing, language selection |
| Database | pgTAP | Every table has RLS; anonymous users cannot read bookings or leads; public sees only active, open or approved rows |
| End to end | Playwright | Language switch, book and pay (Razorpay test mode), WhatsApp link, Happiness Program redirect, consent required |
| Accessibility | axe | Contrast, labels, alt text |
| Performance | Lighthouse | Mobile speed and layout |
| Usability | Theysaid (optional) | AI-run task tests on the live site |
| Regression | GitHub Actions | All of the above on every pull request, against the Netlify deploy preview before going live |

---

## 10. Languages (English, Telugu, Hindi)

- Use separate language paths (for example /te and /hi) rather than a script that swaps text. Better for search engines and sharing. Add hreflang tags.
- Suggest, do not force: if the phone's language is Telugu or Hindi, show a small dismissible banner. Remember the visitor's choice. Netlify redirect rules or an edge function can read the browser language.
- Claude drafts translations. A native reader reviews them, especially Jyotish and Bach Flower terms.
- Use proper Telugu and Devanagari web fonts. Test on low-cost Android phones.

---

## 11. Free low-entry offers (choose one or two)

1. Free Moon sign and Nakshatra mini-reading. Visitor gives birth details and consent, receives a short summary by WhatsApp or email, then an invitation to book a full reading. Best lead source.
2. Free 5-minute guided breathing session (audio or video). Gentle first taste of the Art of Living approach, leads to the Happiness Program.
3. "Which path is right for me?" six-question check-in. Suggests a path. Must not diagnose or recommend specific remedies.
4. Monthly free online group meditation.

Suggestion: start with 1 and 2. Collect only name, WhatsApp number, birth details if needed, and an explicit consent tick. Keep wording non-medical.

---

## 12. Payments

- Online path: Razorpay on the site. Use test mode until the full flow is tested.
- Offline path: WhatsApp conversation first, payment afterwards. Staff-side step: admin marks the booking paid.
- Happiness Program: no payment on the site. Register button goes to the Art of Living payment link. Track clicks with analytics.
- Razorpay generally expects published terms, privacy and refund pages. Confirm current requirements with Razorpay.

---

## 13. Compliance notes (not legal advice)

- Describe services as complementary. Avoid claims such as "cures", "treats", "no side effects" or condition-specific promises. Indian advertising rules (ASCI) restrict health claims. Review the Bach Flower copy first.
- Personal data (names, phone numbers, birth details) is covered by India's Digital Personal Data Protection Act. Collect only what is needed, record consent, give a way to withdraw and delete. Verify current rules.
- Keep health information out of the public database. If intake needs health context, handle it outside the website database, with consent.
- Testimonials need written consent. Show initials only.
- Art of Living content: Srikanth has stated he can use the name because registrations go to the Art of Living payment link. Consider checking Art of Living's own guidance for teacher landing pages.

---

## 14. Phases and approval gates

| Phase | Work | Output |
|---|---|---|
| 0 | Approve this plan. Netlify and Supabase connectors are connected; connect Razorpay. Attach the repo to the session. | Go-ahead |
| 1 | Detailed audit of the live site and repo (section 6 list) | Ranked fix list |
| 2 | Site map, conversion copy in English, chosen free offer, FAQ, policy pages | Content document |
| 3 | Create the Supabase project (does not exist yet) and integrate it with Netlify; schema, RLS, tests, keep-alive and backup jobs (steps in section 8) | Project created, passing database tests |
| 4 | Improve the site: sections, booking flow, Razorpay, language paths | Netlify deploy preview |
| 5 | Telugu and Hindi translations and review | Reviewed content |
| 6 | Full automated test run, then publish to antarshanti.co.in | Live site |
| 7 | Monthly review of visits, bookings, drop-off points | Improvements |

Rule: Claude proposes, Srikanth approves, then Claude acts.

---

## 15. Open questions

1. Repo is chisrikanth/Antarshanti (public). Still needed: branch, framework (plain HTML, React, other), and how Netlify deploys it (Git push or manual).
2. Booking widget on the Jyotish page: custom or third party? Does it take payment today? Where are bookings stored?
3. Netlify account: created before or after 4 Sep 2025? Which plan?
4. Razorpay: live or test mode? Are terms, privacy and refund pages published?
5. Which free offer from section 11?
6. Who reviews Telugu and Hindi text?
7. (Resolved) Bach Flower bookings and payments are handled on this site through Razorpay; no third-party booking widget is used.
8. Jyotish pricing: the page says no fixed fee (voluntary contribution via PhonePe QR) but the widget says "Book & pay securely". Which model do you want?

---

## 16. Sources and confidence

Verified this session:
- Live content of antarshanti.co.in: Home, Jyotish, Bach Flower and Happiness Program pages (text fetch, 30 Oct 2026; scripted widgets not inspected).
- GitHub repo chisrikanth/Antarshanti exists (public, last push 1 Oct 2026). Contents not yet reviewed.
- Netlify and Supabase connectors are connected. Supabase organisation "Antarshanti" exists with zero projects.
- Connector status in Srikanth's account.

From third-party pages (confirm on vendor sites before spending):
- Netlify free plan limits: https://netli.fyi/blog/netlify-free-plan-limits-2026
- Netlify MCP connector: https://skillsplayground.com/connectors/netlify/
- Supabase free tier and pricing: https://www.jetadmin.io/blog/supabase-pricing-2026-guide-to-plans-limits-and-real-world-costs/
- Webflow pricing: https://www.flowninja.com/blog/webflow-pricing-demystified and https://www.appsrow.com/post/webflow-pricing-2026-complete-guide-to-plans-costs-and-comparisons
- Webflow MCP and Claude connector: https://developers.webflow.com/mcp/installing/claude-desktop and https://help.webflow.com/hc/en-us/articles/52637346869779-Connect-Claude-to-Webflow

General knowledge, not verified this session: how AI site builders work (section 3), Razorpay page requirements, ASCI and DPDP Act details (section 13).
