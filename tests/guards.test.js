const assert=require('assert');
const root=require('path').join(__dirname,'..','netlify','functions')+'/';
const co=require(root+'create-order.js'), sc=require(root+'submit-checkin.js');
const ev=(host,body)=>({httpMethod:'POST',headers:{host},body:JSON.stringify(body||{})});
(async()=>{
  // create-order: test host + live key -> blocked
  process.env.RAZORPAY_KEY_ID='rzp_live_abc'; process.env.RAZORPAY_KEY_SECRET='s';
  let r=await co.handler(ev('staging--aquamarine-croquembouche-26e205.netlify.app',{amount:100000})); assert.equal(r.statusCode,403); console.log('test host + live key  ->',r.statusCode,JSON.parse(r.body).error.slice(0,50));
  // production host + test key -> blocked
  process.env.RAZORPAY_KEY_ID='rzp_test_abc';
  r=await co.handler(ev('antarshanti.co.in',{amount:100000})); assert.equal(r.statusCode,403); console.log('prod host + test key  ->',r.statusCode);
  r=await co.handler(ev('www.antarshanti.co.in',{amount:100000})); assert.equal(r.statusCode,403);
  // test host + test key -> passes the guard (fails later at network, 502, not 403)
  process.env.RAZORPAY_KEY_ID='rzp_test_abc';
  const origReq=require('https').request; require('https').request=()=>{ throw new Error('network blocked in test') };
  r=await co.handler(ev('staging--x.netlify.app',{amount:100000})); assert.notEqual(r.statusCode,403); console.log('test host + test key  -> passed guard (status',r.statusCode+')');
  // lookalike host must not count as production
  process.env.RAZORPAY_KEY_ID='rzp_live_abc';
  r=await co.handler(ev('antarshanti.co.in.evil.com',{amount:100000})); assert.equal(r.statusCode,403); console.log('lookalike host        ->',r.statusCode);
  // submit-checkin
  process.env.SUPABASE_SERVICE_KEY='k';
  const body={domainScores:{},overallScore:50};
  process.env.SUPABASE_URL='https://kntohzyxzoucymrmriva.supabase.co';
  r=await sc.handler(ev('staging--x.netlify.app',body)); assert.equal(r.statusCode,503); console.log('test host + PROD db   ->',r.statusCode);
  process.env.SUPABASE_URL='https://rnofqxmfwqiogtlchkbp.supabase.co';
  r=await sc.handler(ev('antarshanti.co.in',body)); assert.equal(r.statusCode,503); console.log('prod host + TEST db   ->',r.statusCode);
  let called=null; global.fetch=async(u)=>{called=u;return {ok:true,status:201,text:async()=>''}};
  r=await sc.handler(ev('staging--x.netlify.app',body)); assert.equal(r.statusCode,200); console.log('test host + test db   ->',r.statusCode,'wrote to',called.split('/')[2]);
  process.env.SUPABASE_URL='https://kntohzyxzoucymrmriva.supabase.co';
  r=await sc.handler(ev('antarshanti.co.in',body)); assert.equal(r.statusCode,200); console.log('prod host + prod db   ->',r.statusCode,'wrote to',called.split('/')[2]);
  console.log('ALL GUARD TESTS PASSED');
})().catch(e=>{console.error('FAIL',e.message);process.exit(1)});
