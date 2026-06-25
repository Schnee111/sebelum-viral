import type { ChapterData, GameProgress, Scene } from '../types';

export function getScene(chapter: ChapterData, sceneId: string): Scene | undefined {
  return chapter.scenes.find((s) => s.id === sceneId);
}

export function advanceScene(
  chapter: ChapterData,
  progress: GameProgress,
  selectedChoiceId?: string,
): GameProgress {
  const scene = chapter.scenes.find((s) => s.id === progress.currentSceneId);
  if (!scene) return progress;

  // Collect evidence from this scene
  const collected = new Set(progress.collectedEvidenceIds);
  for (const evidenceId of scene.unlockEvidenceIds) {
    collected.add(evidenceId);
  }

  // Record choice if it belongs to this scene
  const choiceBelongsToScene = scene.choices?.some((c) => c.id === selectedChoiceId) ?? false;
  const choices =
    selectedChoiceId && choiceBelongsToScene && !progress.choices.includes(selectedChoiceId)
      ? [...progress.choices, selectedChoiceId]
      : progress.choices;

  // Apply choice state changes
  let playerState = { ...progress.playerState };
  if (selectedChoiceId && choiceBelongsToScene) {
    const choice = scene.choices?.find((c) => c.id === selectedChoiceId);
    if (choice?.stateChanges) {
      playerState = {
        ...playerState,
        curiosityScore: clamp(playerState.curiosityScore + (choice.stateChanges.curiosityScore ?? 0)),
        cautionScore: clamp(playerState.cautionScore + (choice.stateChanges.cautionScore ?? 0)),
        reputation: clamp(playerState.reputation + (choice.stateChanges.reputation ?? 0)),
        credibilityScore: clamp(playerState.credibilityScore + (choice.stateChanges.credibilityScore ?? 0)),
        rumorSpread: clamp(playerState.rumorSpread + (choice.stateChanges.rumorSpread ?? 0)),
        evidenceQuality: clamp(playerState.evidenceQuality + (choice.stateChanges.evidenceQuality ?? 0)),
      };
    }
  }

  // Determine next scene
  let nextSceneId = scene.nextSceneId;
  if (scene.conditionalNext) {
    for (const conditional of scene.conditionalNext) {
      const insightsMet = conditional.requiredInsightIds?.every((id) =>
        progress.foundInsightIds.includes(id),
      ) ?? true;
      const choicesMet = conditional.requiredChoices?.every((id) =>
        choices.includes(id),
      ) ?? true;
      if (insightsMet && choicesMet) {
        nextSceneId = conditional.nextSceneId;
        break;
      }
    }
  }

  return {
    ...progress,
    currentSceneId: nextSceneId ?? progress.currentSceneId,
    collectedEvidenceIds: Array.from(collected),
    choices,
    playerState,
  };
}

export function getAvailableScenes(chapter: ChapterData, progress: GameProgress): Scene[] {
  return chapter.scenes.filter((scene) => {
    // Scene is available if it's the current scene or unlocked
    if (scene.id === progress.currentSceneId) return true;
    // Could add more unlock conditions here
    return false;
  });
}

function clamp(value: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, value));
}
