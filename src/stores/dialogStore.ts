import { create } from 'zustand';
import type { DialogueLine } from '../types';

interface DialogState {
  currentLine: DialogueLine | null;
  isTyping: boolean;
  isComplete: boolean;
  dialogQueue: DialogueLine[];
  currentIndex: number;

  setDialogQueue: (lines: DialogueLine[]) => void;
  setCurrentLine: (line: DialogueLine | null) => void;
  setIsTyping: (isTyping: boolean) => void;
  advanceLine: () => DialogueLine | null;
  skipTypewriter: () => void;
  reset: () => void;
}

export const useDialogStore = create<DialogState>((set, get) => ({
  currentLine: null,
  isTyping: false,
  isComplete: false,
  dialogQueue: [],
  currentIndex: 0,

  setDialogQueue: (lines) =>
    set({
      dialogQueue: lines,
      currentIndex: 0,
      currentLine: lines[0] ?? null,
      isTyping: true,
      isComplete: false,
    }),

  setCurrentLine: (line) => set({ currentLine: line }),

  setIsTyping: (isTyping) => set({ isTyping }),

  advanceLine: () => {
    const { dialogQueue, currentIndex } = get();
    const nextIndex = currentIndex + 1;
    if (nextIndex >= dialogQueue.length) {
      set({ isComplete: true, isTyping: false });
      return null;
    }
    const nextLine = dialogQueue[nextIndex]!;
    set({
      currentIndex: nextIndex,
      currentLine: nextLine,
      isTyping: true,
    });
    return nextLine;
  },

  skipTypewriter: () => set({ isTyping: false }),

  reset: () =>
    set({
      currentLine: null,
      isTyping: false,
      isComplete: false,
      dialogQueue: [],
      currentIndex: 0,
    }),
}));
