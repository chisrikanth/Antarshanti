-- Antarshanti check-in database. Safe to run more than once.
-- Supabase dashboard -> SQL Editor -> New query -> paste all of this -> Run.

-- 1. Base table (from the original check-in setup)
create table if not exists checkin_responses (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  submitted_at timestamptz,
  name text,
  phone text,
  email text,
  consent boolean default true,
  crisis_flag boolean default false,
  overall_score int,
  anxiety_score int,           anxiety_percent int,
  depression_score int,        depression_percent int,
  mindfulness_score int,       mindfulness_percent int,
  self_esteem_score int,       self_esteem_percent int,
  emotion_regulation_score int, emotion_regulation_percent int,
  raw_answers jsonb
);

-- 2. Ad attribution + follow-up tracking (what makes ROI measurable)
alter table checkin_responses
  add column if not exists utm_source text,
  add column if not exists utm_medium text,
  add column if not exists utm_campaign text,
  add column if not exists utm_content text,
  add column if not exists utm_term text,
  add column if not exists gclid text,
  add column if not exists fbclid text,
  add column if not exists landing_page text,
  add column if not exists referrer text,
  add column if not exists suggested_path text,        -- happiness | bach | jyotish | support
  add column if not exists status text default 'new',  -- new | contacted | booked | paid | not_interested
  add column if not exists revenue_inr int,            -- fill in when they pay (Bach fee, Happiness fee, contribution)
  add column if not exists followup_notes text;

create index if not exists checkin_created_idx  on checkin_responses (created_at desc);
create index if not exists checkin_campaign_idx on checkin_responses (utm_source, utm_campaign);

-- 3. Lock the table down: only the service_role key (used by the Netlify function) can read/write.
alter table checkin_responses enable row level security;

-- 4. Views you will actually open in the Table Editor
-- 4a. Campaign scoreboard: leads and revenue per source/campaign (join this with your ad spend)
create or replace view campaign_scoreboard as
select
  coalesce(utm_source,'(none/organic)')   as source,
  coalesce(utm_campaign,'(none)')         as campaign,
  count(*)                                as leads,
  count(*) filter (where status in ('booked','paid')) as booked,
  count(*) filter (where status = 'paid') as paid,
  coalesce(sum(revenue_inr),0)            as revenue_inr
from checkin_responses
group by 1,2
order by leads desc;

-- 4b. Follow-up queue: crisis flags first, then newest unanswered leads
create or replace view followup_queue as
select id, created_at, crisis_flag, name, phone, email, suggested_path, utm_source, utm_campaign, status
from checkin_responses
where status = 'new'
order by crisis_flag desc, created_at desc;
