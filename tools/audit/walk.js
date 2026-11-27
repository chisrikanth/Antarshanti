// "Experience it as a user": scroll each page from top to bottom, one screen at a time, and photograph every screen.
const { chromium } = require('playwright'); const OUT = process.argv[2], B = 'http://127.0.0.1:8099';
const PAGES = [['home', '/'], ['jyotish', '/jyotish.html'], ['bach', '/bach.html'], ['happiness', '/happiness.html']];
(async () => { const b = await chromium.launch();
  for (const [dev, o] of [['d', { w: 1440, h: 900 }], ['m', { w: 390, h: 844, mob: true }]]) {
    for (const [name, path] of PAGES) { const c = await b.newContext({ viewport: { width: o.w, height: o.h }, isMobile: !!o.mob, hasTouch: !!o.mob, deviceScaleFactor: 1 }); const pg = await c.newPage();
      await pg.goto(B + path, { waitUntil: 'load' }); await pg.waitForTimeout(700); await pg.addStyleTag({ content: '.spin-el{animation:none!important}' });
      const H = await pg.evaluate(() => document.documentElement.scrollHeight); let i = 0, y = 0; const step = Math.round(o.h * 0.9);
      while (y < H - o.h + step && i < 14) { await pg.evaluate(v => scrollTo(0, v), y); await pg.waitForTimeout(450); await pg.screenshot({ path: `${OUT}/${name}-${dev}-${String(i).padStart(2, '0')}.png` }); i++; y += step; if (y > H - o.h) { await pg.evaluate(v => scrollTo(0, v), H); await pg.waitForTimeout(400); await pg.screenshot({ path: `${OUT}/${name}-${dev}-${String(i).padStart(2, '0')}.png` }); i++; break; } }
      console.log(dev, name, 'page height', H, 'px,', i, 'screens'); await c.close(); } }
  await b.close(); })();
