export type SceneMode =
  | 'visual_novel'
  | 'phone'
  | 'board'
  | 'inspection'
  | 'decision'
  | 'reflection'
  | 'confrontation';

export interface DialogueLine {
  id: string;
  speaker: string;
  expression: string;
  text: string;
  audioSrc?: string;
  autoAdvance?: boolean;
  autoAdvanceDelay?: number;
}

export interface Choice {
  id: string;
  text: string;
  effect: string;
  stateChanges?: Partial<{
    curiosityScore: number;
    cautionScore: number;
    reputation: number;
    credibilityScore: number;
    rumorSpread: number;
    evidenceQuality: number;
  }>;
}

export interface CharacterInScene {
  characterId: string;
  position: 'left' | 'center' | 'right';
  initialExpression: string;
}

export interface ConditionalNext {
  condition: string;
  requiredInsightIds?: string[];
  requiredChoices?: string[];
  nextSceneId: string;
}

export interface Scene {
  id: string;
  chapterId: string;
  title: string;
  location: string;
  mode: SceneMode;
  background: string;
  characters: CharacterInScene[];
  dialogues: DialogueLine[];
  choices?: Choice[];
  unlockEvidenceIds: string[];
  nextSceneId?: string;
  conditionalNext?: ConditionalNext[];
}
