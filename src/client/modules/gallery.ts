import type { SiteraGalleryModule } from "../../types/api.js";
import type { SiteraDataProvider, SiteraProviderContext } from "../../types/provider.js";
import type { SiteraListOptions } from "../../types/common.js";
import { applyListOptions, applyListWithMeta } from "./shared.js";
export function createGalleryModule(provider: SiteraDataProvider, ctx: SiteraProviderContext): SiteraGalleryModule {
  const getAll = () => provider.getGallery(ctx);
  return {
    async list(options?: SiteraListOptions) { return applyListOptions(await getAll(), options); },
    async listWithMeta(options?: SiteraListOptions) { return applyListWithMeta(await getAll(), options); },
    async getFeatured() { return (await getAll()).filter((g) => g.featured); },
  };
}
