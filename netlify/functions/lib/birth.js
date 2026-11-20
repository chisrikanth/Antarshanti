// Checks the birth details sent with a Jyotish request. Same rules as the form on the page.
const GENDERS = new Set(['', 'female', 'male', 'other']);
const FOCUS = new Set(['', 'career', 'relationships', 'family', 'money', 'education', 'general', 'other']);
const clean = (s, n) => String(s == null ? '' : s).replace(/[\r\n\t]+/g, ' ').replace(/\s{2,}/g, ' ').trim().slice(0, n);

// returns { ok:true, value } or { code:'dob'|'tob'|'pob' }
function validateBirth(p, now) {
  p = p || {}; now = now || new Date();
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(p.dob || ''));
  if (!m) return { code: 'dob' };
  const y = +m[1], mo = +m[2], d = +m[3], dt = new Date(Date.UTC(y, mo - 1, d));
  if (dt.getUTCFullYear() !== y || dt.getUTCMonth() !== mo - 1 || dt.getUTCDate() !== d) return { code: 'dob' };  // e.g. 31 Feb
  if (y < 1900 || dt.getTime() > now.getTime() + 24 * 3600 * 1000) return { code: 'dob' };                         // not in the future
  const unknown = p.tob_unknown === true;
  let tob = '';
  if (!unknown) { const t = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(String(p.tob || '')); if (!t) return { code: 'tob' }; tob = t[0]; }
  const pob = clean(p.pob, 120);
  if (pob.length < 2 || !/\p{L}/u.test(pob)) return { code: 'pob' };
  const gender = GENDERS.has(p.gender) ? p.gender : '', focus = FOCUS.has(p.focus) ? p.focus : '';
  return { ok: true, value: { dob: m[0], tob, tob_unknown: unknown, tob_approx: unknown ? clean(p.tob_approx, 60) : '', pob, gender, focus } };
}
module.exports = { validateBirth };
