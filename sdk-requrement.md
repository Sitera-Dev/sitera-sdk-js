# Build Sitera Framework-Agnostic JavaScript/TypeScript SDK

You are a senior TypeScript library engineer and SDK architect.

Your task is to design and implement the official **Sitera JavaScript SDK**, a framework-agnostic library that allows developers to access complete business information managed by the Sitera platform.

The SDK must be usable in:

* Plain JavaScript
* TypeScript
* Node.js
* Bun
* Deno where technically possible
* Browser applications
* Next.js
* React
* Vue
* Nuxt
* Svelte
* Astro
* Express
* Hono
* Any modern JavaScript runtime that supports standard ES modules

The SDK must not depend on React, Vue, Next.js, or any other UI framework.

For the initial implementation, the SDK must generate realistic business data internally using Faker. However, the public API must be designed as if the data comes from the real Sitera API.

The mock implementation must be completely isolated behind an internal data provider so it can later be replaced by an HTTP API provider without changing the public SDK API.

The final package name should be:

```text
@sitera/sdk
```

The first release version should be:

```text
0.1.0
```

---

# 1. Product Context

Sitera is a platform for creating and deploying websites for businesses.

Sitera stores all information required by a website, including:

* Business identity
* Business profile
* Contact information
* Locations
* Operating hours
* Branding
* Social media
* SEO
* Services
* Products
* Team members
* Testimonials
* Frequently asked questions
* Galleries
* Promotions
* Navigation
* Pages
* Structured content sections
* Business settings
* Legal information
* Payment information
* Booking configuration
* Delivery options
* Analytics configuration
* Custom metadata

A developer should be able to install the SDK and immediately receive complete, realistic, strongly typed business data.

Minimal usage:

```ts
import { createSiteraClient } from "@sitera/sdk";

const sitera = createSiteraClient();

const business = await sitera.business.get();

console.log(business.name);
```

Direct helper usage should also be supported:

```ts
import { getBusiness } from "@sitera/sdk";

const business = await getBusiness();
```

---

# 2. Main Objectives

Build a production-quality SDK with:

* Framework-agnostic architecture
* TypeScript-first public API
* JavaScript compatibility
* ESM support
* Optional CommonJS support if it does not add unnecessary complexity
* Zero UI dependencies
* Complete business data models
* Realistic generated sample data
* Seeded deterministic data generation
* Multiple business category presets
* Customizable locale
* Configurable data provider architecture
* Clear error handling
* Strong public types
* Minimal bundle size
* Tree-shakeable exports
* Complete documentation
* Comprehensive tests
* A production-ready `SKILL.md`

The SDK must be usable immediately after installation without requiring environment variables or a backend.

---

# 3. Package Structure

Use this recommended structure:

```text
packages/
  sdk/
    src/
      client/
        create-sitera-client.ts
        sitera-client.ts
        modules/
          business.ts
          services.ts
          products.ts
          team.ts
          testimonials.ts
          faq.ts
          gallery.ts
          promotions.ts
          pages.ts
          navigation.ts
          locations.ts
          settings.ts
      core/
        config.ts
        constants.ts
        errors.ts
        identifiers.ts
        locale.ts
        logger.ts
        utilities.ts
        validators.ts
      providers/
        data-provider.ts
        generated/
          generated-provider.ts
          generators/
            business-generator.ts
            service-generator.ts
            product-generator.ts
            team-generator.ts
            testimonial-generator.ts
            faq-generator.ts
            gallery-generator.ts
            promotion-generator.ts
            page-generator.ts
            navigation-generator.ts
            location-generator.ts
            branding-generator.ts
            seo-generator.ts
          presets/
            restaurant.ts
            cafe.ts
            professional-service.ts
            beauty.ts
            education.ts
            property.ts
            healthcare.ts
            automotive.ts
            hospitality.ts
            local-brand.ts
      types/
        common.ts
        business.ts
        contact.ts
        location.ts
        operating-hours.ts
        branding.ts
        seo.ts
        social.ts
        service.ts
        product.ts
        team.ts
        testimonial.ts
        faq.ts
        gallery.ts
        promotion.ts
        page.ts
        navigation.ts
        settings.ts
        legal.ts
        payment.ts
        booking.ts
        analytics.ts
        custom-data.ts
        api.ts
        provider.ts
        index.ts
      helpers/
        business.ts
        contact.ts
        currency.ts
        date.ts
        phone.ts
        url.ts
        section.ts
      index.ts
      browser.ts
      node.ts
    tests/
    examples/
      vanilla-js/
      typescript/
      node/
    package.json
    tsconfig.json
    tsup.config.ts
    vitest.config.ts
    README.md
    CHANGELOG.md
    SKILL.md
```

The public API must not expose internal generated-provider implementation details.

---

# 4. Public SDK Configuration

Create this configuration interface:

```ts
export interface SiteraClientConfig {
  siteId?: string;
  businessId?: string;
  locale?: SiteraLocale;
  timezone?: string;
  currency?: string;
  seed?: string | number;
  category?: SiteraBusinessCategory;
  debug?: boolean;
  provider?: SiteraDataProvider;
}
```

Default configuration:

```ts
{
  locale: "id-ID",
  timezone: "Asia/Jakarta",
  currency: "IDR",
  category: "professional-service",
  debug: false
}
```

Create the client:

```ts
const sitera = createSiteraClient({
  seed: "demo-business",
  category: "restaurant",
  locale: "id-ID",
});
```

The same seed and configuration must always produce the same business data.

Example:

```ts
const first = createSiteraClient({
  seed: "acme",
});

const second = createSiteraClient({
  seed: "acme",
});

const firstBusiness = await first.business.get();
const secondBusiness = await second.business.get();

expect(firstBusiness).toEqual(secondBusiness);
```

Different seeds should produce different data.

---

# 5. Supported Business Categories

Support these initial category presets:

```ts
export type SiteraBusinessCategory =
  | "restaurant"
  | "cafe"
  | "professional-service"
  | "beauty"
  | "education"
  | "property"
  | "healthcare"
  | "automotive"
  | "hospitality"
  | "local-brand";
```

Each category must produce relevant business information.

Examples:

## Restaurant

* Restaurant name
* Cuisine types
* Menu categories
* Food products
* Reservation settings
* Delivery options
* Dining facilities
* Opening hours
* Food gallery
* Promotions

## Cafe

* Coffee menu
* Beverage menu
* Workspace facilities
* Wi-Fi availability
* Indoor and outdoor seating
* Reservation options
* Delivery links

## Professional Service

* Consulting services
* Service packages
* Team members
* Certifications
* Experience
* Consultation booking
* Portfolio
* Client testimonials

## Beauty

* Treatments
* Treatment duration
* Beauty professionals
* Booking settings
* Before-after gallery
* Packages
* Promotions

## Education

* Programs
* Courses
* Teachers
* Enrollment information
* Facilities
* Academic calendar
* Registration calls to action

## Property

* Property listings
* Unit types
* Prices
* Facilities
* Location details
* Agent contacts
* Property gallery
* Booking or survey configuration

## Healthcare

* Medical services
* Practitioners
* Specializations
* Practice schedules
* Booking configuration
* Facilities
* Patient information

Do not generate misleading medical claims.

## Automotive

* Vehicle services
* Supported vehicle types
* Workshop facilities
* Service packages
* Booking settings
* Before-after gallery

## Hospitality

* Room types
* Amenities
* Check-in and check-out information
* Booking configuration
* Nearby attractions
* Room gallery

## Local Brand

* Physical or digital products
* Product categories
* Marketplace links
* Reseller information
* Brand story
* Promotions
* Catalog

---

# 6. Main Client API

Create a modular API.

```ts
const sitera = createSiteraClient();
```

The client must expose:

```ts
interface SiteraClient {
  business: SiteraBusinessModule;
  services: SiteraServiceModule;
  products: SiteraProductModule;
  team: SiteraTeamModule;
  testimonials: SiteraTestimonialModule;
  faq: SiteraFAQModule;
  gallery: SiteraGalleryModule;
  promotions: SiteraPromotionModule;
  pages: SiteraPageModule;
  navigation: SiteraNavigationModule;
  locations: SiteraLocationModule;
  settings: SiteraSettingsModule;

  getSnapshot(): Promise<SiteraBusinessSnapshot>;
  getConfig(): Readonly<ResolvedSiteraClientConfig>;
}
```

Example:

```ts
const snapshot = await sitera.getSnapshot();
```

The snapshot must contain all business information in one response.

```ts
export interface SiteraBusinessSnapshot {
  business: SiteraBusiness;
  locations: SiteraLocation[];
  services: SiteraService[];
  products: SiteraProduct[];
  team: SiteraTeamMember[];
  testimonials: SiteraTestimonial[];
  faqs: SiteraFAQ[];
  gallery: SiteraGalleryItem[];
  promotions: SiteraPromotion[];
  pages: SiteraPage[];
  navigation: SiteraNavigation;
  settings: SiteraSiteSettings;
  generatedAt: string;
}
```

---

# 7. Business Module

Provide:

```ts
const business = await sitera.business.get();
```

Interface:

```ts
export interface SiteraBusinessModule {
  get(): Promise<SiteraBusiness>;
  getIdentity(): Promise<SiteraBusinessIdentity>;
  getContact(): Promise<SiteraBusinessContact>;
  getBranding(): Promise<SiteraBranding>;
  getSEO(): Promise<SiteraSEO>;
  getSocialLinks(): Promise<SiteraSocialLinks>;
  getOperatingHours(): Promise<SiteraOperatingHours[]>;
  getLegalInformation(): Promise<SiteraLegalInformation>;
}
```

---

# 8. Complete Business Model

Create a highly detailed business model.

```ts
export interface SiteraBusiness {
  id: string;
  siteId: string;

  name: string;
  legalName?: string;
  slug: string;
  tagline?: string;
  shortDescription?: string;
  description?: string;
  story?: string;

  category: SiteraBusinessCategory;
  subcategory?: string;
  industry?: string;
  businessType?: SiteraBusinessType;

  establishedYear?: number;
  employeeCount?: number;
  serviceArea?: string[];

  identity: SiteraBusinessIdentity;
  contact: SiteraBusinessContact;
  locations: SiteraLocationSummary[];
  operatingHours: SiteraOperatingHours[];
  socialLinks: SiteraSocialLinks;
  branding: SiteraBranding;
  seo: SiteraSEO;
  legal: SiteraLegalInformation;
  settings: SiteraBusinessSettings;

  highlights: SiteraBusinessHighlight[];
  statistics: SiteraBusinessStatistic[];
  certifications: SiteraCertification[];
  awards: SiteraAward[];
  paymentMethods: SiteraPaymentMethod[];
  deliveryOptions: SiteraDeliveryOption[];
  facilities: SiteraFacility[];
  languages: string[];

  status: "draft" | "published" | "inactive";
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}
```

---

# 9. Business Identity

```ts
export interface SiteraBusinessIdentity {
  logo?: SiteraAsset;
  icon?: SiteraAsset;
  favicon?: SiteraAsset;
  coverImage?: SiteraAsset;
  squareImage?: SiteraAsset;
  brandName: string;
  legalName?: string;
  registrationNumber?: string;
  taxNumber?: string;
}
```

---

# 10. Contact Information

```ts
export interface SiteraBusinessContact {
  email?: string;
  secondaryEmail?: string;
  phone?: string;
  secondaryPhone?: string;
  whatsapp?: string;
  fax?: string;

  contactPerson?: {
    name: string;
    role?: string;
    email?: string;
    phone?: string;
  };

  support?: {
    email?: string;
    phone?: string;
    whatsapp?: string;
    availableHours?: string;
  };
}
```

All generated phone numbers must use valid-looking formats.

For Indonesian locale:

```text
+62
```

Provide normalized values without spaces where appropriate.

---

# 11. Location Model

```ts
export interface SiteraLocation {
  id: string;
  name: string;
  type:
    | "head-office"
    | "branch"
    | "store"
    | "clinic"
    | "school"
    | "warehouse"
    | "service-area"
    | "other";

  isPrimary: boolean;

  address: {
    street: string;
    building?: string;
    district?: string;
    subdistrict?: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
    countryCode: string;
  };

  coordinates?: {
    latitude: number;
    longitude: number;
  };

  contact?: SiteraBusinessContact;
  operatingHours?: SiteraOperatingHours[];
  facilities?: SiteraFacility[];
  mapUrl?: string;
  directionsUrl?: string;
}
```

Location generators must generate internally consistent Indonesian addresses for `id-ID`.

Do not mix unrelated city and province combinations.

---

# 12. Operating Hours

```ts
export type SiteraWeekday =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";
```

```ts
export interface SiteraOperatingHours {
  day: SiteraWeekday;
  enabled: boolean;
  periods: SiteraOperatingPeriod[];
  note?: string;
}
```

```ts
export interface SiteraOperatingPeriod {
  open: string;
  close: string;
}
```

Support:

* Closed days
* Split operating hours
* 24-hour operation
* Special notes

Provide helper:

```ts
isBusinessOpenNow(business.operatingHours, {
  timezone: business.settings.timezone,
});
```

Provide:

```ts
getTodayOperatingHours();
getNextOpeningTime();
formatOperatingHours();
```

Helpers must be deterministic and testable by accepting an optional current date.

---

# 13. Social Links

```ts
export interface SiteraSocialLinks {
  website?: string;
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  youtube?: string;
  linkedin?: string;
  x?: string;
  threads?: string;
  telegram?: string;
  whatsapp?: string;

  marketplaces?: SiteraMarketplaceLink[];
  custom?: SiteraCustomLink[];
}
```

```ts
export interface SiteraMarketplaceLink {
  platform:
    | "tokopedia"
    | "shopee"
    | "lazada"
    | "blibli"
    | "gofood"
    | "grabfood"
    | "traveloka"
    | "tiket"
    | "other";

  label: string;
  url: string;
}
```

All generated URLs must be valid and safe.

---

# 14. Branding Model

```ts
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
```

Color palette:

```ts
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
```

Typography:

```ts
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
```

Generate accessible color pairs with reasonable contrast.

Provide helper:

```ts
createSiteraCssVariables(branding);
```

Output:

```ts
{
  "--sitera-color-primary": "#...",
  "--sitera-color-primary-foreground": "#...",
  "--sitera-color-background": "#...",
  "--sitera-font-heading": "...",
  "--sitera-font-body": "...",
}
```

The output must be compatible with plain DOM styling and common frontend frameworks.

---

# 15. Asset Model

```ts
export interface SiteraAsset {
  id: string;
  url: string;
  alt: string;
  title?: string;
  description?: string;

  type: "image" | "video" | "document" | "audio";
  mimeType: string;

  width?: number;
  height?: number;
  duration?: number;
  size?: number;

  blurDataUrl?: string;
  thumbnailUrl?: string;

  metadata?: Record<string, string | number | boolean>;
}
```

Use stable placeholder image URLs or generated data URLs.

Do not require internet access for tests.

Tests must not depend on external image availability.

---

# 16. SEO Model

```ts
export interface SiteraSEO {
  title: string;
  titleTemplate?: string;
  description: string;
  keywords: string[];

  canonicalUrl?: string;

  robots: {
    index: boolean;
    follow: boolean;
    noArchive?: boolean;
    noImageIndex?: boolean;
  };

  openGraph: {
    title: string;
    description: string;
    type: "website" | "article" | "business.business";
    url?: string;
    siteName?: string;
    images: SiteraSEOImage[];
    locale?: string;
  };

  twitter: {
    card: "summary" | "summary_large_image";
    title: string;
    description: string;
    images: string[];
    site?: string;
    creator?: string;
  };

  structuredData?: SiteraStructuredData[];
}
```

Generate relevant structured-data objects for the selected business category.

Examples:

* LocalBusiness
* Restaurant
* CafeOrCoffeeShop
* ProfessionalService
* BeautySalon
* EducationalOrganization
* RealEstateAgent
* MedicalBusiness
* AutoRepair
* Hotel

Structured data must be JSON-serializable.

---

# 17. Services

```ts
export interface SiteraService {
  id: string;
  slug: string;
  name: string;
  shortDescription?: string;
  description?: string;

  category?: string;
  image?: SiteraAsset;
  gallery?: SiteraAsset[];

  price?: SiteraMoney;
  priceRange?: SiteraMoneyRange;
  pricingType:
    | "fixed"
    | "starting-from"
    | "hourly"
    | "daily"
    | "custom"
    | "free";

  duration?: {
    value: number;
    unit: "minute" | "hour" | "day" | "week";
  };

  features: string[];
  benefits?: string[];
  requirements?: string[];

  available: boolean;
  featured: boolean;
  order: number;

  callToAction?: SiteraAction;
  metadata?: Record<string, SiteraCustomValue>;
}
```

Module:

```ts
interface SiteraServiceModule {
  list(options?: SiteraListOptions): Promise<SiteraService[]>;
  getById(id: string): Promise<SiteraService>;
  getBySlug(slug: string): Promise<SiteraService>;
  getFeatured(): Promise<SiteraService[]>;
  getCategories(): Promise<string[]>;
}
```

---

# 18. Products

```ts
export interface SiteraProduct {
  id: string;
  sku?: string;
  slug: string;
  name: string;

  shortDescription?: string;
  description?: string;

  category: string;
  subcategory?: string;
  tags: string[];

  images: SiteraAsset[];

  price: SiteraMoney;
  compareAtPrice?: SiteraMoney;
  priceRange?: SiteraMoneyRange;

  stock?: {
    status: "in-stock" | "low-stock" | "out-of-stock" | "preorder";
    quantity?: number;
  };

  variants?: SiteraProductVariant[];

  featured: boolean;
  available: boolean;
  order: number;

  marketplaceLinks?: SiteraMarketplaceLink[];
  callToAction?: SiteraAction;

  metadata?: Record<string, SiteraCustomValue>;
}
```

Product variants:

```ts
export interface SiteraProductVariant {
  id: string;
  name: string;
  sku?: string;
  options: Record<string, string>;
  price?: SiteraMoney;
  available: boolean;
}
```

---

# 19. Money Types

```ts
export interface SiteraMoney {
  amount: number;
  currency: string;
  formatted: string;
}
```

```ts
export interface SiteraMoneyRange {
  min: SiteraMoney;
  max: SiteraMoney;
}
```

Provide helpers:

```ts
formatMoney();
createMoney();
parseMoney();
```

Do not use floating-point values for currency storage.

Store amounts using the smallest currency unit.

For IDR, amount is stored in rupiah because IDR has no minor decimal denomination in common usage.

Document this behavior clearly.

---

# 20. Team Members

```ts
export interface SiteraTeamMember {
  id: string;
  name: string;
  role: string;
  department?: string;
  biography?: string;
  image?: SiteraAsset;

  specializations?: string[];
  certifications?: SiteraCertification[];
  experienceYears?: number;
  languages?: string[];

  contact?: {
    email?: string;
    phone?: string;
  };

  socialLinks?: Partial<SiteraSocialLinks>;

  schedule?: SiteraOperatingHours[];
  featured: boolean;
  order: number;
}
```

For healthcare presets, generate practitioners.

For education presets, generate teachers or instructors.

For property presets, generate agents.

For beauty presets, generate stylists or therapists.

---

# 21. Testimonials

```ts
export interface SiteraTestimonial {
  id: string;
  customerName: string;
  customerRole?: string;
  customerCompany?: string;
  customerImage?: SiteraAsset;

  content: string;
  rating?: number;

  source?:
    | "google"
    | "facebook"
    | "marketplace"
    | "internal"
    | "other";

  sourceUrl?: string;
  serviceId?: string;
  productId?: string;

  featured: boolean;
  publishedAt?: string;
}
```

Ratings must be within:

```text
1 to 5
```

Do not generate impossible values.

---

# 22. Frequently Asked Questions

```ts
export interface SiteraFAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
  featured: boolean;
  order: number;
}
```

Generate category-specific questions.

Examples:

Restaurant:

* Reservation
* Halal information
* Delivery
* Group booking

Education:

* Registration
* Tuition
* Schedule
* Certification

Property:

* Unit availability
* Mortgage
* Survey
* Legal documents

---

# 23. Gallery

```ts
export interface SiteraGalleryItem {
  id: string;
  title?: string;
  description?: string;

  asset: SiteraAsset;

  category?: string;
  tags?: string[];

  featured: boolean;
  order: number;

  beforeAfter?: {
    before: SiteraAsset;
    after: SiteraAsset;
  };
}
```

Before-after data should primarily be generated for relevant categories such as:

* Beauty
* Automotive
* Property renovation
* Professional design services

---

# 24. Promotions

```ts
export interface SiteraPromotion {
  id: string;
  slug: string;
  name: string;
  headline?: string;
  description?: string;

  type:
    | "discount"
    | "cashback"
    | "bundle"
    | "free-item"
    | "limited-offer"
    | "custom";

  image?: SiteraAsset;

  discount?: {
    type: "percentage" | "fixed";
    value: number;
    maximumAmount?: SiteraMoney;
  };

  code?: string;

  startAt: string;
  endAt: string;

  terms?: string[];
  applicableServiceIds?: string[];
  applicableProductIds?: string[];

  active: boolean;
  featured: boolean;

  callToAction?: SiteraAction;
}
```

Generated promotion dates must be logically valid.

`endAt` must always be after `startAt`.

---

# 25. Pages and Structured Sections

```ts
export interface SiteraPage {
  id: string;
  slug: string;
  title: string;
  description?: string;

  type:
    | "home"
    | "about"
    | "services"
    | "products"
    | "contact"
    | "gallery"
    | "team"
    | "faq"
    | "custom";

  status: "draft" | "published";

  seo: SiteraSEO;
  sections: SiteraSection[];

  order: number;
  createdAt: string;
  updatedAt: string;
}
```

Base section:

```ts
export interface SiteraBaseSection {
  id: string;
  type: string;
  name?: string;
  enabled: boolean;
  order: number;
  anchor?: string;
  background?: SiteraSectionBackground;
  spacing?: SiteraSectionSpacing;
  metadata?: Record<string, SiteraCustomValue>;
}
```

Supported section types:

```ts
export type SiteraSection =
  | SiteraHeroSection
  | SiteraAboutSection
  | SiteraServicesSection
  | SiteraProductsSection
  | SiteraStatisticsSection
  | SiteraFeaturesSection
  | SiteraTeamSection
  | SiteraTestimonialsSection
  | SiteraGallerySection
  | SiteraFAQSection
  | SiteraPromotionSection
  | SiteraContactSection
  | SiteraLocationSection
  | SiteraCTASection
  | SiteraLogoCloudSection
  | SiteraCustomSection;
```

Hero:

```ts
export interface SiteraHeroSection extends SiteraBaseSection {
  type: "hero";
  content: {
    eyebrow?: string;
    title: string;
    highlightedText?: string;
    description?: string;
    primaryAction?: SiteraAction;
    secondaryAction?: SiteraAction;
    image?: SiteraAsset;
    backgroundImage?: SiteraAsset;
    badges?: string[];
  };
}
```

About:

```ts
export interface SiteraAboutSection extends SiteraBaseSection {
  type: "about";
  content: {
    eyebrow?: string;
    title: string;
    description: string;
    image?: SiteraAsset;
    highlights?: SiteraBusinessHighlight[];
    action?: SiteraAction;
  };
}
```

Services section:

```ts
export interface SiteraServicesSection extends SiteraBaseSection {
  type: "services";
  content: {
    eyebrow?: string;
    title: string;
    description?: string;
    serviceIds: string[];
    layout?: "grid" | "list" | "carousel";
    action?: SiteraAction;
  };
}
```

Products section:

```ts
export interface SiteraProductsSection extends SiteraBaseSection {
  type: "products";
  content: {
    eyebrow?: string;
    title: string;
    description?: string;
    productIds: string[];
    layout?: "grid" | "list" | "carousel";
    action?: SiteraAction;
  };
}
```

Custom section:

```ts
export interface SiteraCustomSection extends SiteraBaseSection {
  type: "custom";
  content: Record<string, SiteraCustomValue>;
}
```

Provide helpers:

```ts
getSection(page, "hero");
getSections(page, "services");
sortSections(page.sections);
getEnabledSections(page.sections);
```

---

# 26. Navigation

```ts
export interface SiteraNavigation {
  header: SiteraNavigationItem[];
  footer: SiteraNavigationGroup[];
  social?: SiteraNavigationItem[];
}
```

```ts
export interface SiteraNavigationItem {
  id: string;
  label: string;
  href: string;
  target?: "_self" | "_blank";
  icon?: string;
  children?: SiteraNavigationItem[];
  order: number;
  visible: boolean;
}
```

```ts
export interface SiteraNavigationGroup {
  id: string;
  title?: string;
  items: SiteraNavigationItem[];
  order: number;
}
```

Navigation URLs must reject unsafe schemes:

```text
javascript:
data:
vbscript:
```

---

# 27. Booking Configuration

```ts
export interface SiteraBookingSettings {
  enabled: boolean;

  mode:
    | "appointment"
    | "reservation"
    | "consultation"
    | "property-visit"
    | "room-booking"
    | "class-registration"
    | "custom";

  channels: Array<
    "website" | "whatsapp" | "phone" | "email" | "external"
  >;

  externalUrl?: string;

  minimumAdvanceMinutes?: number;
  maximumAdvanceDays?: number;
  slotDurationMinutes?: number;

  requireConfirmation?: boolean;
  requireDeposit?: boolean;

  fields: SiteraFormField[];
}
```

---

# 28. Form Fields

```ts
export interface SiteraFormField {
  id: string;
  name: string;
  label: string;

  type:
    | "text"
    | "email"
    | "phone"
    | "textarea"
    | "number"
    | "date"
    | "time"
    | "select"
    | "checkbox"
    | "radio";

  placeholder?: string;
  required: boolean;
  options?: SiteraFormFieldOption[];
  validation?: SiteraFieldValidation;
  order: number;
}
```

---

# 29. Payment Methods

```ts
export interface SiteraPaymentMethod {
  id: string;

  type:
    | "cash"
    | "bank-transfer"
    | "qris"
    | "credit-card"
    | "debit-card"
    | "e-wallet"
    | "payment-link"
    | "marketplace"
    | "other";

  name: string;
  description?: string;
  icon?: SiteraAsset;
  enabled: boolean;
}
```

Generate category-relevant payment methods.

---

# 30. Delivery Options

```ts
export interface SiteraDeliveryOption {
  id: string;

  type:
    | "pickup"
    | "local-delivery"
    | "courier"
    | "digital-delivery"
    | "dine-in"
    | "shipping"
    | "other";

  name: string;
  description?: string;

  fee?: SiteraMoney;
  estimatedTime?: string;

  available: boolean;
}
```

---

# 31. Facilities

```ts
export interface SiteraFacility {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  available: boolean;
}
```

Examples:

* Wi-Fi
* Parking
* Wheelchair access
* Prayer room
* Air conditioning
* Child-friendly area
* Meeting room
* Outdoor seating
* Toilet
* Delivery
* Pickup
* Generator
* CCTV

Generate relevant facilities based on category.

---

# 32. Legal Information

```ts
export interface SiteraLegalInformation {
  legalName?: string;
  registrationNumber?: string;
  taxNumber?: string;

  licenses?: SiteraLicense[];
  certifications?: SiteraCertification[];

  privacyPolicyUrl?: string;
  termsUrl?: string;
  refundPolicyUrl?: string;

  disclaimer?: string;
}
```

Do not generate real legal identifiers belonging to actual businesses.

Use clearly synthetic but valid-looking identifiers.

---

# 33. Analytics and Integrations

```ts
export interface SiteraAnalyticsSettings {
  enabled: boolean;

  googleAnalyticsId?: string;
  googleTagManagerId?: string;
  metaPixelId?: string;
  tiktokPixelId?: string;

  custom?: Record<string, string>;
}
```

```ts
export interface SiteraIntegrationSettings {
  whatsapp?: {
    enabled: boolean;
    phone?: string;
    defaultMessage?: string;
  };

  maps?: {
    enabled: boolean;
    provider?: "google-maps" | "openstreetmap" | "other";
  };

  booking?: SiteraBookingSettings;

  analytics?: SiteraAnalyticsSettings;

  custom?: Record<string, SiteraCustomValue>;
}
```

Generated IDs must be fake and clearly non-production.

---

# 34. Site Settings

```ts
export interface SiteraSiteSettings {
  locale: SiteraLocale;
  timezone: string;
  currency: string;

  domain?: string;
  customDomain?: string;

  dateFormat: string;
  timeFormat: "12-hour" | "24-hour";

  integrations: SiteraIntegrationSettings;

  features: {
    services: boolean;
    products: boolean;
    booking: boolean;
    contactForm: boolean;
    testimonials: boolean;
    gallery: boolean;
    team: boolean;
    promotions: boolean;
    multiLocation: boolean;
  };

  accessibility?: {
    reduceMotion?: boolean;
    highContrast?: boolean;
  };

  custom?: Record<string, SiteraCustomValue>;
}
```

---

# 35. Generic Custom Data

Create JSON-safe custom value types.

```ts
export type SiteraPrimitive = string | number | boolean | null;

export type SiteraCustomValue =
  | SiteraPrimitive
  | SiteraCustomValue[]
  | {
      [key: string]: SiteraCustomValue;
    };
```

Do not use `any`.

---

# 36. Data Provider Architecture

Create a provider interface so the generated provider can later be replaced by an HTTP provider.

```ts
export interface SiteraDataProvider {
  getBusiness(
    context: SiteraProviderContext
  ): Promise<SiteraBusiness>;

  getServices(
    context: SiteraProviderContext
  ): Promise<SiteraService[]>;

  getProducts(
    context: SiteraProviderContext
  ): Promise<SiteraProduct[]>;

  getTeam(
    context: SiteraProviderContext
  ): Promise<SiteraTeamMember[]>;

  getTestimonials(
    context: SiteraProviderContext
  ): Promise<SiteraTestimonial[]>;

  getFAQs(
    context: SiteraProviderContext
  ): Promise<SiteraFAQ[]>;

  getGallery(
    context: SiteraProviderContext
  ): Promise<SiteraGalleryItem[]>;

  getPromotions(
    context: SiteraProviderContext
  ): Promise<SiteraPromotion[]>;

  getPages(
    context: SiteraProviderContext
  ): Promise<SiteraPage[]>;

  getNavigation(
    context: SiteraProviderContext
  ): Promise<SiteraNavigation>;

  getLocations(
    context: SiteraProviderContext
  ): Promise<SiteraLocation[]>;

  getSettings(
    context: SiteraProviderContext
  ): Promise<SiteraSiteSettings>;
}
```

Context:

```ts
export interface SiteraProviderContext {
  siteId: string;
  businessId: string;
  locale: SiteraLocale;
  timezone: string;
  currency: string;
  category: SiteraBusinessCategory;
  seed: string | number;
}
```

The client must depend only on this interface.

Do not allow generated-provider-specific behavior to leak into the public modules.

---

# 37. Generated Data Provider

Use:

```text
@faker-js/faker
```

Internally.

Requirements:

* Use seeded generation.
* Produce deterministic results.
* Generate relationships consistently.
* Service IDs referenced by pages must exist.
* Product IDs referenced by promotions must exist.
* Team member schedules must use valid operating-hours structures.
* Page navigation links must point to generated pages.
* Primary location must exist.
* Business branding assets must be reused consistently.
* Business name must stay consistent across all modules.
* SEO metadata must match business information.
* Structured data must match the selected category.
* Prices must be reasonable for the selected category.
* Dates must be logically valid.
* No random generation should happen outside the configured seed context.

Create a single generation context:

```ts
interface GeneratedBusinessContext {
  seed: string | number;
  business: SiteraBusiness;
  locations: SiteraLocation[];
  services: SiteraService[];
  products: SiteraProduct[];
  team: SiteraTeamMember[];
  testimonials: SiteraTestimonial[];
  faqs: SiteraFAQ[];
  gallery: SiteraGalleryItem[];
  promotions: SiteraPromotion[];
  pages: SiteraPage[];
  navigation: SiteraNavigation;
  settings: SiteraSiteSettings;
}
```

Generate the complete snapshot once per client instance.

All module methods should read from this generated snapshot.

Do not regenerate unrelated data on every method call.

---

# 38. Data Quantity Defaults

Default generated data quantities:

```ts
{
  locations: 2,
  services: 8,
  products: 12,
  teamMembers: 6,
  testimonials: 8,
  faqs: 10,
  galleryItems: 16,
  promotions: 3,
  pages: 6
}
```

Allow override:

```ts
createSiteraClient({
  generatedData: {
    locations: 1,
    services: 5,
    products: 0,
    teamMembers: 4,
  },
});
```

Add to config:

```ts
export interface SiteraGeneratedDataConfig {
  locations?: number;
  services?: number;
  products?: number;
  teamMembers?: number;
  testimonials?: number;
  faqs?: number;
  galleryItems?: number;
  promotions?: number;
  pages?: number;
}
```

If a quantity is zero, related modules should return an empty array without errors.

Pages and sections must adapt when products or services are disabled.

---

# 39. Direct Helper Functions

Support these shortcuts:

```ts
getBusiness();
getBusinessSnapshot();
getServices();
getProducts();
getTeam();
getTestimonials();
getFAQs();
getGallery();
getPromotions();
getPages();
getPageBySlug();
getNavigation();
getLocations();
getSiteSettings();
```

Direct helpers should use a lazily created default client.

Allow options:

```ts
const business = await getBusiness({
  seed: "restaurant-demo",
  category: "restaurant",
});
```

Avoid mutable global configuration.

Each custom direct-helper call must create an isolated client context.

---

# 40. Filtering and Pagination

Create common list options:

```ts
export interface SiteraListOptions {
  limit?: number;
  offset?: number;
  search?: string;
  category?: string;
  featured?: boolean;
  available?: boolean;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
}
```

Module list methods must support appropriate filters.

Example:

```ts
const services = await sitera.services.list({
  featured: true,
  limit: 4,
});
```

Provide metadata version:

```ts
listWithMeta();
```

```ts
export interface SiteraPaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}
```

All filtering must be deterministic.

---

# 41. Error Classes

Create:

```ts
SiteraError
SiteraConfigurationError
SiteraNotFoundError
SiteraValidationError
SiteraProviderError
SiteraUnsupportedLocaleError
SiteraUnsafeUrlError
```

Base:

```ts
export class SiteraError extends Error {
  readonly code: string;
  readonly details?: Record<string, unknown>;
  readonly cause?: unknown;
}
```

Example:

```text
SiteraNotFoundError:
No service was found with slug "website-design".
```

Errors must:

* Have stable codes
* Be serializable
* Avoid exposing private provider details
* Include actionable messages
* Preserve an optional cause
* Work correctly after package compilation

---

# 42. URL Safety

Provide:

```ts
isSafeUrl();
assertSafeUrl();
normalizeUrl();
isExternalUrl();
```

Allow:

```text
https:
http:
mailto:
tel:
/
#
```

Reject:

```text
javascript:
data:
vbscript:
file:
```

All generated actions and navigation links must pass URL safety validation.

---

# 43. Phone and WhatsApp Helpers

Provide:

```ts
normalizePhoneNumber();
formatPhoneNumber();
createWhatsAppUrl();
```

Example:

```ts
createWhatsAppUrl({
  phone: business.contact.whatsapp,
  message: `Halo ${business.name}, saya ingin bertanya.`,
});
```

Expected output:

```text
https://wa.me/6281234567890?text=...
```

Do not include `+`, spaces, or punctuation in the WhatsApp path.

---

# 44. Serialization

All public data must be JSON-serializable.

Provide:

```ts
serializeSiteraData();
deserializeSiteraData();
```

The SDK must not return:

* Class instances in business data
* Functions inside data objects
* Map
* Set
* BigInt
* Circular references
* Date instances

Use ISO strings for dates.

---

# 45. Browser and Runtime Compatibility

Use standard APIs where possible.

Avoid:

* Node-only APIs in the main entry point
* Filesystem dependencies
* Process globals in browser bundles
* Framework-specific APIs
* DOM APIs in server-safe utilities

Use explicit runtime entry points only when needed:

```ts
@sitera/sdk
@sitera/sdk/browser
@sitera/sdk/node
```

The root entry should work in both browser and server environments.

---

# 46. TypeScript Requirements

Use strict TypeScript:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitOverride": true,
    "noFallthroughCasesInSwitch": true,
    "useUnknownInCatchVariables": true
  }
}
```

Rules:

* Never use `any`
* Prefer `unknown`
* Export all public interfaces
* Use discriminated unions
* Avoid unsafe casts
* Add JSDoc to public APIs
* Keep public types readable
* Avoid excessive type-level complexity
* Generate complete declaration files

---

# 47. Package Build

Use `tsup`.

Generate:

* ESM
* Type declarations
* Source maps
* Tree-shakeable output

Optional CommonJS output is acceptable if it remains maintainable.

Mark Faker as an internal runtime dependency for the current implementation.

Package exports:

```json
{
  "name": "@sitera/sdk",
  "version": "0.1.0",
  "type": "module",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    },
    "./browser": {
      "types": "./dist/browser.d.ts",
      "import": "./dist/browser.js"
    },
    "./node": {
      "types": "./dist/node.d.ts",
      "import": "./dist/node.js"
    }
  },
  "files": [
    "dist",
    "README.md",
    "CHANGELOG.md",
    "SKILL.md"
  ],
  "sideEffects": false
}
```

---

# 48. Testing Requirements

Use Vitest.

Test:

## Configuration

* Default configuration
* Explicit configuration
* Invalid locale
* Invalid category
* Seed normalization
* Immutable resolved config

## Deterministic generation

* Same seed produces same snapshot
* Different seed produces different snapshot
* Same seed and category remain stable
* Generated relationships are valid

## Business

* Complete business object
* Primary location exists
* Contact values are valid
* Operating hours are valid
* Branding colors are valid
* SEO matches business

## Services

* Listing
* Filtering
* Search
* Pagination
* Get by ID
* Get by slug
* Not-found errors

## Products

* Valid prices
* Valid variants
* Valid stock status
* Valid marketplace links

## Pages

* Valid page slugs
* Unique page IDs
* Valid section order
* Section references point to existing entities
* Disabled data removes incompatible sections

## Promotions

* End date after start date
* Referenced products and services exist
* Discount values are valid

## URL safety

* Safe schemes accepted
* Unsafe schemes rejected
* External URL detection
* WhatsApp URL generation

## Serialization

* Snapshot is JSON serializable
* Serialization roundtrip
* No Date instances
* No undefined values where forbidden

## Build

* Package imports from compiled output
* Type declarations resolve
* ESM imports work
* Browser-safe root import
* Tree-shaking compatibility

Aim for meaningful coverage above 85%.

---

# 49. Documentation

Create a comprehensive `README.md`.

Required sections:

1. What is Sitera SDK?
2. Installation
3. Quick start
4. JavaScript usage
5. TypeScript usage
6. Client configuration
7. Business categories
8. Deterministic data using seeds
9. Getting a complete snapshot
10. Business module
11. Services
12. Products
13. Team
14. Testimonials
15. FAQ
16. Gallery
17. Promotions
18. Pages and sections
19. Navigation
20. Locations
21. Branding and CSS variables
22. SEO
23. Booking
24. Helper functions
25. Custom providers
26. Error handling
27. Browser usage
28. Node.js usage
29. Serialization
30. TypeScript types
31. Troubleshooting
32. Security notes

Installation:

```bash
npm install @sitera/sdk
```

```bash
pnpm add @sitera/sdk
```

```bash
yarn add @sitera/sdk
```

Basic usage:

```ts
import { createSiteraClient } from "@sitera/sdk";

const sitera = createSiteraClient({
  seed: "my-business",
  category: "cafe",
});

const business = await sitera.business.get();
const services = await sitera.services.list();
const snapshot = await sitera.getSnapshot();
```

JavaScript example:

```js
import { createSiteraClient } from "@sitera/sdk";

const sitera = createSiteraClient({
  seed: "demo-cafe",
  category: "cafe",
});

const business = await sitera.business.get();

console.log(business.name);
```

---

# 50. Example Projects

Create:

```text
examples/
  vanilla-js/
  typescript/
  node/
```

## Vanilla JS

Demonstrate:

* Import SDK
* Fetch snapshot
* Render business name
* Render services
* Apply CSS variables
* Render operating hours

## TypeScript

Demonstrate:

* Strongly typed client
* Category configuration
* Services filtering
* Page section narrowing
* Custom data provider typing

## Node.js

Demonstrate:

* Generate snapshot
* Serialize it
* Save JSON output
* Read business information

---

# 51. SKILL.md Requirements

Create a complete production-ready file:

```text
packages/sdk/SKILL.md
```

The skill represents the official usage rules for the Sitera SDK.

The skill must not mention:

* Faker
* Mock data
* Fake data
* Placeholder data
* Temporary implementation
* Generated provider
* Development-only backend
* Future API replacement

Write the skill as if the SDK is the official, stable data access layer for Sitera websites.

Use the following content as the baseline and improve it where necessary.

---

# Required SKILL.md Content

````md
---
name: sitera-sdk
description: Standards and best practices for accessing complete Sitera business data using the framework-agnostic @sitera/sdk JavaScript and TypeScript library.
---

# Sitera SDK Skill

This skill defines the required standards for using the official Sitera SDK.

The SDK is framework-agnostic and may be used in JavaScript, TypeScript, Node.js, Bun, browser applications, Next.js, React, Vue, Nuxt, Svelte, Astro, Express, Hono, and other modern JavaScript environments.

Package:

```bash
npm install @sitera/sdk
````

## Core Principles

* Always access Sitera business data through `@sitera/sdk`.
* Do not duplicate Sitera business type definitions inside an application.
* Prefer the typed SDK client over manually constructing business objects.
* Use one client instance per site, tenant, or isolated request context.
* Do not mutate objects returned by the SDK.
* Treat returned data as immutable application data.
* Prefer SDK helper functions for formatting money, phone numbers, URLs, operating hours, and branding.
* Do not introduce framework-specific behavior into shared SDK access code.
* Keep data-fetching logic separate from UI rendering logic.

## Creating a Client

Use `createSiteraClient`:

```ts
import { createSiteraClient } from "@sitera/sdk";

const sitera = createSiteraClient({
  siteId: "site_example",
  locale: "id-ID",
  timezone: "Asia/Jakarta",
  currency: "IDR",
});
```

Create the client in a reusable module when the application uses a single site context.

```ts
// lib/sitera.ts
import { createSiteraClient } from "@sitera/sdk";

export const sitera = createSiteraClient({
  siteId: "site_example",
});
```

For multi-tenant applications, create an isolated client for each resolved tenant.

Do not store mutable tenant information in global variables.

## Getting Complete Business Data

Use `getSnapshot()` when a page or process requires the complete business dataset.

```ts
const snapshot = await sitera.getSnapshot();
```

The snapshot includes:

* Business profile
* Locations
* Services
* Products
* Team members
* Testimonials
* FAQs
* Gallery
* Promotions
* Pages
* Navigation
* Site settings

Do not call every module separately when the complete snapshot is already required.

## Accessing Business Information

```ts
const business = await sitera.business.get();
```

Use focused methods when only a specific part is needed:

```ts
const branding = await sitera.business.getBranding();
const contact = await sitera.business.getContact();
const seo = await sitera.business.getSEO();
const socialLinks = await sitera.business.getSocialLinks();
```

Prefer focused methods to reduce unnecessary data dependencies.

## Services

```ts
const services = await sitera.services.list();
```

Use filtering when appropriate:

```ts
const featuredServices = await sitera.services.list({
  featured: true,
  limit: 4,
});
```

Use `getById` or `getBySlug` for detail pages:

```ts
const service = await sitera.services.getBySlug("website-development");
```

Do not search an entire service array manually when a dedicated SDK method exists.

## Products

```ts
const products = await sitera.products.list({
  available: true,
});
```

Use SDK money types and helpers when displaying prices.

```ts
import { formatMoney } from "@sitera/sdk";

const formatted = formatMoney(product.price);
```

Do not perform floating-point currency calculations directly.

## Pages and Sections

```ts
const page = await sitera.pages.getBySlug("home");
```

Use section helpers:

```ts
import {
  getEnabledSections,
  getSection,
  sortSections,
} from "@sitera/sdk";

const sections = getEnabledSections(
  sortSections(page.sections)
);

const hero = getSection(page, "hero");
```

Use discriminated unions when rendering sections.

```ts
for (const section of sections) {
  switch (section.type) {
    case "hero":
      renderHero(section);
      break;

    case "services":
      renderServices(section);
      break;

    case "products":
      renderProducts(section);
      break;

    default:
      renderFallback(section);
  }
}
```

Do not assume every page contains every section.

Unknown or unsupported section types must not crash the entire website.

## Branding

Use `createSiteraCssVariables` to convert branding information into reusable CSS custom properties.

```ts
import { createSiteraCssVariables } from "@sitera/sdk";

const variables = createSiteraCssVariables(
  business.branding
);
```

Browser example:

```ts
for (const [name, value] of Object.entries(variables)) {
  document.documentElement.style.setProperty(
    name,
    String(value)
  );
}
```

Do not hardcode business branding values when equivalent values are available from the SDK.

Do not automatically inject `customCss` without an explicit security review.

## Contact and WhatsApp

Use SDK helpers for phone normalization and WhatsApp links.

```ts
import {
  createWhatsAppUrl,
  normalizePhoneNumber,
} from "@sitera/sdk";

const phone = normalizePhoneNumber(
  business.contact.whatsapp
);

const url = createWhatsAppUrl({
  phone,
  message: `Halo ${business.name}, saya ingin bertanya.`,
});
```

Do not manually concatenate WhatsApp URLs.

## Operating Hours

Use SDK helpers when checking current business availability.

```ts
import { isBusinessOpenNow } from "@sitera/sdk";

const open = isBusinessOpenNow(
  business.operatingHours,
  {
    timezone: business.settings.timezone,
  }
);
```

Do not compare time strings manually.

Always use the business timezone.

## Navigation and URLs

Only render URLs that pass SDK URL validation.

```ts
import { isSafeUrl } from "@sitera/sdk";

if (isSafeUrl(item.href)) {
  renderLink(item);
}
```

Unsafe schemes such as `javascript:`, `data:`, and `vbscript:` must never be rendered.

For links opened in a new tab, include:

```html
rel="noopener noreferrer"
```

## Error Handling

Use Sitera error classes.

```ts
import {
  SiteraError,
  SiteraNotFoundError,
} from "@sitera/sdk";

try {
  const service =
    await sitera.services.getBySlug(slug);
} catch (error) {
  if (error instanceof SiteraNotFoundError) {
    renderNotFound();
    return;
  }

  if (error instanceof SiteraError) {
    logSiteraError(error);
    return;
  }

  throw error;
}
```

Do not silently ignore SDK errors.

Do not expose internal error details directly to end users.

## TypeScript Types

Import official types from the SDK.

```ts
import type {
  SiteraBusiness,
  SiteraPage,
  SiteraSection,
  SiteraService,
} from "@sitera/sdk";
```

Do not recreate equivalent local interfaces.

Use `unknown` instead of `any` for untrusted custom data.

Use section discriminated unions instead of unsafe type assertions.

## Serialization

All Sitera data is JSON-serializable.

Use SDK serialization helpers when transferring data between server and client environments.

```ts
import {
  serializeSiteraData,
  deserializeSiteraData,
} from "@sitera/sdk";
```

Do not add functions, class instances, `Map`, `Set`, `BigInt`, or circular references to Sitera data objects.

## Framework Integration

Keep framework integration thin.

Good:

```ts
const business = await sitera.business.get();
return renderBusinessPage(business);
```

Avoid embedding framework-specific APIs inside reusable Sitera data modules.

A shared data-access module should be usable by more than one framework.

## Client Lifecycle

For a single-site frontend, reuse one configured client instance.

For request-based or multi-tenant systems, create one isolated client per tenant or request context.

Never modify client configuration after initialization.

Never reuse one tenant's resolved data for another tenant.

## Performance

* Use `getSnapshot()` when complete data is needed.
* Use focused module methods when only a subset is needed.
* Avoid duplicate calls in one rendering lifecycle.
* Cache only with tenant-safe keys.
* Do not mutate cached SDK values.
* Avoid serializing the complete snapshot when the client only needs a small subset.

## Security

* Validate navigation and action URLs.
* Do not inject arbitrary HTML from custom fields.
* Do not inject custom CSS automatically.
* Do not expose private application configuration.
* Do not trust custom metadata without validation.
* Do not use unsafe object merging.
* Keep tenant data isolated.
* Escape user-visible text according to the target rendering environment.

## Recommended Application Structure

```text
src/
  lib/
    sitera.ts
    sitera-data.ts
  components/
    business/
    sections/
  pages/
  types/
```

Example data module:

```ts
import { sitera } from "./sitera";

export async function getHomePageData() {
  const [business, page, navigation] =
    await Promise.all([
      sitera.business.get(),
      sitera.pages.getBySlug("home"),
      sitera.navigation.get(),
    ]);

  return {
    business,
    page,
    navigation,
  };
}
```

## Validation Checklist

Before considering an integration complete, verify:

* The SDK client is configured correctly.
* Official SDK types are used.
* Business data is not duplicated locally.
* Tenant contexts are isolated.
* Business timezone is respected.
* Money values use SDK helpers.
* Phone numbers use SDK helpers.
* URLs are validated.
* Unknown sections are handled safely.
* Optional fields are checked before rendering.
* Errors are handled explicitly.
* Data remains JSON-serializable.
* Custom CSS and custom metadata are treated as untrusted input.
* The application builds without TypeScript errors.

## Recommended Commit Message

```text
feat(sitera): integrate official Sitera SDK
```

````

Ensure the final `SKILL.md` is complete, clear, self-contained, and suitable for AI coding agents.

---

# 52. Code Quality Rules

- Write real production-ready code.
- Do not produce pseudocode.
- Do not leave unimplemented methods.
- Do not leave placeholder comments.
- Do not use `any`.
- Keep modules small and focused.
- Avoid unnecessary classes.
- Prefer functional composition.
- Avoid global mutable state.
- Do not mutate returned data.
- Freeze top-level configuration objects.
- Use deterministic identifiers.
- Keep provider boundaries clean.
- Add JSDoc to all public APIs.
- Ensure package imports work from built output.
- Ensure all examples use public exports only.
- Do not import internal source paths in examples.
- Keep the core SDK framework-agnostic.

---

# 53. Implementation Order

## Phase 1 — Foundation

- Package setup
- TypeScript configuration
- Build configuration
- Core common types
- Error classes
- Configuration
- Provider interface
- URL validation
- Helper utilities

## Phase 2 — Data Models

- Business
- Contact
- Location
- Operating hours
- Branding
- SEO
- Services
- Products
- Team
- Testimonials
- FAQ
- Gallery
- Promotions
- Pages
- Navigation
- Settings

## Phase 3 — Data Provider

- Seed handling
- Generation context
- Category presets
- Complete snapshot generation
- Cross-entity relationship validation

## Phase 4 — SDK Client

- Client factory
- Modules
- Filtering
- Pagination
- Direct helper functions
- Snapshot API

## Phase 5 — Quality

- Tests
- Documentation
- Examples
- SKILL.md
- Build validation
- Package export validation

Complete and test each phase before moving to the next.

---

# 54. Validation Commands

Add scripts and ensure these commands pass:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
````

Also verify examples:

```bash
pnpm --filter sitera-example-vanilla build
pnpm --filter sitera-example-typescript build
pnpm --filter sitera-example-node build
```

Check:

* ESM imports work
* Declaration files are generated
* Package exports resolve
* Root entry is browser-safe
* Same seed produces identical JSON
* Different seed produces different JSON
* All returned data is JSON-serializable
* All URLs are safe
* All referenced IDs exist
* All page sections are valid
* All tests pass
* No framework dependency is included
* `SKILL.md` does not mention internal data-generation implementation

---

# 55. Required Deliverables

Produce:

1. Complete `@sitera/sdk` source code
2. Framework-agnostic public API
3. Complete TypeScript types
4. Data provider abstraction
5. Deterministic built-in data provider
6. Category-specific business presets
7. Complete snapshot API
8. Modular business APIs
9. Helper utilities
10. Error classes
11. Unit tests
12. Integration tests
13. Build configuration
14. Package export configuration
15. README
16. CHANGELOG
17. Example projects
18. Production-ready `SKILL.md`
19. Architecture notes
20. Publishing checklist

---

# 56. Final Output Format

After implementation, return:

1. Architecture summary
2. Directory structure
3. Public API overview
4. Complete data model summary
5. Provider architecture explanation
6. Usage examples
7. Build commands
8. Test results
9. Known limitations
10. Recommended next steps
11. Suggested commit message

Suggested commit message:

```text
feat(sdk): initialize framework-agnostic Sitera SDK
```

Do not state that the SDK is complete unless:

* Lint passes
* Type checking passes
* Tests pass
* Package build passes
* Example builds pass
* Compiled package imports work
* Declaration files are valid
* Snapshot data is fully JSON-serializable
* `SKILL.md` follows all stated requirements
