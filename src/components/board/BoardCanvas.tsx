import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  evaluateConnection,
  createEdge,
  getEdgeColor,
  getEdgeLabel,
} from '../../engines/boardEngine';
import type {
  Evidence,
  EvidenceRule,
  BoardEdge,
  RelationKind,
  EvidenceKind,
} from '../../types';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowLeft,
  Link2,
  Unlink,
  X,
  AlertTriangle,
  HelpCircle,
  FileText,
  MessageSquare,
  MessageCircle,
  UserCheck,
  Camera,
  Eye,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   Layout — Responsive Honeycomb Grid
   ───────────────────────────────────────────── */

function getLayout(width: number, height: number, count: number) {
  if (width === 0 || height === 0) return { positions: [], totalHeight: 0 };
  
  const isDesktop = width >= 768;
  const cols = isDesktop ? 4 : 2; 
  
  const paddingX = isDesktop ? Math.max(120, width * 0.15) : 100;
  // Pad top/bottom more on mobile to avoid header/hud overlap
  const paddingY = isDesktop ? 120 : 160;
  
  const usableHeight = Math.max(0, height - paddingY * 2);
  
  let totalRows = 0;
  let simulatedCount = 0;
  while(simulatedCount < count) {
    const isStaggered = totalRows % 2 === 1;
    simulatedCount += (isStaggered ? cols - 1 : cols);
    totalRows++;
  }
  
  const gapY = totalRows > 1 ? usableHeight / (totalRows - 1) : 0;
  
  const positions: {x: number, y: number}[] = [];
  
  let currentRow = 0;
  let currentItemInRow = 0;
  
  for (let i = 0; i < count; i++) {
    const isStaggered = currentRow % 2 === 1;
    const itemsInThisRow = isStaggered ? cols - 1 : cols;
    const availableWidth = width - paddingX * 2;
    const step = cols > 1 ? availableWidth / (cols - 1) : 0;
    
    let x = isStaggered ? paddingX + step / 2 : paddingX;
    if (isStaggered && cols === 2) {
      x = width / 2; // perfectly center the staggered row on mobile
    } else {
      x += currentItemInRow * step;
    }
    
    const y = paddingY + currentRow * gapY;
    
    positions.push({ x, y });
    
    currentItemInRow++;
    if (currentItemInRow >= itemsInThisRow) {
      currentItemInRow = 0;
      currentRow++;
    }
  }
  
  return { positions, totalHeight: height };
}

/* ─────────────────────────────────────────────
   Evidence type helpers
   ───────────────────────────────────────────── */

const EVIDENCE_ICONS: Record<EvidenceKind, LucideIcon> = {
  document: FileText,
  social_post: MessageSquare,
  chat: MessageCircle,
  testimony: UserCheck,
  photo: Camera,
  social_comment: MessageCircle,
};

const KIND_LABELS: Record<EvidenceKind, string> = {
  document: 'Dokumen',
  social_post: 'Postingan',
  chat: 'Chat',
  testimony: 'Kesaksian',
  photo: 'Foto',
  social_comment: 'Komentar',
};

function getCredColor(c: string): string {
  if (c === 'high') return '#34D399';
  if (c === 'medium') return '#FBBF24';
  if (c === 'low') return '#FB7185';
  return '#9CA3AF';
}

function getCredLabel(c: string): string {
  if (c === 'high') return 'Tinggi';
  if (c === 'medium') return 'Sedang';
  if (c === 'low') return 'Rendah';
  return '—';
}

const RELATION_ICONS: Record<RelationKind, LucideIcon> = {
  contradiction: Unlink,
  correlation: Link2,
  weak_correlation: Link2,
  context_needed: AlertTriangle,
  irrelevant: X,
  unknown: HelpCircle,
};

const LEGEND_ITEMS: { kind: RelationKind; label: string; desc: string }[] = [
  { kind: 'correlation', label: 'Korelasi', desc: 'Bukti saling mendukung' },
  { kind: 'weak_correlation', label: 'Korelasi Lemah', desc: 'Ada hubungan, tapi lemah' },
  { kind: 'contradiction', label: 'Kontradiksi', desc: 'Bukti bertentangan' },
  { kind: 'context_needed', label: 'Perlu Konteks', desc: 'Butuh info tambahan' },
  { kind: 'irrelevant', label: 'Tidak Relevan', desc: 'Tidak ada hubungan' },
  { kind: 'unknown', label: 'Belum Diketahui', desc: 'Belum dianalisis' },
];

/* ─────────────────────────────────────────────
   Props
   ───────────────────────────────────────────── */

interface BoardCanvasProps {
  evidences: Evidence[];
  rules: EvidenceRule[];
  existingEdges: BoardEdge[];
  onConnect: (edge: BoardEdge, insightId?: string) => void;
  onBack: () => void;
}

/* ─────────────────────────────────────────────
   Component
   ───────────────────────────────────────────── */

export function BoardCanvas({
  evidences,
  rules,
  existingEdges,
  onConnect,
  onBack,
}: BoardCanvasProps) {
  const [selectedA, setSelectedA] = useState<string | null>(null);
  const [lastResult, setLastResult] = useState<{
    kind: RelationKind;
    label: string;
    explanation: string;
    evidenceA: string;
    evidenceB: string;
  } | null>(null);
  const [edges, setEdges] = useState<BoardEdge[]>(existingEdges);
  const [showLegend, setShowLegend] = useState(false);
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [customPositions, setCustomPositions] = useState<Record<string, {x: number, y: number}>>({});

  const isDragging = useRef(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const lastPos = useRef({ x: 0, y: 0 });
  const draggedId = useRef<string | null>(null);

  useEffect(() => {
    if (!containerRef) return;
    const obs = new ResizeObserver((entries) => {
      setDimensions({
        width: entries[0]!.contentRect.width,
        height: entries[0]!.contentRect.height,
      });
    });
    obs.observe(containerRef);
    return () => obs.disconnect();
  }, [containerRef]);

  const { defaultPositions, totalHeight } = useMemo(() => {
    const layout = getLayout(dimensions.width, dimensions.height, evidences.length);
    return { defaultPositions: layout.positions, totalHeight: layout.totalHeight };
  }, [dimensions.width, dimensions.height, evidences.length]);

  const activePositions = useMemo(() => {
    return evidences.map((ev, i) => customPositions[ev.id] || defaultPositions[i]);
  }, [evidences, customPositions, defaultPositions]);

  const selectedEvidence = selectedA
    ? evidences.find((e) => e.id === selectedA)
    : null;

  const connectedCount = useMemo(() => {
    const ids = new Set<string>();
    edges.forEach((e) => {
      ids.add(e.sourceNodeId);
      ids.add(e.targetNodeId);
    });
    return ids.size;
  }, [edges]);

  const handleCardClick = useCallback(
    (evidenceId: string) => {
      if (!selectedA) {
        setSelectedA(evidenceId);
        setLastResult(null);
      } else if (selectedA === evidenceId) {
        setSelectedA(null);
      } else {
        const result = evaluateConnection(rules, selectedA, evidenceId);
        setLastResult({
          kind: result.kind,
          label: result.label,
          explanation: result.explanation,
          evidenceA: evidences.find((e) => e.id === selectedA)?.title ?? '',
          evidenceB: evidences.find((e) => e.id === evidenceId)?.title ?? '',
        });

        // Only draw lines for meaningful relations — skip irrelevant & unknown
        const NO_LINE_KINDS: RelationKind[] = ['irrelevant', 'unknown'];
        if (!NO_LINE_KINDS.includes(result.kind)) {
          const edge = createEdge(selectedA, evidenceId, result);
          setEdges((prev) => {
            const isDup = prev.some(
              (e) =>
                (e.sourceNodeId === edge.sourceNodeId &&
                  e.targetNodeId === edge.targetNodeId) ||
                (e.sourceNodeId === edge.targetNodeId &&
                  e.targetNodeId === edge.sourceNodeId),
            );
            if (!isDup) {
              onConnect(edge, result.insightId);
              return [...prev, edge];
            }
            return prev;
          });
        }

        setSelectedA(null);
      }
    },
    [selectedA, rules, evidences, onConnect],
  );

  const handlePointerDown = useCallback((e: React.PointerEvent, id: string) => {
    // Only capture if it's the primary button (left click or touch)
    if (e.button !== 0) return;
    isDragging.current = false;
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    lastPos.current = { x: e.clientX, y: e.clientY };
    draggedId.current = id;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!draggedId.current) return;
    
    const dx = e.clientX - dragStartPos.current.x;
    const dy = e.clientY - dragStartPos.current.y;
    
    // Drag threshold of 3 pixels
    if (!isDragging.current && (Math.abs(dx) > 3 || Math.abs(dy) > 3)) {
      isDragging.current = true;
    }
    
    if (isDragging.current) {
      const deltaX = e.clientX - lastPos.current.x;
      const deltaY = e.clientY - lastPos.current.y;
      lastPos.current = { x: e.clientX, y: e.clientY };
      
      const id = draggedId.current;
      setCustomPositions((prev) => {
        const idx = evidences.findIndex(ev => ev.id === id);
        const base = prev[id] || defaultPositions[idx] || {x: 0, y: 0};
        return {
          ...prev,
          [id]: { x: base.x + deltaX, y: base.y + deltaY }
        };
      });
    }
  }, [evidences, defaultPositions]);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (draggedId.current) {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      draggedId.current = null;
    }
  }, []);

  return (
    <div
      className="absolute inset-0 flex flex-col font-body"
      style={{ background: '#09090B' }}
    >
      {/* ── Header ── */}
      <div
        className="flex-shrink-0 flex items-center justify-between px-5 py-3 relative z-50"
        style={{
          background: '#09090B',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
        }}
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-semibold hover:text-white transition-colors"
          style={{ color: '#A1A1AA' }}
        >
          <ArrowLeft size={18} />
          <span>Kembali</span>
        </button>

        <div className="text-center">
          <div
            className="text-base font-bold tracking-wide"
            style={{ color: '#FAFAFA' }}
          >
            Papan Investigasi
          </div>
          <div className="text-[10px] font-medium tracking-widest uppercase mt-0.5" style={{ color: '#71717A' }}>
            Hubungkan Bukti
          </div>
        </div>

        <div className="text-right">
          <div className="text-sm font-bold text-game-accent">
            {connectedCount}
          </div>
          <div className="text-[9px] font-bold uppercase tracking-widest" style={{ color: '#71717A' }}>
            Terhubung
          </div>
        </div>
      </div>

      {/* ── Canvas ── */}
      <div 
        ref={setContainerRef}
        className="flex-1 relative overflow-hidden"
      >
        {/* Subtle dot grid background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: 'radial-gradient(circle, #27272A 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            minHeight: totalHeight,
          }}
        />

        {/* Empty state */}
        {evidences.length === 0 && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-2"
            style={{ color: '#9CA3AF' }}
          >
            <FileText size={32} strokeWidth={1.5} />
            <div className="text-sm font-medium">Belum ada bukti</div>
            <div className="text-xs">Kumpulkan bukti dari cerita terlebih dahulu</div>
          </div>
        )}

        {/* SVG connection lines */}
        {edges.length > 0 && dimensions.width > 0 && (
          <svg
            className="absolute inset-0 pointer-events-none"
            style={{ width: dimensions.width, height: totalHeight, zIndex: 5, overflow: 'visible' }}
          >
            {edges.map((edge) => {
              const si = evidences.findIndex(
                (e) => e.id === edge.sourceNodeId,
              );
              const ti = evidences.findIndex(
                (e) => e.id === edge.targetNodeId,
              );
              if (si < 0 || ti < 0) return null;
              
              // Focus mode logic
              const isEdgeFocused = selectedA
                ? edge.sourceNodeId === selectedA || edge.targetNodeId === selectedA
                : true;
                
              const s = activePositions[si];
              const t = activePositions[ti];
              if (!s || !t) return null;

              const color = getEdgeColor(edge.kind ?? 'unknown');

              const x1 = s.x;
              const y1 = s.y;
              const x2 = t.x;
              const y2 = t.y;

              // Straight, tight string for realistic detective board
              const d = `M${x1},${y1} L${x2},${y2}`;

              return (
                <g key={edge.id}>
                  {/* Soft shadow */}
                  <path
                    d={d}
                    fill="none"
                    stroke={color}
                    strokeWidth={10}
                    opacity={0.06}
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                  {/* Main line (neon effect) */}
                  <motion.path
                    d={d}
                    fill="none"
                    stroke={color}
                    strokeWidth={isEdgeFocused ? 2 : 1}
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ 
                      pathLength: 1, 
                      opacity: selectedA ? (isEdgeFocused ? 0.9 : 0.05) : 0.4 
                    }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                  />
                </g>
              );
            })}
          </svg>
        )}

        {/* Connection labels (HTML, positioned at line midpoints) */}
        {dimensions.width > 0 && edges.map((edge) => {
          const si = evidences.findIndex((e) => e.id === edge.sourceNodeId);
          const ti = evidences.findIndex((e) => e.id === edge.targetNodeId);
          if (si < 0 || ti < 0) return null;

          const s = activePositions[si];
          const t = activePositions[ti];
          if (!s || !t) return null;

          // Offset to 38% instead of 50% so it doesn't land exactly on staggered cards
          const f = 0.38;
          const mx = s.x + (t.x - s.x) * f;
          const my = s.y + (t.y - s.y) * f;
          const color = getEdgeColor(edge.kind ?? 'unknown');

          // Focus mode logic for labels
          const isEdgeFocused = selectedA
            ? edge.sourceNodeId === selectedA || edge.targetNodeId === selectedA
            : true;

          // Hide label completely if edge is dimmed or if it's 'unknown' to reduce extreme clutter
          if (!isEdgeFocused || edge.kind === 'unknown') return null;

          return (
            <motion.div
              key={`label-${edge.id}`}
              className="absolute pointer-events-none"
              style={{
                left: `${mx}px`,
                top: `${my}px`,
                transform: 'translate(-50%, -50%)',
                zIndex: 45, // Floats above cards
                opacity: selectedA ? 1 : 0.85,
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.25 }}
            >
              <div
                className="px-2.5 py-0.5 rounded-md whitespace-nowrap"
                style={{
                  fontSize: '9px',
                  fontWeight: 600,
                  background: '#18181B',
                  border: `1px solid ${color}40`,
                  color: color,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                {getEdgeLabel(edge.kind ?? 'unknown')}
              </div>
            </motion.div>
          );
        })}

        {/* Evidence cards */}
        {dimensions.width > 0 && evidences.map((evidence, index) => {
          const pos = activePositions[index];
          if (!pos) return null;

          const isSelected = selectedA === evidence.id;
          
          // Is this card globally connected to anything?
          const isConnectedGlobally = edges.some(
            (e) =>
              e.sourceNodeId === evidence.id ||
              e.targetNodeId === evidence.id,
          );
          
          // Is this card connected specifically to the selected card?
          const isNeighborOfSelected = selectedA
            ? edges.some(
                (e) =>
                  (e.sourceNodeId === selectedA && e.targetNodeId === evidence.id) ||
                  (e.targetNodeId === selectedA && e.sourceNodeId === evidence.id)
              )
            : false;

          // Determine card opacity based on Focus Mode
          const cardOpacity = selectedA
            ? (isSelected || isNeighborOfSelected ? 1 : 0.3)
            : 1;

          const Icon = EVIDENCE_ICONS[evidence.kind] ?? FileText;
          const credColor = getCredColor(evidence.credibility);

          return (
            <motion.div
              key={evidence.id}
              className="absolute"
              style={{
                left: `${pos.x}px`,
                top: `${pos.y}px`,
                zIndex: isSelected ? 30 : isNeighborOfSelected ? 20 : isConnectedGlobally ? 15 : 10,
                width: 'clamp(140px, 25vw, 180px)',
              }}
              initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
              animate={{ scale: 1, opacity: cardOpacity, x: "-50%", y: "-50%" }}
              transition={{
                delay: index * 0.04,
                type: 'spring',
                stiffness: 320,
                damping: 26,
              }}
            >
              <motion.button
                className="relative w-full text-left overflow-hidden group flex flex-col"
                style={{
                  padding: '14px 16px',
                  borderRadius: '12px',
                  background: isSelected
                    ? '#27272A'
                    : '#18181B',
                  border: isSelected
                    ? '1px solid #E11D48'
                    : isConnectedGlobally
                      ? '1px solid rgba(161,161,170,0.2)'
                      : '1px solid transparent',
                  boxShadow: isSelected
                    ? '0 0 24px rgba(225,29,72,0.15)'
                    : '0 4px 20px rgba(0,0,0,0.3)',
                  cursor: isDragging.current ? 'grabbing' : 'pointer',
                  transition: 'background 0.2s, border 0.2s, box-shadow 0.2s',
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onPointerDown={(e) => handlePointerDown(e, evidence.id)}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onClick={() => {
                  if (!isDragging.current) {
                    handleCardClick(evidence.id);
                  }
                }}
              >
                {/* Header: Type Badge & Credibility */}
                <div className="flex items-center justify-between mb-3 w-full">
                  <span
                    className="inline-flex items-center px-2 py-1 rounded-md"
                    style={{
                      fontSize: '9px',
                      fontWeight: 700,
                      background: 'rgba(255,255,255,0.08)',
                      color: '#D4D4D8',
                    }}
                  >
                    <Icon size={10} className="mr-1.5" />
                    {KIND_LABELS[evidence.kind]}
                  </span>
                  
                  {/* Credibility Dot + Text */}
                  <div className="flex items-center gap-1.5">
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: credColor, boxShadow: `0 0 6px ${credColor}` }}
                    />
                    <span style={{ fontSize: '9px', color: credColor, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {getCredLabel(evidence.credibility)}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#FAFAFA',
                    lineHeight: '1.4',
                    marginBottom: '6px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {evidence.title}
                </div>

                {/* Source */}
                <div
                  style={{ fontSize: '9px', color: '#71717A', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '8px' }}
                >
                  {evidence.source}
                </div>

                {/* Claim preview */}
                <div
                  style={{
                    fontSize: '11px',
                    color: '#A1A1AA',
                    lineHeight: '1.5',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {evidence.claim}
                </div>

                {/* Connected dot indicator */}
                {isConnectedGlobally && (
                  <div
                    className="absolute -top-1 -right-1"
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#34D399',
                      border: '2px solid rgba(9,9,11,1)',
                    }}
                  />
                )}

                {/* Selection pulse */}
                {isSelected && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      borderRadius: '16px',
                      border: '2px solid #FB7185',
                    }}
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </motion.button>
            </motion.div>
          );
        })}

        {/* Selection hint */}
        <AnimatePresence>
          {selectedA && !lastResult && (
            <motion.div
                className="fixed bottom-24 left-1/2 -translate-x-1/2 px-5 py-3 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
                style={{
                  zIndex: 40,
                  fontSize: '12px',
                  fontWeight: 700,
                  background: '#09090B',
                  border: '1px solid rgba(245,158,11,0.3)',
                  color: '#FCD34D',
                  boxShadow: '0 0 20px rgba(245,158,11,0.1)',
                }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
              >
                Pilih bukti kedua untuk menghubungkan
              </motion.div>
          )}
        </AnimatePresence>

        {/* Evidence detail panel (shows selected evidence info) */}
        <AnimatePresence>
          {selectedEvidence && !lastResult && (
              <motion.div
                className="fixed bottom-6 left-4 right-4 md:left-auto md:right-6 md:w-96"
                style={{
                  zIndex: 45,
                  padding: '16px 20px',
                  borderRadius: '20px',
                  background: '#09090B',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
                }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0 shadow-[0_0_8px_currentColor]"
                      style={{
                        background: getCredColor(selectedEvidence.credibility),
                        color: getCredColor(selectedEvidence.credibility),
                      }}
                    />
                    <span
                      className="text-sm font-bold tracking-wide"
                      style={{ color: '#FAFAFA' }}
                    >
                      {selectedEvidence.title}
                    </span>
                  </div>
                  <div
                    className="text-[11px] leading-relaxed font-medium"
                    style={{ color: '#A1A1AA' }}
                  >
                    {selectedEvidence.claim}
                  </div>
                  <div
                    className="text-[9px] font-bold tracking-widest uppercase mt-2"
                    style={{ color: '#71717A' }}
                  >
                    Sumber: <span className="text-game-accent">{selectedEvidence.source}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedA(null)}
                  className="p-1.5 rounded-lg flex-shrink-0 bg-white/5 hover:bg-white/10 transition-colors"
                  style={{ color: '#D4D4D8' }}
                >
                  <X size={16} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result toast */}
        <AnimatePresence>
          {lastResult && (
            <motion.div
              className="fixed bottom-6 left-4 right-4 md:left-auto md:right-6 md:w-[400px]"
              style={{ zIndex: 50 }}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            >
              <div
                className="relative flex flex-col gap-3 overflow-hidden"
                style={{
                  padding: '16px 20px',
                  borderRadius: '20px',
                  background: '#09090B',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: `0 10px 30px rgba(0,0,0,0.8)`,
                }}
              >
                {/* Header: Icon + Title + Close */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full shadow-lg"
                      style={{
                        background: getEdgeColor(lastResult.kind) + '25',
                        border: `1px solid ${getEdgeColor(lastResult.kind)}50`,
                      }}
                    >
                      {(() => {
                        const RIcon = RELATION_ICONS[lastResult.kind] ?? HelpCircle;
                        return <RIcon size={16} style={{ color: getEdgeColor(lastResult.kind) }} />;
                      })()}
                    </div>
                    <div
                      style={{
                        fontSize: '15px',
                        fontWeight: 800,
                        letterSpacing: '0.02em',
                        color: getEdgeColor(lastResult.kind),
                        textShadow: `0 0 10px ${getEdgeColor(lastResult.kind)}40`,
                      }}
                    >
                      {lastResult.label}
                    </div>
                  </div>
                  <button
                    onClick={() => setLastResult(null)}
                    className="p-1.5 rounded-lg flex-shrink-0 bg-white/5 hover:bg-white/10 transition-colors"
                    style={{ color: '#D4D4D8' }}
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Content */}
                <div className="w-full">
                  <div
                    style={{ fontSize: '11px', color: '#A1A1AA', fontWeight: 600, letterSpacing: '0.02em', marginBottom: '8px' }}
                  >
                    {lastResult.evidenceA} <span className="text-game-accent mx-1.5">↔</span> {lastResult.evidenceB}
                  </div>
                  <div
                    style={{
                      fontSize: '13px',
                      color: '#FAFAFA',
                      lineHeight: '1.6',
                      fontWeight: 500,
                    }}
                  >
                    {lastResult.explanation}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Floating Legend HUD (Bottom Left) ── */}
      <div className="absolute bottom-6 left-6 z-50 flex flex-col-reverse items-start gap-4 pointer-events-none">
        <button
          onClick={() => setShowLegend((v) => !v)}
          className="w-12 h-12 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] pointer-events-auto flex items-center justify-center transition-all hover:scale-105 active:scale-95"
          style={{
            background: showLegend ? '#E11D48' : '#09090B',
            color: showLegend ? '#FAFAFA' : '#A1A1AA',
            border: showLegend ? '2px solid #E11D48' : '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <Eye size={20} />
        </button>

        <AnimatePresence>
          {showLegend && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95, transformOrigin: 'bottom left' }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="p-5 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] pointer-events-auto"
              style={{
                background: '#09090B',
                border: '1px solid rgba(255,255,255,0.1)',
                minWidth: '220px',
              }}
            >
              <div className="text-[11px] font-bold text-[#FAFAFA] mb-4 tracking-widest uppercase">
                Legenda Korelasi
              </div>
              <div className="flex flex-col gap-3">
                {LEGEND_ITEMS.map((item) => (
                  <div key={item.kind} className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ background: getEdgeColor(item.kind), boxShadow: `0 0 10px ${getEdgeColor(item.kind)}60` }}
                    />
                    <div className="min-w-0">
                      <div className="text-[11px] font-bold tracking-wide" style={{ color: '#FAFAFA' }}>
                        {item.label}
                      </div>
                      <div className="text-[10px] font-medium" style={{ color: '#71717A' }}>
                        {item.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
