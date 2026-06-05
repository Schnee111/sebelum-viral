import { describe, expect, it } from "vitest";
import {
  advanceScene,
  evaluateConnection,
  evaluateEditorialOutcome,
  inspectClaimWithEvidence,
} from "../../engines/chapterLogic";
import { chapterOne } from "../../data/chapterOne";

describe("Chapter 1 scene progression", () => {
  it("unlocks evidence when a scene is completed", () => {
    const state = advanceScene(chapterOne, {
      currentSceneId: "CH1_S02",
      collectedEvidenceIds: ["EV_CH1_001"],
      foundInsightIds: [],
      choices: [],
    });

    expect(state.collectedEvidenceIds).toEqual(["EV_CH1_001", "EV_CH1_002"]);
    expect(state.currentSceneId).toBe("CH1_S03");
  });

  it("records a selected scene choice while advancing", () => {
    const state = advanceScene(
      chapterOne,
      {
        currentSceneId: "CH1_S01",
        collectedEvidenceIds: [],
        foundInsightIds: [],
        choices: [],
      },
      "CH1_C001",
    );

    expect(state.choices).toEqual(["CH1_C001"]);
    expect(state.collectedEvidenceIds).toEqual(["EV_CH1_001"]);
    expect(state.currentSceneId).toBe("CH1_S02");
  });
});

describe("Chapter 1 evidence graph rules", () => {
  it("detects the signature time and location contradiction", () => {
    const result = evaluateConnection(chapterOne, "EV_CH1_002", "EV_CH1_009");

    expect(result.kind).toBe("contradiction");
    expect(result.insightId).toBe("CH1_RULE_001");
    expect(result.label).toBe("Kontradiksi Waktu dan Lokasi");
    expect(result.unlocksConfrontation).toBe(true);
  });

  it("labels repeated rumor evidence as weak correlation, not proof", () => {
    const result = evaluateConnection(chapterOne, "EV_CH1_003", "EV_CH1_008");

    expect(result.kind).toBe("weak_correlation");
    expect(result.label).toBe("Korelasi Lemah");
    expect(result.explanation).toContain("pengulangan bukan bukti");
    expect(result.unlocksConfrontation).toBe(false);
  });
});

describe("Chapter 1 claim-evidence inspection", () => {
  it("opens the Aldi confrontation only when the key contradiction has been found", () => {
    const result = inspectClaimWithEvidence(chapterOne, {
      claimId: "CLAIM_ALDI_USED_OSIS_FUNDS",
      evidenceId: "EV_CH1_009",
      foundInsightIds: ["CH1_RULE_001"],
    });

    expect(result.verdict).toBe("contradicts");
    expect(result.unlocksConfrontationId).toBe("CONF_ALDI_KEY_CONTRADICTION");
  });

  it("rejects hearsay as weak confrontation evidence", () => {
    const result = inspectClaimWithEvidence(chapterOne, {
      claimId: "CLAIM_ALDI_USED_OSIS_FUNDS",
      evidenceId: "EV_CH1_008",
      foundInsightIds: [],
    });

    expect(result.verdict).toBe("weak");
    expect(result.unlocksConfrontationId).toBeUndefined();
  });
});

describe("Chapter 1 editorial outcomes", () => {
  it("returns the strong outcome for careful clarification after finding the contradiction", () => {
    const outcome = evaluateEditorialOutcome(chapterOne, {
      decisionId: "EDITORIAL_CLARIFY",
      foundInsightIds: ["CH1_RULE_001"],
      confrontationIds: ["CONF_ALDI_KEY_CONTRADICTION"],
    });

    expect(outcome.tier).toBe("strong");
    expect(outcome.reputationDelta).toBeGreaterThan(0);
    expect(outcome.reflectionBullets).toContain("Kamu memisahkan klaim, bukti, dan batas pengetahuan.");
  });

  it("returns a failure outcome when publishing the viral accusation quickly", () => {
    const outcome = evaluateEditorialOutcome(chapterOne, {
      decisionId: "EDITORIAL_PUBLISH_FAST",
      foundInsightIds: [],
      confrontationIds: [],
    });

    expect(outcome.tier).toBe("failure");
    expect(outcome.rumorSpreadDelta).toBeGreaterThan(0);
    expect(outcome.reflectionBullets).toContain("Popularitas rumor tidak sama dengan kebenaran.");
  });
});
