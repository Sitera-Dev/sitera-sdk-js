import { describe, it, expect } from "vitest";
import { getSection, getSections, sortSections, getEnabledSections } from "../../src/helpers/section.js";
import type { SiteraPage, SiteraSection } from "../../src/types/page.js";
import type { SiteraSEO } from "../../src/types/seo.js";

const mockSections: SiteraSection[] = [
  { id: "1", type: "hero", enabled: true, order: 2, content: {} as any },
  { id: "2", type: "about", enabled: false, order: 1, content: {} as any },
  { id: "3", type: "services", enabled: true, order: 3, content: {} as any },
  { id: "4", type: "services", enabled: true, order: 0, content: {} as any },
];

const mockPage: SiteraPage = {
  id: "page1",
  slug: "home",
  title: "Home",
  type: "home",
  status: "published",
  seo: {} as SiteraSEO,
  sections: mockSections,
  order: 0,
  createdAt: "2023-01-01T00:00:00Z",
  updatedAt: "2023-01-01T00:00:00Z"
};

describe("section helpers", () => {
  it("gets a single section by type", () => {
    const hero = getSection(mockPage, "hero");
    expect(hero?.id).toBe("1");
    expect(hero?.type).toBe("hero");

    const nonExistent = getSection(mockPage, "contact");
    expect(nonExistent).toBeUndefined();
  });

  it("gets all sections by type", () => {
    const services = getSections(mockPage, "services");
    expect(services).toHaveLength(2);
    expect(services[0]?.id).toBe("3");
    expect(services[1]?.id).toBe("4");
  });

  it("sorts sections by order", () => {
    const sorted = sortSections(mockSections);
    expect(sorted[0]?.id).toBe("4"); // order 0
    expect(sorted[1]?.id).toBe("2"); // order 1
    expect(sorted[2]?.id).toBe("1"); // order 2
    expect(sorted[3]?.id).toBe("3"); // order 3
  });

  it("gets only enabled sections", () => {
    const enabled = getEnabledSections(mockSections);
    expect(enabled).toHaveLength(3);
    expect(enabled.find(s => s.id === "2")).toBeUndefined();
  });
});
