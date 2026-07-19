import { describe, it, expect } from "vitest";
import { createSiteraCssVariables } from "../../src/helpers/business.js";
import type { SiteraBranding } from "../../src/types/branding.js";

const mockBranding: SiteraBranding = {
  colors: {
    primary: "#ff0000",
    primaryForeground: "#ffffff",
    secondary: "#00ff00",
    secondaryForeground: "#ffffff",
    accent: "#0000ff",
    accentForeground: "#ffffff",
    background: "#ffffff",
    foreground: "#000000",
    surface: "#f0f0f0",
    surfaceForeground: "#111111",
    muted: "#cccccc",
    mutedForeground: "#666666",
    border: "#eeeeee",
    input: "#dddddd",
    ring: "#ff0000",
    success: "#00cc00",
    successForeground: "#ffffff",
    warning: "#cccc00",
    warningForeground: "#ffffff",
    danger: "#cc0000",
    dangerForeground: "#ffffff",
  },
  typography: {
    headingFont: "Roboto",
    bodyFont: "Open Sans",
    monospaceFont: "Fira Code",
    baseFontSize: "16px",
    lineHeight: 1.5,
  },
  borderRadius: {
    sm: "4px",
    md: "8px",
    lg: "16px",
  },
  style: "modern",
  assets: {}
};

describe("business helpers", () => {
  it("creates CSS variables from branding", () => {
    const vars = createSiteraCssVariables(mockBranding);
    
    // Colors
    expect(vars["--sitera-color-primary"]).toBe("#ff0000");
    expect(vars["--sitera-color-background"]).toBe("#ffffff");
    expect(vars["--sitera-color-ring"]).toBe("#ff0000");

    // Typography
    expect(vars["--sitera-font-heading"]).toBe("Roboto");
    expect(vars["--sitera-font-body"]).toBe("Open Sans");
    expect(vars["--sitera-font-mono"]).toBe("Fira Code");
    expect(vars["--sitera-font-size-base"]).toBe("16px");
    expect(vars["--sitera-line-height"]).toBe("1.5");

    // Radius
    expect(vars["--sitera-radius-sm"]).toBe("4px");
    expect(vars["--sitera-radius-md"]).toBe("8px");
    expect(vars["--sitera-radius-lg"]).toBe("16px");
  });
});
