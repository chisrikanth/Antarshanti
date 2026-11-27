/* Happiness page: "a minute of calm breathing".
   In 4, hold 4, out 6, rest 2, three rounds (about 50 s); a gentler version skips the holds (in 4, out 6).
   Afterwards it asks how the visitor feels and answers kindly; only "calmer" or "about the same" offers the
   next batch, and "a bit uneasy" offers a WhatsApp message to Srikanth, never registration.
   Nothing is stored and the feeling answer is never sent anywhere. Analytics only counts: breathe_start,
   breathe_done, breathe_cta. The orb is a balloon drawn by this file: one volume value follows the breathing curve through a soft spring, and the size
   comes from the volume (diameter ~ cube root of volume). With prefers-reduced-motion nothing is drawn moving; CSS crossfades two discs.
   The orb has no numbers: it fills as you breathe in, eases back as you breathe out and keeps its size on a hold. Words come from data-* attributes (i18n files). */
(function () {
  var root = document.querySelector('[data-breathe]');
  if (!root) return;
  var $ = function (s) { return root.querySelector(s); };
  var btn = $('.breathe-orb'), cap = $('.breathe-cap'), gentle = $('.breathe-gentle');
  var after = $('.breathe-after'), reply = $('.breathe-reply'), ctas = $('.breathe-ctas'), chips = root.querySelectorAll('.breathe-chip');
  var ROUNDS = +root.getAttribute('data-rounds') || 3, UNIT = +root.getAttribute('data-unit') || 1000;
  var NAMES = ['in', 'hold', 'out', 'rest'];
  var T = { label: attr('label'), done: attr('done'), stop: attr('stop') };
  NAMES.forEach(function (n) { T[n] = attr(n); });
  function attr(k) { return root.getAttribute('data-t-' + k) || ''; }
  function nums(s) { return (s || '').split(',').map(Number); }
  var PLAN = nums(root.getAttribute('data-pattern'));            // 4,4,6,2   (in, hold, out, rest)
  var GENTLE = nums(root.getAttribute('data-gentle'));           // 4,6       (in, out)
  var timer = null, running = false;

  /* ---- the balloon ---- */
  var body = $('.b-body'), glow = $('.b-glow'), path = body && body.querySelector('path');
  var reduce = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
  var ph = null, t0 = 0, dur = 1, fv = 0, vel = 0, last = 0, raf = 0, seen = false, N = 12;
  function ss(x) { return x * x * (3 - 2 * x); }
  function fIn(p) { return ss(Math.pow(p, .85)); }                 // breathing in: slow start, a little front-loaded, gentle arrival
  function fOut(p) { return 1 - ss(Math.pow(p, .6)); }             // breathing out: elastic recoil, so a faster start and a long, soft tail
  function goal(now) {
    if (!ph) return .035 * (1 + Math.sin(now / 1000 * 6.283 / 7)) / 2;   // idle: a barely-there drift (about 1% of the size)
    var p = Math.min(1, (now - t0) / dur);
    return ph === 'in' ? fIn(p) : ph === 'out' ? fOut(p) : ph === 'hold' ? 1 : 0;
  }
  function draw(now) {
    var a = .005 + .02 * Math.min(1, Math.abs(vel) / .4), t = now / 1000, pts = [], i, k, r, th;
    for (i = 0; i < N; i++) {
      th = i / N * 6.2832 - 1.5708;
      r = 1 + a * (Math.sin(2 * th + t * .9) + .7 * Math.sin(3 * th - t * 1.3 + 1.7) + .45 * Math.sin(4 * th + t * 1.7 + 3.1)) / 2.15;
      pts.push([100 * r * Math.cos(th), 100 * r * Math.sin(th)]);
    }
    var d = 'M' + pts[0][0].toFixed(1) + ' ' + pts[0][1].toFixed(1);
    for (i = 0; i < N; i++) {                                     // closed Catmull-Rom spline as cubic Beziers
      var p0 = pts[(i + N - 1) % N], p1 = pts[i], p2 = pts[(i + 1) % N], p3 = pts[(i + 2) % N];
      d += 'C' + (p1[0] + (p2[0] - p0[0]) / 6).toFixed(1) + ' ' + (p1[1] + (p2[1] - p0[1]) / 6).toFixed(1) + ' ' +
        (p2[0] - (p3[0] - p1[0]) / 6).toFixed(1) + ' ' + (p2[1] - (p3[1] - p1[1]) / 6).toFixed(1) + ' ' + p2[0].toFixed(1) + ' ' + p2[1].toFixed(1);
    }
    path.setAttribute('d', d + 'Z');
    var f = Math.max(-.05, Math.min(1.1, fv)), s = Math.cbrt((1 + 1.5 * f) / 2.5);   // a full breath is ~2.5x the normal volume
    body.style.transform = 'scale(' + (s * (1 - .012 * f)).toFixed(4) + ',' + (s * (1 + .03 * f)).toFixed(4) + ')';   // a touch taller when full
    glow.style.transform = 'scale(' + s.toFixed(4) + ')';
    glow.style.opacity = (.5 + .45 * Math.max(0, Math.min(1, f))).toFixed(3);
  }
  function loop(now) {
    raf = requestAnimationFrame(loop);
    var dt = Math.min(.05, (now - (last || now)) / 1000); last = now;
    var g = goal(now), w = 6, z = 1, n = 2, h = dt / n, j;      // a soft spring: the balloon has a little mass
    for (j = 0; j < n; j++) { vel += (w * w * (g - fv) - 2 * z * w * vel) * h; fv += vel * h; }
    draw(now);
  }
  function wake() { if (path && !raf && !reduce.matches) { last = 0; root.setAttribute('data-live', ''); raf = requestAnimationFrame(loop); } }
  function sleep() { cancelAnimationFrame(raf); raf = 0; root.removeAttribute('data-live'); }
  if (path) {
    draw(performance.now());
    if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { seen = e[0].isIntersecting; if (seen) wake(); else if (!running) sleep(); }, { threshold: .1 }).observe(root);
    else wake();
    if (reduce.addEventListener) reduce.addEventListener('change', function () { if (reduce.matches) sleep(); else if (seen || running) wake(); });
  }

  function track(n, p) { try { if (window.AS && window.AS.track) window.AS.track(n, p); } catch (e) {} }
  function steps() {   // [{name, secs}, ...] for one round
    return gentle.checked ? [{ k: 'in', s: GENTLE[0] }, { k: 'out', s: GENTLE[1] }]
      : PLAN.map(function (s, i) { return { k: NAMES[i], s: s }; });
  }
  function phase(k, secs) {
    root.setAttribute('data-phase', k); root.style.setProperty('--d', secs * UNIT + 'ms');
    ph = k; t0 = performance.now(); dur = secs * UNIT;
    cap.textContent = T[k];
  }
  function reset(keepAfter) {
    clearTimeout(timer); running = false; ph = null;
    root.removeAttribute('data-phase'); cap.textContent = T.label;
    btn.setAttribute('aria-label', T.label); gentle.disabled = false;
    if (!keepAfter) { after.hidden = true; ctas.hidden = true; reply.textContent = ''; chips.forEach(function (c) { c.setAttribute('aria-pressed', 'false'); }); }
  }
  function run(list, i, round) {
    if (i >= list.length) { round++; i = 0; if (round >= ROUNDS) return finish(); }
    var s = list[i]; phase(s.k, s.s);
    timer = setTimeout(function () { run(list, i + 1, round); }, s.s * UNIT);
  }
  function finish() {
    reset(true); cap.textContent = T.done; after.hidden = false; track('breathe_done');
  }
  btn.addEventListener('click', function () {
    if (running) { reset(false); return; }                        // a second tap stops it
    reset(false); running = true; btn.setAttribute('aria-label', T.stop || T.label); gentle.disabled = true;
    track('breathe_start'); wake();
    run(steps(), 0, 0);
  });
  chips.forEach(function (c) {
    c.addEventListener('click', function () {
      var n = +c.getAttribute('data-feel');
      chips.forEach(function (o) { o.setAttribute('aria-pressed', o === c ? 'true' : 'false'); });
      reply.textContent = root.getAttribute('data-r' + n) || '';
      ctas.hidden = false;
      root.querySelector('.breathe-register').hidden = (n === 2);  // someone who felt uneasy is never pointed to registration
    });
  });
  root.querySelector('.breathe-register').addEventListener('click', function (e) {
    var target = document.getElementById('register'); if (!target) return;
    e.preventDefault(); track('breathe_cta', { label: 'register' });
    target.scrollIntoView({ behavior: 'auto', block: 'start' });   // CSS decides: smooth normally, instant when motion is reduced
    if (history.replaceState) history.replaceState(null, '', '#register');
    target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true });
  });
  document.addEventListener('visibilitychange', function () { if (document.hidden && running) reset(false); });
})();
