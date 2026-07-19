import type { SiteraOperatingHours, SiteraOperatingPeriod } from "../types/operating-hours.js";
import type { SiteraWeekday } from "../types/common.js";

const WEEKDAYS: SiteraWeekday[] = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

/** Check if a business is currently open */
export function isBusinessOpenNow(
  hours: SiteraOperatingHours[],
  options?: { timezone?: string; now?: Date }
): boolean {
  const now = options?.now ?? new Date();
  const tz = options?.timezone ?? "Asia/Jakarta";
  const today = getTodayOperatingHours(hours, { timezone: tz, now });
  if (!today || !today.enabled || today.periods.length === 0) return false;

  const currentTime = getCurrentTimeString(now, tz);
  return today.periods.some((p) => currentTime >= p.open && currentTime < p.close);
}

/** Get today's operating hours */
export function getTodayOperatingHours(
  hours: SiteraOperatingHours[],
  options?: { timezone?: string; now?: Date }
): SiteraOperatingHours | undefined {
  const now = options?.now ?? new Date();
  const tz = options?.timezone ?? "Asia/Jakarta";
  const dayIndex = getDayIndex(now, tz);
  const dayName = WEEKDAYS[dayIndex];
  return hours.find((h) => h.day === dayName);
}

/** Get the next opening time */
export function getNextOpeningTime(
  hours: SiteraOperatingHours[],
  options?: { timezone?: string; now?: Date }
): { day: SiteraWeekday; period: SiteraOperatingPeriod } | undefined {
  const now = options?.now ?? new Date();
  const tz = options?.timezone ?? "Asia/Jakarta";
  const dayIndex = getDayIndex(now, tz);
  const currentTime = getCurrentTimeString(now, tz);

  // Check remaining periods today
  const todayName = WEEKDAYS[dayIndex];
  const today = hours.find((h) => h.day === todayName);
  if (today?.enabled) {
    const nextPeriod = today.periods.find((p) => p.open > currentTime);
    if (nextPeriod) return { day: todayName!, period: nextPeriod };
  }

  // Check subsequent days
  for (let offset = 1; offset <= 7; offset++) {
    const idx = (dayIndex + offset) % 7;
    const dayName = WEEKDAYS[idx];
    const dayHours = hours.find((h) => h.day === dayName);
    if (dayHours?.enabled && dayHours.periods.length > 0) {
      return { day: dayName!, period: dayHours.periods[0]! };
    }
  }
  return undefined;
}

/** Format operating hours for display */
export function formatOperatingHours(hours: SiteraOperatingHours[]): string[] {
  return hours.map((h) => {
    if (!h.enabled) return `${capitalize(h.day)}: Tutup`;
    const periods = h.periods.map((p) => `${p.open} - ${p.close}`).join(", ");
    return `${capitalize(h.day)}: ${periods}`;
  });
}

function getDayIndex(date: Date, timezone: string): number {
  const dateStr = date.toLocaleDateString("en-US", { weekday: "long", timeZone: timezone });
  const map: Record<string, number> = { Monday: 0, Tuesday: 1, Wednesday: 2, Thursday: 3, Friday: 4, Saturday: 5, Sunday: 6 };
  return map[dateStr] ?? 0;
}

function getCurrentTimeString(date: Date, timezone: string): string {
  return date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: timezone, hour12: false });
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
