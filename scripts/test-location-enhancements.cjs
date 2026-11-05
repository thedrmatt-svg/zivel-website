const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const test = require("node:test");
const { renderToStaticMarkup } = require("react-dom/server");
const { createLocationRenderer } = require("./lib/location-renderer.cjs");
const r = createLocationRenderer();
const { locations } = r.source("src/lib/data/locations");
const active = locations.filter(l => l.citySlug !== "brecksville");
const status = r.source("src/lib/location-status");
const membership = r.source("src/lib/location-memberships");
const { getLocationEnhancementCopy: copy, membershipText } = r.source("src/lib/location-enhancement-copy");
const order = r.source("src/lib/location-review-order").orderLocationReviews;
const schemas = doc => doc.querySelectorAll('script[type="application/ld+json"]').map(n => JSON.parse(n.innerHTML));
const params = l => ({ state: l.stateSlug, city: l.citySlug });
const main = "src/app/[locale]/locations/[state]/[city]/page";
const cache = r.source("src/data/places-cache.json");

test("mocked local time: Eastern/Central/Mountain before, during, after, closed day; minutes, DST and invalid hours", () => {
  const hours = Object.fromEntries(status.WEEKDAYS.map(day => [day, day === "sunday" ? "Closed" : "8:30am – 6:30pm"]));
  for (const [zone, utcOffset] of [["America/New_York",5],["America/Chicago",6],["America/Denver",7]]) {
    const at = (day, hour, minute = 0) => new Date(Date.UTC(2026, 10, day, hour + utcOffset, minute));
    const text = date => status.getLocationStatus(hours, zone, date, "en", copy());
    assert.equal(text(at(5,8,29)), "Opens today at 8:30am");
    assert.equal(text(at(5,8,30)), "Open now · until 6:30pm");
    assert.equal(text(at(5,18,29)), "Open now · until 6:30pm");
    assert.equal(text(at(5,18,30)), "Closed now · opens tomorrow at 8:30am");
    assert.equal(text(at(7,19)), "Closed now · opens Monday at 8:30am");
    assert.equal(text(at(8,10)), "Closed today · opens Monday at 8:30am");
    assert.equal(status.getLocationStatus(hours,zone,at(5,19),"es",copy("es")), "Cerrado ahora · abre mañana a las 8:30am");
    assert.equal(status.getLocationStatus(hours,zone,at(8,10),"es",copy("es")), "Cerrado hoy · abre el lunes a las 8:30am");
  }
  assert.equal(status.getLocationStatus(hours, "America/Denver", new Date("2026-07-06T14:30:00Z"), "en",copy()), "Open now · until 6:30pm");
  for (const bad of ["8:75am – 6pm","13am – 6pm","TBD","8am – 7am","8am – 12pm, 1pm – 6pm"]) {
    assert.equal(status.parseLocationHours({...hours,monday:bad}), null);
  }
  assert.equal(status.parseLocationHours({...hours,monday:undefined}), null);
  assert.equal(status.getLocationStatus(hours,"invalid",new Date(),"en",copy()), null);
  assert.equal(status.getLocationStatus(Object.fromEntries(status.WEEKDAYS.map(d=>[d,"Closed"])),"America/Chicago",new Date(),"en",copy()), null);
});

test("membership minimum excludes promotions/family/packages and never invents missing prices", () => {
  const windermere = locations.find(l=>l.citySlug==="windermere");
  assert.deepEqual(membership.getLocationMembershipMinimum(windermere), {
    amount:99,price:"$99",unit:"/mo",index:1,name:"Essential",
  });
  const make = tiers => ({...windermere,pricing:{membershipTiers:tiers}});
  const tier = (name,price,cadence="/month") => ({name,price,cadence,features:[]});
  assert.equal(membership.getLocationMembershipMinimum({...windermere,pricing:{}}),null);
  assert.equal(membership.getLocationMembershipMinimum(make([
    tier("Family","$10"),tier("Seasonal special","$1"),tier("Intro","$5"),
    tier("5-pack package","$5"),tier("Individual","$15","1st month"),tier("Essential","Contact us"),
  ])),null);
  assert.equal(membership.getLocationMembershipMinimum(make([tier("Essential","$1,199.50"),tier("Elite","$1,299")])).price,"$1,199.50");
});

test("review ordering preserves content, stable ties, shorter order and fewer-than-three-long fallback", () => {
  const row = (id,n) => ({id,text:Array(n).fill(id).join(" ")});
  const a=row("a",21), b=row("b",30), c=row("c",25), d=row("d",3), e=row("e",4);
  assert.deepEqual(order([d,a,e,b]),[d,a,e,b]);
  assert.deepEqual(order([d,a,e,b,c]).map(r=>r.id),["b","c","a","d","e"]);
  const same=row("same",30);
  assert.deepEqual(order([b,same,c]).map(r=>r.id),["b","same","c"]);
  assert.deepEqual(order([{text:null}]),[{text:null}]);
});

test("18 main studios in both locales: SSR contact links, membership values, FAQ/schema parity and unmodified reviews", async () => {
  for (const location of active) for (const locale of ["en","es"]) {
    const doc = await r.render(main,{...params(location),locale});
    const entry = cache[location.google?.placeId];
    const maps = entry?.locationPath === `${location.stateSlug}/${location.citySlug}` ? entry.googleMapsUri : null;
    const line = doc.querySelector("[data-location-status-line]");
    assert(line,location.slug);
    assert.equal(line.querySelector("[data-location-status]").text.trim(),"");
    assert.equal(line.querySelector('a[href^="tel:"]').text,`${copy(locale).call} ${location.contact.phone}`);
    assert.equal(line.querySelector('a[target="_blank"]')?.getAttribute("href") ?? null,maps ?? null);
    const details=doc.querySelector("[data-location-booking-details]");
    assert(details.text.includes(location.contact.address));
    assert.equal(details.querySelector('a[target="_blank"]')?.getAttribute("href")??null,maps??null);
    const min=membership.getLocationMembershipMinimum(location);
    const teaser=doc.querySelector("[data-location-membership-teaser]");
    if(min) {
      assert.equal(teaser?.text,membershipText(copy(locale).membershipTeaser,min.price,min.unit));
      assert.equal(teaser.getAttribute("href"),`${locale==="es"?"/es":""}/locations/${location.stateSlug}/${location.citySlug}/pricing`);
      assert(location.pricing.membershipTiers.some(t=>t.price===min.price && t.cadence===min.unit));
    } else assert.equal(teaser,null);
    const faq=doc.querySelector("[data-location-faq]");
    const schema=schemas(faq)[0];
    for (const [i,detail] of faq.querySelectorAll("details").entries()) {
      assert.equal(detail.querySelector("p").text,schema.mainEntity[i].acceptedAnswer.text);
    }
    const membershipAnswer=schema.mainEntity.find(q=>q.name.includes("memberships or packages"))?.acceptedAnswer.text;
    if(min) assert(membershipAnswer.endsWith(membershipText(copy(locale).membershipFaq,min.price,min.unit)));
    const eligible=(entry?.reviews??[]).filter(v=>v.rating===5);
    const expected=order(eligible).slice(0,6);
    const texts=doc.querySelector("#reviews").querySelectorAll("p[id]").map(p=>p.text);
    assert.deepEqual(texts,expected.filter(v=>v.text).map(v=>v.text));
    assert(!doc.querySelector('a[href*="set_location=11417"]'));
    assert(status.parseLocationHours(location.hours),location.slug);
    assert(status.getLocationTimezone(location).zone,location.slug);
  }
});

test("layout covers nested routes with each studio's hero booking destination; no Brecksville bar", async () => {
  const file="src/app/[locale]/locations/[state]/[city]/layout";
  const layout=r.source(file).default;
  for(const location of locations) for(const locale of ["en","es"]) {
    const tree=await layout({params:Promise.resolve({...params(location),locale}),children:null});
    const child=tree.props.children.at(-1);
    if(location.citySlug==="brecksville") { assert.equal(child,false); continue; }
    assert.equal(child.props.bookingUrl,r.source("src/lib/location-booking").getLocationBookingHref(location));
    assert.equal(child.props.basePath,`/locations/${location.stateSlug}/${location.citySlug}`);
  }
});

test("missing Maps or online booking omits only the corresponding new actions", () => {
  const Mobile=r.source("src/components/location/LocationMobileActions").default;
  const Line=r.source("src/components/location/LocationStatusLine").default;
  r.state.pathname="/locations/georgia/buckhead/pricing";
  const doc=r.parse(renderToStaticMarkup(r.React.createElement(Mobile,{
    basePath:"/locations/georgia/buckhead",phone:"(404) 309-5954",copy:copy(),
  })));
  assert.equal(doc.querySelectorAll("a").length,1);
  assert.equal(doc.querySelector("a").getAttribute("href"),"tel:+14043095954");
  const line=r.parse(renderToStaticMarkup(r.React.createElement(Line,{
    hours:{monday:"unparseable"},zone:"America/New_York",phone:"(404) 309-5954",locale:"en",copy:copy(),
  })));
  assert.equal(line.querySelectorAll("a").length,1);
  assert.equal(line.querySelector("[data-location-status]").text.trim(),"");
  r.state.pathname="/services";
  assert.equal(renderToStaticMarkup(r.React.createElement(Mobile,{
    basePath:"/locations/georgia/buckhead",phone:"(404) 309-5954",copy:copy(),
  })),"");
});

test("review filtering and cap remain separate, including exclusions; Brecksville keeps legacy display", () => {
  const Component=r.source("src/components/location/GoogleReviews").default;
  const fixture=Object.values(cache).find(c=>c.reviews?.some(v=>v.rating===5));
  const id=Object.keys(cache).find(k=>cache[k]===fixture);
  const eligible=fixture.reviews.filter(v=>v.rating===5 && !/the/i.test(v.text??""));
  const render=enhanced=>r.parse(renderToStaticMarkup(r.React.createElement(Component,{
    placeId:id,locationName:"Test",enhanced,excludeText:/the/i,
  })));
  const updated=render(true), legacy=render(false);
  assert.equal(updated.querySelectorAll("p[id]").length,order(eligible).slice(0,6).filter(v=>v.text).length);
  assert.equal(legacy.querySelectorAll("p[id]").length,0);
  assert(legacy.text.includes("5-Star Reviews") || !eligible.length);
});

test("protected data, schema, section order, metadata, copy and Brecksville match pre-change baseline", async t => {
  const beforePath=process.env.LOCATION_ENHANCEMENTS_BASELINE;
  if(!beforePath) return t.skip("Set LOCATION_ENHANCEMENTS_BASELINE for preservation comparison");
  const before=createLocationRenderer(beforePath);
  assert.deepEqual(locations,before.source("src/lib/data/locations").locations);
  for(const file of ["src/app/sitemap.ts","src/components/layout/Header.tsx","src/components/layout/Footer.tsx","scripts/fetch-places-cache.mjs","src/data/places-cache.json"]) {
    assert.equal(fs.readFileSync(file,"utf8"),fs.readFileSync(path.join(beforePath,file),"utf8"),file);
  }
  for(const location of locations) for(const locale of ["en","es"]) {
    const p={...params(location),locale};
    const [old,doc]=await Promise.all([before.render(main,p),r.render(main,p)]);
    const oldSchemas=schemas(old), newSchemas=schemas(doc);
    const normalize=entries=>entries.map(s=>{
      if(s["@type"]!=="FAQPage") return s;
      return {...s,mainEntity:s.mainEntity.map(q=>({...q,acceptedAnswer:{...q.acceptedAnswer,
        text:q.acceptedAnswer.text.replace(/ (?:Memberships start at|Las membresías comienzan en) \$[\d,.]+[^.]*\.$/,""),
      }}))};
    });
    assert.deepEqual(normalize(newSchemas),oldSchemas,`${location.slug} schema`);
    assert.deepEqual(doc.querySelectorAll("h1,h2").map(n=>n.text),old.querySelectorAll("h1,h2").map(n=>n.text));
    assert.deepEqual(doc.querySelectorAll("meta").map(n=>n.outerHTML),old.querySelectorAll("meta").map(n=>n.outerHTML));
    assert.deepEqual(await r.source(main).generateMetadata({params:Promise.resolve(p)}),await before.source(main).generateMetadata({params:Promise.resolve(p)}));
    if(location.citySlug==="brecksville") assert.equal(doc.outerHTML,old.outerHTML,"Brecksville exiting brand, untouched");
    for(const child of ["pricing","pathways","cryotherapy","blog"]) {
      const file=child==="cryotherapy"?"[service]":child;
      const route=`src/app/[locale]/locations/[state]/[city]/${file}/page`;
      const childParams={...p,service:child};
      try {
        const [oldChild,newChild]=await Promise.all([before.render(route,childParams),r.render(route,childParams)]);
        assert.equal(newChild.outerHTML.replace(/ data-location-hero-actions(?:="")?/g,""),oldChild.outerHTML,`${location.slug}/${child}: unchanged child content`);
      } catch(error) {
        if(error.message!=="NEXT_NOT_FOUND") throw error;
      }
    }
  }
});
