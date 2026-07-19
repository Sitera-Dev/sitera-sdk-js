/**
 * @module @sitera/sdk/types/gallery
 * Gallery types.
 */

import type { SiteraAsset } from "./common.js";

/** Gallery item */
export interface SiteraGalleryItem {
  id: string;
  title?: string;
  description?: string;
  asset: SiteraAsset;
  category?: string;
  tags?: string[];
  featured: boolean;
  order: number;
  beforeAfter?: {
    before: SiteraAsset;
    after: SiteraAsset;
  };
}
