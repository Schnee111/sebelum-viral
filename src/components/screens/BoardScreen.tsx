import { BoardCanvas } from '../board/BoardCanvas';
import type { Evidence, EvidenceRule, BoardEdge } from '../../types';

interface BoardScreenProps {
  evidences: Evidence[];
  rules: EvidenceRule[];
  existingEdges: BoardEdge[];
  foundInsightIds: string[];
  onConnect: (edge: BoardEdge, insightId?: string) => void;
  onBack: () => void;
}

export function BoardScreen(props: BoardScreenProps) {
  return <BoardCanvas {...props} />;
}
