import { describe, it, expect } from 'vitest';
import { getDefaultSave } from '../../engines/saveEngine';

describe('saveEngine', () => {
  describe('getDefaultSave', () => {
    it('should return valid save data', () => {
      const save = getDefaultSave();
      expect(save.version).toBe('1.0.0');
      expect(save.screen).toBe('story');
      expect(save.progress.currentSceneId).toBe('CH1_S00');
      expect(save.timestamp).toBeGreaterThan(0);
    });

    it('should have default player state', () => {
      const save = getDefaultSave();
      expect(save.progress.playerState.curiosityScore).toBe(50);
      expect(save.progress.playerState.cautionScore).toBe(50);
    });

    it('should have empty collections', () => {
      const save = getDefaultSave();
      expect(save.progress.collectedEvidenceIds).toHaveLength(0);
      expect(save.progress.foundInsightIds).toHaveLength(0);
      expect(save.progress.choices).toHaveLength(0);
      expect(save.confrontations).toHaveLength(0);
    });
  });
});
