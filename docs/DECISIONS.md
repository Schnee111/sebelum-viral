# Architectural Decision Records — Sebelum Viral

This document records key architectural and design decisions made during the
development of *Sebelum Viral*. Each entry follows the ADR format: Title,
Status, Context, Decision, Consequences, and Alternatives Considered.

---

## ADR-001: Custom React vs VN Framework (Monogatari / NarraLeaf)

**Status:** Accepted

**Context:**
We need a framework to build an educational detective visual novel. Off-the-shelf
VN frameworks (Monogatari, NarraLeaf, Ren'Py-web) handle branching dialog and
basic choices but are opinionated about screen flow and UI. Sebelum Viral has
unique mechanics — an evidence board, claim inspection system, credibility meter,
and deduction challenges — that go beyond standard VN capability.

**Decision:**
Build the game engine on **custom React** (Next.js 14, TypeScript, Zustand for
state, Framer Motion for animation).

**Rationale:**
- The evidence board and claim-inspection mechanics do not map to any standard
  VN component. We would end up fighting the framework more than using it.
- Full control over UI/UX lets us keep the mobile-first portrait layout and
  the dark navy aesthetic consistent across every screen.
- The team already knows React; onboarding a niche VN DSL adds risk for no gain.

**Consequences:**
- We must implement dialog playback, scene transitions, and save/load ourselves.
- More code to write upfront, but the resulting system is exactly what the game
  needs and easy to extend for future chapters.

**Alternatives Considered:**
1. *Monogatari* — mature VN engine, good docs. Rejected: limited plugin system
   for custom mechanics; mobile support is secondary.
2. *NarraLeaf* — lightweight, React-based VN lib. Rejected: too early / small
   community; still wraps around Ren'Py concepts that don't fit.
3. *Ren'Py exported to web* — powerful scripting. Rejected: web export is heavy,
   mobile performance is poor, Python toolchain adds friction to the React/TS
   stack.

---

## ADR-002: React Flow vs Custom Board (Evidence Board)

**Status:** Accepted

**Context:**
The evidence board is a core gameplay mechanic. Players collect evidence items
and connect them to form logical deductions. We need a node/connection UI that
works well on mobile (portrait, touch-first).

**Decision:**
Build a **custom grid-based tap-to-connect** board.

**Rationale:**
- React Flow is designed for desktop node editors (drag, pan, zoom). Its touch
  support is functional but not ideal for small phone screens.
- A grid layout with tap-to-select + tap-to-connect is more intuitive for the
  target audience (high school students on phones).
- The board is small (6-12 items per chapter); a full node editor is overkill.

**Consequences:**
- Less powerful than React Flow (no freeform placement, no bezier curves).
- But: cleaner mobile UX, smaller bundle, no heavy dependency.
- Grid snapping simplifies layout calculations and save/load.

**Alternatives Considered:**
1. *React Flow* — powerful, well-maintained. Rejected: desktop-oriented UX;
   150 KB+ dependency for a feature we can build in ~200 lines.
2. *react-digraph* — another graph editor. Rejected: unmaintained, desktop-first.
3. *Freeform canvas* — most flexible. Rejected: harder to implement well on
   mobile; saved for later chapters where players are more experienced.

---

## ADR-003: Pre-generated TTS vs Runtime TTS

**Status:** Accepted

**Context:**
The game has voice-acted dialog in Indonesian. We need to decide whether to
generate speech at runtime (API call) or pre-generate and bundle audio files.

**Decision:**
**Pre-generate** all voice lines as MP3 using **Microsoft Edge TTS** (free,
unofficial API). Use `id-ID-GadisNeural` (female) and `id-ID-ArdiNeural`
(male) voices.

**Rationale:**
- Consistent audio quality across all devices and network conditions.
- Zero runtime cost — no API keys, no latency, no rate limits.
- Edge TTS produces natural-sounding Indonesian voices for free.
- Dialog is stable after the content phase; regeneration is rare.

**Consequences:**
- Audio files add to the build size (~2-4 MB per chapter).
- Must regenerate files when dialog text changes (automated via a build script).
- No dynamic TTS for user-generated content (not needed for this game).

**Alternatives Considered:**
1. *Web Speech API (runtime)* — built into browsers. Rejected: voice quality
   varies wildly across devices; Indonesian support is weak on iOS.
2. *Google Cloud TTS / AWS Polly* — high quality. Rejected: cost per request;
   requires API keys in client; offline play impossible.
3. *ElevenLabs* — premium quality. Rejected: expensive; overkill for a student
   educational game.

---

## ADR-004: Dark Theme vs Light Theme

**Status:** Accepted

**Context:**
The game's art direction must match its investigative / detective genre and
appeal to high school students playing on phones, often in low-light settings.

**Decision:**
**Dark navy theme** (background: #0a0f1e, accent: #1e3a5f, text: #e8e8e8).

**Rationale:**
- Dark backgrounds evoke mystery and investigation — genre-appropriate.
- Reduces eye strain during longer play sessions.
- Semi-realistic anime character art stands out better against dark backgrounds.
- Modern mobile games skew dark; aligns with audience expectations.

**Consequences:**
- All UI components must be designed for dark backgrounds.
- Need to ensure sufficient contrast for accessibility (WCAG AA minimum).
- Light theme not planned; could be added later if needed.

**Alternatives Considered:**
1. *Light theme* — cleaner for reading. Rejected: doesn't fit the detective
   mood; looks too "app-like" for a game.
2. *Adaptive / system theme* — respects OS setting. Rejected: adds complexity;
   the game has a fixed aesthetic identity.

---

## ADR-005: State-based Routing vs React Router

**Status:** Accepted

**Context:**
The game has a fixed set of screens: Title, Menu, Story, Evidence Board,
Deduction, Results, Settings. We need a way to navigate between them.

**Decision:**
Use **state-based navigation** with `useState` (or Zustand) — no React Router.

**Rationale:**
- Game screens are not URL-addressable. There is no meaningful "/chapter/1"
  route; players always start from the title screen.
- Simpler implementation: a single `currentScreen` state value drives which
  component renders.
- No need for browser history, deep linking, or back-button handling.
- Eliminates a dependency (react-router-dom).

**Consequences:**
- No browser back-button support (intentional for a game).
- No URL sharing (not needed for a single-player game).
- Screen transitions handled by Framer Motion `AnimatePresence`.

**Alternatives Considered:**
1. *React Router* — standard for web apps. Rejected: adds complexity for a
   feature we don't need; game navigation is not URL-based.
2. *Next.js App Router* — file-based routing. Rejected: overkill for a game;
   we don't need SSR or SSG for game screens.

---

## ADR-006: Grid Board vs Freeform Board

**Status:** Accepted

**Context:**
Chapter 1 is a tutorial / guided investigation. Players are learning the
evidence-board mechanic for the first time. The board layout must be
approachable and predictable.

**Decision:**
Use a **grid-based** layout for Chapter 1. Freeform board is planned for later
chapters where players are experienced.

**Rationale:**
- Grid layout is easier to implement and reason about.
- Snap-to-grid prevents messy layouts that confuse new players.
- Mobile-friendly: grid fits neatly in portrait orientation.
- Tutorial prompts can reference specific grid positions ("place evidence in
  the highlighted slot").

**Consequences:**
- Chapter 1 feels more guided / constrained (acceptable for tutorial).
- Grid size limits the number of visible evidence items (use pagination or
  scroll if needed).
- Must architect the board component so freeform can be swapped in later
  without rewriting the evidence/connection logic.

**Alternatives Considered:**
1. *Freeform canvas* — most flexible. Rejected for Ch.1: too complex for
   tutorial; saves for Ch.2+.
2. *Timeline layout* — chronological. Rejected: doesn't fit the connection
   metaphor.

---

## ADR-007: Auto-save Only vs Manual Save

**Status:** Accepted

**Context:**
The target audience is high school students who may play in short sessions
(between classes, on the bus). Forgetting to save would lose progress and
cause frustration.

**Decision:**
**Auto-save** after every scene transition, with a **2-slot rotation backup**
(protects against corruption).

**Rationale:**
- Zero-friction experience: players never lose progress.
- Two slots (A and B) rotate so a corrupt save doesn't destroy everything.
- localStorage is sufficient for save data (~5-10 KB per save).

**Consequences:**
- No manual save/load UI needed (simpler Settings screen).
- "Continue" always resumes from the latest auto-save.
- "New Game" overwrites the current save (with a confirmation dialog).
- Must handle localStorage quota errors gracefully (unlikely but possible).

**Alternatives Considered:**
1. *Manual save slots (3 slots)* — traditional. Rejected: target audience may
   forget; adds UI complexity.
2. *Auto-save + manual save* — best of both. Rejected: unnecessary complexity;
   manual save adds little value for a linear-ish VN.
3. *Cloud save* — sync across devices. Rejected: requires auth backend;
   out of scope for v1.

---

## ADR-008: Zod Validation — Dev Time Only

**Status:** Accepted

**Context:**
Game data (scenes, characters, evidence, dialog) is defined in JSON/TypeScript
files. Data errors (missing fields, wrong types) cause hard-to-debug runtime
crashes. We want to catch these early.

**Decision:**
Validate all game data with **Zod schemas in DEV mode only**; skip validation
in PROD builds.

**Rationale:**
- Zod validation catches schema errors at startup / load time during
  development, giving immediate feedback to content authors.
- In production, the data is static and has already been validated during dev;
  running Zod again wastes CPU and adds bundle size.
- Controlled by `process.env.NODE_ENV === 'development'` check.

**Consequences:**
- Dev builds are slightly slower (negligible for our data size).
- Prod builds are leaner (Zod can be tree-shaken if only imported in dev paths).
- If someone bypasses dev validation and ships malformed data, production won't
  catch it — mitigated by CI checks.

**Alternatives Considered:**
1. *Validate in both dev and prod* — safest. Rejected: unnecessary runtime cost
   for static data.
2. *TypeScript only (no runtime validation)* — TS catches type errors at compile
   time but not runtime data loaded from JSON/filesystem.
3. *JSON Schema + AJV* — another validation library. Rejected: Zod integrates
   better with TypeScript and generates types automatically.

---

## Summary of Key Choices

| Decision | Choice | Key Reason |
|---|---|---|
| Framework | Custom React | Unique mechanics need full control |
| Evidence Board | Custom grid tap-to-connect | Mobile-first, touch-friendly |
| Voice | Pre-generated Edge TTS | Free, consistent, offline-capable |
| Theme | Dark navy | Detective mood, eye comfort |
| Routing | State-based useState | Game screens aren't URLs |
| Board Layout | Grid (Ch.1), Freeform later | Tutorial-friendly, extensible |
| Save System | Auto-save + 2-slot rotation | Audience-appropriate, safe |
| Data Validation | Zod in DEV only | Early error detection, no prod cost |

---

*Document created: 2026-06-14*
*Last updated: 2026-06-14*
