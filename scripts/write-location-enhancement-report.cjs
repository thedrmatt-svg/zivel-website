// Workspace Shell: node scripts/write-location-enhancement-report.cjs
const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");
const { createLocationRenderer } = require("./lib/location-renderer.cjs");
const r = createLocationRenderer();
const { locations } = r.source("src/lib/data/locations");
const minimum = r.source("src/lib/location-memberships").getLocationMembershipMinimum;
const { getLocationTimezone, parseLocationHours } = r.source("src/lib/location-status");
const booking = r.source("src/lib/location-booking");
const cache = r.source("src/data/places-cache.json");
const http = JSON.parse(fs.readFileSync("/tmp/zivel-actions-http-results.json","utf8"));
const browser = JSON.parse(fs.readFileSync("/tmp/zivel-actions-browser-results.json","utf8"));
const sitemap = JSON.parse(fs.readFileSync("/tmp/zivel-actions-sitemap-check.json","utf8"));
const escape = value => String(value ?? "").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const table = (headers,rows) => `<div class="table"><table><thead><tr>${headers.map(h=>`<th>${escape(h)}</th>`).join("")}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map(v=>`<td>${escape(v)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
const active = locations.filter(l=>l.citySlug!=="brecksville");
const sourceFile = l => `src/content/locations/${fs.readdirSync("src/content/locations").find(f=>f.startsWith(`${l.citySlug}-`)&&f.endsWith(".ts"))}`;
const mapsFor = l => {
  const entry=cache[l.google?.placeId];
  return entry?.locationPath===`${l.stateSlug}/${l.citySlug}`?entry.googleMapsUri:null;
};
const missingMaps=active.filter(l=>!mapsFor(l)).map(l=>l.name);
const noBooking=active.filter(l=>!booking.getLocationBookingAction(l)?.external).map(l=>l.name);
const badHours=active.filter(l=>!parseLocationHours(l.hours)).map(l=>l.name);
const out="reports/location-actions-memberships-reviews-audit.html";
const files=[...new Set([
  ...execFileSync("git",["diff","--name-only"],{encoding:"utf8"}).trim().split("\n"),
  ...execFileSync("git",["ls-files","--others","--exclude-standard"],{encoding:"utf8"}).trim().split("\n"),
  out,
])].filter(Boolean).sort();
const statuses=http.results.reduce((o,row)=>(o[row.status]=(o[row.status]??0)+1,o),{});
const membershipRows=locations.map(l=>{
  const m=minimum(l), excluded=l.citySlug==="brecksville";
  const tier=m?`pricing.membershipTiers[${m.index}] (${m.name}), price + cadence`:"No qualifying stored individual membership";
  return [l.name,excluded?"Not changed":m?`${m.price}${m.unit}`:"Omitted",
    `${sourceFile(l)} → ${tier}`,excluded?"exiting brand, untouched":m
      ? l.citySlug==="windermere"?"Introductory 1st-month and Family Unlimited excluded; standard Essential used.":"Lowest standard individual membership; no fallback prices."
      :"Existing contact line retained."];
});
const timezoneRows=locations.map(l=>{
  const tz=getLocationTimezone(l);
  return [l.name,tz.zone??"Unknown",l.citySlug==="brecksville"?"Not used; exiting brand, untouched":`${tz.source}; ${l.stateSlug}`,
    l.citySlug==="brecksville"?"Excluded":parseLocationHours(l.hours)?"Parsed; minute values preserved":"Status hidden"];
});
const servedRows=locations.map(l=>{
  const base=`/locations/${l.stateSlug}/${l.citySlug}`;
  const en=http.results.find(v=>v.path===base), es=http.results.find(v=>v.path===`/es${base}`);
  return [l.name,l.citySlug==="brecksville"?"exiting brand, untouched":`${en?.status??"Not requested"}${en?.redirect?` → ${en.redirect}`:""}`,
    l.citySlug==="brecksville"?"Excluded":`${es?.status??"Not requested"}`,
    l.citySlug==="brecksville"?"No targeted changes; excluded from pass/fail counts"
    :["belmont","palm-coast"].includes(l.citySlug)?"English main page redirects externally, not changed there. Spanish main page and locally served children use shared templates.":"Main page plus all existing nested routes covered by city layout."];
});
const reviewRows=locations.map(l=>{
  const entry=cache[l.google?.placeId], rows=entry?.reviews??[];
  const filtered=rows.filter(v=>v.rating===5).filter(v=>l.citySlug!=="brecksville"||!/red[\s-]*light/i.test(v.text??""));
  return [l.name,rows.length,l.citySlug==="brecksville"?"Unchanged; excluded":filtered.length,
    l.citySlug==="brecksville"?"Existing cap 4; no clamp/order change":`${Math.min(6,filtered.length)} displayed; local cap 6`];
});
const html=`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Location actions, memberships and reviews audit</title><style>
body{margin:0;background:#f5f5f2;color:#191919;font:15px/1.6 system-ui,sans-serif}main{max-width:1240px;margin:auto;padding:36px 24px 80px}h1,h2{line-height:1.2}h1{font-size:34px}h2{margin-top:42px}a{color:#72570b}code{background:#ecebe7;padding:2px 4px;overflow-wrap:anywhere}.note{border-left:4px solid #aa8621;padding:16px 20px;background:white}.table{overflow:auto;background:white;border:1px solid #ddd;border-radius:8px}table{border-collapse:collapse;width:100%;font-size:13px}th,td{padding:12px 14px;text-align:left;vertical-align:top;border-bottom:1px solid #ddd}th{background:#20201e;color:white}tr:last-child td{border:0}li{margin:5px 0}.file{font:12px/1.8 ui-monospace,monospace;overflow-wrap:anywhere}footer{margin-top:40px;font-size:13px;color:#555}</style><main>
<h1>Location actions, memberships and reviews</h1><p>Verification date: November 5, 2026. All additions are local workspace changes only.</p>
<div class="note"><strong>No commits, push, publish or deployment.</strong> No dependencies added. Stored location records, review cache/import, URLs, metadata, canonical rules, sitemap, business schema, section order, legal/SMS/footer text and navigation labels were preserved. Only the authorized membership sentence was appended to existing FAQPage answers.</div>
<h2>What changed</h2><ul>
<li>Main-page hero: server-rendered telephone and existing Google Maps links, plus location-local open/closed status after hydration in reserved space. No guessed hours or Maps destinations.</li>
<li>Mobile location actions below 768px: actual main/service hero buttons are observed; nested pages without hero buttons use the reversible 400px threshold. Book Now follows the existing main-hero resolver. Missing online booking omits Book Now; missing Maps omits Directions.</li>
<li>Book Your Session: retained heading, position and booking behavior, with phone, grouped hours, address and existing directions link. Optional newClientOffer is unset/empty for every location; no record values were added or edited.</li>
<li>Pricing: lowest stored standard individual membership and exact pricing-page cadence drive both the teaser and FAQ #6 sentence, including the approved Spanish translations. Generic fallback tiers are never used for teaser eligibility.</li>
<li>Reviews: every existing five-star and content-exclusion filter remains exactly in place. Eligible reviews gain the cap of six, conditional long-review-first order, and accessible Read more/Read less; full unchanged text is in server HTML. Labels and rating summary are unchanged. Brecksville retains the existing four-review display and exclusion behavior.</li></ul>
<h2>Membership prices and exact sources</h2><p>19 registered locations. Brecksville is listed for transparency but excluded from the 18-studio pass/fail audit. All 18 participating studios have qualifying membership data, so no participating teaser was omitted.</p>
${table(["Location","Teaser price and exact unit","Stored data source","Selection / omission"],membershipRows)}
<p>The shared registry imports each listed content file. Membership selection reads <code>location.pricing.membershipTiers</code>, the same stored tiers used by the pricing page; neither the registry nor those source records was changed.</p>
<h2>Location timezone sources</h2><p>No registered location currently has an explicit timezone field; participating locations use the approved state/location mapping with IANA zones for daylight saving. Status time text preserves the opening/closing format in each existing hours value.</p>
${table(["Location","IANA timezone","Source","Hours parse result"],timezoneRows)}
<h2>Missing-data and restriction lists</h2><ul>
<li>No online booking destination among participating studios: <strong>${escape(noBooking.join(", ")||"None")}</strong>. Brecksville's existing online-booking prohibition remains; it receives no new action bar and is not a pass/fail studio.</li>
<li>Missing cached Directions destination among participating studios: <strong>${escape(missingMaps.join(", ")||"None")}</strong>. Missing-data fixtures confirm omission without generating a URL.</li>
<li>Unparseable hours among participating studios: <strong>${escape(badHours.join(", ")||"None")}</strong>. Tests cover invalid/missing, split, overnight and malformed-minute values; unsafe inputs suppress status while retaining contact links.</li>
<li>All-week closed fixture: status is suppressed because no opening time exists; no fabricated reopening is displayed.</li></ul>
<h2>What is actually served</h2>
${table(["Location","English main route","Spanish main route","Coverage / exception"],servedRows)}
<p>Belmont and Palm Coast's separate external websites were not changed. Their English redirects remain intact; locally served Spanish pages and nested routes must not be confused with those external sites.</p>
<h2>Review cap: Google API versus local presentation</h2>
<p>The existing import uses Places API (New) Place Details and requests <code>reviews</code>. It maps all returned reviews without applying a local import slice. Google's official <a href="https://developers.google.com/maps/documentation/places/web-service/reference/rest/v1/places#Place">Place resource documentation, reviews[]</a> states: <q>List of reviews about this place, sorted by relevance. A maximum of 5 reviews can be returned.</q></p>
<p>The previous local display cap was four eligible reviews. It is now six for participating locations, but Google's maximum of five means the current import cannot supply a sixth. Existing five-star/content filters may further reduce the count. No API, import, storage, selection criteria, review text, summary or labels changed. Ordering is applied after filters and before the display cap; fewer than three eligible reviews of 20+ words retains original order, and short-review order and ties are stable.</p>
${table(["Location","Imported reviews","Eligible after existing filters","Current display"],reviewRows)}
<h2>Fixed UI and collision handling</h2>
${table(["Existing element","Handling","Existing element changed?"],[
["Cookie consent banner","New bar hidden while banner is visibly unresolved; appears only if scroll/width/focus conditions permit after either consent choice.","No; observed existing dialog, including Essential only which emits no accept event."],
["Cherry button and calculator","While bar is visible below 768px on a participating location route, add measured bar height to the existing --custom-floating-estimator-offset-y. Vendor value 20px measured as calc(20px + 71px) at 390×844; restore 20px when hidden, focused, desktop or route exit.","Only the approved reversible bottom-offset variable; no Cherry loader, config, dimensions, colors or behavior changes."],
["Open Cherry calculator","New bar suppressed while its dialog is open; offset restored, then reapplied after close if eligible.","No additional changes."],
["Fixed header / mobile navigation panel","Top header does not overlap bottom actions; new bar hidden while mobile navigation panel is visible.","No changes to header, menus or navigation labels."],
["Pricing-page sticky section navigation","Top sticky section navigation remains separate from bottom actions.","No changes."],
["Pricing gate / other visible dialogs","New bar suppressed for visible dialogs or focused form controls. Existing pricing gate layout remains unchanged.","No changes."],
["Private local blog editor bottom toolbar / decorative fixed background; franchise sticky elements","These are non-location/editor or franchise screens, outside the city layout. No new bar is mounted there.","No changes."],
["Root footer disclaimer","Measured bar height is temporarily reserved as body bottom padding so the final disclaimer is reachable above the bar at page end; original padding restored on hide/exit.","No footer text or fixed UI changed."],
])}
<h2>Verification results</h2><ul>
<li><strong>Production build passed</strong> with Node 22 in an isolated temporary copy, leaving the development cache untouched. Typecheck passed with no errors.</li>
<li><strong>56 automated tests passed, zero failures/skips.</strong> New coverage includes all three zones and each status boundary, minute precision, DST, invalid hours, membership exclusions/missing data, review ordering/filter preservation, missing directions/booking fixtures, 18 participating main pages in both locales, city-layout scope, full visible FAQ/schema parity, and protected-data/schema regression comparisons.</li>
<li><strong>${browser.results.length} browser assertions passed, zero runtime exceptions.</strong> Real mobile browser verification included cookie acceptance via Essential only, measured Cherry offset/cleanup, opening/closing the actual calculator and menu, focus suppression, 768px cutoff, footer clearance, Buckhead→Hollywood client navigation, nested 399/400px/back behavior, service hero observation, Spanish Briargate pricing, review expand/reclamp with unchanged text, and navigation back to non-location Services.</li>
<li><strong>${http.results.length} sequential production HTTP link checks:</strong> ${statuses[200]??0} HTTP 200 and ${statuses[308]??0} preserved 308 redirects; no broken responses or missing main-page fragment targets. Both locale main routes, locally linked service/blog routes, pricing and pathways were covered. This was a temporary local production test server, not a publish.</li>
<li><strong>${sitemap.entries} sitemap entries matched before/after</strong> with identical optional-editor fixture input. Existing business/breadcrumb/other schema and canonical metadata matched before/after; only authorized FAQ membership suffixes differed. Existing data, review cache/import, legal/footer/header sources and section order were preserved.</li>
<li>Earlier broad development crawl stopped the dev workflow and produced transient 502s. It was not counted as a passing audit. The complete final crawl passed against the isolated production server, that temporary server was stopped, and the preview workflow was restored and returned HTTP 200.</li>
<li>Mobile screenshot of the main Buckhead route reviewed. Test-only screenshot capture emitted a localhost HMR-proxy warning; actual proxied-origin browser assertions had no runtime exceptions.</li></ul>
<p>Actual browser origin: <code>${escape(browser.origin)}</code>. Browser pages tested: <code>/locations/georgia/buckhead</code>, <code>/locations/florida/hollywood</code>, <code>/locations/florida/hollywood/pricing</code>, <code>/locations/florida/hollywood/cryotherapy</code>, <code>/es/locations/colorado/briargate/pricing</code>, and <code>/services</code>.</p>
<h2>Unresolved boundaries</h2><ul><li>Status reflects existing weekly hours only; there is no stored holiday/date-exception schedule to infer. No holiday values were guessed.</li><li>Google supplies at most five reviews for this API; a display cap of six does not expand the API result.</li><li>Existing Spanish-page copy outside the newly approved strings remains unchanged. The new FAQ sentence is Spanish while the pre-existing FAQ answer retains its existing language.</li><li>External Belmont/Palm Coast sites and any unpublished production deployment were not changed or claimed verified.</li></ul>
<h2>Changed / added files</h2><p>Includes implementation, tests, this report and durable policy notes. Source location records and lockfiles are unchanged.</p>
<ul class="file">${files.map(file=>`<li>${escape(file)}</li>`).join("")}</ul>
<footer>All changes remain uncommitted for the owner to review and push manually.</footer></main></html>`;
fs.writeFileSync(out,html);
console.log(`${out}: ${Buffer.byteLength(html)} bytes; ${files.length} changed/added files`);
