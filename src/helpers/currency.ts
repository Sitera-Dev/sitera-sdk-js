import type { SiteraMoney } from "../types/common.js";

/** Format a money value to a localized string */
export function formatMoney(money: SiteraMoney): string {
  return money.formatted;
}

/** Create a SiteraMoney object */
export function createMoney(amount: number, currency: string = "IDR"): SiteraMoney {
  return {
    amount,
    currency,
    formatted: formatAmount(amount, currency),
  };
}

/** Parse a formatted money string back to a SiteraMoney object */
export function parseMoney(formatted: string, currency: string = "IDR"): SiteraMoney {
  const cleaned = formatted.replace(/[^\d]/g, "");
  const amount = parseInt(cleaned, 10) || 0;
  return createMoney(amount, currency);
}

function formatAmount(amount: number, currency: string): string {
  if (currency === "IDR") {
    return `Rp${amount.toLocaleString("id-ID")}`;
  }
  if (currency === "USD") {
    return `$${(amount / 100).toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
  }
  return `${currency} ${amount.toLocaleString()}`;
}
