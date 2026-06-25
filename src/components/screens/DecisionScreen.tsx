import { motion } from 'framer-motion';
import type { EditorialDecision } from '../../types';

interface DecisionScreenProps {
  decisions: EditorialDecision[];
  onChoose: (decisionId: string) => void;
}

export function DecisionScreen({ decisions, onChoose }: DecisionScreenProps) {
  return (
    <div className="absolute inset-0 bg-navy-900 flex flex-col items-center justify-center p-6 font-body">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-game-accent to-transparent pointer-events-none" />

      <motion.div
        className="text-center mb-10 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="font-heading text-3xl font-bold text-navy-100 mb-3 tracking-tight">Keputusan Editorial</h2>
        <p className="text-sm text-navy-400 font-medium">
          Apa yang harus dipublikasikan oleh mading?
        </p>
      </motion.div>

      <div className="w-full max-w-md space-y-4 relative z-10">
        {decisions.map((decision, index) => (
          <motion.button
            key={decision.id}
            className="choice-button text-left"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            onClick={() => onChoose(decision.id)}
          >
            <div className="font-bold text-navy-100">{decision.label}</div>
            <div className="text-xs text-navy-400 mt-1.5 leading-relaxed">{decision.description}</div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
