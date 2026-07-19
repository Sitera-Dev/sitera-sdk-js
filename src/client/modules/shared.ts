import type { SiteraDataProvider } from "../../types/provider.js";
import type { SiteraListOptions, SiteraPaginatedResult } from "../../types/common.js";
import { SiteraNotFoundError } from "../../core/errors.js";

type HasId = { id: string };
type HasSlug = { slug: string };
type HasFeatured = { featured: boolean };
type HasAvailable = { available: boolean };
type HasCategory = { category?: string };
type HasOrder = { order: number };
type HasName = { name: string };

export function applyListOptions<T extends HasOrder>(items: T[], options?: SiteraListOptions): T[] {
  let result = [...items];
  if (options?.featured !== undefined && "featured" in result[0]!) result = result.filter((i) => (i as unknown as HasFeatured).featured === options.featured);
  if (options?.available !== undefined && "available" in result[0]!) result = result.filter((i) => (i as unknown as HasAvailable).available === options.available);
  if (options?.category && "category" in result[0]!) result = result.filter((i) => (i as unknown as HasCategory).category === options.category);
  if (options?.search) {
    const q = options.search.toLowerCase();
    result = result.filter((i) => "name" in i && (i as unknown as HasName).name.toLowerCase().includes(q));
  }
  const dir = options?.sortDirection === "desc" ? -1 : 1;
  const sortBy = options?.sortBy ?? "order";
  result.sort((a, b) => {
    const av = (a as Record<string, unknown>)[sortBy];
    const bv = (b as Record<string, unknown>)[sortBy];
    if (typeof av === "number" && typeof bv === "number") return (av - bv) * dir;
    return String(av ?? "").localeCompare(String(bv ?? "")) * dir;
  });
  const offset = options?.offset ?? 0;
  const limit = options?.limit ?? result.length;
  return result.slice(offset, offset + limit);
}

export function applyListWithMeta<T extends HasOrder>(items: T[], options?: SiteraListOptions): SiteraPaginatedResult<T> {
  const filtered = applyListOptions(items, { ...options, limit: undefined, offset: undefined });
  const offset = options?.offset ?? 0;
  const limit = options?.limit ?? filtered.length;
  const data = filtered.slice(offset, offset + limit);
  return { data, meta: { total: filtered.length, limit, offset, hasMore: offset + limit < filtered.length } };
}

export function findById<T extends HasId>(items: T[], id: string, resource: string): T {
  const found = items.find((i) => i.id === id);
  if (!found) throw new SiteraNotFoundError(resource, `id "${id}"`);
  return found;
}

export function findBySlug<T extends HasSlug>(items: T[], slug: string, resource: string): T {
  const found = items.find((i) => i.slug === slug);
  if (!found) throw new SiteraNotFoundError(resource, `slug "${slug}"`);
  return found;
}
