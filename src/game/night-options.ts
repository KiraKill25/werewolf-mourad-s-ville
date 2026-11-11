import { effectiveRoleId, type GameState, type Player, type Step } from "./engine";

export type NightReason = "selfTarget" | "alreadyProtected" | "alreadyDoused" | "nonWolf" | "packMember" | "alreadyMuted" | "immune" | "unavailable";
export type NightAction = "default" | "attack" | "infect" | "mute" | "protect" | "inspect" | "poison" | "overview";

/** Eligibility is separate from visibility: callers always render all living players. */
export function nightReason(state: GameState, step: Step, actor: Player, player: Player, action: NightAction = "default"): NightReason | undefined {
  if (action === "overview") return "unavailable";
  if (action === "mute") return player.id === state.round.previousMutedId ? "alreadyMuted" : undefined;
  if (action === "protect") return undefined;
  const selfExcluded = ["voyante", "cupidon", "mime", "enfant-sauvage", "general", "voleur", "maniaque", "loup-rouge", "pyromaniac", "alien", "renard", "loup-blanc"];
  if (player.id === actor.id && (selfExcluded.includes(step.roleId) || ["attack", "infect", "inspect", "poison"].includes(action) || step.soloKill)) return "selfTarget";
  if (step.roleId === "salvateur") {
    const history = actor.protectedHistory ?? [];
    if (state.players.some((p) => p.alive && !history.includes(p.id)) && history.includes(player.id)) return "alreadyProtected";
  }
  if (step.roleId === "pyromaniac" && player.doused) return "alreadyDoused";
  if (step.roleId === "loup-blanc" && !step.soloKill && player.team !== "WEREWOLVES") return "nonWolf";
  const packAttack = step.mode === "wolves" || ["attack", "infect"].includes(action) || ["loup-garou", "loup-noir", "loup-bavard", "loup-matriarche"].includes(step.roleId);
  if (packAttack && player.team === "WEREWOLVES") return "packMember";
  // Wolf attacks against the Alien remain selectable: the engine consumes the shot.
  if (action === "infect" && (effectiveRoleId(player) === "alien" || state.round.villageShield || state.round.protectedId === player.id)) return "immune";
  return undefined;
}

export function nightStatuses(state: GameState, player: Player) {
  return {
    protected: state.round.villageShield || state.round.protectedId === player.id || player.hasPuppetShield,
    immune: effectiveRoleId(player) === "alien" || player.immuneToDayVote,
    frozen: player.frozenNight === state.night,
  };
}