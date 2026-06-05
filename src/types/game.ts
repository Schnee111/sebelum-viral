export type EvidenceKind = "document" | "social_post" | "chat" | "testimony" | "photo" | "social_comment";
export type Credibility = "low" | "medium" | "high";
export type RelationKind =
  | "contradiction"
  | "context_needed"
  | "correlation"
  | "weak_correlation"
  | "irrelevant"
  | "unknown";

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
  learningPoint: string;
  visual: string;
}

export interface Scene {
  id: string;
  title: string;
  location: string;
  mode: "visual_novel" | "phone" | "board" | "inspection" | "decision" | "reflection";
  background: string;
  unlockEvidenceIds: string[];
  nextSceneId?: string;
  dialogues: DialogueLine[];
  choices?: Choice[];
}

export interface DialogueLine {
  speaker: string;
  expression: string;
  text: string;
}

export interface Choice {
  id: string;
  text: string;
  effect: string;
}

export interface EvidenceRule {
  id: string;
  evidenceAId: string;
  evidenceBId: string;
  kind: RelationKind;
  label: string;
  explanation: string;
  unlocksConfrontation: boolean;
}

export interface ClaimInspectionRule {
  claimId: string;
  evidenceId: string;
  requiredInsightIds: string[];
  verdict: "supports" | "contradicts" | "weak" | "needs_context";
  feedback: string;
  unlocksConfrontationId?: string;
}

export interface EditorialDecision {
  id: string;
  label: string;
  summary: string;
}

export interface EditorialOutcome {
  tier: "strong" | "partial" | "failure";
  title: string;
  narrative: string;
  reputationDelta: number;
  rumorSpreadDelta: number;
  reflectionBullets: string[];
}

export interface ChapterData {
  id: string;
  title: string;
  scenes: Scene[];
  evidences: Evidence[];
  rules: EvidenceRule[];
  claimRules: ClaimInspectionRule[];
  editorialDecisions: EditorialDecision[];
}

export interface GameProgress {
  currentSceneId: string;
  collectedEvidenceIds: string[];
  foundInsightIds: string[];
  choices: string[];
}
