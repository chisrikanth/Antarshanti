# Antarshanti: setup brief for Google Gemini

**What this is:** a set of ready-to-paste prompts that ask Gemini (signed in to your Google account) to set up Google Calendar for the Antarshanti website, then walk through the Google Cloud, Netlify and Razorpay steps around it. Written 20 Nov 2026.

**What it contains**

| # | Prompt | Why it exists |
|---|---|---|
| 0 | **Shared context** (paste first, once) | Gives Gemini the whole picture so it can think for itself instead of following steps blindly |
| 1 | **Decide the structure, then create the calendars** | Gemini works out: one Google account or two, one calendar or several |
| 2 | **Add your availability** (the "Open" events), plus **2b: extend weekday evenings to 9 PM** | This is how you control which times the website offers |
| 3 | **Google Cloud: the robot account and the sharing** | The website needs a "service account" to read and write only these calendars |
| 4 | **Netlify settings and the live test** | Puts the details into the website's settings and proves it works on the staging site |
| 5 | **Razorpay (test mode) checks** | Needed before the Bach Flower payment flow can be tested |
| 6 | **Final audit and report back** | Gemini double-checks everything and gives you a report to paste to Claude |

---

## Read this first (for you, Srikanth)

### 1. What Gemini can and cannot do
Gemini's connection to your Google account usually lets it **read and create calendar events**. Creating a Google Cloud project, a service account, and changing Netlify or Razorpay settings needs a **browser** (Gemini in Chrome, or an "agent" mode that can click on pages for you). **Gemini can differ by account and by day, so the prompts tell it to say honestly what it can and cannot do**, to do what it can, and to hand you a short checklist for the rest. If it claims it did something, the audit prompt (#6) makes it prove it by reading the result back.

### 2. What Claude has already done (so Gemini must not redo it)
On 20 Nov 2026 Claude changed these Netlify environment variables, using the Netlify connection that is available in Claude Code. They contain no secrets.

| Variable | Production | Staging and previews (branch deploys and deploy previews) |
|---|---|---|
| `GOOGLE_CALENDAR_ENV` (safety label) | `production` | `test` |
| `SUPABASE_URL` (which database) | the **production** database | the **test** database |

These were already present before: `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`, both holding the **live** keys and applying to **all** contexts. The website refuses to use a live key on a staging address, so nothing is at risk, but staging payments cannot work until test keys are added for the staging contexts (prompt 5 and prompt 4).

### 3. What only you can do
- Sign in, enter 2-step verification codes, solve CAPTCHAs.
- Copy secret values (the Google key file, the Supabase **service_role** key, Razorpay secrets) into Netlify. Gemini and Claude should never be given these in chat.
- Click "yes" on anything that changes money, accounts or ownership.
- Merge `staging` into `main` (publishing to antarshanti.co.in). Nothing in this brief does that.

### 4. Two things worth knowing before you start
- **The Razorpay live secret is stored in Netlify as a normal variable and showed up in Claude's tool output while preparing this brief.** It is visible to anyone who can open your Netlify settings or use a connected tool. Two cheap steps: (a) mark `RAZORPAY_KEY_SECRET` as **"Contains secret values"** in Netlify; (b) optionally regenerate the live key in Razorpay and update Netlify. Tell Claude if you want to do (b); it needs a quiet moment because live payments stop for a minute while the new key goes in.
- Claude could not change Netlify's "Stop auto publishing" or GitHub's branch protection from here. Both are listed in prompt 4 as optional protection for your live site.

### 5. How to use the prompts
1. Open Gemini in a **new chat**. Paste **Prompt 0**, send it, and let it answer.
2. Paste **Prompt 1**, then 2, 3 and so on, one at a time, in the same chat, waiting for each to finish. Skip a prompt if the answer is "already done".
3. At the end paste **Prompt 6**. Copy its report and paste it to Claude (in this project). Claude will fix anything that does not work.
4. If Gemini asks you something that is not covered, answer it or tell it to decide.

---

## Where things stand (checked in Netlify on 21 Nov 2026, names and contexts only)

| Item | State |
|---|---|
| Prompts 0 to 2 (context, calendars, Open events) | done by you with Gemini (cannot be verified from Claude's side: it has no access to your Google account) |
| `GOOGLE_CLIENT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_CALENDAR_ID` | **present** in Production, Branch deploys and Deploy Previews, flagged secret. The values are hidden, so it cannot be seen whether the Production and TEST calendar IDs are different. Please confirm that they are |
| `GOOGLE_CALENDAR_ENV` | production / test / test (correct) |
| `SUPABASE_URL` | production / test / test (correct, now flagged secret; fine) |
| `SUPABASE_SERVICE_KEY` | **missing** (without it the booking database is not used and saved check-ins and bookings fail) |
| `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` | now secret-flagged and listed per context, but the staging contexts still end in the same characters as the **live** key: **test keys not yet added**, so staging payments are refused by the safety lock |
| `RAZORPAY_WEBHOOK_SECRET` | **missing** |
| Staging redeployed after the new variables? | pushing the 9 PM schedule change to the `staging` branch on 21 Nov triggers a fresh staging deploy |
| Calendar actually shared with the robot (Prompt 3)? | **not yet checked**; the way to find out is the slots check below |

**The one-minute test.** Open this in your browser (Claude cannot reach netlify.app from here):
`https://staging--aquamarine-croquembouche-26e205.netlify.app/.netlify/functions/slots`
- Text containing `"mode":"calendar"` and a `days` list = the calendar works.
- `"mode":"weekly"` = something is missing or wrong; paste what you see to Claude, or use the troubleshooting list in Prompt 4.

---

## How the website reads the calendar: by title, or by Free/Busy?

**Both matter, in two different ways.** This is exactly what the code does:

| What the website looks at | What it decides |
|---|---|
| **The title**: starts with the word **Open** or **Available** (capital or small letters, nothing in front of it, so no emoji or symbol before it) | "This is a window when I take sessions." Slots are offered inside it. |
| **Any other title** (Busy, Travel, Doctor, a booking, anything) | "I am not available." It blocks the slots it overlaps. |
| **The Show-as setting: Busy or Free** | Whether the event counts at all. **Free** events are ignored completely, whatever their title. So an Open event must be **Busy** (the default in Google Calendar). A blocker must also be **Busy** to block. |
| **All-day or timed** | A timed Open event is a window. An all-day Open event is ignored (it has no hours). Any other all-day event blocks the whole day (India time). |
| **Cancelled / declined** | Ignored. |

So: **title says what it is (Open window or a blocker); Busy/Free says whether it counts.** The colour, the description and the guests do not matter. The website itself writes booking events as Busy, titled "Jyotish: Name (requested)" or "Bach Flower consultation (paid)".

---

## Prompt 0: shared context (paste this first)

```text
You are helping me, Srikanth, set up the calendar and payment plumbing for my small business website. Please read the whole message before doing anything, and treat it as background you must understand and question, not as a script.

WHO I AM AND WHAT THE BUSINESS IS
I run Antarshanti Healing from Hyderabad, India, by myself. I offer (1) online Jyotish (Vedic astrology) sessions, donation-based with no fixed fee, (2) online Bach Flower remedy sessions at Rs 1,000 per session, paid online through Razorpay, and (3) I teach the Art of Living Happiness Program as voluntary service (registration happens on the Art of Living site, not mine). The website is antarshanti.co.in. It is built with Eleventy and hosted on Netlify. A test copy of the site (the "staging" site) lives at https://staging--aquamarine-croquembouche-26e205.netlify.app. The site stores data in Supabase (two projects: one real, one for testing). Nothing is published to the real site until I approve.

WHY I NEED GOOGLE CALENDAR
Visitors pick a time slot on the Jyotish and Bach Flower pages. I want my Google Calendar to be the single source of truth for when I am available, so that I can control everything from my phone with no coding:
- I create events titled "Open" for the times I take sessions. The website offers one-hour slots inside those windows.
- Any other event in that calendar (Busy, Travel, a doctor visit) blocks those hours.
- When someone books, the website writes an event into the same calendar, which then blocks that time automatically. That is how double booking is avoided. (The database also refuses double bookings as a second safety net.)
The website talks to Google through a "service account" (a robot Google account with its own email address and a JSON key file). The robot is given access to only the calendars I share with it.

HOW THE WEBSITE USES THE CALENDAR (this is exactly what the code does; please check each point against what is actually possible in Google Calendar)
1. An event whose title starts with the word Open or Available (not case sensitive, for example "Open", "Open - online", "Available") is an availability window. Only timed events count; an all-day "Open" is ignored.
2. Inside a window it offers 60-minute slots starting at the window start. A window 09:00-12:00 offers 9:00, 10:00 and 11:00.
3. Any other event blocks the slots it overlaps, including all-day events (an all-day event blocks that whole day, India time).
4. Events marked Free (the "Show as: Free" setting, also called transparent) and cancelled events are ignored. IMPORTANT: an Open event must therefore be left as Busy (the default). If an Open event is set to Free it is ignored and no times are offered.
5. When a booking is made the site creates a 60-minute event in the same calendar, marked Busy, titled "Jyotish: <name> (requested)" or "Bach Flower consultation (paid)". The Jyotish event description contains the client's name and WhatsApp number.
6. The site never offers a time less than 2 hours from now or more than 45 days ahead. It reads up to 250 events at once.
7. The calendar always wins. A weekly schedule stored in the database is only a fallback if the calendar cannot be read. If the calendar is connected but there are no Open events, no times are offered.
8. The site authenticates with the scope https://www.googleapis.com/auth/calendar, using a service account key (JWT). It does NOT support signing in as me with a password or OAuth. If service-account access turns out to be impossible for me, tell me; the website code would need to change and Claude (my coding assistant) would have to do that.

SAFETY DESIGN I WANT PRESERVED
- Two environments: PRODUCTION (the real site) and TEST (the staging site). A test booking must never touch the real calendar and the real site must never use the test calendar. The website has a safety lock for this: the Netlify variable GOOGLE_CALENDAR_ENV must be "production" on the real site and "test" on staging and previews, and each environment has its own calendar ID.
- My main personal calendar must never be readable by the website. Only calendars I deliberately share with the robot are reachable.
- Privacy: booking events contain clients' names and phone numbers. Those calendars must never be public and must not be shared with anyone except me and the robot.
- Never put the service account private key in chat, email, Google Drive, a Google Doc, GitHub or Gemini history. It goes only into Netlify.
- Time zone is India Standard Time (Asia/Kolkata, GMT+05:30) everywhere.

WHAT IS FIXED AND WHAT IS YOURS TO DECIDE
Fixed by the website code: separate calendar IDs for production and test; Open/Busy rules above; service-account authentication; the four Netlify variables GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_CALENDAR_ID, GOOGLE_CALENDAR_ENV.
Yours to decide and justify: how many Google accounts and calendars to use (see Prompt 1), colours, notification settings, and any extra safeguards you think are wise.

HOW I WANT YOU TO WORK
- Think independently. My description may be incomplete or wrong. Verify against the real Google Calendar, Google Cloud, Netlify and Razorpay screens, and against current official documentation, before trusting anything I said. If something I describe is impossible, risky or outdated, say so clearly and propose the best alternative.
- Do the work yourself wherever you can. Only stop and ask me for things only I can do: signing in, 2-step verification, CAPTCHAs, payment, or confirming an irreversible choice (deleting something, transferring ownership, changing a live setting).
- Be honest about your abilities. If you cannot do a step (for example you can create events but cannot create a Google Cloud project), do not pretend. Give me the exact click-by-click steps for me to do, in order, and carry on with the rest.
- Never claim something is done unless you have read it back and confirmed it. When you report, say how you verified it.
- Prefer least privilege and reversible actions. Never delete or change anything that already exists in my accounts unless I ask. Never touch my live Razorpay keys, prices or payouts.
- Keep answers short and plain. I am not a developer. Use numbered steps and tables where helpful, and tell me what you need from me at the end of each answer.

Please confirm you understand, list in 6 lines or fewer what you think the end result should look like, and tell me what you can and cannot do in my accounts (Calendar, Google Cloud console, browser actions, Netlify, Razorpay). Do not start any changes yet.
```

---

## Prompt 1: decide the structure, then create the calendars

```text
TASK 1: Work out the best calendar structure for me, then create it.

Step 1. Look at my Google account(s) that you can see. Tell me which Google account you are signed in to, and which calendars already exist (names only). Do not change anything yet.

Step 2. Think about these questions and decide. Give me a decision memo of at most 15 lines: the recommendation, the main reason for each choice, and the main risk of each choice.
(a) Accounts: Is it fine for the production and test calendars to live inside the same Google account I use every day? Or is it better to create a separate Google account for the business (for example a dedicated Gmail or a Google Workspace user) that owns the booking calendars, and have me add that calendar to my daily view? Think about: client names and phone numbers in booking events, how clearly personal and business data are separated, what happens if I lose access to or close one account, 2-step verification and recovery, organisation policies that can block service-account keys or block sharing with outside addresses (common on Workspace work accounts), whether the Google Cloud project should be in the same account, and notifications on my phone. If you recommend a new account, tell me exactly what I must do to create it (you probably cannot), and then continue with the plan assuming it exists.
(b) Calendars: The website needs exactly one calendar per environment (one for production, one for test), and Jyotish and Bach bookings share the same production calendar so that they cannot clash. Is there a good reason to add anything else (for example a third calendar that only I use to show "Open" windows, or a separate calendar for the Happiness Program dates)? Check whether it would work with the rules in the context message: the website reads Open windows AND blocking events from the same calendar ID, so any design with more calendars must still end with one calendar per environment that contains the Open events. Do not add things that do not clearly help me.
(c) Test: Is a separate calendar inside the same account enough for the test environment, or should the test calendar be in a different account? The key requirement: a mistake on the staging site must never be able to write into the real calendar.
(d) My personal events: The website must not read my main calendar, so personal events (doctor, travel) do not block slots automatically. What is the simplest option I will actually keep up with: create such events directly in the booking calendar, add a short "Busy" blocker there, or something smarter and safe? Check whether Google Calendar offers any built-in way to mirror free/busy from my personal calendar into another calendar of mine without exposing details, and whether it is reliable. If not sure, recommend the manual way.
(e) Notifications: I would like to be told on my phone when a booking appears. Recommend settings for the production calendar (for example notification when a new event is created, a daily agenda email, default reminders), and say what to avoid so that I am not flooded.

Step 3. Unless the memo depends on something only I can do, go ahead and create what you decided. At minimum I expect:
- A calendar named exactly: Antarshanti Bookings (description: Availability and bookings for antarshanti.co.in), time zone (GMT+05:30) India Standard Time - Kolkata, an orange colour.
- A calendar named exactly: Antarshanti TEST (description: Test calendar for the staging site), same time zone, a grey colour.
- Both are private: not public, not shared with the world or with my organisation, no link sharing.
- Notification settings as you recommended.

Step 4. Read the calendar list back and verify: names, time zone, privacy/sharing, owner account. Then show me, in a table: calendar name, owner account, time zone, Calendar ID (Settings and sharing, Integrate calendar, Calendar ID). The IDs look like abc123@group.calendar.google.com. Label them clearly PRODUCTION and TEST so they are never mixed up.

End by telling me what, if anything, you need from me.
```

---

## Prompt 2: add the availability ("Open" events)

```text
TASK 2: Put my availability into the calendars, then verify it.

My weekly pattern (India time). I want to be open every day and not restrict visitors: on working days I only take the morning and evening windows I already use (I work a day job), and on weekends every hour from 9 AM to 9 PM is open. If a particular time does not suit me on a given day, I will add a Busy event in the calendar myself, so please do NOT try to be clever about my preferences. Each row becomes a repeating weekly event titled exactly "Open" in the calendar named Antarshanti Bookings:
- Monday, Tuesday, Wednesday, Thursday: 09:00 to 12:00 and 17:00 to 21:00
- Friday: 09:00 to 13:00 and 17:00 to 21:00
- Saturday and Sunday: 09:00 to 21:00 (one single long window each day)
(These windows produce exactly these one-hour slots: Mon to Thu 9, 10, 11 AM and 5, 6, 7, 8 PM; Fri 9, 10, 11 AM, 12 noon and 5, 6, 7, 8 PM; Sat and Sun every hour from 9 AM to 8 PM, the last slot ending at 9 PM. For Mon to Thu you can use one series per window and set it to repeat weekly on those four days in one go if Google allows; otherwise four separate series.)

Rules for every Open event you create:
- Create it in the correct calendar, not in my main calendar. After creating, confirm which calendar it sits in.
- Title exactly: Open  (nothing else in front of it).
- Timed event, not all-day. India time zone.
- Show as: Busy (leave the default). It must NOT be set to Free.
- Repeat weekly on that weekday, with no end date, or ending far in the future (at least one year). Make one repeating series per time window, so I can later delete a single day with "This event".
- No guests, no video call link, no description needed. Visibility default.

For the TEST calendar (Antarshanti TEST): create ONE single, non-repeating Open event on the day after tomorrow from 10:00 to 13:00 India time (it must start more than 2 hours in the future). That should offer 10:00, 11:00 and 12:00 slots for my first test. Do not copy my weekly pattern into the test calendar yet.

Important safety rule: never name any other event in either calendar starting with the word Open or Available, because the website would treat it as a window. For example, a personal event called "Open house" would wrongly create bookable slots. Use titles like Busy, Away, Travel instead.

When done:
1. Read both calendars back for the next 14 days and list every event: calendar, title, start, end, repeat rule, Show as, time zone.
2. Check each slot the website would offer in the next 7 days from those events (apply the one-hour rule) and show it as a short table for the production calendar. Compare with my slots above and tell me any difference. Also tell me if a very long window (9 AM to 9 PM on weekends) causes any problem or is better split in two (it should not; the website simply cuts it into one-hour slots).
3. Tell me about anything that looks risky (for example a time zone mismatch, an event on the wrong calendar, a series that starts in the past).
```

---

## Prompt 2b: extend the weekday evenings to 9 PM (use this if Prompt 2 was already run with the older times)

```text
FOLLOW-UP TO TASK 2: I have decided to open the weekday evenings until 9 PM. The calendar named Antarshanti Bookings already has repeating Open events from Task 2. Please CHANGE those existing events instead of creating duplicates:
- Monday to Thursday evening series: change from 17:00-20:00 to 17:00-21:00.
- Friday evening series: change from 17:00-19:00 to 17:00-21:00.
- Leave the morning series (Mon to Thu 09:00-12:00, Friday 09:00-13:00) and the weekend series (Saturday and Sunday 09:00-21:00) as they are.
When you edit a repeating event, apply the change to ALL events in the series, not only this one.
Do not touch the Antarshanti TEST calendar and do not touch my main calendar.

Then read the calendar back for the next 14 days and show me every event in a table: calendar, title, start, end, repeat rule, Show as (Busy or Free), time zone. Check these rules and tell me about every violation, then fix the violations in Antarshanti Bookings:
1. The title of each availability event starts with the word Open (no emoji or symbol in front of it).
2. Show as is Busy (not Free) on every Open event.
3. They are timed events in the India time zone, not all-day.
4. No two Open events overlap each other and there are no duplicates.
5. No other event in the calendar has a title starting with Open or Available.
Finally list the slots the website would offer next Monday, next Friday and next Saturday (one-hour slots from the start of each Open window).
```

---

## Prompt 3: Google Cloud, the robot account and the sharing

```text
TASK 3: Create the "robot" account the website will use, and share only the two booking calendars with it.

Background: the website reads and writes calendar events using a Google service account. It needs: (1) a Google Cloud project (a free container; no billing or credit card is needed for the Google Calendar API at this volume), (2) the Google Calendar API turned on in that project, (3) a service account with a JSON key, (4) the two calendars shared with the service account email with the permission "Make changes to events". Nothing else must be shared.

Do this with the Google account that owns the booking calendars (the one you decided in Task 1). Check these points first and tell me if any is a problem, then proceed:
- Whether this account is allowed to create Google Cloud projects and service account keys. If the account belongs to a Google Workspace organisation, an organisation policy (for example iam.disableServiceAccountKeyCreation) may block key creation, and external sharing settings may block sharing a calendar with a service account address. If blocked, explain it plainly and propose the safest alternative. Remember the website code supports only service-account key authentication; any other approach would need a code change by Claude, so tell me instead of improvising.
- Whether Google currently asks for a billing account for this (it should not).

Steps (do them if you can operate the console; otherwise give me click-by-click steps for the ones you cannot):
1. In Google Cloud console create a project named: antarshanti-site
2. In that project, enable the Google Calendar API (APIs and Services, Library, Google Calendar API, Enable).
3. Create a service account named: antarshanti-booking. Skip all optional role grants (no project roles at all). Copy its email address (it looks like antarshanti-booking@antarshanti-site.iam.gserviceaccount.com).
4. Share EACH of the two calendars (Antarshanti Bookings and Antarshanti TEST) with that service account email: Settings and sharing, Share with specific people or groups, add the email, permission "Make changes to events". If Google warns that the address is not a Google account, continue; that is normal for a service account. Do NOT share my main calendar or any other calendar.
5. Create a JSON key for the service account (Keys tab, Add key, Create new key, JSON). The file downloads to my computer. SECRET HANDLING: do NOT show me or paste the contents of the key in this chat, do NOT upload it to Drive or anywhere, and do NOT try to read it back. Just tell me it was created, the key ID (the short id shown in the console list of keys), and where the downloaded file is, and remind me to (a) copy two values from it into Netlify, then (b) delete the file. If you cannot create keys yourself, give me the steps and I will do it.
6. Verify: list the sharing settings of both calendars and confirm that the only people with access are me (owner) and the service account, with the right permission, and that nothing is public. Confirm the Calendar API shows as enabled. Confirm the service account has no project roles.

Report back: project ID, service account email, key ID, and the verification result. Never include the private key.

Then tell me exactly what I have to do with the key file, in plain steps:
- Open the downloaded JSON in a plain text editor.
- Copy the value of client_email (this is the service account email) and the whole value of private_key (everything between the quotes, leaving the quotes out, keeping the backslash-n characters exactly as they are).
- Those two go into Netlify (Prompt 4).
- Afterwards delete the JSON file and empty the recycle bin.
```

---

## Prompt 4: Netlify settings and the live test

```text
TASK 4: Netlify settings, then test the staging site.

Site: aquamarine-croquembouche-26e205 on Netlify (the real site is antarshanti.co.in; staging is https://staging--aquamarine-croquembouche-26e205.netlify.app). Netlify contexts: "Production" (the real site), "Branch deploys" (includes the staging branch) and "Deploy Previews".

ALREADY DONE by my coding assistant on 20 Nov 2026, please do not redo or change, only verify if you can see them:
- GOOGLE_CALENDAR_ENV = production for Production; = test for Branch deploys and for Deploy Previews.
- SUPABASE_URL = the production database for Production; = the test database for Branch deploys and for Deploy Previews.

YOUR PART (Site configuration, Environment variables). You can probably not do this without a browser; if you cannot, give me the steps. For every variable choose "Different value for each deploy context" where a different value is listed. Tick "Contains secret values" for secrets.

A. Google (four variables in total; two already exist as above)
- GOOGLE_CLIENT_EMAIL: the service account email. Same in all contexts. (I will paste it.)
- GOOGLE_PRIVATE_KEY: the whole private_key value from the JSON key file. Same in all contexts. Secret. (Only I paste this; do not ask me to paste it into chat.)
- GOOGLE_CALENDAR_ID: Production = the Antarshanti Bookings calendar ID. Branch deploys and Deploy Previews = the Antarshanti TEST calendar ID. NEVER mix these two.
- GOOGLE_CALENDAR_ENV: verify it is production / test / test as above.

B. Database keys (two secrets I must copy myself from the Supabase dashboard, Project Settings, API Keys, the service_role / secret key. Do not ask me to paste them into chat.)
- SUPABASE_SERVICE_KEY: Production = the service key of the PRODUCTION Supabase project (project reference starting kntohz...). Branch deploys and Deploy Previews = the service key of the TEST project (project reference starting rnofqx...). Secret.

C. Razorpay (see Prompt 5 for how to get the values). The variables RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET currently hold the LIVE keys for all contexts. Do not change the Production values. Add separate values for Branch deploys and Deploy Previews containing the TEST keys (key id starting rzp_test_). Also add RAZORPAY_WEBHOOK_SECRET with one made-up long random value per mode: one for Production (live mode webhook), one for Branch deploys and Deploy Previews (test mode webhook). Mark RAZORPAY_KEY_SECRET and RAZORPAY_WEBHOOK_SECRET as secret. If Netlify does not allow a context override when an "all contexts" value exists, tell me what it asks and propose the cleanest fix (for example change the existing value from all contexts to Production only and add the test values for the other two contexts).

D. Deploy and test the staging site
1. Trigger a deploy of the staging branch (Deploys, Trigger deploy, Deploy site, pick branch staging). Never deploy or publish the main branch in this task.
2. Open https://staging--aquamarine-croquembouche-26e205.netlify.app/.netlify/functions/slots . The text should contain "mode":"calendar" and a "days" list that includes the day of my test Open event. If it says "mode":"weekly", the calendar is not connected; use this checklist: all four Google variables exist for the Branch deploys context; GOOGLE_CALENDAR_ENV is test there; the calendar ID is the TEST calendar; the calendar is shared with the service account with "Make changes to events"; the private key was pasted completely; a new deploy ran after the variables were saved. Check the function log (Netlify, Logs, Functions, slots) for messages such as: google auth failed: invalid_grant (key pasted wrongly), google calendar 404 (wrong calendar ID or not shared), google calendar 403 (wrong permission or API not enabled), calendar disabled: GOOGLE_CALENDAR_ENV is ... (label mismatch).
3. On the staging Jyotish page (https://staging--aquamarine-croquembouche-26e205.netlify.app/jyotish.html) pick the test day: the slots shown must match the Open event.
4. Book one slot with a clearly fake name (for example "Test Gemini") and phone 9999999999, tick the consent box, press the hold button. Within a few seconds a new event "Jyotish: Test Gemini (requested)" should appear in the Antarshanti TEST calendar, and that slot should disappear from the page after reload.
5. Add an event titled Busy in the TEST calendar over another slot; after about 30 seconds and a reload that slot must vanish.
6. Clean up: delete these test events from the TEST calendar. Do not touch the Antarshanti Bookings calendar during tests. Ask me to delete the test row from the TEST Supabase database (the bookings table), unless you can do it safely yourself.

E. Optional protection for my live site (ask me before doing any; they are optional)
- Netlify, Deploys, "Stop auto publishing" for production, so a push to the main branch does not go live until I press Publish deploy.
- GitHub repository settings, Branches, require a pull request before merging into main.

Report: for each item above, DONE (verified how) / NOT DONE (why) / NEEDS ME (exactly what).
```

---

## Prompt 5: Razorpay (test mode) checks

```text
TASK 5: Razorpay. Be careful here: this account takes real money. You may only work in TEST MODE. Do not change anything in LIVE MODE, do not touch live keys, prices, settlements, bank details or KYC, and make no real payments.

Background: my Bach Flower page charges Rs 1,000. The website's server creates a Razorpay order for the price stored in its own database, the visitor pays in Razorpay Checkout, and Razorpay then calls a webhook on my site, which verifies a signature and marks the payment paid. The webhook handles the events payment.captured, order.paid and payment.failed. The website has two environments: staging (must use test keys) and production (uses live keys). The website refuses to use a live key on a staging address and refuses a test key on the real address.

Please do these in the Razorpay Dashboard if you can operate it (otherwise give me click-by-click steps):
1. Switch the dashboard to TEST MODE (toggle at the top). Confirm you are in Test Mode before every step.
2. Account and Settings, API Keys: generate Test Mode keys. The Key ID starts with rzp_test_. The Key Secret is shown only once; do NOT paste it into chat. Tell me the Key ID only, and remind me that I must copy the secret straight into Netlify as RAZORPAY_KEY_SECRET for Branch deploys and Deploy Previews (see Prompt 4, section C). If I already have test keys, use them instead.
3. Account and Settings, Webhooks: add a webhook in TEST MODE with URL https://staging--aquamarine-croquembouche-26e205.netlify.app/.netlify/functions/razorpay-webhook , active events payment.captured, order.paid and payment.failed. For the webhook secret, invent a long random string, give it to me privately (not to anyone else), and I will put the same value in Netlify as RAZORPAY_WEBHOOK_SECRET for Branch deploys and Deploy Previews.
4. LIVE MODE, read only: check that the live webhook for the real site exists with URL https://antarshanti.co.in/.netlify/functions/razorpay-webhook and the same three events, or tell me it is missing. Do not edit it. (It will matter only after I publish the new site.) Check, only by looking, the Payment Capture setting: it must be Automatic capture. If it is manual, payments would be authorised but not captured, and Razorpay refunds uncaptured payments after a few days. Tell me if it is not automatic; do not change it without asking me.
5. Look at what Razorpay asks for before live payments are fully usable (website policy URLs such as terms, privacy and refund pages, a contact page, business details) and tell me anything that is incomplete or flagged. The website has draft Privacy, Terms and Refund pages at https://antarshanti.co.in/privacy.html , /terms.html and /refund.html (still hidden from search engines and pending my approval). Do not submit or change business or KYC details; just list what is needed.
6. Test mode payment test (only after Netlify has the test keys and webhook secret and the staging site has been redeployed): on the staging Bach page, https://staging--aquamarine-croquembouche-26e205.netlify.app/bach.html , choose a slot and pay with Razorpay's test card (card number 4111 1111 1111 1111, any future expiry, any CVV, any name; for UPI use success@razorpay in test mode). Then confirm: (a) the page says Payment confirmed; (b) in Razorpay TEST dashboard the payment is Captured and the webhook delivery shows a success response (200); (c) an event "Bach Flower consultation (paid)" appeared in the Antarshanti TEST calendar. If any of these fail, look at the webhook delivery log in Razorpay and the Netlify function log for razorpay-webhook, and tell me the exact error text.

Report: DONE (verified how) / NOT DONE (why) / NEEDS ME. Never include secrets in the report.
```

---

## Prompt 6: final audit and report back

```text
TASK 6: Final audit. Assume nothing: check everything again from scratch and report what you actually see now, not what you did earlier.

Please verify, and give me a table with Item | Expected | What I actually see | OK / Problem:
1. Google accounts and calendars: which account owns Antarshanti Bookings and Antarshanti TEST; both private; time zone India; no other calendar is shared with the service account; my main calendar is not shared with it.
2. Antarshanti Bookings contains repeating Open events matching: Mon to Fri 09-12 (Fri 09-13) and 17-21, Sat and Sun 09-21; every one is Busy (not Free), timed, India time zone, in the right calendar. No other event in either calendar starts with Open or Available.
3. Antarshanti TEST contains only test events (the single Open event; clean up leftover test bookings).
4. Google Cloud: project antarshanti-site, Calendar API enabled, one service account antarshanti-booking with no project roles, exactly one active key (delete any extra or unused keys), no key file left in Drive or Gemini history.
5. Netlify variables (names and contexts only, never values): GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY (secret), GOOGLE_CALENDAR_ID (different for Production and for Branch deploys / Deploy Previews), GOOGLE_CALENDAR_ENV (production / test / test), SUPABASE_URL (production DB / test DB / test DB), SUPABASE_SERVICE_KEY (two different values), RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET (live for Production, test for the other two contexts), RAZORPAY_WEBHOOK_SECRET (different per mode). Say which are secret-flagged. Make sure no calendar or test value is set for Production by mistake, and no live Razorpay key applies to staging.
6. Live test results: the staging slots endpoint says "mode":"calendar"; the Jyotish test hold created a calendar event; a Busy event blocked a slot; the Bach test payment (if run) was captured and created a calendar event.
7. Razorpay: test keys exist; test-mode webhook points to staging with the three events; live webhook for the real site exists; capture mode is automatic; list of anything Razorpay still needs before live payments are fully ready.
8. Risks and loose ends you noticed: anything unsafe, fragile or unclear (for example a key that was ever shown in a chat, a calendar that is shared too widely, a test value that could reach production), and what you recommend.

Then write a REPORT FOR MY CODING ASSISTANT that I can copy and paste to it. Plain text, no secrets, containing: (1) the structure you chose and why in three lines, (2) the PRODUCTION and TEST Calendar IDs, the service account email, the Google Cloud project ID and key ID, (3) the table above, (4) a numbered list of everything that is still open, with who must do it (me, Gemini, or my coding assistant), (5) every error message you saw, copied exactly.
```

---

## Appendix A: facts Gemini may need (reference)

| Item | Value |
|---|---|
| Business | Antarshanti Healing, Hyderabad, India (one person) |
| Time zone | India Standard Time, Asia/Kolkata, GMT+05:30 |
| Real site | https://antarshanti.co.in |
| Staging site | https://staging--aquamarine-croquembouche-26e205.netlify.app |
| Netlify site name / id | aquamarine-croquembouche-26e205 / 7c33324a-afbb-4e0f-8d2b-fde1baddec54 |
| Supabase projects | production: reference kntohzyxzoucymrmriva; test: reference rnofqxmfwqiogtlchkbp (both region Mumbai) |
| Slot length | 60 minutes |
| Lead time / horizon | not offered if less than 2 hours away or more than 45 days ahead |
| Prices | Bach Flower consultation Rs 1,000 (set in the database, not in the site); Jyotish has no fixed fee |
| Booking widget | shows 7 days at a time and pages up to 6 weeks ahead |
| Weekly availability (decided 20 Nov 2026) | every day: Mon to Thu 09:00-12:00 and 17:00-21:00; Fri 09:00-13:00 and 17:00-21:00; Sat and Sun 09:00-21:00 (weekday evenings extended to 9 PM on 21 Nov 2026). Anything unsuitable is blocked by a Busy event in the calendar. The same pattern is stored as the fallback in the database and in the website code |
| Webhook (production) | https://antarshanti.co.in/.netlify/functions/razorpay-webhook |
| Webhook (staging, test mode) | https://staging--aquamarine-croquembouche-26e205.netlify.app/.netlify/functions/razorpay-webhook |
| Slots check (staging) | https://staging--aquamarine-croquembouche-26e205.netlify.app/.netlify/functions/slots |

### The Netlify variables, complete list

| Variable | Production | Staging (Branch deploys) | Deploy Previews | Secret? | Status on 20 Nov 2026 |
|---|---|---|---|---|---|
| GOOGLE_CALENDAR_ENV | production | test | test | no | **set by Claude** |
| SUPABASE_URL | production DB | test DB | test DB | no | **set by Claude** |
| GOOGLE_CLIENT_EMAIL | robot email | same | same | yes (flagged) | **set 21 Nov** |
| GOOGLE_PRIVATE_KEY | robot key | same | same | **yes** | **set 21 Nov** |
| GOOGLE_CALENDAR_ID | Bookings calendar | TEST calendar | TEST calendar | yes (flagged) | **set 21 Nov** (confirm production and test IDs differ) |
| SUPABASE_SERVICE_KEY | production service key | test service key | test service key | **yes** | to do (only Srikanth pastes) |
| RAZORPAY_KEY_ID | live (exists, all contexts) | test key id | test key id | no | live exists; test values to do |
| RAZORPAY_KEY_SECRET | live (exists, all contexts) | test secret | test secret | **yes** | live exists (not yet marked secret); test values to do |
| RAZORPAY_WEBHOOK_SECRET | live-mode webhook secret | test-mode secret | test-mode secret | **yes** | to do |

### Existing documents in the project (Claude can paste any of them to you)
`docs/GOOGLE-CALENDAR-SETUP.md` (the manual step-by-step this brief is based on), `docs/BOOKING.md`, `docs/PAYMENTS-AND-PRICES.md`, `docs/RELEASE-PROCESS.md`, `TODO-SRIKANTH.md` (items A1 to A9).

## Appendix B: what to bring back to Claude

Paste Gemini's REPORT FOR MY CODING ASSISTANT (from prompt 6). Claude will then: check the calendar code against the real results, fix anything that failed, update `TODO-SRIKANTH.md` (A1 to A9), re-run the staging checks, and tell you whether it is safe to merge `staging` into `main`.

## Appendix C: after this, what is still not covered

- Merging `staging` into `main` (publishing) is your decision.
- Confirmation and reminder messages to clients (WhatsApp or email) are not built yet.
- The Privacy page should mention that booking events with names and phone numbers are stored in your calendar (on your to-do list).
