import { describe, expect, it } from "vitest";
import { loadGame, saveGame, type PersistedGameState, type StorageAdapter } from "../../engines/saveEngine";

function createMemoryStorage(): StorageAdapter {
  const data = new Map<string, string>();
  return {
    async getItem(key) {
      return data.get(key) ?? null;
    },
    async setItem(key, value) {
      data.set(key, value);
    },
    async removeItem(key) {
      data.delete(key);
    },
  };
}

describe("saveEngine", () => {
  it("saves and restores Chapter 1 progress", async () => {
    const storage = createMemoryStorage();
    const saved: PersistedGameState = {
      screen: "board",
      progress: {
        currentSceneId: "CH1_S06",
        collectedEvidenceIds: ["EV_CH1_002", "EV_CH1_009"],
        foundInsightIds: ["CH1_RULE_001"],
        choices: ["CH1_C004"],
      },
      confrontations: ["CONF_ALDI_KEY_CONTRADICTION"],
    };

    await saveGame(storage, saved);

    await expect(loadGame(storage)).resolves.toEqual(saved);
  });
});
