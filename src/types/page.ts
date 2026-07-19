/**
 * @module @sitera/sdk/types/page
 * Page and section types.
 */

import type { SiteraAsset, SiteraAction, SiteraBusinessHighlight, SiteraCustomValue, SiteraSectionBackground, SiteraSectionSpacing } from "./common.js";
import type { SiteraSEO } from "./seo.js";

export interface SiteraBaseSection {
  id: string;
  type: string;
  name?: string;
  enabled: boolean;
  order: number;
  anchor?: string;
  background?: SiteraSectionBackground;
  spacing?: SiteraSectionSpacing;
  metadata?: Record<string, SiteraCustomValue>;
}

export interface SiteraHeroSection extends SiteraBaseSection {
  type: "hero";
  content: {
    eyebrow?: string;
    title: string;
    highlightedText?: string;
    description?: string;
    primaryAction?: SiteraAction;
    secondaryAction?: SiteraAction;
    image?: SiteraAsset;
    backgroundImage?: SiteraAsset;
    badges?: string[];
  };
}

export interface SiteraAboutSection extends SiteraBaseSection {
  type: "about";
  content: {
    eyebrow?: string;
    title: string;
    description: string;
    image?: SiteraAsset;
    highlights?: SiteraBusinessHighlight[];
    action?: SiteraAction;
  };
}

export interface SiteraServicesSection extends SiteraBaseSection {
  type: "services";
  content: {
    eyebrow?: string;
    title: string;
    description?: string;
    serviceIds: string[];
    layout?: "grid" | "list" | "carousel";
    action?: SiteraAction;
  };
}

export interface SiteraProductsSection extends SiteraBaseSection {
  type: "products";
  content: {
    eyebrow?: string;
    title: string;
    description?: string;
    productIds: string[];
    layout?: "grid" | "list" | "carousel";
    action?: SiteraAction;
  };
}

export interface SiteraStatisticsSection extends SiteraBaseSection {
  type: "statistics";
  content: { eyebrow?: string; title: string; description?: string; stats: SiteraBusinessHighlight[] };
}

export interface SiteraFeaturesSection extends SiteraBaseSection {
  type: "features";
  content: { eyebrow?: string; title: string; description?: string; features: { icon?: string; title: string; description: string }[] };
}

export interface SiteraTeamSection extends SiteraBaseSection {
  type: "team";
  content: { eyebrow?: string; title: string; description?: string; memberIds: string[]; layout?: "grid" | "list" };
}

export interface SiteraTestimonialsSection extends SiteraBaseSection {
  type: "testimonials";
  content: { eyebrow?: string; title: string; description?: string; testimonialIds: string[]; layout?: "carousel" | "grid" };
}

export interface SiteraGallerySection extends SiteraBaseSection {
  type: "gallery";
  content: { eyebrow?: string; title: string; description?: string; galleryItemIds: string[]; layout?: "grid" | "masonry" };
}

export interface SiteraFAQSection extends SiteraBaseSection {
  type: "faq";
  content: { eyebrow?: string; title: string; description?: string; faqIds: string[] };
}

export interface SiteraPromotionSection extends SiteraBaseSection {
  type: "promotion";
  content: { eyebrow?: string; title: string; description?: string; promotionIds: string[] };
}

export interface SiteraContactSection extends SiteraBaseSection {
  type: "contact";
  content: { eyebrow?: string; title: string; description?: string; showMap?: boolean; showForm?: boolean };
}

export interface SiteraLocationSection extends SiteraBaseSection {
  type: "location";
  content: { eyebrow?: string; title: string; description?: string; locationIds: string[]; showMap?: boolean };
}

export interface SiteraCTASection extends SiteraBaseSection {
  type: "cta";
  content: { eyebrow?: string; title: string; description?: string; primaryAction?: SiteraAction; secondaryAction?: SiteraAction; image?: SiteraAsset };
}

export interface SiteraLogoCloudSection extends SiteraBaseSection {
  type: "logo-cloud";
  content: { eyebrow?: string; title: string; logos: SiteraAsset[] };
}

export interface SiteraCustomSection extends SiteraBaseSection {
  type: "custom";
  content: Record<string, SiteraCustomValue>;
}

export type SiteraSection =
  | SiteraHeroSection
  | SiteraAboutSection
  | SiteraServicesSection
  | SiteraProductsSection
  | SiteraStatisticsSection
  | SiteraFeaturesSection
  | SiteraTeamSection
  | SiteraTestimonialsSection
  | SiteraGallerySection
  | SiteraFAQSection
  | SiteraPromotionSection
  | SiteraContactSection
  | SiteraLocationSection
  | SiteraCTASection
  | SiteraLogoCloudSection
  | SiteraCustomSection;

export interface SiteraPage {
  id: string;
  slug: string;
  title: string;
  description?: string;
  type: "home" | "about" | "services" | "products" | "contact" | "gallery" | "team" | "faq" | "custom";
  status: "draft" | "published";
  seo: SiteraSEO;
  sections: SiteraSection[];
  order: number;
  createdAt: string;
  updatedAt: string;
}
