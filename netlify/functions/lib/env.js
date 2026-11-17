// Shared safety checks so test addresses can never touch production money or data.
// (Lives in lib/ so Netlify does not publish it as a function of its own.)

const PROD_HOST = /(^|\.)antarshanti\.co\.in$/i;   // antarshanti.co.in and www.
const PROD_SUPABASE_REF = 'kntohzyxzoucymrmriva';
const TEST_SUPABASE_REF = 'rnofqxmfwqiogtlchkbp';

function hostOf(event) {
  const h = event.headers || {};
  return String(h['x-forwarded-host'] || h.host || '').split(',')[0].split(':')[0].trim();
}

// true only for requests that arrived on the real domain
function isProductionRequest(event) { return PROD_HOST.test(hostOf(event)); }

// Returns an error message if this request must not use the configured payment key.
function paymentKeyProblem(event, keyId) {
  if (!isProductionRequest(event) && /^rzp_live_/.test(keyId || '')) {
    return 'Live payments are switched off on test addresses. Set Razorpay TEST keys for this deploy context in Netlify.';
  }
  if (isProductionRequest(event) && /^rzp_test_/.test(keyId || '')) {
    return 'Production is configured with Razorpay test keys. Set the live keys for the Production context in Netlify.';
  }
  return null;
}

// Returns an error message if this request must not use the configured database.
function databaseProblem(event, supabaseUrl) {
  const url = String(supabaseUrl || '');
  if (!isProductionRequest(event) && url.includes(PROD_SUPABASE_REF)) {
    return 'Test addresses must use the test database, not the production one. Set SUPABASE_URL and SUPABASE_SERVICE_KEY for this deploy context in Netlify.';
  }
  if (isProductionRequest(event) && url.includes(TEST_SUPABASE_REF)) {
    return 'Production is pointing at the test database. Fix SUPABASE_URL for the Production context in Netlify.';
  }
  return null;
}

module.exports = { isProductionRequest, paymentKeyProblem, databaseProblem, PROD_SUPABASE_REF, TEST_SUPABASE_REF };
