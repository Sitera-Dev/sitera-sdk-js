import type { SiteraBranding } from "../types/branding.js";

/** Convert branding to CSS custom properties */
export function createSiteraCssVariables(branding: SiteraBranding): Record<string, string> {
  const vars: Record<string, string> = {};
  const c = branding.colors;

  vars["--sitera-color-primary"] = c.primary;
  vars["--sitera-color-primary-foreground"] = c.primaryForeground;
  vars["--sitera-color-secondary"] = c.secondary;
  vars["--sitera-color-secondary-foreground"] = c.secondaryForeground;
  vars["--sitera-color-accent"] = c.accent;
  vars["--sitera-color-accent-foreground"] = c.accentForeground;
  vars["--sitera-color-background"] = c.background;
  vars["--sitera-color-foreground"] = c.foreground;
  vars["--sitera-color-surface"] = c.surface;
  vars["--sitera-color-surface-foreground"] = c.surfaceForeground;
  vars["--sitera-color-muted"] = c.muted;
  vars["--sitera-color-muted-foreground"] = c.mutedForeground;
  vars["--sitera-color-border"] = c.border;
  vars["--sitera-color-input"] = c.input;
  vars["--sitera-color-ring"] = c.ring;
  vars["--sitera-color-success"] = c.success;
  vars["--sitera-color-warning"] = c.warning;
  vars["--sitera-color-danger"] = c.danger;

  vars["--sitera-font-heading"] = branding.typography.headingFont;
  vars["--sitera-font-body"] = branding.typography.bodyFont;
  if (branding.typography.monospaceFont) {
    vars["--sitera-font-mono"] = branding.typography.monospaceFont;
  }
  if (branding.typography.baseFontSize) {
    vars["--sitera-font-size-base"] = branding.typography.baseFontSize;
  }
  if (branding.typography.lineHeight !== undefined) {
    vars["--sitera-line-height"] = String(branding.typography.lineHeight);
  }

  if (branding.borderRadius) {
    if (branding.borderRadius.sm) vars["--sitera-radius-sm"] = branding.borderRadius.sm;
    if (branding.borderRadius.md) vars["--sitera-radius-md"] = branding.borderRadius.md;
    if (branding.borderRadius.lg) vars["--sitera-radius-lg"] = branding.borderRadius.lg;
  }

  return vars;
}
