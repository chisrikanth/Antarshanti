-- Slot reservation. One practitioner = one calendar: a time can be taken by only ONE booking,
-- whichever service it is for. All three tables are private (server only); the public site reads
-- availability through the `slots` Netlify function, never straight from these tables.

-- Weekly schedule (edit rows to change when Srikanth is available; times are India time).
create table if not exists availability_rules (
  id uuid primary key default gen_random_uuid(),
  weekday smallint not null check (weekday between 0 and 6),   -- 0 = Sunday ... 6 = Saturday
  start_time time not null,
  active boolean not null default true,
  unique (weekday, start_time)
);
alter table availability_rules enable row level security;

-- Whole days off (travel, festivals). Add a row to block a date; remove it to reopen.
create table if not exists slot_blocks (
  id uuid primary key default gen_random_uuid(),
  block_date date not null unique,
  active boolean not null default true
);
alter table slot_blocks enable row level security;

create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  service_key text not null,
  slot_start timestamptz not null,
  status text not null check (status in ('held','requested','booked','cancelled','expired','conflict')),
  hold_expires_at timestamptz,                -- only for 'held' (payment in progress)
  razorpay_order_id text,
  contact_name text,
  contact_phone text,
  consent boolean,
  notes text
);
alter table bookings enable row level security;
-- The guarantee: no two live bookings may share a time, even under simultaneous clicks.
create unique index if not exists bookings_one_live_per_slot on bookings (slot_start) where status in ('held','requested','booked');
create index if not exists bookings_order_idx on bookings (razorpay_order_id);
create index if not exists bookings_slot_idx on bookings (slot_start);

-- What Srikanth looks at in the Table Editor.
create or replace view upcoming_bookings with (security_invoker = true) as
select slot_start at time zone 'Asia/Kolkata' as slot_ist, service_key, status, contact_name, contact_phone, razorpay_order_id, hold_expires_at, created_at, id
from bookings
where status in ('held','requested','booked','conflict') and slot_start >= now() - interval '1 day'
order by slot_start;

-- Starting schedule (same as the old fixed list on the pages).
insert into availability_rules (weekday, start_time) values
  (1,'09:00'),(1,'10:00'),(1,'11:00'),(1,'17:00'),(1,'18:00'),(1,'19:00'),
  (3,'09:00'),(3,'10:00'),(3,'11:00'),(3,'17:00'),(3,'18:00'),(3,'19:00'),
  (5,'09:00'),(5,'10:00'),(5,'11:00'),(5,'12:00'),(5,'17:00'),(5,'18:00'),
  (6,'09:00'),(6,'10:00'),(6,'11:00'),(6,'15:00'),(6,'16:00'),(6,'17:00')
on conflict (weekday, start_time) do nothing;
