/**
 * @module @sitera/sdk/types/location
 * Location and address types.
 */

import type { SiteraFacility } from "./common.js";
import type { SiteraBusinessContact } from "./contact.js";
import type { SiteraOperatingHours } from "./operating-hours.js";

/** Location type */
export type SiteraLocationType =
  | "head-office"
  | "branch"
  | "store"
  | "clinic"
  | "school"
  | "warehouse"
  | "service-area"
  | "other";

/** Address */
export interface SiteraAddress {
  street: string;
  building?: string;
  district?: string;
  subdistrict?: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  countryCode: string;
}

/** Geographic coordinates */
export interface SiteraCoordinates {
  latitude: number;
  longitude: number;
}

/** Physical location */
export interface SiteraLocation {
  id: string;
  name: string;
  type: SiteraLocationType;
  isPrimary: boolean;
  address: SiteraAddress;
  coordinates?: SiteraCoordinates;
  contact?: SiteraBusinessContact;
  operatingHours?: SiteraOperatingHours[];
  facilities?: SiteraFacility[];
  mapUrl?: string;
  directionsUrl?: string;
}

/** Location summary (embedded in business) */
export interface SiteraLocationSummary {
  id: string;
  name: string;
  type: SiteraLocationType;
  isPrimary: boolean;
  city: string;
  province: string;
}
