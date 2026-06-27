export type SceneMode =
  | 'visual_novel'
  | 'phone'
  | 'hub'
  | 'board'
  | 'inspection'
  | 'decision'
  | 'reflection'
  | 'confrontation'
  | 'exploration';

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
  tickerDelta?: number;
  nextSceneId?: string;
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

export interface ExplorationOptions {
  characterId: string;
  talkSceneId: string;
  interrogationScenes?: {
    soft: string;
    hard: string;
    psychological?: string;
  };
  investigationSceneId?: string;
  presentEvidenceRoutes?: Record<string, string>;
  defaultPresentSceneId?: string;
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
  unlockLocationIds?: string[];
  nextSceneId?: string;
  conditionalNext?: ConditionalNext[];
  exploration?: ExplorationOptions;
}
