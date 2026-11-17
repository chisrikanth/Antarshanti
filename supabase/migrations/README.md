# Database migrations (the single source of truth)

Every change to the database is a numbered `.sql` file here. Numbers only go up. Never edit a file that has already been applied; add a new one.

| File | What it does |
|---|---|
| `20261117000001_checkin_responses_with_attribution.sql` | Check-in table (private), campaign columns, reporting views |
| `20261117000002_site_content_public_read.sql` | `batches`, `testimonials`, `site_settings` with public read-only rules |

Both databases (`antarshanti-test` and `antarshanti-prod`) have both files applied. See `docs/DATABASE-CHANGES.md` for how to make the next change safely.
