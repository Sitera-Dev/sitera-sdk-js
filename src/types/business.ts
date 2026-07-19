import type { SiteraBusinessCategory, SiteraBusinessType, SiteraAsset, SiteraBusinessHighlight, SiteraBusinessStatistic, SiteraCertification, SiteraAward, SiteraFacility } from "./common.js";
import type { SiteraBusinessContact } from "./contact.js";
import type { SiteraLocationSummary } from "./location.js";
import type { SiteraOperatingHours } from "./operating-hours.js";
import type { SiteraSocialLinks } from "./social.js";
import type { SiteraBranding } from "./branding.js";
import type { SiteraSEO } from "./seo.js";
import type { SiteraLegalInformation } from "./legal.js";
import type { SiteraPaymentMethod } from "./payment.js";
import type { SiteraDeliveryOption } from "./delivery.js";

export interface SiteraBusinessIdentity {
  logo?: SiteraAsset;
  icon?: SiteraAsset;
  favicon?: SiteraAsset;
  coverImage?: SiteraAsset;
  squareImage?: SiteraAsset;
  brandName: string;
  legalName?: string;
  registrationNumber?: string;
  taxNumber?: string;
}

export interface SiteraBusinessSettings {
  locale: string;
  timezone: string;
  currency: string;
}

export interface SiteraBusiness {
  id: string;
  siteId: string;
  name: string;
  legalName?: string;
  slug: string;
  tagline?: string;
  shortDescription?: string;
  description?: string;
  story?: string;
  category: SiteraBusinessCategory;
  subcategory?: string;
  industry?: string;
  businessType?: SiteraBusinessType;
  establishedYear?: number;
  employeeCount?: number;
  serviceArea?: string[];
  identity: SiteraBusinessIdentity;
  contact: SiteraBusinessContact;
  locations: SiteraLocationSummary[];
  operatingHours: SiteraOperatingHours[];
  socialLinks: SiteraSocialLinks;
  branding: SiteraBranding;
  seo: SiteraSEO;
  legal: SiteraLegalInformation;
  settings: SiteraBusinessSettings;
  highlights: SiteraBusinessHighlight[];
  statistics: SiteraBusinessStatistic[];
  certifications: SiteraCertification[];
  awards: SiteraAward[];
  paymentMethods: SiteraPaymentMethod[];
  deliveryOptions: SiteraDeliveryOption[];
  facilities: SiteraFacility[];
  languages: string[];
  status: "draft" | "published" | "inactive";
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}
