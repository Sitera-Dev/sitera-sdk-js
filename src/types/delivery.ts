import type { SiteraMoney } from "./common.js";

export interface SiteraDeliveryOption {
  id: string;
  type: "pickup" | "local-delivery" | "courier" | "digital-delivery" | "dine-in" | "shipping" | "other";
  name: string;
  description?: string;
  fee?: SiteraMoney;
  estimatedTime?: string;
  available: boolean;
}
