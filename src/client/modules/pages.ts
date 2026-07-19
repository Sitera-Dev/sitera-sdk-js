import type { SiteraPageModule } from "../../types/api.js";
import type { SiteraDataProvider, SiteraProviderContext } from "../../types/provider.js";
import type { SiteraPage } from "../../types/page.js";
import { findById, findBySlug } from "./shared.js";
export function createPageModule(provider: SiteraDataProvider, ctx: SiteraProviderContext): SiteraPageModule {
  const getAll = () => provider.getPages(ctx);
  return {
    async list() { return getAll(); },
    async getById(id: string) { return findById(await getAll(), id, "page"); },
    async getBySlug(slug: string) { return findBySlug(await getAll(), slug, "page"); },
    async getByType(type: SiteraPage["type"]) { return (await getAll()).filter((p) => p.type === type); },
  };
}
