const assert = require('assert'), crypto = require('crypto'), https = require('https'), path = require('path'), { EventEmitter } = require('events');
const fx = (f) => require(path.join(__dirname, '..', 'netlify', 'functions', f));
const ev = (host, body, headers) => ({ httpMethod: 'POST', headers: { host, ...(headers || {}) }, body: typeof body === 'string' ? body : JSON.stringify(body || {}) });
const { nextMondayNineIst, RULES } = require('./helpers');
const SLOT = nextMondayNineIst();
const TEST_HOST = 'staging--aquamarine-croquembouche-26e205.netlify.app';

// ---- mocks
let razorpayBody = null, dbCalls = [], dbMode = 'row:1500';
https.request = (opts, cb) => {
  const req = new EventEmitter(); let sent = '';
  req.write = (d) => { sent += d; };
  req.end = () => { razorpayBody = JSON.parse(sent); const res = new EventEmitter(); res.statusCode = 200; cb(res);
    res.emit('data', JSON.stringify({ id: 'order_TEST1', amount: razorpayBody.amount, currency: 'INR' })); res.emit('end'); };
  return req;
};
global.fetch = async (url, init) => {
  dbCalls.push({ url, method: (init && init.method) || 'GET', body: init && init.body });
  if (url.includes('/services?')) {
    if (dbMode === 'down') throw new Error('network down');
    if (dbMode === 'empty') return { ok: true, status: 200, json: async () => [] };
    return { ok: true, status: 200, json: async () => [{ amount_inr: Number(dbMode.split(':')[1]) }] };
  }
  if (url.includes('/availability_rules?')) return { ok: true, status: 200, json: async () => RULES };
  if (url.includes('/slot_blocks?')) return { ok: true, status: 200, json: async () => [] };
  if (url.includes('/bookings') && (init && init.method) === 'POST') return { ok: true, status: 201, json: async () => [{ id: 'bk_1' }] };
  if (url.includes('select=amount_inr,paid_amount_inr')) return { ok: true, status: 200, json: async () => [{ amount_inr: 1500, paid_amount_inr: 1 }] };
  return { ok: true, status: 201, text: async () => '', json: async () => [] };
};
process.env.RAZORPAY_KEY_ID = 'rzp_test_abc'; process.env.RAZORPAY_KEY_SECRET = 's';
process.env.SUPABASE_URL = 'https://rnofqxmfwqiogtlchkbp.supabase.co'; process.env.SUPABASE_SERVICE_KEY = 'k';
process.env.RAZORPAY_WEBHOOK_SECRET = 'whsec';

(async () => {
  const co = fx('create-order.js'), wh = fx('razorpay-webhook.js');
  // 1 tampered amount is ignored; server price (1500) is used
  let r = await co.handler(ev(TEST_HOST, { service: 'bach_consultation', amount: 100, slot: 'Tue 10 AM', slot_start: SLOT }));
  assert.equal(r.statusCode, 200); assert.equal(razorpayBody.amount, 150000); assert.equal(razorpayBody.notes.slot, 'Tue 10 AM');
  assert.equal(JSON.parse(r.body).price_inr, 1500);
  const logged = dbCalls.find(c => c.url.includes('/payments?on_conflict'));
  assert.ok(logged && JSON.parse(logged.body).amount_inr === 1500); console.log('tampered amount 100 ignored -> charged', razorpayBody.amount / 100, '(from database); order logged');
  // 2 service removed/inactive -> refuse
  dbMode = 'empty'; r = await co.handler(ev(TEST_HOST, { service: 'bach_consultation', slot_start: SLOT })); assert.equal(r.statusCode, 404); console.log('inactive service ->', r.statusCode);
  // 3 database down -> default price, booking still works
  dbMode = 'down'; r = await co.handler(ev(TEST_HOST, { service: 'bach_consultation', amount: 5, slot_start: SLOT })); assert.equal(r.statusCode, 200); assert.equal(razorpayBody.amount, 100000); console.log('database down -> default price', razorpayBody.amount / 100);
  // 4 unknown service while db down -> 400
  r = await co.handler(ev(TEST_HOST, { service: 'free_gold' })); assert.equal(r.statusCode, 400); console.log('unknown service ->', r.statusCode);

  // webhook
  const sign = (b) => crypto.createHmac('sha256', 'whsec').update(b).digest('hex');
  const captured = JSON.stringify({ event: 'payment.captured', payload: { payment: { entity: { id: 'pay_1', order_id: 'order_TEST1', amount: 100, notes: { service: 'bach_consultation', slot: 'Tue 10 AM' } } } } });
  r = await wh.handler(ev(TEST_HOST, captured, { 'x-razorpay-signature': 'deadbeef' })); assert.equal(r.statusCode, 400); console.log('webhook bad signature ->', r.statusCode);
  r = await wh.handler(ev(TEST_HOST, captured)); assert.equal(r.statusCode, 400);
  dbCalls = []; dbMode = 'row:1500';
  r = await wh.handler(ev(TEST_HOST, captured, { 'x-razorpay-signature': sign(captured) })); assert.equal(r.statusCode, 200);
  const saved = dbCalls.find(c => c.url.includes('/payments?on_conflict')); const row = JSON.parse(saved.body);
  assert.equal(row.status, 'paid'); assert.equal(row.paid_amount_inr, 1); assert.equal(row.razorpay_payment_id, 'pay_1'); console.log('webhook signed payment.captured -> saved status', row.status);
  const failed = JSON.stringify({ event: 'payment.failed', payload: { payment: { entity: { id: 'pay_2', order_id: 'order_TEST1', amount: 100 } } } });
  dbCalls = []; r = await wh.handler(ev(TEST_HOST, failed, { 'x-razorpay-signature': sign(failed) })); assert.equal(r.statusCode, 200);
  const patch = dbCalls.find(c => c.method === 'PATCH'); assert.ok(patch.url.includes('status=eq.created')); console.log('payment.failed only updates unpaid orders');
  console.log('ALL PAYMENT TESTS PASSED');
})().catch(e => { console.error('FAIL', e); process.exit(1); });
