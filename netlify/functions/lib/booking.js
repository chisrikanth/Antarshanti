// Slot rules + reservation. A slot is an instant (ISO string with +05:30). One calendar for everything:
// only one live booking (held / requested / booked) may exist for any instant.
const { rest } = require('./db');
const gcal = require('./gcal');

const HOLD_MINUTES = 15;          // how long a slot is held while the visitor pays
const MIN_LEAD_MINUTES = 120;     // cannot book a slot starting sooner than this
const MAX_DAYS_AHEAD = 45;

// Used only if the schedule table cannot be read (keeps booking possible during an outage).
const DEFAULT_RULES = { 1: ['09:00','10:00','11:00','17:00','18:00','19:00'], 3: ['09:00','10:00','11:00','17:00','18:00','19:00'],
                        5: ['09:00','10:00','11:00','12:00','17:00','18:00'], 6: ['09:00','10:00','11:00','15:00','16:00','17:00'] };

// India has no daylight saving: IST is always UTC+5:30, so we can compute without a timezone library.
function istParts(date) {
  const d = new Date(date.getTime() + 330 * 60000);
  const p = (n) => String(n).padStart(2, '0');
  return { ymd: `${d.getUTCFullYear()}-${p(d.getUTCMonth() + 1)}-${p(d.getUTCDate())}`, weekday: d.getUTCDay(), hm: `${p(d.getUTCHours())}:${p(d.getUTCMinutes())}` };
}

async function weeklySchedule(cfg) {
  if (!cfg) return { mode: 'weekly', rules: DEFAULT_RULES, blocked: [], fromDb: false };
  try {
    const [r, b] = await Promise.all([
      rest(cfg, 'availability_rules?select=weekday,start_time&active=eq.true&order=weekday,start_time'),
      rest(cfg, 'slot_blocks?select=block_date&active=eq.true')
    ]);
    if (!r.ok || !b.ok) throw new Error('schedule read ' + r.status + '/' + b.status);
    const rules = {};
    (await r.json()).forEach((x) => { (rules[x.weekday] = rules[x.weekday] || []).push(String(x.start_time).slice(0, 5)); });
    return { mode: 'weekly', rules, blocked: (await b.json()).map((x) => x.block_date), fromDb: true };
  } catch (e) {
    console.error('schedule fallback:', e.message);
    return { mode: 'weekly', rules: DEFAULT_RULES, blocked: [], fromDb: false };
  }
}

// If the Google calendar is configured and readable, IT decides availability (calendar always wins).
// If it is configured but cannot be read right now, fall back to the weekly schedule so booking keeps working
// (the database still prevents any double booking).
async function loadSchedule(cfg, event) {
  const c = event ? gcal.enabled(event) : null;
  if (c) {
    try {
      const now = Date.now();
      const { open, busy } = await gcal.readCalendar(c, now, now + (MAX_DAYS_AHEAD + 1) * 86400000);
      return { mode: 'calendar', fromDb: true, slotSet: gcal.openSlotStarts(open, busy, [], now, gcal.SLOT_MINUTES), blocked: [], rules: {} };
    } catch (e) { console.error('calendar unreadable, using weekly schedule:', e.message); }
  }
  return weeklySchedule(cfg);
}

// Returns { ok:true, date } or { ok:false, status, error }
function checkSlot(slotIso, schedule, now) {
  now = now || new Date();
  const date = new Date(slotIso);
  if (!slotIso || typeof slotIso !== 'string' || isNaN(date)) return { ok: false, status: 400, code: 'choose_slot', error: 'Please choose a time slot.' };
  const t = istParts(date);
  if (date.getUTCSeconds() !== 0) return { ok: false, status: 400, code: 'invalid_slot', error: 'That is not a valid time slot.' };
  if (schedule.mode === 'calendar') { if (!schedule.slotSet.has(date.getTime())) return { ok: false, status: 400, code: 'not_open', error: 'That time is not open for booking. Please pick one of the available times.' }; }
  else if (!(schedule.rules[t.weekday] || []).includes(t.hm)) return { ok: false, status: 400, code: 'not_open', error: 'That is not one of Srikanth\'s available times.' };
  if (schedule.blocked.includes(t.ymd)) return { ok: false, status: 409, code: 'day_blocked', error: 'Srikanth is not available on that day. Please pick another.' };
  if (date.getTime() < now.getTime() + MIN_LEAD_MINUTES * 60000) return { ok: false, status: 400, code: 'too_soon', error: 'That time is too soon to book online. Please pick a later slot, or message Srikanth on WhatsApp.' };
  if (date.getTime() > now.getTime() + MAX_DAYS_AHEAD * 86400000) return { ok: false, status: 400, code: 'too_far', error: 'That date is too far ahead to book yet.' };
  return { ok: true, date };
}

async function expireHolds(cfg) {
  try {
    await rest(cfg, `bookings?status=eq.held&hold_expires_at=lt.${encodeURIComponent(new Date().toISOString())}`, { method: 'PATCH', body: JSON.stringify({ status: 'expired' }) });
  } catch (e) { console.error('expireHolds:', e.message); }
}

// Try to take the slot. Returns { ok:true, id } | { taken:true } | { error }
async function reserve(cfg, row) {
  await expireHolds(cfg);
  let res;
  try { res = await rest(cfg, 'bookings', { method: 'POST', headers: { Prefer: 'return=representation' }, body: JSON.stringify(row) }); }
  catch (e) { return { error: 'reserve network error ' + e.message }; }
  if (res.status === 409) return { taken: true };                 // unique index: someone holds it
  if (!res.ok) { const txt = await res.text(); if (/23505|duplicate key/i.test(txt)) return { taken: true }; return { error: 'reserve failed ' + res.status + ' ' + txt.slice(0, 120) }; }
  const [created] = await res.json();
  return { ok: true, id: created.id };
}

async function release(cfg, id) {
  try { await rest(cfg, `bookings?id=eq.${encodeURIComponent(id)}`, { method: 'PATCH', body: JSON.stringify({ status: 'cancelled' }) }); } catch (e) { console.error('release:', e.message); }
}

// Instants (ISO) that are currently unavailable, for the next MAX_DAYS_AHEAD days.
async function takenSlots(cfg) {
  await expireHolds(cfg);
  const from = encodeURIComponent(new Date().toISOString());
  const res = await rest(cfg, `bookings?select=slot_start&status=in.(held,requested,booked)&slot_start=gte.${from}`);
  if (!res.ok) throw new Error('taken read ' + res.status);
  return (await res.json()).map((x) => new Date(x.slot_start).toISOString());
}

// Best effort: put a confirmed/requested booking on the Antarshanti Bookings calendar.
async function addToCalendar(event, cfg, booking, summary, description) {
  const c = gcal.enabled(event);
  if (!c || !booking || booking.calendar_event_id) return null;
  try {
    const id = await gcal.createEvent(c, { summary, description, startIso: booking.slot_start, bookingId: booking.id });
    if (cfg && booking.id) await rest(cfg, `bookings?id=eq.${encodeURIComponent(booking.id)}`, { method: 'PATCH', body: JSON.stringify({ calendar_event_id: id }) });
    return id;
  } catch (e) { console.error('calendar event not created:', e.message); return null; }
}

module.exports = { addToCalendar, weeklySchedule, HOLD_MINUTES, MIN_LEAD_MINUTES, MAX_DAYS_AHEAD, DEFAULT_RULES, istParts, loadSchedule, checkSlot, reserve, release, takenSlots, expireHolds };
