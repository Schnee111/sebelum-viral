import { EvidenceCard } from './EvidenceCard';
import type { Evidence } from '../../types';

interface EvidenceInventoryProps {
  evidences: Evidence[];
  onSelect?: (evidence: Evidence) => void;
  selectedId?: string | null;
}

export function EvidenceInventory({ evidences, onSelect, selectedId }: EvidenceInventoryProps) {
  if (evidences.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-slate-500 text-sm">
        Belum ada bukti terkumpul
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-2 p-4 overflow-y-auto max-h-[60vh]">
      {evidences.map((evidence) => (
        <EvidenceCard
          key={evidence.id}
          evidence={evidence}
          onClick={() => onSelect?.(evidence)}
          isSelected={selectedId === evidence.id}
        />
      ))}
    </div>
  );
}
