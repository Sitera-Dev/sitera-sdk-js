import { describe, it, expect } from "vitest";
import { 
  SiteraError, 
  SiteraConfigurationError, 
  SiteraValidationError, 
  SiteraProviderError, 
  SiteraNotFoundError, 
  SiteraUnsupportedLocaleError, 
  SiteraUnsafeUrlError 
} from "../../src/core/errors.js";

describe("core/errors", () => {
  it("base SiteraError works", () => {
    const err = new SiteraError("Base error", { code: "SITERA_ERR" });
    expect(err.code).toBe("SITERA_ERR");
    expect(err.message).toBe("Base error");
    expect(err.name).toBe("SiteraError");
  });

  it("SiteraConfigurationError", () => {
    const err = new SiteraConfigurationError("Bad config");
    expect(err.code).toBe("SITERA_CONFIGURATION");
  });

  it("SiteraValidationError", () => {
    const err = new SiteraValidationError("Invalid field", { details: { field: "email" } });
    expect(err.code).toBe("SITERA_VALIDATION");
    expect(err.details).toEqual({ field: "email" });
  });

  it("SiteraProviderError", () => {
    const err = new SiteraProviderError("Network failure", { details: { status: 500 } });
    expect(err.code).toBe("SITERA_PROVIDER");
    expect(err.details).toEqual({ status: 500 });
  });

  it("SiteraNotFoundError", () => {
    const err = new SiteraNotFoundError("service", "123");
    expect(err.code).toBe("SITERA_NOT_FOUND");
    expect(err.message).toContain("service");
    expect(err.message).toContain("123");
  });

  it("SiteraUnsupportedLocaleError", () => {
    const err = new SiteraUnsupportedLocaleError("fr-FR");
    expect(err.code).toBe("SITERA_UNSUPPORTED_LOCALE");
    expect(err.message).toContain("fr-FR");
  });

  it("SiteraUnsafeUrlError", () => {
    const err = new SiteraUnsafeUrlError("javascript:alert(1)");
    expect(err.code).toBe("SITERA_UNSAFE_URL");
    expect(err.message).toContain("javascript");
  });
});
