# Changing the database safely (two databases, one process)

| | Project | Used by | Contains |
|---|---|---|---|
| **Test** | `antarshanti-test` (`rnofqxmfwqiogtlchkbp`), Mumbai | staging, branch and pull-request test addresses, local previews | sample data only |
| **Production** | `antarshanti-prod` (`kntohzyxzoucymrmriva`), Mumbai | antarshanti.co.in | real customers |

The website picks the database automatically: the `main` build uses production, every other build uses test (`src/_data/env.js`). The server functions are also locked: a test address cannot write to production, and production refuses to run against test (`netlify/functions/lib/env.js`).

## The rule: test first, production second, same file both times
1. **Write the change** as a new numbered file in `supabase/migrations/` (for example `20261201000003_add_waitlist.sql`). Make it safe to run twice (`if not exists`, `drop policy if exists`). Every new table gets `enable row level security` in the same file.
2. **Apply it to TEST.** Ask me ("apply migration 3 to test"), or paste it in Supabase → test project → SQL Editor.
3. **Check TEST.** Run Supabase's security advisor on test. Use the staging site and confirm the feature works with sample data.
4. **Merge** the website change that needs it (staging → main).
5. **Apply the same file to PRODUCTION.** Same file, unchanged. Run the security advisor on production.
6. **Order matters when a change removes something.** Add first, deploy the site that stops using the old thing, remove last.

If the two databases ever disagree, the files in `supabase/migrations/` win: compare the table lists in both projects with the files and re-apply what is missing.

## What never moves between the two
- Real customer rows stay in production only. Never copy production rows into test.
- The test database may be wiped and reseeded at any time.
- Secret (service_role) keys are different for each project and live only in Netlify.

## When traffic grows
Free plan limits to watch (Supabase → Reports; Netlify → Usage): database 500 MB, Netlify credits (300 per month, a production deploy costs 15). If you run ads at scale, move **production only** to Supabase Pro (about USD 25 a month: daily backups, no pausing, more capacity). The test project can stay free. Take a manual export of `checkin_responses` before any large campaign.
