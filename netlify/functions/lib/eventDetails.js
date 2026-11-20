// What Srikanth sees inside a booking's calendar event: everything he needs to prepare, so he does not
// have to open the database or Razorpay. Plain text (Google Calendar shows line breaks and makes links tappable).
const LANGS = { en: 'English', te: 'Telugu', hi: 'Hindi' };
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// A number typed without a country code is taken as an Indian number; spaces and dashes are removed.
function normalizePhone(raw) {
  let p = String(raw || '').replace(/[\s\-()]/g, '');
  if (/^\d{10}$/.test(p)) p = '+91' + p; else if (/^91\d{10}$/.test(p)) p = '+' + p;
  return p;
}
const waLink = (phone) => { const d = String(phone || '').replace(/\D/g, ''); return d ? `https://wa.me/${d}` : ''; };

// "Mon, 23 Nov 2026, 9:00 AM IST" (India time, no daylight saving)
function whenIst(isoOrMs) {
  const d = new Date(new Date(isoOrMs).getTime() + 330 * 60000);
  if (isNaN(d)) return '';
  const h = d.getUTCHours(), ap = h >= 12 ? 'PM' : 'AM', h12 = h % 12 || 12;
  return `${DAYS[d.getUTCDay()]}, ${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}, ${h12}:${String(d.getUTCMinutes()).padStart(2, '0')} ${ap} IST`;
}
const clean = (s, n) => String(s == null ? '' : s).replace(/[\r\n]+/g, ' ').trim().slice(0, n || 200);
const line = (k, v) => (v ? `${k}: ${v}` : null);

// Jyotish request (contribution based, confirmed by Srikanth on WhatsApp)
function jyotishEvent(b) {
  const phone = normalizePhone(b.phone), name = clean(b.name, 80);
  return {
    summary: `Jyotish: ${name} (requested)`,
    description: [
      line('Name', name),
      line('WhatsApp', phone),
      line('Chat', waLink(phone)),
      line('Service', 'Jyotish consultation, 60 minutes (no fixed fee; contribution after the session)'),
      line('When', whenIst(b.slotStart)),
      'Status: REQUESTED. Message them on WhatsApp to confirm (promised within 24 hours). They will send birth date, exact time and place there.',
      line('Page language', LANGS[b.lang] || null),
      line('Booking ID', clean(b.bookingId, 60)),
      line('Requested on', whenIst(Date.now()))
    ].filter(Boolean).join('\n')
  };
}

// Bach Flower consultation, paid through Razorpay (contact details come from the Razorpay payment)
function bachEvent(b) {
  const phone = normalizePhone(b.contact), name = clean(b.name, 80);
  return {
    summary: `Bach Flower consultation (paid)${name ? ': ' + name : ''}`,
    description: [
      line('Name', name || '(not given)'),
      line('Phone / WhatsApp', phone),
      line('Chat', waLink(phone)),
      line('Email', clean(b.email, 120)),
      line('Service', 'Bach Flower consultation, 60 minutes'),
      line('When', whenIst(b.slotStart)),
      `Status: PAID and confirmed${b.amountInr ? ` (Rs ${Number(b.amountInr).toLocaleString('en-IN')}${b.method ? ' via ' + clean(b.method, 20).toUpperCase() : ''})` : ''}. Ask how they have been feeling before the session; the remedy bottle, if wanted, is billed separately.`,
      line('Razorpay order', clean(b.orderId, 60)),
      line('Razorpay payment', clean(b.paymentId, 60)),
      line('Slot chosen on the page', clean(b.slotLabel, 120)),
      line('Page language', LANGS[b.lang] || null),
      line('Booking ID', clean(b.bookingId, 60))
    ].filter(Boolean).join('\n')
  };
}

module.exports = { normalizePhone, waLink, whenIst, jyotishEvent, bachEvent, LANGS };
