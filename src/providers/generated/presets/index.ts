import type { CategoryPreset } from "./restaurant.js";
import { restaurantPreset } from "./restaurant.js";
import { cafePreset } from "./cafe.js";
import { professionalServicePreset } from "./professional-service.js";
import { beautyPreset } from "./beauty.js";
import { educationPreset } from "./education.js";
import { propertyPreset } from "./property.js";
import { healthcarePreset } from "./healthcare.js";
import { automotivePreset } from "./automotive.js";
import { hospitalityPreset } from "./hospitality.js";
import { localBrandPreset } from "./local-brand.js";
import type { SiteraBusinessCategory } from "../../../types/common.js";

export type { CategoryPreset };

const PRESETS: Record<SiteraBusinessCategory, CategoryPreset> = {
  restaurant: restaurantPreset,
  cafe: cafePreset,
  "professional-service": professionalServicePreset,
  beauty: beautyPreset,
  education: educationPreset,
  property: propertyPreset,
  healthcare: healthcarePreset,
  automotive: automotivePreset,
  hospitality: hospitalityPreset,
  "local-brand": localBrandPreset,
};

export function getPreset(category: SiteraBusinessCategory): CategoryPreset {
  return PRESETS[category];
}
