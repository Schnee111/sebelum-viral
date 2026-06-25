import { motion } from 'framer-motion';
import type { Evidence } from '../../types';

const CREDIBILITY_COLORS = {
  low: 'border-red-500 text-red-400',
  medium: 'border-amber-500 text-amber-400',
  high: 'border-emerald-500 text-emerald-400',
};

const CREDIBILITY_LABELS = {
  low: 'Rendah',
  medium: 'Sedang',
  high: 'Tinggi',
};

interface EvidenceCardProps {
  evidence: Evidence;
  onClick?: () => void;
  isSelected?: boolean;
  compact?: boolean;
}

export function EvidenceCard({ evidence, onClick, isSelected, compact }: EvidenceCardProps) {
  return (
    <motion.div
      className={`evidence-card ${isSelected ? 'border-blue-500 shadow-lg shadow-blue-500/20' : ''} ${
        compact ? 'p-2' : ''
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <div className="flex items-start gap-2">
        <div className="flex-1 min-w-0">
          <h4 className={`font-semibold text-gray-900 truncate ${compact ? 'text-xs' : 'text-sm'}`}>
            {evidence.title}
          </h4>
          <p className={`text-gray-500 truncate ${compact ? 'text-[10px]' : 'text-xs'}`}>
            {evidence.source}
          </p>
        </div>
        <span
          className={`flex-shrink-0 text-[10px] px-1.5 py-0.5 rounded border ${
            CREDIBILITY_COLORS[evidence.credibility]
          }`}
        >
          {CREDIBILITY_LABELS[evidence.credibility]}
        </span>
      </div>
      {!compact && (
        <p className="text-xs text-gray-700 mt-2 line-clamp-2">{evidence.claim}</p>
      )}
    </motion.div>
  );
}
