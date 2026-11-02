const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const { test } = require("node:test");
const ts = require("typescript");

const cache = new Map();
function load(base) {
  const filename = [base, `${base}.ts`].find(f => fs.existsSync(f) && fs.statSync(f).isFile());
  assert.ok(filename, `Missing ${base}`);
  if (cache.has(filename)) return cache.get(filename).exports;
  const mod = new Module(filename, module);
  mod.paths = Module._nodeModulePaths(path.dirname(filename));
  const nativeRequire = Module.createRequire(filename);
  mod.require = id => id.startsWith("@/")
    ? load(path.resolve("src", id.slice(2)))
    : nativeRequire(id);
  cache.set(filename, mod);
  mod._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText, filename);
  return mod.exports;
}

const { parseSchemaTime, buildOpeningHoursSpec, getLocationBusinessDetails } =
  load(path.resolve("src/lib/location-business-schema"));
const { locations, getLocationByPath } = load(path.resolve("src/lib/data/locations"));

test("time parsing preserves minutes, noon, midnight and 24-hour times", () => {
  for (const [input, expected] of [
    ["8:30am", "08:30"], ["6:30pm", "18:30"], [" 8:30 AM ", "08:30"],
    ["4:30pm", "16:30"], ["12am", "00:00"], ["12pm", "12:00"],
    ["12:15am", "00:15"], ["12:45pm", "12:45"], ["9am", "09:00"],
    ["18:30", "18:30"], ["8:30", "08:30"],
  ]) assert.equal(parseSchemaTime(input), expected, input);
  for (const invalid of ["Closed", "13pm", "8:75am", "25:00", "appointment", ""]) {
    assert.equal(parseSchemaTime(invalid), null, invalid);
  }
});

test("closed days are explicit; malformed hours never silently become closed days", () => {
  assert.deepEqual(buildOpeningHoursSpec({ sunday: "Closed" }), [{
    "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "00:00", closes: "00:00",
  }]);
  assert.deepEqual(buildOpeningHoursSpec(undefined), []);
  assert.throws(() => buildOpeningHoursSpec({ monday: "8:75am – 6pm" }), /Invalid Monday/);
  assert.equal(buildOpeningHoursSpec({ monday: "8:30am—6:30pm" })[0].opens, "08:30");
});

test("Riverton ZIP comes from the address end, not the numbered street", () => {
  const details = getLocationBusinessDetails(getLocationByPath("utah", "riverton"));
  assert.equal(details.address.streetAddress, "2722 W 12600 S #1");
  assert.equal(details.address.postalCode, "84065");
  assert.equal(details.address.addressLocality, "Riverton");
  const extended = getLocationBusinessDetails({
    ...getLocationByPath("utah", "riverton"),
    contact: { address: "12345 Main St, Suite 100, Riverton, UT 84065-1234" },
  });
  assert.equal(extended.address.streetAddress, "12345 Main St, Suite 100");
  assert.equal(extended.address.postalCode, "84065-1234");
});

test("Hollywood identity and Briargate locality/hours are shared by both page templates", () => {
  assert.equal(getLocationBusinessDetails(getLocationByPath("florida", "hollywood")).name, "Zivel - Hollywood");
  const details = getLocationBusinessDetails(getLocationByPath("colorado", "briargate"));
  assert.equal(details.address.addressLocality, "Colorado Springs");
  assert.equal(details.address.postalCode, "80920");
  for (const day of details.openingHoursSpecification.slice(0, 5)) {
    assert.equal(day.opens, "08:30");
    assert.equal(day.closes, "18:30");
  }
  assert.equal(details.openingHoursSpecification[5].opens, "09:00");
  assert.equal(details.openingHoursSpecification[5].closes, "16:00");
  assert.equal(details.openingHoursSpecification[6].opens, "00:00");
  assert.equal(details.openingHoursSpecification[6].closes, "00:00");
  for (const file of [
    "src/app/[locale]/locations/[state]/[city]/page.tsx",
    "src/app/[locale]/locations/[state]/[city]/[service]/page.tsx",
  ]) assert.match(fs.readFileSync(file, "utf8"), /\.\.\.getLocationBusinessDetails\(location\)/);
});

test("all registered studios have complete postal addresses and seven valid daily schedules", () => {
  assert.equal(locations.length, 19);
  for (const location of locations) {
    const details = getLocationBusinessDetails(location);
    const label = location.name;
    assert.ok(details.name, label);
    assert.ok(details.address.streetAddress, label);
    assert.ok(details.address.addressLocality, label);
    assert.equal(details.address.addressRegion, location.state, label);
    assert.match(details.address.postalCode, /^\d{5}(?:-\d{4})?$/, label);
    assert.equal(details.openingHoursSpecification.length, 7, label);
    for (const day of details.openingHoursSpecification) {
      assert.match(day.opens, /^([01]\d|2[0-3]):[0-5]\d$/, label);
      assert.match(day.closes, /^([01]\d|2[0-3]):[0-5]\d$/, label);
      const display = location.hours[day.dayOfWeek.toLowerCase()];
      if (display !== "Closed") {
        assert.notEqual(day.opens, day.closes, `${label}: ${display} must not become closed`);
      }
    }
  }
});
