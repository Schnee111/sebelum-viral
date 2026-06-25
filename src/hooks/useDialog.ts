import { useCallback, useEffect } from 'react';
import { useDialogStore } from '../stores';
import type { DialogueLine } from '../types';

export function useDialog(lines: DialogueLine[]) {
  const {
    currentLine,
    isTyping,
    isComplete,
    setDialogQueue,
    advanceLine,
    reset,
  } = useDialogStore();

  useEffect(() => {
    if (lines.length > 0) {
      setDialogQueue(lines);
    }
    return () => reset();
  }, [lines, setDialogQueue, reset]);

  const handleTap = useCallback(() => {
    // Components handle their own typewriter skipping locally,
    // so we just advance the line when they tap and call this.
    advanceLine();
  }, [advanceLine]);

  return {
    currentLine,
    isTyping,
    isComplete,
    handleTap,
    advanceLine,
    reset,
  };
}
