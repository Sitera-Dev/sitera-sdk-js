/**
 * @module @sitera/sdk/types/operating-hours
 * Operating hours types.
 */

import type { SiteraWeekday } from "./common.js";

/** A single operating period within a day */
export interface SiteraOperatingPeriod {
  open: string;
  close: string;
}

/** Operating hours for a specific day */
export interface SiteraOperatingHours {
  day: SiteraWeekday;
  enabled: boolean;
  periods: SiteraOperatingPeriod[];
  note?: string;
}
