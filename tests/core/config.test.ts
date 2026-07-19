import { describe, it, expect } from "vitest";
import { resolveConfig, seedToNumber } from "../../src/core/config.js";
import { SiteraConfigurationError, SiteraUnsupportedLocaleError } from "../../src/core/errors.js";

describe("core/config", () => {
  it("resolves config with defaults", () => {
    const config = resolveConfig();
    expect(config.siteId).toBeDefined();
    expect(config.businessId).toBeDefined();
    expect(config.locale).toBe("id-ID");
    expect(config.timezone).toBe("Asia/Jakarta");
    expect(config.currency).toBe("IDR");
    expect(config.category).toBe("professional-service");
    expect(config.seed).toBe("default");
  });

  it("accepts valid custom config", () => {
    const config = resolveConfig({
      siteId: "custom-site",
      locale: "en-US",
      category: "cafe",
      seed: 123
    });
    expect(config.siteId).toBe("custom-site");
    expect(config.locale).toBe("en-US");
    expect(config.category).toBe("cafe");
    expect(config.seed).toBe(123);
  });

  it("throws on unsupported locale", () => {
    expect(() => resolveConfig({ locale: "fr-FR" })).toThrow(SiteraUnsupportedLocaleError);
  });

  it("throws on invalid category", () => {
    // @ts-expect-error Testing runtime validation
    expect(() => resolveConfig({ category: "invalid-category" })).toThrow(SiteraConfigurationError);
  });

  it("converts seed to number consistently", () => {
    expect(seedToNumber(123)).toBe(48690); // String("123") hashed
    const n1 = seedToNumber("hello");
    const n2 = seedToNumber("hello");
    expect(n1).toBe(n2);
    expect(typeof n1).toBe("number");
  });
});
