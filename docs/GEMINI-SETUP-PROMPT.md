# Antarshanti: setup brief for Google Gemini

**What this is:** a set of ready-to-paste prompts that ask Gemini (signed in to your Google account) to set up Google Calendar for the Antarshanti website, then walk through the Google Cloud, Netlify and Razorpay steps around it. Written 20 Nov 2026.

**What it contains**

| # | Prompt | Why it exists |
|---|---|---|
| 0 | **Shared context** (paste first, once) | Gives Gemini the whole picture so it can think for itself instead of following steps blindly |
| 1 | **Decide the structure, then create the calendars** | Gemini works out: one Google account or two, one calendar or several |
| 2 | **Simplify the calendars**: no availability events are needed any more; remove the old "Open" events and keep only what is busy | The website now treats your normal weekly hours as open and only reads the calendar for what blocks them |
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

## Where things stand (checked in Netlify on 20 Nov 2026, names and contexts only)

| Item | State |
|---|---|
| Prompts 0 to 1 (context, calendars) and the old Prompt 2 (Open events) | done by you with Gemini. **The logic changed on 20 Nov: Open events are no longer needed** (see the next section); the new Prompt 2 removes them. Claude cannot see your Google account, so this is unverified |
| `GOOGLE_CLIENT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_CALENDAR_ID` | **present** in Production, Branch deploys and Deploy Previews, flagged secret. The values are hidden, so it cannot be seen whether the Production and TEST calendar IDs are different. Please confirm that they are |
| `GOOGLE_CALENDAR_ENV` | production / test / test (correct) |
| `SUPABASE_URL` | production / test / test (correct, now flagged secret; fine) |
| `SUPABASE_SERVICE_KEY` | **missing** (without it the booking database is not used and saved check-ins and bookings fail) |
| `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` | now secret-flagged and listed per context, but the staging contexts still end in the same characters as the **live** key: **test keys not yet added**, so staging payments are refused by the safety lock |
| `RAZORPAY_WEBHOOK_SECRET` | **created by Claude on 20 Nov** (secret-flagged): one value for Production (the live-mode webhook) and one for Branch deploys and Deploy Previews (the test-mode webhook). Claude gave you the two values in chat so you can paste them into the Razorpay webhook forms |
| Staging redeployed after the new variables? | pushing the 9 PM schedule change to the `staging` branch on 20 Nov triggers a fresh staging deploy |
| Calendar actually shared with the robot (Prompt 3)? | **not yet checked**; the way to find out is the slots check below |

**The one-minute test.** Open this in your browser (Claude cannot reach netlify.app from here):
`https://staging--aquamarine-croquembouche-26e205.netlify.app/.netlify/functions/slots`
- Text containing `"mode":"calendar"` and a `days` list = the calendar works.
- `{"live":false}` = the website cannot reach its **database**: `SUPABASE_SERVICE_KEY` is missing (or `SUPABASE_URL` / the key is wrong) for the staging contexts. The calendar is never even tried in that case, so this is NOT a Google problem. Fix: add `SUPABASE_SERVICE_KEY` for Branch deploys and Deploy Previews (the key of the TEST Supabase project), then redeploy staging.
- `"mode":"weekly"` = the database works but the calendar is not connected; paste what you see to Claude, or use the troubleshooting list in Prompt 4.
- `"calendarError":true` with an empty `days` list = the calendar is connected but Google could not be read (not shared with the robot, wrong ID, key problem). The website deliberately offers nothing then.
- The text also contains `"calendarName"`. On staging it must say **Antarshanti TEST**. If it says Antarshanti Bookings, the wrong calendar ID is in the staging variables.

---

## Netlify variables: the exact steps (do these yourself; they contain secrets)

Netlify: <https://app.netlify.com> > site **aquamarine-croquembouche-26e205** > **Project configuration** (Site configuration) > **Environment variables**. Click a variable's name to see and edit its value for each context (Production, Deploy Previews, Branch deploys). The little eye icon reveals a hidden value.

**Step 1. Add `SUPABASE_SERVICE_KEY` (this is why the staging slots check says `{"live":false}`)**
1. Supabase dashboard > project **antarshanti-test** (reference `rnofqxmfwqiogtlchkbp`) > **Project Settings** > **API Keys**.
2. Open the tab **Legacy anon, service_role API keys**, find **service_role**, click **Reveal**, copy it (it starts with `eyJ`). The newer **secret key** (starts `sb_secret_`) also works. Never use the anon or publishable key.
3. In Netlify: **Add a variable** > **Add a single variable**. Key: `SUPABASE_SERVICE_KEY`. Choose **Different value for each deploy context**. Paste the TEST key for **Deploy Previews** and for **Branch deploys**. Tick **Contains secret values**. Scopes: leave Builds, Functions and Runtime ticked. **Create variable**.
4. Production: leave empty for now, or (if Netlify insists on a value) paste the key of the **antarshanti-prod** project (reference `kntohzyxzoucymrmriva`). Never put the test key in Production.

**Step 2. Razorpay TEST keys for staging**
1. Razorpay Dashboard > switch the toggle at the top to **Test Mode** > Account and Settings > **API Keys** > **Generate Test Key**. Copy the **Key Id** (starts `rzp_test_`) and the **Key Secret** (shown only once).
2. In Netlify click `RAZORPAY_KEY_ID`: for **Branch deploys** and **Deploy Previews** replace the value with the test Key Id. Leave **Production** untouched (it is the live key).
3. Do the same for `RAZORPAY_KEY_SECRET` with the test Key Secret. Keep both flagged secret.

**Step 3. Check the two calendar IDs are different**
Click `GOOGLE_CALENDAR_ID` and reveal each value. **Production** must be the ID of **Antarshanti Bookings**; **Branch deploys** and **Deploy Previews** must be the ID of **Antarshanti TEST**. (Google Calendar > the calendar's Settings and sharing > Integrate calendar > Calendar ID.) The website also checks the calendar's name, but get this right anyway.

**Step 4. Razorpay test webhook** (the secret already exists in Netlify; Claude created it)
Razorpay Test Mode > Account and Settings > **Webhooks** > Add: URL `https://staging--aquamarine-croquembouche-26e205.netlify.app/.netlify/functions/razorpay-webhook`, events `payment.captured`, `order.paid`, `payment.failed`, secret = the test value Claude gave you in chat (it ends in `PfRa`). The **live** webhook for antarshanti.co.in is created only at go-live, after `staging` is merged into `main`, with the other value (ends `vqZg`).

**Step 5. Make staging use the new values**
Environment variable changes only apply to the **next deploy**. Netlify > **Deploys** > change the branch filter to **staging** > open the latest deploy > **Retry deploy** > **Clear cache and deploy site**. (Or tell Claude and it will push a harmless change to the staging branch.)

**Step 6. Check**
Open `https://staging--aquamarine-croquembouche-26e205.netlify.app/.netlify/functions/slots`. You want `"live":true`, `"mode":"calendar"` and `"calendarName":"Antarshanti TEST"`. Then try a Jyotish test booking on the staging page (use a fake name, phone 9999999999).

---

## How the website reads the calendar (changed 20 Nov 2026: default open, the calendar only blocks)

**The idea:** your normal weekly hours are stored in the website's database and are **open by default**. The Google calendar is only asked one question: *"is anything busy at this time?"* If yes, that slot disappears. You never create availability events.

| In the calendar | What the website does |
|---|---|
| **Any timed event** (Busy, Doctor, Travel, a reminder, a booking made by the site) | Blocks the one-hour slots it overlaps, even by one minute |
| **An all-day event** (for example Away) | Blocks that whole day (India time) |
| **Show as: Free** on an event | The event is **ignored** (use this for reminders you want to keep on the calendar without blocking anything) |
| **Cancelled** event | Ignored |
| **A title starting with Open or Available** (optional, rare) | Adds an **extra** bookable window outside your weekly hours (for a special one-off time). It never blocks. Old Open events from the first setup are therefore harmless, but should be deleted to keep the calendar tidy |
| Colour, description, guests | Do not matter |

**Normal weekly hours** (database table availability_rules): Monday to Thursday 9 AM to 12 noon and 5 PM to 9 PM; Friday 9 AM to 1 PM and 5 PM to 9 PM; Saturday and Sunday 9 AM to 9 PM. Changing these permanently means editing that table (or asking Claude); one-off changes are a Busy event.

**If the calendar is connected but unreadable** (Google problem, calendar not shared, wrong ID) the website **offers no times** and visitors are told to message you on WhatsApp. This is deliberate: guessing would ignore your appointments. It stays strict until the calendar can be read again.

**Why this design:** an "Open" event for every available hour fills the calendar with coloured blocks that sit on top of real bookings, so you cannot see at a glance when you are actually free. Now the calendar shows only things that really happen (bookings and your commitments), and everything else is free.

---

## Prompt 0: shared context (paste this first)

```text
You are helping me, Srikanth, set up the calendar and payment plumbing for my small business website. Please read the whole message before doing anything, and treat it as background you must understand and question, not as a script.

WHO I AM AND WHAT THE BUSINESS IS
I run Antarshanti Healing from Hyderabad, India, by myself. I offer (1) online Jyotish (Vedic astrology) sessions, donation-based with no fixed fee, (2) online Bach Flower remedy sessions at Rs 1,000 per session, paid online through Razorpay, and (3) I teach the Art of Living Happiness Program as voluntary service (registration happens on the Art of Living site, not mine). The website is antarshanti.co.in. It is built with Eleventy and hosted on Netlify. A test copy of the site (the "staging" site) lives at https://staging--aquamarine-croquembouche-26e205.netlify.app. The site stores data in Supabase (two projects: one real, one for testing). Nothing is published to the real site until I approve.

WHY I NEED GOOGLE CALENDAR
Visitors pick a time slot on the Jyotish and Bach Flower pages. I want my Google Calendar to be the single source of truth for when I am available, so that I can control everything from my phone with no coding:
- My normal weekly hours are stored in the website's database, so times inside them are open by default. I do NOT want to create availability events in the calendar; they clutter it and visually collide with real bookings.
- Any event in that calendar (Busy, Travel, a doctor visit, a reminder) blocks the hours it overlaps, unless it is marked Free.
- When someone books, the website writes an event into the same calendar, which then blocks that time automatically. That is how double booking is avoided. (The database also refuses double bookings as a second safety net.)
The website talks to Google through a "service account" (a robot Google account with its own email address and a JSON key file). The robot is given access to only the calendars I share with it.

HOW THE WEBSITE USES THE CALENDAR (this is exactly what the code does; please check each point against what is actually possible in Google Calendar)
1. Normal hours come from the database, not from the calendar: Monday to Thursday 09:00-12:00 and 17:00-21:00; Friday 09:00-13:00 and 17:00-21:00; Saturday and Sunday 09:00-21:00. Inside them the website offers 60-minute slots on the hour.
2. Any timed event in the calendar blocks the slots it overlaps (by even one minute). An all-day event blocks that whole day (India time).
3. Events marked Free (the "Show as: Free" setting, also called transparent) and cancelled events are ignored.
4. An event whose title starts with the word Open or Available is optional and rare: it ADDS an extra window outside the normal hours and never blocks. Events like that left over from an earlier attempt are harmless but I want them deleted.
5. When a booking is made the site creates a 60-minute event in the same calendar, marked Busy, titled "Jyotish: <name> (requested)" or "Bach Flower consultation (paid)". The Jyotish event description contains the client's name and WhatsApp number.
6. The site never offers a time less than 2 hours from now or more than 45 days ahead.
7. If the calendar is connected but cannot be read, the site offers no times at all (it fails closed) so that my appointments are never ignored.
8. The site authenticates with the scope https://www.googleapis.com/auth/calendar, using a service account key (JWT). It does NOT support signing in as me with a password or OAuth. If service-account access turns out to be impossible for me, tell me; the website code would need to change and Claude (my coding assistant) would have to do that.

SAFETY DESIGN I WANT PRESERVED
- Two environments: PRODUCTION (the real site) and TEST (the staging site). A test booking must never touch the real calendar and the real site must never use the test calendar. The website has a safety lock for this: the Netlify variable GOOGLE_CALENDAR_ENV must be "production" on the real site and "test" on staging and previews, and each environment has its own calendar ID.
- My main personal calendar must never be readable by the website. Only calendars I deliberately share with the robot are reachable.
- Privacy: booking events contain clients' names and phone numbers. Those calendars must never be public and must not be shared with anyone except me and the robot.
- Never put the service account private key in chat, email, Google Drive, a Google Doc, GitHub or Gemini history. It goes only into Netlify.
- Time zone is India Standard Time (Asia/Kolkata, GMT+05:30) everywhere.

WHAT IS FIXED AND WHAT IS YOURS TO DECIDE
Fixed by the website code: separate calendar IDs for production and test; the blocking rules above; service-account authentication; the four Netlify variables GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_CALENDAR_ID, GOOGLE_CALENDAR_ENV.
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
(b) Calendars: The website needs exactly one calendar per environment (one for production, one for test), and Jyotish and Bach bookings share the same production calendar so that they cannot clash. Is there a good reason to add anything else (for example a separate calendar for the Happiness Program dates)? Check whether it would work with the rules in the context message: the website reads the blocking events and writes the bookings in the same calendar ID, so any design with more calendars must still end with one calendar per environment that contains my busy events and the bookings. Do not add things that do not clearly help me.
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

## Prompt 2: simplify the calendars (no availability events needed)

```text
TASK 2: Simplify the calendars. I have changed how the website works: my normal weekly hours are now stored in the website's database and are open by default, so I do NOT want any availability events in Google Calendar. The calendars should only show what is really busy (bookings and my commitments).

In the calendars named Antarshanti Bookings and Antarshanti TEST:
1. Find every event whose title starts with Open or Available (these were created earlier: repeating weekly series, plus a one-off test event). Delete them. For repeating series delete ALL events of the series, not just one. Do not delete any other events in Antarshanti Bookings.
2. In Antarshanti TEST only, I created some test events myself (for example Busy - Doctor and Reminder - Tentative). Leave those; tell me what is there.
3. Do not touch my main calendar and do not change sharing or settings.

Then read both calendars back for the next 14 days and show a plain list, one line per event, in the form: calendar | title | start | end | repeats | Show as (Busy or Free) | all-day or timed. Tell me:
- that no event starting with Open or Available is left in either calendar;
- for every remaining event whether it will block bookings (Busy) or be ignored (Free);
- for the calendar named Antarshanti Bookings, whether it is now empty apart from real commitments (it should have no events I did not create).

For my own understanding, please also write 4 lines on how I should now use the calendar: how to block a few hours, how to block a whole day, how to keep a reminder from blocking, and where to see bookings.
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
2. Open https://staging--aquamarine-croquembouche-26e205.netlify.app/.netlify/functions/slots . The text should contain "mode":"calendar" and a "days" list with my normal weekly hours (no Open events are needed any more) and "calendarName" saying Antarshanti TEST. If calendarName says Antarshanti Bookings, the staging variable GOOGLE_CALENDAR_ID wrongly holds the real calendar: fix it. If you see "calendarError":true the calendar could not be read. If it says "mode":"weekly", the calendar is not connected; use this checklist: all four Google variables exist for the Branch deploys context; GOOGLE_CALENDAR_ENV is test there; the calendar ID is the TEST calendar; the calendar is shared with the service account with "Make changes to events"; the private key was pasted completely; a new deploy ran after the variables were saved. Check the function log (Netlify, Logs, Functions, slots) for messages such as: google auth failed: invalid_grant (key pasted wrongly), google calendar 404 (wrong calendar ID or not shared), google calendar 403 (wrong permission or API not enabled), calendar disabled: GOOGLE_CALENDAR_ENV is ... (label mismatch).
3. On the staging Jyotish page (https://staging--aquamarine-croquembouche-26e205.netlify.app/jyotish.html) pick any day: the slots shown must match my normal weekly hours for that weekday (Mon to Thu 9, 10, 11 AM and 5 to 8 PM; Fri 9 to 12 AM/noon and 5 to 8 PM; Sat and Sun 9 AM to 8 PM), minus anything busy in the TEST calendar.
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
2. Antarshanti Bookings contains no availability events: no event starts with Open or Available, and nothing is in it that I did not create (apart from real bookings written by the site).
3. Antarshanti TEST contains only test events I want (no Open events; clean up leftover test bookings).
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
| Weekly availability (decided 20 Nov 2026) | stored in the database (table availability_rules) and open by default: Mon to Thu 09:00-12:00 and 17:00-21:00; Fri 09:00-13:00 and 17:00-21:00; Sat and Sun 09:00-21:00. The calendar only blocks (any busy event). A copy is kept in the website code as an outage fallback |
| Webhook (production) | https://antarshanti.co.in/.netlify/functions/razorpay-webhook |
| Webhook (staging, test mode) | https://staging--aquamarine-croquembouche-26e205.netlify.app/.netlify/functions/razorpay-webhook |
| Slots check (staging) | https://staging--aquamarine-croquembouche-26e205.netlify.app/.netlify/functions/slots |

### The Netlify variables, complete list

| Variable | Production | Staging (Branch deploys) | Deploy Previews | Secret? | Status on 20 Nov 2026 |
|---|---|---|---|---|---|
| GOOGLE_CALENDAR_ENV | production | test | test | no | **set by Claude** |
| SUPABASE_URL | production DB | test DB | test DB | no | **set by Claude** |
| GOOGLE_CLIENT_EMAIL | robot email | same | same | yes (flagged) | **set 20 Nov** |
| GOOGLE_PRIVATE_KEY | robot key | same | same | **yes** | **set 20 Nov** |
| GOOGLE_CALENDAR_ID | Bookings calendar | TEST calendar | TEST calendar | yes (flagged) | **set 20 Nov** (confirm production and test IDs differ) |
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
