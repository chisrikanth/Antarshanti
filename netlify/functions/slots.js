// netlify/functions/slots.js  (GET)
// Public, read-only availability for the booking widgets: the weekly schedule, days off, and which
// instants are already taken. No personal data is ever returned.
const { config } = require('./lib/db');
const { loadSchedule, takenSlots, istParts, MIN_LEAD_MINUTES, MAX_DAYS_AHEAD } = require('./lib/booking');

exports.handler = async function (event) {
  if (event.httpMethod !== 'GET') return { statusCode: 405, body: 'Method not allowed' };
  const headers = { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' };
  const cfg = config(event);
  if (!cfg) return { statusCode: 200, headers, body: JSON.stringify({ live: false }) };   // pages keep their built-in schedule
  try {
    const schedule = await loadSchedule(cfg, event);
    if (!schedule.fromDb) return { statusCode: 200, headers, body: JSON.stringify({ live: false }) };
    const taken = await takenSlots(cfg);
    if (schedule.mode === 'calendar') {
      // Offer exactly the open, unbooked slots, grouped by India date.
      const gone = new Set(taken.map((x) => new Date(x).getTime())), days = {};
      [...schedule.slotSet].sort((a, b) => a - b).forEach((ms) => {
        if (gone.has(ms)) return;
        const t = istParts(new Date(ms));
        (days[t.ymd] = days[t.ymd] || []).push(t.hm);
      });
      return { statusCode: 200, headers, body: JSON.stringify({ live: true, mode: 'calendar', days, blocked: [], taken, leadMinutes: MIN_LEAD_MINUTES, maxDays: MAX_DAYS_AHEAD }) };
    }
    return { statusCode: 200, headers, body: JSON.stringify({ live: true, mode: 'weekly', rules: schedule.rules, blocked: schedule.blocked, taken, leadMinutes: MIN_LEAD_MINUTES, maxDays: MAX_DAYS_AHEAD }) };
  } catch (e) {
    console.error('slots error:', e.message);
    return { statusCode: 200, headers, body: JSON.stringify({ live: false }) };
  }
};
