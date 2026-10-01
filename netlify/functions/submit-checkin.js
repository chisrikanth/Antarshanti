// netlify/functions/submit-checkin.js
//
// Receives a POST from checkin.html and inserts one row into the
// `checkin_responses` table in Supabase via its REST API.
//
// Required Netlify environment variables (Site settings -> Environment variables):
//   SUPABASE_URL          e.g. https://xxxxxxxx.supabase.co
//   SUPABASE_SERVICE_KEY  the "service_role" key from Supabase (Project Settings -> API)
//                          (NOT the anon/public key — this one bypasses row-level security
//                          so it must only ever be used server-side, never in the browser)

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_KEY env vars');
    return { statusCode: 500, body: JSON.stringify({ error: 'Server not configured' }) };
  }

  let data;
  try {
    data = JSON.parse(event.body);
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON body' }) };
  }

  // Basic shape check so junk requests don't get written to the DB
  if (!data.domainScores || typeof data.overallScore === 'undefined') {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing scoring data' }) };
  }

  const row = {
    name: data.name || null,
    phone: data.phone || null,
    email: data.email || null,
    consent: !!data.consent,
    crisis_flag: !!data.crisisFlag,
    overall_score: data.overallScore,
    anxiety_score: data.domainScores.anxiety ? data.domainScores.anxiety.score : null,
    anxiety_percent: data.domainScores.anxiety ? data.domainScores.anxiety.percent : null,
    depression_score: data.domainScores.depression ? data.domainScores.depression.score : null,
    depression_percent: data.domainScores.depression ? data.domainScores.depression.percent : null,
    mindfulness_score: data.domainScores.mindfulness ? data.domainScores.mindfulness.score : null,
    mindfulness_percent: data.domainScores.mindfulness ? data.domainScores.mindfulness.percent : null,
    self_esteem_score: data.domainScores.selfEsteem ? data.domainScores.selfEsteem.score : null,
    self_esteem_percent: data.domainScores.selfEsteem ? data.domainScores.selfEsteem.percent : null,
    emotion_regulation_score: data.domainScores.emotionRegulation ? data.domainScores.emotionRegulation.score : null,
    emotion_regulation_percent: data.domainScores.emotionRegulation ? data.domainScores.emotionRegulation.percent : null,
    raw_answers: data.rawAnswers || {},
    submitted_at: data.submittedAt || new Date().toISOString()
  };

  // Campaign attribution (added for ad ROI tracking). Optional columns: see supabase/checkin.sql.
  // Values are length-limited so junk requests cannot bloat the table.
  const clip = (v) => (typeof v === 'string' && v.trim() ? v.trim().slice(0, 120) : null);
  const at = data.attribution && typeof data.attribution === 'object' ? data.attribution : {};
  const attrCols = {
    utm_source: clip(at.utm_source),
    utm_medium: clip(at.utm_medium),
    utm_campaign: clip(at.utm_campaign),
    utm_content: clip(at.utm_content),
    utm_term: clip(at.utm_term),
    gclid: clip(at.gclid),
    fbclid: clip(at.fbclid),
    landing_page: clip(at.landing_page),
    referrer: clip(at.referrer),
    suggested_path: clip(data.suggestedPath)
  };

  const insert = (body) => fetch(`${SUPABASE_URL}/rest/v1/checkin_responses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: SUPABASE_SERVICE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
      Prefer: 'return=minimal'
    },
    body: JSON.stringify(body)
  });

  try {
    let res = await insert({ ...row, ...attrCols });

    // If the attribution columns have not been added yet (migration not run), do not lose the
    // person's response: retry once with the original columns only.
    if (!res.ok && res.status === 400) {
      console.error('Insert with attribution failed, retrying without:', await res.text());
      res = await insert(row);
    }

    if (!res.ok) {
      const errText = await res.text();
      console.error('Supabase insert failed:', errText);
      return { statusCode: 502, body: JSON.stringify({ error: 'Database insert failed' }) };
    }

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    console.error('submit-checkin error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
