export type EvidenceKind =
  | 'document'
  | 'social_post'
  | 'chat'
  | 'testimony'
  | 'photo'
  | 'social_comment';

export type Credibility = 'low' | 'medium' | 'high';

export type RelationKind =
  | 'contradiction'
  | 'context_needed'
  | 'correlation'
  | 'weak_correlation'
  | 'irrelevant'
  | 'unknown';

export interface Evidence {
  id: string;
  title: string;
  kind: EvidenceKind;
  source: string;
  claim: string;
  credibility: Credibility;
  entityTags: string[];
  timeTags: string[];
  locationTags: string[];
  relatedEvidenceIds: string[];
  contradictionWith: string[];
  learningPoint: string;
  unlockSceneId: string;
  visual: string;
  audioSrc?: string;
}

export interface EvidenceRule {
  id: string;
  evidenceAId: string;
  evidenceBId: string;
  kind: RelationKind;
  label: string;
  explanation: string;
  unlocksConfrontation: boolean;
  insightId: string;
}

export interface ClaimInspectionRule {
  id: string;
  claimId: string;
  evidenceId: string;
  requiredInsightIds: string[];
  verdict: 'supports' | 'contradicts' | 'weak' | 'needs_context';
  feedback: string;
  unlocksConfrontationId?: string;
}

export interface EditorialDecision {
  id: string;
  label: string;
  description: string;
  summary: string;
  requiredEvidenceIds?: string[];
  requiredChoiceId?: string; // Links this decision to a specific confrontation choice
}

export interface EditorialOutcome {
  tier: 'strong' | 'partial' | 'failure';
  title: string;
  narrative: string;
  reputationDelta: number;
  rumorSpreadDelta: number;
  reflectionBullets: string[];
  learningSummary?: LearningSummary;
}

export interface LearningSummary {
  editorialStance: string;
  verificationQuality: string;
  rumorRisk: string;
  keyEvidence: string[];
  missedEvidence: string[];
  digitalLiteracyConcepts: string[];
}
