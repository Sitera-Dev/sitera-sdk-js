import type { SiteraPage, SiteraSection, SiteraBaseSection } from "../types/page.js";

/** Get a single section of a specific type from a page */
export function getSection<T extends SiteraSection["type"]>(
  page: SiteraPage,
  type: T
): Extract<SiteraSection, { type: T }> | undefined {
  return page.sections.find((s) => s.type === type) as Extract<SiteraSection, { type: T }> | undefined;
}

/** Get all sections of a specific type from a page */
export function getSections<T extends SiteraSection["type"]>(
  page: SiteraPage,
  type: T
): Extract<SiteraSection, { type: T }>[] {
  return page.sections.filter((s) => s.type === type) as Extract<SiteraSection, { type: T }>[];
}

/** Sort sections by order */
export function sortSections(sections: SiteraSection[]): SiteraSection[] {
  return [...sections].sort((a, b) => a.order - b.order);
}

/** Get only enabled sections */
export function getEnabledSections(sections: SiteraSection[]): SiteraSection[] {
  return sections.filter((s) => s.enabled);
}
