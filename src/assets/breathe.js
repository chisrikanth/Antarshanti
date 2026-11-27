/* Happiness page: "a minute of calm breathing".
   In 4, hold 4, out 6, rest 2, three rounds (about 50 s); a gentler version skips the holds (in 4, out 6).
   Afterwards it asks how the visitor feels and answers kindly; only "calmer" or "about the same" offers the
   next batch, and "a bit uneasy" offers a WhatsApp message to Srikanth, never registration.
   Nothing is stored and the feeling answer is never sent anywhere. Analytics only counts: breathe_start,
   breathe_done, breathe_cta. All motion is CSS (theme.css, ".breathe"); with prefers-reduced-motion the orb
   stays still and only the words and counting numbers change. Words come from data-* attributes (i18n files). */
(function () {
  var root = document.querySelector('[data-breathe]');
  if (!root) return;
  var $ = function (s) { return root.querySelector(s); };
  var btn = $('.breathe-orb'), cap = $('.breathe-cap'), count = $('.breathe-count'), gentle = $('.breathe-gentle');
  var after = $('.breathe-after'), reply = $('.breathe-reply'), ctas = $('.breathe-ctas'), chips = root.querySelectorAll('.breathe-chip');
  var ROUNDS = +root.getAttribute('data-rounds') || 3, UNIT = +root.getAttribute('data-unit') || 1000;
  var NAMES = ['in', 'hold', 'out', 'rest'];
  var T = { label: attr('label'), done: attr('done') };
  NAMES.forEach(function (n) { T[n] = attr(n); });
  function attr(k) { return root.getAttribute('data-t-' + k) || ''; }
  function nums(s) { return (s || '').split(',').map(Number); }
  var PLAN = nums(root.getAttribute('data-pattern'));            // 4,4,6,2   (in, hold, out, rest)
  var GENTLE = nums(root.getAttribute('data-gentle'));           // 4,6       (in, out)
  var timer = null, tick = null, running = false, reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  function track(n, p) { try { if (window.AS && window.AS.track) window.AS.track(n, p); } catch (e) {} }
  function steps() {   // [{name, secs}, ...] for one round
    return gentle.checked ? [{ k: 'in', s: GENTLE[0] }, { k: 'out', s: GENTLE[1] }]
      : PLAN.map(function (s, i) { return { k: NAMES[i], s: s }; });
  }
  function phase(k, secs) {
    root.setAttribute('data-phase', k); root.style.setProperty('--d', secs * UNIT + 'ms');
    cap.textContent = T[k]; var left = secs; count.textContent = left;
    clearInterval(tick); tick = setInterval(function () { left--; if (left > 0) count.textContent = left; }, UNIT);
  }
  function reset(keepAfter) {
    clearTimeout(timer); clearInterval(tick); running = false;
    root.removeAttribute('data-phase'); count.textContent = ''; cap.textContent = T.label;
    btn.setAttribute('aria-pressed', 'false'); gentle.disabled = false;
    if (!keepAfter) { after.hidden = true; ctas.hidden = true; reply.textContent = ''; chips.forEach(function (c) { c.setAttribute('aria-pressed', 'false'); }); }
  }
  function run(list, i, round) {
    if (i >= list.length) { round++; i = 0; if (round >= ROUNDS) return finish(); }
    var s = list[i]; phase(s.k, s.s);
    timer = setTimeout(function () { run(list, i + 1, round); }, s.s * UNIT);
  }
  function finish() {
    reset(true); cap.textContent = T.done; after.hidden = false; track('breathe_done');
    var first = chips[0]; if (first && !reduce) { /* leave focus where it is; the orb keeps it */ }
  }
  btn.addEventListener('click', function () {
    if (running) { reset(false); return; }                        // a second tap stops it
    reset(false); running = true; btn.setAttribute('aria-pressed', 'true'); gentle.disabled = true;
    track('breathe_start', { label: gentle.checked ? 'gentle' : 'full' });
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
    target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    if (history.replaceState) history.replaceState(null, '', '#register');
    target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true });
  });
  document.addEventListener('visibilitychange', function () { if (document.hidden && running) reset(false); });
})();
