import { describe, it, expect } from "vitest";
import { createSiteraClient } from "../../src/client/create-sitera-client.js";

describe("client initialization and modules", () => {
  it("initializes with default generated provider", async () => {
    const client = createSiteraClient({ seed: 42, category: "cafe" });
    const config = client.getConfig();
    
    expect(config.seed).toBe(42);
    expect(config.category).toBe("cafe");
  });

  it("fetches business data", async () => {
    const client = createSiteraClient({ seed: 42, category: "restaurant" });
    const biz = await client.business.get();
    
    expect(biz.category).toBe("restaurant");
    expect(biz.name).toBeDefined();
    expect(biz.contact).toBeDefined();
  });

  it("fetches list of services", async () => {
    const client = createSiteraClient({ seed: 42, category: "beauty" });
    const services = await client.services.list();
    
    expect(services.length).toBeGreaterThan(0);
    expect(services[0]?.id).toBeDefined();
  });
  
  it("fetches products with pagination", async () => {
    const client = createSiteraClient({ seed: 42, category: "local-brand" });
    const res = await client.products.listWithMeta({ limit: 5 });
    
    expect(res.data.length).toBeLessThanOrEqual(5);
    expect(res.meta.total).toBeGreaterThan(0);
  });
  
  it("fetches a full snapshot", async () => {
    const client = createSiteraClient({ seed: 42, category: "healthcare" });
    const snapshot = await client.getSnapshot();
    
    expect(snapshot.business).toBeDefined();
    expect(snapshot.services).toBeDefined();
    expect(snapshot.products).toBeDefined();
    expect(snapshot.pages).toBeDefined();
    expect(snapshot.locations).toBeDefined();
    expect(snapshot.generatedAt).toBeDefined();
  });

  it("covers remaining module fetchers", async () => {
    const client = createSiteraClient({ seed: 100, category: "restaurant" });
    
    // Business
    expect(await client.business.getIdentity()).toBeDefined();
    expect(await client.business.getContact()).toBeDefined();
    expect(await client.business.getBranding()).toBeDefined();
    expect(await client.business.getSEO()).toBeDefined();
    expect(await client.business.getSocialLinks()).toBeDefined();
    expect(await client.business.getOperatingHours()).toBeDefined();
    expect(await client.business.getLegalInformation()).toBeDefined();

    // Teams & Testimonials & FAQs
    const team = await client.team.list();
    if (team.length) expect(await client.team.getById(team[0]!.id)).toBeDefined();
    expect(await client.team.getFeatured()).toBeDefined();
    expect(await client.team.listWithMeta()).toBeDefined();

    const faqs = await client.faq.list();
    expect(await client.faq.getCategories()).toBeDefined();
    expect(await client.faq.listWithMeta()).toBeDefined();
    
    const testimonials = await client.testimonials.list();
    expect(await client.testimonials.getFeatured()).toBeDefined();
    expect(await client.testimonials.listWithMeta()).toBeDefined();

    // Gallery & Promotions
    const gallery = await client.gallery.list();
    expect(await client.gallery.getFeatured()).toBeDefined();
    expect(await client.gallery.listWithMeta()).toBeDefined();

    const promos = await client.promotions.list();
    expect(await client.promotions.getActive()).toBeDefined();
    expect(await client.promotions.getFeatured()).toBeDefined();
    expect(await client.promotions.listWithMeta()).toBeDefined();

    // Navigation & Settings
    expect(await client.navigation.get()).toBeDefined();
    expect(await client.settings.get()).toBeDefined();

    // Locations
    const locations = await client.locations.list();
    if (locations.length) {
      expect(await client.locations.getById(locations[0]!.id)).toBeDefined();
      expect(await client.locations.getPrimary()).toBeDefined();
    }
    
    // Pages
    const pages = await client.pages.list();
    if (pages.length) {
      expect(await client.pages.getById(pages[0]!.id)).toBeDefined();
      expect(await client.pages.getBySlug(pages[0]!.slug)).toBeDefined();
      expect(await client.pages.getByType("home")).toBeDefined();
    }

    // Services & Products features
    const services = await client.services.list();
    if (services.length) {
      expect(await client.services.getById(services[0]!.id)).toBeDefined();
      expect(await client.services.getBySlug(services[0]!.slug)).toBeDefined();
      expect(await client.services.getCategories()).toBeDefined();
      expect(await client.services.getFeatured()).toBeDefined();
    }
    
    const products = await client.products.list();
    if (products.length) {
      expect(await client.products.getById(products[0]!.id)).toBeDefined();
      expect(await client.products.getBySlug(products[0]!.slug)).toBeDefined();
      expect(await client.products.getCategories()).toBeDefined();
      expect(await client.products.getFeatured()).toBeDefined();
    }
  });
});
