import { describe, it, expect } from "vitest";
import { normalizePhoneNumber, formatPhoneNumber, createWhatsAppUrl } from "../../src/helpers/phone.js";

describe("phone helpers", () => {
  it("normalizes phone numbers", () => {
    expect(normalizePhoneNumber(undefined)).toBe("");
    expect(normalizePhoneNumber("+62 812-3456-7890")).toBe("6281234567890");
    expect(normalizePhoneNumber("0812 3456 7890")).toBe("6281234567890");
    expect(normalizePhoneNumber("6281234567890")).toBe("6281234567890");
  });

  it("formats phone numbers", () => {
    expect(formatPhoneNumber(undefined)).toBe("");
    expect(formatPhoneNumber("081234567890")).toBe("+62 812-3456-7890");
    expect(formatPhoneNumber("+123456789")).toBe("+123456789"); // non-62 formatting fallback
  });

  it("creates WhatsApp URLs", () => {
    expect(createWhatsAppUrl({ phone: undefined })).toBe("");
    expect(createWhatsAppUrl({ phone: "081234567890" })).toBe("https://wa.me/6281234567890");
    expect(createWhatsAppUrl({ phone: "081234567890", message: "Hello World" })).toBe("https://wa.me/6281234567890?text=Hello%20World");
  });
});
