// Language files: same keys, same placeholders and HTML in every language; every server error code has a text;
// no hard-coded links to a page that exists in several languages.
const assert = require('assert'), fs = require('fs'), path = require('path');
const dir = path.join(__dirname, '..', 'src', '_data', 'i18n');
const load = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const en = load('en.json');
const marks = (s) => (s.match(/\{\w+\}|<[^>]+>/g) || []).sort().join('|');
const IGNORE_MARKS = new Set(['checkin.js.next.steadyLine', 'booking.timeFmt']);   // links are language-specific; time format differs by design

function walk(a, b, p, problems) {
  if (a && typeof a === 'object') {
    if (!b || typeof b !== 'object') { problems.push('missing ' + p); return; }
    if (Array.isArray(a)) { if (!Array.isArray(b) || a.length !== b.length) problems.push('list length differs at ' + p); }
    else { const ka = Object.keys(a).sort().join(), kb = Object.keys(b).sort().join(); if (ka !== kb) problems.push('keys differ at ' + p + ': ' + ka.split(',').filter((k) => !kb.split(',').includes(k)).concat(kb.split(',').filter((k) => !ka.split(',').includes(k))).join(',')); }
    Object.keys(a).forEach((k) => { if (b && b[k] !== undefined) walk(a[k], b[k], p ? p + '.' + k : k, problems); });
  } else if (typeof a === 'string') {
    if (typeof b !== 'string') { problems.push('not text at ' + p); return; }
    if (!IGNORE_MARKS.has(p) && marks(a) !== marks(b)) problems.push('placeholders or HTML differ at ' + p);
    if (b.trim() === '') problems.push('empty at ' + p);
  }
}
['te', 'hi'].forEach((l) => {
  const problems = []; walk(en, load(l + '.json'), '', problems);
  assert.deepEqual(problems, [], l + ': ' + problems.slice(0, 5).join(' | '));
  console.log(l + ': same keys, placeholders and HTML as English');
});

// every code the server can send has a visitor-language text
const codes = new Set();
['lib/booking.js', 'lib/db.js', 'reserve-slot.js', 'create-order.js'].forEach((f) => {
  const s = fs.readFileSync(path.join(__dirname, '..', 'netlify', 'functions', f), 'utf8');
  (s.match(/code: '(\w+)'/g) || []).forEach((m) => codes.add(m.slice(7, -1)));
});
['en', 'te', 'hi'].forEach((l) => {
  const errs = load(l + '.json').booking.errors;
  const missing = [...codes].filter((c) => !errs[c]);
  assert.deepEqual(missing, [], l + ' booking.errors lacks: ' + missing.join());
});
console.log('every server error code (' + [...codes].join(', ') + ') has English, Telugu and Hindi text');

// pages that exist in several languages must link with the language-aware filter
const translated = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'src', '_data', 'translated.json'), 'utf8'));
const bad = [];
['src/_includes/partials/footer.njk', 'src/index.njk', 'src/happiness.njk', 'src/jyotish.njk', 'src/bach.njk', 'src/checkin.njk', 'src/privacy.njk', 'src/terms.njk', 'src/refund.njk'].forEach((f) => {
  const s = fs.readFileSync(path.join(__dirname, '..', f), 'utf8');
  translated.forEach((page) => { if (new RegExp('href="/?' + page.replace('.', '\\.') + '[#"]').test(s)) bad.push(f + ' -> ' + page); });
});
assert.deepEqual(bad, [], 'hard-coded links to translated pages: ' + bad.join(', '));
console.log('no hard-coded links to translated pages');
console.log('ALL LANGUAGE TESTS PASSED');
