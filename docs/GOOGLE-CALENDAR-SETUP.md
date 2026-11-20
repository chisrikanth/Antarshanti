# Google Calendar setup: your calendar controls your bookings

Follow this top to bottom. It takes about 45 minutes the first time. You do it once; after that you only ever use Google Calendar.

**Honest status:** the code is written and tested with a simulated Google, but it has **not yet run against your real Google account**. Part 6 is the first real test, on the staging site. Tell Claude the result and any error text and it will fix whatever is needed.

---

## Part 0. What you are building (read this first)

You will have **two new calendars** in your own Google account (yes, one Google account can hold as many calendars as you like; they are completely independent):

| Calendar | Used by | Purpose |
|---|---|---|
| **Antarshanti Bookings** | the real website (antarshanti.co.in) | your availability, and where real bookings appear |
| **Antarshanti TEST** | the staging/test website only | so test bookings never touch the real calendar |

Your **main calendar is never read or touched** by the website. Reminders, family, everything else stays private there.

A small robot account (a "service account") gives the website permission to read and write only those two calendars. Nothing else in your Google account is reachable.

### How the website decides what to offer (the rules)
*(Changed on 20 Nov 2026: the calendar now only has to show what is **busy**. You no longer create "Open" events.)*
1. Your **normal weekly hours** live in the database (Supabase table `availability_rules`): Mon to Thu 9-12 and 5-9 PM, Friday 9-1 and 5-9 PM, Saturday and Sunday 9 AM to 9 PM. Inside those hours the website offers **60-minute slots**, on the hour.
2. **Anything in the Antarshanti Bookings calendar blocks the slots it overlaps:** an appointment, `Busy`, `Travel`, a doctor visit, a booking made through the site. All-day events (for example `Away`) block the whole day. A time that you have not blocked is simply open.
3. Events you set to **Free** (not Busy) and cancelled events are ignored, so you can keep reminders and notes in the calendar without blocking anything.
4. When someone books, the website **adds an event** to the same calendar (`Jyotish: Name (requested)` or `Bach Flower consultation (paid)`). That event blocks the time and shows you exactly who is coming.
5. The website never offers a time less than **2 hours away** or more than **45 days ahead**. The booking widget shows 7 days at a time and you can page ahead.
6. **Optional:** to open a one-off time *outside* your weekly hours (a special Tuesday afternoon), add an event whose title starts with `Open` (for example `Open - special`) at that time. It adds a window; it never blocks anything. Old `Open` events created earlier are harmless but can be deleted.
7. **If the calendar is connected but cannot be read** (Google problem, calendar no longer shared), the website offers **no times** and visitors are told to message you on WhatsApp. This is deliberate: guessing would ignore your appointments. If **no calendar is connected at all**, the weekly hours alone are used.
8. To change your **normal weekly hours** (not a one-off), edit the `availability_rules` table in Supabase (or ask Claude). One-off changes: add a `Busy` event.

---

## Part 1. Create the two calendars (about 5 minutes)

Use a computer browser (the phone app cannot do some of these steps).

1. Go to <https://calendar.google.com> signed in to the Google account you want to use.
2. On the left, find **Other calendars**, click the **+** next to it, then **Create new calendar**.
3. Name: `Antarshanti Bookings`. Description: `Availability and bookings for antarshanti.co.in`. **Time zone: choose `(GMT+05:30) India Standard Time - Kolkata`.** Click **Create calendar**.
4. Repeat for a second calendar named `Antarshanti TEST` (description: `Test calendar for the staging site`, same India time zone).
5. Pick colours so you can tell them apart (hover the calendar name on the left, click the three dots, choose a colour). Suggestion: orange for Bookings, grey for TEST.
6. Copy each **Calendar ID** (you need these later):
   - On the left, hover the calendar, click the three dots, **Settings and sharing**.
   - Scroll down to **Integrate calendar**.
   - Copy **Calendar ID**. It looks like `abc123def456@group.calendar.google.com`.
   - Paste both IDs into a private note, labelled clearly **PRODUCTION** and **TEST**. Mixing them up is the most common mistake.

---

## Part 2. Create the Google Cloud project and the robot account (about 15 minutes)

You need a free Google Cloud project only as a place to create the robot account. The Google Calendar API is free and **no billing or credit card is needed**.

1. Go to <https://console.cloud.google.com> signed in to the same Google account. Accept the terms if asked.
2. At the top, click the project selector (it may say *Select a project*), then **New project**.
   - Project name: `antarshanti-site`. Click **Create**. Wait a few seconds, then make sure `antarshanti-site` is the selected project (top bar).
3. **Turn on the Calendar API:**
   - Menu (three lines, top left) > **APIs & Services** > **Library**.
   - Search `Google Calendar API`, click it, click **Enable**.
4. **Create the robot account:**
   - Menu > **IAM & Admin** > **Service Accounts** > **Create service account**.
   - Service account name: `antarshanti-booking`. (An ID fills in automatically.) Click **Create and continue**.
   - **Skip** "Grant this service account access to project" (leave empty) and "Grant users access" (leave empty). Click **Done**.
5. **Copy its email address:** in the list, the service account's email looks like `antarshanti-booking@antarshanti-site.iam.gserviceaccount.com`. Copy it (you need it in Part 3 and Part 4).
6. **Create the key file:**
   - Click the service account's email, open the **Keys** tab > **Add key** > **Create new key** > choose **JSON** > **Create**.
   - A `.json` file downloads. **This file is a password.** Treat it like one (see Part 7).
   - If you see an error like *"Service account key creation is disabled"*, your account is governed by an organisation policy (common with a Google Workspace work account). Use a personal Google account, or tell Claude; there is a workaround.

---

## Part 3. Share both calendars with the robot (about 5 minutes)

Do this for **each** calendar.

1. In Google Calendar, hover the calendar > three dots > **Settings and sharing**.
2. Scroll to **Share with specific people or groups** > **Add people and groups**.
3. Paste the robot's email (`antarshanti-booking@...iam.gserviceaccount.com`).
4. Set permission to **Make changes to events**. Click **Send**.
   - Google may say the address is not a Google account or ask to confirm. Click **Send** / **Yes** anyway. This is normal for a robot account.
5. Check the calendar now lists the robot under *Share with specific people*.

**Important:** share **only** these two calendars. Do **not** share your main calendar.

---

## Part 4. Put the details into Netlify (about 10 minutes)

Open your JSON key file in a plain text editor (Notepad). You need two things from it: `client_email` and `private_key`.

In Netlify: your site > **Site configuration** > **Environment variables** > **Add a variable** > **Add a single variable**. For each of the four below choose **Different value for each deploy context** where noted.

| Key | Value | Same everywhere? |
|---|---|---|
| `GOOGLE_CLIENT_EMAIL` | the `client_email` from the JSON (the robot's email) | yes, same value in all contexts |
| `GOOGLE_PRIVATE_KEY` | the whole `private_key` value from the JSON (see below) | yes, same value in all contexts. Tick **Contains secret values** if offered |
| `GOOGLE_CALENDAR_ID` | **Production:** the Antarshanti **Bookings** calendar ID. **Deploy Previews and Branch deploys:** the Antarshanti **TEST** calendar ID | different per context |
| `GOOGLE_CALENDAR_ENV` | **Production:** `production`. **Deploy Previews and Branch deploys:** `test` | different per context |

How to copy `private_key`: in the JSON it is one long line starting `-----BEGIN PRIVATE KEY-----\n` and ending `-----END PRIVATE KEY-----\n`, wrapped in quotes. Copy everything **between** the quotes (leave the quotes out) and paste it. The `\n` characters can stay exactly as they are; the website understands them.

`GOOGLE_CALENDAR_ENV` is a **safety lock**. The website refuses to use a calendar if this word does not match the address (a test address can never write to the real calendar, and the real site can never use the test calendar). If you leave it out, the calendar simply stays switched off.

Netlify limits all variables together to about 4 KB for functions. The key is about 1.7 KB, so you should be fine. If Netlify complains about size, tell Claude.

Finally, make Netlify use the new values: **Deploys** > **Trigger deploy** > **Deploy site** (do this for the `staging` branch, and later for `main`).

---

## Part 5. Block what is not available (about 2 minutes)

Do this in the **TEST** calendar first, then in **Bookings** whenever you need it.

1. Your normal hours already come from the database, so you do **not** create any availability events.
2. To test: in the **TEST** calendar create an event titled `Busy` tomorrow-after-next from 10:00 to 11:00 India time (it must be at least 2 hours in the future). The website will stop offering the 10:00 slot that day and keep offering the others.
3. For real life, put anything that stops you taking a session into **Antarshanti Bookings**: `Busy`, `Doctor`, `Travel`, or an all-day `Away`. Give a repeating block a repeating event (for example `Busy` every Tuesday 17:00-19:00 if you have a class).
4. Mark an event **Free** (Show as: Free) if it must stay on the calendar without blocking.

---

## Part 6. Test it on the staging site (about 10 minutes)

1. Open `https://staging--aquamarine-croquembouche-26e205.netlify.app/.netlify/functions/slots` in the browser. You should see text containing `"mode":"calendar"` and a `days` list that includes your Open day.
   - If you see `{"live":false}`, the website cannot reach its database: add `SUPABASE_SERVICE_KEY` (the TEST project's key) for Branch deploys and Deploy Previews in Netlify and redeploy. The calendar is only used once the database works.
   - If you see `"mode":"weekly"` instead, the calendar is not connected. Go to the troubleshooting table.
   - If `"calendarError":true` and no days, the calendar is configured but unreadable (see the troubleshooting table; the website deliberately offers nothing).
   - The text also shows `"calendarName"`: it must say your TEST calendar on staging and Antarshanti Bookings on the real site.
2. Open the staging **Jyotish** page and choose that day. You should see your normal hours for that weekday.
3. Pick a slot, enter a test name and a test phone number (for example `9999999999`), tick the box, press **Hold this slot**.
4. Look at the **Antarshanti TEST** calendar. A new event `Jyotish: <name> (requested)` should appear at that time within a few seconds. Reload the staging page: that time is gone.
5. In the TEST calendar add an event `Busy` over another slot. Reload the staging page (wait up to 30 seconds): that slot disappears. Delete the `Busy` event and it comes back.
6. Delete the test events from the TEST calendar and the test rows from the `bookings` table in the **test** Supabase project.
7. For a Bach test (needs the Razorpay test keys from the other to-do list), pay with a Razorpay test card. After the payment an event `Bach Flower consultation (paid)` should appear in the TEST calendar.

### Troubleshooting
| What you see | Likely cause | Fix |
|---|---|---|
| `"mode":"weekly"` | One of the four variables is missing, or `GOOGLE_CALENDAR_ENV` does not match (`test` on staging, `production` on the real site) | Check all four variables for the right context; redeploy |
| Netlify function log says `google auth failed: invalid_grant` | The private key was pasted wrongly or cut off | Paste `private_key` again, whole value, no quotes |
| Log says `google calendar 404` | Wrong calendar ID, or the calendar is not shared with the robot | Re-copy the Calendar ID; redo Part 3 |
| Log says `google calendar 403` | The robot has the wrong permission, or the Calendar API is not enabled | Permission must be **Make changes to events**; recheck Part 2 step 3 |
| Log says `calendar disabled: GOOGLE_CALENDAR_ENV is ...` | Safety lock mismatch | Fix the label for that context |
| Calendar connected but **no times** are offered | `"calendarError":true`: Google could not be read (see the log). Otherwise: the weekly hours in the database are empty, or everything is covered by busy events | Check the Netlify function log; check `availability_rules` in Supabase |
| A time you expected is missing | Any event in the calendar (Busy, a reminder, an old test event) or an earlier booking overlaps it, even by 1 minute | Move or delete the blocking event, or mark it Free |
| Booked slot still shows after you deleted its calendar event | The booking also exists in the database | In Supabase, `bookings`, set `status` to `cancelled` for that row |

To see the Netlify function log: Netlify > **Logs** > **Functions** > `slots` (or `reserve-slot`).

---

## Part 7. Day-to-day use and safety

**Your weekly routine**
- Nothing to maintain for normal days: your weekly hours are open by default. To close a whole day, add an all-day event called `Away` in **Antarshanti Bookings**.
- To block a few hours, add an event called `Busy` at those hours. No need to put details in the title.
- Slots appear on the website within about 30 seconds of a calendar change.

**Using Gemini or another assistant to manage the calendar**
If Gemini is available in your Google Calendar, you can ask in plain words. Example prompts:
- "On my Antarshanti Bookings calendar, add an all-day event called Away from 24 to 26 December."
- "On my Antarshanti Bookings calendar, add a Busy event next Thursday from 2 PM to 4 PM."
- "Delete the Busy event on 25 December on my Antarshanti Bookings calendar."

Always glance at the result: check the event is on the **right calendar** (colour), the event is shown as **Busy** (not Free) if it should block, and the time zone is India. I cannot confirm what Gemini can or cannot do on your account, so verify the first few.

**Things on your main calendar that block bookings**
Google Calendar does not automatically copy events between two of your own calendars, and I did not want the website reading your main calendar. Your options:
1. **Move it:** open the event, change the **Calendar** dropdown to *Antarshanti Bookings*. (Use this for events that are only about your availability.)
2. **Keep it on main and add a blocker:** create a short event in *Antarshanti Bookings* titled `Busy` at the same time.
3. When you create a new event that blocks sessions, create it in *Antarshanti Bookings* from the start.
Small tip: name the blocker `Busy` and keep the real details on your main calendar only.

**What appears in each booking event** (so you never have to look anywhere else)
- **Jyotish request** (title `Jyotish: <name> (requested)`): name, WhatsApp number, a tap-to-chat link, the service, the exact time in India time, the status ("requested; confirm on WhatsApp within 24 hours; they will send birth details there"), the language of the page they used, the booking ID and when it was requested.
- **Bach Flower, paid** (title `Bach Flower consultation (paid): <name>`): name, phone and email as given to Razorpay, a tap-to-chat link, the amount and payment method (UPI, card...), the time, Razorpay order and payment IDs, the language of the page and the booking ID. No card details are ever stored.
- The Bach page now asks for the visitor's **name** before payment (phone and email come from Razorpay's own checkout).
These events contain personal details. Do not share the Antarshanti Bookings calendar with anyone else. The Privacy page should mention that names, phone numbers and emails are kept in this calendar (on your to-do list).

**Cancelling a booking**
Delete (or move) the calendar event **and** set `status` to `cancelled` for that row in the `bookings` table. The website does not delete calendar events by itself.

**Protecting the key file**
- After pasting the key into Netlify, **delete the downloaded `.json` file** (and empty the recycle bin) or keep it only in a password manager.
- Never email it, paste it into chat, or put it in GitHub.
- If it leaks or you are unsure: Google Cloud > IAM & Admin > Service Accounts > the account > **Keys** > delete the key, create a new one, update `GOOGLE_PRIVATE_KEY` in Netlify.
- The robot can only reach the two calendars you shared with it.

**Cost:** nothing. The Google Calendar API is free at this volume.

---

## Quick reference: all variables

| Variable | Production | Test (previews, staging) |
|---|---|---|
| `GOOGLE_CLIENT_EMAIL` | robot email | same |
| `GOOGLE_PRIVATE_KEY` | robot key | same |
| `GOOGLE_CALENDAR_ID` | Antarshanti Bookings ID | Antarshanti TEST ID |
| `GOOGLE_CALENDAR_ENV` | `production` | `test` |
