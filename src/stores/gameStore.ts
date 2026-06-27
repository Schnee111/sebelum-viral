import { create } from 'zustand';
import type { Screen, GameProgress } from '../types';
import { DEFAULT_PROGRESS } from '../types';

interface GameState {
  screen: Screen;
  progress: GameProgress;
  confrontations: string[];
  isPlaying: boolean;

  setScreen: (screen: Screen) => void;
  setProgress: (progress: GameProgress) => void;
  updateProgress: (updates: Partial<GameProgress>) => void;
  addEvidence: (evidenceId: string) => void;
  addInsight: (insightId: string) => void;
  addChoice: (choiceId: string) => void;
  addConfrontation: (confrontationId: string) => void;
  advanceHoaxWave: () => void;
  addTicker: (amount: number) => void;
  unlockLocation: (locationId: string) => void;
  startGame: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  screen: 'landing',
  progress: { ...DEFAULT_PROGRESS },
  confrontations: [],
  isPlaying: false,

  setScreen: (screen) => set({ screen }),

  setProgress: (progress) => set({ progress }),

  updateProgress: (updates) =>
    set((state) => ({
      progress: { ...state.progress, ...updates },
    })),

  addEvidence: (evidenceId) =>
    set((state) => {
      if (state.progress.collectedEvidenceIds.includes(evidenceId)) return state;
      return {
        progress: {
          ...state.progress,
          collectedEvidenceIds: [...state.progress.collectedEvidenceIds, evidenceId],
        },
      };
    }),

  addInsight: (insightId) =>
    set((state) => {
      if (state.progress.foundInsightIds.includes(insightId)) return state;
      return {
        progress: {
          ...state.progress,
          foundInsightIds: [...state.progress.foundInsightIds, insightId],
        },
      };
    }),

  addChoice: (choiceId) =>
    set((state) => {
      if (state.progress.choices.includes(choiceId)) return state;
      return {
        progress: {
          ...state.progress,
          choices: [...state.progress.choices, choiceId],
        },
      };
    }),

  addConfrontation: (confrontationId) =>
    set((state) => {
      if (state.confrontations.includes(confrontationId)) return state;
      return { confrontations: [...state.confrontations, confrontationId] };
    }),

  advanceHoaxWave: () =>
    set((state) => ({
      progress: {
        ...state.progress,
        currentHoaxWave: Math.min(state.progress.currentHoaxWave + 1, 5),
      },
    })),

  addTicker: (amount) =>
    set((state) => {
      const newTicker = state.progress.ticker + amount;
      // Example logic: advance wave every 3 ticker points. This can be refined later.
      const shouldAdvanceWave = Math.floor(newTicker / 3) > Math.floor(state.progress.ticker / 3);
      
      return {
        progress: {
          ...state.progress,
          ticker: newTicker,
          currentHoaxWave: shouldAdvanceWave 
            ? Math.min(state.progress.currentHoaxWave + 1, 5) 
            : state.progress.currentHoaxWave
        }
      };
    }),

  unlockLocation: (locationId) =>
    set((state) => {
      if (state.progress.unlockedLocations.includes(locationId)) return state;
      return {
        progress: {
          ...state.progress,
          unlockedLocations: [...state.progress.unlockedLocations, locationId]
        }
      };
    }),

  startGame: () =>
    set({
      screen: 'phone', // CH1_S00 is mode: 'phone'
      progress: { ...DEFAULT_PROGRESS },
      confrontations: [],
      isPlaying: true,
    }),

  resetGame: () =>
    set({
      screen: 'landing',
      progress: { ...DEFAULT_PROGRESS },
      confrontations: [],
      isPlaying: false,
    }),
}));
