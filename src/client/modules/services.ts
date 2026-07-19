import type { SiteraServiceModule } from "../../types/api.js";
import type { SiteraDataProvider, SiteraProviderContext } from "../../types/provider.js";
import type { SiteraListOptions } from "../../types/common.js";
import { applyListOptions, applyListWithMeta, findById, findBySlug } from "./shared.js";
export function createServiceModule(provider: SiteraDataProvider, ctx: SiteraProviderContext): SiteraServiceModule {
  const getAll = () => provider.getServices(ctx);
  return {
    async list(options?: SiteraListOptions) { return applyListOptions(await getAll(), options); },
    async listWithMeta(options?: SiteraListOptions) { return applyListWithMeta(await getAll(), options); },
    async getById(id: string) { return findById(await getAll(), id, "service"); },
    async getBySlug(slug: string) { return findBySlug(await getAll(), slug, "service"); },
    async getFeatured() { return (await getAll()).filter((s) => s.featured); },
    async getCategories() { return [...new Set((await getAll()).map((s) => s.category).filter(Boolean) as string[])]; },
  };
}
