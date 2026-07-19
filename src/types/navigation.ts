/** Navigation item */
export interface SiteraNavigationItem {
  id: string;
  label: string;
  href: string;
  target?: "_self" | "_blank";
  icon?: string;
  children?: SiteraNavigationItem[];
  order: number;
  visible: boolean;
}

/** Navigation group (footer) */
export interface SiteraNavigationGroup {
  id: string;
  title?: string;
  items: SiteraNavigationItem[];
  order: number;
}

/** Full navigation */
export interface SiteraNavigation {
  header: SiteraNavigationItem[];
  footer: SiteraNavigationGroup[];
  social?: SiteraNavigationItem[];
}
