-- OPTIONAL "no-deploy" mode for dates, links, announcement and testimonials.
-- Edit rows in the Supabase Table Editor (works from a phone browser) and the live
-- site shows them on the next page load. No GitHub commit, no Netlify deploy.
-- Until you fill AS_SUPABASE in assets/content.js, the site uses data/site.json instead.
--
-- Public visitors can READ only what is meant to be public. They can never write.
-- Run in Supabase -> SQL Editor. Safe to run more than once.

create table if not exists batches (
  id uuid primary key default gen_random_uuid(),
  date_label text not null,          -- "Thu 3 – Sun 6 Dec 2026"
  time_label text,                   -- "Evening · 6:00–8:30 PM IST"
  mode text,                         -- "Online (Zoom)"
  language text,
  seats text,
  fee_label text,                    -- "By donation to the Art of Living Foundation"
  register_url text,                 -- the Art of Living registration link
  starts_on date,
  ends_on date,                      -- batch disappears the day after this date
  active boolean not null default true,
  sort int not null default 0
);
alter table batches enable row level security;
drop policy if exists "public reads live batches" on batches;
create policy "public reads live batches" on batches for select to anon
  using (active and (ends_on is null or ends_on >= current_date));

create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  page text not null check (page in ('home','jyotish','bach','happiness')),
  quote text not null,
  name text, role text, city text,
  source text, source_url text,
  consent_on_file boolean not null default false,   -- tick only when you hold written consent
  approved boolean not null default false,
  sort int not null default 0
);
alter table testimonials enable row level security;
drop policy if exists "public reads approved testimonials" on testimonials;
create policy "public reads approved testimonials" on testimonials for select to anon
  using (approved and consent_on_file);

create table if not exists site_settings (
  key text primary key,              -- 'announcement' or 'links'
  value jsonb not null
);
alter table site_settings enable row level security;
drop policy if exists "public reads settings" on site_settings;
create policy "public reads settings" on site_settings for select to anon using (true);

-- Example rows (edit or delete):
-- insert into site_settings values ('announcement','{"text":"Next Happiness Program: Thu 3 Dec, online","linkText":"Register","href":"https://aolt.in/XXXXXXX"}');
-- insert into site_settings values ('links','{"whatsapp":"919985133161"}');
