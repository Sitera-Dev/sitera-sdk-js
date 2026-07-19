import { SiteraUnsafeUrlError } from "../core/errors.js";

const SAFE_SCHEMES = ["https:", "http:", "mailto:", "tel:"];
const UNSAFE_SCHEMES = ["javascript:", "data:", "vbscript:", "file:"];

/** Check if a URL uses a safe scheme */
export function isSafeUrl(url: string | undefined): boolean {
  if (!url) return false;
  const trimmed = url.trim().toLowerCase();
  if (trimmed.startsWith("/") || trimmed.startsWith("#")) return true;
  for (const scheme of UNSAFE_SCHEMES) {
    if (trimmed.startsWith(scheme)) return false;
  }
  for (const scheme of SAFE_SCHEMES) {
    if (trimmed.startsWith(scheme)) return true;
  }
  // Relative URLs without scheme
  if (!trimmed.includes(":")) return true;
  return false;
}

/** Assert that a URL is safe, throw if not */
export function assertSafeUrl(url: string): void {
  if (!isSafeUrl(url)) {
    throw new SiteraUnsafeUrlError(url);
  }
}

/** Normalize a URL by trimming whitespace */
export function normalizeUrl(url: string): string {
  return url.trim();
}

/** Check if a URL points to an external domain */
export function isExternalUrl(url: string, baseDomain?: string): boolean {
  const trimmed = url.trim();
  if (trimmed.startsWith("/") || trimmed.startsWith("#")) return false;
  try {
    const parsed = new URL(trimmed);
    if (baseDomain) {
      return parsed.hostname !== baseDomain;
    }
    return true;
  } catch {
    return false;
  }
}
