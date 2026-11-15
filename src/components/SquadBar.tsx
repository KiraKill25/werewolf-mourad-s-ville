import { useEffect, useState } from "react";
import { deleteSquad, loadSquads, saveSquad, type Squad } from "@/lib/squads";

/** Saved player groups: save the current roster or load one in a tap. */
export function SquadBar({ getNames, onLoad }: { getNames: () => string[]; onLoad: (names: string[]) => void }) {
  const [squads, setSquads] = useState<Squad[]>([]);
  useEffect(() => setSquads(loadSquads()), []);
  const save = () => {
    const players = getNames();
    if (!players.length) return;
    const name = window.prompt("Nom du groupe (ex. Soirée Vendredi)")?.trim();
    if (name) setSquads(saveSquad({ name, players }));
  };
  return (
    <section className="mb-4 space-y-2 rounded-2xl border border-border bg-card p-3">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-sm font-bold">👥 Groupes enregistrés</h2>
        <button type="button" onClick={save} className="rounded-full border border-primary px-3 py-1 text-xs font-bold text-primary">
          Sauvegarder ce groupe
        </button>
      </div>
      {squads.length === 0 ? (
        <p className="text-xs text-muted-foreground">Aucun groupe pour l'instant.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {squads.map((s) => (
            <span key={s.name} className="flex items-center gap-1 rounded-full border border-border ps-3 pe-1 py-1 text-xs">
              <button type="button" onClick={() => onLoad(s.players)} className="font-semibold">
                {s.name} ({s.players.length})
              </button>
              <button
                type="button"
                aria-label={`Supprimer ${s.name}`}
                onClick={() => setSquads(deleteSquad(s.name))}
                className="grid size-5 place-items-center rounded-full text-muted-foreground"
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
