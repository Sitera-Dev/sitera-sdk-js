import type { SiteraSettingsModule } from "../../types/api.js";
import type { SiteraDataProvider, SiteraProviderContext } from "../../types/provider.js";
export function createSettingsModule(provider: SiteraDataProvider, ctx: SiteraProviderContext): SiteraSettingsModule {
  return { async get() { return provider.getSettings(ctx); } };
}
