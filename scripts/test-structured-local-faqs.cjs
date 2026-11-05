const assert = require("node:assert/strict");
const fs = require("node:fs");
const { test } = require("node:test");
const { renderToStaticMarkup } = require("react-dom/server");
const { createLocationRenderer } = require("./lib/location-renderer.cjs");
const { capture } = require("./local-faq-snapshot.cjs");
const r = createLocationRenderer();
const { locations } = r.source("src/lib/data/locations");
const local = r.source("src/lib/location-local-faqs");
const { buildLocationFaqs } = r.source("src/lib/location-faqs");
const { getLocationCity } = r.source("src/lib/location-presentation");
const { getLocationHref } = r.source("src/lib/data/locationNav");
const Faq = r.source("src/components/location/LocationFaq").default;
const active = locations.filter(l => l.citySlug !== "brecksville");
const bySlug = slug => locations.find(l => l.citySlug === slug);
const fields = ["county", "nearbyCommunities", "partnerApps", "siteName", "venueVisitors"];
// Independently transcribed owner approval: county, communities, apps, site, visitors, IDs.
const approved = {
  belmont: ["Gaston County", ["Mount Holly","Gastonia","Charlotte"], [], "", false, ["L1"]],
  bentonville: ["Benton County", ["Rogers","Bella Vista","Springdale"], [], "", false, ["L1","L2"]],
  buckhead: ["Fulton County", ["Sandy Springs","Brookhaven","Midtown Atlanta"], ["ClassPass"], "", false, ["L1","L2","L3a"]],
  briargate: ["El Paso County", ["Monument","Black Forest","the Air Force Academy area"], ["Wellhub","ClassPass"], "", false, ["L1","L2","L3a"]],
  "coral-gables": ["Miami-Dade County", ["Miami","South Miami","Coconut Grove"], ["ClassPass"], "", false, ["L1","L2","L3a"]],
  fayetteville: ["Washington County", ["Springdale","Johnson","Farmington"], [], "", false, ["L1","L2"]],
  fieldhouse: ["DeSoto County", ["Olive Branch","Southaven","Horn Lake"], [], "Gatorade Fieldhouse", true, ["L1","L3b","L4"]],
  "cool-springs": ["Williamson County", ["Brentwood","Spring Hill","Nolensville"], [], "", false, ["L1","L2"]],
  "highlands-ranch": ["Douglas County", ["Lone Tree","Littleton","Centennial"], [], "", false, ["L1","L2"]],
  hollywood: ["Broward County", ["Hallandale Beach","Dania Beach","Pembroke Pines","Miramar"], [], "", false, ["L1","L2"]],
  metairie: ["Jefferson Parish", ["New Orleans","Kenner","Harahan"], [], "", false, ["L1"]],
  murfreesboro: ["Rutherford County", ["Smyrna","La Vergne","Christiana"], [], "", false, ["L1","L2"]],
  newport: ["Campbell County", ["Covington","Fort Thomas","Cincinnati"], [], "", false, ["L1"]],
  "palm-coast": ["Flagler County", ["Flagler Beach","Bunnell","Ormond Beach"], [], "", false, ["L1","L2"]],
  parker: ["Douglas County", ["Lone Tree","Aurora","Castle Rock"], [], "Crossing at Stonegate", false, ["L1","L2","L3b"]],
  riverton: ["Salt Lake County", ["South Jordan","Herriman","Bluffdale"], ["Wellhub"], "", false, ["L1","L3a"]],
  rogers: ["Benton County", ["Bentonville","Lowell","Springdale"], [], "", false, ["L1","L2"]],
  windermere: ["Forsyth County", ["Alpharetta","Johns Creek","Cumming"], [], "", false, ["L1","L2"]],
};
const options = l => ({ cityName:getLocationCity(l), groupedHours:[], bookingUrl:"#unused" });
const stripNewFields = l => Object.fromEntries(Object.entries(l).filter(([k]) => !fields.includes(k)));

test("only the exact approved local values are populated at all 18 participating studios", () => {
  assert.equal(active.length,18);
  for(const l of active) {
    assert.deepEqual([l.county,l.nearbyCommunities,l.partnerApps??[],l.siteName??"",l.venueVisitors??false],
      approved[l.citySlug].slice(0,5),l.citySlug);
    const expected=approved[l.citySlug][5].filter(id => id!=="L2" || local.getOtherLiveStateLocations(l).length);
    assert.deepEqual(local.buildStructuredLocationFaqs(l).map(i=>i.key.replace("structured-","")),expected,l.citySlug);
    assert.deepEqual(l.localFaqs,[],`${l.citySlug}: no invented manual answers`);
  }
  for(const field of fields) assert.equal(bySlug("brecksville")[field],undefined);
  assert.deepEqual(local.buildStructuredLocationFaqs(bySlug("brecksville")),[]);
});

test("strict required-field omissions and municipality filtering affect both visible FAQ and schema", () => {
  const source=bySlug("briargate");
  const fixtures=[
    {...source,county:" "}, {...source,state:""},
    {...source,nearbyCommunities:["Colorado Springs","Monument"," "]},
    {...source,nearbyCommunities:undefined}, {...source,county:undefined},
  ];
  for(const l of fixtures) {
    const items=local.buildStructuredLocationFaqs(l,[]);
    assert(!items.some(i=>i.key==="structured-L1"));
    const doc=r.parse(renderToStaticMarkup(r.React.createElement(Faq,{cityName:getLocationCity(l),items})));
    assert(!doc.text.includes("Which areas"));
    assert(!doc.querySelector('script[type="application/ld+json"]').innerHTML.includes("Which areas"));
  }
  const windermere=local.buildStructuredLocationFaqs(bySlug("windermere")).find(i=>i.key==="structured-L1");
  assert.equal(windermere.answer,"Zivel Cumming is in Forsyth County, GA, and welcomes clients from Alpharetta, Johns Creek, and Cumming, and surrounding communities.");
  assert(!local.buildStructuredLocationFaqs({...source,partnerApps:[""," "]},[]).some(i=>i.key==="structured-L3a"));
  const venue=bySlug("fieldhouse");
  for(const l of [{...venue,siteName:" "},{...venue,siteName:undefined}]) {
    assert(!local.buildStructuredLocationFaqs(l,[]).some(i=>["structured-L3b","structured-L4"].includes(i.key)));
  }
  assert(!local.buildStructuredLocationFaqs({...venue,contact:{...venue.contact,address:""}},[]).some(i=>i.key==="structured-L3b"));
  assert(!local.buildStructuredLocationFaqs({...venue,venueVisitors:false},[]).some(i=>i.key==="structured-L4"));
});

test("L2 derives singular/plural linked cities, excludes explicit not-open studios and never infers from service flags", () => {
  const studio=bySlug("briargate"), hr=bySlug("highlands-ranch"), parker=bySlug("parker");
  assert(local.isLiveLocationForLocalFaq(hr),"only HR red light, not the studio, is coming soon");
  const flags=[{comingSoon:true},{notYetOpen:true},{isOpen:false},{status:"coming-soon"},{status:"NOT YET OPEN"},{status:"not_open"}];
  for(const flag of flags) {
    const marked={...parker,...flag};
    assert.deepEqual(local.getOtherLiveStateLocations(studio,[studio,hr,marked]),[hr]);
    const item=local.buildStructuredLocationFaqs(studio,[studio,hr,marked]).find(i=>i.key==="structured-L2");
    assert.equal(item.answer,"Yes. Zivel also has a Colorado studio in Highlands Ranch. It has its own hours, pricing, and booking page.");
    assert.deepEqual(item.parts.filter(p=>p.href),[{text:"Highlands Ranch",href:getLocationHref(hr)}]);
    assert(!local.buildStructuredLocationFaqs(studio,[studio,marked]).some(i=>i.key==="structured-L2"));
  }
  const item=local.buildStructuredLocationFaqs(studio,[studio,hr,parker]).find(i=>i.key==="structured-L2");
  assert.equal(item.answer,"Yes. Zivel also has Colorado studios in Highlands Ranch and Parker. Each has its own hours, pricing, and booking page.");
  const ohio={...studio,stateSlug:"ohio",state:"OH",citySlug:"fixture",contact:{address:"1 Main St, Columbus, OH 43215"}};
  assert.deepEqual(local.getOtherLiveStateLocations(ohio,[ohio,bySlug("brecksville")]),[]);
});

test("one/two app wording, venue text and no-online booking fallback exactly match the approved templates", () => {
  const apps=local.buildStructuredLocationFaqs(bySlug("briargate")).find(i=>i.key==="structured-L3a");
  assert.equal(apps.question,"Can I use Wellhub or ClassPass at Zivel Colorado Springs?");
  assert.equal(apps.answer,"Zivel Colorado Springs is listed on Wellhub and ClassPass. Eligible plans and availability are set by each app, so check the apps for current options.");
  const app=local.buildStructuredLocationFaqs(bySlug("riverton")).find(i=>i.key==="structured-L3a");
  assert.equal(app.answer,"Zivel Riverton is listed on Wellhub. Eligible plans and availability are set by Wellhub, so check the app for current options.");
  const venue=bySlug("fieldhouse");
  const online=local.buildStructuredLocationFaqs(venue).find(i=>i.key==="structured-L4");
  assert.equal(online.answer,"Yes. Zivel Fieldhouse is located in Gatorade Fieldhouse, and anyone can book online or by phone, including athletes, families, and event visitors.");
  const phoneOnly={...venue,booking:undefined};
  const phone=local.buildStructuredLocationFaqs(phoneOnly).find(i=>i.key==="structured-L4");
  assert(phone.answer.includes(`call or text ${venue.contact.phone} to book`));
  assert.match(phone.parts.find(p=>p.href).href,/^tel:\+1\d{10}$/);
  assert(!local.buildStructuredLocationFaqs({...phoneOnly,contact:{address:venue.contact.address}}).some(i=>i.key==="structured-L4"));
});

test("structured locals precede approved manual entries without changing standard omission rules or escaping", () => {
  const source=bySlug("briargate");
  const l={...source,localFaqs:[{question:"Approved manual fixture?",answer:"A fixture only, not published."}]};
  const items=buildLocationFaqs(l,options(l));
  assert.equal(items[7].key,"medical");
  assert.equal(items[8].key,"structured-L1");
  assert.equal(items.at(-1).key,"local-0");
  assert.equal(buildLocationFaqs({...l,pricing:undefined},{...options(l),pathways:[]}).filter(i=>!i.key.startsWith("structured-")&&!i.key.startsWith("local-")).length,6);
  const fixture={...source,county:'County <script>alert("fixture")</script> & Region'};
  const doc=r.parse(renderToStaticMarkup(r.React.createElement(Faq,{cityName:getLocationCity(fixture),items:local.buildStructuredLocationFaqs(fixture)})));
  const schema=JSON.parse(doc.querySelector('script[type="application/ld+json"]').innerHTML);
  assert.equal(doc.querySelector("details p").text,schema.mainEntity[0].acceptedAnswer.text);
  assert(!doc.querySelector("details script"));
});

test("both locale main templates have collapsed entries, exact FAQ/schema parity, approved counts, valid local links and unchanged exceptions", async () => {
  const results=[];
  for(const l of active) for(const locale of ["en","es"]) {
    const doc=await r.render("src/app/[locale]/locations/[state]/[city]/page",{locale,state:l.stateSlug,city:l.citySlug});
    const section=doc.querySelector("[data-location-faq]"), details=section.querySelectorAll("details");
    const schema=JSON.parse(section.querySelector('script[type="application/ld+json"]').innerHTML);
    const localItems=local.buildStructuredLocationFaqs(l);
    assert.equal(details.length,8+localItems.length);
    assert.equal(schema.mainEntity.length,details.length);
    details.forEach((d,index)=>{
      assert(!d.hasAttribute("open"));
      assert.equal(d.getAttribute("name"),["belmont","palm-coast"].includes(l.citySlug)?undefined:"location-faq");
      assert.equal(d.querySelector("summary").text,schema.mainEntity[index].name);
      assert.equal(d.querySelector("p").text,schema.mainEntity[index].acceptedAnswer.text);
    });
    for(const part of localItems.flatMap(i=>i.parts).filter(p=>p.href)) {
      assert(locations.some(other=>getLocationHref(other)===part.href),`${l.citySlug}: registered destination`);
    }
    assert.equal(section.querySelectorAll('a[href="#map"]').length,1);
    results.push({slug:l.citySlug,locale,count:localItems.length,types:localItems.map(i=>i.key.replace("structured-","")),
      cities:local.getOtherLiveStateLocations(l).map(other=>getLocationCity(other))});
  }
  fs.writeFileSync("/tmp/zivel-local-faq-template-results.json",JSON.stringify(results,null,2));
});

test("before/after snapshots preserve every standard answer, other schema/markup, metadata, section order, URLs, sitemap and unrelated data", async t => {
  const filename=process.env.LOCAL_FAQ_BEFORE;
  if(!filename) { t.skip("Set LOCAL_FAQ_BEFORE to a pre-change snapshot.");return; }
  const before=JSON.parse(fs.readFileSync(filename,"utf8"));
  const after=JSON.parse(JSON.stringify(await capture()));
  assert.deepEqual(after.locations.map(stripNewFields),before.locations,"only the five approved fields may be added");
  assert.deepEqual(after.sitemap,before.sitemap);
  assert.deepEqual(after.navigation,before.navigation);
  after.pages.forEach((page,index)=>{
    const old=before.pages[index];
    assert.deepEqual(page.metadata,old.metadata);
    assert.deepEqual(page.sections,old.sections);
    assert.equal(page.protectedHtml,old.protectedHtml,`${page.params.locale}/${page.params.city}: markup outside FAQ`);
    assert.deepEqual(page.faq.slice(0,old.faq.length),old.faq,`${page.params.locale}/${page.params.city}: original answers`);
    if(page.params.city==="brecksville") assert.deepEqual(page,old,"exiting brand, untouched");
  });
  console.log(`Preserved ${after.pages.length} locale template snapshots and ${after.sitemap.length} sitemap entries.`);
});
