// Google Calendar integration (service account, no npm dependencies).
//
// The "Antarshanti Bookings" calendar is the source of truth for availability:
//   * An event whose title starts with "Open" (or "Available") is a window when Srikanth takes sessions.
//     Slots of SLOT_MINUTES are offered inside it, starting at the window's start time.
//   * Any OTHER timed event (travel, "Busy", a booking written by this site) blocks the slots it overlaps.
//   * An all-day event that is not "Open" blocks that whole day (India time).
//   * Events marked "Free" (transparent) are ignored.
// Srikanth's personal calendar is never read: only the calendar shared with the service account is.
//
// Netlify variables (value per deploy context):
//   GOOGLE_CLIENT_EMAIL   service account email
//   GOOGLE_PRIVATE_KEY    the "private_key" from the JSON key file
//   GOOGLE_CALENDAR_ID    the Antarshanti Bookings calendar (production) / the test calendar (previews)
//   GOOGLE_CALENDAR_ENV   the word  production  or  test  (a safety label, see enabled())
const crypto = require('crypto');
const { isProductionRequest } = require('./env');

const SLOT_MINUTES = 60;
const API = 'https://www.googleapis.com/calendar/v3';
const OPEN_TITLE = /^\s*(open|available)\b/i;

// The calendar is only used when fully configured AND the safety label matches the address
// (a test address can never write into the live calendar, and the reverse).
function enabled(event) {
  const email = process.env.GOOGLE_CLIENT_EMAIL, key = process.env.GOOGLE_PRIVATE_KEY, cal = process.env.GOOGLE_CALENDAR_ID, label = (process.env.GOOGLE_CALENDAR_ENV || '').trim().toLowerCase();
  if (!email || !key || !cal) return null;
  const wantProd = isProductionRequest(event);
  if ((wantProd && label !== 'production') || (!wantProd && label !== 'test')) {
    console.error(`calendar disabled: GOOGLE_CALENDAR_ENV is "${label || 'missing'}" but this address is ${wantProd ? 'production' : 'a test address'}`);
    return null;
  }
  return { email, key: key.replace(/\\n/g, '\n'), calendarId: cal };
}

const b64url = (b) => Buffer.from(b).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

let tokenCache = { token: null, exp: 0, email: '' };
async function accessToken(c) {
  if (tokenCache.token && tokenCache.email === c.email && Date.now() < tokenCache.exp - 60000) return tokenCache.token;
  const now = Math.floor(Date.now() / 1000);
  const claim = { iss: c.email, scope: 'https://www.googleapis.com/auth/calendar', aud: 'https://oauth2.googleapis.com/token', iat: now, exp: now + 3600 };
  const unsigned = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' })) + '.' + b64url(JSON.stringify(claim));
  const sig = b64url(crypto.createSign('RSA-SHA256').update(unsigned).sign(c.key));
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'grant_type=' + encodeURIComponent('urn:ietf:params:oauth:grant-type:jwt-bearer') + '&assertion=' + encodeURIComponent(unsigned + '.' + sig)
  });
  const j = await res.json();
  if (!res.ok || !j.access_token) throw new Error('google auth failed: ' + (j.error_description || j.error || res.status));
  tokenCache = { token: j.access_token, exp: Date.now() + (j.expires_in || 3600) * 1000, email: c.email };
  return tokenCache.token;
}

async function gfetch(c, path, init) {
  const token = await accessToken(c);
  const res = await fetch(API + path, { ...init, headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json', ...((init && init.headers) || {}) } });
  if (!res.ok) { const t = await res.text(); throw new Error(`google calendar ${res.status}: ${t.slice(0, 160)}`); }
  return res.status === 204 ? null : res.json();
}

// Pure: turn Google events into { open:[{start,end}], busy:[{start,end}] } (milliseconds)
function classify(events) {
  const open = [], busy = [];
  (events || []).forEach((e) => {
    if (e.status === 'cancelled' || e.transparency === 'transparent') return;
    const allDay = !!(e.start && e.start.date && !e.start.dateTime);
    let start, end;
    if (allDay) { start = new Date(e.start.date + 'T00:00:00+05:30').getTime(); end = new Date(e.end.date + 'T00:00:00+05:30').getTime(); }
    else if (e.start && e.start.dateTime) { start = new Date(e.start.dateTime).getTime(); end = new Date(e.end.dateTime).getTime(); }
    else return;
    if (isNaN(start) || isNaN(end) || end <= start) return;
    if (OPEN_TITLE.test(e.summary || '')) { if (!allDay) open.push({ start, end }); }   // an all-day "Open" has no hours, so it is ignored
    else busy.push({ start, end });
  });
  return { open, busy };
}

// Pure: every offered slot start (ms) = inside an Open window, not overlapping busy time or an existing booking.
function openSlotStarts(open, busy, takenMs, nowMs, minutes) {
  const len = (minutes || SLOT_MINUTES) * 60000, out = new Set(), taken = new Set(takenMs || []);
  open.forEach((w) => {
    for (let s = w.start; s + len <= w.end; s += len) {
      if (s < nowMs) continue;
      if (busy.some((b) => b.start < s + len && b.end > s)) continue;
      if (taken.has(s)) continue;
      out.add(s);
    }
  });
  return out;
}

async function listEvents(c, fromMs, toMs) {
  const q = new URLSearchParams({ timeMin: new Date(fromMs).toISOString(), timeMax: new Date(toMs).toISOString(), singleEvents: 'true', orderBy: 'startTime', maxResults: '250', showDeleted: 'false' });
  const data = await gfetch(c, `/calendars/${encodeURIComponent(c.calendarId)}/events?${q}`);
  return data.items || [];
}

let memo = { key: '', at: 0, value: null };
async function readCalendar(c, fromMs, toMs) {
  const key = c.calendarId + '|' + Math.floor(fromMs / 60000);
  if (memo.key === key && Date.now() - memo.at < 20000) return memo.value;    // tiny cache so a burst of visitors makes one Google call
  const value = classify(await listEvents(c, fromMs, toMs));
  memo = { key, at: Date.now(), value };
  return value;
}

async function createEvent(c, { summary, description, startIso, bookingId }) {
  const start = new Date(startIso), end = new Date(start.getTime() + SLOT_MINUTES * 60000);
  const ev = await gfetch(c, `/calendars/${encodeURIComponent(c.calendarId)}/events`, {
    method: 'POST',
    body: JSON.stringify({ summary, description, start: { dateTime: start.toISOString() }, end: { dateTime: end.toISOString() },
      transparency: 'opaque', extendedProperties: { private: { antarshantiBooking: bookingId || 'yes' } } })
  });
  memo = { key: '', at: 0, value: null };
  return ev.id;
}

const resetCache = () => { memo = { key: '', at: 0, value: null }; };

module.exports = { resetCache, SLOT_MINUTES, enabled, classify, openSlotStarts, readCalendar, createEvent, accessToken, OPEN_TITLE };
