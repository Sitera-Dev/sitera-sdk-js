import type { SiteraLicense, SiteraCertification } from "./common.js";

export interface SiteraLegalInformation {
  legalName?: string;
  registrationNumber?: string;
  taxNumber?: string;
  licenses?: SiteraLicense[];
  certifications?: SiteraCertification[];
  privacyPolicyUrl?: string;
  termsUrl?: string;
  refundPolicyUrl?: string;
  disclaimer?: string;
}
