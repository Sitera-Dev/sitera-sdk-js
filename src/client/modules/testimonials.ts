import type { SiteraTestimonialModule } from "../../types/api.js";
import type { SiteraDataProvider, SiteraProviderContext } from "../../types/provider.js";
import type { SiteraListOptions } from "../../types/common.js";
import { applyListOptions, applyListWithMeta } from "./shared.js";
export function createTestimonialModule(provider: SiteraDataProvider, ctx: SiteraProviderContext): SiteraTestimonialModule {
  const getAll = () => provider.getTestimonials(ctx);
  return {
    async list(options?: SiteraListOptions) { return applyListOptions(await getAll() as any, options) as any; },
    async listWithMeta(options?: SiteraListOptions) { return applyListWithMeta(await getAll() as any, options) as any; },
    async getFeatured() { return (await getAll()).filter((t) => t.featured); },
  };
}
