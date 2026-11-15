import { useState } from "react";
import type { GameState } from "@/game/engine";
import { ROLE_BY_ID } from "@/data/roles";
import { RoleDialog } from "@/components/RoleCard";
import { useI18n } from "@/lib/i18n";
import { useScrollLock } from "@/hooks/use-scroll-lock";

/** GM-only live village overview with manual corrections (kill/revive, captain). */
export function GmRosterDrawer({
  state,
  onClose,
  onChange,
}: {
  state: GameState;
  onClose: () => void;
  onChange: (s: GameState) => void;
}) {
  useScrollLock();
  const { role: tr } = useI18n();
  const [info, setInfo] = useState<string | null>(null);
  const r = state.round;
  const toggleAlive = (id: string) =>
    onChange({
      ...state,
      players: state.players.map((p) => (p.id === id ? { ...p, alive: !p.alive } : p)),
    });
  const setCaptain = (id: string) =>
    onChange({
      ...state,
      villageCaptainId: id,
      captainSuccessionPending: undefined,
      players: state.players.map((p) => ({ ...p, isCaptain: p.id === id })),
    });
  const sorted = [...state.players].sort((a, b) => Number(b.alive) - Number(a.alive));
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <aside
        role="dialog"
        aria-label="Vue du Maître du Jeu"
        onClick={(e) => e.stopPropagation()}
        className="h-full w-full max-w-sm overflow-y-auto overscroll-contain border-s border-border bg-background p-4"
      >
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-black">👁️ Vue du MJ</h2>
          <button onClick={onClose} className="rounded-full border border-border px-3 py-1 text-xs">
            Fermer
          </button>
        </div>
        <p className="mb-3 text-xs text-muted-foreground">
          {state.players.filter((p) => p.alive).length} vivants · {state.players.filter((p) => !p.alive).length} morts
          {r.villageShield ? " · 🛡️ village protégé" : ""}
        </p>
        <ul className="space-y-2">
          {sorted.map((p) => {
            const role = ROLE_BY_ID[p.copiedRoleId ?? p.roleId];
            const chips: string[] = [];
            if (state.villageCaptainId === p.id) chips.push("👑 Capitaine");
            if (p.isLover) chips.push("💘 Amoureux");
            if (r.protectedId === p.id) chips.push("🛡️ Protégé");
            if (p.isConvertedToWolf) chips.push("🐺 Infecté");
            if (p.frozenNight) chips.push("❄️ Gelé");
            if (p.doused) chips.push("🔥 Imbibé");
            if (p.enchanted) chips.push("🎵 Charmé");
            if (p.mutedForDay) chips.push("🤐 Muet");
            if (p.roleId === "sorciere")
              chips.push(`🧪 Vie ${p.healUsed ? "✗" : "✓"} · Mort ${p.poisonUsed ? "✗" : "✓"}`);
            return (
              <li key={p.id} className={`rounded-xl border border-border p-2 ${p.alive ? "" : "opacity-50"}`}>
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold">
                      {p.alive ? "" : "💀 "}
                      {p.name}
                    </p>
                    <button onClick={() => setInfo(role?.id ?? null)} className="text-xs text-primary underline">
                      {role ? tr(role.id).name : p.roleId}
                    </button>
                  </div>
                  <div className="flex shrink-0 gap-1">
                    {p.alive && state.villageCaptainId !== p.id && (
                      <button onClick={() => setCaptain(p.id)} title="Nommer capitaine" className="rounded-full border border-border px-2 py-1 text-xs">
                        👑
                      </button>
                    )}
                    <button
                      onClick={() => toggleAlive(p.id)}
                      className={`rounded-full border px-2 py-1 text-xs font-semibold ${p.alive ? "border-destructive/60 text-destructive" : "border-primary text-primary"}`}
                    >
                      {p.alive ? "Tuer" : "Ranimer"}
                    </button>
                  </div>
                </div>
                {chips.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-1">
                    {chips.map((c) => (
                      <span key={c} className="rounded-full bg-muted px-2 py-0.5 text-[10px]">
                        {c}
                      </span>
                    ))}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
        <p className="mt-3 text-[10px] text-muted-foreground">
          Les corrections manuelles ne déclenchent aucun effet de mort. Utilise « Annuler » pour revenir en arrière.
        </p>
      </aside>
      {info && ROLE_BY_ID[info] && <RoleDialog role={ROLE_BY_ID[info]} onClose={() => setInfo(null)} />}
    </div>
  );
}
