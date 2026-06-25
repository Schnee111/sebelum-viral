import { motion, AnimatePresence } from 'framer-motion';
import type { Choice } from '../../types';

interface ChoicePanelProps {
  choices: Choice[];
  selectedId?: string | null;
  onSelect: (choiceId: string) => void;
  disabled?: boolean;
}

export function ChoicePanel({ choices, selectedId, onSelect, disabled }: ChoicePanelProps) {
  if (!choices || choices.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="absolute inset-0 z-20 flex items-center justify-center bg-navy-900/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="w-full max-w-lg space-y-4 px-6 relative z-30">
          {choices.map((choice, index) => {
            const isSelected = selectedId === choice.id;
            return (
              <motion.button
                key={choice.id}
                className={`choice-button relative overflow-hidden group ${
                  isSelected
                    ? 'bg-game-accent/20 border-game-accent shadow-[0_0_15px_rgba(59,130,246,0.3)] text-white'
                    : 'bg-navy-800/80 border-navy-600/50 text-navy-100 hover:border-game-accent/50'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                initial={{ opacity: 0, x: -30, skewX: 5 }}
                animate={{ opacity: 1, x: 0, skewX: 0 }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 300, damping: 20 }}
                onClick={() => !disabled && onSelect(choice.id)}
                disabled={disabled}
              >
                {/* Hover shine effect */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
                
                <span className="relative z-10 text-lg tracking-wide group-hover:scale-[1.02] transition-transform duration-200">
                  {choice.text}
                </span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
