import { z } from 'zod';

export const SceneModeSchema = z.enum([
  'visual_novel', 'phone', 'board', 'inspection',
  'decision', 'reflection', 'confrontation',
]);

export const DialogueLineSchema = z.object({
  id: z.string(),
  speaker: z.string(),
  expression: z.string(),
  text: z.string().min(1),
  audioSrc: z.string().optional(),
  autoAdvance: z.boolean().optional(),
  autoAdvanceDelay: z.number().optional(),
});

export const ChoiceSchema = z.object({
  id: z.string(),
  text: z.string().min(1),
  effect: z.string(),
  stateChanges: z.object({
    curiosityScore: z.number().optional(),
    cautionScore: z.number().optional(),
    reputation: z.number().optional(),
    credibilityScore: z.number().optional(),
    rumorSpread: z.number().optional(),
    evidenceQuality: z.number().optional(),
  }).optional(),
});

export const CharacterInSceneSchema = z.object({
  characterId: z.string(),
  position: z.enum(['left', 'center', 'right']),
  initialExpression: z.string(),
});

export const SceneSchema = z.object({
  id: z.string().regex(/^CH\d+_S\d{2,3}$/),
  chapterId: z.string(),
  title: z.string().min(1),
  location: z.string(),
  mode: SceneModeSchema,
  background: z.string(),
  characters: z.array(CharacterInSceneSchema),
  dialogues: z.array(DialogueLineSchema).min(1),
  choices: z.array(ChoiceSchema).optional(),
  unlockEvidenceIds: z.array(z.string()),
  nextSceneId: z.string().optional(),
});

export type SceneInput = z.infer<typeof SceneSchema>;
export type DialogueLineInput = z.infer<typeof DialogueLineSchema>;
