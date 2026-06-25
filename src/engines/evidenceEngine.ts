import type { Evidence, GameProgress } from '../types';

export function unlockEvidence(
  evidence: Evidence,
  progress: GameProgress,
): GameProgress {
  if (progress.collectedEvidenceIds.includes(evidence.id)) {
    return progress;
  }
  return {
    ...progress,
    collectedEvidenceIds: [...progress.collectedEvidenceIds, evidence.id],
  };
}

export function getCollectedEvidence(
  allEvidence: Evidence[],
  collectedIds: string[],
): Evidence[] {
  return allEvidence.filter((e) => collectedIds.includes(e.id));
}

export function isEvidenceCollected(
  evidenceId: string,
  collectedIds: string[],
): boolean {
  return collectedIds.includes(evidenceId);
}

export function getEvidenceByScene(
  allEvidence: Evidence[],
  sceneId: string,
): Evidence[] {
  return allEvidence.filter((e) => e.unlockSceneId === sceneId);
}

export function getEvidenceById(
  allEvidence: Evidence[],
  id: string,
): Evidence | undefined {
  return allEvidence.find((e) => e.id === id);
}

export function getEvidenceByCredibility(
  evidence: Evidence[],
  credibility: 'low' | 'medium' | 'high',
): Evidence[] {
  return evidence.filter((e) => e.credibility === credibility);
}

export function getEvidenceByKind(
  evidence: Evidence[],
  kind: Evidence['kind'],
): Evidence[] {
  return evidence.filter((e) => e.kind === kind);
}
