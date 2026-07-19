import type { SiteraLocationModule } from "../../types/api.js";
import type { SiteraDataProvider, SiteraProviderContext } from "../../types/provider.js";
import { findById } from "./shared.js";
import { SiteraNotFoundError } from "../../core/errors.js";
export function createLocationModule(provider: SiteraDataProvider, ctx: SiteraProviderContext): SiteraLocationModule {
  const getAll = () => provider.getLocations(ctx);
  return {
    async list() { return getAll(); },
    async getById(id: string) { return findById(await getAll(), id, "location"); },
    async getPrimary() {
      const all = await getAll();
      const primary = all.find((l) => l.isPrimary);
      if (!primary) throw new SiteraNotFoundError("location", 'isPrimary "true"');
      return primary;
    },
  };
}
