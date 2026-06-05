import { useEffect, useMemo, useState } from "react";
import { DecisionScreen, ReflectionScreen } from "./components/decisionScreens";
import { BoardScreen, InspectionScreen, InvestigationHub } from "./components/investigationScreens";
import { ConfrontationScreen, LandingScreen, StoryScreen } from "./components/storyScreens";
import { chapterOne } from "./data/chapterOne";
import {
  advanceScene,
  evaluateConnection,
  evaluateEditorialOutcome,
  inspectClaimWithEvidence,
  type ClaimInspectionResult,
  type ConnectionResult,
} from "./engines/chapterLogic";
import { loadGame, localForageStorage, saveGame } from "./engines/saveEngine";
import type { EditorialOutcome, Evidence, GameProgress } from "./types/game";

type Screen = "landing" | "story" | "hub" | "board" | "inspection" | "confrontation" | "decision" | "reflection";

const initialProgress: GameProgress = {
  currentSceneId: "CH1_S00",
  collectedEvidenceIds: [],
  foundInsightIds: [],
  choices: [],
};

export default function App() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [progress, setProgress] = useState<GameProgress>(initialProgress);
  const [selectedA, setSelectedA] = useState("EV_CH1_002");
  const [selectedB, setSelectedB] = useState("EV_CH1_009");
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [connection, setConnection] = useState<ConnectionResult | null>(null);
  const [inspection, setInspection] = useState<ClaimInspectionResult | null>(null);
  const [confrontations, setConfrontations] = useState<string[]>([]);
  const [outcome, setOutcome] = useState<EditorialOutcome | null>(null);
  const [hasSave, setHasSave] = useState(false);
  const [saveStatus, setSaveStatus] = useState("Belum tersimpan");

  const currentScene = chapterOne.scenes.find((scene) => scene.id === progress.currentSceneId);
  const inventory = useMemo(
    () =>
      progress.collectedEvidenceIds
        .map((id) => chapterOne.evidences.find((evidence) => evidence.id === id))
        .filter((evidence): evidence is Evidence => Boolean(evidence)),
    [progress.collectedEvidenceIds],
  );
  const choiceTrail = useMemo(() => getChoiceTrail(progress.choices), [progress.choices]);

  function startGame() {
    setProgress(initialProgress);
    setSelectedChoiceId(null);
    setConnection(null);
    setInspection(null);
    setConfrontations([]);
    setOutcome(null);
    setScreen("story");
  }

  async function continueSavedGame() {
    const saved = await loadGame(localForageStorage);
    if (!saved) return;
    setProgress(saved.progress);
    setConfrontations(saved.confrontations);
    setSelectedChoiceId(null);
    setScreen(saved.screen as Screen);
  }

  function continueScene() {
    const nextProgress = advanceScene(chapterOne, progress, selectedChoiceId ?? undefined);
    setProgress(nextProgress);
    setSelectedChoiceId(null);
    if (nextProgress.currentSceneId === "CH1_S06") {
      setScreen("hub");
    }
  }

  function connectEvidence() {
    const result = evaluateConnection(chapterOne, selectedA, selectedB);
    setConnection(result);
    const insightId = result.insightId;
    if (insightId && !progress.foundInsightIds.includes(insightId)) {
      setProgress((current) => ({
        ...current,
        foundInsightIds: [...current.foundInsightIds, insightId],
      }));
    }
  }

  function inspectClaim() {
    const result = inspectClaimWithEvidence(chapterOne, {
      claimId: "CLAIM_ALDI_USED_OSIS_FUNDS",
      evidenceId: "EV_CH1_009",
      foundInsightIds: progress.foundInsightIds,
    });
    setInspection(result);
    setScreen("inspection");
  }

  function confrontAldi() {
    const confrontationId = inspection?.unlocksConfrontationId;
    if (confrontationId && !confrontations.includes(confrontationId)) {
      setConfrontations((current) => [...current, confrontationId]);
    }
    setScreen("confrontation");
  }

  function chooseEditorialDecision(decisionId: string) {
    const result = evaluateEditorialOutcome(chapterOne, {
      decisionId,
      foundInsightIds: progress.foundInsightIds,
      confrontationIds: confrontations,
    });
    setOutcome(result);
    setScreen("reflection");
  }

  useEffect(() => {
    let cancelled = false;
    loadGame(localForageStorage)
      .then((saved) => {
        if (!cancelled) setHasSave(Boolean(saved));
      })
      .catch(() => {
        if (!cancelled) setHasSave(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (screen === "landing") return;
    saveGame(localForageStorage, { screen, progress, confrontations })
      .then(() => {
        setHasSave(true);
        setSaveStatus("Tersimpan lokal");
      })
      .catch(() => {
        setSaveStatus("Gagal menyimpan");
      });
  }, [screen, progress, confrontations]);

  return (
    <main className="app-shell">
      {screen === "landing" && <LandingScreen hasSave={hasSave} onStart={startGame} onContinue={continueSavedGame} />}
      {screen === "story" && currentScene && (
        <StoryScreen
          scene={currentScene}
          inventory={inventory}
          saveStatus={saveStatus}
          selectedChoiceId={selectedChoiceId}
          onChoose={setSelectedChoiceId}
          onContinue={continueScene}
        />
      )}
      {screen === "hub" && (
        <InvestigationHub
          inventory={inventory}
          connection={connection}
          saveStatus={saveStatus}
          onOpenBoard={() => setScreen("board")}
        />
      )}
      {screen === "board" && (
        <BoardScreen
          inventory={inventory}
          saveStatus={saveStatus}
          selectedA={selectedA}
          selectedB={selectedB}
          connection={connection}
          onSelectedA={setSelectedA}
          onSelectedB={setSelectedB}
          onConnect={connectEvidence}
          onInspect={inspectClaim}
        />
      )}
      {screen === "inspection" && (
        <InspectionScreen inspection={inspection} onConfront={confrontAldi} onBack={() => setScreen("board")} />
      )}
      {screen === "confrontation" && <ConfrontationScreen onDecision={() => setScreen("decision")} />}
      {screen === "decision" && <DecisionScreen onChoose={chooseEditorialDecision} />}
      {screen === "reflection" && outcome && (
        <ReflectionScreen outcome={outcome} inventory={inventory} choiceTrail={choiceTrail} onRestart={startGame} />
      )}
    </main>
  );
}

function getChoiceTrail(choiceIds: string[]) {
  return chapterOne.scenes
    .flatMap((scene) => scene.choices ?? [])
    .filter((choice) => choiceIds.includes(choice.id))
    .map((choice) => choice.text);
}
