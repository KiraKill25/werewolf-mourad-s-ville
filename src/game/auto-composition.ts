/** Pure auto-balance: always Salvateur + Sorcière + ≥1 Loup-Garou, wolves ~20–25%. */
export function wolfCount(n: number): number {
  if (n <= 7) return 1;
  if (n <= 11) return 2;
  if (n <= 15) return 3;
  return 4;
}

const SPECIAL_WOLVES = ["loup-rouge", "loup-noir"];
const INFO = ["voyante", "renard", "montreur-dours"];
const SPECIALS = ["chasseur", "geolier", "corbeau", "ancien", "idiot-du-village", "chaperon-rouge", "juge"];
const SOLOS = ["loup-blanc", "ange", "joueur-de-flute"];

export function autoComposition(n: number, rand: () => number = Math.random): Record<string, number> {
  const pick = <T,>(arr: T[]) => arr.splice(Math.floor(rand() * arr.length), 1)[0];
  const c: Record<string, number> = {};
  const add = (id: string) => (c[id] = (c[id] ?? 0) + 1);
  if (n <= 0) return c;
  add("loup-garou");
  if (n >= 2) add("salvateur");
  if (n >= 3) add("sorciere");
  let left = n - Object.values(c).reduce((a, b) => a + b, 0);
  const wolves = wolfCount(n);
  const sw = [...SPECIAL_WOLVES];
  for (let i = 1; i < wolves && left > 0; i++, left--) {
    if (i === 1 && sw.length && rand() < 0.6) add(pick(sw));
    else add("loup-garou");
  }
  const info = [...INFO];
  const infoCount = n >= 14 ? 2 : n >= 5 ? 1 : 0;
  for (let i = 0; i < infoCount && left > 0; i++, left--) add(i === 0 ? "voyante" : pick(info.filter((x) => x !== "voyante")));
  const solos = n >= 14 ? 1 + (rand() < 0.5 ? 1 : 0) : n >= 10 ? 1 : 0;
  const so = [...SOLOS];
  for (let i = 0; i < solos && left > 0; i++, left--) add(pick(so));
  const specialCount = n < 6 ? 0 : n <= 7 ? 1 : n <= 10 ? 2 : n <= 13 ? 3 : 4;
  const sp = [...SPECIALS];
  for (let i = 0; i < specialCount && left > 1; i++, left--) add(pick(sp));
  for (; left > 0; left--) add("simple-villageois");
  return c;
}
