import { create } from 'zustand';
import type { Evidence, BoardNode, BoardEdge } from '../types';

interface EvidenceState {
  inventory: Evidence[];
  boardNodes: BoardNode[];
  boardEdges: BoardEdge[];
  selectedNodeA: string | null;
  selectedNodeB: string | null;

  addToInventory: (evidence: Evidence) => void;
  addBoardNode: (node: BoardNode) => void;
  addBoardEdge: (edge: BoardEdge) => void;
  selectNode: (evidenceId: string) => void;
  clearSelection: () => void;
  resetBoard: () => void;
  resetAll: () => void;
  getEvidenceById: (id: string) => Evidence | undefined;
  isOnBoard: (evidenceId: string) => boolean;
  getEdgeBetween: (nodeA: string, nodeB: string) => BoardEdge | undefined;
}

export const useEvidenceStore = create<EvidenceState>((set, get) => ({
  inventory: [],
  boardNodes: [],
  boardEdges: [],
  selectedNodeA: null,
  selectedNodeB: null,

  addToInventory: (evidence) =>
    set((state) => {
      if (state.inventory.some((e) => e.id === evidence.id)) return state;
      return { inventory: [...state.inventory, evidence] };
    }),

  addBoardNode: (node) =>
    set((state) => {
      if (state.boardNodes.some((n) => n.evidenceId === node.evidenceId)) return state;
      return { boardNodes: [...state.boardNodes, node] };
    }),

  addBoardEdge: (edge) =>
    set((state) => {
      if (state.boardEdges.some((e) => e.id === edge.id)) return state;
      return { boardEdges: [...state.boardEdges, edge] };
    }),

  selectNode: (evidenceId) =>
    set((state) => {
      if (state.selectedNodeA === null) {
        return { selectedNodeA: evidenceId };
      }
      if (state.selectedNodeA === evidenceId) {
        return { selectedNodeA: null };
      }
      return { selectedNodeB: evidenceId };
    }),

  clearSelection: () => set({ selectedNodeA: null, selectedNodeB: null }),

  resetBoard: () =>
    set({
      boardNodes: [],
      boardEdges: [],
      selectedNodeA: null,
      selectedNodeB: null,
    }),

  resetAll: () =>
    set({
      inventory: [],
      boardNodes: [],
      boardEdges: [],
      selectedNodeA: null,
      selectedNodeB: null,
    }),

  getEvidenceById: (id) => get().inventory.find((e) => e.id === id),

  isOnBoard: (evidenceId) =>
    get().boardNodes.some((n) => n.evidenceId === evidenceId),

  getEdgeBetween: (nodeA, nodeB) =>
    get().boardEdges.find(
      (e) =>
        (e.sourceNodeId === nodeA && e.targetNodeId === nodeB) ||
        (e.sourceNodeId === nodeB && e.targetNodeId === nodeA),
    ),
}));
