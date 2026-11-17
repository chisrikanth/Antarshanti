-- Remember which Google Calendar event belongs to a booking (so it is never created twice).
alter table bookings add column if not exists calendar_event_id text;
