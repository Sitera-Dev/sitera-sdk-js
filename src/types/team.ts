/**
 * @module @sitera/sdk/types/team
 * Team member types.
 */

import type { SiteraAsset, SiteraCertification } from "./common.js";
import type { SiteraOperatingHours } from "./operating-hours.js";
import type { SiteraSocialLinks } from "./social.js";

/** Team member */
export interface SiteraTeamMember {
  id: string;
  name: string;
  role: string;
  department?: string;
  biography?: string;
  image?: SiteraAsset;
  specializations?: string[];
  certifications?: SiteraCertification[];
  experienceYears?: number;
  languages?: string[];
  contact?: {
    email?: string;
    phone?: string;
  };
  socialLinks?: Partial<SiteraSocialLinks>;
  schedule?: SiteraOperatingHours[];
  featured: boolean;
  order: number;
}
