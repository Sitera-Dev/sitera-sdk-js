/**
 * @module @sitera/sdk/types/social
 * Social media link types.
 */

import type { SiteraCustomLink } from "./common.js";

/** Marketplace link */
export interface SiteraMarketplaceLink {
  platform:
    | "tokopedia"
    | "shopee"
    | "lazada"
    | "blibli"
    | "gofood"
    | "grabfood"
    | "traveloka"
    | "tiket"
    | "other";
  label: string;
  url: string;
}

/** Social media links */
export interface SiteraSocialLinks {
  website?: string;
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  youtube?: string;
  linkedin?: string;
  x?: string;
  threads?: string;
  telegram?: string;
  whatsapp?: string;
  marketplaces?: SiteraMarketplaceLink[];
  custom?: SiteraCustomLink[];
}
