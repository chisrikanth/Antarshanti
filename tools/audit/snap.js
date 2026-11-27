const { chromium } = require('playwright'); const B = 'http://127.0.0.1:8099';
const PAGES = [['home', '/'], ['jyotish', '/jyotish.html'], ['bach', '/bach.html'], ['happiness', '/happiness.html']];
async function run(b, path, snap, o) {
  const c = await b.newContext({ viewport: { width: o.w, height: o.h }, isMobile: !!o.mob, hasTouch: !!o.mob }); const pg = await c.newPage(); await pg.goto(B + path, { waitUntil: 'load' }); await pg.waitForTimeout(500);
  if (!snap) await pg.addStyleTag({ content: 'html{scroll-snap-type:none!important}' });
  await pg.addStyleTag({ content: '.rv-hide{opacity:1!important;transform:none!important}' });
  const starts = async () => pg.evaluate(() => { const pad = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0; return [...document.querySelectorAll('main > header, main > section, main > .cta-strip-center')].filter(e => e.getBoundingClientRect().height > 0).map(e => Math.round(e.getBoundingClientRect().top + scrollY - pad)); });
  const H = await pg.evaluate(() => document.documentElement.scrollHeight - innerHeight); const S = await starts();
  const near = y => Math.min(...S.map(s => Math.abs(s - y)));
  // 1) where do scrolls come to rest? (a mix of flicks and drags)
  const steps = [250, 420, 640, 180, 900, 300, 520, 380, 760, 210, 460, 330]; const rests = []; await pg.mouse.move(o.w / 2, o.h / 2);
  for (const d of steps) { await pg.mouse.wheel(0, d); await pg.waitForTimeout(650); const y = await pg.evaluate(() => scrollY); rests.push(y); if (y >= H - 5) { await pg.evaluate(() => scrollTo(0, 0)); await pg.waitForTimeout(300); } }
  const dists = rests.map(near); const within = dists.filter(x => x <= 60).length;
  // 2) slow reading: 100px steps all the way down; does it ever stall or pull back?
  await pg.evaluate(() => scrollTo(0, 0)); await pg.waitForTimeout(500); let prev = 0, stalls = 0, backs = 0, n = 0; const trace = [];
  for (let i = 0; i < 80; i++) { await pg.mouse.wheel(0, 100); await pg.waitForTimeout(120); const y = await pg.evaluate(() => scrollY); n++; if (y >= H - 5) break; if (y < prev - 2) backs++; else if (y - prev < 20) stalls++; trace.push(y - prev); prev = y; }
  await pg.evaluate(() => scrollTo(0, 0)); await pg.waitForTimeout(300); await pg.keyboard.press('End'); await pg.waitForTimeout(700); const end = await pg.evaluate(() => Math.round(scrollY)); const reachedBottom = end >= H - 5;
  await c.close(); return { rests: rests.length, avgDist: Math.round(dists.reduce((a, b) => a + b, 0) / dists.length), within, stalls, backs, slowSteps: n, reachedBottom };
}
(async () => { const b = await chromium.launch();
  for (const [dev, o] of [['desktop 1440', { w: 1440, h: 900 }], ['phone 390', { w: 390, h: 844, mob: true }]]) { console.log('=== ' + dev);
    for (const [name, path] of PAGES) { const a = await run(b, path, false, o), s = await run(b, path, true, o);
      console.log(`  ${name.padEnd(10)} resting spots within 60px of a section start: ${a.within}/${a.rests} -> ${s.within}/${s.rests} with snapping | avg distance ${a.avgDist}px -> ${s.avgDist}px | slow-read steps stalled/pulled back: ${a.stalls}/${a.backs} -> ${s.stalls}/${s.backs} (of ${s.slowSteps}) | End key reaches the bottom: ${a.reachedBottom} -> ${s.reachedBottom}`); } }
  await b.close(); })();
