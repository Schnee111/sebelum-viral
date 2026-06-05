import { chapterOne } from "../data/chapterOne";
import type { EditorialOutcome, Evidence } from "../types/game";
import { formatDelta } from "./common";

export function DecisionScreen({ onChoose }: { onChoose: (decisionId: string) => void }) {
  return (
    <section className="workspace-screen">
      <header className="workspace-header">
        <p className="eyebrow">Rapat redaksi</p>
        <h2>Apa yang harus dipublikasikan sebelum rumor menyebar lebih jauh?</h2>
      </header>
      <div className="decision-grid">
        {chapterOne.editorialDecisions.map((decision) => (
          <button className="decision-card" type="button" key={decision.id} onClick={() => onChoose(decision.id)}>
            <span>{decision.label}</span>
            <p>{decision.summary}</p>
          </button>
        ))}
      </div>
    </section>
  );
}

export function ReflectionScreen({
  outcome,
  inventory,
  choiceTrail,
  onRestart,
}: {
  outcome: EditorialOutcome;
  inventory: Evidence[];
  choiceTrail: string[];
  onRestart: () => void;
}) {
  return (
    <section className="workspace-screen reflection-screen">
      <article className="reflection-card">
        <p className="eyebrow">Refleksi Chapter 1</p>
        <h1>{outcome.title}</h1>
        <p>{outcome.narrative}</p>
        <div className="score-row">
          <span>Kredibilitas mading {formatDelta(outcome.reputationDelta)}</span>
          <span>Penyebaran rumor {formatDelta(outcome.rumorSpreadDelta)}</span>
          <span>{inventory.length} bukti terkumpul</span>
        </div>
        <h2>Jejak keputusan</h2>
        <ul>
          {choiceTrail.map((choiceText) => (
            <li key={choiceText}>{choiceText}</li>
          ))}
          {choiceTrail.length === 0 && <li>Belum ada pilihan dialog yang dicatat.</li>}
        </ul>
        <h2>Yang Dipelajari</h2>
        <ul>
          {outcome.reflectionBullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
        <button className="primary-action" type="button" onClick={onRestart}>
          Main Ulang
        </button>
      </article>
    </section>
  );
}
