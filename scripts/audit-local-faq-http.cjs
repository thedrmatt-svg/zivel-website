// Workspace Shell: node scripts/audit-local-faq-http.cjs
// For broad coverage, set LOCATION_AUDIT_ORIGIN to an ephemeral production server.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const { parse } = require("next/dist/compiled/node-html-parser");
const { createLocationRenderer } = require("./lib/location-renderer.cjs");
const r = createLocationRenderer();
const { locations } = r.source("src/lib/data/locations");
const { buildStructuredLocationFaqs } = r.source("src/lib/location-local-faqs");
const origin = process.env.LOCATION_AUDIT_ORIGIN ?? `https://${process.env.REPLIT_DEV_DOMAIN}`;
(async()=>{
  const results=[], destinations=new Set();
  for(const l of locations.filter(l=>l.citySlug!=="brecksville")) for(const locale of ["en","es"]) {
    const path=`${locale==="es"?"/es":""}/locations/${l.stateSlug}/${l.citySlug}`;
    const response=await fetch(origin+path,{redirect:"manual",signal:AbortSignal.timeout(90000)});
    assert(![502,503,504].includes(response.status),"Stop audit: infrastructure unavailable.");
    const row={slug:l.citySlug,locale,path,status:response.status};
    if(locale==="en"&&["belmont","palm-coast"].includes(l.citySlug)) {
      assert.equal(response.status,308);
      row.redirect=response.headers.get("location");
      results.push(row);continue;
    }
    assert.equal(response.status,200,path);
    const doc=parse(await response.text()), section=doc.querySelector("[data-location-faq]");
    const details=section.querySelectorAll("details"), local=buildStructuredLocationFaqs(l);
    const schema=JSON.parse(section.querySelector('script[type="application/ld+json"]').innerHTML);
    assert.equal(details.length,8+local.length,path);
    assert.equal(schema.mainEntity.length,details.length,path);
    details.forEach((detail,index)=>{
      assert(!detail.hasAttribute("open"),path);
      assert.equal(detail.getAttribute("name"),["belmont","palm-coast"].includes(l.citySlug)?undefined:"location-faq");
      assert.equal(detail.querySelector("summary").text,schema.mainEntity[index].name,path);
      assert.equal(detail.querySelector("p").text,schema.mainEntity[index].acceptedAnswer.text,path);
    });
    assert(doc.querySelector("#map"),path);
    for(const part of local.flatMap(item=>item.parts)) if(part.href) {
      destinations.add(part.href);
      assert(section.querySelectorAll("a").some(a=>a.getAttribute("href")===part.href),path);
    }
    row.localCount=local.length;row.totalCount=details.length;
    results.push(row);console.log(response.status,path,`${local.length} local entries`);
  }
  for(const href of destinations) assert(results.some(row=>row.path===href&&[200,308].includes(row.status)),`Resolved destination ${href}`);
  fs.writeFileSync("/tmp/zivel-local-faq-http-results.json",JSON.stringify({origin,results,destinations:[...destinations]},null,2));
  console.log(`PASS ${results.length} locale responses, ${destinations.size} registered L2 destinations; complete initial-HTML/schema parity.`);
})().catch(error=>{console.error(error);process.exitCode=1;});
