// Tiny Supabase REST helper for server functions (service_role key; never used in the browser).
const { databaseProblem } = require('./env');

// Used only if the database cannot be reached, so a booking is never blocked by an outage.
// Keep in step with the `services` table; the table is the source of truth.
const DEFAULT_PRICES_INR = { bach_consultation: 1000 };

function config(event) {
  const url = process.env.SUPABASE_URL, key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) return null;
  const problem = databaseProblem(event, url);
  if (problem) { console.error('db disabled:', problem); return null; }
  return { url: url.replace(/\/$/, ''), key };
}

async function rest(cfg, path, init) {
  const res = await fetch(`${cfg.url}/rest/v1/${path}`, {
    ...init,
    headers: { apikey: cfg.key, Authorization: `Bearer ${cfg.key}`, 'Content-Type': 'application/json', ...((init && init.headers) || {}) }
  });
  return res;
}

// The server decides the price. Returns { amountInr, source } or { error, status }.
async function getPrice(event, service) {
  const cfg = config(event);
  if (cfg) {
    try {
      const res = await rest(cfg, `services?select=amount_inr&key=eq.${encodeURIComponent(service)}&active=eq.true&limit=1`);
      if (res.ok) {
        const rows = await res.json();
        if (rows.length) return { amountInr: rows[0].amount_inr, source: 'database' };
        return { error: 'This service is not open for online booking right now. Please message Srikanth on WhatsApp.', code: 'service_closed', status: 404 };
      }
      console.error('price lookup failed:', res.status);
    } catch (e) { console.error('price lookup error:', e.message); }
  }
  if (DEFAULT_PRICES_INR[service]) return { amountInr: DEFAULT_PRICES_INR[service], source: 'default' };
  return { error: 'Unknown service.', status: 400 };
}

module.exports = { config, rest, getPrice, DEFAULT_PRICES_INR };
