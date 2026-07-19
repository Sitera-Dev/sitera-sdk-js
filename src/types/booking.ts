export interface SiteraFormField {
  id: string;
  name: string;
  label: string;
  type: "text" | "email" | "phone" | "textarea" | "number" | "date" | "time" | "select" | "checkbox" | "radio";
  placeholder?: string;
  required: boolean;
  options?: { label: string; value: string }[];
  validation?: { min?: number; max?: number; pattern?: string; message?: string };
  order: number;
}

export interface SiteraBookingSettings {
  enabled: boolean;
  mode: "appointment" | "reservation" | "consultation" | "property-visit" | "room-booking" | "class-registration" | "custom";
  channels: Array<"website" | "whatsapp" | "phone" | "email" | "external">;
  externalUrl?: string;
  minimumAdvanceMinutes?: number;
  maximumAdvanceDays?: number;
  slotDurationMinutes?: number;
  requireConfirmation?: boolean;
  requireDeposit?: boolean;
  fields: SiteraFormField[];
}
