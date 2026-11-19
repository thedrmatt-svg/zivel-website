// Replit workspace Shell: node --test scripts/test-buckhead-holiday.cjs
const assert = require("node:assert/strict");
const { test } = require("node:test");
const fs = require("node:fs");
const { createLocationRenderer } = require("./lib/location-renderer.cjs");

const mainFile = "src/app/[locale]/locations/[state]/[city]/page";
const pricingFile = "src/app/[locale]/locations/[state]/[city]/pricing/page";
const params = { state: "georgia", city: "buckhead", locale: "en" };
const styles = new Proxy({}, {
  get: (_, key) => key === "__esModule" ? false : String(key),
});
function renderer(standard = false) {
  const r = createLocationRenderer();
  for (const name of [
    "@/components/location/holiday/HolidayLocation.module.css",
    "@/components/location/holiday/HolidayPricingPresentation.module.css",
    "./HolidayLocation.module.css", "./HolidayPricingPresentation.module.css",
    "./HollywoodHolidayHero.module.css", "./HollywoodMockPricing.module.css",
  ]) r.wrappers[name] = styles;
  if (standard) r.wrappers["@/components/location/holiday/holiday-location-config"] = {
    isHolidayLocation: () => false,
  };
  r.gates = [];
  r.wrappers["@/components/location/PricingGateModal"] = props => {
    r.gates.push({ citySlug: props.citySlug, bypass: props.bypass });
    return props.children;
  };
  return r;
}
const schema = page => page.querySelectorAll('script[type="application/ld+json"]')
  .map(element => JSON.parse(element.innerHTML));
const links = element => element.querySelectorAll("a")
  .map(a => a.getAttribute("href")).sort();

test("only the twelve approved studios are holiday-enabled; other studios stay standard", async () => {
  const r = renderer(), standard = renderer(true);
  const { locations } = r.source("src/lib/data/locations");
  const config = r.source("src/components/location/holiday/holiday-location-config");
  for (const location of locations) {
    const enabled = (location.stateSlug === "georgia" && ["buckhead", "windermere"].includes(location.citySlug)) ||
      (location.stateSlug === "florida" && ["coral-gables", "hollywood"].includes(location.citySlug)) ||
      (location.stateSlug === "colorado" && ["parker", "briargate"].includes(location.citySlug)) ||
      (location.stateSlug === "utah" && location.citySlug === "riverton") ||
      (location.stateSlug === "louisiana" && location.citySlug === "metairie") ||
      (location.stateSlug === "kentucky" && location.citySlug === "newport") ||
      (location.stateSlug === "arkansas" && ["rogers", "bentonville", "fayetteville"].includes(location.citySlug));
    assert.equal(config.isHolidayLocation(location.stateSlug, location.citySlug), enabled);
    if (enabled) continue;
    for (const file of [mainFile, pricingFile]) {
      const p = { state: location.stateSlug, city: location.citySlug, locale: "en" };
      assert.equal((await r.render(file, p)).toString(), (await standard.render(file, p)).toString(),
        `${location.name}: holiday switch cannot alter this route`);
    }
  }
});

test("Briargate stages holiday pages without inventing offers or changing business data", async () => {
  const r = renderer(), standard = renderer(true);
  const p = { state: "colorado", city: "briargate", locale: "en" };
  const data = r.source("src/components/location/holiday/holiday-offers");
  const giftLinks = [657241, 657242, 657243].map(id => `https://app.clubready.com/JoinUs/15196/${id}`);
  const giftCards = data.getHolidayPricingOffers(p.state, p.city).slice(0, 3);
  const recoveryLink = "https://app.clubready.com/JoinUs/15196/647159";
  const facialLink = "https://app.clubready.com/JoinUs/15196/657325";
  const slimmingLink = "https://app.clubready.com/JoinUs/15196/657339";
  const slimming = data.getHolidayPricingOffers(p.state, p.city).at(-1);
  assert.equal(slimming.title, "Cryo Slimming");
  assert.equal(slimming.price, "$159");
  assert.equal(slimming.purchaseUrl, slimmingLink);
  assert.equal(slimming.image, r.source("src/lib/data/location-service-images").getLocationServiceImage("briargate", "cryo-slimming"));
  assert.deepEqual(giftCards.map(offer => offer.price), ["$50", "$100", "$200"]);
  assert.deepEqual(giftCards.map(offer => offer.purchaseUrl), giftLinks);
  for (const getter of ["getHolidayOffers", "getHolidayPricingOffers"]) {
    const offers = data[getter](p.state, p.city);
    assert.equal(offers.length, getter === "getHolidayOffers" ? 3 : 6);
    for (const offer of offers) {
      assert(offer.id.startsWith("briargate-"));
      if (offer.id === "briargate-recovery-special") {
        assert.equal(offer.price, "$59");
        assert.equal(offer.description, "Day Pass - 3 Services");
        assert.equal(offer.purchaseUrl, recoveryLink);
      } else if (offer.id === "briargate-facial-special") {
        assert.equal(offer.price, "$99");
        assert.equal(offer.purchaseUrl, facialLink);
      } else if (offer.id === "briargate-additional-special") {
        assert.equal(offer.price, "$159");
      } else if (!offer.id.startsWith("briargate-gift-card-")) assert.equal(offer.price, undefined);
      assert(!offer.purchaseUrl || offer.purchaseUrl === "/locations/colorado/briargate/pricing" ||
        giftLinks.includes(offer.purchaseUrl) || [recoveryLink, facialLink, slimmingLink].includes(offer.purchaseUrl));
      assert(fs.existsSync(`public${offer.image}`));
      assert(!/oxygen|dry.float/i.test(JSON.stringify(offer)));
    }
  }
  for (const file of [mainFile, pricingFile]) {
    const page = await r.render(file, p), before = await standard.render(file, p);
    assert.deepEqual(schema(page), schema(before));
    assert.deepEqual(
      await r.source(file).generateMetadata({ params: Promise.resolve(p) }),
      await standard.source(file).generateMetadata({ params: Promise.resolve(p) }));
    const offers = page.querySelector('section[aria-label="Holiday offers"]');
    assert.equal(offers.querySelectorAll("article").length, file === mainFile ? 3 : 6);
    assert.equal(offers.querySelectorAll("button[disabled]").length, 0);
    assert.deepEqual(links(offers).filter(link => link.includes("clubready")),
      (file === mainFile ? [recoveryLink, facialLink] : [...giftLinks, recoveryLink, facialLink, slimmingLink]).sort());
    assert.equal(offers.querySelector('[data-offer-id="briargate-facial-special"] .price').text, "$99");
    const recovery = offers.querySelector('[data-offer-id="briargate-recovery-special"]');
    assert.equal(recovery.querySelector(".price").text, "$59");
    assert.equal(recovery.querySelector(".description").text, "Day Pass - 3 Services");
    assert.equal(offers.querySelector(".disclaimer").text, data.HOLIDAY_OFFER_DISCLAIMER);
    assert(!/oxygen bar/i.test(page.text));
    assert(page.text.includes("Zivel Briargate"));
    assert(!page.text.includes("Zivel Buckhead") && !page.text.includes("Zivel Hollywood"));
    if (file === pricingFile) {
      const membershipLinks = links(page.querySelector("#memberships"));
      assert(membershipLinks.includes("https://app.clubready.com/JoinUs/15196/647719"));
      assert(membershipLinks.includes("https://app.clubready.com/JoinUs/15196/647718"));
      assert.equal(page.querySelector("h1").text, "Holiday Specials, Pricing & Memberships");
      for (const id of ["memberships", "services", "packages"]) {
        assert.equal(page.querySelector(`#${id}`).innerHTML, before.querySelector(`#${id}`).innerHTML);
      }
    } else {
      assert.equal(page.querySelector("h1").text, "HOLIDAY SPECIALS");
      assert(page.text.includes("460 Chapel Hills Dr Ste 120"));
      assert(links(page).includes("tel:+17195001638"));
      assert(links(page).some(link => link.includes("set_location=11779")));
    }
  }
  assert.deepEqual(r.gates, [{ citySlug: "briargate", bypass: true }]);
  const ungated = renderer();
  delete ungated.wrappers["@/components/location/PricingGateModal"];
  assert.equal((await ungated.render(pricingFile, p)).querySelector("#pg-firstName"), null);
});

test("Windermere uses the Buckhead layout with only its approved offers and pending checkout links", async () => {
  const r = renderer(), standard = renderer(true);
  const p = { state: "georgia", city: "windermere", locale: "en" };
  const data = r.source("src/components/location/holiday/holiday-offers");
  const mainOffers = data.getHolidayOffers(p.state, p.city);
  const pricingOffers = data.getHolidayPricingOffers(p.state, p.city);
  assert.equal(mainOffers.length, 3);
  assert.equal(pricingOffers.length, 5);
  assert.deepEqual(pricingOffers.slice(0, 3).map(o => o.price), ["$50", "$100", "$200"]);
  const giftLinks = [644563, 644566, 644567].map(id => `https://app.clubready.com/JoinUs/14944/${id}`);
  assert.deepEqual(pricingOffers.slice(0, 3).map(o => o.purchaseUrl), giftLinks);
  assert.equal(mainOffers[0].title, "6 Recovery Services");
  assert.equal(mainOffers[0].price, "$99");
  assert.equal(mainOffers[1].title, "BOGO Cryo Ultra-Lift & Firming Facials & Chin");
  assert.equal(mainOffers[1].price, "$150");
  const facialLink = "https://app.clubready.com/JoinUs/14944/657222";
  const recoveryLink = "https://app.clubready.com/JoinUs/14944/657223";
  assert.equal(mainOffers[0].purchaseUrl, recoveryLink);
  assert.equal(mainOffers[1].purchaseUrl, facialLink);
  for (const offer of [...mainOffers, ...pricingOffers]) {
    assert(fs.existsSync(`public${offer.image}`));
    assert(!offer.purchaseUrl || offer.purchaseUrl === "/locations/georgia/windermere/pricing" ||
      giftLinks.includes(offer.purchaseUrl) || [facialLink, recoveryLink].includes(offer.purchaseUrl));
  }
  for (const file of [mainFile, pricingFile]) {
    const page = await r.render(file, p), before = await standard.render(file, p);
    assert.deepEqual(schema(page), schema(before));
    assert.deepEqual(
      await r.source(file).generateMetadata({ params: Promise.resolve(p) }),
      await standard.source(file).generateMetadata({ params: Promise.resolve(p) }));
    const offers = page.querySelector('section[aria-label="Holiday offers"]');
    assert.equal(offers.querySelectorAll("article").length, file === mainFile ? 3 : 5);
    assert.equal(offers.querySelectorAll("button[disabled]").length, 0);
    assert.deepEqual(links(offers).filter(link => link.includes("clubready")),
      (file === mainFile ? [facialLink, recoveryLink] : [...giftLinks, facialLink, recoveryLink]).sort());
    assert.equal(offers.querySelector('[data-offer-id="windermere-facial-special"] .price').text, "$150");
    assert.equal(offers.querySelector(".disclaimer").text, data.HOLIDAY_OFFER_DISCLAIMER);
    assert(page.text.includes("Zivel Windermere"));
    if (file === pricingFile) {
      assert.equal(page.querySelector("h1").text, "Holiday Specials, Pricing & Memberships");
      for (const id of ["memberships", "services", "packages"]) {
        assert.equal(page.querySelector(`#${id}`).innerHTML, before.querySelector(`#${id}`).innerHTML);
      }
    } else {
      assert.equal(page.querySelector("h1").text, "HOLIDAY SPECIALS");
    }
  }
});

test("Metairie stages the approved holiday layout while retaining its own pricing and identity", async () => {
  const r = renderer(), standard = renderer(true);
  const p = { state: "louisiana", city: "metairie", locale: "en" };
  const data = r.source("src/components/location/holiday/holiday-offers");
  for (const getter of ["getHolidayOffers", "getHolidayPricingOffers"]) {
    const offers = data[getter](p.state, p.city);
    assert.equal(offers.length, getter === "getHolidayOffers" ? 3 : 6);
    for (const offer of offers) {
      assert(offer.id.startsWith("metairie-"));
      const isFiftyGiftCard = offer.id === "metairie-gift-card-1";
      const isHundredGiftCard = offer.id === "metairie-gift-card-2";
      const isTwoHundredGiftCard = offer.id === "metairie-gift-card-3";
      const isDayPass = offer.id === "metairie-recovery-special";
      const isSlimmingFacial = offer.id === "metairie-facial-special";
      const isHolidayMembership = offer.id === "metairie-additional-special";
      if (isHolidayMembership) {
        assert.equal(offer.title, "Holiday Membership Special");
        assert.equal(offer.description, "$99 first month, $150 after.");
        assert.equal(offer.additionalDescription, "Unlimited Recovery Services per Month.");
        assert.equal(offer.purchaseUrl, "https://app.clubready.com/JoinUs/14831/657535");
      }
      if (isSlimmingFacial) {
        assert.equal(offer.title, "Cryo Slimming & mini-Facial");
        assert.equal(offer.image,
          r.source("src/lib/data/location-service-images").getLocationServiceImage("metairie", "cryo-slimming"));
        assert.equal(offer.imageAlt, "Cryo slimming treatment at Zivel Metairie");
      }
      if (isDayPass) {
        assert.equal(offer.title, "Day Pass");
        assert.equal(offer.description, "3 Recovery Sessions");
      }
      if (isFiftyGiftCard || isHundredGiftCard || isTwoHundredGiftCard) {
        const spend = isFiftyGiftCard ? 50 : isHundredGiftCard ? 100 : 200;
        assert.equal(offer.description, `Spend $${spend} & get $${spend / 2} Promotional Holiday In-Store Credit`);
      }
      assert.equal(offer.price, isFiftyGiftCard ? "$50" : isHundredGiftCard ? "$100" : isTwoHundredGiftCard ? "$200" : isDayPass ? "$59" : isSlimmingFacial ? "$199" : isHolidayMembership ? "$99" : undefined);
      assert(!offer.purchaseUrl || offer.purchaseUrl === "/locations/louisiana/metairie/pricing" ||
        (isFiftyGiftCard && offer.purchaseUrl === "https://app.clubready.com/JoinUs/14831/657205") ||
        (isHundredGiftCard && offer.purchaseUrl === "https://app.clubready.com/JoinUs/14831/657526") ||
        (isTwoHundredGiftCard && offer.purchaseUrl === "https://app.clubready.com/JoinUs/14831/657527") ||
        (isDayPass && offer.purchaseUrl === "https://app.clubready.com/JoinUs/14831/640981") ||
        (isSlimmingFacial && offer.purchaseUrl === "https://app.clubready.com/JoinUs/14831/641166") ||
        (isHolidayMembership && offer.purchaseUrl === "https://app.clubready.com/JoinUs/14831/657535"));
      assert(fs.existsSync(`public${offer.image}`));
    }
  }
  for (const file of [mainFile, pricingFile]) {
    const page = await r.render(file, p), before = await standard.render(file, p);
    assert.deepEqual(schema(page), schema(before));
    assert.deepEqual(
      await r.source(file).generateMetadata({ params: Promise.resolve(p) }),
      await standard.source(file).generateMetadata({ params: Promise.resolve(p) }));
    const offers = page.querySelector('section[aria-label="Holiday offers"]');
    assert.equal(offers.querySelectorAll("article").length, file === mainFile ? 3 : 6);
    assert.equal(offers.querySelectorAll("button[disabled]").length, 0);
    const slimmingFacial = offers.querySelector('[data-offer-id="metairie-facial-special"]');
    assert(slimmingFacial.text.includes("Cryo Slimming & mini-Facial"));
    assert.equal(slimmingFacial.querySelector(".price").text, "$199");
    const dayPass = offers.querySelector('[data-offer-id="metairie-recovery-special"]');
    assert(dayPass.text.includes("Day Pass"));
    assert(dayPass.text.includes("3 Recovery Sessions"));
    assert.equal(dayPass.querySelector(".price").text, "$59");
    if (file === pricingFile) {
      const membership = offers.querySelector('[data-offer-id="metairie-additional-special"]');
      assert(membership.text.includes("$99 first month, $150 after."));
      assert(membership.text.includes("Unlimited Recovery Services per Month."));
      for (const spend of [50, 100, 200]) {
        assert(offers.text.includes(`Spend $${spend} & get $${spend / 2} Promotional Holiday In-Store Credit`));
      }
    }
    assert.deepEqual(links(offers).filter(link => link.includes("clubready")),
      file === mainFile ? ["https://app.clubready.com/JoinUs/14831/640981",
        "https://app.clubready.com/JoinUs/14831/641166"] : ["https://app.clubready.com/JoinUs/14831/640981",
        "https://app.clubready.com/JoinUs/14831/641166",
        "https://app.clubready.com/JoinUs/14831/657205",
        "https://app.clubready.com/JoinUs/14831/657526",
        "https://app.clubready.com/JoinUs/14831/657527",
        "https://app.clubready.com/JoinUs/14831/657535"]);
    assert.equal(offers.querySelector(".disclaimer").text, data.HOLIDAY_OFFER_DISCLAIMER);
    assert(!page.text.includes("Zivel Hollywood") && !page.text.includes("Zivel Buckhead"));
    if (file === mainFile) {
      assert.equal(page.querySelector("h1").text, "HOLIDAY SPECIALS");
      assert(page.text.includes("Zivel Metairie"));
      assert(page.text.includes("701 Metairie Rd suite 1b 201, Metairie, LA 70005"));
      assert(links(page).includes("tel:+15045197154"));
      assert(links(page).some(link => link.includes("set_location=11435")));
      assert(links(offers).includes("/locations/louisiana/metairie/pricing"));
    } else {
      assert.equal(page.querySelector("h1").text, "Holiday Specials, Pricing & Memberships");
      assert.equal(offers.querySelector(".price").text, "$50");
      assert(page.querySelector(".snowfall"));
      for (const id of ["memberships", "services", "packages"]) {
        assert.equal(page.querySelector(`#${id}`).innerHTML, before.querySelector(`#${id}`).innerHTML);
      }
      assert.deepEqual(page.querySelector('nav[aria-label="Pricing sections"]').querySelectorAll("a")
        .map(a => a.getAttribute("href")), ["#specials", "#memberships", "#services", "#packages"]);
    }
  }
  assert.deepEqual(r.gates, [{ citySlug: "metairie", bypass: true }]);
  const ungated = renderer();
  delete ungated.wrappers["@/components/location/PricingGateModal"];
  const pricing = await ungated.render(pricingFile, p);
  assert.equal(pricing.querySelector(".blur-xl"), null);
  assert.equal(pricing.querySelector("#pg-firstName"), null);
});

test("Hollywood stages holiday pages without borrowed offers or changes to regular business data", async () => {
  const r = renderer(), standard = renderer(true);
  const p = { state: "florida", city: "hollywood", locale: "en" };
  const data = r.source("src/components/location/holiday/holiday-offers");
  for (const getter of ["getHolidayOffers", "getHolidayPricingOffers"]) {
    const offers = data[getter](p.state, p.city);
    assert.equal(offers.length, getter === "getHolidayOffers" ? 3 : 6);
    for (const offer of offers) {
      assert(offer.id.startsWith("hollywood-"));
      const isFiftyGiftCard = offer.id === "hollywood-gift-card-1";
      const isHundredGiftCard = offer.id === "hollywood-gift-card-2";
      const isTwoHundredGiftCard = offer.id === "hollywood-gift-card-3";
      const isRecovery = offer.id === "hollywood-recovery-special";
      const isFacial = offer.id === "hollywood-facial-special";
      const isFacialPackage = offer.id === "hollywood-cryofacial-package";
      if (isRecovery) assert.equal(offer.title, "8 Is Great");
      if (isFacial) assert.equal(offer.title, "CryoFacial Deal");
      assert.equal(offer.price, isFiftyGiftCard ? "$50" : isHundredGiftCard ? "$100" : isTwoHundredGiftCard ? "$200" : isRecovery ? "$99" : isFacial ? "$159" : isFacialPackage ? "$625" : undefined);
      assert.equal(offer.description, getter === "getHolidayOffers" && offer.id === "hollywood-gift-cards"
        ? "Give the Gift of Feeling Better" : isRecovery ? "8 Recovery Services" : isFacial ? "CryoFacial session and 1 Day Pass" : isFacialPackage ? "Buy 5 Get 1 Free" : undefined);
      assert(!offer.purchaseUrl || offer.purchaseUrl === "/locations/florida/hollywood/pricing" ||
        (isFiftyGiftCard && offer.purchaseUrl === "https://app.clubready.com/JoinUs/14829/657202") ||
        (isHundredGiftCard && offer.purchaseUrl === "https://app.clubready.com/JoinUs/14829/657203") ||
        (isTwoHundredGiftCard && offer.purchaseUrl === "https://app.clubready.com/JoinUs/14829/657204") ||
        (isRecovery && offer.purchaseUrl === "https://app.clubready.com/JoinUs/14829/656726") ||
        (isFacial && offer.purchaseUrl === "https://app.clubready.com/JoinUs/14829/656834") ||
        (isFacialPackage && offer.purchaseUrl === "https://app.clubready.com/JoinUs/14829/656833"));
      assert(fs.existsSync(`public${offer.image}`));
    }
  }
  for (const file of [mainFile, pricingFile]) {
    const page = await r.render(file, p), before = await standard.render(file, p);
    assert.deepEqual(schema(page), schema(before));
    assert.deepEqual(
      await r.source(file).generateMetadata({ params: Promise.resolve(p) }),
      await standard.source(file).generateMetadata({ params: Promise.resolve(p) }));
    const offers = page.querySelector('section[aria-label="Holiday offers"]');
    assert.equal(offers.querySelectorAll("article").length, file === mainFile ? 3 : 6);
    assert.equal(offers.querySelectorAll("button[disabled]").length, 0);
    assert.deepEqual(links(offers).filter(link => link.includes("clubready")),
      file === mainFile ? ["https://app.clubready.com/JoinUs/14829/656726",
        "https://app.clubready.com/JoinUs/14829/656834"] : [
        "https://app.clubready.com/JoinUs/14829/656726",
        "https://app.clubready.com/JoinUs/14829/656833",
        "https://app.clubready.com/JoinUs/14829/656834",
        "https://app.clubready.com/JoinUs/14829/657202",
        "https://app.clubready.com/JoinUs/14829/657203",
        "https://app.clubready.com/JoinUs/14829/657204"]);
    assert.equal(offers.querySelector(".disclaimer").text, data.HOLIDAY_OFFER_DISCLAIMER);
    assert(!page.text.includes("Zivel Buckhead"));
    const recovery = offers.querySelector('[data-offer-id="hollywood-recovery-special"]');
    assert.equal(recovery.querySelector("h2").text, "8 Is Great");
    assert.equal(recovery.querySelector(".price").text, "$99");
    assert.equal(recovery.querySelector(".description").text, "8 Recovery Services");
    assert.equal(recovery.querySelector("a").getAttribute("href"),
      "https://app.clubready.com/JoinUs/14829/656726");
    const facial = offers.querySelector('[data-offer-id="hollywood-facial-special"]');
    assert.equal(facial.querySelector("h2").text, "CryoFacial Deal");
    assert.equal(facial.querySelector(".price").text, "$159");
    assert.equal(facial.querySelector(".description").text, "CryoFacial session and 1 Day Pass");
    assert.equal(facial.querySelector("a").getAttribute("href"),
      "https://app.clubready.com/JoinUs/14829/656834");
    if (file === mainFile) {
      assert.equal(page.querySelector("h1").text, "HOLIDAY SPECIALS");
      assert(page.text.includes("3361 Sheridan St, Hollywood, FL 33021"));
      assert(links(page).includes("tel:+17542178177"));
      assert(links(page).some(link => link.includes("set_location=11433")));
      assert(links(offers).includes("/locations/florida/hollywood/pricing"));
    } else {
      assert.equal(page.querySelector("h1").text, "Holiday Specials, Pricing & Memberships");
      const facialPackage = offers.querySelector('[data-offer-id="hollywood-cryofacial-package"]');
      assert.equal(facialPackage.querySelector("h2").text, "CryoFacial Special");
      assert.equal(facialPackage.querySelector(".price").text, "$625");
      assert.equal(facialPackage.querySelector(".description").text, "Buy 5 Get 1 Free");
      assert.equal(facialPackage.querySelector("a").getAttribute("href"),
        "https://app.clubready.com/JoinUs/14829/656833");
      assert.equal(facialPackage.querySelector("img").getAttribute("src"),
        data.HOLLYWOOD_HOLIDAY_OFFERS[1].image);
      assert.equal(offers.querySelector(".price").text, "$50");
      assert.equal(offers.querySelectorAll(".price")[1].text, "$100");
      assert.equal(offers.querySelectorAll(".price")[2].text, "$200");
      assert(page.querySelector(".snowfall"));
      for (const id of ["memberships", "services", "packages"]) {
        assert.equal(page.querySelector(`#${id}`).innerHTML, before.querySelector(`#${id}`).innerHTML);
      }
      assert.deepEqual(page.querySelector('nav[aria-label="Pricing sections"]').querySelectorAll("a")
        .map(a => a.getAttribute("href")), ["#specials", "#memberships", "#services", "#packages"]);
    }
  }
  assert.deepEqual(r.gates, [{ citySlug: "hollywood", bypass: true }]);
  const ungated = renderer();
  delete ungated.wrappers["@/components/location/PricingGateModal"];
  const pricing = await ungated.render(pricingFile, p);
  assert.equal(pricing.querySelector(".blur-xl"), null);
  assert.equal(pricing.querySelector("#pg-firstName"), null);
});

test("Fayetteville stages the standard holiday layout without unapproved prices or purchase links", async () => {
  const r = renderer(), standard = renderer(true);
  const p = { state: "arkansas", city: "fayetteville", locale: "en" };
  const data = r.source("src/components/location/holiday/holiday-offers");
  for (const getter of ["getHolidayOffers", "getHolidayPricingOffers"]) {
    const offers = data[getter](p.state, p.city);
    assert.equal(offers.length, getter === "getHolidayOffers" ? 3 : 6);
    assert(!offers.some(offer => offer.id === "fayetteville-additional-special"));
    for (const offer of offers) {
      assert(offer.id.startsWith("fayetteville-"));
      const suppliedGiftCards = {
        "fayetteville-gift-card-1": ["$50", "https://app.clubready.com/JoinUs/14943/657179"],
        "fayetteville-gift-card-2": ["$100", "https://app.clubready.com/JoinUs/14943/657180"],
        "fayetteville-gift-card-3": ["$200", "https://app.clubready.com/JoinUs/14943/657181"],
        "fayetteville-recovery-special": ["$99", "https://app.clubready.com/JoinUs/14943/657182"],
        "fayetteville-soothe-special": ["$99", "https://app.clubready.com/JoinUs/14943/657183"],
        "fayetteville-bogo-cryofacial": ["$150", "https://app.clubready.com/JoinUs/14943/657201"],
      };
      const supplied = suppliedGiftCards[offer.id];
      assert.equal(offer.price, supplied?.[0]);
      if (offer.id === "fayetteville-recovery-special") assert.equal(offer.description, "6 Recovery Services");
      if (offer.id === "fayetteville-bogo-cryofacial") {
        assert.equal(offer.title, "BOGO CryoFacial");
        assert.equal(offer.description, "Buy One/Give One");
        assert.equal(offer.image, r.source("src/lib/data/location-service-images")
          .getLocationServiceImage("fayetteville", "cryo-lift-facial"));
      }
      if (offer.id === "fayetteville-soothe-special") {
        assert.equal(offer.title, "Cryo Soothe Special");
        assert.equal(offer.description, "3 Cryo Soothe Sessions");
        assert.equal(offer.image, r.source("src/lib/data/location-service-images")
          .getLocationServiceImage("fayetteville", "cryo-soothe"));
        assert.equal(offer.imageAlt, "Cryo Soothe treatment at Zivel Fayetteville");
      }
      assert(!offer.purchaseUrl || offer.purchaseUrl === "/locations/arkansas/fayetteville/pricing" ||
        offer.purchaseUrl === supplied?.[1]);
      assert(fs.existsSync(`public${offer.image}`));
      assert(!offer.image.includes("dryfloat"));
      if (["fayetteville-gift-card-1", "fayetteville-gift-cards", "fayetteville-recovery-special"].includes(offer.id)) {
        const isGiftCard = offer.id !== "fayetteville-recovery-special";
        assert.equal(offer.image, r.source("src/lib/data/location-service-images")
          .getLocationServiceImage("fayetteville", isGiftCard ? "red-light-therapy" : "infrared-sauna"));
        assert.equal(offer.imageAlt, `${isGiftCard ? "Red light therapy" : "Infrared sauna"} at Zivel Fayetteville`);
      }
    }
  }
  for (const file of [mainFile, pricingFile]) {
    const page = await r.render(file, p), before = await standard.render(file, p);
    assert.deepEqual(schema(page), schema(before));
    assert.deepEqual(
      await r.source(file).generateMetadata({ params: Promise.resolve(p) }),
      await standard.source(file).generateMetadata({ params: Promise.resolve(p) }));
    const offers = page.querySelector('section[aria-label="Holiday offers"]');
    assert.equal(offers.querySelectorAll("article").length, file === mainFile ? 3 : 6);
    assert.equal(offers.querySelectorAll("button[disabled]").length, 0);
    assert.deepEqual(links(offers).filter(link => link.includes("clubready")),
      file === mainFile ? ["https://app.clubready.com/JoinUs/14943/657182",
        "https://app.clubready.com/JoinUs/14943/657183"] : ["https://app.clubready.com/JoinUs/14943/657179",
        "https://app.clubready.com/JoinUs/14943/657180",
        "https://app.clubready.com/JoinUs/14943/657181",
        "https://app.clubready.com/JoinUs/14943/657182",
        "https://app.clubready.com/JoinUs/14943/657183",
        "https://app.clubready.com/JoinUs/14943/657201"]);
    if (file === mainFile) assert.equal(offers.querySelector(".price").text, "$99");
    else {
      assert.equal(offers.querySelector(".price").text, "$50");
      assert.deepEqual(offers.querySelectorAll(".price").map(price => price.text), ["$50", "$100", "$200", "$99", "$99", "$150"]);
    }
    assert.equal(offers.querySelectorAll(".disclaimer").length, 1);
    assert.equal(offers.querySelector(".disclaimer").text, data.HOLIDAY_OFFER_DISCLAIMER);
    if (file === mainFile) {
      assert.equal(page.querySelector("h1").text, "HOLIDAY SPECIALS");
      assert(page.text.includes("Zivel Fayetteville"));
      assert(page.text.includes("3484 W Wedington Dr Suite 5, Fayetteville, AR 72704"));
      assert(links(page).includes("tel:+14798004443"));
      assert(links(page).some(link => link.includes("set_location=11616")));
      assert(links(offers).includes("/locations/arkansas/fayetteville/pricing"));
    } else {
      assert.equal(page.querySelector("h1").text, "Holiday Specials, Pricing & Memberships");
      assert(page.querySelector(".snowfall"));
      for (const id of ["memberships", "services", "packages"]) {
        assert.equal(page.querySelector(`#${id}`).innerHTML, before.querySelector(`#${id}`).innerHTML);
      }
      assert.deepEqual(page.querySelector('nav[aria-label="Pricing sections"]').querySelectorAll("a")
        .map(a => a.getAttribute("href")), ["#specials", "#memberships", "#services", "#packages"]);
    }
  }
  assert.deepEqual(r.gates, [{ citySlug: "fayetteville", bypass: true }]);
  const ungated = renderer();
  delete ungated.wrappers["@/components/location/PricingGateModal"];
  const pricing = await ungated.render(pricingFile, p);
  assert.equal(pricing.querySelector(".blur-xl"), null);
  assert.equal(pricing.querySelector("#pg-firstName"), null);
});

test("Newport restores its saved grouped holiday pages without changing regular pricing", async () => {
  const r = renderer(), standard = renderer(true);
  const p = { state: "kentucky", city: "newport", locale: "en" };
  const data = r.source("src/components/location/holiday/holiday-offers");
  const savedLinks = ["652095", "656490", "657029", "657030", "657031", "657057", "657058", "657705", "657707"]
    .map(id => `https://app.clubready.com/JoinUs/14833/${id}`);
  const pricingOffers = data.getHolidayPricingOffers(p.state, p.city);
  assert.equal(pricingOffers.length, 9);
  assert.deepEqual(pricingOffers.slice(0, 3).map(o => o.price), ["$50", "$100", "$200"]);
  assert(pricingOffers.slice(0, 3).every(o => !o.description));
  assert.equal(pricingOffers[4].title, "Recovery Special");
  assert.equal(pricingOffers[4].description, "5 Services");
  assert.equal(pricingOffers[4].price, "$149");
  assert.equal(pricingOffers[4].image, pricingOffers[0].image, "Use Newport's sauna image");
  assert.equal(pricingOffers[5].title, "Single Slimming and Facial");
  assert.equal(pricingOffers[5].price, "$199");
  assert.deepEqual(pricingOffers.slice(6, 9).map(o => o.title),
    ["CryoFacial — 3 Sessions", "CryoFacial — 6 Sessions", "CryoFacial — 10 Sessions"]);
  assert(pricingOffers.slice(6).every(o => !o.price));
  assert(pricingOffers.every(o => fs.existsSync(`public${o.image}`)));
  for (const file of [mainFile, pricingFile]) {
    const page = await r.render(file, p), before = await standard.render(file, p);
    const offers = page.querySelector('section[aria-label="Holiday offers"]');
    assert.equal(offers.querySelectorAll("article").length, file === mainFile ? 3 : 9);
    assert.equal(offers.querySelectorAll("button[disabled]").length, 0);
    assert.deepEqual(links(offers).filter(link => link.includes("clubready")),
      file === mainFile ? ["https://app.clubready.com/JoinUs/14833/657705", "https://app.clubready.com/JoinUs/14833/657707"] : savedLinks);
    const fiveServiceRecovery = offers.querySelectorAll("article")[file === mainFile ? 1 : 4];
    assert.equal(fiveServiceRecovery.querySelector("h2").text, "Recovery Special");
    assert(fiveServiceRecovery.text.includes("5 Services"));
    assert(fiveServiceRecovery.text.includes("$149"));
    assert(!offers.text.includes("BOGO Cryo Facial/Double Chin"));
    const recovery = offers.querySelectorAll("article")[file === mainFile ? 0 : 3];
    assert.equal(recovery.querySelector("h2").text, "Recovery Special");
    assert(recovery.text.includes("3 Recovery Sessions"));
    assert(recovery.text.includes("$99"));
    assert(!offers.text.includes("Riverton"));
    if (file === pricingFile) {
      assert.deepEqual(offers.querySelectorAll(".groupHeading").map(h => h.text),
        ["Gift Cards", "Service Specials"]);
      assert(!offers.text.includes("Membership Specials"));
      assert.equal(offers.querySelector(".groupDescription"), null);
      for (const id of ["memberships", "services", "packages"]) {
        assert.equal(page.querySelector(`#${id}`).innerHTML, before.querySelector(`#${id}`).innerHTML);
      }
    } else {
      assert(page.text.includes("Zivel Newport"));
      assert(links(offers).includes("/locations/kentucky/newport/pricing"));
    }
    assert.deepEqual(schema(page), schema(before), "Preserve Newport's existing schema");
    const meta = await r.source(file).generateMetadata({ params: Promise.resolve(p) });
    const standardMeta = await standard.source(file).generateMetadata({ params: Promise.resolve(p) });
    assert.deepEqual(meta, standardMeta, "Preserve Newport metadata");
  }
  assert.deepEqual(r.gates, [{ citySlug: "newport", bypass: true }]);
});

test("Riverton uses approved holiday offers and preserves local data", async () => {
  const r = renderer(), standard = renderer(true);
  const p = { state: "utah", city: "riverton", locale: "en" };
  const data = r.source("src/components/location/holiday/holiday-offers");
  const fields = offers => offers.map(({ title, price, description, action }) =>
    ({ title, price, description, action }));
  for (const getter of ["getHolidayOffers", "getHolidayPricingOffers"]) {
    const expected = fields(data[getter]("georgia", "buckhead"));
    expected[getter === "getHolidayOffers" ? 0 : 3].title = "Black Friday Great Eight";
    expected[getter === "getHolidayOffers" ? 0 : 3].description = "8 Recovery Services";
    if (getter === "getHolidayPricingOffers") {
      expected[0].description = "A Little Recharge";
      expected[1].description = "Self-Care Escape";
      expected[2].description = "Premium Retreat";
      expected[2].price = "$300";
      expected[5].title = "5 Pack Body Contouring";
      expected[5].price = undefined;
      expected[5].description = "50% OFF";
      expected.push(
        { title: "Core", price: "$99", description: "8 Recovery Services", action: "Buy Now" },
        { title: "Premier", price: "$150", description: "20 Recovery Services", action: "Buy Now" },
        { title: "Platinum", price: "$250", description: "30 Recovery Services, 1 CryoFacial, 1 Cryo Soothe", action: "Buy Now" },
      );
    }
    assert.deepEqual(fields(data[getter](p.state, p.city)), expected);
  }
  for (const file of [mainFile, pricingFile]) {
    const page = await r.render(file, p), before = await standard.render(file, p);
    assert.deepEqual(schema(page), schema(before));
    assert(page.text.includes("Zivel Riverton"));
    const offers = page.querySelector('section[aria-label="Holiday offers"]');
    const cards = offers.querySelectorAll("article");
    assert.equal(cards.length, file === mainFile ? 3 : 9);
    assert.deepEqual(offers.querySelectorAll(".groupHeading").map(heading => heading.text),
      file === mainFile ? [] : ["Gift Cards", "Service Specials", "Membership Specials"]);
    if (file === pricingFile) {
      assert.deepEqual(offers.querySelector(".offers").childNodes
        .filter(node => node.tagName).map(node => node.tagName),
        ["H2", "ARTICLE", "ARTICLE", "ARTICLE", "H2", "ARTICLE", "ARTICLE", "ARTICLE",
          "H2", "P", "ARTICLE", "ARTICLE", "ARTICLE"]);
      assert.equal(offers.querySelector(".groupDescription").text,
        '50% Off Membership 1st Month: Code "blackfriday" at checkout');
    }
    assert.equal(offers.querySelectorAll("button[disabled]").length, 0);
    assert.deepEqual(links(offers).filter(link => link.includes("clubready")),
      [
        "https://app.clubready.com/JoinUs/14841/636149",
        "https://app.clubready.com/JoinUs/14841/656959",
        ...(file === mainFile ? [] : [
        "https://app.clubready.com/JoinUs/14841/644442",
        "https://app.clubready.com/JoinUs/14841/649000",
        "https://app.clubready.com/JoinUs/14841/649001",
        "https://app.clubready.com/JoinUs/14841/649002",
        "https://app.clubready.com/JoinUs/14841/656908",
        "https://app.clubready.com/JoinUs/14841/656909",
        "https://app.clubready.com/JoinUs/14841/656910",
        ]),
      ].sort(), "Only Riverton’s supplied checkout links");
    const recovery = cards[file === mainFile ? 0 : 3];
    assert.equal(recovery.querySelector("h2").text, "Black Friday Great Eight");
    assert.equal(recovery.querySelector(".description").text, "8 Recovery Services");
    assert.equal(recovery.querySelector(".price").text, "$99");
    assert.equal(recovery.querySelector("a").getAttribute("href"),
      "https://app.clubready.com/JoinUs/14841/656959");
    assert(recovery.querySelector("a").text.includes("Buy Now"));
    const facial = cards[file === mainFile ? 1 : 4];
    assert.equal(facial.querySelector("a").getAttribute("href"),
      "https://app.clubready.com/JoinUs/14841/636149");
    assert(facial.querySelector("a").text.includes("Buy Now"));
    assert(!offers.text.includes("Zivel Buckhead"));
    assert.equal(offers.querySelector(".disclaimer").text, data.HOLIDAY_OFFER_DISCLAIMER);
    if (file === mainFile) {
      assert.equal(page.querySelector("#location-hero-title").text, "HOLIDAY SPECIALS");
      assert.equal(cards[2].querySelector("h2").text, "Gift Cards & More");
      assert.equal(cards[2].querySelector("a").getAttribute("href"), "/locations/utah/riverton/pricing");
      assert(page.text.includes("2722 W 12600 S #1, Riverton, UT 84065"));
      for (const link of links(before).filter(link => link.includes("clubready") || link.startsWith("tel:"))) {
        assert(links(page).includes(link), `Preserve Riverton booking/contact destination: ${link}`);
      }
      assert(links(page).some(link => link.includes("set_location=11445")));
      assert(page.text.includes("2026 Best of SLC Winner"));
    } else {
      const giftCards = [
        ["$50", "A Little Recharge", "2 Recovery Services", "656908"],
        ["$100", "Self-Care Escape", "4 Recovery Serices", "656909"],
        ["$300", "Premium Retreat", "2 Premium Serices", "656910"],
      ];
      giftCards.forEach(([price, description, additionalDescription, checkout], index) => {
        assert.equal(cards[index].querySelector(".price").text, price);
        assert.deepEqual(cards[index].querySelector(".descriptionCompact").querySelectorAll("span").map(span => span.text),
          [description, additionalDescription]);
        assert.equal(cards[index].querySelector("a").getAttribute("href"),
          `https://app.clubready.com/JoinUs/14841/${checkout}`);
        assert(cards[index].querySelector("a").text.includes("Buy Now"));
      });
      assert.equal(offers.querySelectorAll(".descriptionCompact").length, 4);
      assert.equal(page.querySelector("h1").text, "Holiday Specials, Pricing & Memberships");
      assert.equal(cards[5].querySelector("h2").text, "5 Pack Body Contouring");
      assert.equal(cards[5].querySelector(".price"), null);
      assert.deepEqual(cards[5].querySelector(".descriptionCompact").querySelectorAll("span").map(span => span.text),
        ["50% OFF", "use code blackfriday at checkout"]);
      assert.equal(cards[5].querySelector("a").getAttribute("href"),
        "https://app.clubready.com/JoinUs/14841/644442");
      assert.equal(cards[5].querySelector("img").getAttribute("src"),
        r.source("src/lib/data/location-service-images").getLocationServiceImage("riverton", "cryo-slimming"));
      [
        ["Core", "8 Recovery Services", "649002", "cryotherapy", "$99"],
        ["Premier", "20 Recovery Services", "649001", "red-light-therapy", "$150"],
        ["Platinum", "30 Recovery Services, 1 CryoFacial, 1 Cryo Soothe", "649000", "cryo-soothe", "$250"],
      ].forEach(([title, description, checkout, service, price], index) => {
        const card = cards[index + 6];
        assert.equal(card.querySelector("h2").text, title);
        assert.equal(card.querySelector(".description").text, description);
        assert.equal(card.querySelector(".price").text, price);
        assert.equal(card.querySelector("a").getAttribute("href"),
          `https://app.clubready.com/JoinUs/14841/${checkout}`);
        assert.equal(card.querySelector("img").getAttribute("src"),
          r.source("src/lib/data/location-service-images").getLocationServiceImage("riverton", service));
      });
      for (const id of ["memberships", "services", "packages"]) {
        assert.equal(page.querySelector(`#${id}`).innerHTML, before.querySelector(`#${id}`).innerHTML);
      }
      assert.deepEqual(page.querySelector('nav[aria-label="Pricing sections"]').querySelectorAll("a")
        .map(a => a.getAttribute("href")), ["#specials", "#memberships", "#services"]);
      assert(page.querySelector("#packages").hasAttribute("hidden"));
      assert(page.querySelector(".snowfall"));
    }
  }
  assert.deepEqual(r.gates, [{ citySlug: "riverton", bypass: true }]);
  const ungated = renderer();
  delete ungated.wrappers["@/components/location/PricingGateModal"];
  const pricing = await ungated.render(pricingFile, p);
  const memberships = pricing.querySelector("#memberships");
  assert(!memberships.text.includes("Elite"));
  assert(!memberships.text.includes("$175"));
  assert(memberships.text.includes("$59"));
  assert(memberships.text.includes("4 Recovery Sessions/Month"));
  assert(!memberships.text.includes("6 Recovery Sessions/Month"));
  assert(memberships.querySelector('a[href="https://app.clubready.com/JoinUs/14841/647045"]'));
  assert.equal(pricing.querySelector(".blur-xl"), null);
  assert.equal(pricing.querySelector("#pg-firstName"), null);
});

test("Bentonville matches Rogers offers without borrowing checkout links or changing regular data", async () => {
  const r = renderer(), standard = renderer(true);
  const p = { state: "arkansas", city: "bentonville", locale: "en" };
  const data = r.source("src/components/location/holiday/holiday-offers");
  const fields = offers => offers.map(({ title, price, description, action }) =>
    ({ title, price, description, action }));
  for (const getter of ["getHolidayOffers", "getHolidayPricingOffers"]) {
    assert.deepEqual(fields(data[getter](p.state, p.city)), fields(data[getter]("arkansas", "rogers")));
  }
  for (const file of [mainFile, pricingFile]) {
    const page = await r.render(file, p), before = await standard.render(file, p);
    assert.deepEqual(schema(page), schema(before));
    assert(page.text.includes("Zivel Bentonville"));
    const offers = page.querySelector('section[aria-label="Holiday offers"]');
    const cards = offers.querySelectorAll("article");
    assert.equal(cards.length, file === mainFile ? 3 : 6);
    assert.equal(offers.querySelectorAll("button[disabled]").length, 0);
    assert.deepEqual(links(offers).filter(link => link.includes("clubready")), [
      "https://app.clubready.com/JoinUs/14839/656925",
      ...(file === pricingFile ? ["https://app.clubready.com/JoinUs/14839/656927"] : []),
      "https://app.clubready.com/JoinUs/14839/656931",
      ...(file === pricingFile ? [
        "https://app.clubready.com/JoinUs/14839/656950",
        "https://app.clubready.com/JoinUs/14839/656951",
        "https://app.clubready.com/JoinUs/14839/656952",
      ] : []),
    ], "Only Bentonville’s supplied checkout links");
    const recovery = cards[file === mainFile ? 0 : 3];
    assert.equal(recovery.querySelector("a").getAttribute("href"),
      "https://app.clubready.com/JoinUs/14839/656931");
    assert(recovery.querySelector("a").text.includes("Buy Now"));
    const facial = cards[file === mainFile ? 1 : 4];
    assert.equal(facial.querySelector("a").getAttribute("href"),
      "https://app.clubready.com/JoinUs/14839/656925");
    assert(facial.querySelector("a").text.includes("Buy Now"));
    assert(!offers.text.includes("Zivel Rogers"));
    assert.equal(offers.querySelector(".disclaimer").text, data.HOLIDAY_OFFER_DISCLAIMER);
    if (file === mainFile) {
      assert.equal(page.querySelector("#location-hero-title").text, "HOLIDAY SPECIALS");
      assert.equal(cards[2].querySelector("a").getAttribute("href"),
        "/locations/arkansas/bentonville/pricing");
      for (const link of links(before).filter(link => link.includes("clubready") || link.startsWith("tel:"))) {
        assert(links(page).includes(link), `Preserve Bentonville booking/contact destination: ${link}`);
      }
    } else {
      for (const [index, amount, checkout] of [[0, 50, "656950"], [1, 100, "656951"], [2, 200, "656952"]]) {
        assert.equal(cards[index].querySelector(".price").text, `$${amount}`);
        assert.equal(cards[index].querySelector("a").getAttribute("href"),
          `https://app.clubready.com/JoinUs/14839/${checkout}`);
        assert(cards[index].querySelector("a").text.includes("Buy Now"));
      }
      assert.equal(page.querySelector("h1").text, "Holiday Specials, Pricing & Memberships");
      assert.equal(cards[5].querySelector("h2").text, "BOGO BODY CONTOURING");
      assert.equal(cards[5].querySelector(".price").text, "$350");
      assert.equal(cards[5].querySelector("a").getAttribute("href"),
        "https://app.clubready.com/JoinUs/14839/656927");
      assert(cards[5].querySelector("a").text.includes("Buy Now"));
      assert.equal(cards[5].querySelector("img").getAttribute("src"),
        r.source("src/lib/data/location-service-images").getLocationServiceImage("bentonville", "cryo-slimming"));
      for (const id of ["memberships", "services", "packages"]) {
        assert.equal(page.querySelector(`#${id}`).innerHTML, before.querySelector(`#${id}`).innerHTML);
      }
      assert.deepEqual(page.querySelector('nav[aria-label="Pricing sections"]').querySelectorAll("a")
        .map(a => a.getAttribute("href")), ["#specials", "#memberships", "#services", "#packages"]);
      assert(page.querySelector(".snowfall"));
    }
  }
  assert.deepEqual(r.gates, [{ citySlug: "bentonville", bypass: true }]);
  const ungated = renderer();
  delete ungated.wrappers["@/components/location/PricingGateModal"];
  const pricing = await ungated.render(pricingFile, p);
  assert.equal(pricing.querySelector(".blur-xl"), null);
  assert.equal(pricing.querySelector("#pg-firstName"), null);
});

test("Rogers uses Buckhead offers with pending checkout links and preserves studio data", async () => {
  const r = renderer(), standard = renderer(true);
  const p = { state: "arkansas", city: "rogers", locale: "en" };
  const data = r.source("src/components/location/holiday/holiday-offers");
  const fields = offers => offers.map(({ title, price, description, action }) =>
    ({ title, price, description, action }));
  for (const getter of ["getHolidayOffers", "getHolidayPricingOffers"]) {
    const expected = fields(data[getter]("georgia", "buckhead"));
    if (getter === "getHolidayPricingOffers") {
      expected[5].title = "BOGO BODY CONTOURING";
      expected[5].price = "$350";
    }
    assert.deepEqual(fields(data[getter](p.state, p.city)), expected);
  }
  for (const file of [mainFile, pricingFile]) {
    const page = await r.render(file, p), before = await standard.render(file, p);
    assert.deepEqual(schema(page), schema(before));
    assert(page.text.includes("Zivel Rogers"));
    const offers = page.querySelector('section[aria-label="Holiday offers"]');
    assert.equal(offers.querySelectorAll("article").length, file === mainFile ? 3 : 6);
    assert.equal(offers.querySelector(".disclaimer").text, data.HOLIDAY_OFFER_DISCLAIMER);
    assert.deepEqual(links(offers).filter(link => link.includes("clubready")),
      ["https://app.clubready.com/JoinUs/14838/656933",
        "https://app.clubready.com/JoinUs/14838/656934",
        ...(file === pricingFile ? ["https://app.clubready.com/JoinUs/14838/656935",
          "https://app.clubready.com/JoinUs/14838/656945",
          "https://app.clubready.com/JoinUs/14838/656947",
          "https://app.clubready.com/JoinUs/14838/656948"] : [])],
      "Only Rogers’ supplied checkout URLs");
    const recovery = offers.querySelectorAll("article")[file === mainFile ? 0 : 3];
    assert.equal(recovery.querySelector("a").getAttribute("href"),
      "https://app.clubready.com/JoinUs/14838/656933");
    assert(recovery.querySelector("a").text.includes("Buy Now"));
    const facial = offers.querySelectorAll("article")[file === mainFile ? 1 : 4];
    assert.equal(facial.querySelector("a").getAttribute("href"),
      "https://app.clubready.com/JoinUs/14838/656934");
    assert(facial.querySelector("a").text.includes("Buy Now"));
    assert(!offers.text.includes("Buckhead") && !offers.text.includes("Parker"));
    if (file === mainFile) {
      assert.equal(page.querySelector("#location-hero-title").text, "HOLIDAY SPECIALS");
      assert.equal(offers.querySelectorAll("button[disabled]").length, 0);
      assert(offers.querySelector('a[href="/locations/arkansas/rogers/pricing"]'));
      for (const link of links(before).filter(link => link.includes("clubready") || link.startsWith("tel:"))) {
        assert(links(page).includes(link), `Preserve Rogers contact / booking destination: ${link}`);
      }
    } else {
      assert.equal(offers.querySelectorAll("button[disabled]").length, 0);
      const gift50 = offers.querySelectorAll("article")[0];
      assert.equal(gift50.querySelector(".price").text, "$50");
      assert.equal(gift50.querySelector("a").getAttribute("href"),
        "https://app.clubready.com/JoinUs/14838/656945");
      assert(gift50.querySelector("a").text.includes("Buy Now"));
      const gift100 = offers.querySelectorAll("article")[1];
      assert.equal(gift100.querySelector(".price").text, "$100");
      assert.equal(gift100.querySelector("a").getAttribute("href"),
        "https://app.clubready.com/JoinUs/14838/656947");
      assert(gift100.querySelector("a").text.includes("Buy Now"));
      const gift200 = offers.querySelectorAll("article")[2];
      assert.equal(gift200.querySelector(".price").text, "$200");
      assert.equal(gift200.querySelector("a").getAttribute("href"),
        "https://app.clubready.com/JoinUs/14838/656948");
      assert(gift200.querySelector("a").text.includes("Buy Now"));
      const contouring = offers.querySelectorAll("article")[5];
      assert.equal(contouring.querySelector("h2").text, "BOGO BODY CONTOURING");
      assert.equal(contouring.querySelector(".price").text, "$350");
      assert.equal(contouring.querySelector("img").getAttribute("src"),
        r.source("src/lib/data/location-service-images").getLocationServiceImage("rogers", "cryo-slimming"));
      assert.equal(contouring.querySelector("a").getAttribute("href"),
        "https://app.clubready.com/JoinUs/14838/656935");
      assert.equal(page.querySelector("h1").text, "Holiday Specials, Pricing & Memberships");
      assert(page.querySelector(".snowfall"));
      for (const id of ["memberships", "services", "packages"]) {
        assert.equal(page.querySelector(`#${id}`).innerHTML, before.querySelector(`#${id}`).innerHTML);
      }
      assert.deepEqual(page.querySelector('nav[aria-label="Pricing sections"]').querySelectorAll("a")
        .map(a => a.getAttribute("href")), ["#specials", "#memberships", "#services", "#packages"]);
    }
  }
  assert.deepEqual(r.gates, [{ citySlug: "rogers", bypass: true }]);
  const ungated = renderer();
  delete ungated.wrappers["@/components/location/PricingGateModal"];
  const pricing = await ungated.render(pricingFile, p);
  assert.equal(pricing.querySelector(".blur-xl"), null);
  assert.equal(pricing.querySelector("#pg-firstName"), null);
});

test("Parker shows approved custom holiday offers and checkout links while preserving regular data", async () => {
  const r = renderer(), standard = renderer(true);
  const p = { state: "colorado", city: "parker", locale: "en" };
  const data = r.source("src/components/location/holiday/holiday-offers");
  const fields = offers => offers.map(({ title, price, description, action }) =>
    ({ title, price, description, action }));
  for (const getter of ["getHolidayOffers", "getHolidayPricingOffers"]) {
    const expected = fields(data[getter]("georgia", "buckhead"));
    expected[getter === "getHolidayOffers" ? 0 : 3] = {
      title: "BOGO DAY PASS", price: "$69", description: "3 Recovery Services/Day Pass", action: "Buy Now",
    };
    expected[getter === "getHolidayOffers" ? 1 : 4].price = "$179";
    expected[getter === "getHolidayOffers" ? 1 : 4].title = "BOGO Cryo Facial";
    if (getter === "getHolidayPricingOffers") {
      expected[5].title = "BOGO Cryo Slimming/Toning";
      expected[5].price = "$350";
      expected[5].description = "Buy One Get/Give One";
      expected.push({
        title: "BOGO SOOTHE", price: "$50", description: "Buy One Get/Give One", action: "Buy Now",
      }, {
        title: "Recovery Pack", price: "$179", description: "10 Recovery Sessions", action: "Buy Now",
      });
    }
    assert.deepEqual(fields(data[getter](p.state, p.city)), expected);
  }
  for (const file of [mainFile, pricingFile]) {
    const page = await r.render(file, p), before = await standard.render(file, p);
    assert.deepEqual(schema(page), schema(before));
    assert(page.text.includes("Zivel Parker"));
    assert(!page.text.includes("Zivel Buckhead") && !page.text.includes("Zivel Coral Gables"));
    assert(!links(page).some(link => /\/(14900|14828)\//.test(link)));
    const offers = page.querySelector('section[aria-label="Holiday offers"]');
    const cards = offers.querySelectorAll("article");
    assert.equal(cards.length, file === mainFile ? 3 : 8);
    assert(!offers.text.includes("All Access"));
    assert(!offers.text.includes("Unlimited Recovery Membership"));
    assert(!links(page).includes("https://app.clubready.com/JoinUs/15044/656932"));
    assert.equal(offers.querySelectorAll("button[disabled]").length, 0);
    assert.equal(offers.querySelector(".disclaimer").text, data.HOLIDAY_OFFER_DISCLAIMER);
    const facial = cards[file === mainFile ? 1 : 4];
    assert.equal(facial.querySelector("h2").text, "BOGO Cryo Facial");
    assert(!offers.text.includes("Double Chin"));
    assert.equal(facial.querySelector(".price").text, "$179");
    assert.equal(facial.querySelector("a").getAttribute("href"),
      "https://app.clubready.com/JoinUs/15044/656922");
    assert(facial.querySelector("a").text.includes("Buy Now"));
    const recovery = cards[file === mainFile ? 0 : 3];
    assert.equal(recovery.querySelector("h2").text, "BOGO DAY PASS");
    assert.equal(recovery.querySelector(".price").text, "$69");
    assert.equal(recovery.querySelector(".description").text, "3 Recovery Services/Day Pass");
    assert.equal(recovery.querySelector("a").getAttribute("href"),
      "https://app.clubready.com/JoinUs/15044/656923");
    assert(!offers.text.includes("6 Pack Recovery"));
    assert.equal(recovery.querySelector("img").getAttribute("src"),
      r.source("src/lib/data/location-service-images").getLocationServiceImage("parker", "red-light-therapy"));
    if (file === mainFile) {
      assert.equal(page.querySelector("#location-hero-title").text, "HOLIDAY SPECIALS");
      assert.equal(cards[2].querySelector("a").getAttribute("href"), "/locations/colorado/parker/pricing");
      assert.equal(cards[2].querySelector("h2").text, "Gift Cards & More");
      assert(links(page).some(link => link.includes("set_location=11680")));
      assert(page.text.includes("(720) 366-3622"));
    } else {
      assert.equal(cards[0].querySelector("a").getAttribute("href"),
        "https://app.clubready.com/JoinUs/15044/656874");
      assert(cards[0].querySelector("a").text.includes("Buy Now"));
      assert.equal(cards[1].querySelector("a").getAttribute("href"),
        "https://app.clubready.com/JoinUs/15044/656917");
      assert(cards[1].querySelector("a").text.includes("Buy Now"));
      assert.equal(cards[2].querySelector("a").getAttribute("href"),
        "https://app.clubready.com/JoinUs/15044/656918");
      assert(cards[2].querySelector("a").text.includes("Buy Now"));
      assert.equal(cards[5].querySelector("h2").text, "BOGO Cryo Slimming/Toning");
      assert.equal(cards[5].querySelector(".price").text, "$350");
      assert.equal(cards[5].querySelector(".description").text, "Buy One Get/Give One");
      assert.equal(cards[5].querySelector("img").getAttribute("src"),
        r.source("src/lib/data/location-service-images").getLocationServiceImage("parker", "cryo-slimming"));
      assert.equal(cards[5].querySelector("a").getAttribute("href"),
        "https://app.clubready.com/JoinUs/15044/656924");
      assert(!offers.text.includes("BOGO Recovery"));
      assert.equal(cards[6].querySelector("h2").text, "BOGO SOOTHE");
      assert.equal(cards[7].querySelector("h2").text, "Recovery Pack");
      assert.equal(cards[7].querySelector(".price").text, "$179");
      assert.equal(cards[7].querySelector(".description").text, "10 Recovery Sessions");
      assert.equal(cards[7].querySelector("a").getAttribute("href"),
        "https://app.clubready.com/JoinUs/15044/657188");
      assert.equal(cards[6].querySelector(".price").text, "$50");
      assert.equal(cards[6].querySelector(".description").text, "Buy One Get/Give One");
      assert.equal(cards[6].querySelector("img").getAttribute("src"),
        r.source("src/lib/data/location-service-images").getLocationServiceImage("parker", "cryo-soothe"));
      assert.equal(cards[6].querySelector("a").getAttribute("href"),
        "https://app.clubready.com/JoinUs/15044/656928");
      for (const id of ["memberships", "services", "packages"]) {
        assert.equal(page.querySelector(`#${id}`).innerHTML, before.querySelector(`#${id}`).innerHTML);
      }
      assert(page.querySelector('nav[aria-label="Breadcrumb"]').text.includes("Parker"));
      assert(page.querySelector('#memberships a[href="https://app.clubready.com/JoinUs/15044/648247"]'));
      assert(page.querySelector('#memberships a[href="https://app.clubready.com/JoinUs/15044/648250"]'));
      assert(page.querySelector(".snowfall"));
      assert.deepEqual(page.querySelector('nav[aria-label="Pricing sections"]').querySelectorAll("a")
        .map(a => a.getAttribute("href")), ["#specials", "#memberships", "#services", "#packages"]);
    }
  }
  assert.deepEqual(r.gates, [{ citySlug: "parker", bypass: true }]);
  const ungated = renderer();
  delete ungated.wrappers["@/components/location/PricingGateModal"];
  const pricing = await ungated.render(pricingFile, p);
  assert.equal(pricing.querySelector(".blur-xl"), null);
  assert.equal(pricing.querySelector("#pg-firstName"), null);
});

test("Coral Gables uses identical offers without Buckhead checkout links and preserves its studio data", async () => {
  const r = renderer(), standard = renderer(true);
  const p = { state: "florida", city: "coral-gables", locale: "en" };
  const offersData = r.source("src/components/location/holiday/holiday-offers");
  const fields = offers => offers.map(({ title, price, description, action }) =>
    ({ title, price, description, action }));
  assert.deepEqual(fields(offersData.getHolidayOffers(p.state, p.city)),
    fields(offersData.getHolidayOffers("georgia", "buckhead")));
  assert.deepEqual(fields(offersData.getHolidayPricingOffers(p.state, p.city)),
    fields(offersData.getHolidayPricingOffers("georgia", "buckhead")));
  for (const file of [mainFile, pricingFile]) {
    const page = await r.render(file, p), before = await standard.render(file, p);
    assert.deepEqual(schema(page), schema(before));
    assert(page.text.includes("Zivel Coral Gables"));
    assert(!page.text.includes("Zivel Buckhead"));
    assert(!links(page).some(link => link.includes("/14900/") || link.includes("/georgia/buckhead")));
    const offers = page.querySelector('section[aria-label="Holiday offers"]');
    assert.equal(offers.querySelectorAll("article").length, file === mainFile ? 3 : 6);
    assert.equal(offers.querySelectorAll("button[disabled]").length, 0);
    const cards = offers.querySelectorAll("article");
    const facial = cards[file === mainFile ? 1 : 4];
    assert.equal(facial.querySelector("a").getAttribute("href"),
      "https://app.clubready.com/JoinUs/14828/656920");
    assert(facial.querySelector("a").text.includes("Buy Now"));
    const recovery = cards[file === mainFile ? 0 : 3];
    assert.equal(recovery.querySelector("a").getAttribute("href"),
      "https://app.clubready.com/JoinUs/14828/656921");
    assert(recovery.querySelector("a").text.includes("Buy Now"));
    assert.equal(recovery.querySelector("img").getAttribute("src"),
      "/locations/coral-gables/services/red-light-therapy.jpg");
    assert(recovery.querySelector("img").getAttribute("style").includes("center top"));
    assert.equal(offers.querySelector(".disclaimer").text, offersData.HOLIDAY_OFFER_DISCLAIMER);
    if (file === mainFile) {
      assert.equal(cards[2].querySelector("a").getAttribute("href"), "/locations/florida/coral-gables/pricing");
      assert.equal(cards[2].querySelector("h2").text, "Gift Cards & More");
      const beforeLinks = links(before).filter(link => link.includes("clubready") || link.startsWith("tel:"));
      assert(beforeLinks.length > 0);
      for (const link of beforeLinks) assert(links(page).includes(link));
    } else {
      assert.equal(cards[0].querySelector("a").getAttribute("href"),
        "https://app.clubready.com/JoinUs/14828/644802");
      assert(cards[0].querySelector("a").text.includes("Buy Now"));
      assert.equal(cards[1].querySelector("a").getAttribute("href"),
        "https://app.clubready.com/JoinUs/14828/644803");
      assert(cards[1].querySelector("a").text.includes("Buy Now"));
      assert.equal(cards[2].querySelector("a").getAttribute("href"),
        "https://app.clubready.com/JoinUs/14828/644804");
      assert(cards[2].querySelector("a").text.includes("Buy Now"));
      assert.equal(cards[5].querySelector("a").getAttribute("href"),
        "https://app.clubready.com/JoinUs/14828/656919");
      assert(cards[5].querySelector("a").text.includes("Buy Now"));
      for (const id of ["memberships", "services", "packages"]) {
        assert.equal(page.querySelector(`#${id}`).innerHTML, before.querySelector(`#${id}`).innerHTML);
      }
      assert.equal(page.querySelector(".blur-xl"), null);
      assert(page.querySelector(".snowfall"));
      assert.deepEqual(page.querySelector('nav[aria-label="Pricing sections"]').querySelectorAll("a")
        .map(a => a.getAttribute("href")), ["#specials", "#memberships", "#services", "#packages"]);
    }
  }
  assert.deepEqual(r.gates, [{ citySlug: "coral-gables", bypass: true }]);
});

test("Buckhead main retains schema, services, and booking identity with the supplied offer", async () => {
  const r = renderer(), standard = renderer(true);
  const page = await r.render(mainFile, params);
  const before = await standard.render(mainFile, params);
  assert.equal(page.querySelector("#location-hero-title").text, "HOLIDAY SPECIALS");
  assert(page.text.includes("Zivel Buckhead"));
  const offer = page.querySelector('section[aria-label="Holiday offers"]');
  assert.equal(offer.querySelectorAll("article").length, 3);
  const giftCard = offer.querySelectorAll("article")[2];
  assert.equal(giftCard.querySelector("h2").text, "Gift Cards & More");
  assert.equal(giftCard.querySelector(".price").text, "$50+");
  assert(giftCard.querySelector("a").text.includes("Gift Cards & More"));
  assert.equal(giftCard.querySelector(".description").text, "Give the Gift of Feeling Better");
  assert.equal(giftCard.querySelector("img").getAttribute("src"), "/locations/highlands-ranch/services/infrared-sauna.jpg");
  assert.equal(giftCard.querySelector("a").getAttribute("href"), "/locations/georgia/buckhead/pricing");
  assert.equal(offer.querySelector("h2").text, "6 Pack Recovery");
  assert.equal(offer.querySelector(".price").text, "$99");
  assert.equal(offer.querySelector(".description").text, "6 Recovery Services in 1 Month");
  assert.equal(offer.querySelector("a").getAttribute("href"),
    "https://app.clubready.com/JoinUs/14900/656882");
  assert.equal(offer.querySelector("img").getAttribute("src"),
    r.source("src/lib/data/location-service-images").getLocationServiceImage("buckhead", "red-light-therapy"));
  const facial = offer.querySelectorAll("article")[1];
  assert.equal(facial.querySelector("h2").text, "BOGO Cryo Facial/Double Chin");
  assert.equal(facial.querySelector(".price").text, "$150");
  assert.equal(facial.querySelector(".description").text, "Buy One Get/Give One");
  assert.equal(facial.querySelector("a").getAttribute("href"), "https://app.clubready.com/JoinUs/14900/656883");
  assert.equal(facial.querySelector("img").getAttribute("src"),
    r.source("src/lib/data/location-service-images").getLocationServiceImage("buckhead", "cryo-lift-facial"));
  assert.equal(offer.querySelector(".disclaimer").text,
    r.source("src/components/location/holiday/holiday-offers").HOLIDAY_OFFER_DISCLAIMER);
  assert(links(page).includes("/locations/georgia/buckhead/pricing"));
  assert.deepEqual(schema(page), schema(before), "Live structured data is unchanged");
  const serviceImages = doc => {
    const offerImages = new Set(doc.querySelectorAll('section[aria-label="Holiday offers"] img'));
    return doc.querySelectorAll("img").filter(img => !offerImages.has(img) &&
      (img.getAttribute("src").includes("/services/") || img.getAttribute("src").includes("/service-")))
      .map(img => [img.getAttribute("src"), img.getAttribute("alt")]);
  };
  assert.deepEqual(serviceImages(page), serviceImages(before));
  assert(links(page).some(link => link.includes("set_location=11537")));
  assert(!links(page).some(link => link.includes("11433")));
  assert(!page.text.includes("HOLLYWOOD"));
  assert(!page.text.includes("STOCKING STUFFERS"));
  assert(!links(page).some(link => link.includes("/locations/florida/hollywood")));
});

test("Buckhead pricing opens the gate temporarily and keeps regular prices and purchase links", async () => {
  const r = renderer(), standard = renderer(true);
  const page = await r.render(pricingFile, params);
  const before = await standard.render(pricingFile, params);
  assert.equal(page.querySelector("h1").text, "Holiday Specials, Pricing & Memberships");
  assert(page.querySelector('nav[aria-label="Breadcrumb"]').text.includes("Buckhead"));
  assert(!page.querySelector('nav[aria-label="Breadcrumb"]').text.includes("Atlanta"));
  assert.deepEqual(schema(page), schema(before));
  const regularLinks = doc => {
    const specialLinks = new Set(doc.querySelectorAll("#specials a"));
    return doc.querySelectorAll("a").filter(a => !specialLinks.has(a)).map(a => a.getAttribute("href")).sort();
  };
  assert.deepEqual(regularLinks(page), regularLinks(before), "Regular pricing destinations remain unchanged");
  for (const id of ["memberships", "services", "packages"]) {
    assert.equal(page.querySelector(`#${id}`).innerHTML, before.querySelector(`#${id}`).innerHTML);
  }
  const offer = page.querySelector("#specials");
  const cards = offer.querySelectorAll("article");
  assert.equal(cards.length, 6);
  assert.deepEqual(cards.map(card => card.querySelector("h2").text),
    ["Gift Card", "Gift Card", "Gift Card", "6 Pack Recovery", "BOGO Cryo Facial/Double Chin", "BOGO Recovery"]);
  assert.deepEqual(cards.map(card => card.querySelector(".price").text), ["$50", "$100", "$200", "$99", "$150", "$50"]);
  const giftCard = cards[0];
  assert.equal(giftCard.querySelector(".description").text, "Give the Gift of Feeling Better");
  assert.equal(giftCard.querySelector("a").getAttribute("href"), "https://app.clubready.com/JoinUs/14900/656879");
  assert.equal(new Set(cards.slice(0, 3).map(card => card.querySelector("img").getAttribute("src"))).size, 3);
  assert.equal(cards[1].querySelector("a").getAttribute("href"), "https://app.clubready.com/JoinUs/14900/656885");
  assert.equal(cards[2].querySelector("a").getAttribute("href"), "https://app.clubready.com/JoinUs/14900/656886");
  assert.equal(cards[2].querySelector("img").getAttribute("src"), "/images/home/service-slimming.jpg");
  assert.equal(cards[5].querySelector("a").getAttribute("href"), "https://app.clubready.com/JoinUs/14900/656887");
  assert.equal(offer.querySelectorAll("button[disabled]").length, 0);
  const facial = cards[4];
  assert.equal(facial.querySelector("h2").text, "BOGO Cryo Facial/Double Chin");
  assert.equal(facial.querySelector(".price").text, "$150");
  assert.equal(facial.querySelector(".description").text, "Buy One Get/Give One");
  assert.equal(facial.querySelector("a").getAttribute("href"), "https://app.clubready.com/JoinUs/14900/656883");
  assert.equal(cards[3].querySelector("a").getAttribute("href"), "https://app.clubready.com/JoinUs/14900/656882");
  assert.equal(cards[3].querySelector(".description").text, "6 Recovery Services in 1 Month");
  assert.equal(offer.querySelector(".disclaimer").text,
    r.source("src/components/location/holiday/holiday-offers").HOLIDAY_OFFER_DISCLAIMER);
  assert.deepEqual(page.querySelector('nav[aria-label="Pricing sections"]').querySelectorAll("a")
    .map(a => a.getAttribute("href")), ["#specials", "#memberships", "#services", "#packages"]);
  assert(page.querySelectorAll("[id]").indexOf(page.querySelector("#specials")) <
    page.querySelectorAll("[id]").indexOf(page.querySelector("#memberships")));
  assert.deepEqual(r.gates, [{ citySlug: "buckhead", bypass: true }]);
  assert(page.querySelector(".snowfall"));
});

test("holiday pricing is visibly ungated without stored signup state and the gate can be restored", async () => {
  const r = renderer();
  delete r.wrappers["@/components/location/PricingGateModal"];
  const page = await r.render(pricingFile, params);
  assert.equal(page.querySelector(".blur-xl"), null);
  assert.equal(page.querySelector("#pg-firstName"), null);
  assert(page.querySelector('#specials a[href="https://app.clubready.com/JoinUs/14900/656882"]'));
  assert(page.querySelector("#memberships"));
  const restored = renderer();
  const { isHolidayLocation } = restored.source("src/components/location/holiday/holiday-location-config");
  restored.wrappers["@/components/location/holiday/holiday-location-config"] = {
    isHolidayLocation, HOLIDAY_PRICING_SIGNUP_PAUSED: false,
  };
  await restored.render(pricingFile, params);
  assert.deepEqual(restored.gates, [{ citySlug: "buckhead", bypass: false }]);
});

test("seasonal decoration remains non-interactive and respects reduced motion", () => {
  for (const file of ["HolidayLocation.module.css", "HolidayPricingPresentation.module.css"]) {
    const css = fs.readFileSync(`src/components/location/holiday/${file}`, "utf8");
    assert.match(css, /prefers-reduced-motion: reduce/);
    assert.match(css, /animation: none/);
    assert.match(css, /pointer-events: none/);
  }
});
