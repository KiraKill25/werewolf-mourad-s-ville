import { useState } from "react";
import { motion } from "framer-motion";
import {
  Award,
  ChevronDown,
  Crosshair,
  Crown,
  Drama,
  Eye,
  Flame,
  Gavel,
  HeartHandshake,
  Mic,
  Shield,
  Skull,
  Snowflake,
  Star,
  Target,
  TrendingDown,
  Trophy,
  Users,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { effectiveRoleId, type GameState } from "@/game/engine";
import { buildScorecards, campRating, isWolf, type Camp, type Scorecard } from "@/game/evaluation";
import { EVAL_LOCALES, type EvalKey } from "@/lib/locales/evaluation";
import type { VoteRecord } from "@/components/GameRecapCard";

export { buildScorecards, type Scorecard } from "@/game/evaluation";

const spring = { type: "spring" as const, stiffness: 220, damping: 24 };

type BadgeDef = {
  id: string;
  label: string;
  desc: string;
  icon: typeof Award;
  tone: string;
  holders: Scorecard[];
};

function best(
  cards: Scorecard[],
  value: (c: Scorecard) => number,
  min = 1,
  eligible: (c: Scorecard) => boolean = () => true,
) {
  const list = cards.filter((c) => eligible(c) && value(c) >= min);
  if (!list.length) return [];
  const top = Math.max(...list.map(value));
  return list.filter((c) => value(c) === top);
}

const GRADE_TONE: Record<Scorecard["grade"], string> = {
  S: "text-gold border-gold/60 bg-gold/10",
  A: "text-primary border-primary/60 bg-primary/10",
  B: "text-accent border-accent/60 bg-accent/10",
  C: "text-muted-foreground border-border bg-input/40",
  D: "text-destructive border-destructive/50 bg-destructive/10",
};

const CAMP_BAR: Record<Camp, string> = {
  WOLVES: "bg-destructive",
  VILLAGE: "bg-primary",
  SOLO: "bg-accent",
};

export function EvaluationSection({
  state,
  voteHistory,
}: {
  state: GameState;
  voteHistory: VoteRecord[];
}) {
  const { t, roleName, lang } = useI18n();
  const L = EVAL_LOCALES[lang as keyof typeof EVAL_LOCALES] ?? EVAL_LOCALES.fr;
  const e = (k: EvalKey, vars?: Record<string, string | number>) =>
    Object.entries(vars ?? {}).reduce((s, [k2, v]) => s.replace(`{${k2}}`, String(v)), L[k]);
  const [open, setOpen] = useState<string | null>(null);

  const cards = buildScorecards(state, voteHistory);
  if (cards.length === 0) return null;
  const nameOf = (id: string) => state.players.find((p) => p.id === id)?.name ?? "?";
  const lvp = cards[cards.length - 1];
  const podium = cards.slice(0, 3);

  const camps = (
    [
      { camp: "WOLVES" as const, label: t("factionWolves") },
      { camp: "VILLAGE" as const, label: t("factionVillage") },
      { camp: "SOLO" as const, label: t("factionSolo") },
    ] as const
  )
    .map((c) => ({ ...c, value: campRating(cards, c.camp) }))
    .filter((c) => c.value !== null);
  const maxCamp = Math.max(1, ...camps.map((c) => c.value ?? 0));
  const verdict =
    state.winnerTeam === "WOLVES"
      ? e("verdictWolves")
      : state.winnerTeam === "VILLAGE"
        ? e("verdictVillage")
        : e("verdictSolo");

  const hasBallots = voteHistory.some((r) => (r.ballots ?? []).length > 0);
  const voted = (c: Scorecard) => c.votePoints > 0;
  const worst = () => {
    const list = cards.filter(voted);
    if (!list.length) return [];
    const low = Math.min(...list.map((c) => c.accuracy));
    return low < 50 ? list.filter((c) => c.accuracy === low) : [];
  };
  const badges: BadgeDef[] = [
    {
      id: "mm",
      label: t("badgeMastermind"),
      desc: t("badgeMastermindDesc"),
      icon: Award,
      tone: "text-gold border-gold/50",
      holders: best(cards, (c) => c.score),
    },
    {
      id: "eye",
      label: t("badgeEagleEye"),
      desc: t("badgeEagleEyeDesc"),
      icon: Eye,
      tone: "text-primary border-primary/50",
      holders: best(cards, (c) => c.accuracy, 50, voted),
    },
    {
      id: "oscar",
      label: t("badgeOscar"),
      desc: t("badgeOscarDesc"),
      icon: Drama,
      tone: "text-destructive border-destructive/50",
      holders: best(
        cards,
        (c) => c.deception,
        1,
        (c) => c.camp !== "VILLAGE",
      ),
    },
    {
      id: "guard",
      label: t("badgeGuardian"),
      desc: t("badgeGuardianDesc"),
      icon: Shield,
      tone: "text-primary border-primary/50",
      holders: best(cards, (c) => c.rescues),
    },
    {
      id: "ice",
      label: t("badgeIceCold"),
      desc: t("badgeIceColdDesc"),
      icon: Target,
      tone: "text-primary border-primary/50",
      holders: best(cards, (c) => c.clutch),
    },
    {
      id: "orator",
      label: e("orator"),
      desc: e("oratorDesc"),
      icon: Mic,
      tone: "text-gold border-gold/50",
      holders: best(
        cards,
        (c) => c.stars,
        1,
        (c) => c.penalties === 0,
      ),
    },
    {
      id: "rap",
      label: e("rapSheet"),
      desc: e("rapSheetDesc"),
      icon: Gavel,
      tone: "text-destructive border-destructive/50",
      holders: best(cards, (c) => c.penalties, 2),
    },
    {
      id: "fire",
      label: e("inferno"),
      desc: e("infernoDesc"),
      icon: Flame,
      tone: "text-accent border-accent/50",
      holders: best(
        cards,
        (c) => c.enemyKills,
        2,
        (c) => (c.player.originalRoleId ?? effectiveRoleId(c.player)) === "pyromaniac",
      ),
    },
    {
      id: "grip",
      label: e("iceGrip"),
      desc: e("iceGripDesc"),
      icon: Snowflake,
      tone: "text-primary border-primary/50",
      holders: best(cards, (c) => c.freezes),
    },
    {
      id: "justice",
      label: e("justice"),
      desc: e("justiceDesc"),
      icon: Crosshair,
      tone: "text-gold border-gold/50",
      holders: best(
        cards,
        (c) => c.enemyKills,
        1,
        (c) => c.friendlyKills === 0 && c.camp === "VILLAGE",
      ),
    },
    {
      id: "martyr",
      label: e("martyr"),
      desc: e("martyrDesc"),
      icon: HeartHandshake,
      tone: "text-accent border-accent/50",
      holders: best(
        cards,
        (c) => c.goodVotes,
        2,
        (c) => c.won && !c.player.alive && c.accuracy >= 60,
      ),
    },
    {
      id: "follow",
      label: t("badgeBandwagoner"),
      desc: t("badgeBandwagonerDesc"),
      icon: Users,
      tone: "text-accent border-accent/50",
      holders: best(
        cards,
        (c) => c.followerCount,
        2,
        (c) => c.leaderCount === 0,
      ),
    },
    {
      id: "blind",
      label: t("badgeBlindSniper"),
      desc: t("badgeBlindSniperDesc"),
      icon: Crosshair,
      tone: "text-muted-foreground border-border",
      holders: worst(),
    },
    {
      id: "starW",
      label: t("badgeStarWolf"),
      desc: t("badgeStarWolfDesc"),
      icon: Star,
      tone: "text-destructive border-destructive/50",
      holders: best(
        cards,
        (c) => c.stars,
        1,
        (c) => isWolf(c.player),
      ),
    },
    {
      id: "sui",
      label: t("badgeSuicidal"),
      desc: t("badgeSuicidalDesc"),
      icon: Skull,
      tone: "text-destructive border-destructive/50",
      holders: cards.filter((c) => c.suicided),
    },
  ].filter((b) => b.holders.length > 0);

  const podiumOrder = [podium[1], podium[0], podium[2]].filter(Boolean) as Scorecard[];
  const height = (c: Scorecard) => (c === podium[0] ? "h-24" : c === podium[1] ? "h-16" : "h-12");
  const medal = (c: Scorecard) =>
    c === podium[0] ? "text-gold" : c === podium[1] ? "text-foreground" : "text-accent";

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...spring, delay: 0.28 }}
      className="surface-card space-y-5 rounded-3xl p-4"
    >
      <p className="text-[11px] tracking-[0.3em] text-primary uppercase">{t("evalTitle")}</p>
      {!hasBallots && <p className="text-xs text-muted-foreground">{t("evalNoData")}</p>}

      {/* Podium */}
      <div className="space-y-2">
        <p className="flex items-center gap-1 text-[10px] tracking-widest text-gold uppercase">
          <Trophy className="size-3" /> {e("podium")}
        </p>
        <div className="flex items-end justify-center gap-2">
          {podiumOrder.map((c, i) => (
            <motion.div
              key={c.player.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.35 + i * 0.1 }}
              className="flex w-1/3 min-w-0 flex-col items-center gap-1"
            >
              <span
                className={`rounded-full border px-2 text-[10px] font-black ${GRADE_TONE[c.grade]}`}
              >
                {c.grade}
              </span>
              <p className="w-full truncate text-center text-xs font-black">
                {c.player.name}
                {c.player.isCaptain && <Crown className="ms-1 inline size-3 text-accent" />}
              </p>
              <p className="w-full truncate text-center text-[10px] text-muted-foreground">
                {roleName(c.player.originalRoleId ?? effectiveRoleId(c.player))}
              </p>
              <div
                className={`flex w-full flex-col items-center justify-center rounded-t-2xl border border-border bg-input/40 ${height(c)}`}
              >
                <span className={`text-lg font-black tabular-nums ${medal(c)}`}>{c.score}</span>
                <span className="text-[10px] text-muted-foreground">#{cards.indexOf(c) + 1}</span>
              </div>
            </motion.div>
          ))}
        </div>
        {cards.length > 3 && (
          <div className="flex items-center justify-between rounded-2xl border border-destructive/40 p-2 text-xs">
            <span className="flex items-center gap-1 text-destructive">
              <TrendingDown className="size-3" /> {t("evalLvp")}
            </span>
            <span className="truncate font-bold">
              {lvp.player.name} · {lvp.score}
            </span>
          </div>
        )}
      </div>

      {/* Affrontement des camps */}
      <div className="space-y-2">
        <p className="text-[10px] tracking-widest text-muted-foreground uppercase">
          {t("evalFactions")}
        </p>
        <p className="text-xs font-bold text-foreground">{verdict}</p>
        {camps.map((c) => (
          <div key={c.camp} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{c.label}</span>
              <span className="font-bold text-foreground tabular-nums">{c.value}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-input">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.round(((c.value ?? 0) / maxCamp) * 100)}%` }}
                transition={{ duration: 0.9, delay: 0.3 }}
                className={`h-full rounded-full ${CAMP_BAR[c.camp]}`}
              />
            </div>
          </div>
        ))}
      </div>

      {badges.length > 0 && (
        <div className="space-y-2">
          <p className="text-[10px] tracking-widest text-muted-foreground uppercase">
            {t("badgesTitle")}
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {badges.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={b.id}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ ...spring, delay: 0.3 + i * 0.04 }}
                  className={`space-y-1 rounded-2xl border bg-input/30 p-3 ${b.tone}`}
                >
                  <p className="flex items-center gap-1.5 text-[10px] font-black tracking-widest uppercase">
                    <Icon className="size-3.5" />
                    {b.label}
                  </p>
                  <p className="truncate text-sm font-black text-foreground">
                    {b.holders.map((h) => h.player.name).join(", ")}
                  </p>
                  <p className="text-[10px] text-muted-foreground">{b.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Fiches détaillées */}
      <div className="space-y-2">
        <p className="text-[10px] tracking-widest text-muted-foreground uppercase">
          {t("evalScorecards")}
        </p>
        <ul className="space-y-2">
          {cards.map((c, i) => {
            const isOpen = open === c.player.id;
            const pillars = [
              { k: "pillarRole" as const, v: c.pillars.role },
              { k: "pillarVotes" as const, v: c.pillars.votes },
              { k: "pillarDebate" as const, v: c.pillars.debate },
              { k: "pillarStatus" as const, v: c.pillars.status },
            ];
            const stats = [
              { k: "rescues" as const, v: c.rescues },
              { k: "kills" as const, v: c.enemyKills },
              { k: "packKills" as const, v: c.packKills },
              { k: "friendly" as const, v: c.friendlyKills },
              { k: "freezes" as const, v: c.freezes },
              { k: "douses" as const, v: c.douses },
              { k: "penalties" as const, v: c.penalties },
            ].filter((s) => s.v > 0);
            return (
              <li key={c.player.id} className="rounded-2xl border border-border text-xs">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : c.player.id)}
                  aria-expanded={isOpen}
                  className="w-full space-y-1 p-3 text-start"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex min-w-0 items-center gap-2">
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[10px] font-black text-primary tabular-nums">
                        {i + 1}
                      </span>
                      <span className="truncate font-bold">{c.player.name}</span>
                      {c.player.isCaptain && <Crown className="size-3 text-accent" />}
                      {c.won && (
                        <span className="rounded-full bg-gold/15 px-1.5 text-[9px] font-black text-gold uppercase">
                          {e("winner")}
                        </span>
                      )}
                    </span>
                    <span className="flex items-center gap-2">
                      <span
                        className={`rounded-full border px-1.5 text-[10px] font-black ${GRADE_TONE[c.grade]}`}
                      >
                        {c.grade}
                      </span>
                      <b className="tabular-nums">{c.score}</b>
                      <ChevronDown
                        className={`size-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
                      />
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 text-[10px] text-muted-foreground">
                    <span className="rounded-full bg-input px-2 py-0.5">
                      {roleName(c.player.originalRoleId ?? effectiveRoleId(c.player))}
                    </span>
                    <span className="rounded-full bg-input px-2 py-0.5">
                      <Target className="me-1 inline size-2.5" />
                      {t("evalAccuracy")} {c.accuracy}%
                    </span>
                    {c.stars > 0 && (
                      <span className="rounded-full bg-gold/15 px-2 py-0.5 text-gold">
                        {t("starsEarned", { n: c.stars })}
                      </span>
                    )}
                    {c.penalties > 0 && (
                      <span className="rounded-full bg-destructive/15 px-2 py-0.5 text-destructive">
                        ⚠️ {c.penalties}
                      </span>
                    )}
                  </div>
                </button>
                {isOpen && (
                  <div className="space-y-3 border-t border-border p-3">
                    <div className="grid grid-cols-4 gap-1 text-center">
                      {pillars.map((p) => (
                        <div key={p.k} className="rounded-xl bg-input/40 p-1.5">
                          <p
                            className={`text-sm font-black tabular-nums ${p.v < 0 ? "text-destructive" : "text-foreground"}`}
                          >
                            {p.v}
                          </p>
                          <p className="truncate text-[9px] text-muted-foreground">{e(p.k)}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1 text-[10px]">
                      {c.leaderCount > 0 && (
                        <span className="rounded-full bg-primary/15 px-2 py-0.5 text-primary">
                          {t("evalLeader")} ×{c.leaderCount}
                        </span>
                      )}
                      {c.followerCount > 0 && (
                        <span className="rounded-full bg-accent/15 px-2 py-0.5 text-accent">
                          {t("evalFollower")} ×{c.followerCount}
                        </span>
                      )}
                      {c.deception > 0 && (
                        <span className="rounded-full bg-destructive/15 px-2 py-0.5 text-destructive">
                          {t("evalDeception")} ×{c.deception}
                        </span>
                      )}
                      {c.clutch > 0 && (
                        <span className="rounded-full bg-primary/15 px-2 py-0.5 text-primary">
                          {t("evalClutch")} ×{c.clutch}
                        </span>
                      )}
                      {stats.map((s) => (
                        <span
                          key={s.k}
                          className="rounded-full bg-input px-2 py-0.5 text-muted-foreground"
                        >
                          {e(s.k)} ×{s.v}
                        </span>
                      ))}
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] tracking-widest text-muted-foreground uppercase">
                        {e("ballots")}
                      </p>
                      {c.ballots.length === 0 ? (
                        <p className="text-[11px] text-muted-foreground">{e("noBallots")}</p>
                      ) : (
                        <ul className="flex flex-wrap gap-1">
                          {c.ballots.map((b, idx) => (
                            <li
                              key={idx}
                              className={`rounded-full px-2 py-0.5 text-[10px] ${b.good ? "bg-primary/15 text-primary" : "bg-destructive/15 text-destructive"}`}
                            >
                              {e("day", { n: b.day })} → {nameOf(b.targetId)} (
                              {b.good ? e("good") : e("bad")})
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </motion.section>
  );
}
