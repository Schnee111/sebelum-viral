import { describe, it, expect } from 'vitest';
import {
  evaluateConnection,
  getEdgeColor,
  getEdgeLabel,
  createEdge,
  hasSharedTags,
} from '../../engines/boardEngine';
import type { EvidenceRule, Evidence } from '../../types';

const mockRules: EvidenceRule[] = [
  {
    id: 'CH1_RULE_001',
    evidenceAId: 'EV_CH1_002',
    evidenceBId: 'EV_CH1_009',
    kind: 'contradiction',
    label: 'Kontradiksi Waktu dan Lokasi',
    explanation: 'Test explanation',
    unlocksConfrontation: true,
    insightId: 'INS_CH1_KEY_CONTRADICTION',
  },
];

const mockEvidenceA: Evidence = {
  id: 'EV_CH1_002',
  title: 'Story Anonim',
  kind: 'social_post',
  source: '@test',
  claim: 'Test',
  credibility: 'low',
  entityTags: ['Aldi'],
  timeTags: ['Senin'],
  locationTags: ['Ruang OSIS'],
  relatedEvidenceIds: [],
  contradictionWith: [],
  learningPoint: 'Test',
  unlockSceneId: 'CH1_S02',
  visual: 'test.png',
};

const mockEvidenceB: Evidence = {
  id: 'EV_CH1_009',
  title: 'Jadwal Basket',
  kind: 'document',
  source: 'Klub Basket',
  claim: 'Test',
  credibility: 'high',
  entityTags: ['Aldi'],
  timeTags: ['Senin'],
  locationTags: ['Lapangan'],
  relatedEvidenceIds: [],
  contradictionWith: [],
  learningPoint: 'Test',
  unlockSceneId: 'CH1_S05',
  visual: 'test.png',
};

describe('boardEngine', () => {
  describe('evaluateConnection', () => {
    it('should find contradiction rule', () => {
      const result = evaluateConnection(mockRules, 'EV_CH1_002', 'EV_CH1_009');
      expect(result.kind).toBe('contradiction');
      expect(result.label).toBe('Kontradiksi Waktu dan Lokasi');
      expect(result.unlocksConfrontation).toBe(true);
    });

    it('should handle reversed pair', () => {
      const result = evaluateConnection(mockRules, 'EV_CH1_009', 'EV_CH1_002');
      expect(result.kind).toBe('contradiction');
    });

    it('should return unknown for unmatched pair', () => {
      const result = evaluateConnection(mockRules, 'EV_CH1_001', 'EV_CH1_002');
      expect(result.kind).toBe('unknown');
      expect(result.unlocksConfrontation).toBe(false);
    });
  });

  describe('getEdgeColor', () => {
    it('should return red for contradiction', () => {
      expect(getEdgeColor('contradiction')).toBe('#EF4444');
    });

    it('should return green for correlation', () => {
      expect(getEdgeColor('correlation')).toBe('#22C55E');
    });
  });

  describe('getEdgeLabel', () => {
    it('should return Indonesian label', () => {
      expect(getEdgeLabel('contradiction')).toBe('Kontradiksi');
      expect(getEdgeLabel('correlation')).toBe('Korelasi');
      expect(getEdgeLabel('context_needed')).toBe('Perlu Konteks');
    });
  });

  describe('createEdge', () => {
    it('should create edge with correct id', () => {
      const result = evaluateConnection(mockRules, 'EV_CH1_002', 'EV_CH1_009');
      const edge = createEdge('nodeA', 'nodeB', result);
      expect(edge.id).toBe('edge_nodeA_nodeB');
      expect(edge.kind).toBe('contradiction');
    });
  });

  describe('hasSharedTags', () => {
    it('should detect shared entity tags', () => {
      expect(hasSharedTags(mockEvidenceA, mockEvidenceB)).toBe(true);
    });

    it('should return false for no shared tags', () => {
      const noOverlap = { ...mockEvidenceB, entityTags: ['Maya'], timeTags: ['Jumat'], locationTags: ['Kantin'] };
      expect(hasSharedTags(mockEvidenceA, noOverlap)).toBe(false);
    });
  });
});
