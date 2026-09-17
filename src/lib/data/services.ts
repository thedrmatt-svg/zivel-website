import type { Service } from "@/types/service";
import { withContentDateFallback } from "@/lib/data/contentDates";

import { cryotherapy } from "@/content/services/cryotherapy";
import { redLightTherapy } from "@/content/services/red-light-therapy";
import { infraredSauna } from "@/content/services/infrared-sauna";
import { dryFloat } from "@/content/services/dry-float";
import { cryoSlimming } from "@/content/services/cryo-slimming";
import { cryoToning } from "@/content/services/cryo-toning";
import { cryoLiftFacial } from "@/content/services/cryo-lift-facial";
import { compressionTherapy } from "@/content/services/compression-therapy";
import { oxygenBar } from "@/content/services/oxygen-bar";
import { cryoSoothe } from "@/content/services/cryo-soothe";

export const services: Service[] = [
  cryotherapy,
  redLightTherapy,
  cryoSlimming,
  cryoLiftFacial,
  dryFloat,
  infraredSauna,
  cryoToning,
  compressionTherapy,
  oxygenBar,
  cryoSoothe,
].map((service) => withContentDateFallback(service));

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
