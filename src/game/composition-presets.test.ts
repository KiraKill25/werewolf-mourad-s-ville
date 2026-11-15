import { describe, expect, it } from "vitest";
import { presetComposition, type PresetTheme } from "./composition-presets";

const themes: PresetTheme[] = ["classic", "bluff", "chaos"];
const wolfIds = ["loup-garou", "loup-rouge", "loup-noir", "loup-bavard", "bébé-loup", "loup-matriarche"];

describe("presetComposition", () => {
  for (const theme of themes)
    for (let n = 5; n <= 18; n++)
      it(`${theme} ${n} players: total, core trio, wolf count`, () => {
        const c = presetComposition(n, theme);
        expect(Object.values(c).reduce((a, b) => a + b, 0)).toBe(n);
        expect(c.salvateur).toBe(1);
        expect(c.sorciere).toBe(1);
        expect(c["loup-garou"]).toBeGreaterThanOrEqual(1);
        const wolves = wolfIds.reduce((a, id) => a + (c[id] ?? 0), 0);
        expect(wolves).toBe(n <= 7 ? 1 : n <= 11 ? 2 : n <= 15 ? 3 : 4);
      });
  it("no solo roles under 10 players", () => {
    const c = presetComposition(9, "chaos");
    expect(c["loup-blanc"] ?? 0).toBe(0);
    expect(c["joueur-de-flute"] ?? 0).toBe(0);
  });
});
