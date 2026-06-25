# State Machine: Sebelum Viral

Educational detective visual novel — React + TypeScript

---

## 1. All States

| State         | Description                                                      |
|---------------|------------------------------------------------------------------|
| `landing`     | Title screen. Start new game or continue from save.              |
| `story`       | Visual novel mode. Dialog, narration, player choices.            |
| `hub`         | Investigation hub. Navigate to board, inspection, or continue.   |
| `board`       | Detective board. Drag/drop evidence, draw connections.           |
| `inspection`  | Claim-evidence evaluation. Review and test evidence pairs.       |
| `confrontation`| NPC dialog driven by collected evidence.                        |
| `decision`    | Editorial decision. Player picks one of 4 publish options.       |
| `reflection`  | Outcome reveal + learning summary + media-literacy takeaway.     |

---

## 2. ASCII State Diagram

```
                          ┌──────────────────────────────────┐
                          │            landing               │
                          │  [New Game]  [Continue]  [Exit]  │
                          └──────┬───────────┬───────────────┘
                      New Game   │           │ Continue
                                 ▼           ▼
                          ┌────────────┐  ┌─────────────┐
                          │   story    │  │ saved_state  │
                          │ S00→S05    │  │ (restore)    │
                          │ (linear)   │  └──────┬───────┘
                          └─────┬──────┘         │
                   scene=S06    │                │
                   ┌────────────┘                │
                   ▼                              ▼
                          ┌──────────────────────────────────┐
                          │              hub                 │
                          │  [Board] [Inspection] [Continue] │
                          └──┬─────────┬──────────┬──────────┘
                             │         │          │
                  click      │         │ click    │ click
                  Board      │         │ Inspect  │ Continue
                             ▼         ▼          ▼
                      ┌─────────┐ ┌────────────┐  ┌─────────┐
                      │  board  │ │ inspection │  │  story  │
                      │         │ │            │  │  S06+   │
                      └────┬────┘ └─────┬──────┘  └────┬────┘
                           │            │              │
                      back │    unlock  │  scene=S07   │
                           │            ▼              ▼
                           │     ┌────────────────────────┐
                           │     │     confrontation      │
                           │     └───────────┬────────────┘
                           │            complete
                           │                 ▼
                           │     ┌────────────────────────┐
                           │     │       decision         │
                           │     │  4 publish options     │
                           │     └───────────┬────────────┘
                           │            calculated
                           │                 ▼
                           │     ┌────────────────────────┐
                           │     │      reflection        │
                           │     │  outcome + learning    │
                           │     └───────────┬────────────┘
                           │            restart
                           │                 ▼
                           │           ┌──────────┐
                           └──────────►│ landing  │
                                       └──────────┘
```

---

## 3. Transition Table

| # | From           | To             | Trigger / Condition                                  |
|---|----------------|----------------|------------------------------------------------------|
| 1 | `landing`      | `story`        | User clicks **New Game**                             |
| 2 | `landing`      | saved screen   | User clicks **Continue** (loads save data)           |
| 3 | `story`        | `hub`          | Scene reaches `CH1_S06` (board tutorial unlocked)    |
| 4 | `story`        | `confrontation`| Scene reaches `CH1_S07`                              |
| 5 | `story`        | `decision`     | Scene reaches `CH1_S08`                              |
| 6 | `story`        | `reflection`   | Scene reaches `CH1_S09`                              |
| 7 | `hub`          | `board`        | User clicks **Board** tile                           |
| 8 | `hub`          | `inspection`   | User clicks **Inspection** tile                      |
| 9 | `hub`          | `story`        | User clicks **Continue Story**                       |
|10 | `board`        | `hub`          | User clicks **Back**                                 |
|11 | `board`        | `inspection`   | User selects evidence pair that unlocks a claim      |
|12 | `inspection`   | `board`        | User clicks **Back**                                 |
|13 | `inspection`   | `confrontation`| Confrontation threshold met (key evidence found)     |
|14 | `confrontation`| `decision`     | All confrontation dialog branches exhausted          |
|15 | `decision`     | `reflection`   | Outcome calculated from player's editorial choice    |
|16 | `reflection`   | `landing`      | User clicks **Restart** / **Main Menu**              |

---

## 4. Edge Cases

| # | Scenario                                    | Behaviour                                                        |
|---|---------------------------------------------|------------------------------------------------------------------|
| 1 | Player refreshes mid-scene                  | Auto-save restores to **last scene start** (not mid-dialog)      |
| 2 | Player taps same evidence twice on board    | Deselect second tap; show brief "already selected" feedback       |
| 3 | Player connects unrelated evidence          | Draw grey dashed edge labelled **"Tidak Relevan"**; no score     |
| 4 | Player confronts without key evidence       | Weaker dialog path plays; partial outcome in reflection           |
| 5 | Player backs from board to hub              | Board state (positions, connections) fully preserved              |
| 6 | Audio fails to load                         | Fallback to Web Speech API; if that fails, silent mode + subs    |
| 7 | Save data corrupted                         | Show reset prompt; keep backup of corrupted save for recovery    |
| 8 | Player skips all dialog                     | Game proceeds normally; reflection tags playthrough as "rushed"   |
| 9 | Asset (image/audio) fails to load           | Show placeholder sprite/blank; game continues without crash      |
|10 | Player opens Continue with no save          | Button disabled or shows "Tidak ada save" toast                  |

---

## 5. Save State

### Auto-Save Triggers

- Scene transition (any `→ story` or `→ hub` etc.)
- Evidence unlock on the board
- New board connection created
- Confrontation outcome recorded

### Save Data Schema (v1)

```typescript
interface SaveData {
  version: 1;                          // schema version for migration
  screen: GameState;                   // current state machine screen
  progress: {
    currentScene: string;              // e.g. "CH1_S04"
    completedScenes: string[];         // all visited scene IDs
    chapter: number;                   // current chapter (1-based)
  };
  boardState: {
    evidence: EvidenceNode[];          // unlocked evidence items
    connections: Connection[];         // player-drawn edges
    positions: Record<string, { x: number; y: number }>;
  };
  confrontations: {
    npcId: string;
    evidenceUsed: string[];
    dialogPath: string;
    outcome: "strong" | "weak" | "partial";
  }[];
  decisions: {
    editorialChoice: number | null;    // 0-3, null if not yet chosen
  };
  settings: {
    textSpeed: "slow" | "medium" | "fast";
    audioEnabled: boolean;
    language: "id";                    // Indonesian
  };
  timestamp: number;                   // Unix ms of last save
}
```

### Backup Strategy

- Keep **last 2 saves** in localStorage keys `save_slot_0` and `save_slot_1`.
- On each auto-save: rotate slot 0 → slot 1, write new data to slot 0.
- On corruption: attempt slot 1 fallback before prompting reset.

### Migration

- `version` field enables future schema upgrades.
- Migration functions: `migrateV1toV2(data: SaveV1): SaveV2`, etc.
- Unknown version → prompt player to reset (cannot safely downgrade).

---

## 6. Loop Patterns

### Free Roam (Hub ↔ Board ↔ Inspection)

```
   hub ◄──────────────► board
    │                    │
    │                    ▼
    └────────────► inspection
                   ▲     │
                   └─────┘
```

- Unlimited traversal; all state persists across visits.
- Board evidence and connections survive hub round-trips.
- Inspection evaluations persist; re-opening shows previous results.

### Linear Story (No Back Navigation)

```
   S00 → S01 → S02 → S03 → S04 → S05 → S06 → S07 → S08 → S09
```

- Forward only; no "back" button within story scenes.
- Player can pause (auto-save) and resume later.
- Skipping ahead is not possible; scenes unlock sequentially.

### Endgame (Reflection → Restart)

```
   reflection → landing → (new game)
```

- After reflection, only options are **Restart** or **Exit**.
- No returning to hub, board, or story after reflection.
- Starting a new game clears current save (with confirmation).

---

## 7. State Machine Constants (TypeScript Reference)

```typescript
type GameState =
  | "landing"
  | "story"
  | "hub"
  | "board"
  | "inspection"
  | "confrontation"
  | "decision"
  | "reflection";

interface Transition {
  from: GameState;
  to: GameState;
  trigger: string;
  condition?: () => boolean;
}

const TRANSITIONS: Transition[] = [
  { from: "landing",       to: "story",          trigger: "NEW_GAME" },
  { from: "landing",       to: "story",          trigger: "CONTINUE",       condition: () => hasSaveData() },
  { from: "story",         to: "hub",            trigger: "SCENE_REACHED",  condition: () => currentScene === "CH1_S06" },
  { from: "story",         to: "confrontation",  trigger: "SCENE_REACHED",  condition: () => currentScene === "CH1_S07" },
  { from: "story",         to: "decision",       trigger: "SCENE_REACHED",  condition: () => currentScene === "CH1_S08" },
  { from: "story",         to: "reflection",     trigger: "SCENE_REACHED",  condition: () => currentScene === "CH1_S09" },
  { from: "hub",           to: "board",          trigger: "CLICK_BOARD" },
  { from: "hub",           to: "inspection",     trigger: "CLICK_INSPECTION" },
  { from: "hub",           to: "story",          trigger: "CONTINUE_STORY" },
  { from: "board",         to: "hub",            trigger: "BACK" },
  { from: "board",         to: "inspection",     trigger: "UNLOCK_CLAIM",   condition: () => selectedPairUnlocksClaim() },
  { from: "inspection",    to: "board",          trigger: "BACK" },
  { from: "inspection",    to: "confrontation",  trigger: "CONFRONT_READY", condition: () => keyEvidenceFound() },
  { from: "confrontation", to: "decision",       trigger: "CONFRONT_DONE" },
  { from: "decision",      to: "reflection",     trigger: "OUTCOME_CALC" },
  { from: "reflection",    to: "landing",        trigger: "RESTART" },
];
```
