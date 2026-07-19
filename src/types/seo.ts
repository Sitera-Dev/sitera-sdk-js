/**
 * @module @sitera/sdk/types/seo
 * SEO and structured data types.
 */

import type { SiteraSEOImage, SiteraStructuredData } from "./common.js";

/** SEO configuration */
export interface SiteraSEO {
  title: string;
  titleTemplate?: string;
  description: string;
  keywords: string[];
  canonicalUrl?: string;

  robots: {
    index: boolean;
    follow: boolean;
    noArchive?: boolean;
    noImageIndex?: boolean;
  };

  openGraph: {
    title: string;
    description: string;
    type: "website" | "article" | "business.business";
    url?: string;
    siteName?: string;
    images: SiteraSEOImage[];
    locale?: string;
  };

  twitter: {
    card: "summary" | "summary_large_image";
    title: string;
    description: string;
    images: string[];
    site?: string;
    creator?: string;
  };

  structuredData?: SiteraStructuredData[];
}
