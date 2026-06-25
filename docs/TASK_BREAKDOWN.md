# TASK BREAKDOWN — Sebelum Viral

> Educational Detective Visual Novel | Team of 4 | Target: LIDM 2026
> Tech: Vite + React + TypeScript + Tailwind + Zustand + Framer Motion + Howler.js + Zod + localforage

---

## Team Roles

| Role | Abbrev | Responsibilities |
|------|--------|-----------------|
| Lead Dev | **DEV** | Architecture, engines, core components, integration |
| Content Dev | **CTN** | Dialog, narrative, data files, story design |
| Asset Creator | **ART** | Sprites, backgrounds, UI graphics, evidence visuals |
| Audio/SFX | **AUD** | BGM, SFX, TTS generation, audio integration |

## Priority Legend

- **P0** — Blocker. Must be done before anything else can proceed.
- **P1** — Core feature. Required for MVP.
- **P2** — Nice-to-have. Polish or stretch goals.

## Effort Legend

- **S** — ~2–4 hours (half a day)
- **M** — ~1 day (6–8 hours)
- **L** — ~2–3 days
- **XL** — ~4–5 days (full week)

---

## PHASE 1: FOUNDATION (Sprint 1)

> Goal: Bootable project with full toolchain, types, stores, and folder structure.

| ID | Task | Priority | Effort | Deps | Role |
|----|------|----------|--------|------|------|
| F-01 | Scaffold Vite + React + TypeScript project | P0 | S | — | DEV |
| F-02 | Install dependencies: zustand, framer-motion, howler, zod, localforage, lucide-react, clsx, tailwind-merge | P0 | S | F-01 | DEV |
| F-03 | Configure Tailwind: custom dark navy palette, font families, extend theme | P0 | M | F-02 | DEV |
| F-04 | Setup ESLint + Prettier with shared config | P1 | S | F-01 | DEV |
| F-05 | Setup Vitest + React Testing Library | P1 | S | F-02 | DEV |
| F-06 | Create folder structure: `data/chapter-1`, `schemas`, `types`, `engines`, `stores`, `components`, `hooks`, `utils`, `assets` | P0 | S | F-01 | DEV |
| F-07 | Define all TypeScript types (Scene, Evidence, DialogLine, Choice, Connection, BoardState, GameState, etc.) | P0 | M | F-06 | DEV |
| F-08 | Create Zod schemas matching all types for runtime validation | P1 | M | F-07 | DEV |
| F-09 | Setup Zustand stores: `useGameStore`, `useEvidenceStore`, `useDialogStore`, `useSettingsStore` | P0 | L | F-07 | DEV |
| F-10 | Create utility: `cn.ts` (clsx + tailwind-merge wrapper) | P1 | S | F-02 | DEV |
| F-11 | Create utility: `format.ts` (date/time/text formatters) | P2 | S | F-07 | DEV |
| F-12 | Setup global CSS: @font-face declarations, base resets, scrollbar styling | P1 | S | F-03 | DEV |
| F-13 | Create basic `App.tsx` with screen routing (useState-based screen switcher) | P0 | M | F-09 | DEV |
| F-14 | Verify full build + dev server runs clean | P0 | S | F-13 | DEV |

---

## PHASE 2: CORE ENGINES (Sprint 2)

> Goal: All game logic engines built and unit-tested, decoupled from UI.

| ID | Task | Priority | Effort | Deps | Role |
|----|------|----------|--------|------|------|
| E-01 | Build `storyEngine.ts` — scene progression, choice handling, trigger evaluation | P0 | L | F-07, F-09 | DEV |
| E-02 | Build `evidenceEngine.ts` — inventory add/remove, unlock logic, collection tracking | P0 | M | F-07, F-09 | DEV |
| E-03 | Build `boardEngine.ts` — tag matching, contradiction detection, edge evaluation, win condition | P0 | L | E-01, E-02 | DEV |
| E-04 | Build `inspectionEngine.ts` — claim-evidence evaluation, scoring | P1 | M | E-02 | DEV |
| E-05 | Build `outcomeEngine.ts` — editorial outcome calculation (4 tiers) | P1 | M | E-03, E-04 | DEV |
| E-06 | Build `reflectionEngine.ts` — generate reflection text based on tier + decisions | P1 | S | E-05 | DEV |
| E-07 | Build `saveEngine.ts` — IndexedDB save/load/reset via localforage | P1 | M | F-09 | DEV |
| E-08 | Build `audioEngine.ts` — BGM/SFX/TTS playback, volume control, crossfade via Howler.js | P1 | M | F-02 | DEV |
| E-09 | Write unit tests for storyEngine | P1 | M | E-01 | DEV |
| E-10 | Write unit tests for evidenceEngine | P1 | S | E-02 | DEV |
| E-11 | Write unit tests for boardEngine | P1 | M | E-03 | DEV |
| E-12 | Write unit tests for inspectionEngine | P1 | S | E-04 | DEV |
| E-13 | Write unit tests for outcomeEngine | P1 | S | E-05 | DEV |
| E-14 | Write unit tests for saveEngine | P2 | S | E-07 | DEV |
| E-15 | Write unit tests for audioEngine (mock Howler) | P2 | S | E-08 | DEV |

---

## PHASE 3: VISUAL NOVEL COMPONENTS (Sprint 3)

> Goal: Fully playable visual novel screen with dialog, characters, choices, and transitions.

| ID | Task | Priority | Effort | Deps | Role |
|----|------|----------|--------|------|------|
| V-01 | Build `<Background>` component — image display, crossfade transitions via Framer Motion | P0 | M | F-03, F-09 | DEV |
| V-02 | Build `<CharacterSprite>` component — positioning (left/center/right), expression swap, entrance/exit animation | P0 | L | V-01 | DEV |
| V-03 | Build `<DialogBox>` component — typewriter effect, speaker name label, tap-to-continue, skip button | P0 | L | F-03, F-09 | DEV |
| V-04 | Build `<ChoicePanel>` component — staggered entrance animation, selection feedback, hover states | P0 | M | F-03 | DEV |
| V-05 | Build `<TransitionOverlay>` component — fade-to-black, slide transitions, used between scenes | P1 | M | F-03 | DEV |
| V-06 | Build `<StoryScreen>` — orchestrates Background + Characters + DialogBox + Choices + Transitions | P0 | L | V-01–V-05, E-01 | DEV |
| V-07 | Build `<LandingScreen>` — title card, "Mulai" button, "Lanjutkan" button (if save exists), settings gear | P0 | M | E-07 | DEV |
| V-08 | Implement `useTypewriter` hook — character-by-character reveal, configurable speed, skip support | P0 | M | — | DEV |
| V-09 | Implement `useDialog` hook — manages dialog queue, advances lines, triggers choices, fires events | P0 | M | E-01 | DEV |
| V-10 | Wire StoryScreen into App.tsx routing, verify end-to-end VN flow | P0 | M | V-06, V-07 | DEV |

---

## PHASE 4: EVIDENCE & BOARD (Sprint 4)

> Goal: Investigation hub, evidence collection, and contradiction board fully functional.

| ID | Task | Priority | Effort | Deps | Role |
|----|------|----------|--------|------|------|
| B-01 | Build `<EvidenceCard>` component — thumbnail, title, "BARU" badge, tap to open detail | P0 | S | F-03 | DEV |
| B-02 | Build `<EvidenceInventory>` component — scrollable grid/list, filter by category, empty state | P0 | M | B-01, E-02 | DEV |
| B-03 | Build `<EvidenceDetail>` modal — full image, description, tags, "Kumpulkan" button | P1 | M | B-01 | DEV |
| B-04 | Build `<BoardCanvas>` component — grid layout, drag/tap placement, responsive | P0 | L | E-03 | DEV |
| B-05 | Build `<EvidenceNode>` component — tap to select, visual state (selected/connected/error) | P0 | M | B-04 | DEV |
| B-06 | Build `<ConnectionEdge>` component — SVG line between nodes, colored by relation (contradiction/support), animated draw | P0 | M | B-04 | DEV |
| B-07 | Build `<BoardHint>` component — diegetic hint bubble from Lala, trigger on idle | P1 | S | E-03 | DEV |
| B-08 | Build `<HubScreen>` — investigation hub with navigation to Board, Evidence, continue story | P0 | M | B-02, B-04 | DEV |
| B-09 | Build `<BoardScreen>` — combines BoardCanvas + EvidenceNode + ConnectionEdge + BoardHint + submit button | P0 | L | B-04–B-07 | DEV |
| B-10 | Implement tap-to-connect mechanic — select two nodes, validate connection, animate edge | P0 | M | B-05, B-06, E-03 | DEV |
| B-11 | Implement edge animation — draw line + color flash on valid/invalid connection | P1 | S | B-06 | DEV |
| B-12 | Wire HubScreen and BoardScreen into App.tsx routing | P0 | S | B-08, B-09 | DEV |

---

## PHASE 5: INSPECTION & CONFRONTATION (Sprint 5)

> Goal: Full gameplay loop — inspect claims, confront suspects, make editorial decision, see reflection.

| ID | Task | Priority | Effort | Deps | Role |
|----|------|----------|--------|------|------|
| I-01 | Build `<InspectionScreen>` — claim display, evidence selector, submit evaluation, feedback | P0 | L | E-04, B-01 | DEV |
| I-02 | Build `<ConfrontationScreen>` — conditional dialog branching based on selected evidence | P0 | L | E-01, V-03 | DEV |
| I-03 | Build `<DecisionScreen>` — 4 editorial option cards, confirm selection, consequence preview | P0 | M | E-05 | DEV |
| I-04 | Build `<ReflectionScreen>` — editorial debrief, learning summary, tier badge, replay option | P1 | M | E-06 | DEV |
| I-05 | Implement confrontation dialog branching logic — which lines show based on evidence state | P0 | M | I-02 | DEV |
| I-06 | Implement outcome tier calculation integration (wire outcomeEngine into DecisionScreen) | P0 | S | I-03, E-05 | DEV |
| I-07 | Implement reflection text generation integration (wire reflectionEngine into ReflectionScreen) | P1 | S | I-04, E-06 | DEV |
| I-08 | Wire all Phase 5 screens into App.tsx routing, verify full game loop | P0 | M | I-01–I-04 | DEV |

---

## PHASE 6: CONTENT DATA (Sprint 6)

> Goal: All narrative content authored, typed, and validated. Playable from start to end.

| ID | Task | Priority | Effort | Deps | Role |
|----|------|----------|--------|------|------|
| C-01 | Create `chapter-1/scenes.ts` — all 10 scenes with full dialog (500+ lines total) | P0 | XL | F-07, F-08 | CTN |
| C-02 | Create `chapter-1/evidences.ts` — 10 evidence items with descriptions, tags, images | P0 | M | F-07 | CTN |
| C-03 | Create `chapter-1/rules.ts` — 5 contradiction rules (tag pairs + explanation) | P0 | S | F-07, E-03 | CTN |
| C-04 | Create `chapter-1/claims.ts` — claim inspection rules (claim + correct evidence + feedback) | P0 | M | F-07, E-04 | CTN |
| C-05 | Create `chapter-1/confrontations.ts` — confrontation dialog branches per suspect | P0 | L | F-07 | CTN |
| C-06 | Create `chapter-1/editorials.ts` — 4 editorial decisions with descriptions + consequences | P0 | M | F-07, E-05 | CTN |
| C-07 | Create `chapter-1/reflections.ts` — reflection text per tier (4 levels) + learning points | P1 | M | F-07, E-06 | CTN |
| C-08 | Validate all chapter-1 data against Zod schemas (integration test) | P0 | M | C-01–C-07, F-08 | DEV |
| C-09 | Write dialog for confrontation branches (per-suspect variant lines) | P1 | L | C-05 | CTN |
| C-10 | Review + polish all dialog for tone consistency (Bahasa Indonesia, casual detective) | P1 | M | C-01–C-09 | CTN |

---

## PHASE 7: AUDIO & VISUAL ASSETS (Sprint 7)

> Goal: All art and audio assets produced and integrated.

| ID | Task | Priority | Effort | Deps | Role |
|----|------|----------|--------|------|------|
| A-01 | Generate character sprites — 11 characters × 3–4 expressions (neutral, happy, angry, sad) | P0 | XL | — | ART |
| A-02 | Generate backgrounds — 7 locations (kelas, koridor, kantin, ruang guru, perpustakaan, lapangan, studio) | P0 | L | — | ART |
| A-03 | Create UI elements — dialog box frame, button styles, card templates, board grid, hub icons | P0 | L | F-03 | ART |
| A-04 | Create evidence visuals — 10 item illustrations/thumbnails | P1 | M | C-02 | ART |
| A-05 | Generate TTS dialog audio via Edge TTS — all dialog lines (id-ID voices) | P1 | XL | C-01 | AUD |
| A-06 | Source BGM — 3 tracks (investigation calm, tension, resolution) from DOVA-SYNDROME or similar | P1 | M | — | AUD |
| A-07 | Source SFX — 6 sounds (click, evidence-unlock, connection-valid, connection-invalid, transition, notification) from Freesound | P1 | S | — | AUD |
| A-08 | Integrate all audio into `audioEngine.ts` — map scene events to audio triggers | P1 | M | E-08, A-05–A-07 | AUD |
| A-09 | Add audio controls to `<SettingsScreen>` — BGM volume, SFX volume, voice toggle | P1 | S | A-08 | DEV |
| A-10 | Integrate all visual assets into components — import, map to data refs | P0 | M | A-01–A-04, V-01–V-03 | DEV |

---

## PHASE 8: POLISH & INTEGRATION (Sprint 8)

> Goal: Production-quality app. Responsive, performant, bug-free, ready for submission.

| ID | Task | Priority | Effort | Deps | Role |
|----|------|----------|--------|------|------|
| P-01 | Build `<SmartphoneOverlay>` component — in-game phone UI for chat/social feed | P1 | M | F-03 | DEV |
| P-02 | Build `<ChatBubble>` + `<SocialPost>` components — mock social media feed | P1 | M | P-01 | DEV |
| P-03 | Build `<SettingsScreen>` — volume sliders, text speed, voice toggle, reset progress | P1 | M | E-07, E-08 | DEV |
| P-04 | Implement auto-save — save on every scene transition via saveEngine | P1 | S | E-07 | DEV |
| P-05 | Add loading states — skeleton screens, spinner for asset loading | P1 | S | — | DEV |
| P-06 | Add error boundaries — graceful fallback on component crash | P1 | S | — | DEV |
| P-07 | Responsive testing — mobile landscape (primary), tablet portrait (secondary) | P0 | M | All | DEV |
| P-08 | Cross-browser testing — Chrome, Firefox, Safari, Edge | P1 | M | All | DEV |
| P-09 | Performance audit — Lighthouse, bundle size, lazy loading images/audio | P1 | M | All | DEV |
| P-10 | Add tutorial/onboarding — first-time player guidance (Lala intro) | P2 | M | V-03 | CTN |
| P-11 | Final end-to-end playtest — full chapter 1 from start to all 4 endings | P0 | M | All | ALL |

---

## PHASE 9: STRETCH GOALS (P2)

> Goal: Nice-to-haves if time permits before LIDM submission.

| ID | Task | Priority | Effort | Deps | Role |
|----|------|----------|--------|------|------|
| S-01 | Gallery mode — view unlocked sprites, CGs, replay scenes | P2 | L | A-01 | DEV |
| S-02 | Statistics page — decisions made, evidence found, time played | P2 | M | E-07 | DEV |
| S-03 | Chapter select — replay individual chapters/scenes | P2 | M | E-07 | DEV |
| S-04 | Achievement system — badges for milestones (all evidence found, perfect inspection, etc.) | P2 | L | E-02, E-04 | DEV |
| S-05 | Analytics integration — track player choices, drop-off points (privacy-respecting) | P2 | M | — | DEV |

---

## Sprint Velocity Estimate

| Sprint | Phase | Total Effort (approx) | Parallel Tracks |
|--------|-------|-----------------------|-----------------|
| 1 | Foundation | ~5 dev-days | DEV only |
| 2 | Core Engines | ~8 dev-days | DEV only |
| 3 | VN Components | ~8 dev-days | DEV only |
| 4 | Evidence & Board | ~7 dev-days | DEV only |
| 5 | Inspection & Confrontation | ~7 dev-days | DEV only |
| 6 | Content Data | ~12 content-days | CTN (DEV validates) |
| 7 | Audio & Assets | ~15 art/audio-days | ART + AUD (DEV integrates) |
| 8 | Polish | ~6 dev-days | ALL |
| 9 | Stretch | ~8 dev-days | DEV |

**Note:** Sprints 6 & 7 can run in parallel with Sprints 3–5. Content and asset creation should start as early as possible to allow integration time.

---

## Critical Path

```
F-01 → F-02 → F-03 → F-09 → E-01 → V-06 → V-10 → B-09 → I-08 → P-11
                          ↘ E-03 → B-04 → B-10
                          ↘ E-07 → P-04
```

The longest dependency chain runs through: **Foundation → Stores → StoryEngine → StoryScreen → BoardScreen → Inspection/Confrontation → Final Playtest**.

Parallel work: Content (Phase 6) and Assets (Phase 7) should begin no later than Sprint 3.

---

## Risk Register

| Risk | Impact | Mitigation |
|------|--------|------------|
| TTS quality inadequate for Indonesian | Medium | Pre-generate samples early; fallback to text-only |
| Asset generation quality inconsistent | High | Establish style guide early; batch generate + curate |
| Board UX confusing on mobile | High | Prototype board interaction in Sprint 3; user test early |
| Save/load bugs corrupt progress | Medium | Thorough unit tests on saveEngine; manual QA |
| Scope creep on content | Medium | Lock chapter-1 scope by Sprint 3; no new scenes after Sprint 6 |

---

*Last updated: Sprint planning — pre-development*
