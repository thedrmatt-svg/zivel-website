import type { ResearchSource } from "@/types/research";

import { research as cryo001 } from "./cryo-001";
import { research as cryo002 } from "./cryo-002";
import { research as cryo003 } from "./cryo-003";
import { research as cryo004 } from "./cryo-004";
import { research as cryo005 } from "./cryo-005";
import { research as cryo006 } from "./cryo-006";

export const researchSources: ResearchSource[] = [
  { ...cryo001, publisher: cryo001.source, tags: ["cryotherapy", "recovery"] },
  { ...cryo002, publisher: cryo002.source, tags: ["cryotherapy", "recovery"] },
  { ...cryo003, publisher: cryo003.source, tags: ["cryotherapy", "recovery"] },
  { ...cryo004, publisher: cryo004.source, tags: ["cryotherapy", "pain"] },
  { ...cryo005, publisher: cryo005.source, tags: ["cryotherapy", "circulation"] },
  { ...cryo006, publisher: cryo006.source, tags: ["cryotherapy", "safety"] },
];
