import type { SiteraPromotionModule } from "../../types/api.js";
import type { SiteraDataProvider, SiteraProviderContext } from "../../types/provider.js";
import type { SiteraListOptions } from "../../types/common.js";
import { applyListOptions, applyListWithMeta } from "./shared.js";
export function createPromotionModule(provider: SiteraDataProvider, ctx: SiteraProviderContext): SiteraPromotionModule {
  const getAll = () => provider.getPromotions(ctx);
  return {
    async list(options?: SiteraListOptions) { return applyListOptions(await getAll() as any, options) as any; },
    async listWithMeta(options?: SiteraListOptions) { return applyListWithMeta(await getAll() as any, options) as any; },
    async getActive() { return (await getAll()).filter((p) => p.active); },
    async getFeatured() { return (await getAll()).filter((p) => p.featured); },
  };
}
