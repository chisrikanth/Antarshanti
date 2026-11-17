// netlify/functions/razorpay-webhook.js
// Razorpay calls this after a payment succeeds or fails. This is the authoritative record of a
// payment (the browser can be closed or tampered with; this cannot).
// Setup: Razorpay Dashboard -> Account & Settings -> Webhooks -> add
//   URL:    https://antarshanti.co.in/.netlify/functions/razorpay-webhook
//   Events: payment.captured, order.paid, payment.failed
//   Secret: any long random text; put the same text in Netlify as RAZORPAY_WEBHOOK_SECRET.
// (Do this once in Razorpay LIVE mode for production and once in TEST mode for the staging address.)
const crypto = require('crypto');
const { config: dbConfig, rest } = require('./lib/db');
const { addToCalendar } = require('./lib/booking');

function validSignature(rawBody, signature, secret) {
  if (!signature || !secret) return false;
  const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
  try { return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature)); } catch (e) { return false; }
}

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method not allowed' };

  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) { console.error('RAZORPAY_WEBHOOK_SECRET is not set'); return { statusCode: 500, body: 'Webhook not configured' }; }

  const raw = event.isBase64Encoded ? Buffer.from(event.body || '', 'base64').toString('utf8') : (event.body || '');
  const sig = (event.headers || {})['x-razorpay-signature'];
  if (!validSignature(raw, sig, secret)) { console.error('webhook: bad signature'); return { statusCode: 400, body: 'Bad signature' }; }

  let evt;
  try { evt = JSON.parse(raw); } catch (e) { return { statusCode: 400, body: 'Bad JSON' }; }

  const pay = evt.payload && evt.payload.payment && evt.payload.payment.entity;
  const orderId = (pay && pay.order_id) || (evt.payload && evt.payload.order && evt.payload.order.entity && evt.payload.order.entity.id);
  if (!orderId) return { statusCode: 200, body: 'ignored' };

  const cfg = dbConfig(event);
  if (!cfg) { console.error('webhook: database not configured for this address'); return { statusCode: 200, body: 'no database' }; }

  try {
    if (evt.event === 'payment.captured' || evt.event === 'order.paid') {
      const paidInr = pay ? Math.round(pay.amount / 100) : null;
      const row = {
        razorpay_order_id: orderId,
        razorpay_payment_id: pay ? pay.id : null,
        paid_amount_inr: paidInr,
        status: 'paid',
        service_key: (pay && pay.notes && pay.notes.service) || null,
        slot_label: (pay && pay.notes && pay.notes.slot) || null
      };
      const r = await rest(cfg, 'payments?on_conflict=razorpay_order_id', {
        method: 'POST', headers: { Prefer: 'resolution=merge-duplicates,return=minimal' }, body: JSON.stringify(row)
      });
      if (!r.ok) { console.error('webhook save failed', r.status, await r.text()); return { statusCode: 500, body: 'save failed' }; } // Razorpay retries
      // Confirm the held slot. If the hold had expired and someone else took the time, flag it for a human.
      const bk = await rest(cfg, `bookings?razorpay_order_id=eq.${encodeURIComponent(orderId)}&status=in.(held,expired)`, { method: 'PATCH', headers: { Prefer: 'return=representation' }, body: JSON.stringify({ status: 'booked', hold_expires_at: null }) });
      if (bk.status === 409) {
        await rest(cfg, `bookings?razorpay_order_id=eq.${encodeURIComponent(orderId)}&status=in.(held,expired)`, { method: 'PATCH', body: JSON.stringify({ status: 'conflict', notes: 'Paid after the hold expired and the time was taken. Refund or reschedule.' }) });
        console.error('SLOT CONFLICT AFTER PAYMENT: refund or reschedule', orderId);
      } else if (!bk.ok) console.error('booking confirm failed', bk.status);
      else {
        // Put the paid booking on the Antarshanti Bookings calendar (once).
        const rows = await bk.json().catch(() => []);
        for (const row of rows || []) {
          await addToCalendar(event, cfg, row, 'Bach Flower consultation (paid)', `Razorpay order: ${orderId}\nSlot chosen: ${(pay && pay.notes && pay.notes.slot) || ''}\nStatus: paid and confirmed.`);
        }
      }
      // Flag if the captured amount differs from what the server expected.
      const chk = await rest(cfg, `payments?select=amount_inr,paid_amount_inr&razorpay_order_id=eq.${encodeURIComponent(orderId)}&limit=1`);
      if (chk.ok) { const [p] = await chk.json(); if (p && p.amount_inr && p.paid_amount_inr && p.amount_inr !== p.paid_amount_inr) console.error('AMOUNT MISMATCH', orderId, p); }
    } else if (evt.event === 'payment.failed') {
      // never downgrade a paid order
      await rest(cfg, `payments?razorpay_order_id=eq.${encodeURIComponent(orderId)}&status=eq.created`, { method: 'PATCH', body: JSON.stringify({ status: 'failed' }) });
    }
  } catch (e) { console.error('webhook error:', e.message); return { statusCode: 500, body: 'error' }; }

  return { statusCode: 200, body: 'ok' };
};
