export type LocalServiceCombo = {
  locale: string;
  state: string;
  city: string;
  service: string;
};

export const LOCAL_SERVICE_COMBOS: LocalServiceCombo[] = [
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
