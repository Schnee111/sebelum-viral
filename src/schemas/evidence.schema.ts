import { z } from 'zod';

export const EvidenceKindSchema = z.enum([
  'document', 'social_post', 'chat', 'testimony', 'photo', 'social_comment',
]);

export const CredibilitySchema = z.enum(['low', 'medium', 'high']);

export const RelationKindSchema = z.enum([
  'contradiction', 'context_needed', 'correlation',
  'weak_correlation', 'irrelevant', 'unknown',
]);

export const EvidenceSchema = z.object({
  id: z.string().regex(/^EV_CH\d+_\d{3}$/),
  title: z.string().min(1).max(100),
  kind: EvidenceKindSchema,
  source: z.string().min(1),
  claim: z.string().min(1),
  credibility: CredibilitySchema,
  entityTags: z.array(z.string()).min(1),
  timeTags: z.array(z.string()),
  locationTags: z.array(z.string()),
  relatedEvidenceIds: z.array(z.string()),
  contradictionWith: z.array(z.string()),
  learningPoint: z.string().min(1),
  unlockSceneId: z.string(),
  visual: z.string(),
  audioSrc: z.string().optional(),
});

export const EvidenceRuleSchema = z.object({
  id: z.string().regex(/^CH\d+_RULE_\d{3}$/),
  evidenceAId: z.string(),
  evidenceBId: z.string(),
  kind: RelationKindSchema,
  label: z.string().min(1),
  explanation: z.string().min(1),
  unlocksConfrontation: z.boolean(),
  insightId: z.string(),
});

export const ClaimInspectionRuleSchema = z.object({
  id: z.string(),
  claimId: z.string(),
  evidenceId: z.string(),
  requiredInsightIds: z.array(z.string()),
  verdict: z.enum(['supports', 'contradicts', 'weak', 'needs_context']),
  feedback: z.string(),
  unlocksConfrontationId: z.string().optional(),
});

export const EditorialDecisionSchema = z.object({
  id: z.string(),
  label: z.string(),
  description: z.string(),
  summary: z.string(),
});

export const EditorialOutcomeSchema = z.object({
  tier: z.enum(['strong', 'partial', 'failure']),
  title: z.string(),
  narrative: z.string(),
  reputationDelta: z.number(),
  rumorSpreadDelta: z.number(),
  reflectionBullets: z.array(z.string()),
});

export type EvidenceInput = z.infer<typeof EvidenceSchema>;
export type EvidenceRuleInput = z.infer<typeof EvidenceRuleSchema>;
