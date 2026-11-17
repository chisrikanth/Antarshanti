const assert = require('assert'), https = require('https'), path = require('path'), { EventEmitter } = require('events');
const { nextMondayNineIst, RULES } = require('./helpers');
const fx = (f) => require(path.join(__dirname, '..', 'netlify', 'functions', f));
const ev = (method, body, host) => ({ httpMethod: method, headers: { host: host || 'staging--x.netlify.app' }, body: JSON.stringify(body || {}) });
const SLOT = nextMondayNineIst();

process.env.RAZORPAY_KEY_ID = 'rzp_test_abc'; process.env.RAZORPAY_KEY_SECRET = 's';
process.env.SUPABASE_URL = 'https://rnofqxmfwqiogtlchkbp.supabase.co'; process.env.SUPABASE_SERVICE_KEY = 'k'; process.env.RAZORPAY_WEBHOOK_SECRET = 'wh';

// fake database with a real "one live booking per time" rule
let bookings = [], calls = [], razorpayFails = false, blocked = [];
https.request = (o, cb) => { const q = new EventEmitter(); q.write = () => {}; q.end = () => { const r = new EventEmitter(); r.statusCode = razorpayFails ? 500 : 200; cb(r); r.emit('data', JSON.stringify(razorpayFails ? { error: { description: 'boom' } } : { id: 'order_X', amount: 100000, currency: 'INR' })); r.emit('end'); }; return q; };
global.fetch = async (url, init) => {
  const method = (init && init.method) || 'GET'; calls.push({ url, method, body: init && init.body });
  const ok = (j, status) => ({ ok: true, status: status || 200, json: async () => j, text: async () => '' });
  if (url.includes('/services?')) return ok([{ amount_inr: 1000 }]);
  if (url.includes('/availability_rules?')) return ok(RULES);
  if (url.includes('/slot_blocks?')) return ok(blocked.map((d) => ({ block_date: d })));
  if (url.includes('/bookings') && method === 'PATCH') {
    if (url.includes('hold_expires_at=lt')) return ok([]);
    const b = JSON.parse(init.body);
    if (url.includes('razorpay_order_id=eq.')) { // webhook confirm
      const row = bookings.find((x) => x.razorpay_order_id === 'order_X' && ['held', 'expired'].includes(x.status));
      if (row && b.status === 'booked' && bookings.some((x) => x !== row && x.slot_start === row.slot_start && ['held', 'requested', 'booked'].includes(x.status))) return { ok: false, status: 409, text: async () => 'dup' };
      if (row) Object.assign(row, b); return ok([row]);
    }
    const id = (url.match(/id=eq\.([^&]+)/) || [])[1]; const row = bookings.find((x) => x.id === id); if (row) Object.assign(row, b); return ok([]);
  }
  if (url.includes('/bookings?select=slot_start')) return ok(bookings.filter((x) => ['held', 'requested', 'booked'].includes(x.status)).map((x) => ({ slot_start: x.slot_start })));
  if (url.includes('/bookings?select=id&status=eq.requested')) return ok(bookings.filter((x) => x.status === 'requested' && url.includes(encodeURIComponent(x.contact_phone))).map((x) => ({ id: x.id })));
  if (url.includes('/bookings') && method === 'POST') {
    const row = JSON.parse(init.body); const when = new Date(row.slot_start).toISOString();
    if (bookings.some((x) => new Date(x.slot_start).toISOString() === when && ['held', 'requested', 'booked'].includes(x.status))) return { ok: false, status: 409, text: async () => '23505 duplicate key', json: async () => ({}) };
    const created = { id: 'bk' + (bookings.length + 1), ...row, slot_start: when }; bookings.push(created); return ok([created], 201);
  }
  return ok([], 201);
};

(async () => {
  const { checkSlot, DEFAULT_RULES } = require(path.join(__dirname, '..', 'netlify', 'functions', 'lib', 'booking.js'));
  const sched = { rules: { 1: ['09:00'], 3: ['09:00'] }, blocked: [] };
  const base = new Date(SLOT);
  assert.ok(checkSlot(SLOT, sched).ok);
  assert.equal(checkSlot(SLOT.replace('09:00', '09:30'), sched).ok, false);                       // not on the schedule
  assert.equal(checkSlot(new Date(base.getTime() + 86400000).toISOString(), sched).ok, false);    // Tuesday
  assert.equal(checkSlot(new Date(Date.now() + 3600000).toISOString(), { rules: { [new Date(Date.now() + 3600000 + 330 * 60000).getUTCDay()]: [new Date(Date.now() + 3600000 + 330 * 60000).toISOString().slice(11, 16)] }, blocked: [] }).ok, false); // too soon
  assert.equal(checkSlot(SLOT, { ...sched, blocked: [SLOT.slice(0, 10)] }).ok, false);           // day off
  assert.equal(checkSlot('garbage', sched).ok, false);
  console.log('slot validation: schedule, weekday, lead time, day off, garbage -> all enforced');

  const co = fx('create-order.js'), rs = fx('reserve-slot.js'), sl = fx('slots.js'), wh = fx('razorpay-webhook.js');
  // availability before any booking
  let r = await sl.handler(ev('GET')); let d = JSON.parse(r.body); assert.equal(d.live, true); assert.deepEqual(d.taken, []); console.log('slots endpoint: live, nothing taken yet');

  // first visitor starts paying: slot is held
  r = await co.handler(ev('POST', { service: 'bach_consultation', slot_start: SLOT })); assert.equal(r.statusCode, 200);
  assert.equal(bookings[0].status, 'held'); assert.ok(bookings[0].hold_expires_at); assert.equal(bookings[0].razorpay_order_id, 'order_X'); console.log('visitor A pays -> slot held with 15 min expiry, linked to order');
  // second visitor, same slot -> refused (Bach)
  r = await co.handler(ev('POST', { service: 'bach_consultation', slot_start: SLOT })); assert.equal(r.statusCode, 409); console.log('visitor B same slot (Bach) ->', r.statusCode, JSON.parse(r.body).error);
  // third visitor wants it for Jyotish -> also refused (one calendar)
  r = await rs.handler(ev('POST', { service: 'jyotish_consultation', slot_start: SLOT, name: 'Ravi', phone: '9876543210', consent: true })); assert.equal(r.statusCode, 409); console.log('visitor C same slot (Jyotish) ->', r.statusCode);
  d = JSON.parse((await sl.handler(ev('GET'))).body); assert.equal(d.taken.length, 1); console.log('slots endpoint now lists it as taken');

  // webhook confirms A
  const crypto = require('crypto'); const evt = JSON.stringify({ event: 'payment.captured', payload: { payment: { entity: { id: 'pay_1', order_id: 'order_X', amount: 100000, notes: {} } } } });
  r = await wh.handler({ httpMethod: 'POST', headers: { host: 'staging--x.netlify.app', 'x-razorpay-signature': crypto.createHmac('sha256', 'wh').update(evt).digest('hex') }, body: evt }); assert.equal(r.statusCode, 200);
  assert.equal(bookings[0].status, 'booked'); assert.equal(bookings[0].hold_expires_at, null); console.log('webhook payment -> booking confirmed (booked)');

  // Razorpay failure releases the hold
  bookings = []; razorpayFails = true; r = await co.handler(ev('POST', { service: 'bach_consultation', slot_start: SLOT })); assert.equal(r.statusCode, 502); assert.equal(bookings[0].status, 'cancelled'); razorpayFails = false; console.log('payment could not start -> slot released');

  // Jyotish request flow + validations
  bookings = [];
  r = await rs.handler(ev('POST', { service: 'jyotish_consultation', slot_start: SLOT, name: 'Ravi', phone: '98765 43210', consent: true })); assert.equal(r.statusCode, 200); assert.equal(bookings[0].status, 'requested'); assert.equal(bookings[0].contact_phone, '9876543210'); console.log('Jyotish request -> slot held as requested (phone normalised)');
  r = await rs.handler(ev('POST', { service: 'jyotish_consultation', slot_start: SLOT, name: 'Ravi', phone: '123', consent: true })); assert.equal(r.statusCode, 400);
  r = await rs.handler(ev('POST', { service: 'jyotish_consultation', slot_start: SLOT, name: 'Ravi', phone: '9876543210', consent: false })); assert.equal(r.statusCode, 400); console.log('bad phone / no consent -> 400');
  const n = bookings.length; r = await rs.handler(ev('POST', { service: 'jyotish_consultation', slot_start: SLOT, name: 'Bot', phone: '9876543211', consent: true, website: 'spam.com' })); assert.equal(bookings.length, n); console.log('honeypot filled -> nothing saved');
  // hoarding limit
  const s2 = new Date(new Date(SLOT).getTime() + 3600000).toISOString(), s3 = new Date(new Date(SLOT).getTime() + 7200000).toISOString();
  await rs.handler(ev('POST', { service: 'jyotish_consultation', slot_start: s2, name: 'Ravi', phone: '9876543210', consent: true }));
  r = await rs.handler(ev('POST', { service: 'jyotish_consultation', slot_start: s3, name: 'Ravi', phone: '9876543210', consent: true })); assert.equal(r.statusCode, 429); console.log('third open request from one number ->', r.statusCode);
  console.log('ALL BOOKING TESTS PASSED');
})().catch((e) => { console.error('FAIL', e); process.exit(1); });
