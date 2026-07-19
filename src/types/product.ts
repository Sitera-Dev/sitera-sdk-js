/**
 * @module @sitera/sdk/types/product
 * Product types.
 */

import type { SiteraAsset, SiteraMoney, SiteraMoneyRange, SiteraAction, SiteraCustomValue } from "./common.js";
import type { SiteraMarketplaceLink } from "./social.js";

/** Product stock status */
export type SiteraStockStatus = "in-stock" | "low-stock" | "out-of-stock" | "preorder";

/** Product variant */
export interface SiteraProductVariant {
  id: string;
  name: string;
  sku?: string;
  options: Record<string, string>;
  price?: SiteraMoney;
  available: boolean;
}

/** Product */
export interface SiteraProduct {
  id: string;
  sku?: string;
  slug: string;
  name: string;
  shortDescription?: string;
  description?: string;
  category: string;
  subcategory?: string;
  tags: string[];
  images: SiteraAsset[];
  price: SiteraMoney;
  compareAtPrice?: SiteraMoney;
  priceRange?: SiteraMoneyRange;
  stock?: {
    status: SiteraStockStatus;
    quantity?: number;
  };
  variants?: SiteraProductVariant[];
  featured: boolean;
  available: boolean;
  order: number;
  marketplaceLinks?: SiteraMarketplaceLink[];
  callToAction?: SiteraAction;
  metadata?: Record<string, SiteraCustomValue>;
}
