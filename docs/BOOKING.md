# Booking and slot reservation

## What a visitor experiences
- The calendar only offers times from Srikanth's weekly schedule that are still free. Taken times are greyed and cannot be clicked. Times less than 2 hours away, or more than 45 days ahead, are not offered.
- **Bach (paid):** pressing *Pay* holds the slot for 15 minutes while they pay. If payment succeeds, the Razorpay webhook turns the hold into a confirmed booking. If they abandon, the hold expires and the time is free again.
- **Jyotish (contribution based):** after choosing a time they enter a name and WhatsApp number (with a consent tick). The slot is held as `requested` until Srikanth confirms by WhatsApp. One number may hold at most two open requests.
- One calendar for everything: a time taken by Jyotish is not available for Bach and the other way round.

## How double booking is prevented
The database itself refuses a second live booking for the same time (a unique rule on `bookings`), so even two people clicking in the same second cannot both succeed. The browser is only a convenience; the server checks the schedule, lead time and availability on every request.

## What you control (Supabase, production project, Table Editor, no deploy)
| Table | Use |
|---|---|
| `availability_rules` | Your weekly times (weekday 0 = Sunday to 6 = Saturday, `start_time` in India time). Add a row to open a time; untick `active` to close it. |
| `slot_blocks` | Add a date to block a whole day (travel, festival). Delete the row to reopen. |
| `bookings` | Every hold and booking. View `upcoming_bookings` is the easy list. To cancel, set `status` to `cancelled` and the time becomes free again. |
| `services` | Prices (see `docs/PAYMENTS-AND-PRICES.md`). |

`bookings.status`: `held` (paying, expires in 15 min), `requested` (Jyotish, awaiting you), `booked` (paid), `cancelled`, `expired`, `conflict` (see below).

## Rare edge case
If someone pays after their 15 minute hold expired and another person took the time, the booking is marked `conflict`. You will see it in `upcoming_bookings`: refund in Razorpay or move them to another time.

## Still manual (honest list)
- No automatic confirmation or reminder messages, and no notification to you when a booking arrives.
- Cancelling in Supabase frees the slot but does not refund or message the visitor.
- Calendar sync (Google Calendar) is proposed, not built.
