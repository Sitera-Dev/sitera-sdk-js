/**
 * @module @sitera/sdk/types/promotion
 * Promotion types.
 */

import type { SiteraAsset, SiteraMoney, SiteraAction } from "./common.js";

export type SiteraPromotionType =
  | "discount" | "cashback" | "bundle" | "free-item" | "limited-offer" | "custom";

export interface SiteraPromotion {
  id: string;
  slug: string;
  name: string;
  headline?: string;
  description?: string;
  type: SiteraPromotionType;
  image?: SiteraAsset;
  discount?: {
    type: "percentage" | "fixed";
    value: number;
    maximumAmount?: SiteraMoney;
  };
  code?: string;
  startAt: string;
  endAt: string;
  terms?: string[];
  applicableServiceIds?: string[];
  applicableProductIds?: string[];
  active: boolean;
  featured: boolean;
  callToAction?: SiteraAction;
}
