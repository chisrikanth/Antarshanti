const { chromium } = require('playwright'); const B = 'http://127.0.0.1:8099';
(async () => { const b = await chromium.launch(); const c = await b.newContext({ viewport: { width: 1440, height: 900 } }); const pg = await c.newPage();
  await pg.route(B + '/happiness.html', async r => { const resp = await r.fetch(); await r.fulfill({ response: resp, body: (await resp.text()).replace('data-unit="1000"', 'data-unit="500"') }); });   // real proportions, half speed: in 2s, hold 2s, out 3s, hold 1s
  await pg.goto(B + '/happiness.html', { waitUntil: 'load' }); await pg.waitForTimeout(400); await pg.addStyleTag({ content: '.spin-el{animation:none!important}' }); await pg.evaluate(() => document.querySelector('.breathe').scrollIntoView({ block: 'center' })); await pg.waitForTimeout(300);
  const rest = await pg.evaluate(() => document.querySelector('.b-body').getBoundingClientRect().width);
  await pg.evaluate(() => { window.__s = []; const r = document.querySelector('.breathe'), body = r.querySelector('.b-body'), t0 = performance.now(); (function f() { window.__s.push({ t: performance.now() - t0, ph: r.getAttribute('data-phase') || 'idle', w: body.getBoundingClientRect().width }); if (performance.now() - t0 < 7950) requestAnimationFrame(f); })(); });
  await pg.click('.breathe-orb'); await pg.waitForTimeout(8300); const s = await pg.evaluate(() => window.__s);
  const seg = ph => { const out = []; let started = false; for (const x of s) { if (x.ph === ph) { out.push(x); started = true; } else if (started) break; } return out; }; const inn = seg('in'), hold = seg('hold'), out = seg('out'), rst = seg('rest');
  const full = Math.max(...s.map(x => x.w)); const norm = Math.min(...s.map(x => x.w)); const range = full - norm;
  const deltas = g => g.slice(1).map((x, i) => Math.abs(x.w - g[i].w)); const mx = a => Math.max(...a);
  const frac = (g, f) => { const k = Math.floor(g.length * f); return ((g[k].w - norm) / range * 100).toFixed(0) + '%'; };
  console.log(`normal size ${norm.toFixed(0)}px -> largest ${full.toFixed(0)}px (x${(full / norm).toFixed(2)} across, about x${Math.pow(full / norm, 3).toFixed(1)} in volume); resting size before start ${rest.toFixed(0)}px`);
  console.log(`IN   ${inn[0].w.toFixed(0)} -> ${inn[inn.length - 1].w.toFixed(0)}px | progress at 25/50/75% of the time: ${frac(inn, .25)} / ${frac(inn, .5)} / ${frac(inn, .75)} (smooth start and end) | biggest single-frame step ${mx(deltas(inn)).toFixed(1)}px (${(mx(deltas(inn)) / range * 100).toFixed(1)}% of the range)`);
  console.log(`HOLD ${hold[0].w.toFixed(0)}px, movement during the hold: ${(Math.max(...hold.map(x => x.w)) - Math.min(...hold.map(x => x.w))).toFixed(2)}px`);
  console.log(`OUT  ${out[0].w.toFixed(0)} -> ${out[out.length - 1].w.toFixed(0)}px | progress at 25/50/75%: ${frac(out, .25)} / ${frac(out, .5)} / ${frac(out, .75)} (starts a little faster, long gentle tail) | biggest single-frame step ${mx(deltas(out)).toFixed(1)}px (${(mx(deltas(out)) / range * 100).toFixed(1)}% of the range)`);
  console.log(`HOLD ${rst[0].w.toFixed(0)}px, movement during the second hold: ${(Math.max(...rst.map(x => x.w)) - Math.min(...rst.map(x => x.w))).toFixed(2)}px | ends at the normal size: ${Math.abs(rst[rst.length - 1].w - norm) < 1.5}`);
  const jumps = s.slice(1).filter((x, i) => Math.abs(x.w - s[i].w) > range * 0.04).length; console.log(`sudden jumps (a frame-to-frame change over 4% of the range) in the whole round: ${jumps}`);
  await b.close(); })();
