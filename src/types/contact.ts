/**
 * @module @sitera/sdk/types/contact
 * Contact information types.
 */

/** Business contact details */
export interface SiteraBusinessContact {
  email?: string;
  secondaryEmail?: string;
  phone?: string;
  secondaryPhone?: string;
  whatsapp?: string;
  fax?: string;

  contactPerson?: {
    name: string;
    role?: string;
    email?: string;
    phone?: string;
  };

  support?: {
    email?: string;
    phone?: string;
    whatsapp?: string;
    availableHours?: string;
  };
}
