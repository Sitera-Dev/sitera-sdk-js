import { describe, it, expect } from "vitest";
import { formatMoney, createMoney, parseMoney } from "../../src/helpers/currency.js";

describe("currency helpers", () => {
  it("creates money objects", () => {
    const money = createMoney(50000);
    expect(money.amount).toBe(50000);
    expect(money.currency).toBe("IDR");
    expect(money.formatted).toBe("Rp50.000"); // id-ID locale

    const usd = createMoney(1500, "USD");
    expect(usd.currency).toBe("USD");
    expect(usd.formatted).toBe("$15.00");
  });

  it("formats money objects", () => {
    const money = createMoney(100000);
    expect(formatMoney(money)).toBe("Rp100.000");
  });

  it("parses formatted money strings", () => {
    const money = parseMoney("Rp 50.000");
    expect(money.amount).toBe(50000);

    const usd = parseMoney("$15.00", "USD");
    expect(usd.amount).toBe(1500);

    const empty = parseMoney("invalid");
    expect(empty.amount).toBe(0);
  });
});
