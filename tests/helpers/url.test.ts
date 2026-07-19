import { describe, it, expect } from "vitest";
import { isSafeUrl, assertSafeUrl, normalizeUrl, isExternalUrl } from "../../src/helpers/url.js";
import { SiteraUnsafeUrlError } from "../../src/core/errors.js";

describe("url helpers", () => {
  it("normalizes URLs", () => {
    expect(normalizeUrl("  https://sitera.id  ")).toBe("https://sitera.id");
  });

  it("checks if URL is safe", () => {
    expect(isSafeUrl(undefined)).toBe(false);
    expect(isSafeUrl("https://sitera.id")).toBe(true);
    expect(isSafeUrl("http://example.com")).toBe(true);
    expect(isSafeUrl("mailto:info@sitera.id")).toBe(true);
    expect(isSafeUrl("tel:+628123456789")).toBe(true);
    expect(isSafeUrl("/about")).toBe(true);
    expect(isSafeUrl("#section")).toBe(true);
    
    // Unsafe
    expect(isSafeUrl("javascript:alert(1)")).toBe(false);
    expect(isSafeUrl("data:text/html,<html>")).toBe(false);
    expect(isSafeUrl("vbscript:msgbox()")).toBe(false);
    expect(isSafeUrl("file:///etc/passwd")).toBe(false);
  });

  it("asserts URL safety", () => {
    expect(() => assertSafeUrl("https://sitera.id")).not.toThrow();
    expect(() => assertSafeUrl("javascript:alert(1)")).toThrow(SiteraUnsafeUrlError);
  });

  it("checks if URL is external", () => {
    expect(isExternalUrl("/about", "sitera.id")).toBe(false);
    expect(isExternalUrl("#home", "sitera.id")).toBe(false);
    expect(isExternalUrl("https://google.com", "sitera.id")).toBe(true);
    expect(isExternalUrl("https://sitera.id/about", "sitera.id")).toBe(false);
    
    // Invalid URL fallback
    expect(isExternalUrl("invalid-url://@@")).toBe(false);
  });
});
