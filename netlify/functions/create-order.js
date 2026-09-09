// netlify/functions/create-order.js
//
// Creates a Razorpay order. Called by bach.html before opening the
// Razorpay Checkout modal. Needs RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET
// set in Netlify → Site settings → Environment variables. No npm
// dependencies — talks to the Razorpay REST API directly over https so
// there's nothing to `npm install` and nothing that can go stale.

const https = require('https');

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

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON body' }) };
  }

  const amount = parseInt(payload.amount, 10);
  const currency = payload.currency || 'INR';
  const receipt = (payload.receipt || ('rcpt_' + Date.now())).toString().slice(0, 40);

  if (!amount || amount <= 0) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid amount' }) };
  }

  const orderData = JSON.stringify({ amount: amount, currency: currency, receipt: receipt });
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

    return {
      statusCode: 200,
      body: JSON.stringify({
        order_id: order.id,
        amount: order.amount,
        currency: order.currency
      })
    };
  } catch (err) {
    return { statusCode: 502, body: JSON.stringify({ error: err.message }) };
  }
};
