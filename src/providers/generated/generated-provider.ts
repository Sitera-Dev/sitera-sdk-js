import { faker } from "@faker-js/faker";
import type { SiteraDataProvider, SiteraProviderContext } from "../../types/provider.js";
import type { SiteraBusiness, SiteraBusinessIdentity, SiteraBusinessSettings } from "../../types/business.js";
import type { SiteraService } from "../../types/service.js";
import type { SiteraProduct } from "../../types/product.js";
import type { SiteraTeamMember } from "../../types/team.js";
import type { SiteraTestimonial } from "../../types/testimonial.js";
import type { SiteraFAQ } from "../../types/faq.js";
import type { SiteraGalleryItem } from "../../types/gallery.js";
import type { SiteraPromotion } from "../../types/promotion.js";
import type { SiteraPage, SiteraSection, SiteraHeroSection, SiteraAboutSection, SiteraServicesSection, SiteraContactSection, SiteraFAQSection, SiteraTestimonialsSection, SiteraGallerySection, SiteraCTASection } from "../../types/page.js";
import type { SiteraNavigation } from "../../types/navigation.js";
import type { SiteraLocation } from "../../types/location.js";
import type { SiteraSiteSettings } from "../../types/settings.js";
import type { SiteraOperatingHours } from "../../types/operating-hours.js";
import type { SiteraBranding, SiteraColorPalette, SiteraTypography } from "../../types/branding.js";
import type { SiteraSEO } from "../../types/seo.js";
import type { SiteraBusinessContact } from "../../types/contact.js";
import type { SiteraSocialLinks, SiteraMarketplaceLink } from "../../types/social.js";
import type { SiteraLegalInformation } from "../../types/legal.js";
import type { SiteraAsset, SiteraMoney, SiteraMoneyRange, SiteraAction, SiteraBusinessHighlight, SiteraBusinessStatistic, SiteraCertification, SiteraAward, SiteraFacility, SiteraWeekday } from "../../types/common.js";
import type { SiteraPaymentMethod } from "../../types/payment.js";
import type { SiteraDeliveryOption } from "../../types/delivery.js";
import type { SiteraLocationSummary } from "../../types/location.js";
import type { ResolvedSiteraClientConfig } from "../../types/api.js";
import { getPreset, type CategoryPreset } from "./presets/index.js";
import { seedToNumber } from "../../core/config.js";
import { createMoney } from "../../helpers/currency.js";

const WEEKDAYS: SiteraWeekday[] = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];

const INDONESIAN_LOCATIONS = [
  { city: "Jakarta Selatan", province: "DKI Jakarta", postal: "12", lat: -6.26, lng: 106.81 },
  { city: "Bandung", province: "Jawa Barat", postal: "40", lat: -6.91, lng: 107.61 },
  { city: "Surabaya", province: "Jawa Timur", postal: "60", lat: -7.25, lng: 112.75 },
  { city: "Yogyakarta", province: "DI Yogyakarta", postal: "55", lat: -7.79, lng: 110.36 },
  { city: "Denpasar", province: "Bali", postal: "80", lat: -8.65, lng: 115.22 },
  { city: "Semarang", province: "Jawa Tengah", postal: "50", lat: -6.97, lng: 110.42 },
  { city: "Medan", province: "Sumatera Utara", postal: "20", lat: 3.59, lng: 98.67 },
  { city: "Makassar", province: "Sulawesi Selatan", postal: "90", lat: -5.14, lng: 119.43 },
];

interface GeneratedSnapshot {
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

function makeAsset(id: string, alt: string, w = 800, h = 600): SiteraAsset {
  return { id, url: `https://placehold.co/${w}x${h}/png?text=${encodeURIComponent(alt)}`, alt, type: "image", mimeType: "image/png", width: w, height: h };
}

function makeId(prefix: string, i: number): string {
  return `${prefix}_${String(i + 1).padStart(3, "0")}`;
}

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function pick<T>(arr: readonly T[]): T {
  return arr[faker.number.int({ min: 0, max: arr.length - 1 })]!;
}

function pickN<T>(arr: readonly T[], n: number): T[] {
  const shuffled = faker.helpers.shuffle([...arr]);
  return shuffled.slice(0, Math.min(n, arr.length));
}

function genPhone(): string {
  return `+628${faker.string.numeric(10)}`;
}

function genOperatingHours(): SiteraOperatingHours[] {
  return WEEKDAYS.map((day) => {
    const isSunday = day === "sunday";
    return {
      day,
      enabled: !isSunday || faker.datatype.boolean(),
      periods: isSunday && !faker.datatype.boolean() ? [] : [{ open: "09:00", close: "17:00" }],
    };
  });
}

function genColors(): SiteraColorPalette {
  const primary = faker.color.rgb();
  return {
    primary, primaryForeground: "#ffffff",
    secondary: faker.color.rgb(), secondaryForeground: "#ffffff",
    accent: faker.color.rgb(), accentForeground: "#ffffff",
    background: "#ffffff", foreground: "#111827",
    surface: "#f9fafb", surfaceForeground: "#111827",
    muted: "#f3f4f6", mutedForeground: "#6b7280",
    border: "#e5e7eb", input: "#e5e7eb", ring: primary,
    success: "#10b981", successForeground: "#ffffff",
    warning: "#f59e0b", warningForeground: "#ffffff",
    danger: "#ef4444", dangerForeground: "#ffffff",
  };
}

export function generateSnapshot(config: ResolvedSiteraClientConfig): GeneratedSnapshot {
  const numSeed = seedToNumber(config.seed);
  faker.seed(numSeed);

  const preset = getPreset(config.category);
  const bizName = pick(preset.names);
  const bizSlug = slugify(bizName);
  const tagline = pick(preset.taglines);
  const phone = genPhone();
  const email = `info@${bizSlug}.co.id`;
  const opHours = genOperatingHours();
  const colors = genColors();
  const now = new Date().toISOString();

  // Locations
  const locations: SiteraLocation[] = Array.from({ length: config.generatedData.locations }, (_, i) => {
    const loc = INDONESIAN_LOCATIONS[i % INDONESIAN_LOCATIONS.length]!;
    return {
      id: makeId("loc", i), name: i === 0 ? `${bizName} - Pusat` : `${bizName} - ${loc.city}`,
      type: (preset.locationTypes[i % preset.locationTypes.length] ?? "store") as SiteraLocation["type"],
      isPrimary: i === 0,
      address: { street: `Jl. ${faker.location.street()} No. ${faker.number.int({ min: 1, max: 200 })}`, city: loc.city, province: loc.province, postalCode: `${loc.postal}${faker.string.numeric(3)}`, country: "Indonesia", countryCode: "ID" },
      coordinates: { latitude: loc.lat + faker.number.float({ min: -0.05, max: 0.05 }), longitude: loc.lng + faker.number.float({ min: -0.05, max: 0.05 }) },
      operatingHours: opHours,
      facilities: preset.facilities.slice(0, 4).map((f, fi) => ({ id: makeId(`loc${i}_fac`, fi), name: f, available: true })),
      mapUrl: `https://maps.google.com/?q=${loc.lat},${loc.lng}`,
    };
  });

  const locSummaries: SiteraLocationSummary[] = locations.map((l) => ({ id: l.id, name: l.name, type: l.type, isPrimary: l.isPrimary, city: l.address.city, province: l.address.province }));

  // Services
  const services: SiteraService[] = Array.from({ length: config.generatedData.services }, (_, i) => {
    const name = preset.serviceNames[i % preset.serviceNames.length]!;
    const price = faker.number.int({ min: 50, max: 500 }) * 1000;
    return {
      id: makeId("svc", i), slug: slugify(name), name,
      shortDescription: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      category: preset.serviceCategories[i % preset.serviceCategories.length],
      image: makeAsset(makeId("svc_img", i), name),
      pricingType: "fixed" as const,
      price: createMoney(price, config.currency),
      features: Array.from({ length: 3 }, () => faker.lorem.sentence(4)),
      available: true, featured: i < 4, order: i,
      callToAction: { label: "Hubungi Kami", href: `https://wa.me/62${phone.slice(3)}`, variant: "primary" as const },
    };
  });

  // Products
  const products: SiteraProduct[] = Array.from({ length: config.generatedData.products }, (_, i) => {
    const name = preset.productNames[i % preset.productNames.length]!;
    const price = faker.number.int({ min: 10, max: 1000 }) * 1000;
    return {
      id: makeId("prd", i), slug: slugify(name), name,
      shortDescription: faker.lorem.sentence(),
      category: preset.productCategories[i % preset.productCategories.length]!,
      tags: [preset.category],
      images: [makeAsset(makeId("prd_img", i), name)],
      price: createMoney(price, config.currency),
      stock: { status: "in-stock" as const, quantity: faker.number.int({ min: 10, max: 200 }) },
      featured: i < 4, available: true, order: i,
    };
  });

  // Team
  const team: SiteraTeamMember[] = Array.from({ length: config.generatedData.teamMembers }, (_, i) => ({
    id: makeId("team", i), name: faker.person.fullName(),
    role: preset.teamRoles[i % preset.teamRoles.length]!,
    biography: faker.lorem.paragraph(),
    image: makeAsset(makeId("team_img", i), "Team Member", 400, 400),
    specializations: [faker.lorem.word()],
    experienceYears: faker.number.int({ min: 2, max: 15 }),
    languages: ["Bahasa Indonesia", "English"],
    featured: i < 3, order: i,
  }));

  // Testimonials
  const testimonials: SiteraTestimonial[] = Array.from({ length: config.generatedData.testimonials }, (_, i) => ({
    id: makeId("tst", i), customerName: faker.person.fullName(),
    customerRole: faker.person.jobTitle(),
    content: faker.lorem.paragraph(),
    rating: faker.number.int({ min: 4, max: 5 }),
    source: "google" as const,
    featured: i < 3, publishedAt: faker.date.past().toISOString(),
  }));

  // FAQs
  const faqs: SiteraFAQ[] = Array.from({ length: config.generatedData.faqs }, (_, i) => ({
    id: makeId("faq", i),
    question: `${faker.lorem.sentence().replace(/\.$/, "")}?`,
    answer: faker.lorem.paragraph(),
    category: preset.faqCategories[i % preset.faqCategories.length],
    featured: i < 3, order: i,
  }));

  // Gallery
  const gallery: SiteraGalleryItem[] = Array.from({ length: config.generatedData.galleryItems }, (_, i) => ({
    id: makeId("gal", i),
    title: faker.lorem.sentence(3),
    asset: makeAsset(makeId("gal_img", i), preset.galleryCategories[i % preset.galleryCategories.length]!),
    category: preset.galleryCategories[i % preset.galleryCategories.length],
    featured: i < 4, order: i,
  }));

  // Promotions
  const promoStart = new Date();
  const promotions: SiteraPromotion[] = Array.from({ length: config.generatedData.promotions }, (_, i) => {
    const endDate = new Date(promoStart);
    endDate.setDate(endDate.getDate() + 30 + i * 15);
    return {
      id: makeId("promo", i), slug: `promo-${i + 1}`,
      name: `Promo ${faker.commerce.productAdjective()}`,
      headline: faker.lorem.sentence(),
      type: "discount" as const,
      discount: { type: "percentage" as const, value: pick([10, 15, 20, 25, 30]) },
      code: faker.string.alphanumeric(8).toUpperCase(),
      startAt: promoStart.toISOString(), endAt: endDate.toISOString(),
      applicableServiceIds: services.slice(0, 2).map((s) => s.id),
      applicableProductIds: products.slice(0, 2).map((p) => p.id),
      active: true, featured: i === 0,
    };
  });

  // Branding
  const branding: SiteraBranding = {
    assets: { logo: makeAsset("brand_logo", `${bizName} Logo`, 200, 60) },
    colors,
    typography: { headingFont: "Inter", bodyFont: "Inter", baseFontSize: "16px", lineHeight: 1.6 },
    borderRadius: { sm: "0.25rem", md: "0.5rem", lg: "1rem" },
    style: "modern",
  };

  // SEO
  const seo: SiteraSEO = {
    title: bizName, titleTemplate: `%s | ${bizName}`,
    description: tagline, keywords: [preset.category, preset.subcategory, bizName],
    robots: { index: true, follow: true },
    openGraph: { title: bizName, description: tagline, type: "website", siteName: bizName, images: [{ url: branding.assets.logo!.url, width: 200, height: 60 }] },
    twitter: { card: "summary_large_image", title: bizName, description: tagline, images: [branding.assets.logo!.url] },
  };

  // Contact
  const contact: SiteraBusinessContact = {
    email, phone, whatsapp: phone,
    contactPerson: { name: team[0]?.name ?? faker.person.fullName(), role: team[0]?.role },
  };

  // Social
  const socialLinks: SiteraSocialLinks = {
    website: `https://${bizSlug}.co.id`,
    instagram: `https://instagram.com/${bizSlug}`,
    facebook: `https://facebook.com/${bizSlug}`,
  };

  // Legal
  const legal: SiteraLegalInformation = {
    legalName: `PT ${bizName}`, registrationNumber: `AHU-${faker.string.numeric(10)}`,
    taxNumber: `${faker.string.numeric(2)}.${faker.string.numeric(3)}.${faker.string.numeric(3)}.${faker.string.numeric(1)}-${faker.string.numeric(3)}.${faker.string.numeric(3)}`,
    privacyPolicyUrl: `/privacy`, termsUrl: `/terms`,
  };

  // Payment
  const paymentMethods: SiteraPaymentMethod[] = preset.paymentTypes.map((t, i) => ({
    id: makeId("pay", i), type: t as SiteraPaymentMethod["type"], name: t.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()), enabled: true,
  }));

  // Delivery
  const deliveryOptions: SiteraDeliveryOption[] = preset.deliveryTypes.map((t, i) => ({
    id: makeId("dlv", i), type: t as SiteraDeliveryOption["type"], name: t.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()), available: true,
  }));

  // Facilities
  const facilities: SiteraFacility[] = preset.facilities.map((f, i) => ({ id: makeId("fac", i), name: f, available: true }));

  // Identity
  const identity: SiteraBusinessIdentity = {
    brandName: bizName, logo: branding.assets.logo,
    legalName: legal.legalName, registrationNumber: legal.registrationNumber,
  };

  // Business
  const business: SiteraBusiness = {
    id: config.businessId, siteId: config.siteId,
    name: bizName, legalName: legal.legalName, slug: bizSlug,
    tagline, shortDescription: faker.lorem.sentence(), description: faker.lorem.paragraphs(2),
    story: faker.lorem.paragraphs(3),
    category: config.category, subcategory: preset.subcategory, industry: preset.industry,
    businessType: "corporation",
    establishedYear: faker.number.int({ min: 2005, max: 2023 }),
    employeeCount: faker.number.int({ min: 5, max: 100 }),
    serviceArea: [locations[0]!.address.city],
    identity, contact, locations: locSummaries, operatingHours: opHours,
    socialLinks, branding, seo, legal,
    settings: { locale: config.locale, timezone: config.timezone, currency: config.currency },
    highlights: [{ label: "Tahun Pengalaman", value: "10+", icon: "calendar" }, { label: "Klien Puas", value: "500+", icon: "users" }],
    statistics: [{ label: "Pelanggan", value: "500+" }, { label: "Rating", value: "4.8" }],
    certifications: [], awards: [],
    paymentMethods, deliveryOptions, facilities,
    languages: ["Bahasa Indonesia", "English"],
    status: "published", createdAt: now, updatedAt: now, publishedAt: now,
  };

  // Pages
  const pageSeo = (title: string): SiteraSEO => ({
    ...seo, title, openGraph: { ...seo.openGraph, title }, twitter: { ...seo.twitter, title },
  });

  const pageTemplates: { slug: string; title: string; type: SiteraPage["type"]; sections: SiteraSection[] }[] = [
    { slug: "home", title: "Beranda", type: "home", sections: [
      { id: "sec_hero", type: "hero", enabled: true, order: 0, content: { title: bizName, highlightedText: tagline, description: business.shortDescription, primaryAction: { label: "Hubungi Kami", href: "/contact", variant: "primary" }, image: makeAsset("hero_img", bizName, 1200, 600) } } as SiteraHeroSection,
      { id: "sec_about", type: "about", enabled: true, order: 1, content: { title: "Tentang Kami", description: business.description ?? "", highlights: business.highlights } } as SiteraAboutSection,
      ...(config.generatedData.services > 0 ? [{ id: "sec_svc", type: "services" as const, enabled: true, order: 2, content: { title: "Layanan Kami", serviceIds: services.filter((s) => s.featured).map((s) => s.id), layout: "grid" as const } } as SiteraServicesSection] : []),
      { id: "sec_tst", type: "testimonials", enabled: config.generatedData.testimonials > 0, order: 3, content: { title: "Testimoni", testimonialIds: testimonials.filter((t) => t.featured).map((t) => t.id) } } as SiteraTestimonialsSection,
      { id: "sec_cta", type: "cta", enabled: true, order: 4, content: { title: "Siap Memulai?", description: "Hubungi kami sekarang", primaryAction: { label: "Hubungi Kami", href: "/contact", variant: "primary" } } } as SiteraCTASection,
    ] },
    { slug: "about", title: "Tentang", type: "about", sections: [
      { id: "sec_abt2", type: "about", enabled: true, order: 0, content: { title: `Tentang ${bizName}`, description: business.story ?? business.description ?? "" } } as SiteraAboutSection,
    ] },
    { slug: "contact", title: "Kontak", type: "contact", sections: [
      { id: "sec_contact", type: "contact", enabled: true, order: 0, content: { title: "Hubungi Kami", showMap: true, showForm: true } } as SiteraContactSection,
    ] },
    { slug: "faq", title: "FAQ", type: "faq", sections: [
      { id: "sec_faq", type: "faq", enabled: config.generatedData.faqs > 0, order: 0, content: { title: "Pertanyaan Umum", faqIds: faqs.map((f) => f.id) } } as SiteraFAQSection,
    ] },
  ];

  if (config.generatedData.services > 0) {
    pageTemplates.push({ slug: "services", title: "Layanan", type: "services", sections: [
      { id: "sec_svcpage", type: "services", enabled: true, order: 0, content: { title: "Semua Layanan", serviceIds: services.map((s) => s.id), layout: "grid" } } as SiteraServicesSection,
    ] });
  }
  if (config.generatedData.galleryItems > 0) {
    pageTemplates.push({ slug: "gallery", title: "Galeri", type: "gallery", sections: [
      { id: "sec_galpage", type: "gallery", enabled: true, order: 0, content: { title: "Galeri Kami", galleryItemIds: gallery.map((g) => g.id) } } as SiteraGallerySection,
    ] });
  }

  const pages: SiteraPage[] = pageTemplates.slice(0, config.generatedData.pages).map((t, i) => ({
    id: makeId("page", i), slug: t.slug, title: t.title, type: t.type,
    status: "published", seo: pageSeo(t.title), sections: t.sections, order: i,
    createdAt: now, updatedAt: now,
  }));

  // Navigation
  const navigation: SiteraNavigation = {
    header: pages.map((p, i) => ({ id: makeId("nav", i), label: p.title, href: `/${p.slug === "home" ? "" : p.slug}`, order: i, visible: true })),
    footer: [{ id: "footer_1", title: bizName, items: pages.slice(0, 4).map((p, i) => ({ id: makeId("fnav", i), label: p.title, href: `/${p.slug === "home" ? "" : p.slug}`, order: i, visible: true })), order: 0 }],
  };

  // Settings
  const settings: SiteraSiteSettings = {
    locale: config.locale, timezone: config.timezone, currency: config.currency,
    domain: `${bizSlug}.sitera.id`,
    dateFormat: "dd/MM/yyyy", timeFormat: "24-hour",
    integrations: {
      whatsapp: { enabled: true, phone, defaultMessage: `Halo ${bizName}` },
      maps: { enabled: true, provider: "google-maps" },
      analytics: { enabled: false },
    },
    features: {
      services: config.generatedData.services > 0,
      products: config.generatedData.products > 0,
      booking: true, contactForm: true,
      testimonials: config.generatedData.testimonials > 0,
      gallery: config.generatedData.galleryItems > 0,
      team: config.generatedData.teamMembers > 0,
      promotions: config.generatedData.promotions > 0,
      multiLocation: config.generatedData.locations > 1,
    },
  };

  return { business, locations, services, products, team, testimonials, faqs, gallery, promotions, pages, navigation, settings };
}

export class GeneratedProvider implements SiteraDataProvider {
  private snapshot: GeneratedSnapshot | undefined;
  private readonly config: ResolvedSiteraClientConfig;

  constructor(config: ResolvedSiteraClientConfig) {
    this.config = config;
  }

  private getSnapshot(): GeneratedSnapshot {
    if (!this.snapshot) {
      this.snapshot = generateSnapshot(this.config);
    }
    return this.snapshot;
  }

  async getBusiness(): Promise<SiteraBusiness> { return this.getSnapshot().business; }
  async getServices(): Promise<SiteraService[]> { return this.getSnapshot().services; }
  async getProducts(): Promise<SiteraProduct[]> { return this.getSnapshot().products; }
  async getTeam(): Promise<SiteraTeamMember[]> { return this.getSnapshot().team; }
  async getTestimonials(): Promise<SiteraTestimonial[]> { return this.getSnapshot().testimonials; }
  async getFAQs(): Promise<SiteraFAQ[]> { return this.getSnapshot().faqs; }
  async getGallery(): Promise<SiteraGalleryItem[]> { return this.getSnapshot().gallery; }
  async getPromotions(): Promise<SiteraPromotion[]> { return this.getSnapshot().promotions; }
  async getPages(): Promise<SiteraPage[]> { return this.getSnapshot().pages; }
  async getNavigation(): Promise<SiteraNavigation> { return this.getSnapshot().navigation; }
  async getLocations(): Promise<SiteraLocation[]> { return this.getSnapshot().locations; }
  async getSettings(): Promise<SiteraSiteSettings> { return this.getSnapshot().settings; }
}
