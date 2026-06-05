import { BookOpen, Newspaper, Search } from "lucide-react";
import type { Choice, Evidence, Scene } from "../types/game";
import { CharacterPortrait, TopBar } from "./common";

export function LandingScreen({
  hasSave,
  onStart,
  onContinue,
}: {
  hasSave: boolean;
  onStart: () => void;
  onContinue: () => void;
}) {
  return (
    <section className="landing-screen">
      <div className="school-scene" aria-hidden="true">
        <div className="school-building">
          <span className="window" />
          <span className="window" />
          <span className="window" />
          <span className="door" />
        </div>
        <div className="poster-board">
          <span>OSIS</span>
          <span>?</span>
        </div>
      </div>
      <div className="landing-copy">
        <p className="eyebrow">Game literasi digital naratif-investigatif</p>
        <h1>Sebelum Viral</h1>
        <p>
          Selidiki rumor pemilihan OSIS sebagai reporter mading. Kumpulkan bukti, hubungkan konteks,
          lalu putuskan apa yang layak dipublikasikan.
        </p>
        <button className="primary-action" type="button" onClick={onStart}>
          <BookOpen size={18} />
          Mulai Chapter 1
        </button>
        {hasSave && (
          <button className="secondary-action" type="button" onClick={onContinue}>
            Lanjutkan Save
          </button>
        )}
      </div>
    </section>
  );
}

export function StoryScreen({
  scene,
  inventory,
  saveStatus,
  selectedChoiceId,
  onChoose,
  onContinue,
}: {
  scene: Scene;
  inventory: Evidence[];
  saveStatus: string;
  selectedChoiceId: string | null;
  onChoose: (choiceId: string) => void;
  onContinue: () => void;
}) {
  return (
    <section className={`story-screen background-${scene.background}`}>
      <TopBar inventoryCount={inventory.length} insightCount={0} saveStatus={saveStatus} />
      <div className="scene-stage">
        <div className="character-row" aria-hidden="true">
          <CharacterPortrait name="Nala" tone="teal" />
          <CharacterPortrait name={scene.dialogues[0]?.speaker === "Aldi" ? "Aldi" : "Lala"} tone="amber" />
        </div>
        <article className="dialog-panel">
          <div>
            <p className="scene-location">{scene.location}</p>
            <h2>{scene.title}</h2>
          </div>
          {scene.dialogues.map((line) => (
            <div className="dialog-line" key={`${scene.id}-${line.speaker}-${line.text}`}>
              <span>{line.speaker}</span>
              <p>{line.text}</p>
            </div>
          ))}
          {scene.choices && (
            <div className="choice-list" aria-label="Pilihan pemain">
              {scene.choices.map((choice) => (
                <ChoiceButton
                  key={choice.id}
                  choice={choice}
                  isSelected={choice.id === selectedChoiceId}
                  onChoose={onChoose}
                />
              ))}
            </div>
          )}
          <button className="primary-action" type="button" onClick={onContinue}>
            <Search size={18} />
            Lanjut
          </button>
        </article>
      </div>
    </section>
  );
}

export function ConfrontationScreen({ onDecision }: { onDecision: () => void }) {
  return (
    <section className="story-screen background-koridor">
      <div className="scene-stage">
        <div className="character-row" aria-hidden="true">
          <CharacterPortrait name="Nala" tone="teal" />
          <CharacterPortrait name="Aldi" tone="red" />
        </div>
        <article className="dialog-panel">
          <p className="scene-location">Koridor sekolah</p>
          <h2>Konfrontasi Aldi</h2>
          <div className="dialog-line">
            <span>Nala</span>
            <p>Story itu menyebut kamu di ruang OSIS jam 10. Tapi jadwal basket menunjukkan kamu di lapangan.</p>
          </div>
          <div className="dialog-line">
            <span>Aldi</span>
            <p>Aku bisa jelasin bagian waktunya. Yang kacau itu catatan kampanye, bukan dana OSIS buat acara pribadi.</p>
          </div>
          <button className="primary-action" type="button" onClick={onDecision}>
            <Newspaper size={18} />
            Keputusan Editorial
          </button>
        </article>
      </div>
    </section>
  );
}

function ChoiceButton({
  choice,
  isSelected,
  onChoose,
}: {
  choice: Choice;
  isSelected: boolean;
  onChoose: (choiceId: string) => void;
}) {
  return (
    <button
      className={isSelected ? "choice-selected" : undefined}
      type="button"
      onClick={() => onChoose(choice.id)}
      aria-pressed={isSelected}
    >
      {choice.text}
    </button>
  );
}
