import type { SiteraClientConfig, SiteraClient, SiteraBusinessSnapshot } from "../types/api.js";
import type { SiteraProviderContext } from "../types/provider.js";
import { resolveConfig } from "../core/config.js";
import { GeneratedProvider } from "../providers/generated/generated-provider.js";
import { createBusinessModule } from "./modules/business.js";
import { createServiceModule } from "./modules/services.js";
import { createProductModule } from "./modules/products.js";
import { createTeamModule } from "./modules/team.js";
import { createTestimonialModule } from "./modules/testimonials.js";
import { createFAQModule } from "./modules/faq.js";
import { createGalleryModule } from "./modules/gallery.js";
import { createPromotionModule } from "./modules/promotions.js";
import { createPageModule } from "./modules/pages.js";
import { createNavigationModule } from "./modules/navigation.js";
import { createLocationModule } from "./modules/locations.js";
import { createSettingsModule } from "./modules/settings.js";

/** Create a new Sitera SDK client instance */
export function createSiteraClient(config?: SiteraClientConfig): SiteraClient {
  const resolved = resolveConfig(config);
  const provider = config?.provider ?? new GeneratedProvider(resolved);
  const ctx: SiteraProviderContext = {
    siteId: resolved.siteId,
    businessId: resolved.businessId,
    locale: resolved.locale,
    timezone: resolved.timezone,
    currency: resolved.currency,
    category: resolved.category,
    seed: resolved.seed,
  };

  return {
    business: createBusinessModule(provider, ctx),
    services: createServiceModule(provider, ctx),
    products: createProductModule(provider, ctx),
    team: createTeamModule(provider, ctx),
    testimonials: createTestimonialModule(provider, ctx),
    faq: createFAQModule(provider, ctx),
    gallery: createGalleryModule(provider, ctx),
    promotions: createPromotionModule(provider, ctx),
    pages: createPageModule(provider, ctx),
    navigation: createNavigationModule(provider, ctx),
    locations: createLocationModule(provider, ctx),
    settings: createSettingsModule(provider, ctx),

    async getSnapshot(): Promise<SiteraBusinessSnapshot> {
      const [business, locations, services, products, team, testimonials, faqs, gallery, promotions, pages, navigation, settings] = await Promise.all([
        provider.getBusiness(ctx), provider.getLocations(ctx), provider.getServices(ctx),
        provider.getProducts(ctx), provider.getTeam(ctx), provider.getTestimonials(ctx),
        provider.getFAQs(ctx), provider.getGallery(ctx), provider.getPromotions(ctx),
        provider.getPages(ctx), provider.getNavigation(ctx), provider.getSettings(ctx),
      ]);
      return { business, locations, services, products, team, testimonials, faqs, gallery, promotions, pages, navigation, settings, generatedAt: new Date().toISOString() };
    },

    getConfig() { return resolved; },
  };
}
