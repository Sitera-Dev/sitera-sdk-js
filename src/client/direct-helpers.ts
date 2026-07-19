import type { SiteraClientConfig } from "../types/api.js";
import { createSiteraClient } from "./create-sitera-client.js";

let defaultClient: ReturnType<typeof createSiteraClient> | undefined;

function getClient(config?: SiteraClientConfig) {
  if (config) return createSiteraClient(config);
  if (!defaultClient) defaultClient = createSiteraClient();
  return defaultClient;
}

export async function getBusiness(config?: SiteraClientConfig) { return getClient(config).business.get(); }
export async function getBusinessSnapshot(config?: SiteraClientConfig) { return getClient(config).getSnapshot(); }
export async function getServices(config?: SiteraClientConfig) { return getClient(config).services.list(); }
export async function getProducts(config?: SiteraClientConfig) { return getClient(config).products.list(); }
export async function getTeam(config?: SiteraClientConfig) { return getClient(config).team.list(); }
export async function getTestimonials(config?: SiteraClientConfig) { return getClient(config).testimonials.list(); }
export async function getFAQs(config?: SiteraClientConfig) { return getClient(config).faq.list(); }
export async function getGallery(config?: SiteraClientConfig) { return getClient(config).gallery.list(); }
export async function getPromotions(config?: SiteraClientConfig) { return getClient(config).promotions.list(); }
export async function getPages(config?: SiteraClientConfig) { return getClient(config).pages.list(); }
export async function getPageBySlug(slug: string, config?: SiteraClientConfig) { return getClient(config).pages.getBySlug(slug); }
export async function getNavigation(config?: SiteraClientConfig) { return getClient(config).navigation.get(); }
export async function getLocations(config?: SiteraClientConfig) { return getClient(config).locations.list(); }
export async function getSiteSettings(config?: SiteraClientConfig) { return getClient(config).settings.get(); }
