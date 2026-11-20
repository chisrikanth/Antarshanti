// Birth details collected on the Jyotish form: validation, storage and what appears in the calendar event.
const assert = require('assert');
const { validateBirth } = require('../netlify/functions/lib/birth');
const { jyotishEvent } = require('../netlify/functions/lib/eventDetails');
const NOW = new Date('2026-11-20T10:00:00Z');
const ok = { dob: '1990-03-14', tob: '06:35', pob: 'Hyderabad, Telangana, India', gender: 'female', focus: 'career' };
const code = (o) => validateBirth(Object.assign({}, ok, o), NOW).code;

assert.equal(validateBirth(ok, NOW).ok, true);
assert.equal(code({ dob: '' }), 'dob'); assert.equal(code({ dob: '1990-02-31' }), 'dob'); assert.equal(code({ dob: '1899-12-31' }), 'dob');
assert.equal(code({ dob: '2027-01-01' }), 'dob'); assert.equal(code({ dob: '14/03/1990' }), 'dob');
assert.equal(code({ tob: '' }), 'tob'); assert.equal(code({ tob: '25:10' }), 'tob'); assert.equal(code({ tob: '6:35' }), 'tob');
assert.equal(code({ pob: '' }), 'pob'); assert.equal(code({ pob: 'a' }), 'pob'); assert.equal(code({ pob: '12345' }), 'pob');
console.log('date, time and place checks: bad values refused with dob / tob / pob');

let r = validateBirth(Object.assign({}, ok, { tob: '', tob_unknown: true, tob_approx: 'around sunrise' }), NOW);
assert.equal(r.ok, true); assert.equal(r.value.tob, ''); assert.equal(r.value.tob_approx, 'around sunrise');
r = validateBirth(Object.assign({}, ok, { gender: 'xyz', focus: 'nonsense', pob: 'Warangal\n<b>x</b>' }), NOW);
assert.equal(r.value.gender, ''); assert.equal(r.value.focus, ''); assert.ok(!/\n/.test(r.value.pob));
assert.equal(validateBirth(Object.assign({}, ok, { pob: 'తెనాలి, ఆంధ్రప్రదేశ్' }), NOW).ok, true);
console.log('unknown time allowed, unknown choices dropped, Telugu place names accepted');

const e = jyotishEvent({ name: 'Ravi', phone: '9876543210', birth: validateBirth(ok, NOW).value, slotStart: '2026-11-23T03:30:00Z', lang: 'te', bookingId: 'x' });
const d = e.description;
assert.ok(d.includes('Date of birth: 14 Mar 1990') && d.includes('Time of birth: 6:35 AM') && d.includes('Place of birth: Hyderabad, Telangana, India') && d.includes('Gender: Female') && d.includes('Wants to focus on: Career and work'));
const e2 = jyotishEvent({ name: 'Ravi', phone: '9876543210', birth: validateBirth(Object.assign({}, ok, { tob: '', tob_unknown: true, tob_approx: 'evening' }), NOW).value, slotStart: '2026-11-23T03:30:00Z', lang: 'en', bookingId: 'x' });
assert.ok(e2.description.includes('Time of birth: not known (they say: evening)'));
console.log('calendar event shows date, time, place, gender and focus');
console.log('ALL BIRTH TESTS PASSED');
