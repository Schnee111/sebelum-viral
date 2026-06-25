# Data Schemas — Sebelum Viral

> TypeScript types and Zod schemas for all game data
> Last updated: 2026-06-14

---

## 1. Core Types

### 1.1 Evidence Types

```typescript
// src/types/evidence.ts

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
  id: string;                    // e.g., "EV_CH1_002"
  title: string;                 // Display title
  kind: EvidenceKind;            // Type of evidence
  source: string;                // Where it came from
  claim: string;                 // Main claim/statement
  credibility: Credibility;      // Initial credibility
  entityTags: string[];          // People/orgs mentioned
  timeTags: string[];            // Time references
  locationTags: string[];        // Location references
  relatedEvidenceIds: string[];  // Correlated evidence
  contradictionWith: string[];   // Contradicting evidence
  learningPoint: string;         // Educational takeaway
  unlockSceneId: string;         // Which scene unlocks this
  visual: string;                // Image path for evidence card
  audioSrc?: string;             // Optional TTS audio path
}
```

### 1.2 Scene Types

```typescript
// src/types/scene.ts

export type SceneMode =
  | 'visual_novel'
  | 'phone'
  | 'board'
  | 'inspection'
  | 'decision'
  | 'reflection'
  | 'confrontation';

export interface DialogueLine {
  id: string;                    // e.g., "CH1_S01_D001"
  speaker: string;               // Character ID or "narrator"
  expression: string;            // Character expression
  text: string;                  // Dialog text (Indonesian)
  audioSrc?: string;             // TTS audio path
  autoAdvance?: boolean;         // Auto-advance after audio
  autoAdvanceDelay?: number;     // Delay in ms before auto-advance
}

export interface Choice {
  id: string;                    // e.g., "CH1_C001"
  text: string;                  // Choice text (Indonesian)
  effect: string;                // Description of effect
  stateChanges?: Partial<PlayerState>; // Optional state changes
}

export interface Scene {
  id: string;                    // e.g., "CH1_S01"
  chapterId: string;             // e.g., "CH1"
  title: string;                 // Scene title
  location: string;              // Location name
  mode: SceneMode;               // Scene type
  background: string;            // Background image path
  characters: CharacterInScene[];// Characters present
  dialogues: DialogueLine[];     // Dialog sequence
  choices?: Choice[];            // Player choices
  unlockEvidenceIds: string[];   // Evidence unlocked
  nextSceneId?: string;          // Next scene (linear)
  conditionalNext?: ConditionalNext[]; // Branching
}

export interface CharacterInScene {
  characterId: string;
  position: 'left' | 'center' | 'right';
  initialExpression: string;
}

export interface ConditionalNext {
  condition: string;             // Condition description
  requiredInsightIds?: string[];
  requiredChoices?: string[];
  nextSceneId: string;
}
```

### 1.3 Rule Types

```typescript
// src/types/rules.ts

export interface EvidenceRule {
  id: string;                    // e.g., "CH1_RULE_001"
  evidenceAId: string;
  evidenceBId: string;
  kind: RelationKind;
  label: string;                 // Display label
  explanation: string;           // Explanation text
  unlocksConfrontation: boolean;
  insightId: string;             // Insight added when found
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
  id: string;                    // e.g., "EDITORIAL_PUBLISH_FAST"
  label: string;                 // Short label
  description: string;           // Full description
  summary: string;               // What player chose
}

export interface EditorialOutcome {
  tier: 'strong' | 'partial' | 'failure';
  title: string;
  narrative: string;
  reputationDelta: number;
  rumorSpreadDelta: number;
  reflectionBullets: string[];
  learningSummary: LearningSummary;
}

export interface LearningSummary {
  editorialStance: string;       // e.g., "Hati-hati dan berbasis bukti"
  verificationQuality: string;   // e.g., "Kuat"
  rumorRisk: string;             // e.g., "Menurun"
  keyEvidence: string[];         // Important evidence found
  missedEvidence: string[];      // Evidence player missed
  digitalLiteracyConcepts: string[]; // Concepts learned
}
```

### 1.4 Game State Types

```typescript
// src/types/game.ts

export type Screen =
  | 'landing'
  | 'story'
  | 'hub'
  | 'board'
  | 'inspection'
  | 'confrontation'
  | 'decision'
  | 'reflection';

export interface PlayerState {
  curiosityScore: number;        // 0-100
  cautionScore: number;          // 0-100
  reputation: number;            // 0-100
  credibilityScore: number;      // 0-100
  rumorSpread: number;           // 0-100
  evidenceQuality: number;       // 0-100
}

export interface RelationshipState {
  trustLala: number;             // 0-100
  trustAldi: number;             // 0-100
  trustBintang: number;          // 0-100
  trustCitra: number;            // 0-100
  trustRendra: number;           // 0-100
  trustPakArdi: number;          // 0-100
}

export interface GameProgress {
  currentSceneId: string;
  currentChapter: string;
  collectedEvidenceIds: string[];
  foundInsightIds: string[];
  choices: string[];
  confrontedNpcs: string[];
  playerState: PlayerState;
  relationships: RelationshipState;
}

export interface SaveData {
  version: string;
  timestamp: number;
  screen: Screen;
  progress: GameProgress;
  confrontations: string[];
  boardState: BoardState;
}

export interface BoardState {
  nodes: BoardNode[];
  edges: BoardEdge[];
}

export interface BoardNode {
  evidenceId: string;
  position: { x: number; y: number };
}

export interface BoardEdge {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
  ruleId?: string;
  kind?: RelationKind;
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
```

---

## 2. Zod Schemas

### 2.1 Evidence Schema

```typescript
// src/schemas/evidence.schema.ts

import { z } from 'zod';

export const EvidenceKindSchema = z.enum([
  'document', 'social_post', 'chat', 'testimony', 'photo', 'social_comment'
]);

export const CredibilitySchema = z.enum(['low', 'medium', 'high']);

export const RelationKindSchema = z.enum([
  'contradiction', 'context_needed', 'correlation',
  'weak_correlation', 'irrelevant', 'unknown'
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

export type EvidenceInput = z.infer<typeof EvidenceSchema>;
```

### 2.2 Scene Schema

```typescript
// src/schemas/scene.schema.ts

import { z } from 'zod';

export const SceneModeSchema = z.enum([
  'visual_novel', 'phone', 'board', 'inspection',
  'decision', 'reflection', 'confrontation'
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
```

### 2.3 Rule Schema

```typescript
// src/schemas/rule.schema.ts

import { z } from 'zod';
import { RelationKindSchema } from './evidence.schema';

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
```

---

## 3. JSON Data Format Examples

### 3.1 Scene Entry

```json
{
  "id": "CH1_S01",
  "chapterId": "CH1",
  "title": "24 Jam Sebelumnya",
  "location": "Ruang Mading",
  "mode": "visual_novel",
  "background": "bg_mading_room",
  "characters": [
    { "characterId": "nala", "position": "left", "initialExpression": "neutral" },
    { "characterId": "lala", "position": "right", "initialExpression": "serious" }
  ],
  "dialogues": [
    {
      "id": "CH1_S01_D001",
      "speaker": "lala",
      "expression": "serious",
      "text": "Nala, ada rumor soal kandidat OSIS yang mulai viral. Kita harus hati-hati sebelum menulis.",
      "audioSrc": "dialog/CH1_S01_D001.mp3"
    },
    {
      "id": "CH1_S01_D002",
      "speaker": "nala",
      "expression": "curious",
      "text": "Rumor apa, Kak?",
      "audioSrc": "dialog/CH1_S01_D002.mp3"
    }
  ],
  "choices": [
    {
      "id": "CH1_C001",
      "text": "Kita cek sumbernya dulu.",
      "effect": "caution +5, curiosity +3",
      "stateChanges": { "cautionScore": 5, "curiosityScore": 3 }
    },
    {
      "id": "CH1_C002",
      "text": "Kalau sudah viral, kita harus cepat tulis.",
      "effect": "reputation +3, credibility -5",
      "stateChanges": { "reputation": 3, "credibilityScore": -5 }
    }
  ],
  "unlockEvidenceIds": ["EV_CH1_001"],
  "nextSceneId": "CH1_S02"
}
```

### 3.2 Evidence Entry

```json
{
  "id": "EV_CH1_002",
  "title": "Story Anonim tentang Aldi",
  "kind": "social_post",
  "source": "@suarakelas12",
  "claim": "Aldi memakai dana OSIS untuk acara pribadi.",
  "credibility": "low",
  "entityTags": ["Aldi", "OSIS", "Dana Kegiatan"],
  "timeTags": ["Senin Pagi"],
  "locationTags": ["Ruang OSIS"],
  "relatedEvidenceIds": ["EV_CH1_005"],
  "contradictionWith": ["EV_CH1_009"],
  "learningPoint": "Akun anonim perlu diverifikasi dengan sumber lain.",
  "unlockSceneId": "CH1_S02",
  "visual": "evidence/story_anonim_aldi.png",
  "audioSrc": "dialog/EV_CH1_002_desc.mp3"
}
```

### 3.3 Rule Entry

```json
{
  "id": "CH1_RULE_001",
  "evidenceAId": "EV_CH1_002",
  "evidenceBId": "EV_CH1_009",
  "kind": "contradiction",
  "label": "Kontradiksi Waktu dan Lokasi",
  "explanation": "Story anonim menyebut Aldi berada di ruang OSIS saat transaksi, tetapi jadwal latihan menunjukkan Aldi berada di lapangan pada waktu yang sama.",
  "unlocksConfrontation": true,
  "insightId": "INS_CH1_KEY_CONTRADICTION"
}
```

---

## 4. Validation Integration

```typescript
// src/data/index.ts

import { SceneSchema, EvidenceSchema, EvidenceRuleSchema } from '../schemas';
import { scenes } from './chapter-1/scenes';
import { evidences } from './chapter-1/evidences';
import { rules } from './chapter-1/rules';

// Validate all data at import time (dev only)
if (import.meta.env.DEV) {
  scenes.forEach(scene => SceneSchema.parse(scene));
  evidences.forEach(evidence => EvidenceSchema.parse(evidence));
  rules.forEach(rule => EvidenceRuleSchema.parse(rule));
}

export const chapterOne = { scenes, evidences, rules };
```
