// netlify/functions/reserve-slot.js  (POST)
// For contribution-based sessions (Jyotish): no payment, so we ask for a name and WhatsApp number
// (with consent) and hold the slot until Srikanth confirms. Paid sessions reserve inside create-order.
const { config, rest } = require('./lib/db');
const { loadSchedule, checkSlot, reserve } = require('./lib/booking');

const SERVICES = new Set(['jyotish_consultation']);
const json = (statusCode, obj) => ({ statusCode, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(obj) });

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') return json(405, { error: 'Method not allowed' });
  let p; try { p = JSON.parse(event.body || '{}'); } catch (e) { return json(400, { error: 'Invalid request.' }); }

  if (p.website) return json(200, { ok: true });                        // honeypot: bots fill hidden fields
  const service = String(p.service || '');
  if (!SERVICES.has(service)) return json(400, { error: 'Unknown service.' });
  const name = String(p.name || '').trim();
  const phone = String(p.phone || '').replace(/[\s\-()]/g, '');
  if (name.length < 2 || name.length > 80) return json(400, { error: 'Please enter your name.' });
  if (!/^\+?\d{10,13}$/.test(phone)) return json(400, { error: 'Please enter a valid WhatsApp number.' });
  if (p.consent !== true) return json(400, { error: 'Please tick the box so Srikanth may contact you about this booking.' });

  const cfg = config(event);
  if (!cfg) return json(503, { error: 'Online booking is not available right now. Please message Srikanth on WhatsApp.' });

  const schedule = await loadSchedule(cfg);
  const check = checkSlot(p.slot_start, schedule);
  if (!check.ok) return json(check.status, { error: check.error });

  // Light protection against someone hoarding slots: at most 2 open requests per number.
  try {
    const open = await rest(cfg, `bookings?select=id&status=eq.requested&contact_phone=eq.${encodeURIComponent(phone)}&slot_start=gte.${encodeURIComponent(new Date().toISOString())}`);
    if (open.ok && (await open.json()).length >= 2) return json(429, { error: 'You already have two open requests. Please message Srikanth on WhatsApp to change them.' });
  } catch (e) { console.error('limit check:', e.message); }

  const r = await reserve(cfg, { service_key: service, slot_start: check.date.toISOString(), status: 'requested', contact_name: name, contact_phone: phone, consent: true });
  if (r.taken) return json(409, { error: 'Sorry, that time was just taken. Please pick another.' });
  if (r.error) { console.error(r.error); return json(502, { error: 'Could not hold the slot. Please try again or message Srikanth on WhatsApp.' }); }
  return json(200, { ok: true, id: r.id });
};
