import type { SiteraBusinessModule } from "../../types/api.js";
import type { SiteraDataProvider, SiteraProviderContext } from "../../types/provider.js";
export function createBusinessModule(provider: SiteraDataProvider, ctx: SiteraProviderContext): SiteraBusinessModule {
  return {
    async get() { return provider.getBusiness(ctx); },
    async getIdentity() { return (await provider.getBusiness(ctx)).identity; },
    async getContact() { return (await provider.getBusiness(ctx)).contact; },
    async getBranding() { return (await provider.getBusiness(ctx)).branding; },
    async getSEO() { return (await provider.getBusiness(ctx)).seo; },
    async getSocialLinks() { return (await provider.getBusiness(ctx)).socialLinks; },
    async getOperatingHours() { return (await provider.getBusiness(ctx)).operatingHours; },
    async getLegalInformation() { return (await provider.getBusiness(ctx)).legal; },
  };
}
