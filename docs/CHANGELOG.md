# Changelog — Sebelum Viral

## [Unreleased]

### 2026-06-14

#### Project Setup
- Created 15 documentation files (~203KB)
- Initialized Vite + React + TypeScript + Tailwind project
- Installed all dependencies
- Created folder structure
- Defined TypeScript types and Zod schemas

#### Sprint 1: Foundation ✅
- Types (evidence.ts, scene.ts, game.ts)
- Zod schemas (evidence.schema.ts, scene.schema.ts)
- Zustand stores (game, evidence, dialog, settings)
- Core engines (storyEngine, evidenceEngine, boardEngine, saveEngine)
- Unit tests (4 test suites)

#### Sprint 2: Visual Novel ✅
- DialogBox with typewriter effect
- CharacterSprite with expression support
- ChoicePanel with staggered animations
- Background with transitions
- LandingScreen, StoryScreen

#### Sprint 3: Evidence & Board ✅
- EvidenceCard, EvidenceInventory
- BoardCanvas, EvidenceNode, ConnectionEdge
- Grid-based tap-to-connect mechanic
- HubScreen

#### Sprint 4: Endgame Screens ✅
- InspectionScreen (claim-evidence evaluation)
- ConfrontationScreen (chat-style dialog)
- DecisionScreen (4 editorial options)
- ReflectionScreen (outcome + learning summary)

#### Sprint 5: Content Data ✅
- 10 scenes (CH1_S00 to CH1_S09)
- 10 evidence items (EV_CH1_001 to EV_CH1_010)
- 5 contradiction rules
- 4 editorial decisions
- 59 dialog lines in Indonesian

#### Sprint 7: Polish ✅
- Auto-save per scene
- Settings integration
- Race condition fix for scene transitions

#### QA Testing ✅
- All 10 screens verified working
- Zero JavaScript errors
- Full flow tested: Landing → Story → Choices → Hub → Board → Inspection → Confrontation → Decision → Reflection → Restart
- Confrontation chat bubbles render correctly
- Decision options display properly
- Reflection shows correct outcome tier

#### Assets
- 22 placeholder SVGs (characters, backgrounds, evidence, UI)
- Folder structure ready for real assets

### Status: GAME PLAYABLE (with placeholder assets)
