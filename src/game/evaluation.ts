import { effectiveRoleId, type GameState, type Player } from "@/game/engine";

/** Bulletin minimal nécessaire à l'évaluation (compatible avec VoteRecord). */
export interface EvalVoteRound {
  day: number;
  ballots?: { voterId: string; targets: string[]; abstained?: boolean }[];
  eliminated: { id: string }[];
}

export type Camp = "WOLVES" | "VILLAGE" | "SOLO";

export const isWolf = (p: Player) => p.team === "WEREWOLVES" || !!p.isConvertedToWolf;

export function campOf(p: Player): Camp {
  if (isWolf(p)) return "WOLVES";
  if (p.team === "SOLO" || p.team === "LOVERS") return "SOLO";
  return "VILLAGE";
}

/** Un solo est seul contre tous ; les autres camps s'affrontent entre eux. */
export function isEnemy(a: Player, b: Player): boolean {
  if (a.id === b.id) return false;
  const ca = campOf(a);
  if (ca === "SOLO") return true;
  return campOf(b) !== ca;
}

/** Barème du score individuel. */
export const POINTS = {
  rescue: 25,
  enemyKill: 15,
  packKill: 6,
  friendlyFire: -20,
  freeze: 12,
  douse: 8,
  voteLeader: 6,
  voteFollower: 2,
  clutch: 10,
  deception: 6,
  star: 8,
  penalty: -6,
  suicide: -35,
  win: 15,
  survive: 10,
  captainWin: 5,
} as const;

/** Rôle tueur pour chaque cause de mort attribuable à un joueur précis. */
const KILLER_ROLE: Record<string, string> = {
  HUNTER_SHOT: "chasseur",
  WITCH_POISON: "sorciere",
  FIRE: "pyromaniac",
  ALIEN: "alien",
  BABY_WOLF_REVENGE: "bébé-loup",
  WHITE_WOLF_KILL: "loup-blanc",
};

export interface Scorecard {
  player: Player;
  camp: Camp;
  won: boolean;
  accuracy: number;
  votePoints: number;
  goodVotes: number;
  leaderCount: number;
  followerCount: number;
  deception: number;
  clutch: number;
  rescues: number;
  enemyKills: number;
  friendlyKills: number;
  packKills: number;
  freezes: number;
  douses: number;
  stars: number;
  penalties: number;
  suicided: boolean;
  /** Détail par pilier. */
  pillars: { role: number; votes: number; debate: number; status: number };
  score: number;
  grade: "S" | "A" | "B" | "C" | "D";
  /** Historique des votes pour la fiche détaillée. */
  ballots: { day: number; targetId: string; good: boolean }[];
}

export function winningIds(state: GameState): Set<string> {
  const ps = state.players;
  if (state.winnerTeam === "WOLVES") return new Set(ps.filter(isWolf).map((p) => p.id));
  if (state.winnerTeam === "VILLAGE")
    return new Set(ps.filter((p) => campOf(p) === "VILLAGE").map((p) => p.id));
  if (state.winnerTeam === "OTHER") {
    const solos = ps.filter((p) => campOf(p) === "SOLO");
    const alive = solos.filter((p) => p.alive);
    return new Set((alive.length ? alive : solos).map((p) => p.id));
  }
  return new Set();
}

export function gradeOf(score: number): Scorecard["grade"] {
  if (score >= 90) return "S";
  if (score >= 70) return "A";
  if (score >= 50) return "B";
  if (score >= 30) return "C";
  return "D";
}

export function buildScorecards(state: GameState, voteHistory: EvalVoteRound[]): Scorecard[] {
  const players = state.players;
  const byId = new Map(players.map((p) => [p.id, p]));
  const byName = new Map(players.map((p) => [p.name, p]));
  const events = state.events ?? [];
  const winners = winningIds(state);
  const total = players.length;

  return players
    .map((p): Scorecard => {
      const camp = campOf(p);
      const rid = p.originalRoleId ?? effectiveRoleId(p);
      let goodVotes = 0;
      let votePoints = 0;
      let leaderCount = 0;
      let followerCount = 0;
      let deception = 0;
      let clutch = 0;
      let eliminatedSoFar = 0;
      const ballots: Scorecard["ballots"] = [];

      for (const round of voteHistory) {
        const aliveAtRound = total - eliminatedSoFar;
        eliminatedSoFar += round.eliminated.length;
        const all = (round.ballots ?? []).filter((b) => !b.abstained);
        const mine = all.filter((b) => b.voterId === p.id);
        for (const b of mine) {
          for (const tid of b.targets) {
            const target = byId.get(tid);
            if (!target) continue;
            votePoints += 1;
            const good = isEnemy(p, target);
            ballots.push({ day: round.day, targetId: tid, good });
            if (good) {
              goodVotes += 1;
              if (aliveAtRound <= 4) clutch += 1;
            }
          }
        }
        const elimIds = round.eliminated.map((e) => e.id);
        // Tromperie : un loup / solo pousse au bûcher un villageois innocent.
        if (camp !== "VILLAGE") {
          for (const id of elimIds) {
            const e = byId.get(id);
            if (e && campOf(e) === "VILLAGE" && mine.some((b) => b.targets.includes(id)))
              deception += 1;
          }
        }
        // Meneur / suiveur : uniquement si l'éliminé était un ennemi du votant.
        const enemyElims = elimIds.filter((id) => {
          const e = byId.get(id);
          return e ? isEnemy(p, e) : false;
        });
        if (enemyElims.length) {
          const pushers = all.filter((b) => b.targets.some((t) => enemyElims.includes(t)));
          if (pushers[0]?.voterId === p.id) leaderCount += 1;
          else if (pushers.some((b) => b.voterId === p.id)) followerCount += 1;
        }
      }

      const rescues = events.filter((e) => e.type === "RESCUE" && e.bySavior === rid).length;
      let enemyKills = 0;
      let friendlyKills = 0;
      let packKills = 0;
      for (const e of events) {
        if (e.type !== "KILL" || !e.cause) continue;
        const victim = byName.get(e.name);
        if (!victim || victim.id === p.id) continue;
        if (e.cause === "WOLVES") {
          if (camp === "WOLVES" && !isWolf(victim)) packKills += 1;
          continue;
        }
        if (KILLER_ROLE[e.cause] !== rid) continue;
        if (isEnemy(p, victim)) enemyKills += 1;
        else friendlyKills += 1;
      }
      const freezes = events.filter(
        (e) => e.type === "ACTION" && e.action === "FREEZE" && e.actorId === p.id,
      ).length;
      const douses = events.filter(
        (e) => e.type === "ACTION" && e.action === "DOUSE" && e.actorId === p.id,
      ).length;
      const suicided = events.some(
        (e) => e.type === "KILL" && e.cause === "SUICIDE_REVEAL" && e.name === p.name,
      );
      const stars = p.stars ?? 0;
      const penalties = p.totalPenalties ?? 0;
      const won = winners.has(p.id);

      const role =
        rescues * POINTS.rescue +
        enemyKills * POINTS.enemyKill +
        packKills * POINTS.packKill +
        friendlyKills * POINTS.friendlyFire +
        freezes * POINTS.freeze +
        douses * POINTS.douse;
      const accuracy = votePoints > 0 ? Math.round((goodVotes / votePoints) * 100) : 0;
      const votes =
        Math.round(accuracy * 0.3) +
        leaderCount * POINTS.voteLeader +
        followerCount * POINTS.voteFollower +
        clutch * POINTS.clutch +
        deception * POINTS.deception;
      const debate =
        stars * POINTS.star + penalties * POINTS.penalty + (suicided ? POINTS.suicide : 0);
      const status =
        (won ? POINTS.win : 0) +
        (p.alive ? POINTS.survive : 0) +
        (p.isCaptain && won ? POINTS.captainWin : 0);
      const score = Math.max(0, role + votes + debate + status);

      return {
        player: p,
        camp,
        won,
        accuracy,
        votePoints,
        goodVotes,
        leaderCount,
        followerCount,
        deception,
        clutch,
        rescues,
        enemyKills,
        friendlyKills,
        packKills,
        freezes,
        douses,
        stars,
        penalties,
        suicided,
        pillars: { role, votes, debate, status },
        score,
        grade: gradeOf(score),
        ballots,
      };
    })
    .sort((a, b) => b.score - a.score || Number(b.won) - Number(a.won));
}

/** Indice moyen d'un camp. */
export function campRating(cards: Scorecard[], camp: Camp): number | null {
  const list = cards.filter((c) => c.camp === camp);
  if (!list.length) return null;
  return Math.round(list.reduce((s, c) => s + c.score, 0) / list.length);
}
