-- Which language the person used, so Srikanth can reply in it.
alter table checkin_responses add column if not exists language text;
