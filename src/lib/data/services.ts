import type { Service } from "@/types/service";

import { cryotherapy } from "@/content/services/cryotherapy";
import { redLightTherapy } from "@/content/services/red-light-therapy";
import { infraredSauna } from "@/content/services/infrared-sauna";
import { dryFloat } from "@/content/services/dry-float";
import { cryoSlimming } from "@/content/services/cryo-slimming";
import { cryoToning } from "@/content/services/cryo-toning";
import { cryoLiftFacial } from "@/content/services/cryo-lift-facial";
import { compressionTherapy } from "@/content/services/compression-therapy";

export const services: Service[] = [
  cryotherapy,
  redLightTherapy,
  cryoSlimming,
  dryFloat,
  compressionTherapy,
  infraredSauna,
  cryoToning,
  cryoLiftFacial,
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
