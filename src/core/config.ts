import type { SiteraClientConfig, ResolvedSiteraClientConfig, SiteraGeneratedDataConfig } from "../types/api.js";
import type { SiteraLocale, SiteraBusinessCategory } from "../types/common.js";
import { SiteraConfigurationError, SiteraUnsupportedLocaleError } from "./errors.js";

const SUPPORTED_LOCALES: readonly SiteraLocale[] = ["id-ID", "en-US", "en-GB", "ms-MY"];
const SUPPORTED_CATEGORIES: readonly SiteraBusinessCategory[] = [
  "restaurant", "cafe", "professional-service", "beauty", "education",
  "property", "healthcare", "automotive", "hospitality", "local-brand",
];

const DEFAULT_DATA_QUANTITIES: Required<SiteraGeneratedDataConfig> = {
  locations: 2, services: 8, products: 12, teamMembers: 6, testimonials: 8,
  faqs: 10, galleryItems: 16, promotions: 3, pages: 6,
};

/** Resolves and validates client configuration */
export function resolveConfig(config?: SiteraClientConfig): ResolvedSiteraClientConfig {
  const locale = config?.locale ?? "id-ID";
  if (!SUPPORTED_LOCALES.includes(locale)) {
    throw new SiteraUnsupportedLocaleError(locale);
  }

  const category = config?.category ?? "professional-service";
  if (!SUPPORTED_CATEGORIES.includes(category)) {
    throw new SiteraConfigurationError(`Category "${category}" is not supported.`, {
      details: { category, supported: [...SUPPORTED_CATEGORIES] },
    });
  }

  const seed = config?.seed ?? "default";

  const resolved: ResolvedSiteraClientConfig = {
    siteId: config?.siteId ?? `site_${normalizeSeed(seed)}`,
    businessId: config?.businessId ?? `biz_${normalizeSeed(seed)}`,
    locale,
    timezone: config?.timezone ?? "Asia/Jakarta",
    currency: config?.currency ?? "IDR",
    seed,
    category,
    debug: config?.debug ?? false,
    generatedData: {
      ...DEFAULT_DATA_QUANTITIES,
      ...config?.generatedData,
    },
  };

  return Object.freeze(resolved) as ResolvedSiteraClientConfig;
}

/** Normalize seed to a stable string */
export function normalizeSeed(seed: string | number): string {
  return String(seed).toLowerCase().replace(/[^a-z0-9-_]/g, "_").slice(0, 64);
}

/** Hash seed to a numeric value for Faker */
export function seedToNumber(seed: string | number): number {
  const str = String(seed);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash + char) | 0;
  }
  return Math.abs(hash);
}
