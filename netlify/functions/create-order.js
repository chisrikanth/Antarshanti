// netlify/functions/create-order.js
//
// Creates a Razorpay order. Called by bach.html before opening the
// Razorpay Checkout modal. Needs RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET
// set in Netlify → Site settings → Environment variables. No npm
// dependencies — talks to the Razorpay REST API directly over https so
// there's nothing to `npm install` and nothing that can go stale.

const https = require('https');
const { paymentKeyProblem } = require('./lib/env');
const { config: dbConfig, rest, getPrice } = require('./lib/db');

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Razorpay keys are not configured on the server' })
    };
  }

  // Never let a test address create a live-money order (or production use test keys).
  const keyProblem = paymentKeyProblem(event, keyId);
  if (keyProblem) {
    console.error('create-order blocked:', keyProblem);
    return { statusCode: 403, body: JSON.stringify({ error: keyProblem }) };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON body' }) };
  }

  // The browser only says WHICH service. The price is looked up here, on the server, so it cannot be
  // tampered with. (Any "amount" sent by the browser is ignored.)
  const service = String(payload.service || 'bach_consultation').slice(0, 60);
  const price = await getPrice(event, service);
  if (price.error) {
    return { statusCode: price.status || 400, body: JSON.stringify({ error: price.error }) };
  }
  const amount = price.amountInr * 100;   // paise
  const currency = 'INR';
  const slot = payload.slot ? String(payload.slot).slice(0, 120) : '';
  const receipt = (payload.receipt || ('rcpt_' + Date.now())).toString().slice(0, 40);

  const orderData = JSON.stringify({ amount: amount, currency: currency, receipt: receipt, notes: { service: service, slot: slot } });
  const auth = Buffer.from(keyId + ':' + keySecret).toString('base64');

  const options = {
    hostname: 'api.razorpay.com',
    path: '/v1/orders',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(orderData),
      'Authorization': 'Basic ' + auth
    }
  };

  try {
    const order = await new Promise(function (resolve, reject) {
      const req = https.request(options, function (res) {
        var data = '';
        res.on('data', function (chunk) { data += chunk; });
        res.on('end', function () {
          var parsed;
          try {
            parsed = JSON.parse(data);
          } catch (e) {
            reject(new Error('Razorpay returned a non-JSON response'));
            return;
          }
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(parsed);
          } else {
            reject(new Error((parsed.error && parsed.error.description) || 'Razorpay order creation failed'));
          }
        });
      });
      req.on('error', reject);
      req.write(orderData);
      req.end();
    });

    // Record the expected amount so the webhook can check what was actually paid (best effort).
    const cfg = dbConfig(event);
    if (cfg) {
      try {
        await rest(cfg, 'payments?on_conflict=razorpay_order_id', {
          method: 'POST',
          headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
          body: JSON.stringify({ razorpay_order_id: order.id, service_key: service, amount_inr: price.amountInr, slot_label: slot || null, status: 'created' })
        });
      } catch (e) { console.error('payment log failed:', e.message); }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        key_id: keyId,            // public Key ID, so the page uses whichever key this deploy context has
        order_id: order.id,
        amount: order.amount,
        currency: order.currency,
        price_inr: price.amountInr
      })
    };
  } catch (err) {
    return { statusCode: 502, body: JSON.stringify({ error: err.message }) };
  }
};
