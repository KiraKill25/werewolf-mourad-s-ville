export interface SetupData {
  players: { name: string; roleId: string }[];
  villageCaptainId?: string;
  gameMaster?: string;
}

export interface GameSettings {
  isDebateTimerEnabled: boolean;
  debateTimePerPlayer: number;
}

export const DEFAULT_SETTINGS: GameSettings = {
  isDebateTimerEnabled: false,
  debateTimePerPlayer: 60,
};

const KEY = "mvno-setup";
const NAMES = "mvno-names";
const GAME = "mvno-game";
const SETTINGS = "mvno-settings";
const MJ = "mvno-mj";

export const saveGameMaster = (name: string) => localStorage.setItem(MJ, name);
export const loadGameMaster = (): string | null => localStorage.getItem(MJ);

/** Garantit une durée de débat valide (jamais NaN, null, 0 ou négative). */
export const sanitizeDebateSeconds = (v: unknown): number => {
  const n = Math.floor(Number(v));
  if (!Number.isFinite(n) || n <= 0) return DEFAULT_SETTINGS.debateTimePerPlayer;
  return Math.max(5, Math.min(600, n));
};

export const saveSettings = (s: GameSettings) =>
  localStorage.setItem(
    SETTINGS,
    JSON.stringify({
      isDebateTimerEnabled: !!s.isDebateTimerEnabled,
      debateTimePerPlayer: sanitizeDebateSeconds(s.debateTimePerPlayer),
    } satisfies GameSettings),
  );
export const loadSettings = (): GameSettings => {
  try {
    const raw = localStorage.getItem(SETTINGS);
    const parsed = raw
      ? { ...DEFAULT_SETTINGS, ...(JSON.parse(raw) as GameSettings) }
      : DEFAULT_SETTINGS;
    return {
      isDebateTimerEnabled: !!parsed.isDebateTimerEnabled,
      debateTimePerPlayer: sanitizeDebateSeconds(parsed.debateTimePerPlayer),
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
};

export const saveNames = (names: string[]) => localStorage.setItem(NAMES, JSON.stringify(names));
export const loadNames = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem(NAMES) ?? "[]");
  } catch {
    return [];
  }
};
export const saveSetup = (data: SetupData) => localStorage.setItem(KEY, JSON.stringify(data));
export const loadSetup = (): SetupData | null => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as SetupData) : null;
  } catch {
    return null;
  }
};
export const saveGame = (g: unknown) => localStorage.setItem(GAME, JSON.stringify(g));
export const loadGame = <T>(): T | null => {
  try {
    const raw = localStorage.getItem(GAME);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
};
export const clearGame = () => localStorage.removeItem(GAME);
