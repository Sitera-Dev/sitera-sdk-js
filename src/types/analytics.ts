import type { SiteraCustomValue } from "./common.js";

export interface SiteraAnalyticsSettings {
  enabled: boolean;
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
  metaPixelId?: string;
  tiktokPixelId?: string;
  custom?: Record<string, string>;
}

export interface SiteraIntegrationSettings {
  whatsapp?: { enabled: boolean; phone?: string; defaultMessage?: string };
  maps?: { enabled: boolean; provider?: "google-maps" | "openstreetmap" | "other" };
  booking?: import("./booking.js").SiteraBookingSettings;
  analytics?: SiteraAnalyticsSettings;
  custom?: Record<string, SiteraCustomValue>;
}
