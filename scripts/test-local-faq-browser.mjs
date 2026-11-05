// Workspace Shell: use Node 22+ and a disposable Chromium on CDP_PORT (9225).
import assert from "node:assert/strict";
import fs from "node:fs";
const origin = `https://${process.env.REPLIT_DEV_DOMAIN}`;
const targets = await (await fetch(`http://127.0.0.1:${process.env.CDP_PORT ?? 9225}/json/list`)).json();
const socket = new WebSocket(targets.find(t => t.type === "page").webSocketDebuggerUrl);
await new Promise(resolve => socket.addEventListener("open", resolve, { once:true }));
let id=0;
const pending=new Map(), errors=[], results=[];
socket.addEventListener("message",event=>{
  const message=JSON.parse(event.data);
  if(message.id) {
    const p=pending.get(message.id);
    if(p) {pending.delete(message.id);message.error?p.reject(message.error):p.resolve(message.result);}
  } else if(message.method==="Runtime.exceptionThrown") errors.push(message.params.exceptionDetails);
});
const send=(method,params={})=>new Promise((resolve,reject)=>{
  const current=++id;pending.set(current,{resolve,reject});socket.send(JSON.stringify({id:current,method,params}));
});
const evaluate=async expression=>{
  const response=await send("Runtime.evaluate",{expression,returnByValue:true,awaitPromise:true});
  if(response.exceptionDetails) throw Error(JSON.stringify(response.exceptionDetails));
  return response.result.value;
};
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const wait=async expression=>{
  for(let i=0;i<400;i++) {if(await evaluate(expression)) {await sleep(120);return;}await sleep(150);}
  throw Error(`Timed out: ${expression}`);
};
const check=(label,actual,expected)=>{assert.deepEqual(actual,expected,label);results.push({label,actual});};
try {
  await send("Page.enable");await send("Runtime.enable");await send("Page.bringToFront");
  await send("Emulation.setDeviceMetricsOverride",{width:1280,height:900,deviceScaleFactor:1,mobile:false});
  for(const locale of ["en","es"]) {
    const path=`${locale==="es"?"/es":""}/locations/colorado/briargate`;
    await send("Page.navigate",{url:origin+path});
    await wait(`location.pathname===${JSON.stringify(path)} && document.querySelectorAll('[data-location-faq] details').length===11`);
    await evaluate(`document.querySelector('[aria-label="Cookie notice"] button')?.click()`);
    await evaluate(`document.querySelector('[data-location-faq]').scrollIntoView({block:'start'})`);
    check(`${locale}: initially collapsed`,await evaluate(`document.querySelectorAll('[data-location-faq] details[open]').length`),0);
    check(`${locale}: all grouped`,await evaluate(`document.querySelectorAll('[data-location-faq] details[name="location-faq"]').length`),11);
    check(`${locale}: new questions`,await evaluate(`[...document.querySelectorAll('[data-location-faq] details summary')].slice(8).map(n=>n.textContent.trim())`),[
      "Which areas does Zivel Colorado Springs serve?",
      "Does Zivel have other locations in Colorado?",
      "Can I use Wellhub or ClassPass at Zivel Colorado Springs?",
    ]);
    check(`${locale}: initial HTML includes local answer`,(await (await fetch(origin+path)).text()).includes("the Air Force Academy area"),true);
    check(`${locale}: exact schema parity`,await evaluate(`(()=>{const s=document.querySelector('[data-location-faq]');const j=JSON.parse(s.querySelector('script[type="application/ld+json"]').textContent);return JSON.stringify(j.mainEntity.map(i=>[i.name,i.acceptedAnswer.text]))===JSON.stringify([...s.querySelectorAll('details')].map(d=>[d.querySelector('summary').textContent,d.querySelector('p').textContent]))})()`),true);
    await evaluate(`document.querySelectorAll('[data-location-faq] summary')[8].click()`);
    await wait(`document.querySelectorAll('[data-location-faq] details')[8].open`);
    await evaluate(`document.querySelectorAll('[data-location-faq] summary')[9].click()`);
    await wait(`!document.querySelectorAll('[data-location-faq] details')[8].open && document.querySelectorAll('[data-location-faq] details')[9].open`);
    check(`${locale}: one open after second click`,await evaluate(`document.querySelectorAll('[data-location-faq] details[open]').length`),1);
    check(`${locale}: registered L2 destinations`,await evaluate(`[...document.querySelectorAll('[data-location-faq] details')[9].querySelectorAll('a')].map(a=>[a.textContent,a.getAttribute('href')])`),[
      ["Highlands Ranch","/locations/colorado/highlands-ranch"],["Parker","/locations/colorado/parker"],
    ]);
    await evaluate(`document.querySelectorAll('[data-location-faq] summary')[10].click()`);
    await wait(`!document.querySelectorAll('[data-location-faq] details')[9].open && document.querySelectorAll('[data-location-faq] details')[10].open`);
    check(`${locale}: partner answer`,await evaluate(`document.querySelectorAll('[data-location-faq] details')[10].querySelector('p').textContent`),
      "Zivel Colorado Springs is listed on Wellhub and ClassPass. Eligible plans and availability are set by each app, so check the apps for current options.");
    check(`${locale}: map anchor`,await evaluate(`!!document.querySelector('[data-location-faq] a[href="#map"]') && !!document.getElementById('map')`),true);
    if(locale==="es") check("es: existing membership sentence retained",await evaluate(`document.querySelectorAll('[data-location-faq] details')[5].textContent.includes('Las membresías comienzan en $99/mo.')`),true);
  }
  check("runtime exceptions",errors,[]);
  fs.writeFileSync("/tmp/zivel-local-faq-browser-results.json",JSON.stringify({origin,results,errors},null,2));
  console.log(`PASS ${results.length} browser assertions, zero runtime exceptions.`);
} finally { socket.close(); }
