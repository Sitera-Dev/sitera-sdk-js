/**
 * @module @sitera/sdk/types/service
 * Service types.
 */

import type { SiteraAsset, SiteraMoney, SiteraMoneyRange, SiteraAction, SiteraCustomValue } from "./common.js";

/** Service pricing type */
export type SiteraServicePricingType =
  | "fixed"
  | "starting-from"
  | "hourly"
  | "daily"
  | "custom"
  | "free";

/** Service duration */
export interface SiteraServiceDuration {
  value: number;
  unit: "minute" | "hour" | "day" | "week";
}

/** Service */
export interface SiteraService {
  id: string;
  slug: string;
  name: string;
  shortDescription?: string;
  description?: string;
  category?: string;
  image?: SiteraAsset;
  gallery?: SiteraAsset[];
  price?: SiteraMoney;
  priceRange?: SiteraMoneyRange;
  pricingType: SiteraServicePricingType;
  duration?: SiteraServiceDuration;
  features: string[];
  benefits?: string[];
  requirements?: string[];
  available: boolean;
  featured: boolean;
  order: number;
  callToAction?: SiteraAction;
  metadata?: Record<string, SiteraCustomValue>;
}
