import { describe, expect, it } from "vitest";
import { applyJailor, applyRaven, buildNightSteps, createGame, preVoteActor } from "./engine";

function game(n: number) {
  const roles = ["corbeau", "geolier", "loup-garou", ...Array(n - 3).fill("villageois")];
  const s = createGame(roles.map((r, i) => ({ name: `P${i}`, roleId: r })) as never);
  return s;
}

describe("Raven & Jailor before vote", () => {
  it("no longer wake at night", () => {
    const s = { ...game(12), night: 2 };
    const ids = buildNightSteps(s).map((x) => x.roleId);
    expect(ids).not.toContain("corbeau");
    expect(ids).not.toContain("geolier");
  });
  it("do not play on day 1", () => {
    expect(preVoteActor({ ...game(12), day: 1 }, "corbeau")).toBeUndefined();
    expect(preVoteActor({ ...game(12), day: 2 }, "geolier")).toBeDefined();
  });
  it("raven splits 2 votes over two players when village > 10", () => {
    const s = { ...game(12), day: 2 };
    const [a, b] = [s.players[3].id, s.players[4].id];
    const r = applyRaven(s, [a, b]);
    expect(r.players[3].baseVotes).toBe(1);
    expect(r.players[4].baseVotes).toBe(1);
  });
  it("raven gives only 1 vote when village <= 10", () => {
    const s = { ...game(8), day: 2 };
    const r = applyRaven(s, [s.players[3].id, s.players[4].id]);
    expect(r.players[3].baseVotes + r.players[4].baseVotes).toBe(1);
  });
  it("jailor removes target's vote", () => {
    const s = { ...game(8), day: 2 };
    expect(applyJailor(s, s.players[3].id).players[3].canVote).toBe(false);
  });
});
