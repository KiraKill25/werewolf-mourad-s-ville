import { describe, expect, it } from "vitest";
import { createGame, submitStep } from "./engine";

const game = (roles: string[]) => createGame(roles.map((roleId, i) => ({ name: `P${i}`, roleId })));
const atWild = (s: ReturnType<typeof game>) => ({
  ...s,
  stepIndex: s.steps.findIndex((x) => x.roleId === "enfant-sauvage"),
});

describe("Wild Child", () => {
  it("joins the wolves immediately when the chosen idol is a wolf", () => {
    const s = game(["enfant-sauvage", "loup-garou", "simple-villageois", "voyante"]);
    const out = submitStep(atWild(s), { targetId: s.players[1].id });
    expect(out.players[0].team).toBe("WEREWOLVES");
  });
  it("stays with the village when the idol is not a wolf", () => {
    const s = game(["enfant-sauvage", "loup-garou", "simple-villageois", "voyante"]);
    const out = submitStep(atWild(s), { targetId: s.players[2].id });
    expect(out.players[0].team).toBe("VILLAGEOIS");
  });
});
