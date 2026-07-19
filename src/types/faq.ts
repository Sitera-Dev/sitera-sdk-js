/**
 * @module @sitera/sdk/types/faq
 * FAQ types.
 */

/** Frequently asked question */
export interface SiteraFAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
  featured: boolean;
  order: number;
}
