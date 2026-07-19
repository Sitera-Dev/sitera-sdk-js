---
name: sitera-sdk-js
description: The official, stable, and framework-agnostic JavaScript/TypeScript SDK for the Sitera ecosystem.
---

# Sitera SDK

Welcome to the official Sitera SDK! This is the primary data access layer for building applications within the Sitera ecosystem. It is framework-agnostic and provides a strictly typed, Type-First API for interacting with the entire Sitera business model.

## Features

- **Framework Agnostic**: Works perfectly with Next.js, React, Vue, Svelte, or Vanilla JS.
- **Type-First API**: 100% written in TypeScript with comprehensive generics and strict types.
- **Unified Business Model**: Access configurations, products, services, locations, promotions, branding, SEO, and pages via a singular business context.
- **Deterministic**: Provides a highly deterministic and stable data access layer suitable for static generation (SSG) and server-side rendering (SSR).
- **Core Utilities**: Includes robust helpers for formatting currency, phone numbers, and safely handling URLs.

## Installation

```bash
npm install @sitera/sdk
# or
pnpm add @sitera/sdk
# or
yarn add @sitera/sdk
```

## Basic Usage

The SDK uses a client factory pattern to initialize the connection. 

### Initializing the Client

```typescript
import { createSiteraClient } from "@sitera/sdk";

// Initialize the client for a specific business
const client = createSiteraClient({
  siteId: "site_12345",
  businessId: "biz_12345",
  locale: "id-ID",
  category: "restaurant"
});
```

### Fetching Data

The SDK is broken down into intuitive modules:

```typescript
// 1. Get core business profile and branding
const business = await client.business.get();
const branding = await client.business.getBranding();

// 2. Fetch products and services
const products = await client.products.list({ limit: 10, featured: true });
const services = await client.services.listWithMeta({ sortBy: "order" });

// 3. Fetch locations and operating hours
const locations = await client.locations.list();
const primaryLocation = await client.locations.getPrimary();

// 4. Fetch pages for rendering the UI
const homePage = await client.pages.getBySlug("home");
```

### Snapshot Pattern

For SSG workflows (like Next.js `getStaticProps` or App Router), you can fetch the entire business snapshot in a single request:

```typescript
const snapshot = await client.getSnapshot();

// The snapshot contains all the data needed to render a full site
console.log(snapshot.business);
console.log(snapshot.navigation);
console.log(snapshot.pages);
```

## Helper Utilities

The SDK provides several utility functions out of the box:

```typescript
import { 
  formatMoney, 
  createMoney,
  isBusinessOpenNow, 
  createWhatsAppUrl,
  createSiteraCssVariables 
} from "@sitera/sdk";

// Money
const price = createMoney(50000, "IDR");
console.log(price.formatted); // "Rp50.000"

// Date & Time
const isOpen = isBusinessOpenNow(business.operatingHours);

// Phone
const waLink = createWhatsAppUrl({ 
  phone: business.contact.whatsapp, 
  message: "Halo, saya ingin bertanya" 
});

// Styling (Dynamically inject CSS variables based on business branding)
const cssVars = createSiteraCssVariables(business.branding);
```

## Error Handling

The SDK exposes specific error classes for granular error boundaries:

```typescript
import { SiteraNotFoundError, SiteraValidationError } from "@sitera/sdk";

try {
  await client.pages.getBySlug("does-not-exist");
} catch (error) {
  if (error instanceof SiteraNotFoundError) {
    console.error("Page was not found:", error.message);
  }
}
```

## Best Practices

1. **Client Initialization**: Initialize the client once per request or cache it globally to avoid unnecessary recreation overhead.
2. **Snapshot Usage**: If you are generating a static site, use `client.getSnapshot()` to fetch all data at build time instead of making individual module calls.
3. **Type Safety**: Always rely on the exported types (e.g., `SiteraProduct`, `SiteraService`, `SiteraPage`) rather than redeclaring them in your application.
