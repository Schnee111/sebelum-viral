import { motion } from 'framer-motion';
import type { Evidence } from '../../types';

interface EvidenceNodeProps {
  evidence: Evidence;
  isSelected: boolean;
  isOnBoard: boolean;
  onClick: () => void;
}

export function EvidenceNode({ evidence, isSelected, isOnBoard, onClick }: EvidenceNodeProps) {
  return (
    <motion.div
      className={`board-node relative overflow-hidden group ${isSelected ? 'board-node-selected' : ''} ${
        isOnBoard ? 'opacity-40 grayscale pointer-events-none' : ''
      }`}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      layout
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-1.5 p-1">
        <div className="text-xs font-semibold text-navy-100 text-center w-full px-1 leading-tight line-clamp-2">
          {evidence.title}
        </div>
        <div className="text-[10px] text-game-accent uppercase tracking-wider font-bold">
          {evidence.type}
        </div>
      </div>
    </motion.div>
  );
}
