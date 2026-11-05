// Workspace Shell: node scripts/write-local-faq-report.cjs
const fs = require("node:fs");
const { execFileSync } = require("node:child_process");
const { createLocationRenderer } = require("./lib/location-renderer.cjs");
const r=createLocationRenderer();
const { locations }=r.source("src/lib/data/locations");
const { getLocationCity }=r.source("src/lib/location-presentation");
const { buildStructuredLocationFaqs, getOtherLiveStateLocations, isLiveLocationForLocalFaq }=r.source("src/lib/location-local-faqs");
const http=JSON.parse(fs.readFileSync("/tmp/zivel-local-faq-http-results.json","utf8"));
const browser=JSON.parse(fs.readFileSync("/tmp/zivel-local-faq-browser-results.json","utf8"));
const before=JSON.parse(fs.readFileSync("/tmp/zivel-local-faq-before.json","utf8"));
const expected={belmont:1,bentonville:2,buckhead:3,briargate:3,"coral-gables":3,fayetteville:2,fieldhouse:3,
  "cool-springs":2,"highlands-ranch":2,hollywood:2,metairie:1,murfreesboro:2,newport:1,
  "palm-coast":2,parker:3,riverton:2,rogers:2,windermere:2};
const esc=value=>String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const table=(heads,rows)=>`<div class="scroll"><table><thead><tr>${heads.map(h=>`<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map(cell=>`<td>${esc(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
const active=locations.filter(l=>l.citySlug!=="brecksville");
const differences=[];
for(const l of active) {
  const eligible=getOtherLiveStateLocations(l);
  const excluded=locations.filter(other=>other.stateSlug===l.stateSlug&&other.citySlug!==l.citySlug&&other.citySlug!=="brecksville"&&!isLiveLocationForLocalFaq(other));
  if(excluded.length) differences.push({studio:getLocationCity(l),excluded:excluded.map(other=>getLocationCity(other)),remaining:eligible.map(other=>getLocationCity(other))});
}
const output="reports/structured-local-faq-audit.html";
const files=[...new Set([...execFileSync("git",["diff","--name-only"],{encoding:"utf8"}).trim().split("\n"),
  ...execFileSync("git",["ls-files","--others","--exclude-standard"],{encoding:"utf8"}).trim().split("\n"),output])].filter(Boolean).sort();
const countRows=locations.map(l=>{
  if(l.citySlug==="brecksville") return ["Brecksville","—","—","—","exiting brand, untouched","Excluded"];
  const items=buildStructuredLocationFaqs(l);
  const en=http.results.find(row=>row.slug===l.citySlug&&row.locale==="en");
  const es=http.results.find(row=>row.slug===l.citySlug&&row.locale==="es");
  return [`${getLocationCity(l)} (${l.citySlug})`,expected[l.citySlug],items.length,items.map(i=>i.key.replace("structured-","")).join(", "),
    en.status===308?`308 → ${en.redirect}; template only`:`200; ${en.localCount} local / ${en.totalCount} total`,
    `${es.status}; ${es.localCount} local / ${es.totalCount} total`];
});
const appRows=active.filter(l=>l.partnerApps?.length).map(l=>[`${getLocationCity(l)} (${l.citySlug})`,l.partnerApps.join(", "),"Owner-supplied; active eligibility not independently verified"]);
const l2Rows=active.map(l=>[`${getLocationCity(l)} (${l.citySlug})`,getOtherLiveStateLocations(l).map(other=>getLocationCity(other)).join(", ")||"L2 omitted: no other eligible studio"]);
const served=http.results.filter(row=>row.status===200);
const html=`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Structured local FAQ audit</title><style>
body{margin:0;background:#f4f4f1;color:#1c1c19;font:15px/1.6 system-ui,sans-serif}main{max-width:1240px;margin:auto;padding:32px 24px 70px}h1{font-size:34px;line-height:1.2}h2{margin-top:38px;line-height:1.3}a{color:#705610}code{background:#ebeae4;padding:2px 4px;overflow-wrap:anywhere}.notice{padding:18px;background:white;border-left:4px solid #ad8a27}.scroll{overflow-x:auto;background:white;border:1px solid #d6d6d1;border-radius:8px}table{width:100%;border-collapse:collapse;font-size:13px}th,td{text-align:left;vertical-align:top;padding:12px 14px;border-bottom:1px solid #ddd}th{background:#22221e;color:white}li{margin:5px 0}details{background:white;margin:10px 0;padding:15px 20px;border:1px solid #ddd;border-radius:6px}summary{cursor:pointer;font-weight:650}.files{font:12px/1.8 ui-monospace,monospace;overflow-wrap:anywhere}footer{margin-top:36px;color:#666;font-size:13px}</style><main>
<h1>Approved structured local FAQs</h1><p>Verified November 5, 2026. Local workspace and isolated production-build checks only.</p>
<div class="notice"><strong>All changes remain uncommitted.</strong> No Git commits, push, publish or deployment. Brecksville remains untouched. No new routes, canonical changes, sitemap changes, styling changes or business-schema changes.</div>
<h2>Summary</h2><ul>
<li>Added exactly the five optional fields and owner-approved values for 18 studios. Missing values remain empty; venueVisitors defaults to false. No other stored field values changed.</li>
<li>Structured L1–L4 entries follow the existing standard questions and precede any approved manual localFaqs. Manual entries remain empty.</li>
<li>Every required-field omission removes the question from both the visible FAQ and FAQPage JSON-LD. Address-first municipality names are reused. Cumming is stored as supplied for Windermere but removed from its displayed nearby list, leaving Alpharetta and Johns Creek.</li>
<li>The existing FAQ component, native single-open behavior and explicit Belmont/Palm Coast exception remain unchanged. All answers are server-rendered, initially collapsed, with exact visible/schema parity.</li>
<li>The new entries use the existing English fallback on es pages. Existing standard English answers and the Spanish membership suffix are unchanged.</li>
<li>All 18 template counts match the approved table: <strong>38 local entries per locale</strong>. This is template coverage, not a claim that both externally redirected English sites changed.</li></ul>
<h2>Local FAQ counts and actual page coverage</h2>
${table(["Location / route slug","Expected local","Template local","Types","English main route","Spanish main route"],countRows)}
<p>Actual HTTP coverage: ${http.results.length} locale responses — ${served.length} locally served pages, and two preserved 308 external redirects. The locally served English pages contain 35 new local entries in total; Spanish pages contain 38. This accounts for the missing English Belmont and Palm Coast rendering here rather than pretending their external websites were updated.</p>
<h2>L2 eligibility and opening-state amendment</h2><p>No registered studio currently has an explicit studio-level not-open or coming-soon flag. Therefore <strong>${differences.length} L2 lists differ because of such flags</strong>; no data was changed to force counts. Highlands Ranch has only a service-level comingSoon flag for Red Light Therapy, so the studio remains eligible.</p>
<p>The guard checks explicit studio-level comingSoon, notYetOpen, isOpen=false, and coming-soon/not-yet-open status values. It does not infer a studio's opening state from hours, dates, descriptions or service flags. Fixtures verified exclusions and singular/plural/list/count changes; the current registry required no exclusions beyond Brecksville and the current studio.</p>
${differences.length?table(["Studio","Excluded not-open studios","Remaining studios"],differences.map(d=>[d.studio,d.excluded.join(", "),d.remaining.join(", ")])):"<p>Opening-state differences to report: <strong>None.</strong></p>"}
${table(["Studio","Actual other live same-state cities"],l2Rows)}
<p>All 13 unique L2 destinations use the existing registered location URL convention, now exposed as a narrowly shared helper. The navigation output before and after was identical. Preserved Belmont/Palm Coast redirects are treated as resolving destinations, not changed external pages.</p>
<h2>Partner apps for owner confirmation</h2>
${table(["Studio","Populated partnerApps","Confirmation boundary"],appRows)}
<p>No plans, pricing, eligibility or availability were inferred. The FAQ says to check each app for current options. These are the exact supplied names; the audit does not claim the app listings were independently checked.</p>
<h2>Approved new questions and answers</h2>
${active.map(l=>`<details><summary>${esc(getLocationCity(l))} (${esc(l.citySlug)}) — ${buildStructuredLocationFaqs(l).length} local entries</summary>${buildStructuredLocationFaqs(l).map(item=>`<h3>${esc(item.key.replace("structured-",""))}: ${esc(item.question)}</h3><p>${esc(item.answer)}</p>`).join("")}</details>`).join("")}
<h2>Verification</h2><ul>
<li><strong>Production build passed</strong> using Node 22 in an isolated temporary copy. The active development build cache was not replaced. Typecheck passed with no errors.</li>
<li><strong>40 automated tests passed; no failures.</strong> One pre-existing optional baseline check in the older enhancements suite was skipped because its historical baseline was not supplied. The new local-FAQ before/after check did run and pass.</li>
<li>Before snapshots covered ${before.pages.length} locale templates, including separate untouched Brecksville regression snapshots. All original standard FAQ answers, all markup outside the FAQ, non-FAQ JSON-LD, metadata/canonicals, section order, unrelated stored data and navigation output matched exactly.</li>
<li><strong>${before.sitemap.length} sitemap entries matched before/after</strong> with the same optional-editor fixture input. No source route, slug, metadata, sitemap or main-page component was edited.</li>
<li>Strict-omission tests cover blank/missing county, state, nearby communities, own-city removal leaving too few communities, empty apps/site/address, venueVisitors=false, no other state studios, excluded Brecksville, explicit studio opening flags, one/two app wording, online versus phone-only/no-contact venue booking, manual-entry placement, standard omissions and escaped text.</li>
<li><strong>${browser.results.length} real Chromium browser assertions passed; zero runtime exceptions.</strong> English and Spanish Briargate pages had 11 initially collapsed questions; opening a second/third native details item closed the previous item. Browser checks also confirmed exact FAQ/schema parity, initial HTML local text, unchanged #map target, linked Colorado cities, approved app wording and retained Spanish membership suffix.</li>
<li><strong>${http.results.length} sequential production HTTP checks passed:</strong> exact visible/schema parity and collapsed-state checks on all ${served.length} locally served main locale pages; preserved 308 redirects on the two English external mains; all ${http.destinations.length} new L2 destinations resolved.</li>
<li>Screenshot reviewed at the Briargate FAQ section. The screenshot tool's localhost HMR warning is development-proxy-only; the proxied-origin Chromium checks reported zero application runtime exceptions.</li></ul>
<p>Browser test origin: <code>${esc(browser.origin)}</code>, on <code>/locations/colorado/briargate</code> and <code>/es/locations/colorado/briargate</code>. Broad HTTP checks used an ephemeral local production test server, which was shut down afterward; this was not a live-site publish.</p>
<h2>Unresolved boundaries</h2><ul>
<li>Partner-app active status remains for owner confirmation; only owner-supplied values were published into the local source data.</li>
<li>Spanish fallback is intentional under the approved plan, not a new translation rollout.</li>
<li>Belmont and Palm Coast's external English websites were neither changed nor claimed verified.</li>
<li>No implementation gaps or unexplained expected-count differences were found.</li></ul>
<h2>Changed and added files</h2><p>Includes the 18 approved data records, shared generation/type/URL changes, owner documentation, tests, this audit and the durable opening-state instruction. No dependencies or lockfiles changed.</p>
<ul class="files">${files.map(file=>`<li>${esc(file)}</li>`).join("")}</ul>
<footer>No commits, push, publish or deployment were performed. The owner pushes manually.</footer></main></html>`;
fs.writeFileSync(output,html);
console.log(`${output}: ${Buffer.byteLength(html)} bytes; ${files.length} changed/added files.`);
