/** Error codes used throughout the SDK */
export const SITERA_ERROR_CODES = {
  UNKNOWN: "SITERA_UNKNOWN",
  CONFIGURATION: "SITERA_CONFIGURATION",
  VALIDATION: "SITERA_VALIDATION",
  PROVIDER: "SITERA_PROVIDER",
  NOT_FOUND: "SITERA_NOT_FOUND",
  UNSUPPORTED_LOCALE: "SITERA_UNSUPPORTED_LOCALE",
  UNSAFE_URL: "SITERA_UNSAFE_URL",
} as const;

/** Base error for all Sitera SDK errors */
export class SiteraError extends Error {
  readonly code: string;
  readonly details?: Record<string, unknown>;

  constructor(message: string, options?: { code?: string; details?: Record<string, unknown>; cause?: unknown }) {
    super(message, { cause: options?.cause });
    this.name = "SiteraError";
    this.code = options?.code ?? SITERA_ERROR_CODES.UNKNOWN;
    this.details = options?.details;
  }
}

export class SiteraConfigurationError extends SiteraError {
  constructor(message: string, options?: { details?: Record<string, unknown>; cause?: unknown }) {
    super(message, { code: SITERA_ERROR_CODES.CONFIGURATION, ...options });
    this.name = "SiteraConfigurationError";
  }
}

export class SiteraValidationError extends SiteraError {
  constructor(message: string, options?: { details?: Record<string, unknown>; cause?: unknown }) {
    super(message, { code: SITERA_ERROR_CODES.VALIDATION, ...options });
    this.name = "SiteraValidationError";
  }
}

export class SiteraProviderError extends SiteraError {
  constructor(message: string, options?: { details?: Record<string, unknown>; cause?: unknown }) {
    super(message, { code: SITERA_ERROR_CODES.PROVIDER, ...options });
    this.name = "SiteraProviderError";
  }
}

export class SiteraNotFoundError extends SiteraError {
  constructor(resource: string, identifier: string, options?: { cause?: unknown }) {
    super(`No ${resource} was found with ${identifier}.`, { code: SITERA_ERROR_CODES.NOT_FOUND, details: { resource, identifier }, ...options });
    this.name = "SiteraNotFoundError";
  }
}

export class SiteraUnsupportedLocaleError extends SiteraError {
  constructor(locale: string) {
    super(`Locale "${locale}" is not supported.`, { code: SITERA_ERROR_CODES.UNSUPPORTED_LOCALE, details: { locale } });
    this.name = "SiteraUnsupportedLocaleError";
  }
}

export class SiteraUnsafeUrlError extends SiteraError {
  constructor(url: string) {
    super(`URL "${url}" uses an unsafe scheme and was rejected.`, { code: SITERA_ERROR_CODES.UNSAFE_URL, details: { url } });
    this.name = "SiteraUnsafeUrlError";
  }
}
