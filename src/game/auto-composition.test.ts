import { describe, it, expect } from "vitest";
import { autoComposition, wolfCount } from "./auto-composition";
const WOLVES = ["loup-garou", "loup-rouge", "loup-noir"];
describe("autoComposition", () => {
  for (let n = 5; n <= 18; n++) {
    it(`balances ${n} players`, () => {
      for (let k = 0; k < 20; k++) {
        const c = autoComposition(n);
        expect(Object.values(c).reduce((a, b) => a + b, 0)).toBe(n);
        expect(c.salvateur).toBe(1);
        expect(c.sorciere).toBe(1);
        expect(c["loup-garou"]).toBeGreaterThanOrEqual(1);
        expect(WOLVES.reduce((a, w) => a + (c[w] ?? 0), 0)).toBe(wolfCount(n));
        expect(c.voyante).toBe(1);
      }
    });
  }
  it("wolf ratio by size", () => {
    expect([6, 8, 12, 16].map(wolfCount)).toEqual([1, 2, 3, 4]);
  });
});
