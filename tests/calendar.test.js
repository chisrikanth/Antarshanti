const assert = require('assert'), crypto = require('crypto'), path = require('path');
const { nextMondayNineIst, RULES } = require('./helpers');
const lib = (f) => require(path.join(__dirname, '..', 'netlify', 'functions', 'lib', f));
const fx = (f) => require(path.join(__dirname, '..', 'netlify', 'functions', f));
const ev = (method, body, host) => ({ httpMethod: method, headers: { host: host || 'staging--x.netlify.app' }, body: JSON.stringify(body || {}) });

const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', { modulusLength: 2048, privateKeyEncoding: { type: 'pkcs8', format: 'pem' }, publicKeyEncoding: { type: 'spki', format: 'pem' } });
process.env.GOOGLE_CLIENT_EMAIL = 'bot@proj.iam.gserviceaccount.com';
process.env.GOOGLE_PRIVATE_KEY = privateKey.replace(/\n/g, '\\n');       // as people paste it: literal \n
process.env.GOOGLE_CALENDAR_ID = 'test-cal@group.calendar.google.com';
process.env.GOOGLE_CALENDAR_ENV = 'test';
process.env.SUPABASE_URL = 'https://rnofqxmfwqiogtlchkbp.supabase.co'; process.env.SUPABASE_SERVICE_KEY = 'k';

const SLOT = nextMondayNineIst(), day = SLOT.slice(0, 10);   // a future Monday, India date
const at = (hm) => `${day}T${hm}:00+05:30`;
let calName = 'Antarshanti TEST', googleEvents = [], googleDown = false, created = [], tokenReqs = 0, bookings = [], dbPatches = [];
global.fetch = async (url, init) => {
  const method = (init && init.method) || 'GET'; const ok = (j, st) => ({ ok: true, status: st || 200, json: async () => j, text: async () => '' });
  if (url === 'https://oauth2.googleapis.com/token') {
    tokenReqs++; const assertion = decodeURIComponent(init.body.split('assertion=')[1]); const [h, c, sig] = assertion.split('.');
    const valid = crypto.createVerify('RSA-SHA256').update(h + '.' + c).verify(publicKey, Buffer.from(sig.replace(/-/g, '+').replace(/_/g, '/'), 'base64'));
    const claim = JSON.parse(Buffer.from(c, 'base64').toString());
    assert.ok(valid, 'JWT signature must verify'); assert.equal(claim.iss, process.env.GOOGLE_CLIENT_EMAIL); assert.ok(claim.scope.includes('calendar'));
    return ok({ access_token: 'tok', expires_in: 3600 });
  }
  if (url.startsWith('https://www.googleapis.com/calendar/v3/')) {
    assert.equal(init.headers.Authorization, 'Bearer tok');
    if (googleDown) return { ok: false, status: 500, text: async () => 'down', json: async () => ({}) };
    if (method === 'GET' && !url.includes('/events')) return ok({ summary: calName });
    if (method === 'GET') { assert.ok(url.includes('singleEvents=true')); return ok({ items: googleEvents }); }
    const body = JSON.parse(init.body); created.push({ url, body }); return ok({ id: 'gev_' + created.length });
  }
  if (url.includes('/availability_rules?')) return ok(RULES);
  if (url.includes('/slot_blocks?')) return ok([]);
  if (url.includes('/bookings?select=slot_start')) return ok(bookings.filter((x) => ['held', 'requested', 'booked'].includes(x.status)).map((x) => ({ slot_start: x.slot_start })));
  if (url.includes('/bookings?razorpay_order_id=eq.') && method === 'PATCH') { dbPatches.push({ url, body: JSON.parse(init.body) }); return ok([{ id: 'bkW', slot_start: new Date(at('17:00')).toISOString(), calendar_event_id: null }]); }
  if (url.includes('/payments')) return ok([{}], 201);
  if (url.includes('/bookings') && method === 'PATCH') { if (!url.includes('hold_expires_at=lt')) dbPatches.push({ url, body: JSON.parse(init.body) }); return ok([]); }
  if (url.includes('/bookings?select=id&status=eq.requested')) return ok([]);
  if (url.includes('/bookings') && method === 'POST') { const row = JSON.parse(init.body); const b = { id: 'bk' + (bookings.length + 1), ...row, slot_start: new Date(row.slot_start).toISOString() }; bookings.push(b); return ok([b], 201); }
  return ok([], 201);
};

(async () => {
  const gcal = lib('gcal.js');
  // ---- pure logic
  const base = new Date(SLOT).getTime();
  const ev1 = [
    { summary: 'Open', start: { dateTime: at('09:00') }, end: { dateTime: at('12:00') } },
    { summary: 'Dentist', start: { dateTime: at('10:30') }, end: { dateTime: at('11:30') } },
    { summary: 'Open late', start: { dateTime: at('17:00') }, end: { dateTime: at('18:30') } },
    { summary: 'Reminder only', transparency: 'transparent', start: { dateTime: at('17:00') }, end: { dateTime: at('18:00') } },
    { summary: 'Cancelled thing', status: 'cancelled', start: { dateTime: at('17:00') }, end: { dateTime: at('18:00') } }
  ];
  const { open, busy } = gcal.classify(ev1);
  const starts = [...gcal.openSlotStarts(open, busy, [], Date.now(), 60)].sort((a, b) => a - b).map((ms) => new Date(ms + 330 * 60000).toISOString().slice(11, 16));
  assert.deepEqual(starts, ['09:00', '17:00'], 'got ' + starts);
  console.log('Open 9-12 with a 10:30-11:30 appointment -> only 09:00 offered; Open 17:00-18:30 -> 17:00 only; "free"/cancelled events ignored');
  const allDay = gcal.classify([{ summary: 'Open', start: { dateTime: at('09:00') }, end: { dateTime: at('11:00') } }, { summary: 'Travel', start: { date: day }, end: { date: new Date(new Date(day + 'T12:00:00Z').getTime() + 86400000).toISOString().slice(0, 10) } }]);
  assert.equal(gcal.openSlotStarts(allDay.open, allDay.busy, [], Date.now(), 60).size, 0); console.log('all-day "Travel" event blocks the whole day');
  assert.equal(gcal.openSlotStarts([{ start: base, end: base + 3600000 }], [], [base], Date.now(), 60).size, 0); console.log('a slot already booked in the database is removed');
  assert.ok(gcal.OPEN_TITLE.test('Available - online') && !gcal.OPEN_TITLE.test('Reopen') && !gcal.OPEN_TITLE.test('Not open')); console.log('titles: "Open"/"Available" count; others do not');

  // ---- safety label
  process.env.GOOGLE_CALENDAR_ENV = 'production'; assert.equal(gcal.enabled(ev('GET', {}, 'staging--x.netlify.app')), null); assert.equal(gcal.enabled(ev('GET', {}, 'antarshanti.co.in')).calendarId, process.env.GOOGLE_CALENDAR_ID);
  process.env.GOOGLE_CALENDAR_ENV = 'test'; assert.equal(gcal.enabled(ev('GET', {}, 'antarshanti.co.in')), null); assert.ok(gcal.enabled(ev('GET', {})));
  delete process.env.GOOGLE_CALENDAR_ENV; assert.equal(gcal.enabled(ev('GET', {})), null); process.env.GOOGLE_CALENDAR_ENV = 'test';
  console.log('safety label: test address cannot use a production-labelled calendar, nor production a test one, nor an unlabelled one');

  // ---- slots endpoint in calendar mode
  googleEvents = ev1; const sl = fx('slots.js'), rs = fx('reserve-slot.js');
  let d = JSON.parse((await sl.handler(ev('GET'))).body);
  assert.equal(d.mode, 'calendar'); assert.deepEqual(d.days[day], ['09:00', '17:00']); assert.ok(tokenReqs >= 1);
  console.log('slots endpoint: mode=calendar, offers', JSON.stringify(d.days[day]), 'for', day, '(signed JWT verified)');

  // ---- default open: the weekly schedule is open unless a busy event blocks it; "Open" titles are not needed
  const monRules = ['09:00', '10:00', '11:00'];
  const slotsFor = async (events) => { googleEvents = events; gcal.resetCache(); const x = JSON.parse((await sl.handler(ev('GET'))).body); assert.equal(x.mode, 'calendar'); return x.days[day]; };
  assert.deepEqual(await slotsFor([]), monRules); console.log('empty calendar -> the whole weekly schedule is offered (no Open events needed)');
  assert.deepEqual(await slotsFor([{ summary: 'Dentist', start: { dateTime: at('10:30') }, end: { dateTime: at('11:30') } }]), ['09:00']); console.log('a busy 10:30-11:30 appointment removes the 10:00 and 11:00 slots');
  assert.deepEqual(await slotsFor([{ summary: 'Birthday lunch', transparency: 'transparent', start: { dateTime: at('10:00') }, end: { dateTime: at('11:00') } }]), monRules); console.log('an event marked Free does not block');
  assert.deepEqual(await slotsFor([{ summary: 'Anything', status: 'cancelled', start: { dateTime: at('10:00') }, end: { dateTime: at('11:00') } }]), monRules); console.log('a cancelled event does not block');
  assert.equal(await slotsFor([{ summary: 'Away', start: { date: day }, end: { date: new Date(new Date(day + 'T12:00:00Z').getTime() + 86400000).toISOString().slice(0, 10) } }]), undefined); console.log('an all-day event blocks that whole day');
  assert.deepEqual(await slotsFor([{ summary: 'Open', start: { dateTime: at('09:00') }, end: { dateTime: at('12:00') } }]), monRules); console.log('a leftover "Open" event neither blocks nor changes anything inside the weekly schedule');
  assert.deepEqual(await slotsFor([{ summary: 'Open - special', start: { dateTime: at('14:00') }, end: { dateTime: at('15:00') } }]), [...monRules, '14:00']); console.log('an optional "Open" event adds an extra window outside the weekly schedule');
  assert.deepEqual(await slotsFor([{ summary: 'Open - special', start: { dateTime: at('14:00') }, end: { dateTime: at('15:00') } }, { summary: 'Busy', start: { dateTime: at('14:00') }, end: { dateTime: at('15:00') } }]), monRules); console.log('a busy event also blocks an extra window');
  googleEvents = ev1; gcal.resetCache();

  // ---- booking a slot that is not open (the 10:00 hour is blocked by the dentist)
  let r = await rs.handler(ev('POST', { service: 'jyotish_consultation', slot_start: at('10:00'), name: 'Ravi', phone: '9876543210', consent: true })); assert.equal(r.statusCode, 400); console.log('booking a blocked 10:00 ->', r.statusCode, JSON.parse(r.body).error);
  // ---- booking an open slot writes it to the calendar
  r = await rs.handler(ev('POST', { service: 'jyotish_consultation', slot_start: at('09:00'), name: 'Ravi', phone: '9876543210', consent: true })); assert.equal(r.statusCode, 200);
  const evt = created[0].body; assert.ok(created[0].url.includes(encodeURIComponent(process.env.GOOGLE_CALENDAR_ID)));
  assert.equal(new Date(evt.start.dateTime).getTime(), new Date(at('09:00')).getTime()); assert.equal(new Date(evt.end.dateTime).getTime() - new Date(evt.start.dateTime).getTime(), 3600000);
  assert.ok(evt.summary.includes('Ravi') && evt.description.includes('+919876543210'));
  ['Name: Ravi', 'WhatsApp: +919876543210', 'Chat: https://wa.me/919876543210', 'When: ', ' IST', 'REQUESTED', 'Booking ID: '].forEach((t) => assert.ok(evt.description.includes(t), 'event should contain: ' + t));
  console.log('Jyotish event shows name, WhatsApp number, chat link, time, status and booking id'); assert.ok(evt.extendedProperties.private.antarshantiBooking);
  assert.ok(dbPatches.some((p) => p.body.calendar_event_id === 'gev_1')); console.log('Jyotish request -> event created in the bookings calendar (60 min) and linked to the booking');
  d = JSON.parse((await sl.handler(ev('GET'))).body); assert.deepEqual(d.days[day], ['17:00']); console.log('that time is no longer offered');

  // ---- name guard: the calendar's own name must agree with the environment
  gcal.resetCache(); d = JSON.parse((await sl.handler(ev('GET'))).body); assert.equal(d.mode, 'calendar'); assert.equal(d.calendarName, 'Antarshanti TEST'); console.log('slots reports which calendar it reads: ' + d.calendarName);
  calName = 'Antarshanti Bookings'; gcal.resetCache(); const createdG = created.length;
  d = JSON.parse((await sl.handler(ev('GET'))).body); assert.equal(d.calendarError, true); assert.deepEqual(d.days, {}); assert.equal(created.length, createdG);
  console.log('staging pointed at the real "Antarshanti Bookings" calendar -> refused: no times offered, nothing written');
  assert.ok(gcal.nameProblem({ label: 'production' }, 'Antarshanti TEST'), 'real site must refuse a TEST calendar');
  assert.equal(gcal.nameProblem({ label: 'production' }, 'Antarshanti Bookings'), null); assert.equal(gcal.nameProblem({ label: 'test' }, null), null);
  console.log('real site refuses a calendar named TEST; unreadable name keeps the other locks only');
  calName = 'Antarshanti TEST'; gcal.resetCache();

  // ---- Google down -> falls back to the weekly schedule, booking still works
  googleDown = true; gcal.resetCache(); const created0 = created.length;
  d = JSON.parse((await sl.handler(ev('GET'))).body); assert.equal(d.calendarError, true); assert.deepEqual(d.days, {});
  r = await rs.handler(ev('POST', { service: 'jyotish_consultation', slot_start: at('09:00'), name: 'Ravi', phone: '9876543210', consent: true })); assert.equal(r.statusCode, 400); assert.equal(created.length, created0);
  console.log('calendar configured but unreadable -> NO times offered and booking refused (fails closed, so appointments are never ignored)');
  googleDown = false;
  // ---- paid Bach booking confirmed by the webhook -> calendar event
  process.env.RAZORPAY_WEBHOOK_SECRET = 'wh'; const wh = fx('razorpay-webhook.js'); gcal.resetCache();
  const evtBody = JSON.stringify({ event: 'payment.captured', payload: { payment: { entity: { id: 'pay_9', order_id: 'order_W', amount: 100000, contact: '+919988776655', email: 'ravi@example.com', method: 'upi', notes: { service: 'bach_consultation', slot: 'Mon 5 PM', name: 'Ravi K', lang: 'te' } } } } });
  const before = created.length;
  r = await wh.handler({ httpMethod: 'POST', headers: { host: 'staging--x.netlify.app', 'x-razorpay-signature': crypto.createHmac('sha256', 'wh').update(evtBody).digest('hex') }, body: evtBody });
  assert.equal(r.statusCode, 200); assert.equal(created.length, before + 1); const be = created[created.length - 1].body;
  assert.ok(be.summary.includes('Bach') && be.summary.includes('paid') && be.summary.includes('Ravi K') && be.description.includes('order_W'));
  ['Name: Ravi K', 'Phone / WhatsApp: +919988776655', 'Chat: https://wa.me/919988776655', 'Email: ravi@example.com', 'Rs 1,000 via UPI', 'Razorpay payment: pay_9', 'Page language: Telugu'].forEach((t) => assert.ok(be.description.includes(t), 'Bach event should contain: ' + t));
  assert.ok(dbPatches.some((x) => x.body.contact_phone === '+919988776655' && x.body.contact_name === 'Ravi K'), 'booking row gets the payer name and phone');
  console.log('Bach event shows name, phone, chat link, email, amount and method, Razorpay ids and language; booking row updated with name and phone'); assert.equal(new Date(be.start.dateTime).getTime(), new Date(at('17:00')).getTime());
  console.log('paid Bach booking (webhook) -> calendar event "' + be.summary + '" at 5 PM');
  console.log('ALL CALENDAR TESTS PASSED');
})().catch((e) => { console.error('FAIL', e); process.exit(1); });
