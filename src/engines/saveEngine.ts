import localforage from "localforage";
import type { GameProgress } from "../types/game";

const SAVE_KEY = "sebelum-viral:chapter-one";

export interface PersistedGameState {
  screen: string;
  progress: GameProgress;
  confrontations: string[];
}

export interface StorageAdapter {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
}

export const localForageStorage: StorageAdapter = {
  async getItem(key) {
    const value = await localforage.getItem<string>(key);
    return value ?? null;
  },
  async setItem(key, value) {
    await localforage.setItem(key, value);
  },
  async removeItem(key) {
    await localforage.removeItem(key);
  },
};

export async function saveGame(storage: StorageAdapter, state: PersistedGameState): Promise<void> {
  await storage.setItem(SAVE_KEY, JSON.stringify(state));
}

export async function loadGame(storage: StorageAdapter): Promise<PersistedGameState | null> {
  const raw = await storage.getItem(SAVE_KEY);
  if (!raw) return null;
  return JSON.parse(raw) as PersistedGameState;
}

export async function clearGame(storage: StorageAdapter): Promise<void> {
  await storage.removeItem(SAVE_KEY);
}
