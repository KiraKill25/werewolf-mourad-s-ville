import { useEffect, useState } from "react";
import { deleteSquad, loadSquads, saveSquad, type Squad } from "@/lib/squads";

/** Saved player groups: save the current roster or load one in a tap. */
export function SquadBar({ getNames, onLoad }: { getNames: () => string[]; onLoad: (names: string[]) => void }) {
  const [squads, setSquads] = useState<Squad[]>([]);
  const [naming, setNaming] = useState(false);
  const [name, setName] = useState("");
  useEffect(() => setSquads(loadSquads()), []);
  const confirm = () => {
    const players = getNames();
    const n = name.trim();
    if (n && players.length) setSquads(saveSquad({ name: n, players }));
    setNaming(false);
    setName("");
  };
  return (
    <section className="cyber-card mb-4 space-y-3 rounded-2xl p-3">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-sm font-bold">👥 Groupes enregistrés</h2>
        <button type="button" onClick={() => setNaming(true)} className="cyber-pill rounded-full px-3 py-1 text-xs font-bold text-primary">
          Sauvegarder ce groupe
        </button>
      </div>
      {naming && (
        <div className="flex gap-2">
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && confirm()}
            placeholder="Nom du groupe (ex. Soirée Vendredi)"
            className="cyber-input min-w-0 flex-1 rounded-full px-4 py-2 text-sm"
          />
          <button type="button" onClick={confirm} className="neon-ring rounded-full bg-primary px-4 text-xs font-bold text-primary-foreground">OK</button>
          <button type="button" onClick={() => setNaming(false)} className="cyber-pill rounded-full px-3 text-xs text-muted-foreground">✕</button>
        </div>
      )}
      {squads.length === 0 ? (
        <p className="text-xs text-muted-foreground">Aucun groupe pour l'instant.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {squads.map((s) => (
            <span key={s.name} className="cyber-pill flex items-center gap-1 rounded-full ps-3 pe-1 py-1 text-xs">
              <button type="button" onClick={() => onLoad(s.players)} className="font-semibold">
                {s.name} ({s.players.length})
              </button>
              <button
                type="button"
                aria-label={`Supprimer ${s.name}`}
                onClick={() => setSquads(deleteSquad(s.name))}
                className="grid size-5 place-items-center rounded-full text-destructive"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
