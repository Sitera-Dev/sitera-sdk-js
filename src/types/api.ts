import type { SiteraLocale, SiteraBusinessCategory, SiteraListOptions, SiteraPaginatedResult } from "./common.js";
import type { SiteraBusiness, SiteraBusinessIdentity, SiteraBusinessSettings } from "./business.js";
import type { SiteraBusinessContact } from "./contact.js";
import type { SiteraBranding } from "./branding.js";
import type { SiteraSEO } from "./seo.js";
import type { SiteraSocialLinks } from "./social.js";
import type { SiteraOperatingHours } from "./operating-hours.js";
import type { SiteraLegalInformation } from "./legal.js";
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
import type { SiteraDataProvider } from "./provider.js";

export interface SiteraGeneratedDataConfig {
  locations?: number;
  services?: number;
  products?: number;
  teamMembers?: number;
  testimonials?: number;
  faqs?: number;
  galleryItems?: number;
  promotions?: number;
  pages?: number;
}

export interface SiteraClientConfig {
  siteId?: string;
  businessId?: string;
  locale?: SiteraLocale;
  timezone?: string;
  currency?: string;
  seed?: string | number;
  category?: SiteraBusinessCategory;
  debug?: boolean;
  provider?: SiteraDataProvider;
  generatedData?: SiteraGeneratedDataConfig;
}

export interface ResolvedSiteraClientConfig {
  siteId: string;
  businessId: string;
  locale: SiteraLocale;
  timezone: string;
  currency: string;
  seed: string | number;
  category: SiteraBusinessCategory;
  debug: boolean;
  generatedData: Required<SiteraGeneratedDataConfig>;
}

export interface SiteraBusinessModule {
  get(): Promise<SiteraBusiness>;
  getIdentity(): Promise<SiteraBusinessIdentity>;
  getContact(): Promise<SiteraBusinessContact>;
  getBranding(): Promise<SiteraBranding>;
  getSEO(): Promise<SiteraSEO>;
  getSocialLinks(): Promise<SiteraSocialLinks>;
  getOperatingHours(): Promise<SiteraOperatingHours[]>;
  getLegalInformation(): Promise<SiteraLegalInformation>;
}

export interface SiteraServiceModule {
  list(options?: SiteraListOptions): Promise<SiteraService[]>;
  listWithMeta(options?: SiteraListOptions): Promise<SiteraPaginatedResult<SiteraService>>;
  getById(id: string): Promise<SiteraService>;
  getBySlug(slug: string): Promise<SiteraService>;
  getFeatured(): Promise<SiteraService[]>;
  getCategories(): Promise<string[]>;
}

export interface SiteraProductModule {
  list(options?: SiteraListOptions): Promise<SiteraProduct[]>;
  listWithMeta(options?: SiteraListOptions): Promise<SiteraPaginatedResult<SiteraProduct>>;
  getById(id: string): Promise<SiteraProduct>;
  getBySlug(slug: string): Promise<SiteraProduct>;
  getFeatured(): Promise<SiteraProduct[]>;
  getCategories(): Promise<string[]>;
}

export interface SiteraTeamModule {
  list(options?: SiteraListOptions): Promise<SiteraTeamMember[]>;
  listWithMeta(options?: SiteraListOptions): Promise<SiteraPaginatedResult<SiteraTeamMember>>;
  getById(id: string): Promise<SiteraTeamMember>;
  getFeatured(): Promise<SiteraTeamMember[]>;
}

export interface SiteraTestimonialModule {
  list(options?: SiteraListOptions): Promise<SiteraTestimonial[]>;
  listWithMeta(options?: SiteraListOptions): Promise<SiteraPaginatedResult<SiteraTestimonial>>;
  getFeatured(): Promise<SiteraTestimonial[]>;
}

export interface SiteraFAQModule {
  list(options?: SiteraListOptions): Promise<SiteraFAQ[]>;
  listWithMeta(options?: SiteraListOptions): Promise<SiteraPaginatedResult<SiteraFAQ>>;
  getCategories(): Promise<string[]>;
}

export interface SiteraGalleryModule {
  list(options?: SiteraListOptions): Promise<SiteraGalleryItem[]>;
  listWithMeta(options?: SiteraListOptions): Promise<SiteraPaginatedResult<SiteraGalleryItem>>;
  getFeatured(): Promise<SiteraGalleryItem[]>;
}

export interface SiteraPromotionModule {
  list(options?: SiteraListOptions): Promise<SiteraPromotion[]>;
  listWithMeta(options?: SiteraListOptions): Promise<SiteraPaginatedResult<SiteraPromotion>>;
  getActive(): Promise<SiteraPromotion[]>;
  getFeatured(): Promise<SiteraPromotion[]>;
}

export interface SiteraPageModule {
  list(): Promise<SiteraPage[]>;
  getById(id: string): Promise<SiteraPage>;
  getBySlug(slug: string): Promise<SiteraPage>;
  getByType(type: SiteraPage["type"]): Promise<SiteraPage[]>;
}

export interface SiteraNavigationModule {
  get(): Promise<SiteraNavigation>;
}

export interface SiteraLocationModule {
  list(): Promise<SiteraLocation[]>;
  getById(id: string): Promise<SiteraLocation>;
  getPrimary(): Promise<SiteraLocation>;
}

export interface SiteraSettingsModule {
  get(): Promise<SiteraSiteSettings>;
}

export interface SiteraBusinessSnapshot {
  business: SiteraBusiness;
  locations: SiteraLocation[];
  services: SiteraService[];
  products: SiteraProduct[];
  team: SiteraTeamMember[];
  testimonials: SiteraTestimonial[];
  faqs: SiteraFAQ[];
  gallery: SiteraGalleryItem[];
  promotions: SiteraPromotion[];
  pages: SiteraPage[];
  navigation: SiteraNavigation;
  settings: SiteraSiteSettings;
  generatedAt: string;
}

export interface SiteraClient {
  business: SiteraBusinessModule;
  services: SiteraServiceModule;
  products: SiteraProductModule;
  team: SiteraTeamModule;
  testimonials: SiteraTestimonialModule;
  faq: SiteraFAQModule;
  gallery: SiteraGalleryModule;
  promotions: SiteraPromotionModule;
  pages: SiteraPageModule;
  navigation: SiteraNavigationModule;
  locations: SiteraLocationModule;
  settings: SiteraSettingsModule;
  getSnapshot(): Promise<SiteraBusinessSnapshot>;
  getConfig(): Readonly<ResolvedSiteraClientConfig>;
}
