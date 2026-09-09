// netlify/functions/verify-payment.js
//
// Verifies the signature Razorpay Checkout returns after a successful
// payment. Called by bach.html's handler() callback. Needs
// RAZORPAY_KEY_SECRET set in Netlify → Site settings → Environment
// variables. No npm dependencies — uses Node's built-in crypto module.

const crypto = require('crypto');

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ success: false, error: 'Method not allowed' }) };
  }

  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: 'Razorpay secret is not configured on the server' })
    };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ success: false, error: 'Invalid JSON body' }) };
  }

  const razorpay_order_id = payload.razorpay_order_id;
  const razorpay_payment_id = payload.razorpay_payment_id;
  const razorpay_signature = payload.razorpay_signature;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return { statusCode: 400, body: JSON.stringify({ success: false, error: 'Missing payment fields' }) };
  }

  const expected = crypto
    .createHmac('sha256', keySecret)
    .update(razorpay_order_id + '|' + razorpay_payment_id)
    .digest('hex');

  var isValid = false;
  try {
    isValid = crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(razorpay_signature));
  } catch (e) {
    isValid = false; // length mismatch etc. — treat as invalid, not a crash
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ success: isValid })
  };
};
