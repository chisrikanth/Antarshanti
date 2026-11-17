# Payments and prices

## How a Bach booking now works
1. The visitor picks a slot and presses Pay. The browser tells the server only **which service** and the slot label.
2. The server (`create-order`) looks up the price in the database table `services`, creates the Razorpay order for exactly that amount, and records it in `payments` as `created`. Any amount the browser might send is ignored.
3. Razorpay Checkout opens with that order. The visitor pays.
4. Razorpay calls the **webhook** (`razorpay-webhook`). It checks Razorpay's signature, then marks the payment `paid` and stores the amount actually captured. If that amount differs from the expected price, it is logged as `AMOUNT MISMATCH`.
5. The page also verifies the signature (`verify-payment`) so the visitor sees "Payment confirmed" straight away.

If the database cannot be reached, the server falls back to the default price in `netlify/functions/lib/db.js` (currently 1,000) so bookings still work.

## Change a price without deploying
Supabase → **production project** (`antarshanti-prod`) → Table Editor → `services` → edit `amount_inr` on the `bach_consultation` row (whole rupees). To take a service offline for online booking, untick `active`.
- The server charges the new amount on the very next booking.
- The prices shown on the pages update on the next page load.
- Not updated until the next deploy: the browser tab title and Google snippet text ("₹1,000" in the page title and description) and the structured-data price. If you change the price for good, also update `src/bach.njk` (title, description) and `src/_data/ld/bach.json`.
- Do the same edit in the **test project** if you want staging to match.

## One-time setup of the webhook (Razorpay)
Do it twice: once in **Live mode** for production, once in **Test mode** for staging.
- Razorpay Dashboard → Account & Settings → Webhooks → Add new webhook.
- URL, production: `https://antarshanti.co.in/.netlify/functions/razorpay-webhook`
- URL, staging (test mode): `https://staging--aquamarine-croquembouche-26e205.netlify.app/.netlify/functions/razorpay-webhook`
- Active events: `payment.captured`, `order.paid`, `payment.failed`.
- Secret: choose a long random text; put the same text in Netlify as `RAZORPAY_WEBHOOK_SECRET` for the matching deploy context.

## Looking at payments
Supabase → Table Editor → `payments`. `status` is `created` (started), `paid` or `failed`. A `created` row that stays that way means the visitor did not finish paying.

## Still not done (honest list)
- The booking slot is not reserved server-side: two people can pick the same slot. Slot holding needs an availability table.
- Receipts and confirmation emails or WhatsApp messages are not sent automatically.
