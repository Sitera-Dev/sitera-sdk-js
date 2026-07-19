import type { SiteraLocale, SiteraBusinessCategory } from "./common.js";
import type { SiteraBusiness } from "./business.js";
import type { SiteraService } from "./service.js";
import type { SiteraProduct } from "./product.js";
import type { SiteraTeamMember } from "./team.js";
import type { SiteraTestimonial } from "./testimonial.js";
import type { SiteraFAQ } from "./faq.js";
import type { SiteraGalleryItem } from "./gallery.js";
import type { SiteraPromotion } from "./promotion.js";
import type { SiteraPage } from "./page.js";
import type { SiteraNavigation } from "./navigation.js";
import type { SiteraLocation } from "./location.js";
import type { SiteraSiteSettings } from "./settings.js";

export interface SiteraProviderContext {
  siteId: string;
  businessId: string;
  locale: SiteraLocale;
  timezone: string;
  currency: string;
  category: SiteraBusinessCategory;
  seed: string | number;
}

export interface SiteraDataProvider {
  getBusiness(context: SiteraProviderContext): Promise<SiteraBusiness>;
  getServices(context: SiteraProviderContext): Promise<SiteraService[]>;
  getProducts(context: SiteraProviderContext): Promise<SiteraProduct[]>;
  getTeam(context: SiteraProviderContext): Promise<SiteraTeamMember[]>;
  getTestimonials(context: SiteraProviderContext): Promise<SiteraTestimonial[]>;
  getFAQs(context: SiteraProviderContext): Promise<SiteraFAQ[]>;
  getGallery(context: SiteraProviderContext): Promise<SiteraGalleryItem[]>;
  getPromotions(context: SiteraProviderContext): Promise<SiteraPromotion[]>;
  getPages(context: SiteraProviderContext): Promise<SiteraPage[]>;
  getNavigation(context: SiteraProviderContext): Promise<SiteraNavigation>;
  getLocations(context: SiteraProviderContext): Promise<SiteraLocation[]>;
  getSettings(context: SiteraProviderContext): Promise<SiteraSiteSettings>;
}
