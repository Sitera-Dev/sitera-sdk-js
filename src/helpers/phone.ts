/** Normalize a phone number to digits-only with country code */
export function normalizePhoneNumber(phone: string | undefined): string {
  if (!phone) return "";
  let digits = phone.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) {
    digits = digits.slice(1);
  } else if (digits.startsWith("0")) {
    digits = "62" + digits.slice(1);
  }
  return digits;
}

/** Format a phone number for display */
export function formatPhoneNumber(phone: string | undefined): string {
  const norm = normalizePhoneNumber(phone);
  if (!norm) return "";
  if (norm.startsWith("62")) {
    const local = norm.slice(2);
    return `+62 ${local.slice(0, 3)}-${local.slice(3, 7)}-${local.slice(7)}`;
  }
  return `+${norm}`;
}

/** Create a WhatsApp URL */
export function createWhatsAppUrl(options: { phone: string | undefined; message?: string }): string {
  const digits = normalizePhoneNumber(options.phone);
  if (!digits) return "";
  const base = `https://wa.me/${digits}`;
  if (options.message) {
    return `${base}?text=${encodeURIComponent(options.message)}`;
  }
  return base;
}
