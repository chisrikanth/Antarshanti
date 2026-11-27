/* Home: "Take one slow breath". A small orb the visitor can tap: three breaths, 4 s in and 6 s out,
   with a plain caption. No sound, no vibration, no claims. All motion is CSS (see theme.css, ".breathe");
   with prefers-reduced-motion the orb does not move and only the caption counts the breaths.
   Timing and wording come from data-* attributes on [data-breathe] (the words from the i18n files). */
(function () {
  var root = document.querySelector('[data-breathe]');
  if (!root) return;
  var btn = root.querySelector('.breathe-orb'), cap = root.querySelector('.breathe-cap');
  var IN = +root.getAttribute('data-in-ms') || 4000, OUT = +root.getAttribute('data-out-ms') || 6000;
  var ROUNDS = +root.getAttribute('data-rounds') || 3;
  var T = { label: root.getAttribute('data-t-label'), inn: root.getAttribute('data-t-in'), out: root.getAttribute('data-t-out'), done: root.getAttribute('data-t-done') };
  var timer = null, running = false, round = 0;
  root.style.setProperty('--in', IN + 'ms');
  root.style.setProperty('--out', OUT + 'ms');

  function say(t) { cap.textContent = t; }
  function reset() {
    clearTimeout(timer); running = false; round = 0;
    root.classList.remove('is-in', 'is-out'); say(T.label); btn.setAttribute('aria-pressed', 'false');
  }
  function inhale() { root.classList.remove('is-out'); root.classList.add('is-in'); say(T.inn); timer = setTimeout(exhale, IN); }
  function exhale() { root.classList.remove('is-in'); root.classList.add('is-out'); say(T.out); round++; timer = setTimeout(round >= ROUNDS ? finish : inhale, OUT); }
  function finish() { root.classList.remove('is-out'); say(T.done); running = false; btn.setAttribute('aria-pressed', 'false'); timer = setTimeout(reset, 7000); }

  btn.addEventListener('click', function () {
    if (running) { reset(); return; }                       // a second tap stops it
    reset(); running = true; btn.setAttribute('aria-pressed', 'true');
    try { if (window.AS && window.AS.track) window.AS.track('breathe_start'); } catch (e) {}
    inhale();
  });
  document.addEventListener('visibilitychange', function () { if (document.hidden && running) reset(); });
})();
