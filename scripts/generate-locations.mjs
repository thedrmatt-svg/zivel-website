import fs from "fs";
import path from "path";

const OUT_DIR = path.join(process.cwd(), "src/content/locations");
fs.mkdirSync(OUT_DIR, { recursive: true });

const SERVICES_ALL = [
  {  name: "Cryotherapy", slug: "cryotherapy" },
  {  name: "Red Light Therapy", slug: "red-light-therapy" },
  {  name: "Infrared Sauna", slug: "infrared-sauna" },
  {  name: "Dry Float", slug: "dry-float" },
  {  name: "Cryo Slimming", slug: "cryo-slimming" },
  {  name: "Cryo Toning", slug: "cryo-toning" },
  {  name: "CryoLift Facial", slug: "cryo-lift-facial" },
  {  name: "Compression Therapy", slug: "compression-therapy" },
];

function servicesFromRule(rule) {
  const r = (rule || "").toLowerCase().trim();
  if (r === "all except float") return SERVICES_ALL.filter(s => s.slug !== "dry-float");
  return SERVICES_ALL;
}

function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

const STATE_SLUG = {
  "AR": "arkansas",
  "NC": "north-carolina",
  "OH": "ohio",
  "GA": "georgia",
  "CO": "colorado",
  "FL": "florida",
  "MS": "mississippi",
  "TN": "tennessee",
  "LA": "louisiana",
  "KY": "kentucky",
  "UT": "utah",
};

const LOCATIONS = [
  {
    displayName: "Zivel Bentonville",
    locationName: "Zivel - Bentonville",
    address: "2905 S Walton Blvd Suite 15, Bentonville, AR 72712",
    phone: "(479) 481-5990",
    servicesRule: "All",
    parking: "Free parking or street available",
    description: "",
    operator: "Joe & Cheri Mercer",
  },
  {
    displayName: "Zivel Belmont",
    locationName: "Zivel - Belmont",
    address: "202 S Main St Suite E, Belmont, NC 28012",
    phone: "(704) 858-5552",
    servicesRule: "All",
    parking: "Free parking or street available",
    description: "",
    operator: "Burt",
  },
  {
    displayName: "Zivel Brecksville",
    locationName: "Zivel - Brecksville",
    address: "8215 Chippewa Rd, Brecksville, OH 44141",
    phone: "(440) 875-7629",
    servicesRule: "All",
    parking: "Free parking or street available",
    description: "",
    operator: "Mark",
  },
  {
    displayName: "Zivel Buckhead",
    locationName: "Zivel - Buckhead",
    address: "2221 Peachtree Rd NE Suite F, Atlanta, GA 30309",
    phone: "(404) 309-5954",
    servicesRule: "All except float",
    parking: "Free parking or street available",
    description: "",
    operator: "Tia",
  },
  {
    displayName: "Zivel Briargate",
    locationName: "Zivel - Briargate",
    address: "460 Chapel Hills Dr Ste 120, Colorado Springs, CO 80920",
    phone: "(719) 500-1638",
    servicesRule: "All except float",
    parking: "Free parking or street available",
    description: "",
    operator: "Gracie",
  },
  {
    displayName: "Zivel Coral Gables",
    locationName: "Zivel - Coral Gables",
    address: "348 Minorca Ave, Coral Gables, FL 33134",
    phone: "(786) 527-0842",
    servicesRule: "All",
    parking: "Free parking or street available",
    description: "",
    operator: "Mike",
  },
  {
    displayName: "Zivel Cumming-Windermere",
    locationName: "Zivel Performance and Recovery",
    address: "3775 Windermere Pkwy suite l, Cumming, GA 30041",
    phone: "(470) 539-1126",
    servicesRule: "All",
    parking: "Free parking or street available",
    description: "",
    operator: "Janis",
  },
  {
    displayName: "Zivel Fayetteville",
    locationName: "Zivel - Fayetteville",
    address: "3484 W Wedington Dr Suite 5, Fayetteville, AR 72704",
    phone: "(479) 800-4443",
    servicesRule: "All except float",
    parking: "Free parking or street available",
    description: "",
    operator: "Patrick & Allison",
  },
  {
    displayName: "Zivel Fieldhouse",
    locationName: "Zivel - Fieldhouse",
    address: "1582 Green T Rd E, Hernando, MS 38632",
    phone: "(662) 879-9900",
    servicesRule: "All",
    parking: "Free parking or street available",
    description: "Inside Fieldhouse near Hernando, MS",
    operator: "Jay",
  },
  {
    displayName: "Zivel Franklin-Cool Springs",
    locationName: "Zivel - Franklin Cool Springs",
    address: "790 Jordan Rd #107, Franklin, TN 37067",
    phone: "(615) 997-4159",
    servicesRule: "All",
    parking: "Free parking or street available",
    description: "",
    operator: "",
  },
  {
    displayName: "Zivel Highlands Ranch",
    locationName: "Zivel - Performance & Recovery Highlands Ranch",
    address: "9325 Dorchester St ste f-121, Highlands Ranch, CO 80129",
    phone: "(720) 827-6311",
    servicesRule: "All",
    parking: "Free parking or street available",
    description: "",
    operator: "Deena & Tom",
  },
  {
    displayName: "Zivel Hollywood",
    locationName: "Zivel - Hollywood",
    address: "3361 Sheridan St, Hollywood, FL 33021",
    phone: "(754) 217-8177",
    servicesRule: "All",
    parking: "Free parking or street available",
    description: "",
    operator: "Peter & Michelle",
  },
  {
    displayName: "Zivel Metairie",
    locationName: "Zivel - Metairie",
    address: "701 Metairie Rd suite 1b 201, Metairie, LA 70005",
    phone: "(504) 519-7154",
    servicesRule: "All",
    parking: "Free parking or street available",
    description: "",
    operator: "Chris, Trey & Josh",
  },
  {
    displayName: "Zivel Murfreesboro",
    locationName: "Zivel - Performance and Recovery Murfreesboro",
    address: "1144 Fortress Blvd ste e, Murfreesboro, TN 37128",
    phone: "(629) 239-1986",
    servicesRule: "All",
    parking: "Free parking or street available",
    description: "",
    operator: "Scott",
  },
  {
    displayName: "Zivel Newport",
    locationName: "Zivel - Newport",
    address: "91A Carothers Rd, Newport, KY 41071",
    phone: "(859) 250-0852",
    servicesRule: "All",
    parking: "Free parking or street available",
    description: "",
    operator: "Gina",
  },
  {
    displayName: "Zivel Palm Coast",
    locationName: "Zivel Performance & Recovery - Palm Coast",
    address: "5615 State Rte 100 Suite 118, Palm Coast, FL 32164",
    phone: "(386) 346-5126",
    servicesRule: "All",
    parking: "Free parking or street available",
    description: "",
    operator: "Kelly",
  },
  {
    displayName: "Zivel Parker",
    locationName: "Zivel - Performance and Recovery Parker",
    address: "17021 Lincoln Ave ste c, Parker, CO 80134",
    phone: "(720) 366-3622",
    servicesRule: "All",
    parking: "Free parking or street available",
    description: "",
    operator: "Carla",
  },
  {
    displayName: "Zivel Riverton",
    locationName: "Zivel - Riverton",
    address: "2722 W 12600 S #1, Riverton, UT 84065",
    phone: "(385) 443-8778",
    servicesRule: "All",
    parking: "Free parking or street available",
    description: "",
    operator: "Colin",
  },
  {
    displayName: "Zivel Rogers",
    locationName: "Zivel - Rogers",
    address: "2603 W Pleasant Grove Rd #117, Rogers, AR 72758",
    phone: "(479) 519-4417",
    servicesRule: "All",
    parking: "Free parking or street available",
    description: "",
    operator: "Joe & Cheri Mercer",
  },
];

function parseState(address) {
  const m = address.match(/,\s*([A-Z]{2})\s*\d{5}(-\d{4})?\s*$/);
  return m ? m[1] : null;
}

function citySlugFor(displayName) {
  const lower = displayName.toLowerCase();
  if (lower.includes("cumming-windermere")) return "windermere";
  if (lower.includes("fieldhouse")) return "fieldhouse";
  if (lower.includes("franklin-cool springs")) return "cool-springs";
  return slugify(displayName.replace(/^Zivel\s+/i, "").trim());
}

function safeConstName(displayName) {
  const base = slugify(displayName).replace(/-/g, "_");
  return base.replace(/[^a-z0-9_]/g, "");
}

function fileSlug(displayName, stateSlug, citySlug) {
  return `${citySlug}-${stateSlug}`;
}

const entries = [];

for (const loc of LOCATIONS) {
  const state = parseState(loc.address);
  if (!state) {
    throw new Error(`Could not parse state from address: ${loc.address}`);
  }
  const stateSlug = STATE_SLUG[state] || slugify(state);
  const citySlug = citySlugFor(loc.displayName);

  const canonical = `https://www.zivel.com/locations/${stateSlug}/${citySlug}`;

  const constName = safeConstName(loc.displayName) + "_location";
  const tsFile = fileSlug(loc.displayName, stateSlug, citySlug) + ".ts";
  const outPath = path.join(OUT_DIR, tsFile);

  const services = servicesFromRule(loc.servicesRule);

  const owners = loc.operator?.trim()
    ? [
        {
          name: loc.operator.trim(),
          title: "Local Operator",
          bio:
            "This location is independently operated. Local leadership supports the studio experience, community partnerships, and day-to-day service quality.",
        },
      ]
    : [];

  const partners = [];

  const content = `import type { Location } from "@/types/location";

export const ${constName}: Location = {
  name: ${JSON.stringify(loc.displayName)},
  slug: ${JSON.stringify(citySlug)},
  state: ${JSON.stringify(state)},
  stateSlug: ${JSON.stringify(stateSlug)},
  citySlug: ${JSON.stringify(citySlug)},

  seo: {
    title: ${JSON.stringify(`${loc.displayName} | Zivel`)},
    description: ${JSON.stringify(`${loc.displayName} offers modern wellness and recovery services including cryotherapy, red light therapy, infrared sauna, dry float, compression therapy, and more. Book a session or explore memberships.`)},
    canonical: ${JSON.stringify(canonical)},
  },

  contact: {
    address: ${JSON.stringify(loc.address)},
    phone: ${JSON.stringify(loc.phone || "")},
    parking: ${JSON.stringify(loc.parking || "")},
    notes: ${JSON.stringify(loc.description || "")},
  },

  booking: {
    locationId: null,
  },

  services: ${JSON.stringify(services, null, 2)},

  owners: ${JSON.stringify(owners, null, 2)},

  partners: ${JSON.stringify(partners, null, 2)},
};

export default ${constName};
`;

  fs.writeFileSync(outPath, content, "utf8");

  entries.push({
    constName,
    importPath: `@/content/locations/${tsFile.replace(/\.ts$/, "")}`,
  });
}

const dataFile = path.join(process.cwd(), "src/lib/data/locations.ts");
const header = `import type { Location } from "@/types/location";\n`;
const imports = entries
  .map(e => `import ${e.constName} from "${e.importPath}";`)
  .join("\n");

const body = `
export const locations: Location[] = [
${entries.map(e => `  ${e.constName},`).join("\n")}
];

export function getLocationByPath(state: string, city: string): Location | undefined {
  const s = state.toLowerCase();
  const c = city.toLowerCase();
  return locations.find((l) => l.stateSlug === s && l.citySlug === c);
}
`;

fs.writeFileSync(dataFile, header + imports + "\n" + body.trimStart(), "utf8");

console.log(`✅ Wrote ${entries.length} location content files to src/content/locations/`);
console.log(`✅ Updated src/lib/data/locations.ts with ${entries.length} imports`);
