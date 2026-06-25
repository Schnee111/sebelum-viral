# Sebelum Viral

> Game edukasi naratif-investigatif untuk melatih literasi digital dan berpikir kritis siswa Indonesia.

**LIDM 2026 — Divisi ITDP**

---

## Tentang

**Sebelum Viral** adalah game visual novel berbasis web di mana pemain berperan sebagai reporter junior mading sekolah yang menyelidiki rumor viral selama pemilihan ketua OSIS. Pemain mengumpulkan bukti, menghubungkan bukti di detective board, menemukan kontradiksi, mengonfrontasi NPC, dan mengambil keputusan editorial.

**Platform:** Web browser (mobile-first, landscape 16:9)
**Target:** Siswa SMA/SMK/MA kelas X-XI
**Genre:** Visual novel × detective investigation

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Build | Vite 6 |
| UI | React 18 + TypeScript 5 |
| Styling | Tailwind CSS 3 |
| State | Zustand 5 |
| Animation | Framer Motion 11 |
| Audio | Howler.js 2 |
| Validation | Zod 3 |
| Save | localforage 1 |
| Test | Vitest 2 + Playwright |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

---

## Project Structure

```
sebelum-viral/
├── docs/                    ← Project documentation
├── public/assets/           ← Sprites, backgrounds, audio
├── src/
│   ├── data/                ← Story content (scenes, evidences, rules)
│   ├── schemas/             ← Zod validation schemas
│   ├── types/               ← TypeScript type definitions
│   ├── engines/             ← Game logic (no UI dependency)
│   ├── stores/              ← Zustand state stores
│   ├── components/          ← React UI components
│   │   ├── screens/         ← Full-screen views
│   │   ├── visual-novel/    ← VN components (dialog, sprites)
│   │   ├── evidence/        ← Evidence UI
│   │   ├── board/           ← Detective board
│   │   ├── smartphone/      ← Phone overlay
│   │   └── ui/              ← Reusable UI
│   ├── hooks/               ← Custom React hooks
│   └── utils/               ← Helper functions
└── tests/                   ← Unit & E2E tests
```

---

## Documentation

| Doc | Description |
|-----|-------------|
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | Tech stack, folder structure, data flow |
| [GAME_DESIGN_DOC.md](docs/GAME_DESIGN_DOC.md) | Game systems, mechanics, Chapter 1 spec |
| [DATA_SCHEMAS.md](docs/DATA_SCHEMAS.md) | TypeScript types & Zod schemas |
| [TASK_BREAKDOWN.md](docs/TASK_BREAKDOWN.md) | Sprint planning & task list |
| [STYLE_GUIDE.md](docs/STYLE_GUIDE.md) | Colors, typography, components, animations |
| [CHARACTER_BIBLE.md](docs/CHARACTER_BIBLE.md) | Character profiles, relationships, dialog style |
| [ASSET_REQUIREMENTS.md](docs/ASSET_REQUIREMENTS.md) | Sprites, backgrounds, UI assets |
| [AUDIO_REQUIREMENTS.md](docs/AUDIO_REQUIREMENTS.md) | BGM, SFX, TTS dialog |
| [CHAPTER_1_CONTENT.md](docs/CHAPTER_1_CONTENT.md) | Complete Chapter 1 dialog & scenes |

---

## Tim

| Role | Responsibility |
|------|---------------|
| Lead Dev | Architecture, engines, core components |
| Content Dev | Dialog, narrative, data files |
| Asset Creator | Sprites, backgrounds, UI, evidence visuals |
| Audio/SFX | BGM, SFX, TTS generation |

---

## License

TBD — untuk keperluan LIDM 2026.
