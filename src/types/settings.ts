import type { SiteraLocale, SiteraCustomValue } from "./common.js";
import type { SiteraIntegrationSettings } from "./analytics.js";

export interface SiteraSiteSettings {
  locale: SiteraLocale;
  timezone: string;
  currency: string;
  domain?: string;
  customDomain?: string;
  dateFormat: string;
  timeFormat: "12-hour" | "24-hour";
  integrations: SiteraIntegrationSettings;
  features: {
    services: boolean;
    products: boolean;
    booking: boolean;
    contactForm: boolean;
    testimonials: boolean;
    gallery: boolean;
    team: boolean;
    promotions: boolean;
    multiLocation: boolean;
  };
  accessibility?: { reduceMotion?: boolean; highContrast?: boolean };
  custom?: Record<string, SiteraCustomValue>;
}
