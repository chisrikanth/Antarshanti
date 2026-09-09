# Antarshanti — deploy notes

## Before you push, do these three things

### 1. Razorpay live key
`bach.html`, in the booking script:

    var RAZORPAY_KEY_ID = "rzp_test_TCXqDTmr8xIpNV";  // ← swap for rzp_live_...

Replace with your live Key ID once KYC clears. The Key ID is public and belongs
in the page. **The Key Secret never goes in a file.** It goes only in Netlify:

    Site settings → Environment variables
      RAZORPAY_KEY_ID      = rzp_live_xxxxxxxx
      RAZORPAY_KEY_SECRET  = (from the Razorpay dashboard)

Both are read by `netlify/functions/create-order.js` and `verify-payment.js`.
Those functions must exist in the repo — a drag-and-drop deploy ignores them,
which is what broke payments last time. Push through GitHub.

### 2. Your UPI ID
`jyotish.html`, top of the booking script:

    var UPI_ID = "REPLACE-WITH-YOUR-UPI-ID";   // e.g. srikanth@ybl

This powers the "Open my UPI app" button, which is what most visitors will use —
they are already on the phone they would otherwise have to scan the QR with.

### 3. PhonePe QR image
Save it as `assets/phonepe-qr.png`. Until it exists, the QR hides itself
automatically and the UPI button carries the panel.

## Push

    git add .
    git commit -m "New logo, contribution model for Jyotish, Razorpay on Bach, curated resources"
    git push

Netlify rebuilds on push. Confirm the deploy log lists the two functions.

## Test before announcing

- Razorpay in test mode: card 4111 1111 1111 1111, any future expiry, any CVV.
- Tap "Open my UPI app" on an actual phone — desktop browsers ignore `upi://`.
- Check the favicon: it is an inline data URI, so hard-refresh to see it.

## Mobile

The site now has a real mobile layer:

- **Working navigation.** Previously the nav links were simply hidden below
  720px with nothing to replace them — there was no way to move between pages
  on a phone. There is now a hamburger button opening a slide-in menu, closed
  by tapping a link, the scrim, or Escape.
- **Sticky action bar** at the bottom of every page: the page's main action on
  the left, WhatsApp on the right, both inside thumb reach.
- **Decorative chart wheels tamed.** Those SVGs were 460–560px wide and
  absolutely positioned, which pushed the page sideways on a phone and caused
  horizontal scrolling. They now shrink and fade below 760px.
- Hero and section padding tightened, footer stacks, resource cards go single
  column, buttons become full width, and time slots reflow to two columns
  under 420px.

Test on a real phone, not just the browser's device emulator — the sticky bar
and `env(safe-area-inset-bottom)` behave differently on an actual iPhone.
