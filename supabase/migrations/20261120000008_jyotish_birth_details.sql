-- Jyotish bookings now collect birth details on the page (instead of asking people to send them on WhatsApp).
-- Stored as one private JSON value on the booking: { dob, tob, tob_unknown, tob_approx, pob, gender, focus }.
-- Only the server (service key) can read or write bookings; visitors never can.
alter table bookings add column if not exists birth_details jsonb;

create or replace view upcoming_bookings with (security_invoker = true) as
select slot_start at time zone 'Asia/Kolkata' as slot_ist, service_key, status, contact_name, contact_phone, razorpay_order_id, hold_expires_at, created_at, id, birth_details
from bookings
where status in ('held','requested','booked','conflict') and slot_start >= now() - interval '1 day'
order by slot_start;
