/* Antarshanti live content loader.
   Order of sources:
     1. Supabase (optional "no-deploy" mode) if url + anonKey are filled in below.
     2. data/site.json (default; edit on GitHub, Netlify republishes).
   Pages wait on  AS_READY.then(function(c){ ... })  and read  AS_CONTENT.
   A batch with an `end` date (YYYY-MM-DD) disappears automatically the day after. */
/* AS_SUPABASE (url + publishable key) is generated per environment into assets/env.js at build time. */
if (typeof AS_SUPABASE === 'undefined') { var AS_SUPABASE = { url: '', anonKey: '' }; }

var AS_CONTENT = { batches: [], testimonials: { home: [], jyotish: [], bach: [], happiness: [] }, announcement: null, links: { whatsapp: '919985133161' } };

var AS_READY = (function () {
  function live(b) {
    if (!b.end) return true;
    var d = new Date(b.end + 'T23:59:59+05:30');
    return isNaN(d) || d.getTime() >= Date.now();
  }
  function apply(c) {
    if (!c) return;
    if (Array.isArray(c.batches)) AS_CONTENT.batches = c.batches.filter(live);
    if (c.testimonials) for (var k in c.testimonials) AS_CONTENT.testimonials[k] = c.testimonials[k] || [];
    if (c.announcement && c.announcement.text) AS_CONTENT.announcement = c.announcement;
    if (c.links && c.links.whatsapp) AS_CONTENT.links.whatsapp = c.links.whatsapp;
  }
  function get(url, headers) {
    return fetch(url, { headers: headers || {}, cache: 'no-cache' }).then(function (r) {
      if (!r.ok) throw new Error(r.status); return r.json();
    });
  }
  function fromSupabase() {
    var h = { apikey: AS_SUPABASE.anonKey, Authorization: 'Bearer ' + AS_SUPABASE.anonKey };
    var base = AS_SUPABASE.url.replace(/\/$/, '') + '/rest/v1/';
    return Promise.all([
      get(base + 'batches?select=*&order=sort.asc,starts_on.asc', h),
      get(base + 'testimonials?select=*&order=sort.asc', h),
      get(base + 'site_settings?select=key,value', h)
    ]).then(function (r) {
      var out = { batches: [], testimonials: { home: [], jyotish: [], bach: [], happiness: [] }, links: {}, announcement: null };
      r[0].forEach(function (b) {
        out.batches.push({ date: b.date_label, time: b.time_label, mode: b.mode, language: b.language, seats: b.seats, fee: b.fee_label, registerUrl: b.register_url, end: b.ends_on });
      });
      r[1].forEach(function (t) { (out.testimonials[t.page] = out.testimonials[t.page] || []).push({ quote: t.quote, name: t.name, role: t.role, city: t.city, source: t.source, url: t.source_url }); });
      r[2].forEach(function (s) { if (s.key === 'announcement') out.announcement = s.value; if (s.key === 'links') out.links = s.value; });
      return out;
    });
  }
  function fromFile() { return get('/data/site.json'); }

  var p = (AS_SUPABASE.url && AS_SUPABASE.anonKey) ? fromSupabase().catch(fromFile) : fromFile();
  return p.then(function (c) { apply(c); return AS_CONTENT; }).catch(function () { return AS_CONTENT; });
})();
