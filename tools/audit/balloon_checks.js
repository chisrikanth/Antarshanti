const { chromium } = require('playwright'); const B='http://127.0.0.1:8099';
(async()=>{ const b=await chromium.launch();
 // 1 reduced motion
 { const c=await b.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce'}); const pg=await c.newPage(); await pg.goto(B+'/happiness.html',{waitUntil:'load'}); await pg.evaluate(()=>document.querySelector('.breathe').scrollIntoView({block:'center'})); await pg.waitForTimeout(600);
   const r=await pg.evaluate(()=>{const r=document.querySelector('.breathe');return {live:r.hasAttribute('data-live'),bodyDisplay:getComputedStyle(r.querySelector('.b-body')).display,disc:getComputedStyle(r.querySelector('.b-d-small')).opacity}});
   await pg.click('.breathe-orb'); await pg.waitForTimeout(600); const r2=await pg.evaluate(()=>({phase:document.querySelector('.breathe').getAttribute('data-phase'),large:getComputedStyle(document.querySelector('.b-d-large')).opacity,small:getComputedStyle(document.querySelector('.b-d-small')).opacity,live:document.querySelector('.breathe').hasAttribute('data-live')}));
   console.log('reduced motion:',JSON.stringify(r),'-> after start',JSON.stringify(r2)); await c.close(); }
 // 2 normal: loop sleeps off-screen, stop mid-inhale glides back, keyboard
 { const c=await b.newContext({viewport:{width:1440,height:900}}); const pg=await c.newPage(); const errs=[]; pg.on('pageerror',e=>errs.push(e.message)); await pg.goto(B+'/happiness.html',{waitUntil:'load'}); await pg.waitForTimeout(500);
   const live0=await pg.evaluate(()=>document.querySelector('.breathe').hasAttribute('data-live')); // hero is probably visible
   await pg.evaluate(()=>window.scrollTo(0,document.body.scrollHeight)); await pg.waitForTimeout(500); const liveFar=await pg.evaluate(()=>document.querySelector('.breathe').hasAttribute('data-live'));
   await pg.evaluate(()=>document.querySelector('.breathe').scrollIntoView({block:'center'})); await pg.waitForTimeout(500);
   await pg.focus('.breathe-orb'); await pg.keyboard.press('Enter'); await pg.waitForTimeout(2200);
   const w=()=>pg.evaluate(()=>document.querySelector('.b-body').getBoundingClientRect().width);
   const mid=await w(); await pg.keyboard.press('Enter'); const s=[]; for(let i=0;i<14;i++){await pg.waitForTimeout(100); s.push(await w());}
   const steps=s.slice(1).map((x,i)=>Math.abs(x-s[i])); console.log('visible at load (live):',live0,'| scrolled away (live):',liveFar,'| mid-inhale width',mid.toFixed(0),'-> after stop',s.map(x=>x.toFixed(0)).join(','),'| max step',Math.max(...steps).toFixed(1),'| label after stop:',await pg.getAttribute('.breathe-orb','aria-label'),'| errors',errs.length);
   await c.close(); }
 // 3 phone screenshot
 { const c=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true}); const pg=await c.newPage(); await pg.goto(B+'/happiness.html',{waitUntil:'load'}); await pg.addStyleTag({content:'.spin-el{animation:none!important}'}); await pg.evaluate(()=>document.querySelector('.breathe').scrollIntoView({block:'center'})); await pg.waitForTimeout(600); await pg.tap('.breathe-orb'); await pg.waitForTimeout(3300); await pg.screenshot({path:'../send/balloon-phone.png'}); await c.close(); }
 await b.close(); })();
