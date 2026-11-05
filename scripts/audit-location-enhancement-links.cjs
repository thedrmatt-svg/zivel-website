// Workspace Shell: node scripts/audit-location-enhancement-links.cjs
// Sequential dev-server requests; outputs JSON under /tmp, never writes site data.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const { createLocationRenderer } = require("./lib/location-renderer.cjs");
const r = createLocationRenderer();
const origin = process.env.LOCATION_AUDIT_ORIGIN ?? `https://${process.env.REPLIT_DEV_DOMAIN}`;
const { locations } = r.source("src/lib/data/locations");
const paths = new Set(), results = [], missingAnchors = [];
const priorLog = process.env.LOCATION_LINK_AUDIT_PREVIOUS_LOG;
const prior = new Map(priorLog ? [...fs.readFileSync(priorLog,"utf8").matchAll(/^([23]\d\d) (\/\S*)$/gm)]
  .map(match=>[match[2],Number(match[1])]) : []);
(async () => {
  for (const l of locations.filter(l=>l.citySlug!=="brecksville")) for(const locale of ["en","es"]) {
    const mainPath=`${locale==="es"?"/es":""}/locations/${l.stateSlug}/${l.citySlug}`;
    paths.add(mainPath);
    const doc=await r.render("src/app/[locale]/locations/[state]/[city]/page",{state:l.stateSlug,city:l.citySlug,locale});
    for(const a of doc.querySelectorAll("a[href]")) {
      const href=a.getAttribute("href");
      if(href.startsWith("#")) {
        if(!doc.querySelector(`[id="${href.slice(1)}"]`)) missingAnchors.push({mainPath,href});
      } else if(href.startsWith("/") && !href.startsWith("//")) {
        const parsed=new URL(href,origin);
        if(!parsed.pathname.includes("/brecksville")) paths.add(parsed.pathname);
      }
    }
    // Blog routes are location-specific; only audit them when actually linked.
    for(const child of ["pricing","pathways"]) paths.add(`${mainPath}/${child}`);
  }
  for(const path of paths) {
    if(prior.has(path) && prior.get(path)===200) {
      results.push({path,status:200,reusedUnchangedRun:true});
      continue;
    }
    const response=await fetch(origin+path,{redirect:"manual",signal:AbortSignal.timeout(90000)});
    const html=await response.text();
    const row={path,status:response.status,redirect:response.headers.get("location")??undefined};
    results.push(row);
    if([502,503,504].includes(response.status)) throw new Error(`Audit server unavailable (${response.status}); stop the crawl and restore it before resuming.`);
    if(response.status>=400) console.error(JSON.stringify(row));
    if(response.status===200 && /^\/(?:es\/)?locations\/[^/]+\/[^/]+$/.test(path)) {
      assert(html.includes("data-location-status-line"),path);
      assert(html.includes('application/ld+json'),path);
    }
    console.log(response.status,path);
  }
  fs.writeFileSync("/tmp/zivel-actions-http-results.json",JSON.stringify({origin,results,missingAnchors},null,2));
  assert.equal(results.filter(row=>row.status>=400).length,0,"all served internal links return success or preserved redirect");
  assert.deepEqual(missingAnchors,[],"main-page fragment destinations");
  console.log(`PASS ${results.length} sequential requests; ${results.filter(r=>r.status===200).length} HTTP 200; ${results.filter(r=>r.status>=300&&r.status<400).length} redirects`);
})().catch(error=>{console.error(error);process.exitCode=1;});
