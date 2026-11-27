// Measures the empty vertical space between the CONTENT of consecutive blocks of <main> (not their padding).
const { chromium } = require('playwright'); const B = 'http://127.0.0.1:8099';
const PAGES = [['home', '/'], ['jyotish', '/jyotish.html'], ['bach', '/bach.html'], ['happiness', '/happiness.html'], ['te-home', '/te/'], ['hi-happiness', '/hi/happiness.html']];
const MEASURE = () => {
  const main = document.querySelector('main'); const out = [];
  const contentBox = (blk) => { let top = Infinity, bottom = -Infinity;
    const take = (r) => { if (r.width < 2 || r.height < 2) return; top = Math.min(top, r.top + scrollY); bottom = Math.max(bottom, r.bottom + scrollY); };
    const w = document.createTreeWalker(blk, NodeFilter.SHOW_TEXT); let n; while ((n = w.nextNode())) { if (!n.textContent.trim()) continue; const el = n.parentElement; if (el.closest('.hero-deco,[hidden],script,style')) continue; const cs = getComputedStyle(el); if (cs.visibility === 'hidden' || cs.display === 'none') continue; const r = document.createRange(); r.selectNodeContents(n); for (const q of r.getClientRects()) take(q); }
    blk.querySelectorAll('img,.btn,button,iframe,input,.vid,.booking-box,.cta-strip-inner,.checkin-band-inner,.card,.res-card,.batch-card,.ig-photo').forEach(e => { if (e.closest('[hidden],.hero-deco')) return; const cs = getComputedStyle(e); if (cs.visibility === 'hidden' || cs.display === 'none') return; take(e.getBoundingClientRect()); });
    return top === Infinity ? null : { top, bottom }; };
  const blocks = [...main.children].filter(e => !/SCRIPT|STYLE/.test(e.tagName)).map(e => ({ el: e, label: (e.tagName.toLowerCase() + (e.id ? '#' + e.id : '') + (e.className ? '.' + String(e.className).split(' ')[0] : '')), box: contentBox(e) })).filter(b => b.box);
  for (let i = 1; i < blocks.length; i++) out.push({ from: blocks[i - 1].label, to: blocks[i].label, gap: Math.round(blocks[i].box.top - blocks[i - 1].box.bottom) });
  const f = document.querySelector('footer'); if (f && blocks.length) { const fb = contentBox(f); if (fb) out.push({ from: blocks[blocks.length - 1].label, to: 'footer', gap: Math.round(fb.top - blocks[blocks.length - 1].box.bottom) }); }
  return out; };
(async () => { const b = await chromium.launch(); const TAG = process.argv[2] || '';
  for (const [dev, o] of [['desktop 1440', { w: 1440, h: 900 }], ['phone 390', { w: 390, h: 844, mob: true }]]) {
    console.log('=== ' + TAG + ' ' + dev); let worst = 0, total = 0, count = 0;
    for (const [name, path] of PAGES) { const c = await b.newContext({ viewport: { width: o.w, height: o.h }, isMobile: !!o.mob, hasTouch: !!o.mob }); const pg = await c.newPage(); await pg.goto(B + path, { waitUntil: 'load' }); await pg.waitForTimeout(500);
      await pg.addStyleTag({ content: '.rv-hide{opacity:1!important;transform:none!important}.spin-el{animation:none!important}' }); await pg.waitForTimeout(250);
      const gaps = await pg.evaluate(MEASURE); const g = gaps.map(x => x.gap); const mx = Math.max(...g); worst = Math.max(worst, mx); total += g.reduce((a, b) => a + b, 0); count += g.length;
      console.log('  ' + name.padEnd(13) + ' gaps(px): ' + g.join(', ').padEnd(70) + ' | biggest ' + mx); await c.close(); }
    console.log('  average gap ' + Math.round(total / count) + 'px, biggest anywhere ' + worst + 'px'); }
  await b.close(); })();
