import { describe, it, expect } from 'vitest';
import { chapter1 } from '../chapter-1/index';

describe('Game Data Validation - Chapter 1', () => {
  const { scenes, evidences } = chapter1;
  const sceneIds = new Set(scenes.map(s => s.id));
  const evidenceIds = new Set(evidences.map(e => e.id));

  it('should not have duplicate scene IDs', () => {
    const ids = scenes.map(s => s.id);
    const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
    expect(duplicates, `Duplicate scene IDs found: ${duplicates.join(', ')}`).toHaveLength(0);
  });

  it('should not have duplicate evidence IDs', () => {
    const ids = evidences.map(e => e.id);
    const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
    expect(duplicates, `Duplicate evidence IDs found: ${duplicates.join(', ')}`).toHaveLength(0);
  });

  it('all nextSceneIds should point to existing scenes', () => {
    const invalidNextScenes: string[] = [];

    scenes.forEach(scene => {
      // Confrontation scenes and explicit endings don't need nextSceneId
      if (scene.mode === 'confrontation' || !scene.nextSceneId) return;
      
      // Some special global scenes or hub scenes might not be in the direct array, but CH1_HUB is.
      if (!sceneIds.has(scene.nextSceneId)) {
        invalidNextScenes.push(`Scene ${scene.id} -> ${scene.nextSceneId}`);
      }
    });

    expect(invalidNextScenes, `Invalid nextSceneIds found:\n${invalidNextScenes.join('\n')}`).toEqual([]);
  });

  it('all choice nextSceneIds should point to existing scenes', () => {
    const invalidChoiceScenes: string[] = [];

    scenes.forEach(scene => {
      if (!scene.choices) return;
      scene.choices.forEach(choice => {
        if (choice.nextSceneId && !sceneIds.has(choice.nextSceneId)) {
          invalidChoiceScenes.push(`Scene ${scene.id} Choice ${choice.id} -> ${choice.nextSceneId}`);
        }
      });
    });

    expect(invalidChoiceScenes, `Invalid choice nextSceneIds found:\n${invalidChoiceScenes.join('\n')}`).toEqual([]);
  });

  it('all unlocked evidence IDs must exist in evidences', () => {
    const invalidEvidenceUnlocks: string[] = [];

    scenes.forEach(scene => {
      if (!scene.unlockEvidenceIds) return;
      scene.unlockEvidenceIds.forEach(evId => {
        if (!evidenceIds.has(evId)) {
          invalidEvidenceUnlocks.push(`Scene ${scene.id} unlocks missing evidence: ${evId}`);
        }
      });
    });

    expect(invalidEvidenceUnlocks, `Invalid evidence unlocks found:\n${invalidEvidenceUnlocks.join('\n')}`).toEqual([]);
  });

  it('all exploration configurations should reference existing scenes', () => {
    const invalidExplorationRefs: string[] = [];

    scenes.forEach(scene => {
      if (scene.mode !== 'exploration' || !scene.exploration) return;
      
      const exp = scene.exploration;
      
      if (exp.talkSceneId && !sceneIds.has(exp.talkSceneId)) {
        invalidExplorationRefs.push(`Exploration ${scene.id} -> talkSceneId ${exp.talkSceneId}`);
      }
      
      if (exp.investigationSceneId && !sceneIds.has(exp.investigationSceneId)) {
        invalidExplorationRefs.push(`Exploration ${scene.id} -> investigationSceneId ${exp.investigationSceneId}`);
      }
      
      if (exp.defaultPresentSceneId && !sceneIds.has(exp.defaultPresentSceneId)) {
        invalidExplorationRefs.push(`Exploration ${scene.id} -> defaultPresentSceneId ${exp.defaultPresentSceneId}`);
      }
      if (exp.interrogationScenes) {
        Object.values(exp.interrogationScenes).forEach(intId => {
          if (!sceneIds.has(intId)) {
            invalidExplorationRefs.push(`Exploration ${scene.id} -> interrogationScenes ${intId}`);
          }
        });
      }
      
      if (exp.presentEvidenceRoutes) {
        Object.entries(exp.presentEvidenceRoutes).forEach(([evId, targetId]) => {
          if (!evidenceIds.has(evId)) {
            invalidExplorationRefs.push(`Exploration ${scene.id} -> presentEvidenceRoutes key ${evId}`);
          }
          if (!sceneIds.has(targetId)) {
            invalidExplorationRefs.push(`Exploration ${scene.id} -> presentEvidenceRoutes target ${targetId}`);
          }
        });
      }
    });

    expect(invalidExplorationRefs, `Invalid exploration scene references found:\n${invalidExplorationRefs.join('\n')}`).toEqual([]);
  });
});
