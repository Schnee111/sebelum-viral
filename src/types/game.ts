import type { Evidence, EvidenceRule, ClaimInspectionRule, EditorialDecision, EditorialOutcome } from './evidence';
import type { Scene } from './scene';
import type { RelationKind } from './evidence';

export type Screen =
  | 'landing'
  | 'story'
  | 'phone'
  | 'hub'
  | 'visual_novel'
  | 'exploration'
  | 'board'
  | 'inspection'
  | 'confrontation'
  | 'decision'
  | 'reflection';

export interface PlayerState {
  curiosityScore: number;
  cautionScore: number;
  reputation: number;
  credibilityScore: number;
  rumorSpread: number;
  evidenceQuality: number;
}

export interface RelationshipState {
  trustLala: number;
  trustAldi: number;
  trustBintang: number;
  trustCitra: number;
  trustRendra: number;
  trustPakArdi: number;
}

export interface GameProgress {
  currentSceneId: string;
  currentChapter: string;
  currentHoaxWave: number;
  unlockedLocations: string[];
  ticker: number;
  collectedEvidenceIds: string[];
  foundInsightIds: string[];
  choices: string[];
  confrontedNpcs: string[];
  visitedSceneIds: string[];
  playerState: PlayerState;
  relationships: RelationshipState;
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

export interface BoardState {
  nodes: BoardNode[];
  edges: BoardEdge[];
}

export interface SaveData {
  version: string;
  timestamp: number;
  screen: Screen;
  progress: GameProgress;
  confrontations: string[];
  boardState: BoardState;
}

export interface ChapterData {
  id: string;
  title: string;
  scenes: Scene[];
  evidences: Evidence[];
  rules: EvidenceRule[];
  claimRules: ClaimInspectionRule[];
  editorialDecisions: EditorialDecision[];
  editorialOutcomes?: Record<string, EditorialOutcome>;
}

export const DEFAULT_PLAYER_STATE: PlayerState = {
  curiosityScore: 50,
  cautionScore: 50,
  reputation: 50,
  credibilityScore: 50,
  rumorSpread: 50,
  evidenceQuality: 0,
};

export const DEFAULT_RELATIONSHIPS: RelationshipState = {
  trustLala: 60,
  trustAldi: 50,
  trustBintang: 50,
  trustCitra: 50,
  trustRendra: 50,
  trustPakArdi: 50,
};

export const DEFAULT_PROGRESS: GameProgress = {
  currentSceneId: 'CH1_S00',
  currentChapter: 'CH1',
  currentHoaxWave: 1,
  unlockedLocations: ['mading'],
  ticker: 0,
  collectedEvidenceIds: [],
  foundInsightIds: [],
  choices: [],
  confrontedNpcs: [],
  visitedSceneIds: [],
  playerState: { ...DEFAULT_PLAYER_STATE },
  relationships: { ...DEFAULT_RELATIONSHIPS },
};
