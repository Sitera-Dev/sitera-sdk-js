import type { SiteraFAQModule } from "../../types/api.js";
import type { SiteraDataProvider, SiteraProviderContext } from "../../types/provider.js";
import type { SiteraListOptions } from "../../types/common.js";
import { applyListOptions, applyListWithMeta } from "./shared.js";
export function createFAQModule(provider: SiteraDataProvider, ctx: SiteraProviderContext): SiteraFAQModule {
  const getAll = () => provider.getFAQs(ctx);
  return {
    async list(options?: SiteraListOptions) { return applyListOptions(await getAll(), options); },
    async listWithMeta(options?: SiteraListOptions) { return applyListWithMeta(await getAll(), options); },
    async getCategories() { return [...new Set((await getAll()).map((f) => f.category).filter(Boolean) as string[])]; },
  };
}
