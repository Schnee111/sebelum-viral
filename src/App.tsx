import { useEffect, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Settings } from 'lucide-react';
import {
  LandingScreen,
  StoryScreen,
  HubScreen,
  BoardScreen,
  InspectionScreen,
  ConfrontationScreen,
  DecisionScreen,
  ReflectionScreen,
  SettingsModal,
} from './components/screens';
import { SmartphoneOverlay } from './components/smartphone';
import { Background } from './components/visual-novel/Background';
import { chapter1 } from './data/chapter-1';
import { advanceScene } from './engines/storyEngine';
import { getCollectedEvidence } from './engines/evidenceEngine';
import { loadGame, saveGame } from './engines/saveEngine';
import { useGameStore } from './stores/gameStore';
import { useEvidenceStore } from './stores/evidenceStore';
import { useDialog } from './hooks/useDialog';
import { useDialogStore } from './stores/dialogStore';
import type { Screen, BoardEdge, Scene, EditorialOutcome, Evidence } from './types';

const MODE_TO_SCREEN: Record<string, Screen> = {
  phone: 'phone',
  board: 'hub',
  inspection: 'inspection',
  confrontation: 'confrontation',
  decision: 'decision',
  reflection: 'reflection',
};

function App() {
  const {
    screen,
    setScreen,
    progress,
    setProgress,
    confrontations,
    startGame,
    resetGame,
  } = useGameStore();
  const { boardNodes, boardEdges, addBoardEdge } = useEvidenceStore();

  const [showSettings, setShowSettings] = useState(false);
  const [showEvidence, setShowEvidence] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  
  // State for new evidence toast
  const [toastEvidence, setToastEvidence] = useState<Evidence | null>(null);
  const [prevEvidenceLength, setPrevEvidenceLength] = useState(progress.collectedEvidenceIds.length);

  const currentScene: Scene | undefined = chapter1.scenes.find(
    (s) => s.id === progress.currentSceneId,
  );

  // Trigger toast when evidence is added
  useEffect(() => {
    if (progress.collectedEvidenceIds.length > prevEvidenceLength) {
      const newId = progress.collectedEvidenceIds[progress.collectedEvidenceIds.length - 1];
      const newEv = chapter1.evidences.find(e => e.id === newId);
      if (newEv) {
        setToastEvidence(newEv);
        setTimeout(() => setToastEvidence(null), 4000); // hide after 4s
      }
      setPrevEvidenceLength(progress.collectedEvidenceIds.length);
    }
  }, [progress.collectedEvidenceIds, prevEvidenceLength]);

  // Memoize dialogues to prevent infinite loop
  const dialogues = useMemo(
    () => ((screen === 'story' || screen === 'phone') ? currentScene?.dialogues ?? [] : []),
    [screen, currentScene?.id]
  );
  const { currentLine, isComplete, handleTap, reset: resetDialog } = useDialog(dialogues);

  // Scene mode navigation helper
  const navigateFromScene = useCallback(
    (scene: Scene | undefined) => {
      if (scene) {
        setScreen(MODE_TO_SCREEN[scene.mode] ?? 'story');
      } else {
        setScreen('reflection');
      }
    },
    [setScreen],
  );

  // Auto-advance when all dialog lines are done (no choices)
  useEffect(() => {
    if (!isComplete || screen !== 'story' || !currentScene) return;
    if (currentScene.choices && currentScene.choices.length > 0) return;

    const timer = setTimeout(() => {
      const newProgress = advanceScene(chapter1, useGameStore.getState().progress);
      setProgress(newProgress);

      const nextScene = chapter1.scenes.find(
        (s) => s.id === newProgress.currentSceneId,
      );
      navigateFromScene(nextScene);
    }, 150);

    return () => clearTimeout(timer);
  }, [isComplete, screen, currentScene, setProgress, navigateFromScene]);

  // Immediately continue after selecting a choice
  const handleChoiceSelect = useCallback((choiceId: string) => {
    if (!currentScene) return;

    resetDialog();
    const newProgress = advanceScene(chapter1, progress, choiceId);
    setProgress(newProgress);

    const nextScene = chapter1.scenes.find(
      (s) => s.id === newProgress.currentSceneId,
    );
    navigateFromScene(nextScene);
  }, [currentScene, progress, setProgress, navigateFromScene, resetDialog]);

  // Board connect handler
  const handleConnect = useCallback(
    (edge: BoardEdge, insightId?: string) => {
      addBoardEdge(edge);
      if (insightId) useGameStore.getState().addInsight(insightId);
    },
    [addBoardEdge],
  );

  // Auto-save everything except the landing screen state
  useEffect(() => {
    if (screen !== 'landing') {
      void saveGame({
        screen,
        progress,
        confrontations,
        boardState: { nodes: boardNodes, edges: boardEdges },
      });
    }
  }, [screen, progress, confrontations, boardNodes, boardEdges]);

  // Load game on mount to persist state through refreshes
  useEffect(() => {
    void loadGame().then((data) => {
      if (data) {
        setScreen(data.screen);
        setProgress(data.progress);
        useGameStore.setState({ confrontations: data.confrontations });
        useEvidenceStore.setState({
          boardNodes: data.boardState?.nodes ?? [],
          boardEdges: data.boardState?.edges ?? [],
        });
      }
      setIsInitializing(false);
    });
  }, [setScreen, setProgress]);

  // Collected evidence data
  const collectedEvidenceData = getCollectedEvidence(
    chapter1.evidences,
    progress.collectedEvidenceIds,
  );

  // ---- Render based on screen ----

  if (isInitializing) {
    return (
      <div className="absolute inset-0 bg-navy-900 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-game-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (screen === 'landing') {
    return (
      <LandingScreen
        hasSave={progress.currentSceneId !== 'scene-1' || progress.collectedEvidenceIds.length > 0} 
        onStart={startGame}
        onContinue={() => {
          void loadGame().then((data) => {
            if (data && data.screen !== 'landing') {
              setScreen(data.screen);
            } else {
              setScreen('story');
            }
          });
        }}
      />
    );
  }

  if (screen === 'hub') {
    const canInspect =
      chapter1.claimRules.length > 0 && progress.collectedEvidenceIds.length > 0;
    return (
      <HubScreen
        inventory={collectedEvidenceData}
        foundInsightIds={progress.foundInsightIds}
        onOpenBoard={() => setScreen('board')}
        onOpenInspection={() => setScreen('inspection')}
        onContinueStory={() => setScreen('story')}
        canInspect={canInspect}
      />
    );
  }

  if (screen === 'phone') {
    const { currentIndex: dialogIdx } = useDialogStore.getState();
    return (
      <div className="absolute inset-0 overflow-hidden">
        {currentScene?.background && (
          <Background src={`/assets/backgrounds/${currentScene.background}.jpg`} />
        )}
        <SmartphoneOverlay
          dialogues={currentScene?.dialogues ?? []}
          currentIndex={dialogIdx}
          isComplete={isComplete}
          onTap={handleTap}
          onContinue={() => {
            resetDialog();
            const newProgress = advanceScene(chapter1, useGameStore.getState().progress);
            setProgress(newProgress);
            const nextScene = chapter1.scenes.find(
              (s) => s.id === newProgress.currentSceneId,
            );
            navigateFromScene(nextScene);
          }}
        />
      </div>
    );
  }

  if (screen === 'board') {
    return (
      <BoardScreen
        evidences={collectedEvidenceData}
        rules={chapter1.rules}
        existingEdges={boardEdges.filter((e) => e.kind !== 'unknown' && e.kind !== 'irrelevant')}
        foundInsightIds={progress.foundInsightIds}
        onConnect={handleConnect}
        onBack={() => setScreen('hub')}
      />
    );
  }

  if (screen === 'inspection') {
    return (
      <InspectionScreen
        evidences={collectedEvidenceData}
        claimRules={chapter1.claimRules}
        foundInsightIds={progress.foundInsightIds}
        onEvaluate={() => {}}
        onBack={() => setScreen('hub')}
      />
    );
  }

  if (screen === 'confrontation') {
    const dialogue =
      currentScene?.dialogues?.map((d) => ({
        speaker: d.speaker,
        text: d.text,
      })) ?? [];
    return (
      <ConfrontationScreen
        background={currentScene?.background}
        dialogue={dialogue}
        onContinue={() => {
          resetDialog();
          setScreen('hub');
        }}
      />
    );
  }

  if (screen === 'decision') {
    return (
      <DecisionScreen
        decisions={chapter1.editorialDecisions}
        onChoose={(decisionId) => {
          useGameStore.getState().addChoice(decisionId);
          setScreen('reflection');
        }}
      />
    );
  }

  if (screen === 'reflection') {
    const defaultOutcome: EditorialOutcome = {
      tier: 'partial',
      title: 'Refleksi',
      narrative: 'Kamu telah menyelesaikan investigasi ini.',
      reputationDelta: 0,
      rumorSpreadDelta: 0,
      reflectionBullets: [
        'Selalu verifikasi informasi sebelum menyebarkan.',
        'Perhatikan sumber dan kredibilitas bukti.',
        'Pertimbangkan dampak dari keputusan publikasi.',
      ],
    };
    return (
      <ReflectionScreen
        background={currentScene?.background}
        outcome={defaultOutcome}
        collectedEvidence={collectedEvidenceData}
        missedEvidence={chapter1.evidences.filter(
          (e) => !progress.collectedEvidenceIds.includes(e.id),
        )}
        onRestart={() => {
          resetDialog();
          resetGame();
        }}
      />
    );
  }

  // Story screen (default)
  if (!currentScene) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-navy-900">
        <p className="text-navy-400 font-medium">Scene tidak ditemukan</p>
      </div>
    );
  }

  return (
    <>
      <StoryScreen
        scene={currentScene}
        currentLine={currentLine}
        inventory={collectedEvidenceData}
        onChoose={handleChoiceSelect}
        onTapDialog={handleTap}
        isDialogComplete={isComplete}
      />

      {/* New Evidence Toast */}
      <AnimatePresence>
        {toastEvidence && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="absolute top-16 left-0 right-0 mx-auto w-max z-50 flex items-center gap-4 bg-[#18181B] border border-[#E11D48]/50 px-6 py-3 rounded-full shadow-2xl shadow-[#E11D48]/10"
          >
            <div className="w-2 h-2 rounded-full bg-[#E11D48] animate-pulse" />
            <div>
              <div className="text-[9px] font-bold text-[#E11D48] tracking-widest uppercase">Berkas Baru Diperoleh</div>
              <div className="text-sm font-semibold text-[#FAFAFA]">{toastEvidence.title}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HUD overlay */}
      <div className="absolute top-4 left-4 z-40">
        <div className="text-[10px] px-4 py-2 rounded-full bg-[#09090B]/80 border border-[#27272A] text-[#A1A1AA] backdrop-blur-md font-bold tracking-widest uppercase shadow-lg">
          {currentScene.title}
        </div>
      </div>
      
      <div className="absolute top-4 right-4 z-40 flex items-center gap-3">
        <button
          onClick={() => setShowEvidence(true)}
          className="text-[10px] px-4 py-2 rounded-full bg-[#09090B]/80 hover:bg-[#18181B] hover:border-[#3F3F46] border border-[#27272A] text-[#FAFAFA] backdrop-blur-md shadow-lg flex items-center gap-2 font-bold tracking-widest uppercase transition-colors"
        >
          <Search size={14} className="text-[#E11D48]" />
          <span>{progress.collectedEvidenceIds.length} Berkas</span>
        </button>
        <button
          onClick={() => setShowSettings(true)}
          className="pointer-events-auto p-2 rounded-full bg-[#09090B]/80 hover:bg-[#18181B] border border-[#27272A] hover:border-[#3F3F46] text-[#FAFAFA] transition-colors backdrop-blur-md shadow-lg flex items-center justify-center"
        >
          <Settings size={18} />
        </button>
      </div>

      {/* In-Game Evidence Inventory Modal */}
      <AnimatePresence>
        {showEvidence && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#09090B]/90 backdrop-blur-md z-50 flex items-center justify-center p-8"
          >
            <div className="bg-[#09090B] border border-[#27272A] w-full max-w-2xl max-h-[80vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
              <div className="p-6 border-b border-[#27272A] flex items-center justify-between">
                <div className="text-[10px] font-bold text-[#71717A] tracking-widest uppercase">
                  Daftar Berkas Terkumpul
                </div>
                <button 
                  onClick={() => setShowEvidence(false)}
                  className="text-[#A1A1AA] hover:text-[#FAFAFA] text-sm font-bold uppercase tracking-widest"
                >
                  Tutup
                </button>
              </div>
              <div className="p-6 overflow-y-auto flex-1 space-y-3">
                {collectedEvidenceData.length === 0 ? (
                  <div className="text-sm text-[#52525B] italic text-center py-8">
                    Belum ada berkas yang dikumpulkan.
                  </div>
                ) : (
                  collectedEvidenceData.map((ev, i) => (
                    <div key={ev.id} className="p-4 rounded-xl border border-[#27272A] bg-[#18181B] flex flex-col gap-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-[10px] text-[#E11D48] tracking-widest uppercase font-bold mb-1">
                            Berkas {String(i + 1).padStart(2, '0')}
                          </div>
                          <div className="text-sm font-semibold text-[#FAFAFA]">{ev.title}</div>
                        </div>
                        <div className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm border ${
                          ev.credibility === 'high' ? 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/30' :
                          ev.credibility === 'medium' ? 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/30' :
                          'bg-[#E11D48]/10 text-[#E11D48] border-[#E11D48]/30'
                        }`}>
                          Kredibilitas: {ev.credibility}
                        </div>
                      </div>
                      <div className="text-[10px] text-[#71717A] tracking-widest uppercase">
                        Sumber: {ev.source}
                      </div>
                      <div className="text-[13px] text-[#D4D4D8] leading-relaxed mt-2 p-3 bg-[#09090B] rounded-lg border border-[#27272A]/50">
                        "{ev.claim}"
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings modal */}
      {showSettings && (
        <SettingsModal
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
          onGoHome={() => {
            resetDialog();
            setScreen('landing');
            setShowSettings(false);
          }}
        />
      )}
    </>
  );
}

export default App;
