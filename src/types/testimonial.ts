/**
 * @module @sitera/sdk/types/testimonial
 * Testimonial types.
 */

import type { SiteraAsset } from "./common.js";

/** Testimonial source */
export type SiteraTestimonialSource = "google" | "facebook" | "marketplace" | "internal" | "other";

/** Customer testimonial */
export interface SiteraTestimonial {
  id: string;
  customerName: string;
  customerRole?: string;
  customerCompany?: string;
  customerImage?: SiteraAsset;
  content: string;
  rating?: number;
  source?: SiteraTestimonialSource;
  sourceUrl?: string;
  serviceId?: string;
  productId?: string;
  featured: boolean;
  publishedAt?: string;
}
