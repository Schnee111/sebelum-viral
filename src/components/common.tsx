import { FileText, MessageCircle } from "lucide-react";
import type { Evidence } from "../types/game";

export function EvidenceGrid({ inventory }: { inventory: Evidence[] }) {
  return (
    <div className="evidence-grid">
      {inventory.map((evidence) => (
        <article className={`evidence-card credibility-${evidence.credibility}`} key={evidence.id}>
          <div className="evidence-visual" aria-hidden="true">
            {evidence.kind === "chat" || evidence.kind === "social_comment" ? (
              <MessageCircle size={28} />
            ) : (
              <FileText size={28} />
            )}
          </div>
          <div>
            <span>{evidence.source}</span>
            <h3>{evidence.title}</h3>
            <p>{evidence.claim}</p>
            <small>{evidence.learningPoint}</small>
          </div>
        </article>
      ))}
    </div>
  );
}

export function TopBar({
  inventoryCount,
  insightCount,
  saveStatus,
}: {
  inventoryCount: number;
  insightCount: number;
  saveStatus: string;
}) {
  return (
    <nav className="top-bar" aria-label="Status permainan">
      <strong>Sebelum Viral</strong>
      <span>{inventoryCount} evidence</span>
      <span>{insightCount} insight</span>
      <span>{saveStatus}</span>
    </nav>
  );
}

export function CharacterPortrait({ name, tone }: { name: string; tone: "teal" | "amber" | "red" }) {
  return (
    <div className={`character-portrait portrait-${tone}`}>
      <div className="portrait-head" />
      <div className="portrait-body" />
      <span>{name}</span>
    </div>
  );
}

export function formatDelta(value: number) {
  if (value > 0) return `+${value}`;
  return String(value);
}
