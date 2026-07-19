import type { SiteraTeamModule } from "../../types/api.js";
import type { SiteraDataProvider, SiteraProviderContext } from "../../types/provider.js";
import type { SiteraListOptions } from "../../types/common.js";
import { applyListOptions, applyListWithMeta, findById } from "./shared.js";
export function createTeamModule(provider: SiteraDataProvider, ctx: SiteraProviderContext): SiteraTeamModule {
  const getAll = () => provider.getTeam(ctx);
  return {
    async list(options?: SiteraListOptions) { return applyListOptions(await getAll(), options); },
    async listWithMeta(options?: SiteraListOptions) { return applyListWithMeta(await getAll(), options); },
    async getById(id: string) { return findById(await getAll(), id, "team member"); },
    async getFeatured() { return (await getAll()).filter((t) => t.featured); },
  };
}
