import { wolfCount } from "./auto-composition";

export type PresetTheme = "classic" | "bluff" | "chaos";

/** Theme-specific role priority (filled in order after the mandatory core trio). */
const THEMES: Record<PresetTheme, { wolves: string[]; roles: string[] }> = {
  classic: { wolves: ["loup-garou"], roles: ["voyante", "chasseur", "cupidon", "ancien", "petite-fille", "idiot-du-village"] },
  bluff: { wolves: ["loup-rouge", "loup-noir", "loup-bavard"], roles: ["renard", "geolier", "corbeau", "juge", "montreur-dours", "tavernier"] },
  chaos: { wolves: ["bébé-loup", "loup-matriarche", "loup-rouge"], roles: ["voyante", "cupidon", "loup-blanc", "joueur-de-flute", "ange", "pyromaniac", "chasseur"] },
};

/** Curated composition: Salvateur + Sorcière + wolves (~20–25%), theme roles, villagers fill the rest. */
export function presetComposition(n: number, theme: PresetTheme): Record<string, number> {
  const c: Record<string, number> = {};
  const add = (id: string) => (c[id] = (c[id] ?? 0) + 1);
  if (n <= 0) return c;
  add("loup-garou");
  if (n >= 2) add("salvateur");
  if (n >= 3) add("sorciere");
  const { wolves, roles } = THEMES[theme];
  for (let i = 1; i < wolfCount(n) && i <= n - 3; i++) {
    const w = wolves[(i - 1) % wolves.length];
    if (w === "loup-garou" || !c[w]) add(w);
    else add("loup-garou");
  }
  const used = () => Object.values(c).reduce((a, b) => a + b, 0);
  // Keep at least a third of the village as plain villagers buffer when possible.
  const specialSlots = Math.max(0, n - used() - Math.floor(n / 3));
  // Solos only from 10 players.
  const solos = ["loup-blanc", "joueur-de-flute", "ange", "pyromaniac"];
  const maxSolos = n < 10 ? 0 : n < 14 ? 1 : 2;
  let solosUsed = 0;
  let placed = 0;
  for (const r of roles) {
    if (placed >= specialSlots) break;
    if (solos.includes(r)) {
      if (solosUsed >= maxSolos) continue;
      solosUsed++;
    }
    add(r);
    placed++;
  }
  const rest = n - used();
  if (rest > 0) c["simple-villageois"] = (c["simple-villageois"] ?? 0) + rest;
  return c;
}
