import type { SiteraAsset } from "./common.js";

export interface SiteraPaymentMethod {
  id: string;
  type: "cash" | "bank-transfer" | "qris" | "credit-card" | "debit-card" | "e-wallet" | "payment-link" | "marketplace" | "other";
  name: string;
  description?: string;
  icon?: SiteraAsset;
  enabled: boolean;
}
