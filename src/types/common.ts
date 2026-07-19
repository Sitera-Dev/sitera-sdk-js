/**
 * @module @sitera/sdk/types/common
 * Common shared types used throughout the Sitera SDK.
 */

/** Supported locale identifiers */
export type SiteraLocale = "id-ID" | "en-US" | "en-GB" | "ms-MY";

/** Supported business categories */
export type SiteraBusinessCategory =
  | "restaurant"
  | "cafe"
  | "professional-service"
  | "beauty"
  | "education"
  | "property"
  | "healthcare"
  | "automotive"
  | "hospitality"
  | "local-brand";

/** Business entity type */
export type SiteraBusinessType =
  | "sole-proprietorship"
  | "partnership"
  | "corporation"
  | "llc"
  | "cooperative"
  | "franchise"
  | "non-profit"
  | "other";

/** JSON-safe primitive */
export type SiteraPrimitive = string | number | boolean | null;

/** Recursive JSON-safe custom value */
export type SiteraCustomValue =
  | SiteraPrimitive
  | SiteraCustomValue[]
  | { [key: string]: SiteraCustomValue };

/** Days of the week */
export type SiteraWeekday =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

/** Asset representing media files */
export interface SiteraAsset {
  id: string;
  url: string;
  alt: string;
  title?: string;
  description?: string;
  type: "image" | "video" | "document" | "audio";
  mimeType: string;
  width?: number;
  height?: number;
  duration?: number;
  size?: number;
  blurDataUrl?: string;
  thumbnailUrl?: string;
  metadata?: Record<string, string | number | boolean>;
}

/** Monetary value */
export interface SiteraMoney {
  amount: number;
  currency: string;
  formatted: string;
}

/** Monetary range */
export interface SiteraMoneyRange {
  min: SiteraMoney;
  max: SiteraMoney;
}

/** Call-to-action link */
export interface SiteraAction {
  label: string;
  href: string;
  target?: "_self" | "_blank";
  variant?: "primary" | "secondary" | "outline" | "ghost";
  icon?: string;
}

/** Business highlight / achievement */
export interface SiteraBusinessHighlight {
  icon?: string;
  label: string;
  value: string;
  description?: string;
}

/** Business statistic */
export interface SiteraBusinessStatistic {
  label: string;
  value: string;
  suffix?: string;
  icon?: string;
}

/** Certification */
export interface SiteraCertification {
  name: string;
  issuedBy?: string;
  issuedAt?: string;
  expiresAt?: string;
  url?: string;
}

/** Award */
export interface SiteraAward {
  name: string;
  issuedBy?: string;
  year?: number;
  description?: string;
}

/** License */
export interface SiteraLicense {
  name: string;
  number?: string;
  issuedBy?: string;
  issuedAt?: string;
  expiresAt?: string;
}

/** Custom external link */
export interface SiteraCustomLink {
  label: string;
  url: string;
  icon?: string;
}

/** Form field option */
export interface SiteraFormFieldOption {
  label: string;
  value: string;
}

/** Form field validation */
export interface SiteraFieldValidation {
  min?: number;
  max?: number;
  pattern?: string;
  message?: string;
}

/** SEO image */
export interface SiteraSEOImage {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
}

/** Structured data for SEO */
export interface SiteraStructuredData {
  type: string;
  data: Record<string, SiteraCustomValue>;
}

/** List query options */
export interface SiteraListOptions {
  limit?: number;
  offset?: number;
  search?: string;
  category?: string;
  featured?: boolean;
  available?: boolean;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
}

/** Paginated result */
export interface SiteraPaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

/** Section background */
export interface SiteraSectionBackground {
  type: "color" | "gradient" | "image";
  value: string;
  overlay?: string;
}

/** Section spacing */
export interface SiteraSectionSpacing {
  top?: string;
  bottom?: string;
}

/** Spacing scale */
export interface SiteraSpacingScale {
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
}

/** Border radius scale */
export interface SiteraBorderRadius {
  sm?: string;
  md?: string;
  lg?: string;
  full?: string;
}

/** Shadow scale */
export interface SiteraShadowScale {
  sm?: string;
  md?: string;
  lg?: string;
}

/** Facility */
export interface SiteraFacility {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  available: boolean;
}
