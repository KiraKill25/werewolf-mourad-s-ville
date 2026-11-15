const KEY = "mvno-squads";
export type Squad = { name: string; players: string[] };
export function loadSquads(): Squad[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}
export function saveSquad(squad: Squad): Squad[] {
  const list = [squad, ...loadSquads().filter((s) => s.name !== squad.name)].slice(0, 12);
  localStorage.setItem(KEY, JSON.stringify(list));
  return list;
}
export function deleteSquad(name: string): Squad[] {
  const list = loadSquads().filter((s) => s.name !== name);
  localStorage.setItem(KEY, JSON.stringify(list));
  return list;
}
