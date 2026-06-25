import localforage from 'localforage';
import type { SaveData, Screen, GameProgress, BoardState } from '../types';
import { DEFAULT_PROGRESS } from '../types';

const SAVE_KEY = 'sebelum-viral-save';
const SAVE_VERSION = '1.0.0';

interface SavePayload {
  screen: Screen;
  progress: GameProgress;
  confrontations: string[];
  boardState?: BoardState;
}

export async function saveGame(data: SavePayload): Promise<void> {
  const saveData: SaveData = {
    version: SAVE_VERSION,
    timestamp: Date.now(),
    screen: data.screen,
    progress: data.progress,
    confrontations: data.confrontations,
    boardState: data.boardState ?? { nodes: [], edges: [] },
  };
  await localforage.setItem(SAVE_KEY, saveData);
}

export async function loadGame(): Promise<SaveData | null> {
  try {
    const data = await localforage.getItem<SaveData>(SAVE_KEY);
    if (!data) return null;
    // Version check
    if (data.version !== SAVE_VERSION) {
      console.warn('Save data version mismatch, resetting');
      return null;
    }
    return data;
  } catch (err) {
    console.error('Failed to load save data:', err);
    return null;
  }
}

export async function deleteSave(): Promise<void> {
  await localforage.removeItem(SAVE_KEY);
}

export async function hasSave(): Promise<boolean> {
  const data = await loadGame();
  return data !== null;
}

export function getDefaultSave(): SaveData {
  return {
    version: SAVE_VERSION,
    timestamp: Date.now(),
    screen: 'story',
    progress: { ...DEFAULT_PROGRESS },
    confrontations: [],
    boardState: { nodes: [], edges: [] },
  };
}
