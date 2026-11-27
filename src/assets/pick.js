/* Home: "How are you arriving today?". One tap on a feeling points to the path that fits, highlights that card
   and offers to scroll there; scrolling only happens when the visitor presses the button. "Heavy heart" also shows
   the care line and a WhatsApp option. "Just looking" offers the free check-in. Nothing is stored or sent;
   analytics only counts engage_start and engage_cta (never which feeling). With prefers-reduced-motion the scroll
   is instant. */
(function () {
  var root = document.querySelector('[data-pick]');
  if (!root) return;
  var $ = function (s) { return root.querySelector(s); };
  var chips = root.querySelectorAll('.pick-chip'), reply = $('.pick-reply'), care = $('.pick-care'), box = $('.pick-actions');
  var show = $('.pick-show'), checkin = $('.pick-checkin'), look = $('.pick-look'), wa = $('.pick-wa');
  var PATH = ['happiness', 'bach', 'jyotish', null];
  var started = false, current = null;
  function track(n) { try { if (window.AS && window.AS.track) window.AS.track(n, { page: 'home' }); } catch (e) {} }
  function card(p) { return p ? document.querySelector('#offerings [data-path="' + p + '"]') : null; }
  function clear() {
    [].forEach.call(document.querySelectorAll('#offerings .is-suggested'), function (c) { c.classList.remove('is-suggested'); var t = c.querySelector('.pick-tag'); if (t) t.remove(); });
  }
  function go(el) { el.scrollIntoView({ behavior: 'auto', block: 'center' }); }   // CSS decides: smooth normally, instant when motion is reduced
  chips.forEach(function (c) {
    c.addEventListener('click', function () {
      var i = +c.getAttribute('data-i'); current = PATH[i];
      if (!started) { started = true; track('engage_start'); }
      chips.forEach(function (o) { o.setAttribute('aria-pressed', o === c ? 'true' : 'false'); });
      reply.textContent = root.getAttribute('data-r' + i) || '';
      care.hidden = i !== 1; wa.hidden = i !== 1;
      show.hidden = !current; checkin.hidden = i !== 3; look.hidden = i !== 3; box.hidden = false;
      clear();
      var el = card(current);
      if (el) { el.classList.add('is-suggested'); var t = document.createElement('span'); t.className = 'pick-tag'; t.setAttribute('aria-hidden', 'true'); t.textContent = root.getAttribute('data-suggested'); el.appendChild(t); }
    });
  });
  show.addEventListener('click', function () { var el = card(current); if (!el) return; track('engage_cta'); go(el); el.focus({ preventScroll: true }); });
  look.addEventListener('click', function () { var el = document.getElementById('offerings'); if (!el) return; track('engage_cta'); go(el); });
  checkin.addEventListener('click', function () { track('engage_cta'); });
})();
