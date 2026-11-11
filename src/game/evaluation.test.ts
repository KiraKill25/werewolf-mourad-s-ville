import { describe, expect, it } from "vitest";
import { addDebatePenalty, createGame } from "./engine";
import { buildScorecards, isEnemy } from "./evaluation";

const game = (roles: string[]) => createGame(roles.map((roleId, i) => ({ name: `P${i}`, roleId })));
const card = (cards: ReturnType<typeof buildScorecards>, id: string) =>
  cards.find((c) => c.player.id === id)!;

describe("Evaluation", () => {
  it("counts a villager's vote against a solo role as a right vote", () => {
    const s = game(["simple-villageois", "pyromaniac", "loup-garou"]);
    expect(isEnemy(s.players[0], s.players[1])).toBe(true);
    const cards = buildScorecards(s, [
      {
        day: 1,
        ballots: [{ voterId: s.players[0].id, targets: [s.players[1].id] }],
        eliminated: [],
      },
    ]);
    expect(card(cards, s.players[0].id).accuracy).toBe(100);
  });

  it("removes 6 points per debate sanction, counted across the whole game", () => {
    const s0 = game(["simple-villageois", "loup-garou", "voyante"]);
    const id = s0.players[0].id;
    const before = card(buildScorecards(s0, []), id).pillars.debate;
    const s2 = addDebatePenalty(addDebatePenalty(s0, id), id);
    const after = card(buildScorecards(s2, []), id);
    expect(after.penalties).toBe(2);
    expect(before - after.pillars.debate).toBe(12);
  });

  it("adds 8 points per GM star", () => {
    const s = game(["simple-villageois", "loup-garou", "voyante"]);
    const id = s.players[0].id;
    const base = card(buildScorecards(s, []), id).score;
    const starred = { ...s, players: s.players.map((p) => (p.id === id ? { ...p, stars: 2 } : p)) };
    expect(card(buildScorecards(starred, []), id).score - base).toBe(16);
  });

  it("gives the winning team 15 points", () => {
    const s = {
      ...game(["simple-villageois", "loup-garou", "voyante"]),
      winnerTeam: "VILLAGE" as const,
    };
    const v = card(buildScorecards(s, []), s.players[0].id);
    const w = card(buildScorecards(s, []), s.players[1].id);
    expect(v.won).toBe(true);
    expect(v.pillars.status - w.pillars.status).toBe(15);
  });
});
