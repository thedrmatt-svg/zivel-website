export type LocalServiceCombo = {
  locale: string;
  state: string;
  city: string;
  service: string;
};

export const LOCAL_SERVICE_COMBOS: LocalServiceCombo[] = [
  // ── Riverton, UT — full suite (hand-crafted LOCAL_CONTENT) ────────────────
  { locale: "en", state: "utah", city: "riverton", service: "cryotherapy" },
  { locale: "es", state: "utah", city: "riverton", service: "cryotherapy" },
  { locale: "en", state: "utah", city: "riverton", service: "red-light-therapy" },
  { locale: "es", state: "utah", city: "riverton", service: "red-light-therapy" },
  { locale: "en", state: "utah", city: "riverton", service: "infrared-sauna" },
  { locale: "es", state: "utah", city: "riverton", service: "infrared-sauna" },
  { locale: "en", state: "utah", city: "riverton", service: "compression-therapy" },
  { locale: "es", state: "utah", city: "riverton", service: "compression-therapy" },
  { locale: "en", state: "utah", city: "riverton", service: "dry-float" },
  { locale: "es", state: "utah", city: "riverton", service: "dry-float" },
  { locale: "en", state: "utah", city: "riverton", service: "cryo-slimming" },
  { locale: "es", state: "utah", city: "riverton", service: "cryo-slimming" },
  { locale: "en", state: "utah", city: "riverton", service: "cryo-toning" },
  { locale: "es", state: "utah", city: "riverton", service: "cryo-toning" },
  { locale: "en", state: "utah", city: "riverton", service: "cryo-lift-facial" },
  { locale: "es", state: "utah", city: "riverton", service: "cryo-lift-facial" },

  // ── Cryo Slimming — all locations (dynamic template) ─────────────────────
  { locale: "en", state: "arkansas",       city: "bentonville",     service: "cryo-slimming" },
  { locale: "es", state: "arkansas",       city: "bentonville",     service: "cryo-slimming" },
  { locale: "en", state: "north-carolina", city: "belmont",         service: "cryo-slimming" },
  { locale: "es", state: "north-carolina", city: "belmont",         service: "cryo-slimming" },
  { locale: "en", state: "ohio",           city: "brecksville",     service: "cryo-slimming" },
  { locale: "es", state: "ohio",           city: "brecksville",     service: "cryo-slimming" },
  { locale: "en", state: "georgia",        city: "buckhead",        service: "cryo-slimming" },
  { locale: "es", state: "georgia",        city: "buckhead",        service: "cryo-slimming" },
  { locale: "en", state: "colorado",       city: "briargate",       service: "cryo-slimming" },
  { locale: "es", state: "colorado",       city: "briargate",       service: "cryo-slimming" },
  { locale: "en", state: "florida",        city: "coral-gables",    service: "cryo-slimming" },
  { locale: "es", state: "florida",        city: "coral-gables",    service: "cryo-slimming" },
  { locale: "en", state: "georgia",        city: "windermere",      service: "cryo-slimming" },
  { locale: "es", state: "georgia",        city: "windermere",      service: "cryo-slimming" },
  { locale: "en", state: "arkansas",       city: "fayetteville",    service: "cryo-slimming" },
  { locale: "es", state: "arkansas",       city: "fayetteville",    service: "cryo-slimming" },
  { locale: "en", state: "mississippi",    city: "fieldhouse",      service: "cryo-slimming" },
  { locale: "es", state: "mississippi",    city: "fieldhouse",      service: "cryo-slimming" },
  { locale: "en", state: "tennessee",      city: "cool-springs",    service: "cryo-slimming" },
  { locale: "es", state: "tennessee",      city: "cool-springs",    service: "cryo-slimming" },
  { locale: "en", state: "colorado",       city: "highlands-ranch", service: "cryo-slimming" },
  { locale: "es", state: "colorado",       city: "highlands-ranch", service: "cryo-slimming" },
  { locale: "en", state: "florida",        city: "hollywood",       service: "cryo-slimming" },
  { locale: "es", state: "florida",        city: "hollywood",       service: "cryo-slimming" },
  { locale: "en", state: "louisiana",      city: "metairie",        service: "cryo-slimming" },
  { locale: "es", state: "louisiana",      city: "metairie",        service: "cryo-slimming" },
  { locale: "en", state: "tennessee",      city: "murfreesboro",    service: "cryo-slimming" },
  { locale: "es", state: "tennessee",      city: "murfreesboro",    service: "cryo-slimming" },
  { locale: "en", state: "kentucky",       city: "newport",         service: "cryo-slimming" },
  { locale: "es", state: "kentucky",       city: "newport",         service: "cryo-slimming" },
  { locale: "en", state: "florida",        city: "palm-coast",      service: "cryo-slimming" },
  { locale: "es", state: "florida",        city: "palm-coast",      service: "cryo-slimming" },
  { locale: "en", state: "colorado",       city: "parker",          service: "cryo-slimming" },
  { locale: "es", state: "colorado",       city: "parker",          service: "cryo-slimming" },
  { locale: "en", state: "arkansas",       city: "rogers",          service: "cryo-slimming" },
  { locale: "es", state: "arkansas",       city: "rogers",          service: "cryo-slimming" },

  // ── CryoLift Facial — all locations (dynamic template) ───────────────────
  { locale: "en", state: "arkansas",       city: "bentonville",     service: "cryo-lift-facial" },
  { locale: "es", state: "arkansas",       city: "bentonville",     service: "cryo-lift-facial" },
  { locale: "en", state: "north-carolina", city: "belmont",         service: "cryo-lift-facial" },
  { locale: "es", state: "north-carolina", city: "belmont",         service: "cryo-lift-facial" },
  { locale: "en", state: "ohio",           city: "brecksville",     service: "cryo-lift-facial" },
  { locale: "es", state: "ohio",           city: "brecksville",     service: "cryo-lift-facial" },
  { locale: "en", state: "georgia",        city: "buckhead",        service: "cryo-lift-facial" },
  { locale: "es", state: "georgia",        city: "buckhead",        service: "cryo-lift-facial" },
  { locale: "en", state: "colorado",       city: "briargate",       service: "cryo-lift-facial" },
  { locale: "es", state: "colorado",       city: "briargate",       service: "cryo-lift-facial" },
  { locale: "en", state: "florida",        city: "coral-gables",    service: "cryo-lift-facial" },
  { locale: "es", state: "florida",        city: "coral-gables",    service: "cryo-lift-facial" },
  { locale: "en", state: "georgia",        city: "windermere",      service: "cryo-lift-facial" },
  { locale: "es", state: "georgia",        city: "windermere",      service: "cryo-lift-facial" },
  { locale: "en", state: "arkansas",       city: "fayetteville",    service: "cryo-lift-facial" },
  { locale: "es", state: "arkansas",       city: "fayetteville",    service: "cryo-lift-facial" },
  { locale: "en", state: "mississippi",    city: "fieldhouse",      service: "cryo-lift-facial" },
  { locale: "es", state: "mississippi",    city: "fieldhouse",      service: "cryo-lift-facial" },
  { locale: "en", state: "tennessee",      city: "cool-springs",    service: "cryo-lift-facial" },
  { locale: "es", state: "tennessee",      city: "cool-springs",    service: "cryo-lift-facial" },
  { locale: "en", state: "colorado",       city: "highlands-ranch", service: "cryo-lift-facial" },
  { locale: "es", state: "colorado",       city: "highlands-ranch", service: "cryo-lift-facial" },
  { locale: "en", state: "florida",        city: "hollywood",       service: "cryo-lift-facial" },
  { locale: "es", state: "florida",        city: "hollywood",       service: "cryo-lift-facial" },
  { locale: "en", state: "louisiana",      city: "metairie",        service: "cryo-lift-facial" },
  { locale: "es", state: "louisiana",      city: "metairie",        service: "cryo-lift-facial" },
  { locale: "en", state: "tennessee",      city: "murfreesboro",    service: "cryo-lift-facial" },
  { locale: "es", state: "tennessee",      city: "murfreesboro",    service: "cryo-lift-facial" },
  { locale: "en", state: "kentucky",       city: "newport",         service: "cryo-lift-facial" },
  { locale: "es", state: "kentucky",       city: "newport",         service: "cryo-lift-facial" },
  { locale: "en", state: "florida",        city: "palm-coast",      service: "cryo-lift-facial" },
  { locale: "es", state: "florida",        city: "palm-coast",      service: "cryo-lift-facial" },
  { locale: "en", state: "colorado",       city: "parker",          service: "cryo-lift-facial" },
  { locale: "es", state: "colorado",       city: "parker",          service: "cryo-lift-facial" },
  { locale: "en", state: "arkansas",       city: "rogers",          service: "cryo-lift-facial" },
  { locale: "es", state: "arkansas",       city: "rogers",          service: "cryo-lift-facial" },

  // ── Dry Float — all locations that offer it (dynamic template) ────────────
  // (buckhead, briargate, fayetteville do not offer dry float)
  { locale: "en", state: "arkansas",       city: "bentonville",     service: "dry-float" },
  { locale: "es", state: "arkansas",       city: "bentonville",     service: "dry-float" },
  { locale: "en", state: "north-carolina", city: "belmont",         service: "dry-float" },
  { locale: "es", state: "north-carolina", city: "belmont",         service: "dry-float" },
  { locale: "en", state: "ohio",           city: "brecksville",     service: "dry-float" },
  { locale: "es", state: "ohio",           city: "brecksville",     service: "dry-float" },
  { locale: "en", state: "florida",        city: "coral-gables",    service: "dry-float" },
  { locale: "es", state: "florida",        city: "coral-gables",    service: "dry-float" },
  { locale: "en", state: "georgia",        city: "windermere",      service: "dry-float" },
  { locale: "es", state: "georgia",        city: "windermere",      service: "dry-float" },
  { locale: "en", state: "mississippi",    city: "fieldhouse",      service: "dry-float" },
  { locale: "es", state: "mississippi",    city: "fieldhouse",      service: "dry-float" },
  { locale: "en", state: "tennessee",      city: "cool-springs",    service: "dry-float" },
  { locale: "es", state: "tennessee",      city: "cool-springs",    service: "dry-float" },
  { locale: "en", state: "colorado",       city: "highlands-ranch", service: "dry-float" },
  { locale: "es", state: "colorado",       city: "highlands-ranch", service: "dry-float" },
  { locale: "en", state: "florida",        city: "hollywood",       service: "dry-float" },
  { locale: "es", state: "florida",        city: "hollywood",       service: "dry-float" },
  { locale: "en", state: "louisiana",      city: "metairie",        service: "dry-float" },
  { locale: "es", state: "louisiana",      city: "metairie",        service: "dry-float" },
  { locale: "en", state: "tennessee",      city: "murfreesboro",    service: "dry-float" },
  { locale: "es", state: "tennessee",      city: "murfreesboro",    service: "dry-float" },
  { locale: "en", state: "kentucky",       city: "newport",         service: "dry-float" },
  { locale: "es", state: "kentucky",       city: "newport",         service: "dry-float" },
  { locale: "en", state: "florida",        city: "palm-coast",      service: "dry-float" },
  { locale: "es", state: "florida",        city: "palm-coast",      service: "dry-float" },
  { locale: "en", state: "colorado",       city: "parker",          service: "dry-float" },
  { locale: "es", state: "colorado",       city: "parker",          service: "dry-float" },
  { locale: "en", state: "arkansas",       city: "rogers",          service: "dry-float" },
  { locale: "es", state: "arkansas",       city: "rogers",          service: "dry-float" },
];

const localPageSet = new Set(
  LOCAL_SERVICE_COMBOS
    .filter((c) => c.locale === "en")
    .map((c) => `${c.state}/${c.city}/${c.service}`)
);

export function hasLocalServicePage(state: string, city: string, service: string): boolean {
  return localPageSet.has(`${state}/${city}/${service}`);
}

export function getLocalServiceHref(state: string, city: string, service: string): string | undefined {
  if (hasLocalServicePage(state, city, service)) {
    return `/locations/${state}/${city}/${service}`;
  }
  return undefined;
}
