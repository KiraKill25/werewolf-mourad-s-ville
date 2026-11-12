import { describe, it, expect } from "vitest";
import { createGame, canWitchHeal } from "./engine";

const g = () => createGame(["salvateur", "sorciere", "loup-garou", "simple-villageois"].map((roleId, i) => ({ roleId, name: `P${i}` })));

describe("witch heal vs Salvateur protection", () => {
  it("no heal offered when the wolves' victim is protected", () => {
    const s = g();
    s.round.attackedId = s.players[3].id;
    s.round.protectedId = s.players[3].id;
    expect(canWitchHeal(s)).toBe(false);
  });
  it("no heal offered under the village shield", () => {
    const s = g();
    s.round.attackedId = s.players[3].id;
    s.round.villageShield = true;
    expect(canWitchHeal(s)).toBe(false);
  });
  it("heal offered when the victim is unprotected", () => {
    const s = g();
    s.round.attackedId = s.players[3].id;
    s.round.protectedId = s.players[0].id;
    expect(canWitchHeal(s)).toBe(true);
  });
});
