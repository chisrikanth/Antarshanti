# Policy pages: decisions Srikanth must confirm

Pages: `privacy.html`, `terms.html`, `refund.html` (all currently `noindex`, last-updated date 1 Nov 2026).

Not legal advice — have a qualified person review before publishing; then remove noindex.

## Checklist

### Privacy
- [ ] **Retention (proposal).** Saved check-in responses kept up to 12 months unless the person asks for earlier deletion. Payment order/payment IDs kept as long as needed for refunds, accounts and legal reasons (no fixed number written). WhatsApp chats kept until deletion is requested or Srikanth clears them. Confirm or change each.
- [ ] **Contact email.** email: to be added. Pages currently say contact via WhatsApp or phone only. Decide whether to add one.
- [ ] **Grievance officer name.** Not named on the pages (they say "contact us" via WhatsApp/phone, Srikanth is the data fiduciary). Decide whether to name a grievance contact and a response time. No response time is promised on the pages.
- [ ] **What is stored without pressing Save?** The privacy page says check-in answers and scores are stored if the visitor chooses Save. Confirm nothing is stored from the check-in before that point.
- [ ] **Analytics tools.** The page says the site "may use" Google Analytics, Meta Pixel or Plausible, only if configured. Decide which (if any) will really be used, then edit the list to match.
- [ ] **Cookie / consent banner.** If Google Analytics or Meta Pixel is switched on, decide whether a cookie/consent banner is needed and whether the tools should load only after consent. Plausible without cookies may not need one. Take advice.
- [ ] **Supabase region.** Deliberately not named on the page. Check where the project is hosted and decide whether to say so (cross-border transfer wording may be needed).
- [ ] **Data Protection Board mention.** The page says a person may complain to the Data Protection Board of India if not satisfied. Confirm the wording with your reviewer.
- [ ] **Children.** Wording says the site is not directed at under-18s and that Bach for children is booked by a parent/guardian who consents. Confirm this matches practice.
- [ ] **Crisis numbers.** Tele-MANAS 14416, KIRAN 1800-599-0019, emergency 112. Re-check they are current before publishing.

### Refunds (proposed defaults, written into `refund.html` as firm numbers)
- [ ] **Srikanth must confirm every number:** full refund if cancelled 24+ hours before the slot; one free reschedule; no refund after the session has taken place; refunds to the original payment method within 5-7 working days.
- [ ] **Extra proposals added by the writer, not in the brief:** (a) if Srikanth cancels or cannot hold a session, the client may choose a full refund or a new slot at no charge; (b) damaged remedy bottle: ask for a photo and report soon after arrival, with no fixed deadline. Keep, change or delete.
- [ ] **Razorpay expects a published refund policy** on the site. Publish this page (remove `noindex`, link it from the footer on all pages) before relying on Razorpay live payments.
- [ ] **Jyotish.** Contribution is voluntary with no refund process; mistaken contributions can be raised by contacting us. Confirm.
- [ ] **Happiness Program.** Payments go to Art of Living; their policy applies. Confirm that the wording is acceptable to Art of Living.

### Terms
- [ ] **Governing law and courts.** Written as the laws of India, courts at Hyderabad. Confirm.
- [ ] **Liability clause.** Generic "as far as law allows" wording. Have a reviewer check it.
- [ ] **Slot times** are stated as IST. Confirm.
- [ ] **Late arrival / no-show rules** are not written. Decide whether to add them.

### Site housekeeping (before publishing)
- [ ] Remove `<meta name="robots" content="noindex">` from the three pages after review.
- [ ] `sitemap.xml` did not exist in the repo, so it was created with only these three URLs. It lists noindex pages, which search tools may flag. Rebuild it with the main pages when you remove noindex, and add a `Sitemap:` line to robots.txt if you have one.
- [ ] Add Privacy / Terms / Refunds links to the footers of `index.html`, `jyotish.html`, `bach.html`, `happiness.html` (only the new pages have them now), and link the policies near the Razorpay payment button.
- [ ] `assets/site.css`, `assets/theme.css` and `assets/site.js` do not exist yet. The pages work without them. The new pages already contain the same inline mobile-menu script as `jyotish.html`; if `site.js` later binds the same nav toggle, remove one of them or the menu will open and close at once.
- [ ] The mobile bottom bar "Book a session" button on the new pages points to `jyotish.html#booking-widget` (the original anchor does not exist on these pages).
- [ ] The `/checkin` page is mentioned in text only (not linked), since it is not in this repo.
