# MASTER.md — Kitab Utama Sebelum Viral

> Dokumen induk. Baca ini PERTAMA sebelum mulai kerja.
> Last updated: 2026-06-14

---

## APA INI

**Sebelum Viral** — game edukasi web-based buat lomba LIDM 2026 (ITDP). Visual novel naratif-investigatif. Pemain jadi reporter junior mading sekolah, selidiki rumor viral soal pemilihan ketua OSIS.

**Platform:** Web browser (mobile-first, landscape 16:9)
**Target:** Siswa SMA/SMK/MA kelas X-XI (usia 15-17)
**Bahasa:** Indonesia (Bahasa Indonesia)
**Tim:** 4 orang

---

## SEMUA DOCS

| # | File | Isi | Baca saat... |
|---|------|-----|-------------|
| 0 | **MASTER.md** (ini) | Instruksi utama, rules, flow | **SELALU BACA DULU** |
| 1 | ARCHITECTURE.md | Tech stack, folder, data flow | Setup awal, onboarding dev baru |
| 2 | GAME_DESIGN_DOC.md | Semua sistem game, mekanik | Mau paham game secara keseluruhan |
| 3 | DATA_SCHEMAS.md | TypeScript types + Zod schemas | Mau bikin/edit data atau engine |
| 4 | TASK_BREAKDOWN.md | 9 sprint, ~80 tasks | Mau tau harus ngapain |
| 5 | STYLE_GUIDE.md | Warna, font, component, animasi | Mau bikin UI components |
| 6 | CHARACTER_BIBLE.md | 11 karakter + relationship | Mau tulis dialog atau bikin sprite |
| 7 | ASSET_REQUIREMENTS.md | Sprites, BG, UI, evidence | Mau generate asset |
| 8 | AUDIO_REQUIREMENTS.md | BGM, SFX, TTS dialog | Mau generate audio |
| 9 | CHAPTER_1_CONTENT.md | Dialog & scene Chapter 1 | Mau implement content data |
| 10 | STATE_MACHINE.md | State, transisi, edge cases | Mau implement navigasi/logic |
| 11 | TESTING_STRATEGY.md | Unit, component, E2E tests | Mau nulis test |
| 12 | ASSET_LOADING.md | Loading phases, cache, fallback | Mau implement loading system |
| 13 | DECISIONS.md | Kenapa pilih X bukan Y | Mau tau reasoning di balik keputusan |
| 14 | CHANGELOG.md | Track progress | Mau tau apa yang udah dikerjain |

---

## TECH STACK (FINAL)

```
Vite 6 + React 18 + TypeScript 5 + Tailwind CSS 3
Zustand 5 (state) + Framer Motion 11 (animasi)
Howler.js 2 (audio) + Zod 3 (validasi)
localforage 1 (save) + Vitest 2 (testing)
+ clsx + tailwind-merge + lucide-react
```

---

## RULES — ANTI GAGAL

### Rule 1: Baca Doc Dulu
Sebelum nulis kode, baca doc yang relevan. Jangan nebak.

### Rule 2: Data-Driven
Semua konten cerita (dialog, evidence, rules) di `src/data/`. Jangan hardcode di component.

### Rule 3: Engine ≠ UI
Engines (`src/engines/`) adalah pure functions, gak boleh import React atau DOM. Logic terpisah dari UI.

### Rule 4: Validasi Data
Semua data divalidasi Zod di dev time. Kalau schema error, fix data-nya, bukan schema-nya.

### Rule 5: Test Dulu
Sebelum claim "selesai", jalankan test. Engine wajib punya test. Component minimal render tanpa error.

### Rule 6: Save Setiap Perubahan State
Auto-save trigger: scene transition, evidence unlock, board connection. Jangan sampai progress hilang.

### Rule 7: Fallback Semua
Audio gagal? Silent. Image gagal? Placeholder. TTS gagal? Web Speech API. Jangan crash.

### Rule 8: Mobile First
Semua UI harus touch-friendly. Min tap target: 48px. Test di layar kecil dulu.

### Rule 9: Bahasa Indonesia
Semua teks game dalam Bahasa Indonesia. Teks kode (variable, comment) dalam English.

### Rule 10: Jangan Over-Engineer
Buat yang dibutuhkan sekarang. Fitur post-MVP simpan di TASK_BREAKDOWN Phase 9.

---

## DEVELOPMENT FLOW

### Tahap 1: Foundation (Sprint 1-2)
```
Types → Schemas → Stores → Utils → Engines
```
1. Definisikan semua TypeScript types (`src/types/`)
2. Buat Zod schemas (`src/schemas/`)
3. Buat Zustand stores (`src/stores/`)
4. Buat utility functions (`src/utils/`)
5. Build core engines satu per satu (`src/engines/`)
6. Tulis unit test buat setiap engine

**Verifikasi:** `npm test` pass, TypeScript compiles tanpa error

### Tahap 2: Visual Novel (Sprint 3)
```
Background → Sprite → DialogBox → ChoicePanel → StoryScreen
```
1. Build Background component
2. Build CharacterSprite component
3. Build DialogBox dengan typewriter effect
4. Build ChoicePanel
5. Build StoryScreen yang menggabungkan semuanya
6. Build LandingScreen

**Verifikasi:** Buka landing → mulai → lihat dialog jalan, typewriter effect jalan

### Tahap 3: Evidence & Board (Sprint 4)
```
EvidenceCard → Inventory → BoardCanvas → Node → Edge → HubScreen
```
1. Build EvidenceCard component
2. Build EvidenceInventory
3. Build BoardCanvas (grid layout)
4. Build EvidenceNode + ConnectionEdge
5. Build HubScreen (navigasi ke board/inspection)
6. Build BoardScreen

**Verifikasi:** Buka board → lihat evidence nodes → tap dua node → lihat edge muncul

### Tahap 4: Inspection & Ending (Sprint 5)
```
InspectionScreen → ConfrontationScreen → DecisionScreen → ReflectionScreen
```
1. Build InspectionScreen
2. Build ConfrontationScreen dengan conditional dialog
3. Build DecisionScreen (4 pilihan editorial)
4. Build ReflectionScreen (outcome + learning summary)

**Verifikasi:** Full flow jalan dari landing sampai reflection

### Tahap 5: Content Data (Sprint 6)
```
scenes.ts → evidences.ts → rules.ts → claims.ts → confrontations.ts → editorials.ts → reflections.ts
```
1. Isi semua data Chapter 1 berdasarkan CHAPTER_1_CONTENT.md
2. Validasi dengan Zod
3. Test semua data entry

**Verifikasi:** Game playable dengan konten lengkap

### Tahap 6: Audio & Assets (Sprint 7)
```
Character sprites → Backgrounds → UI → Evidence visuals → BGM → SFX → TTS
```
1. Generate karakter sprites (subagent)
2. Generate backgrounds (subagent)
3. Generate UI elements (subagent)
4. Generate evidence visuals (subagent)
5. Source BGM dari DOVA-SYNDROME
6. Source SFX dari Freesound
7. Generate TTS dialog via Edge TTS
8. Integrasikan ke audioEngine

**Verifikasi:** Game jalan dengan visual dan audio lengkap

### Tahap 7: Polish (Sprint 8)
```
Settings → Save/Load → Loading → Responsive → Playtest
```
1. Build Settings screen
2. Implementasi auto-save + load
3. Implementasi loading states
4. Responsive testing
5. Cross-browser testing
6. Final playtest

**Verifikasi:** Game production-ready

---

## FLOW SUBAGENTS

### Cara Kerja Subagent
1. Aku (koordinator) spawn subagent dengan goal + context
2. Subagent kerja di context terisolasi
3. Subagent return summary hasil kerja
4. Aku verify hasilnya (baca file, jalankan test)
5. Kalau OK → lanjut. Kalau NGOK → retry atau fix manual

### Rencana Subagents

**Batch 1 — Content (parallel)**
| Agent | Task | Output |
|-------|------|--------|
| Content A | Dialog S00-S04 | chapter-1/scenes.ts (part 1) |
| Content B | Dialog S05-S09 | chapter-1/scenes.ts (part 2) |

**Batch 2 — Assets (parallel)**
| Agent | Task | Output |
|-------|------|--------|
| Asset A | Character sprites (11 × 3-4 ekspresi) | public/assets/characters/ |
| Asset B | Backgrounds (7 lokasi) + UI | public/assets/backgrounds/ + ui/ |
| Asset C | Evidence visuals (10 items) | public/assets/evidence/ |

**Batch 3 — Audio (parallel)**
| Agent | Task | Output |
|-------|------|--------|
| Audio A | BGM (3 tracks) + SFX (6 sounds) | public/assets/audio/ |
| Audio B | TTS dialog (~60 lines) | public/assets/audio/dialog/ |

**Batch 4 — Development (sequential)**
| Agent | Task | Output |
|-------|------|--------|
| Dev A | Core engines + stores | src/engines/ + src/stores/ |
| Dev B | UI components + screens | src/components/ |

**Batch 5 — QA**
| Agent | Task | Output |
|-------|------|--------|
| QA | Playtest + bug report | Bug list + fix suggestions |

### Context yang Harus Diberikan ke Subagent
Setiap subagent HARUS dapat:
1. Path ke doc yang relevan
2. Tech stack
3. Naming convention
4. Format output yang diharapkan
5. Constraint/rules dari MASTER.md ini

---

## CHECKLIST SEBELUM MULAI KERJA

- [ ] Baca MASTER.md (ini)
- [ ] Baca doc yang relevan dengan task
- [ ] Pastikan `npm install` sudah jalan
- [ ] Pastikan `npx tsc --noEmit` pass
- [ ] Pastikan `npm test` pass (kalau ada test)
- [ ] Cek TASK_BREAKDOWN.md untuk task berikutnya
- [ ] Cek CHANGELOG.md untuk progress terakhir

## CHECKLIST SEBELUM CLAIM "SELESAI"

- [ ] TypeScript compiles tanpa error
- [ ] Test pass (kalau ada test baru)
- [ ] UI render dengan benar di mobile landscape
- [ ] Audio jalan (atau fallback jalan)
- [ ] Save/load berfungsi
- [ ] Tidak ada console error
- [ ] Update CHANGELOG.md

---

## NAMING CONVENTIONS

```
File:     camelCase.ts (engine, store, util)
          PascalCase.tsx (component)
          kebab-case.md (docs)

Variable: camelCase
Type:     PascalCase
Constant: UPPER_SNAKE_CASE
Component: PascalCase

Evidence ID:  EV_CH1_001
Scene ID:     CH1_S01
Rule ID:      CH1_RULE_001
Choice ID:    CH1_C001
Insight ID:   INS_CH1_KEY_CONTRADICTION
Character ID: nala, lala, aldi, bintang, citra, rendra, pak_ardi, bu_sari, dimas, maya, reza

Asset naming:
  Background: bg_{location}.png (bg_corridor.png)
  Character:  {char}_{expression}.png (nala_neutral.png)
  Evidence:   ev_{id}.png (ev_ch1_002.png)
  UI:         ui_{element}.png (ui_dialog_frame.png)
  BGM:        bgm_{mood}.mp3 (bgm_investigation.mp3)
  SFX:        sfx_{action}.mp3 (sfx_click.mp3)
  Dialog:     CH1_SXX_DXXX.mp3 (CH1_S01_D001.mp3)
```

---

## FOLDER STRUCTURE (QUICK REFERENCE)

```
sebelum-viral/
├── docs/                    ← 15 docs (yang ini + 14 lainnya)
├── public/assets/           ← Static assets (images, audio)
├── src/
│   ├── data/chapter-1/      ← Story content (7 files)
│   ├── schemas/             ← Zod validation (3 files)
│   ├── types/               ← TypeScript types (3 files)
│   ├── engines/             ← Game logic (7 files)
│   ├── stores/              ← Zustand stores (4 files)
│   ├── components/          ← React components (~25 files)
│   ├── hooks/               ← Custom hooks (4 files)
│   ├── utils/               ← Helpers (3 files)
│   ├── App.tsx              ← Root component
│   ├── main.tsx             ← Entry point
│   └── index.css            ← Global styles
└── tests/                   ← Unit + E2E tests
```

---

## EMERGENCY PROCEDURES

### Kalau TypeScript Error
```bash
npx tsc --noEmit 2>&1 | head -20
```
Baca errornya, fix satu per satu. Jangan panic.

### Kalau Test Gagal
```bash
npm test 2>&1
```
Baca errornya. Biasanya: data salah, import salah, atau logic salah.

### Kalau Build Gagal
```bash
npm run build 2>&1
```
Biasanya TypeScript error. Fix dulu.

### Kalau Subagent Gagal
1. Baca summary-nya, cari tau gagal di mana
2. Retry dengan context yang lebih spesifik
3. Kalau masih gagal, kerjain manual

### Kalau Stuck / Bingung
1. Baca MASTER.md lagi
2. Baca doc yang relevan
3. Cek TASK_BREAKDOWN.md
4. Cek CHANGELOG.md untuk tau progress
5. Tanya user

---

## KONTAK & LINKS

- Project: `/mnt/d/project/sebelum-viral/`
- Docs: `/mnt/d/project/sebelum-viral/docs/`
- Source: `/mnt/d/project/sebelum-viral/src/`
- Assets: `/mnt/d/project/sebelum-viral/public/assets/`

---

> **Ingat: Lebih baik jalan pelan tapi pasti, daripada cepat tapi berantakan.**
> **Setiap step harus verified sebelum lanjut.**