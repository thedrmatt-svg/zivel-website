const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const fontFromBuffer = require("next/dist/compiled/@next/font/dist/fontkit").default;
const root = path.resolve(__dirname, "..");

test("campaign bundles valid licensed variable fonts with its original weight ranges", () => {
  for (const [file, family, min, max, license] of [
    ["montserrat-latin-variable.woff2", "Montserrat", 500, 900, "Montserrat-OFL.txt"],
    ["dm-sans-latin-variable.woff2", "DM Sans", 100, 1000, "DM-Sans-OFL.txt"],
  ]) {
    const data = fs.readFileSync(path.join(root, "src/assets/fonts/att", file));
    assert.equal(data.subarray(0, 4).toString(), "wOF2");
    const font = fontFromBuffer(data);
    assert(font.familyName.startsWith(family));
    assert(font.variationAxes.wght.min <= min);
    assert(font.variationAxes.wght.max >= max);
    for (const character of "TRAIN HARD. RECOVER SMART. (404) 309–5954") {
      assert(font.hasGlyphForCodePoint(character.codePointAt(0)), `${file}: ${character}`);
    }
    assert.match(fs.readFileSync(path.join(root, "src/assets/fonts/att", license), "utf8"), /SIL OPEN FONT LICENSE Version 1\.1/);
  }
});

test("shared ATT/Buckhead layout uses local fonts without changing consent, analytics or noindex", () => {
  const layout = fs.readFileSync(path.join(root, "src/app/ads/american-top-team-sandy-springs/layout.tsx"), "utf8");
  assert(layout.includes('from "next/font/local"'));
  assert(!layout.includes("next/font/google"));
  for (const value of ["--font-att", "--font-att-body", 'display: "swap"', 'weight: "500 900"', 'weight: "100 1000"', "index: false", "follow: false", "<Analytics />", "<CookieConsent />"]) {
    assert(layout.includes(value), value);
  }
  assert(!layout.includes("GTM-"));
  assert(fs.readFileSync(path.join(root, "src/app/ads/buckhead/fighter/layout.tsx"), "utf8").includes('from "../../american-top-team-sandy-springs/layout"'));
});

test("FanX bundles all five original Barlow Condensed weights with its font license", () => {
  for (const weight of [500, 600, 700, 800, 900]) {
    const data = fs.readFileSync(path.join(root, `src/assets/fonts/fanx/barlow-condensed-latin-${weight}.woff2`));
    assert.equal(data.subarray(0, 4).toString(), "wOF2");
    const font = fontFromBuffer(data);
    assert(font.familyName.startsWith("Barlow Condensed"));
    assert.equal(font["OS/2"].usWeightClass, weight);
  }
  assert.match(fs.readFileSync(path.join(root, "src/assets/fonts/fanx/Barlow-Condensed-OFL.txt"), "utf8"), /SIL OPEN FONT LICENSE Version 1\.1/);
});

test("matching campaign and thank-you layouts retain tracking scope and share local font files", () => {
  for (const route of ["american-top-team-sandy-springs-thank-you", "fanx", "fanx-thank-you"]) {
    const layout = fs.readFileSync(path.join(root, `src/app/ads/${route}/layout.tsx`), "utf8");
    assert(layout.includes('from "next/font/local"'));
    assert(!layout.includes("next/font/google"));
    assert(layout.includes("dm-sans-latin-variable.woff2"));
    assert(layout.includes("index: false"));
    assert(layout.includes("<Analytics />"));
    if (route.startsWith("fanx")) {
      for (const weight of [500, 600, 700, 800, 900]) assert(layout.includes(`barlow-condensed-latin-${weight}.woff2`));
      assert(layout.includes("<CampaignGoogleTagManagerHead consentRequired />"));
      assert(layout.includes("<CookieConsent />"));
    } else {
      assert(!layout.includes("GoogleTagManager"));
      assert(!layout.includes("GTM-"));
    }
  }
});
