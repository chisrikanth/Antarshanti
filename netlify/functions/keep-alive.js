// netlify/functions/keep-alive.js
// Scheduled (see netlify.toml): one tiny read against each Supabase project every 3 days so the
// Free plan never pauses them for inactivity. Uses only the PUBLIC keys, so no secrets are involved.
// Scheduled functions run on the published (production) deploy only.
const PROJECTS = [
  { name: 'production', url: 'https://kntohzyxzoucymrmriva.supabase.co', key: 'sb_publishable_llW9rx_MQwoEg-gVuWncDg_KtqkUH6G' },
  { name: 'test',       url: 'https://rnofqxmfwqiogtlchkbp.supabase.co', key: 'sb_publishable_9QUwPjzZJ81Fk0d3trBO2w_yYuXnsQz' }
];

exports.handler = async function () {
  const results = [];
  for (const p of PROJECTS) {
    try {
      const r = await fetch(`${p.url}/rest/v1/site_settings?select=key&limit=1`, { headers: { apikey: p.key, Authorization: `Bearer ${p.key}` } });
      results.push(`${p.name}:${r.status}`);
    } catch (e) { results.push(`${p.name}:error`); }
  }
  console.log('keep-alive', results.join(' '));
  return { statusCode: 200, body: results.join(' ') };
};
