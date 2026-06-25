# Testing Strategy — Sebelum Viral

**Game:** Educational detective visual novel
**Stack:** React + TypeScript + Vitest (unit/component) + Playwright (E2E)
**Last updated:** 2026-06-14

---

## 1. Unit Tests (Vitest)

All engines live under `src/engine/`. Each engine file gets a co-located test file (`*.test.ts`).

### 1.1 storyEngine (`src/engine/storyEngine.test.ts`)

| # | Test case | Assertion |
|---|-----------|-----------|
| 1 | `advanceScene → returns next scene by id` | Scene id matches expected |
| 2 | `advanceScene → returns null for unknown scene id` | Returns null / throws |
| 3 | `collectEvidence → adds evidence to state.evidence[]` | Array length increases, item present |
| 4 | `collectEvidence → does not duplicate if already collected` | Array length unchanged |
| 5 | `recordChoice → stores choice in state.choices` | Key-value pair present |
| 6 | `recordChoice → overwrites previous choice for same node` | Latest value wins |
| 7 | `handleMissingScene → falls back gracefully` | Returns fallback scene or error state |

### 1.2 evidenceEngine (`src/engine/evidenceEngine.test.ts`)

| # | Test case | Assertion |
|---|-----------|-----------|
| 1 | `addToInventory → adds new evidence item` | Item present in inventory |
| 2 | `addToInventory → prevents duplicate insertion` | Inventory length unchanged |
| 3 | `checkUnlockCondition → returns true when prereqs met` | Boolean true |
| 4 | `checkUnlockCondition → returns false when prereqs missing` | Boolean false |

### 1.3 boardEngine (`src/engine/boardEngine.test.ts`)

| # | Test case | Assertion |
|---|-----------|-----------|
| 1 | `matchTags → returns true for matching tag pair` | Boolean true |
| 2 | `matchTags → returns false for non-matching tags` | Boolean false |
| 3 | `detectContradiction → identifies conflicting evidence pair` | Returns contradiction object |
| 4 | `detectContradiction → returns null for compatible pair` | Null |
| 5 | `detectCorrelation → identifies supporting evidence pair` | Returns correlation object |
| 6 | `detectCorrelation → returns null for unrelated pair` | Null |
| 7 | `evaluateEdge → handles no-rule pair gracefully` | Returns empty / default |
| 8 | `evaluateEdge → handles reversed pair (B→A same as A→B)` | Same result regardless of order |

### 1.4 inspectionEngine (`src/engine/inspectionEngine.test.ts`)

| # | Test case | Assertion |
|---|-----------|-----------|
| 1 | `evaluate → returns insight when claim matches found evidence` | Insight object returned |
| 2 | `evaluate → returns null when no matching evidence` | Null |
| 3 | `unlockConfrontation → enables confrontation when threshold met` | State flag is true |
| 4 | `unlockConfrontation → keeps confrontation locked below threshold` | State flag is false |

### 1.5 outcomeEngine (`src/engine/outcomeEngine.test.ts`)

| # | Test case | Assertion |
|---|-----------|-----------|
| 1 | `calculateOutcome → "strong" when contradiction + confrontation + clarify present` | Tier = "strong" |
| 2 | `calculateOutcome → "partial" when no contradiction found` | Tier = "partial" |
| 3 | `calculateOutcome → "failure" when player chose publish-fast path` | Tier = "failure" |
| 4 | `calculateOutcome → "failure" when wrong confrontation target` | Tier = "failure" |

### 1.6 reflectionEngine (`src/engine/reflectionEngine.test.ts`)

| # | Test case | Assertion |
|---|-----------|-----------|
| 1 | `generateSummary → returns strong-tier reflection text` | Non-empty string, contains key phrases |
| 2 | `generateSummary → returns partial-tier reflection text` | Non-empty string, differs from strong |
| 3 | `generateSummary → returns failure-tier reflection text` | Non-empty string, differs from above |

### 1.7 saveEngine (`src/engine/saveEngine.test.ts`)

| # | Test case | Assertion |
|---|-----------|-----------|
| 1 | `save → writes state to localStorage` | Read-back matches input |
| 2 | `load → restores saved state` | Deep-equal to original |
| 3 | `load → returns default state when no save exists` | Default state shape |
| 4 | `load → handles corrupt JSON gracefully` | Returns default, no throw |
| 5 | `load → handles missing fields in saved data` | Fills defaults for missing keys |

---

## 2. Component Tests (Vitest + @testing-library/react)

Components live under `src/components/`. Each gets a co-located `*.test.tsx`.

### 2.1 DialogBox

| # | Test case | Assertion |
|---|-----------|-----------|
| 1 | `renders character text inside dialog` | `getByText(text)` found |
| 2 | `shows speaker name label` | Speaker element visible |
| 3 | `fires onClick / onNext when tapped` | Callback called once |

### 2.2 ChoicePanel

| # | Test case | Assertion |
|---|-----------|-----------|
| 1 | `renders all choice options` | Correct button count |
| 2 | `fires onSelect with correct choice id on click` | Callback arg matches |
| 3 | `disables choices after selection` | Buttons become disabled |

### 2.3 EvidenceCard

| # | Test case | Assertion |
|---|-----------|-----------|
| 1 | `renders evidence title and description` | Text nodes present |
| 2 | `shows credibility badge with correct value` | Badge text matches |

### 2.4 BoardNode

| # | Test case | Assertion |
|---|-----------|-----------|
| 1 | `renders node label` | Text present |
| 2 | `applies selected style when selected` | CSS class / attribute set |
| 3 | `fires onSelect when clicked` | Callback called |

### 2.5 LandingScreen

| # | Test case | Assertion |
|---|-----------|-----------|
| 1 | `shows start new game button` | Button visible |
| 2 | `shows continue button when save data exists` | Continue button visible |
| 3 | `hides continue button when no save data` | Continue button absent |

---

## 3. E2E Tests (Playwright)

Spec files under `tests/e2e/`. Use Playwright test runner.

### 3.1 Full Chapter 1 Flow (`chapter1.spec.ts`)

```
test: complete chapter 1 from landing to reflection
  Steps:
  1. Navigate to /
  2. Click "Mulai" (start)
  3. Play through story scenes, making choices
  4. Arrive at hub, open papan bukti (board)
  5. Connect valid evidence pair → success feedback
  6. Open inspeksi (inspection) → evaluate claims
  7. Confront NPC with evidence
  8. Make editorial decision (terbitkan / selidiki lagi)
  9. Reach reflection screen → verify tier displayed
```

### 3.2 Save/Load Flow (`saveLoad.spec.ts`)

```
test: save mid-game and resume after refresh
  Steps:
  1. Start new game, play 3-4 scenes
  2. Trigger auto-save (or manual save)
  3. Refresh the page
  4. Click "Lanjutkan" (continue)
  5. Verify resumed at correct scene with correct state
```

### 3.3 Board Interaction (`boardInteraction.spec.ts`)

```
test: connect valid pair shows success
  - Drag/connect two compatible evidence nodes
  - Assert success indicator appears

test: connect invalid pair shows failure
  - Drag/connect two incompatible evidence nodes
  - Assert failure/no-match indicator appears

test: find contradiction through correct pairing
  - Connect the contradiction pair
  - Assert contradiction badge appears on edge
```

### 3.4 Choice Impact (`choiceImpact.spec.ts`）

```
test: different choices lead to different outcomes
  Run 1: always choose cautious options → partial or strong tier
  Run 2: always choose publish-fast → failure tier
  Assert reflection text differs between runs
```

---

## 4. Coverage Targets

| Layer | Metric | Target |
|-------|--------|--------|
| Engine (`src/engine/`) | Line coverage | >= 90% |
| Components (`src/components/`) | Line coverage | >= 70% |
| E2E | Critical paths | All paths in §3 covered |

Enforce via `vitest.config.ts`:

```ts
coverage: {
  provider: 'v8',
  thresholds: {
    'src/engine/**': { lines: 90 },
    'src/components/**': { lines: 70 },
  },
},
```

---

## 5. Test Data & Fixtures

### 5.1 Mock Chapter Data (unit tests)

Location: `src/__fixtures__/`

| File | Contents |
|------|----------|
| `mockChapter.ts` | 3 scenes, 2 choices, 2 evidence items — minimal chapter for engine tests |
| `mockEvidence.ts` | 5 evidence objects with varied tags for board/inspection tests |
| `mockBoardRules.ts` | 3 rules: 1 contradiction, 1 correlation, 1 neutral |
| `mockSaveState.ts` | Pre-built game state at various progress points |

### 5.2 E2E Fixtures

Location: `tests/fixtures/`

| File | Contents |
|------|----------|
| `chapter1-data.json` | Full Chapter 1 story data (or reference to production data) |
| `save-state-midgame.json` | Serialized save state halfway through Chapter 1 |

---

## 6. CI Integration

- **On every PR:** `vitest run --coverage` must pass thresholds.
- **On merge to main:** Playwright E2E suite runs against preview deployment.
- **Fail fast:** Any engine test failure blocks merge.

---

## 7. Test Naming Convention

```
<engineOrComponent> → <functionOrBehavior> → <expected result>
```

Examples:
- `storyEngine → advanceScene → returns next scene`
- `BoardNode → renders selected state → applies active class`
- `chapter1 → full flow → reaches reflection screen`
