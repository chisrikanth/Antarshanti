/* Antarshanti booking helper: live availability from the server, shared by Bach and Jyotish.
   If the availability service is unreachable, the pages quietly keep their built-in weekly schedule
   (the server still checks every booking, so nothing can be double-booked). */
window.ASBook = (function () {
  var data = null, TAKEN = {};
  var DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function to24(t) { var m = /(\d+):(\d+)\s*(AM|PM)/i.exec(t); var h = (+m[1]) % 12; if (/PM/i.test(m[3])) h += 12; return pad(h) + ':' + m[2]; }
  function to12(hm) { var h = +hm.slice(0, 2), m = hm.slice(3, 5); var ap = h >= 12 ? 'PM' : 'AM'; h = h % 12 || 12; return pad(h) + ':' + m + ' ' + ap; }
  // The slot as an exact instant in India time, e.g. 2026-12-07T09:00:00+05:30
  function iso(date, t) { return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate()) + 'T' + to24(t) + ':00+05:30'; }
  function load() {
    return fetch('/.netlify/functions/slots', { cache: 'no-store' }).then(function (r) { return r.json(); }).then(function (d) {
      data = d && d.live ? d : null; TAKEN = {};
      if (data) data.taken.forEach(function (x) { TAKEN[new Date(x).getTime()] = 1; });
      return data;
    }).catch(function () { data = null; return null; });
  }
  function slotsFromRules(rules) {
    var out = {};
    Object.keys(rules).forEach(function (wd) { out[DAYS[+wd]] = rules[wd].map(to12); });
    return out;
  }
  // 'free' | 'taken' | 'past' | 'blocked'
  function state(date, t) {
    var stamp = iso(date, t), ms = new Date(stamp).getTime();
    var lead = (data ? data.leadMinutes : 120) * 60000;
    if (ms < Date.now() + lead) return 'past';
    if (data) { if (data.blocked.indexOf(stamp.slice(0, 10)) > -1) return 'blocked'; if (TAKEN[ms]) return 'taken'; }
    return 'free';
  }
  // The times offered on a date: from the calendar (specific dates) or the weekly schedule.
  function timesFor(date, weekly) {
    if (data && data.mode === 'calendar') { var ymd = iso(date, '12:00 AM').slice(0, 10); return (data.days[ymd] || []).map(to12); }
    return weekly[DAYS[date.getDay()]] || [];
  }
  function dayHasFree(date, times) { return times.some(function (t) { return state(date, t) === 'free'; }); }
  return { timesFor: timesFor, load: load, iso: iso, state: state, dayHasFree: dayHasFree, slotsFromRules: slotsFromRules };
})();
