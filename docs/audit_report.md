# 🔍 Audit Report — Sebelum Viral (Chapter 1)

## Summary: 6 Critical, 7 Medium, 2 Minor

---

## 🔴 CRITICAL — Must Fix

| # | Issue | File | Lines |
|---|-------|------|-------|
| 1 | **Duplicate Scene IDs**: `WAVE_2/3/4_ALERT` defined twice — second set is dead code | `scenes.ts` | 1043-1088 |
| 2 | **Dead code**: `WAVE_5_TIMEOUT` → `CH1_REFLECTION` (scene doesn't exist) + orphan | `scenes.ts` | 1091-1104 |
| 3 | **Missing Evidence def**: `INS_CH1_BINTANG_MOTIVE` not in `evidences.ts` | `scenes.ts` | 1039 |
| 4 | **Auto-advance missing `resetDialog()`** — race condition | `App.tsx` | 104-111 |
| 5 | **`hasSave` uses wrong ID** `'scene-1'` instead of `'CH1_S00'` | `App.tsx` | 194 |
| 6 | **`onBack` doesn't reset `currentSceneId`** to hub — save/load mismatch | `App.tsx` | 315 |

## 🟡 MEDIUM — Should Fix

| # | Issue | File | Lines |
|---|-------|------|-------|
| 7 | **5 orphaned Mading sub-scenes** (unreachable dead code) | `scenes.ts` | 813-886 |
| 8 | **Evidence `unlockSceneId` mismatches** in metadata | `evidences.ts` | 49,65,81,97 |
| 9 | **CH1_S02 presumes Aldi clarification** regardless of player choice | `scenes.ts` | 87 |
| 10 | **Confrontation scenes don't gate on evidence** | `scenes.ts` | 128-133 |
| 11 | **Leftover `AlertCircle` import + `'interrogate'` union type** | `ExplorationScreen.tsx` | 3, 16 |
| 12 | **LOC_BK_TALK still has a choice** (wasn't cleaned up) | `scenes.ts` | ~666 |
| 13 | **Best ending only via always-aggressive path** (design concern) | `editorials.ts` | — |

## 🟢 MINOR — Nice to Have

| # | Issue | File |
|---|-------|------|
| 14 | **Nala "aku"/"gue" register inconsistency** with Aldi | various |
| 15 | **Lala says "baru mulai" every time** regardless of progress | `scenes.ts:803` |

---

## ✅ Confirmed Working

- Evidence unlock chain: correct and sequential
- Location unlock chain: logical and correct
- `visitedSceneIds` tracking: works
- Screen transitions (exploration↔VN): works
- `INTEROGASI_SOFT` auto-advance with `choices: []`: works
- Confrontation → Decision screen routing: works (hardcoded in App.tsx)
