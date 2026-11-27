const { chromium } = require('playwright'); const B = 'http://127.0.0.1:8099';
(async () => { const b = await chromium.launch();
  for (const [dev, o] of [['desktop', { w: 1440, h: 900 }], ['phone', { w: 390, h: 844, mob: true }]]) { console.log('=== ' + dev + ' (4x CPU slowdown, whole page scrolled at reading speed)');
    for (const [name, path] of [['home', '/'], ['jyotish', '/jyotish.html'], ['bach', '/bach.html'], ['happiness', '/happiness.html']]) {
      const c = await b.newContext({ viewport: { width: o.w, height: o.h }, isMobile: !!o.mob, hasTouch: !!o.mob }); const pg = await c.newPage(); const cdp = await c.newCDPSession(pg);
      await pg.goto(B + path, { waitUntil: 'load' }); await pg.waitForTimeout(700); await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
      const r = await pg.evaluate(async () => { const H = document.documentElement.scrollHeight - innerHeight; const d = []; let last = performance.now(), y = 0; await new Promise(res => { function f(t) { d.push(t - last); last = t; y += 14; scrollTo(0, y); if (y < H) requestAnimationFrame(f); else res(); } requestAnimationFrame(f); }); d.shift(); d.sort((a, b) => a - b); return { frames: d.length, median: +d[Math.floor(d.length / 2)].toFixed(1), p95: +d[Math.floor(d.length * .95)].toFixed(1), max: +d[d.length - 1].toFixed(1), slow: d.filter(x => x > 33.4).length }; });
      console.log('  ' + name.padEnd(10) + `frames ${r.frames} | median ${r.median} ms | 95th percentile ${r.p95} ms | worst ${r.max} ms | frames slower than 33 ms (under 30 fps): ${r.slow} (${(r.slow / r.frames * 100).toFixed(1)}%)`); await c.close(); } }
  await b.close(); })();
