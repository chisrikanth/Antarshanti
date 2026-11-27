/* Home: the wheel's signature moment.
   Three planets (Jyotish saffron, Bach rose, Happiness green) start on separate orbits and spiral in to
   one centre as the visitor scrolls through the hero. This script only sets one CSS variable, --p (0 to 1),
   on .wheel-stage; all drawing is CSS transforms (see theme.css, "Signature moment").
   With prefers-reduced-motion, or no JS, the wheel stays still at --p:0. */
(function () {
  var hero = document.querySelector('.home-hero');
  var stage = hero && hero.querySelector('.wheel-stage');
  if (!stage || !window.matchMedia) return;
  var mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (mq.matches) return;
  var start = 0, finish = 1, ticking = false, last = -1;

  function measure() {
    var cs = getComputedStyle(stage), hs = getComputedStyle(hero);
    var stickTop = parseFloat(cs.top) || 0, padTop = parseFloat(hs.paddingTop) || 0;
    var heroTop = hero.getBoundingClientRect().top + window.pageYOffset;
    var card = hero.querySelector('#offerings a');                          // first of the three path cards
    var cardTop = card ? card.getBoundingClientRect().top + window.pageYOffset : heroTop + hero.offsetHeight;
    start = Math.max(0, heroTop + padTop - stickTop);                       // the wheel starts to stick here
    var release = heroTop + hero.offsetHeight - stickTop - stage.offsetHeight;   // and is released here
    // finish the spiral just before the cards rise over the wheel's centre, so the arrival is seen
    finish = Math.min(release, cardTop - (stickTop + stage.offsetHeight / 2) - 110);
    if (finish < start + 150) finish = start + 150;
  }
  function update() {
    ticking = false;
    var t = Math.min(1, Math.max(0, (window.pageYOffset - start) / (finish - start)));
    var p = t * t * (3 - 2 * t);                                            // gentle ease in and out
    if (Math.abs(p - last) < 0.002) return;
    last = p;
    stage.style.setProperty('--p', p.toFixed(3));
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
  function onResize() { measure(); update(); }

  measure(); update();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize);
  window.addEventListener('load', onResize);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(onResize);
  mq.addEventListener && mq.addEventListener('change', function (e) { if (e.matches) stage.style.setProperty('--p', 0); });
})();
