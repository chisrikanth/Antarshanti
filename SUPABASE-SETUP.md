# Check-in survey: Supabase + Netlify setup (about 15 minutes)

The check-in lives at `/checkin`. It posts to a Netlify function (`submit-checkin`), which writes to Supabase.
The browser never talks to Supabase, so no database key is ever public.

## 1. Create the Supabase project
1. Go to <https://supabase.com> and sign in with GitHub.
2. **New project**. Name it `antarshanti`. Set a strong database password and save it in your password manager.
3. Region: **Mumbai (ap-south-1)**. It is closest to your visitors.
4. Wait about 2 minutes for it to finish provisioning.

## 2. Create the tables and views
1. In the project, open **SQL Editor** and click **New query**.
2. Paste the whole of [`supabase/checkin.sql`](supabase/checkin.sql) and click **Run**. It is safe to run again later.
3. Open **Table Editor**. You should see `checkin_responses`, plus two views:
   `campaign_scoreboard` and `followup_queue`.

If you already created the table from the earlier setup, the same script just adds the new columns.

## 3. Copy the two keys
**Project Settings → API**:
- `Project URL` becomes `SUPABASE_URL`.
- `service_role` secret key becomes `SUPABASE_SERVICE_KEY`.

The service_role key has full access. It goes only into Netlify, never into a file in this repo.

## 4. Add them to Netlify
**Netlify → Site configuration → Environment variables → Add a variable** (the same place as the Razorpay keys):

| Key | Value |
|---|---|
| `SUPABASE_URL` | `https://xxxxxxxx.supabase.co` |
| `SUPABASE_SERVICE_KEY` | the service_role key |

Then **Deploys → Trigger deploy → Deploy site**. Variables only apply to new deploys.

## 5. Deploy this branch
Merge the branch to `main` (or use a Netlify deploy preview on the branch first). Confirm the deploy log lists three functions:
`create-order`, `verify-payment`, `submit-checkin`.

## 6. Test
1. Open `https://antarshanti.co.in/checkin?utm_source=test&utm_campaign=setup`.
2. Complete it and press **Save My Results** with a test phone number.
3. In Supabase **Table Editor → checkin_responses** a row appears with `utm_source = test`, `suggested_path` filled in.
4. If it does not: Netlify → **Functions → submit-checkin → Logs**. Missing env vars is the usual cause.
   The function still saves a row without the campaign columns if the SQL step was skipped, so nothing is lost.

## 7. Daily use
- **`followup_queue`** view: new leads, crisis flags first. Contact every `crisis_flag = true` row personally and promptly.
- When you speak to someone, edit the row: `status` = `contacted`, `booked` or `paid`; add `revenue_inr` when they pay; add `followup_notes`.
- **`campaign_scoreboard`** view: leads, booked, paid and revenue per source and campaign. Divide each campaign's ad spend by its `paid` count to get cost per paying client. This is your ROI number.

## Privacy notes
- Row Level Security is on with no policies, so the public anon key cannot read anything.
- The page tells people their details are stored only with consent and only if they press Save. Keep it that way.
- Stored attribution is only the campaign tags in the URL, the landing page and the referrer domain.
