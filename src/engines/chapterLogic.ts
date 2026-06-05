import type {
  ChapterData,
  EditorialOutcome,
  GameProgress,
  RelationKind,
} from "../types/game";

export interface ConnectionResult {
  kind: RelationKind;
  insightId?: string;
  label: string;
  explanation: string;
  unlocksConfrontation: boolean;
}

export interface ClaimInspectionInput {
  claimId: string;
  evidenceId: string;
  foundInsightIds: string[];
}

export interface ClaimInspectionResult {
  verdict: "supports" | "contradicts" | "weak" | "needs_context";
  feedback: string;
  unlocksConfrontationId?: string;
}

export interface EditorialOutcomeInput {
  decisionId: string;
  foundInsightIds: string[];
  confrontationIds: string[];
}

export function advanceScene(
  _chapter: ChapterData,
  state: GameProgress,
  selectedChoiceId?: string,
): GameProgress {
  const scene = _chapter.scenes.find((candidate) => candidate.id === state.currentSceneId);
  if (!scene) return state;

  const collected = new Set(state.collectedEvidenceIds);
  for (const evidenceId of scene.unlockEvidenceIds) {
    collected.add(evidenceId);
  }
  const selectedChoiceBelongsToScene = scene.choices?.some((choice) => choice.id === selectedChoiceId) ?? false;
  const choices =
    selectedChoiceId && selectedChoiceBelongsToScene && !state.choices.includes(selectedChoiceId)
      ? [...state.choices, selectedChoiceId]
      : state.choices;

  return {
    ...state,
    currentSceneId: scene.nextSceneId ?? state.currentSceneId,
    collectedEvidenceIds: Array.from(collected),
    choices,
  };
}

export function evaluateConnection(
  chapter: ChapterData,
  evidenceAId: string,
  evidenceBId: string,
): ConnectionResult {
  const rule = chapter.rules.find((candidate) =>
    matchesEvidencePair(candidate.evidenceAId, candidate.evidenceBId, evidenceAId, evidenceBId),
  );

  if (rule) {
    return {
      kind: rule.kind,
      insightId: rule.id,
      label: rule.label,
      explanation: rule.explanation,
      unlocksConfrontation: rule.unlocksConfrontation,
    };
  }

  return {
    kind: "unknown",
    label: "Belum Dievaluasi",
    explanation: "Hubungan bukti belum dianalisis.",
    unlocksConfrontation: false,
  };
}

export function inspectClaimWithEvidence(
  chapter: ChapterData,
  input: ClaimInspectionInput,
): ClaimInspectionResult {
  const rule = chapter.claimRules.find(
    (candidate) => candidate.claimId === input.claimId && candidate.evidenceId === input.evidenceId,
  );

  if (!rule) {
    return {
      verdict: "needs_context",
      feedback: "Bukti ini belum cukup untuk memeriksa klaim tersebut.",
    };
  }

  const requirementsMet = rule.requiredInsightIds.every((insightId) =>
    input.foundInsightIds.includes(insightId),
  );

  return {
    verdict: requirementsMet ? rule.verdict : "needs_context",
    feedback: requirementsMet
      ? rule.feedback
      : "Hubungkan bukti terkait di detective board sebelum memakai bukti ini untuk konfrontasi.",
    unlocksConfrontationId: requirementsMet ? rule.unlocksConfrontationId : undefined,
  };
}

export function evaluateEditorialOutcome(
  _chapter: ChapterData,
  input: EditorialOutcomeInput,
): EditorialOutcome {
  if (input.decisionId === "EDITORIAL_PUBLISH_FAST") {
    return {
      tier: "failure",
      title: "Rumor Makin Kuat",
      narrative:
        "Mading mendapat perhatian cepat, tetapi artikel memperkuat tuduhan yang belum terbukti dan membuat Aldi makin dirugikan.",
      reputationDelta: -2,
      rumorSpreadDelta: 3,
      reflectionBullets: [
        "Popularitas rumor tidak sama dengan kebenaran.",
        "Komentar dan story anonim perlu dipisahkan dari bukti primer.",
      ],
    };
  }

  const foundKeyContradiction = input.foundInsightIds.includes("CH1_RULE_001");
  const confrontedResponsibly = input.confrontationIds.includes("CONF_ALDI_KEY_CONTRADICTION");

  if (input.decisionId === "EDITORIAL_CLARIFY" && foundKeyContradiction && confrontedResponsibly) {
    return {
      tier: "strong",
      title: "Klarifikasi Hati-hati",
      narrative:
        "Mading menjelaskan bahwa tuduhan terhadap Aldi belum terbukti, sambil tetap membuka isu pencatatan dana untuk klarifikasi lanjutan.",
      reputationDelta: 3,
      rumorSpreadDelta: -2,
      reflectionBullets: [
        "Kamu memisahkan klaim, bukti, dan batas pengetahuan.",
        "Kontradiksi waktu dan lokasi dipakai untuk meredam overclaim tanpa menyatakan Aldi pasti bersih.",
      ],
    };
  }

  return {
    tier: "partial",
    title: "Publikasi Aman tetapi Belum Tajam",
    narrative:
      "Keputusanmu tidak memperparah rumor, tetapi belum cukup kuat menjelaskan bagian mana yang sudah terverifikasi.",
    reputationDelta: 1,
    rumorSpreadDelta: -1,
    reflectionBullets: [
      "Kamu menghindari overclaim, tetapi masih perlu membandingkan waktu, lokasi, dan sumber.",
    ],
  };
}

function matchesEvidencePair(ruleA: string, ruleB: string, inputA: string, inputB: string): boolean {
  return (ruleA === inputA && ruleB === inputB) || (ruleA === inputB && ruleB === inputA);
}
