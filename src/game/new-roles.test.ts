import { describe, expect, it } from "vitest";
import {
  buildNightSteps,
  checkVictory,
  createGame,
  resolveBabyWolf,
  submitStep,
  submitVote,
  suicideRevealMany,
  startNight,
  resolveHunter,
} from "./engine";

const game = (roles: string[]) => createGame(roles.map((roleId, i) => ({ name: `P${i}`, roleId })));
const game2 = (roles: string[]) => {
  const s = game(roles);
  s.night = 2;
  s.steps = buildNightSteps(s);
  return s;
};
const at = (s: ReturnType<typeof game>, role: string) => ({
  ...s,
  stepIndex: s.steps.findIndex((x) => x.roleId === role),
});

describe("new role rules", () => {
  it("lets Pyromaniac douse one player in villages of 10", () => {
    const s = game(["pyromaniac", ...Array(9).fill("simple-villageois")]);
    expect(s.steps.find((x) => x.roleId === "pyromaniac")?.mode).toBe("one");
  });
  it("lets Pyromaniac douse up to two players above 10", () => {
    const s = game(["pyromaniac", ...Array(10).fill("simple-villageois")]);
    expect(s.steps.find((x) => x.roleId === "pyromaniac")?.mode).toBe("two");
  });
  it("ignites every doused player once", () => {
    const s = game([
      "pyromaniac",
      "simple-villageois",
      "simple-villageois",
      "simple-villageois",
      "loup-garou",
    ]);
    s.players[1].doused = s.players[2].doused = true;
    const out = submitStep(at(s, "pyromaniac"), { ignite: true });
    expect(out.players.filter((p) => p.deathCause === "FIRE").map((p) => p.name)).toEqual([
      "P1",
      "P2",
    ]);
    expect(out.players[0].matchUsed).toBe(true);
  });
  it("Pyromaniac wins at three survivors", () => {
    const s = game(["pyromaniac", "simple-villageois", "loup-garou"]);
    expect(checkVictory(s).winner).toContain("winPyromaniac");
  });
  it("kills the Alien on its third wrong guess", () => {
    const s = game2(["alien", "simple-villageois", "loup-garou", "voyante"]);
    s.players[0].alienErrors = 2;
    const out = submitStep(at(s, "alien"), { targetId: s.players[1].id, guessedRoleId: "voyante" });
    expect(out.players[0].deathCause).toBe("ALIEN_FAILURE");
  });
  it("Alien kills on an exact role guess", () => {
    const s = game2(["alien", "voyante", "loup-garou", "simple-villageois"]);
    const out = submitStep(at(s, "alien"), { targetId: s.players[1].id, guessedRoleId: "voyante" });
    expect(out.players[1].deathCause).toBe("ALIEN");
  });
  it("Red Wolf wastes a freeze on a powerless player", () => {
    const s = game2(["loup-rouge", "simple-villageois", "voyante"]);
    const out = submitStep(at(s, "loup-rouge"), { targetId: s.players[1].id });
    expect(out.players[1].frozenNight).toBeUndefined();
  });
  it("Red Wolf freezes a power for the night", () => {
    const s = game2(["loup-rouge", "voyante", "simple-villageois"]);
    const out = submitStep(at(s, "loup-rouge"), { targetId: s.players[1].id });
    expect(out.players[1].frozenNight).toBe(2);
  });
  it("Baby Wolf revenge opens after a village vote", () => {
    const s = {
      ...game(["bébé-loup", "simple-villageois", "simple-villageois", "voyante"]),
      phase: "JOUR_VOTE" as const,
      day: 2,
    };
    const pending = submitVote(s, s.players[0].id);
    expect(pending.babyWolfPending).toEqual([s.players[0].id]);
    expect(resolveBabyWolf(pending, s.players[1].id).players[1].deathCause).toBe(
      "BABY_WOLF_REVENGE",
    );
  });
  it("new wolves take the pack kill when alone", () => {
    expect(
      buildNightSteps(game(["bébé-loup", "simple-villageois"])).some((x) => x.mode === "wolves"),
    ).toBe(true);
  });
  it("Alien wins only after opposing power holders are gone", () => {
    const s = game(["alien", "voyante", "simple-villageois"]);
    expect(checkVictory(s).phase).not.toBe("FIN");
    s.players[1].alive = false;
    expect(checkVictory(s).winner).toContain("winAlien");
  });
  it("one wrong Alien guess leaves two chances", () => {
    const s = game2(["alien", "loup-garou", "simple-villageois"]);
    expect(
      submitStep(at(s, "alien"), { targetId: s.players[1].id, guessedRoleId: "voyante" }).players[0]
        .alienErrors,
    ).toBe(1);
  });
  it("freeze blocks an active action and expires next night", () => {
    const s = game(["loup-rouge", "voyante", "simple-villageois", "simple-villageois"]);
    s.night = 2;
    s.steps = buildNightSteps(s);
    const frozen = submitStep(at(s, "loup-rouge"), { targetId: s.players[1].id });
    const skipped = submitStep(at(frozen, "voyante"), { targetId: s.players[2].id });
    expect(skipped.round.seerCheckTargetId).toBeUndefined();
    expect(startNight(skipped).players[1].frozenNight).toBeUndefined();
  });
  it("freeze disables Elder passive wolf resistance", () => {
    const s = game2(["loup-rouge", "ancien", "simple-villageois", "simple-villageois"]);
    const frozen = submitStep(at(s, "loup-rouge"), { targetId: s.players[1].id });
    frozen.round.attackedId = s.players[1].id;
    frozen.stepIndex = frozen.steps.length;
    expect(submitStep(frozen, {}).players[1].alive).toBe(false);
  });
  it("fire triggers Baby Wolf immediately and resumes the same night", () => {
    const s = game2([
      "pyromaniac",
      "bébé-loup",
      "alien",
      "simple-villageois",
      "simple-villageois",
      "simple-villageois",
    ]);
    s.players[1].doused = true;
    const pending = submitStep(at(s, "pyromaniac"), { ignite: true });
    expect(pending.phase).toBe("EVENEMENT_MORT");
    const resumed = resolveBabyWolf(pending, s.players[3].id);
    expect(resumed.night).toBe(2);
    expect(resumed.steps[resumed.stepIndex].roleId).toBe("alien");
  });
  it("manual death chains Baby Wolf to Hunter before victory", () => {
    const s = {
      ...game([
        "bébé-loup",
        "chasseur",
        "loup-garou",
        "simple-villageois",
        "simple-villageois",
        "simple-villageois",
      ]),
      phase: "AUBE" as const,
    };
    const pending = suicideRevealMany(s, [s.players[0].id]);
    const hunter = resolveBabyWolf(pending, s.players[1].id);
    expect(hunter.phase).toBe("EVENEMENT_MORT");
    expect(hunter.hunterPending).toBe(s.players[1].id);
    expect(resolveHunter(hunter, s.players[3].id).night).toBe(2);
  });
  it("ignition cannot be used twice", () => {
    const s = game2(["pyromaniac", "loup-garou", "alien", "simple-villageois"]);
    s.players[0].matchUsed = true;
    s.players[3].doused = true;
    expect(submitStep(at(s, "pyromaniac"), { ignite: true }).players[3].alive).toBe(true);
  });
  it("Red Wolf and Alien do not act on night 1", () => {
    const s = game(["loup-rouge", "alien", "voyante", "simple-villageois"]);
    expect(s.steps.some((x) => x.roleId === "loup-rouge" && x.mode === "one")).toBe(false);
    expect(s.steps.some((x) => x.roleId === "alien")).toBe(false);
    const n2 = game2(["loup-rouge", "alien", "voyante", "simple-villageois"]);
    expect(n2.steps.some((x) => x.roleId === "loup-rouge" && x.mode === "one")).toBe(true);
    expect(n2.steps.some((x) => x.roleId === "alien")).toBe(true);
  });
  it("wolf attack on the Alien is lost for the night", () => {
    const s = game(["loup-garou", "alien", "simple-villageois", "simple-villageois"]);
    s.round.attackedId = s.players[1].id;
    s.stepIndex = s.steps.length;
    const out = submitStep(s, {});
    expect(out.players.every((p) => p.alive)).toBe(true);
  });
});

describe("alien rules v2", () => {
  it("can chain guesses in one night; correct guesses keep chances", () => {
    const s = game2(["alien", "voyante", "sorciere", "loup-garou", "simple-villageois"]);
    const a = submitStep(at(s, "alien"), { targetId: s.players[1].id, guessedRoleId: "voyante" });
    expect(a.players[1].alive).toBe(false);
    expect(a.players[0].alienErrors ?? 0).toBe(0);
    expect(a.steps[a.stepIndex].roleId).toBe("alien");
    const b = submitStep(a, { targetId: s.players[4].id, guessedRoleId: "voyante" });
    expect(b.players[0].alienErrors).toBe(1);
    expect(b.steps[b.stepIndex].roleId).toBe("alien");
  });
  it("hunter killed by alien gets no shot", () => {
    const s = game2(["alien", "chasseur", "loup-garou", "simple-villageois", "simple-villageois"]);
    const out = submitStep(at(s, "alien"), { targetId: s.players[1].id, guessedRoleId: "chasseur" });
    expect(out.hunterPending).toBeUndefined();
  });
  it("baby wolf killed by alien gets no revenge", () => {
    const s = game2(["alien", "bébé-loup", "loup-garou", "simple-villageois", "simple-villageois"]);
    const out = submitStep(at(s, "alien"), { targetId: s.players[1].id, guessedRoleId: "bébé-loup" });
    expect(out.babyWolfPending ?? []).toEqual([]);
  });
  it("elder killed by alien keeps village powers", () => {
    const s = game2(["alien", "ancien", "voyante", "loup-garou", "simple-villageois"]);
    const out = submitStep(at(s, "alien"), { targetId: s.players[1].id, guessedRoleId: "ancien" });
    expect(out.players[2].powersDisabled ?? false).toBe(false);
  });
});
