import type { Evidence, EvidenceRule, RelationKind, BoardEdge } from '../types';

export interface ConnectionResult {
  kind: RelationKind;
  ruleId?: string;
  insightId?: string;
  label: string;
  explanation: string;
  unlocksConfrontation: boolean;
}

export function evaluateConnection(
  rules: EvidenceRule[],
  evidenceAId: string,
  evidenceBId: string,
): ConnectionResult {
  const rule = rules.find((r) =>
    matchesEvidencePair(r.evidenceAId, r.evidenceBId, evidenceAId, evidenceBId),
  );

  if (rule) {
    return {
      kind: rule.kind,
      ruleId: rule.id,
      insightId: rule.insightId,
      label: rule.label,
      explanation: rule.explanation,
      unlocksConfrontation: rule.unlocksConfrontation,
    };
  }

  return {
    kind: 'unknown',
    label: 'Belum Dievaluasi',
    explanation: 'Hubungan bukti belum dianalisis.',
    unlocksConfrontation: false,
  };
}

export function getEdgeColor(kind: RelationKind): string {
  switch (kind) {
    case 'contradiction':
      return '#EF4444'; // red
    case 'correlation':
      return '#22C55E'; // green
    case 'weak_correlation':
      return '#A78BFA'; // purple
    case 'context_needed':
      return '#F59E0B'; // amber
    case 'irrelevant':
      return '#6B7280'; // gray
    case 'unknown':
      return '#475569'; // slate
  }
}

export function getEdgeLabel(kind: RelationKind): string {
  switch (kind) {
    case 'contradiction':
      return 'Kontradiksi';
    case 'correlation':
      return 'Korelasi';
    case 'weak_correlation':
      return 'Korelasi Lemah';
    case 'context_needed':
      return 'Perlu Konteks';
    case 'irrelevant':
      return 'Tidak Relevan';
    case 'unknown':
      return 'Tidak Diketahui';
  }
}

export function createEdge(
  sourceNodeId: string,
  targetNodeId: string,
  result: ConnectionResult,
): BoardEdge {
  return {
    id: `edge_${sourceNodeId}_${targetNodeId}`,
    sourceNodeId,
    targetNodeId,
    ruleId: result.ruleId,
    kind: result.kind,
  };
}

export function hasSharedTags(evidenceA: Evidence, evidenceB: Evidence): boolean {
  const entitiesA = new Set(evidenceA.entityTags);
  const timesA = new Set(evidenceA.timeTags);
  const locationsA = new Set(evidenceA.locationTags);

  const sharedEntities = evidenceB.entityTags.some((t) => entitiesA.has(t));
  const sharedTimes = evidenceB.timeTags.some((t) => timesA.has(t));
  const sharedLocations = evidenceB.locationTags.some((t) => locationsA.has(t));

  return sharedEntities || sharedTimes || sharedLocations;
}

function matchesEvidencePair(
  ruleA: string,
  ruleB: string,
  inputA: string,
  inputB: string,
): boolean {
  return (ruleA === inputA && ruleB === inputB) || (ruleA === inputB && ruleB === inputA);
}
