import { describe, it, expect } from 'vitest';
import { advanceScene, getScene } from '../../engines/storyEngine';
import type { ChapterData } from '../../types';
import { DEFAULT_PROGRESS } from '../../types';

const mockChapter: ChapterData = {
  id: 'CH1',
  title: 'Test Chapter',
  scenes: [
    {
      id: 'CH1_S00',
      chapterId: 'CH1',
      title: 'Scene 0',
      location: 'Test',
      mode: 'visual_novel',
      background: 'bg_test',
      characters: [],
      dialogues: [{ id: 'D001', speaker: 'nala', expression: 'neutral', text: 'Test' }],
      unlockEvidenceIds: ['EV_CH1_001'],
      nextSceneId: 'CH1_S01',
    },
    {
      id: 'CH1_S01',
      chapterId: 'CH1',
      title: 'Scene 1',
      location: 'Test',
      mode: 'visual_novel',
      background: 'bg_test',
      characters: [],
      dialogues: [{ id: 'D002', speaker: 'nala', expression: 'neutral', text: 'Test 2' }],
      choices: [
        { id: 'C001', text: 'Choice A', effect: 'caution +5', stateChanges: { cautionScore: 5 } },
        { id: 'C002', text: 'Choice B', effect: 'speed +5', stateChanges: { reputation: 5 } },
      ],
      unlockEvidenceIds: [],
      nextSceneId: 'CH1_S02',
    },
    {
      id: 'CH1_S02',
      chapterId: 'CH1',
      title: 'Scene 2',
      location: 'Test',
      mode: 'visual_novel',
      background: 'bg_test',
      characters: [],
      dialogues: [{ id: 'D003', speaker: 'nala', expression: 'neutral', text: 'Test 3' }],
      unlockEvidenceIds: [],
    },
  ],
  evidences: [],
  rules: [],
  claimRules: [],
  editorialDecisions: [],
};

describe('storyEngine', () => {
  describe('getScene', () => {
    it('should find scene by id', () => {
      const scene = getScene(mockChapter, 'CH1_S00');
      expect(scene).toBeDefined();
      expect(scene?.title).toBe('Scene 0');
    });

    it('should return undefined for missing scene', () => {
      const scene = getScene(mockChapter, 'CH1_S99');
      expect(scene).toBeUndefined();
    });
  });

  describe('advanceScene', () => {
    it('should advance to next scene', () => {
      const result = advanceScene(mockChapter, DEFAULT_PROGRESS);
      expect(result.currentSceneId).toBe('CH1_S01');
    });

    it('should collect evidence from scene', () => {
      const result = advanceScene(mockChapter, DEFAULT_PROGRESS);
      expect(result.collectedEvidenceIds).toContain('EV_CH1_001');
    });

    it('should not duplicate evidence', () => {
      const progress = { ...DEFAULT_PROGRESS, collectedEvidenceIds: ['EV_CH1_001'] };
      const result = advanceScene(mockChapter, progress);
      expect(result.collectedEvidenceIds.filter((id) => id === 'EV_CH1_001')).toHaveLength(1);
    });

    it('should record choice and apply state changes', () => {
      const progress = { ...DEFAULT_PROGRESS, currentSceneId: 'CH1_S01' };
      const result = advanceScene(mockChapter, progress, 'C001');
      expect(result.choices).toContain('C001');
      expect(result.playerState.cautionScore).toBe(55); // 50 + 5
    });

    it('should handle missing choice gracefully', () => {
      const progress = { ...DEFAULT_PROGRESS, currentSceneId: 'CH1_S01' };
      const result = advanceScene(mockChapter, progress, 'INVALID');
      expect(result.choices).not.toContain('INVALID');
    });

    it('should return progress unchanged for missing scene', () => {
      const progress = { ...DEFAULT_PROGRESS, currentSceneId: 'CH1_S99' };
      const result = advanceScene(mockChapter, progress);
      expect(result).toEqual(progress);
    });
  });
});
