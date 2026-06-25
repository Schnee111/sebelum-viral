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

  startGame: () =>
    set({
      screen: 'story',
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
