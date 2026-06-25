# Architecture — Sebelum Viral

> Technical architecture document for the game "Sebelum Viral"
> Last updated: 2026-06-14

---

## 1. Tech Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| Build | **Vite** | 6.x | Fast HMR, static site bundler |
| UI Framework | **React** | 18.x | Component-based UI |
| Language | **TypeScript** | 5.x | Type safety |
| Styling | **Tailwind CSS** | 3.x | Utility-first CSS |
| State Management | **Zustand** | 5.x | Lightweight game state |
| Animation | **Framer Motion** | 11.x | Transitions, typewriter, effects |
| Audio | **Howler.js** | 2.x | BGM, SFX playback |
| Data Validation | **Zod** | 3.x | Schema validation for game data |
| Save System | **localforage** | 1.x | IndexedDB wrapper |
| Testing | **Vitest** | 2.x | Unit tests |
| E2E Testing | **Playwright** | 1.x | End-to-end tests |
| Linting | **ESLint + Prettier** | latest | Code quality |

---

## 2. Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Browser (Mobile/Desktop)              │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │   Screens   │  │  Components │  │   Overlays  │     │
│  │  (routing)  │  │  (reusable) │  │  (smartphone)│    │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘     │
│         │                │                │             │
│  ┌──────┴────────────────┴────────────────┴──────┐      │
│  │              Zustand Stores                   │      │
│  │  gameStore | evidenceStore | dialogStore |    │      │
│  │  settingsStore                                │      │
│  └──────────────────┬────────────────────────────┘      │
│                     │                                   │
│  ┌──────────────────┴────────────────────────────┐      │
│  │              Game Engines                      │      │
│  │  storyEngine | evidenceEngine | boardEngine |  │      │
│  │  inspectionEngine | outcomeEngine |            │      │
│  │  reflectionEngine | audioEngine | saveEngine   │      │
│  └──────────────────┬────────────────────────────┘      │
│                     │                                   │
│  ┌──────────────────┴────────────────────────────┐      │
│  │              Data Layer                        │      │
│  │  chapter-1/ (scenes, evidences, rules, etc.)  │      │
│  │  validated by Zod schemas                     │      │
│  └───────────────────────────────────────────────┘      │
│                                                         │
│  ┌───────────────────────────────────────────────┐      │
│  │              Static Assets                     │      │
│  │  characters/ | backgrounds/ | ui/ | evidence/ │      │
│  │  audio/bgm/ | audio/sfx/ | audio/dialog/     │      │
│  └───────────────────────────────────────────────┘      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 3. Data Flow

```
User Action → Screen Component → Zustand Store → Engine → Data Validation → UI Update
                                                    ↓
                                              Save to IndexedDB
```

1. **User taps** → Screen component handles event
2. **Store update** → Zustand store mutates state
3. **Engine logic** → Pure functions process game logic
4. **Validation** → Zod validates data integrity
5. **UI re-render** → React re-renders affected components
6. **Auto-save** → localforage persists to IndexedDB

---

## 4. Folder Structure

```
sebelum-viral/
├── docs/                          ← Project documentation
│   ├── ARCHITECTURE.md
│   ├── GAME_DESIGN_DOC.md
│   ├── DATA_SCHEMAS.md
│   ├── TASK_BREAKDOWN.md
│   ├── STYLE_GUIDE.md
│   ├── CHARACTER_BIBLE.md
│   ├── ASSET_REQUIREMENTS.md
│   └── AUDIO_REQUIREMENTS.md
│
├── public/
│   └── assets/
│       ├── characters/            ← Character sprites (PNG transparent)
│       │   ├── nala/
│       │   ├── lala/
│       │   ├── aldi/
│       │   └── .../
│       ├── backgrounds/           ← Scene backgrounds (1920x1080)
│       ├── ui/                    ← UI elements (buttons, frames)
│       ├── evidence/              ← Evidence visuals (screenshots, docs)
│       └── audio/
│           ├── bgm/               ← Background music (MP3)
│           ├── sfx/               ← Sound effects (MP3/WAV)
│           └── dialog/            ← TTS dialog audio (MP3)
│
├── src/
│   ├── data/                      ← ALL STORY CONTENT
│   │   ├── chapter-1/
│   │   │   ├── scenes.ts          ← Scene flow, dialog, choices
│   │   │   ├── evidences.ts       ← Evidence data + tags
│   │   │   ├── rules.ts           ← Contradiction rules
│   │   │   ├── claims.ts          ← Claim inspection rules
│   │   │   ├── confrontations.ts  ← NPC confrontation dialog
│   │   │   ├── editorials.ts      ← Editorial decision options
│   │   │   └── reflections.ts     ← Reflection text per outcome
│   │   └── index.ts               ← Export all chapters
│   │
│   ├── schemas/                   ← Zod validation schemas
│   │   ├── scene.schema.ts
│   │   ├── evidence.schema.ts
│   │   ├── rule.schema.ts
│   │   └── index.ts
│   │
│   ├── types/                     ← TypeScript type definitions
│   │   ├── game.ts
│   │   ├── evidence.ts
│   │   ├── scene.ts
│   │   └── index.ts
│   │
│   ├── engines/                   ← GAME LOGIC (no UI dependency)
│   │   ├── storyEngine.ts         ← Scene progression, choices
│   │   ├── evidenceEngine.ts      ← Inventory, unlock logic
│   │   ├── boardEngine.ts         ← Tag matching, contradictions
│   │   ├── inspectionEngine.ts    ← Claim-evidence evaluation
│   │   ├── outcomeEngine.ts       ← Editorial outcome calculation
│   │   ├── reflectionEngine.ts    ← Generate reflection text
│   │   ├── audioEngine.ts         ← BGM/SFX/TTS manager
│   │   └── saveEngine.ts          ← IndexedDB save/load
│   │
│   ├── stores/                    ← Zustand state stores
│   │   ├── gameStore.ts           ← Progress, scene, chapter
│   │   ├── evidenceStore.ts       ← Inventory, board connections
│   │   ├── dialogStore.ts         ← Current dialog, typewriter
│   │   └── settingsStore.ts       ← Volume, text speed, voice toggle
│   │
│   ├── components/
│   │   ├── screens/               ← Full-screen views
│   │   │   ├── LandingScreen.tsx
│   │   │   ├── StoryScreen.tsx
│   │   │   ├── HubScreen.tsx
│   │   │   ├── BoardScreen.tsx
│   │   │   ├── InspectionScreen.tsx
│   │   │   ├── ConfrontationScreen.tsx
│   │   │   ├── DecisionScreen.tsx
│   │   │   └── ReflectionScreen.tsx
│   │   ├── visual-novel/          ← VN components
│   │   │   ├── DialogBox.tsx
│   │   │   ├── CharacterSprite.tsx
│   │   │   ├── ChoicePanel.tsx
│   │   │   ├── Background.tsx
│   │   │   └── TransitionOverlay.tsx
│   │   ├── evidence/              ← Evidence UI
│   │   │   ├── EvidenceCard.tsx
│   │   │   ├── EvidenceInventory.tsx
│   │   │   └── EvidenceDetail.tsx
│   │   ├── board/                 ← Detective board
│   │   │   ├── BoardCanvas.tsx
│   │   │   ├── EvidenceNode.tsx
│   │   │   ├── ConnectionEdge.tsx
│   │   │   └── BoardHint.tsx
│   │   ├── smartphone/            ← HP overlay
│   │   │   ├── SmartphoneOverlay.tsx
│   │   │   ├── ChatBubble.tsx
│   │   │   └── SocialPost.tsx
│   │   └── ui/                    ← Reusable UI
│   │       ├── Button.tsx
│   │       ├── Modal.tsx
│   │       ├── ProgressBar.tsx
│   │       ├── LoadingSpinner.tsx
│   │       └── AudioToggle.tsx
│   │
│   ├── hooks/                     ← Custom React hooks
│   │   ├── useAudio.ts
│   │   ├── useSave.ts
│   │   ├── useDialog.ts
│   │   └── useTypewriter.ts
│   │
│   ├── utils/                     ← Helpers
│   │   ├── cn.ts                  ← className merge (clsx + twMerge)
│   │   ├── format.ts              ← Text formatting
│   │   └── random.ts              ← Random helpers
│   │
│   ├── App.tsx                    ← Root component, screen routing
│   ├── main.tsx                   ← Entry point
│   └── index.css                  ← Global styles, Tailwind imports
│
├── tests/
│   ├── engines/                   ← Engine unit tests
│   ├── components/                ← Component tests
│   └── e2e/                       ← Playwright E2E tests
│
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── vitest.config.ts
└── README.md
```

---

## 5. Screen Flow (Navigation)

```
LandingScreen
    ↓ (New Game / Continue)
StoryScreen
    ↓ (scene progression, S00 → S05)
HubScreen (Investigation Hub)
    ├── BoardScreen (Detective Board)
    │       ├── EvidenceNode tap → EvidenceDetail
    │       └── Connect two nodes → ConnectionEdge + feedback
    ├── InspectionScreen (Claim-Evidence)
    │       └── Select evidence → evaluate → unlock confrontation
    └── (continue story)
StoryScreen (S07 - Confrontation)
    ↓
ConfrontationScreen
    ↓
DecisionScreen (Editorial Decision)
    ↓
ReflectionScreen
    ↓ (Restart / Next Chapter)
LandingScreen
```

---

## 6. State Architecture

### gameStore
```typescript
interface GameState {
  currentSceneId: string;
  currentChapter: string;
  collectedEvidenceIds: string[];
  foundInsightIds: string[];
  choices: string[];
  confrontedNpcs: string[];
  screen: Screen;
  isPlaying: boolean;
}
```

### evidenceStore
```typescript
interface EvidenceState {
  inventory: Evidence[];
  boardNodes: BoardNode[];
  boardEdges: BoardEdge[];
  selectedNodeA: string | null;
  selectedNodeB: string | null;
}
```

### dialogStore
```typescript
interface DialogState {
  currentLine: DialogueLine | null;
  isTyping: boolean;
  isComplete: boolean;
  dialogQueue: DialogueLine[];
}
```

### settingsStore
```typescript
interface SettingsState {
  textSpeed: 'slow' | 'normal' | 'fast';
  bgmVolume: number; // 0-1
  sfxVolume: number; // 0-1
  voiceEnabled: boolean;
  voiceVolume: number; // 0-1
  autoPlay: boolean;
}
```

---

## 7. Key Design Decisions

| Decision | Choice | Reason |
|----------|--------|--------|
| Custom vs Framework VN | Custom React | Need evidence board + inspection, not pure VN |
| Detective board UX | Grid-based tap-to-connect | Mobile-friendly, no drag-drop |
| State management | Zustand (not Context) | Better performance for frequent game state updates |
| Save system | IndexedDB via localforage | Works offline, no backend needed |
| TTS approach | Pre-generated Edge TTS MP3 | Consistent quality, free, no API calls at runtime |
| Audio | Howler.js | Cross-browser, fade/loop support |
| Validation | Zod schemas | Catch data errors at dev time |
| Routing | State-based (not React Router) | Simpler, game-like navigation |

---

## 8. Dependencies

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "zustand": "^5.0.2",
    "framer-motion": "^11.0.0",
    "howler": "^2.2.4",
    "localforage": "^1.10.0",
    "zod": "^3.24.1",
    "lucide-react": "^0.468.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.0.0"
  },
  "devDependencies": {
    "typescript": "^5.7.2",
    "vite": "^6.0.5",
    "@vitejs/plugin-react-swc": "^3.7.1",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "vitest": "^2.1.8",
    "@testing-library/react": "^16.1.0",
    "@testing-library/jest-dom": "^6.6.3",
    "playwright": "^1.40.0",
    "eslint": "^9.0.0",
    "prettier": "^3.0.0",
    "@types/react": "^18.3.18",
    "@types/react-dom": "^18.3.5",
    "@types/howler": "^2.2.12"
  }
}
```

---

## 9. Build & Development

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Lint
npm run lint

# Format
npm run format
```

---

## 10. Deployment (Future)

Options:
- **Vercel** — zero config, free tier, instant deploy
- **Netlify** — similar to Vercel, good free tier
- **GitHub Pages** — free, simple, but no server-side features

All options work since the game is a static site (no backend).
