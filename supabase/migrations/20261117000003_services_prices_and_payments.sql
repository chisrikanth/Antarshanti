-- Prices live in the database so they can be changed without a deploy, and the SERVER (never the
-- browser) decides what a booking costs. Payments are recorded by the Razorpay webhook.

create table if not exists services (
  key text primary key,                      -- e.g. 'bach_consultation'
  name text not null,
  amount_inr int not null check (amount_inr > 0),
  active boolean not null default true,
  updated_at timestamptz not null default now()
);
alter table services enable row level security;
drop policy if exists "public reads active services" on services;
create policy "public reads active services" on services for select to anon using (active);

insert into services (key, name, amount_inr)
values ('bach_consultation', 'Bach Flower consultation', 1000)
on conflict (key) do nothing;

create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  razorpay_order_id text not null unique,
  razorpay_payment_id text unique,
  service_key text,
  amount_inr int,                            -- what the server expected (from services)
  paid_amount_inr int,                       -- what Razorpay says was captured
  status text not null default 'created' check (status in ('created','paid','failed')),
  slot_label text,
  notes jsonb
);
alter table payments enable row level security;   -- no policies: server (service_role) only
create index if not exists payments_status_idx on payments (status, created_at desc);
