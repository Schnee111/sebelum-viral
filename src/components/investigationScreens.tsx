import { CheckCircle2, MessageCircle, Network } from "lucide-react";
import type { ClaimInspectionResult, ConnectionResult } from "../engines/chapterLogic";
import type { Evidence } from "../types/game";
import { EvidenceGrid, TopBar } from "./common";

export function InvestigationHub({
  inventory,
  connection,
  saveStatus,
  onOpenBoard,
}: {
  inventory: Evidence[];
  connection: ConnectionResult | null;
  saveStatus: string;
  onOpenBoard: () => void;
}) {
  return (
    <section className="workspace-screen">
      <TopBar inventoryCount={inventory.length} insightCount={connection?.insightId ? 1 : 0} saveStatus={saveStatus} />
      <header className="workspace-header">
        <p className="eyebrow">Mode investigasi</p>
        <h2>Cari apakah tuduhan terhadap Aldi didukung, bertentangan, atau masih perlu konteks.</h2>
        <button className="primary-action" type="button" onClick={onOpenBoard}>
          <Network size={18} />
          Buka Detective Board
        </button>
      </header>
      <EvidenceGrid inventory={inventory} />
    </section>
  );
}

export function BoardScreen({
  inventory,
  saveStatus,
  selectedA,
  selectedB,
  connection,
  onSelectedA,
  onSelectedB,
  onConnect,
  onInspect,
}: {
  inventory: Evidence[];
  saveStatus: string;
  selectedA: string;
  selectedB: string;
  connection: ConnectionResult | null;
  onSelectedA: (value: string) => void;
  onSelectedB: (value: string) => void;
  onConnect: () => void;
  onInspect: () => void;
}) {
  const selectedEvidenceA = inventory.find((evidence) => evidence.id === selectedA);
  const selectedEvidenceB = inventory.find((evidence) => evidence.id === selectedB);
  return (
    <section className="workspace-screen">
      <TopBar inventoryCount={inventory.length} insightCount={connection?.insightId ? 1 : 0} saveStatus={saveStatus} />
      <div className="board-layout">
        <EvidenceGrid inventory={inventory} />
        <aside className="analysis-panel">
          <p className="eyebrow">Detective board</p>
          <h2>Hubungkan Bukti</h2>
          <div className="route-preview" aria-label="Pratinjau koneksi bukti">
            <span>{selectedEvidenceA?.title ?? "Evidence A"}</span>
            <strong>+</strong>
            <span>{selectedEvidenceB?.title ?? "Evidence B"}</span>
          </div>
          <label>
            Evidence A
            <select value={selectedA} onChange={(event) => onSelectedA(event.target.value)}>
              {inventory.map((evidence) => (
                <option key={evidence.id} value={evidence.id}>
                  {evidence.title}
                </option>
              ))}
            </select>
          </label>
          <label>
            Evidence B
            <select value={selectedB} onChange={(event) => onSelectedB(event.target.value)}>
              {inventory.map((evidence) => (
                <option key={evidence.id} value={evidence.id}>
                  {evidence.title}
                </option>
              ))}
            </select>
          </label>
          <button className="primary-action" type="button" onClick={onConnect}>
            <Network size={18} />
            Hubungkan Bukti
          </button>
          {connection && (
            <div className={`insight-card insight-${connection.kind}`}>
              <span>{connection.kind.replace("_", " ")}</span>
              <h3>{connection.label}</h3>
              <p>{connection.explanation}</p>
              <strong className={connection.unlocksConfrontation ? "route-open" : "route-locked"}>
                {connection.unlocksConfrontation ? "Rute konfrontasi terbuka" : "Rute belum terbuka"}
              </strong>
            </div>
          )}
          <button className="secondary-action" type="button" onClick={onInspect} disabled={!connection?.unlocksConfrontation}>
            <CheckCircle2 size={18} />
            Periksa Klaim Aldi
          </button>
        </aside>
      </div>
    </section>
  );
}

export function InspectionScreen({
  inspection,
  onConfront,
  onBack,
}: {
  inspection: ClaimInspectionResult | null;
  onConfront: () => void;
  onBack: () => void;
}) {
  return (
    <section className="workspace-screen centered-panel">
      <article className="analysis-panel large-panel">
        <p className="eyebrow">Claim-Evidence Inspection</p>
        <h2>Klaim: Aldi memakai dana OSIS untuk acara pribadi.</h2>
        <p>{inspection?.feedback ?? "Pilih evidence yang relevan terlebih dahulu."}</p>
        <div className="action-row">
          <button className="secondary-action" type="button" onClick={onBack}>
            Kembali ke Board
          </button>
          <button className="primary-action" type="button" onClick={onConfront}>
            <MessageCircle size={18} />
            Konfrontasi Aldi
          </button>
        </div>
      </article>
    </section>
  );
}
