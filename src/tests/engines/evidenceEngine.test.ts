import { describe, it, expect } from 'vitest';
import {
  unlockEvidence,
  getCollectedEvidence,
  isEvidenceCollected,
  getEvidenceByScene,
  getEvidenceById,
} from '../../engines/evidenceEngine';
import type { Evidence } from '../../types';
import { DEFAULT_PROGRESS } from '../../types';

const mockEvidence: Evidence[] = [
  {
    id: 'EV_CH1_001',
    title: 'Test Evidence 1',
    kind: 'document',
    source: 'Test',
    claim: 'Test claim',
    credibility: 'high',
    entityTags: ['Aldi'],
    timeTags: ['Senin'],
    locationTags: ['Ruang OSIS'],
    relatedEvidenceIds: [],
    contradictionWith: [],
    learningPoint: 'Test',
    unlockSceneId: 'CH1_S01',
    visual: 'test.png',
  },
  {
    id: 'EV_CH1_002',
    title: 'Test Evidence 2',
    kind: 'social_post',
    source: '@test',
    claim: 'Test claim 2',
    credibility: 'low',
    entityTags: ['Aldi'],
    timeTags: [],
    locationTags: [],
    relatedEvidenceIds: ['EV_CH1_001'],
    contradictionWith: [],
    learningPoint: 'Test',
    unlockSceneId: 'CH1_S02',
    visual: 'test2.png',
  },
];

describe('evidenceEngine', () => {
  describe('unlockEvidence', () => {
    it('should add evidence to progress', () => {
      const result = unlockEvidence(mockEvidence[0]!, DEFAULT_PROGRESS);
      expect(result.collectedEvidenceIds).toContain('EV_CH1_001');
    });

    it('should not duplicate evidence', () => {
      const progress = { ...DEFAULT_PROGRESS, collectedEvidenceIds: ['EV_CH1_001'] };
      const result = unlockEvidence(mockEvidence[0]!, progress);
      expect(result.collectedEvidenceIds.filter((id) => id === 'EV_CH1_001')).toHaveLength(1);
    });
  });

  describe('getCollectedEvidence', () => {
    it('should return only collected evidence', () => {
      const result = getCollectedEvidence(mockEvidence, ['EV_CH1_001']);
      expect(result).toHaveLength(1);
      expect(result[0]!.id).toBe('EV_CH1_001');
    });

    it('should return empty array for no matches', () => {
      const result = getCollectedEvidence(mockEvidence, ['EV_CH1_999']);
      expect(result).toHaveLength(0);
    });
  });

  describe('isEvidenceCollected', () => {
    it('should return true for collected evidence', () => {
      expect(isEvidenceCollected('EV_CH1_001', ['EV_CH1_001'])).toBe(true);
    });

    it('should return false for uncollected evidence', () => {
      expect(isEvidenceCollected('EV_CH1_002', ['EV_CH1_001'])).toBe(false);
    });
  });

  describe('getEvidenceByScene', () => {
    it('should return evidence unlocked in scene', () => {
      const result = getEvidenceByScene(mockEvidence, 'CH1_S01');
      expect(result).toHaveLength(1);
      expect(result[0]!.id).toBe('EV_CH1_001');
    });
  });

  describe('getEvidenceById', () => {
    it('should find evidence by id', () => {
      const result = getEvidenceById(mockEvidence, 'EV_CH1_002');
      expect(result?.title).toBe('Test Evidence 2');
    });

    it('should return undefined for missing id', () => {
      const result = getEvidenceById(mockEvidence, 'EV_CH1_999');
      expect(result).toBeUndefined();
    });
  });
});
