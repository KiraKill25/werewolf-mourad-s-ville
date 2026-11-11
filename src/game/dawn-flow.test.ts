import { describe, expect, it } from "vitest";
import { assignCaptain, checkVictory, confirmNightReport, createGame, resolveBabyWolf, resolveHunter, submitStep } from "./engine";

function dawn(roleId: string) {
  const s = createGame([roleId, "loup-garou", "simple-villageois", "voyante", "simple-villageois", "simple-villageois"].map((roleId, i) => ({ roleId, name: `P${i}` })));
  s.players[0].isCaptain = true;
  s.villageCaptainId = s.players[0].id;
  s.round.poisonedId = s.players[0].id;
  s.stepIndex = s.steps.length;
  return submitStep(s, {});
}

describe("guided dawn", () => {
  it("holds a night-killed Hunter at dawn until the report and succession are confirmed", () => {
    const s = dawn("chasseur");
    expect(s.phase).toBe("AUBE");
    expect(s.dawnReportPending).toBe(true);
    expect(s.hunterPending).toBe(s.players[0].id);
    expect(checkVictory(s).phase).toBe("AUBE");
    const report = confirmNightReport(s);
    expect(report.phase).toBe("AUBE");
    expect(report.captainSuccessionPending).toBe(s.players[0].id);
    const succession = assignCaptain(report, s.players[2].id);
    expect(succession.phase).toBe("EVENEMENT_MORT");
    expect(succession.deathResumePhase).toBe("AUBE");
    const shot = resolveHunter(succession, s.players[4].id);
    expect(shot.phase).toBe("AUBE");
    expect(shot.players[4].alive).toBe(false);
    expect(shot.dawnReportPending).toBe(false);
  });
  it("holds Baby Wolf revenge behind the night report", () => {
    const s = dawn("bébé-loup");
    expect(s.phase).toBe("AUBE");
    expect(s.babyWolfPending).toEqual([s.players[0].id]);
    const ready = assignCaptain(confirmNightReport(s), s.players[2].id);
    expect(ready.phase).toBe("EVENEMENT_MORT");
    expect(resolveBabyWolf(ready, s.players[4].id).phase).toBe("AUBE");
  });
  it("allows a chained Hunter death and another captain succession before debate", () => {
    const s = dawn("bébé-loup");
    s.players[2].roleId = "chasseur";
    const ready = assignCaptain(confirmNightReport(s), s.players[2].id);
    const chained = resolveBabyWolf(ready, s.players[2].id);
    expect(chained.phase).toBe("EVENEMENT_MORT");
    expect(chained.hunterPending).toBe(s.players[2].id);
    expect(chained.captainSuccessionPending).toBe(s.players[2].id);
    const successor = assignCaptain(chained, s.players[4].id);
    expect(resolveHunter(successor, s.players[5].id).phase).toBe("AUBE");
  });
  it("defers dawn victory until the report is confirmed", () => {
    const s = dawn("simple-villageois");
    s.captainSuccessionPending = undefined;
    s.players[1].alive = false;
    expect(checkVictory(s).phase).toBe("AUBE");
    expect(confirmNightReport(s).phase).toBe("FIN");
  });
});