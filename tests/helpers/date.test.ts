import { describe, it, expect } from "vitest";
import { isBusinessOpenNow, getTodayOperatingHours, getNextOpeningTime, formatOperatingHours } from "../../src/helpers/date.js";
import type { SiteraOperatingHours } from "../../src/types/operating-hours.js";

const mockHours: SiteraOperatingHours[] = [
  { day: "monday", enabled: true, periods: [{ open: "09:00", close: "17:00" }] },
  { day: "tuesday", enabled: true, periods: [{ open: "09:00", close: "17:00" }] },
  { day: "wednesday", enabled: true, periods: [{ open: "09:00", close: "17:00" }] },
  { day: "thursday", enabled: true, periods: [{ open: "09:00", close: "17:00" }] },
  { day: "friday", enabled: true, periods: [{ open: "09:00", close: "12:00" }, { open: "13:00", close: "17:00" }] },
  { day: "saturday", enabled: false, periods: [] },
  { day: "sunday", enabled: false, periods: [] },
];

// 2023-10-16 is a Monday
const MONDAY_MORNING = new Date("2023-10-16T08:00:00Z"); // 15:00 Jakarta (Open)
const MONDAY_NIGHT = new Date("2023-10-16T15:00:00Z");   // 22:00 Jakarta (Closed)
const FRIDAY_LUNCH = new Date("2023-10-20T05:30:00Z");   // 12:30 Jakarta (Closed)
const SATURDAY = new Date("2023-10-21T05:00:00Z");       // 12:00 Jakarta (Closed)

describe("date helpers", () => {
  it("checks if business is open now", () => {
    expect(isBusinessOpenNow(mockHours, { now: MONDAY_MORNING, timezone: "Asia/Jakarta" })).toBe(true);
    expect(isBusinessOpenNow(mockHours, { now: MONDAY_NIGHT, timezone: "Asia/Jakarta" })).toBe(false);
    expect(isBusinessOpenNow(mockHours, { now: FRIDAY_LUNCH, timezone: "Asia/Jakarta" })).toBe(false);
    expect(isBusinessOpenNow(mockHours, { now: SATURDAY, timezone: "Asia/Jakarta" })).toBe(false);
  });

  it("gets today operating hours", () => {
    const today = getTodayOperatingHours(mockHours, { now: MONDAY_MORNING, timezone: "Asia/Jakarta" });
    expect(today?.day).toBe("monday");
    expect(today?.enabled).toBe(true);
  });

  it("gets next opening time", () => {
    // Already closed on Monday, next is Tuesday 09:00
    const next1 = getNextOpeningTime(mockHours, { now: MONDAY_NIGHT, timezone: "Asia/Jakarta" });
    expect(next1?.day).toBe("tuesday");
    expect(next1?.period.open).toBe("09:00");

    // Closed on Saturday, next is Monday 09:00
    const next2 = getNextOpeningTime(mockHours, { now: SATURDAY, timezone: "Asia/Jakarta" });
    expect(next2?.day).toBe("monday");
    expect(next2?.period.open).toBe("09:00");
  });

  it("formats operating hours", () => {
    const formatted = formatOperatingHours(mockHours);
    expect(formatted[0]).toBe("Monday: 09:00 - 17:00");
    expect(formatted[4]).toBe("Friday: 09:00 - 12:00, 13:00 - 17:00");
    expect(formatted[5]).toBe("Saturday: Tutup");
  });
});
