import { describe, expect, it } from "vitest";
import { createGame, type Step } from "./engine";
import { nightReason, nightStatuses } from "./night-options";

const village = (role: string) => createGame([role, "simple-villageois", "loup-garou", "alien"].map((roleId, i) => ({ roleId, name: `P${i}` })));
const step = (roleId: string, mode: Step["mode"] = "one"): Step => ({ roleId, mode, title: "", prompt: "", key: roleId });

describe("night player eligibility", () => {
  it("keeps previously protected players disabled until the living-player cycle resets", () => {
    const s = village("salvateur");
    const actor = s.players[0];
    actor.protectedHistory = [s.players[1].id];
    expect(nightReason(s, step("salvateur"), actor, s.players[1])).toBe("alreadyProtected");
    expect(nightReason(s, step("salvateur"), actor, actor)).toBeUndefined();
    actor.protectedHistory = s.players.map((p) => p.id);
    expect(nightReason(s, step("salvateur"), actor, s.players[1])).toBeUndefined();
  });
  it("disables already doused Pyromaniac targets", () => {
    const s = village("pyromaniac");
    s.players[1].doused = true;
    expect(nightReason(s, step("pyromaniac"), s.players[0], s.players[1])).toBe("alreadyDoused");
    expect(nightReason(s, step("pyromaniac"), s.players[0], s.players[2])).toBeUndefined();
  });
  it("disables non-wolves for White Wolf's wolf-only attack", () => {
    const s = village("loup-blanc");
    expect(nightReason(s, step("loup-blanc"), s.players[0], s.players[1])).toBe("nonWolf");
    expect(nightReason(s, step("loup-blanc"), s.players[0], s.players[2])).toBeUndefined();
    expect(nightReason(s, { ...step("loup-blanc"), soloKill: true }, s.players[0], s.players[1])).toBeUndefined();
  });
  it("shows Alien immunity without preventing a wolf's wasted shot", () => {
    const s = village("loup-noir");
    expect(nightReason(s, step("loup-noir"), s.players[0], s.players[3], "attack")).toBeUndefined();
    expect(nightReason(s, step("loup-noir"), s.players[0], s.players[3], "infect")).toBe("immune");
    expect(nightStatuses(s, s.players[3]).immune).toBe(true);
  });
  it("disables consecutive mute targets but allows the Black Wolf to mute itself", () => {
    const s = village("loup-noir");
    s.round.previousMutedId = s.players[1].id;
    expect(nightReason(s, step("loup-noir"), s.players[0], s.players[1], "mute")).toBe("alreadyMuted");
    expect(nightReason(s, step("loup-noir"), s.players[0], s.players[0], "mute")).toBeUndefined();
  });
  it("shows current protection and frozen status independently of eligibility", () => {
    const s = village("salvateur");
    s.round.protectedId = s.players[1].id;
    s.players[1].frozenNight = s.night;
    expect(nightStatuses(s, s.players[1])).toEqual({ protected: true, immune: false, frozen: true });
  });
});