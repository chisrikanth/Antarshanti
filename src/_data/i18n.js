// Loads every language file in src/_data/i18n/ and fills any missing text from English,
// so a half-finished translation can never show a blank.
const fs = require('fs'), path = require('path');
const dir = path.join(__dirname, 'i18n');
const read = (c) => { try { return JSON.parse(fs.readFileSync(path.join(dir, c + '.json'), 'utf8')); } catch (e) { return null; } };
const merge = (base, over) => {
  if (Array.isArray(base)) return Array.isArray(over) && over.length === base.length ? over.map((v, i) => merge(base[i], v)) : base;
  if (base && typeof base === 'object') { const out = {}; for (const k of Object.keys(base)) out[k] = merge(base[k], over && over[k]); return out; }
  return typeof over === typeof base && over !== '' && over != null ? over : base;
};
const en = read('en');
const out = { en };
['te', 'hi'].forEach((c) => { const f = read(c); out[c] = f ? merge(en, f) : en; });
module.exports = out;
