import type { SiteraProductModule } from "../../types/api.js";
import type { SiteraDataProvider, SiteraProviderContext } from "../../types/provider.js";
import type { SiteraListOptions } from "../../types/common.js";
import { applyListOptions, applyListWithMeta, findById, findBySlug } from "./shared.js";
export function createProductModule(provider: SiteraDataProvider, ctx: SiteraProviderContext): SiteraProductModule {
  const getAll = () => provider.getProducts(ctx);
  return {
    async list(options?: SiteraListOptions) { return applyListOptions(await getAll(), options); },
    async listWithMeta(options?: SiteraListOptions) { return applyListWithMeta(await getAll(), options); },
    async getById(id: string) { return findById(await getAll(), id, "product"); },
    async getBySlug(slug: string) { return findBySlug(await getAll(), slug, "product"); },
    async getFeatured() { return (await getAll()).filter((p) => p.featured); },
    async getCategories() { return [...new Set((await getAll()).map((p) => p.category))]; },
  };
}
