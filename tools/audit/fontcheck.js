const { chromium } = require('playwright'); const B='http://127.0.0.1:8099';
(async()=>{ const b=await chromium.launch();
 for (const p of ['/index.html','/happiness.html','/te/index.html','/hi/index.html','/bach.html']) {
  const c=await b.newContext({viewport:{width:1440,height:900}}); const pg=await c.newPage(); const reqs=[]; const ext=[];
  pg.on('request',r=>{const u=new URL(r.url()); if(u.host!=='127.0.0.1:8099') ext.push(u.host); if(/\.woff2/.test(u.pathname)) reqs.push(u.pathname.split('/').pop());});
  const errs=[]; pg.on('pageerror',e=>errs.push(e.message));
  await pg.goto(B+p,{waitUntil:'networkidle'}); await pg.waitForTimeout(500);
  const r=await pg.evaluate(async()=>{await document.fonts.ready; const o=[]; document.fonts.forEach(f=>{if(f.status==='loaded')o.push(f.family+' '+f.unicodeRange.slice(0,12))}); return {loaded:o, body:getComputedStyle(document.body).fontFamily.slice(0,60), h1:getComputedStyle(document.querySelector('h1')).fontFamily.slice(0,50)}});
  console.log(p, 'woff2:',reqs.join(', '), '| external hosts:',[...new Set(ext)].join(',')||'none','| errors:',errs.length); console.log('   loaded:',r.loaded.join(' ; ')); await c.close(); }
 await b.close(); })();
