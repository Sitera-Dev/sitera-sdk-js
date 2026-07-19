import type { SiteraNavigationModule } from "../../types/api.js";
import type { SiteraDataProvider, SiteraProviderContext } from "../../types/provider.js";
export function createNavigationModule(provider: SiteraDataProvider, ctx: SiteraProviderContext): SiteraNavigationModule {
  return { async get() { return provider.getNavigation(ctx); } };
}
