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

test("only the five approved studios are holiday-enabled; other studios stay standard", async () => {
  const r = renderer(), standard = renderer(true);
  const { locations } = r.source("src/lib/data/locations");
  const config = r.source("src/components/location/holiday/holiday-location-config");
  for (const location of locations) {
    const enabled = (location.stateSlug === "georgia" && location.citySlug === "buckhead") ||
      (location.stateSlug === "florida" && location.citySlug === "coral-gables") ||
      (location.stateSlug === "colorado" && location.citySlug === "parker") ||
      (location.stateSlug === "arkansas" && ["rogers", "bentonville"].includes(location.citySlug));
    assert.equal(config.isHolidayLocation(location.stateSlug, location.citySlug), enabled);
    if (enabled) continue;
    for (const file of [mainFile, pricingFile]) {
      const p = { state: location.stateSlug, city: location.citySlug, locale: "en" };
      assert.equal((await r.render(file, p)).toString(), (await standard.render(file, p)).toString(),
        `${location.name}: holiday switch cannot alter this route`);
    }
  }
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
      });
      expected.push({
        title: "All Access", price: "$179", description: "Unlimited Recovery Membership", action: "Buy Now",
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
      assert.equal(cards[6].querySelector(".price").text, "$50");
      assert.equal(cards[6].querySelector(".description").text, "Buy One Get/Give One");
      assert.equal(cards[6].querySelector("img").getAttribute("src"),
        r.source("src/lib/data/location-service-images").getLocationServiceImage("parker", "cryo-soothe"));
      assert.equal(cards[6].querySelector("a").getAttribute("href"),
        "https://app.clubready.com/JoinUs/15044/656928");
      assert.equal(cards[7].querySelector("h2").text, "All Access");
      assert.equal(cards[7].querySelector(".price").text, "$179");
      assert.deepEqual(cards[7].querySelector(".description").querySelectorAll("span").map(span => span.text),
        ["Unlimited Recovery Membership", "FREE Day Pass"]);
      assert(cards[7].querySelector(".descriptionCompact"));
      assert.equal(offers.querySelectorAll(".descriptionCompact").length, 1,
        "Only All Access gets smaller description text");
      assert.equal(cards[7].querySelector("img").getAttribute("src"),
        r.source("src/lib/data/location-service-images").getLocationServiceImage("parker", "cryotherapy"));
      assert.equal(cards[7].querySelector("a").getAttribute("href"),
        "https://app.clubready.com/JoinUs/15044/656932");
      assert(cards[7].querySelector("a").text.includes("Buy Now"));
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
