/**
 * @module @sitera/sdk/types/branding
 * Branding and design token types.
 */

import type { SiteraAsset, SiteraSpacingScale, SiteraBorderRadius, SiteraShadowScale } from "./common.js";

/** Color palette */
export interface SiteraColorPalette {
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  accent: string;
  accentForeground: string;
  background: string;
  foreground: string;
  surface: string;
  surfaceForeground: string;
  muted: string;
  mutedForeground: string;
  border: string;
  input: string;
  ring: string;
  success: string;
  successForeground: string;
  warning: string;
  warningForeground: string;
  danger: string;
  dangerForeground: string;
}

/** Typography settings */
export interface SiteraTypography {
  headingFont: string;
  bodyFont: string;
  monospaceFont?: string;
  headingWeight?: number;
  bodyWeight?: number;
  baseFontSize?: string;
  lineHeight?: number;
  letterSpacing?: string;
}

/** Branding configuration */
export interface SiteraBranding {
  assets: {
    logo?: SiteraAsset;
    darkLogo?: SiteraAsset;
    icon?: SiteraAsset;
    favicon?: SiteraAsset;
    coverImage?: SiteraAsset;
    socialShareImage?: SiteraAsset;
  };
  colors: SiteraColorPalette;
  typography: SiteraTypography;
  spacing?: SiteraSpacingScale;
  borderRadius?: SiteraBorderRadius;
  shadows?: SiteraShadowScale;
  style:
    | "modern"
    | "minimal"
    | "professional"
    | "friendly"
    | "luxury"
    | "playful"
    | "industrial"
    | "editorial";
  customCss?: string;
}
