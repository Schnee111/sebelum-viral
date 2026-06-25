# Sebelum Viral — Visual Style Guide

> A mobile-first visual novel detective game set in an Indonesian high school.
> Art direction: semi-realistic anime, dark theme, landscape orientation.

---

## 1. Color Palette

### 1.1 Dark Theme Backgrounds

| Token               | Hex        | Usage                        |
|---------------------|------------|------------------------------|
| `bg-main`           | `#0F172A`  | Primary background           |
| `bg-secondary`      | `#1E293B`  | Cards, panels, secondary bg  |
| `bg-dialog`         | `#1E293B` at 90% opacity | Dialog box background |
| `border-default`    | `#334155`  | Default borders              |

### 1.2 Text

| Token              | Hex        | Usage                  |
|--------------------|------------|------------------------|
| `text-primary`     | `#F8FAFC`  | Body text, dialog      |
| `text-secondary`   | `#94A3B8`  | Muted labels, captions |

### 1.3 Accent Colors

| Token                | Hex        | Usage                        |
|----------------------|------------|------------------------------|
| `accent-primary`     | `#3B82F6`  | Interactive elements, links  |
| `accent-investigate` | `#06B6D4`  | Investigation mode cues      |
| `accent-warm`        | `#F97316`  | Alerts, highlights           |

### 1.4 Semantic Colors (Evidence System)

| Token                | Hex        | Meaning              |
|----------------------|------------|----------------------|
| `evidence-contradict` | `#EF4444` | Contradiction        |
| `evidence-correlate`  | `#22C55E` | Correlation          |
| `evidence-context`    | `#F59E0B` | Context needed       |
| `evidence-irrelevant` | `#6B7280` | Irrelevant           |
| `evidence-weak`       | `#A78BFA` | Weak correlation     |

### 1.5 Character Speaker Colors

| Character        | Hex        | Tailwind Token   |
|------------------|------------|------------------|
| Nala             | `#38BDF8`  | `sky-400`        |
| Lala             | `#F472B6`  | `pink-400`       |
| Aldi             | `#34D399`  | `emerald-400`    |
| Bintang          | `#A78BFA`  | `violet-400`     |
| Citra            | `#FB923C`  | `orange-400`     |
| Rendra           | `#94A3B8`  | `slate-400`      |
| Pak Ardi         | `#FBBF24`  | `amber-400`      |
| Bu Sari          | `#F87171`  | `red-400`        |
| System/Narrator  | `#CBD5E1`  | `slate-300`      |

---

## 2. Typography

### 2.1 Font Stack

| Role          | Font Family             | Source        |
|---------------|-------------------------|---------------|
| Body / Dialog | `Plus Jakarta Sans`     | Google Fonts  |
| Heading / Title | `Playfair Display`    | Google Fonts  |
| UI / Labels   | `Plus Jakarta Sans`     | Google Fonts  (different weight) |

```css
--font-body:    'Plus Jakarta Sans', sans-serif;
--font-heading: 'Playfair Display', serif;
--font-ui:      'Plus Jakarta Sans', sans-serif;
```

### 2.2 Type Scale (Mobile Landscape)

| Element              | Size      | Weight       | Line Height |
|----------------------|-----------|--------------|-------------|
| Chapter title        | `32px` (2rem)    | Bold         | 1.4         |
| Dialog text          | `16px` (1rem)    | Regular      | 1.6         |
| Speaker name         | `14px` (0.875rem)| Semibold     | 1.4         |
| Choice button text   | `15px`           | Medium       | 1.4         |
| UI label             | `12px` (0.75rem) | Regular      | 1.4         |
| Evidence card title  | `14px`           | Semibold     | 1.4         |
| Evidence card body   | `12px`           | Regular      | 1.4         |

---

## 3. Component Patterns

### 3.1 Dialog Box

```
Position:       bottom 30% of viewport
Background:     #1E293B at 90% opacity + backdrop-blur(8px)
Border:         1px solid #334155
Border-radius:  12px
Padding:        16px 20px
```

- **Speaker name**: top-left of dialog box, colored per character table above.
- **Text rendering**: typewriter effect, 40ms per character.
- **Interaction**: tap anywhere to skip typewriter; tap again to advance dialog.

```css
.dialog-box {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 960px;
  margin-bottom: 5%;
  background: rgba(30, 41, 59, 0.9);
  backdrop-filter: blur(8px);
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 16px 20px;
}

.dialog-speaker {
  font-family: var(--font-ui);
  font-size: 14px;
  font-weight: 600;
  /* color set per character */
  margin-bottom: 4px;
}

.dialog-text {
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.6;
  color: #F8FAFC;
}
```

### 3.2 Choice Buttons

```
Min-height:     48px (touch-friendly)
Background:     #334155
Hover/Active:   #3B82F6
Border-radius:  8px
Text:           centered, 15px, font-medium
Max visible:    4 choices
```

- **Entrance**: staggered fade + slide-up, 100ms delay between each button, 300ms duration.

```css
.choice-button {
  min-height: 48px;
  background: #334155;
  border-radius: 8px;
  font-family: var(--font-body);
  font-size: 15px;
  font-weight: 500;
  color: #F8FAFC;
  text-align: center;
  cursor: pointer;
  transition: background 200ms ease;
}

.choice-button:hover,
.choice-button:active {
  background: #3B82F6;
}
```

### 3.3 Evidence Card

```
Width:          280px
Background:     #1E293B
Border:         1px solid #334155 (default); colored by credibility
Border-radius:  8px
Content:        icon + title + source + credibility badge
Interaction:    tap to expand detail view
```

```css
.evidence-card {
  width: 280px;
  background: #1E293B;
  border: 1px solid #334155;
  border-radius: 8px;
  padding: 12px;
  cursor: pointer;
}

.evidence-card--contradiction { border-color: #EF4444; }
.evidence-card--correlation   { border-color: #22C55E; }
.evidence-card--context       { border-color: #F59E0B; }
.evidence-card--irrelevant    { border-color: #6B7280; }
.evidence-card--weak          { border-color: #A78BFA; }
```

### 3.4 Board Node (Evidence Board)

```
Size:           120 x 80px
Background:     #1E293B
Border:         2px solid #334155 (default)
Selected:       border-color → #3B82F6
Connected:      border-color → semantic color (by relationship type)
Content:        icon + title + credibility badge
```

```css
.board-node {
  width: 120px;
  height: 80px;
  background: #1E293B;
  border: 2px solid #334155;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.board-node--selected  { border-color: #3B82F6; }
.board-node--connected { border-color: var(--connection-color); }
```

### 3.5 Connection Edge (Board)

| Relationship   | Color     | Style              |
|----------------|-----------|--------------------|
| Contradiction  | `#EF4444` | Animated dash      |
| Correlation    | `#22C55E` | Solid              |
| Context needed | `#F59E0B` | Solid              |
| Irrelevant     | `#6B7280` | Dashed             |

- **Draw animation**: 500ms line draw from source to target.
- **Result flash**: 300ms color flash when relationship is confirmed.
- **Label**: rendered at midpoint of the edge.

---

## 4. Animations & Transitions

| Event                | Property          | Duration  | Easing        |
|----------------------|-------------------|-----------|---------------|
| Scene fade-to-black  | opacity           | 500ms     | ease-in-out   |
| Character slide-in   | transform Y       | 300ms     | ease-out      |
| Dialog fade-in       | opacity           | 200ms     | ease          |
| Typewriter (normal)  | per-char delay    | 40ms      | —             |
| Typewriter (fast)    | per-char delay    | 20ms      | —             |
| Typewriter (slow)    | per-char delay    | 80ms      | —             |
| Typewriter cursor    | blink interval    | 530ms     | —             |
| Choice stagger       | delay per item    | 100ms     | —             |
| Choice entrance      | opacity + Y       | 300ms     | ease-out      |
| Evidence unlock      | scale 0.8→1.0     | 300ms     | spring        |
| Evidence glow        | box-shadow        | 500ms     | ease-out      |
| Board edge draw      | stroke-dashoffset | 500ms     | ease-in-out   |
| Board result flash   | border-color      | 300ms     | ease          |
| BGM crossfade        | volume            | 1000ms    | linear        |

---

## 5. Layout & Responsiveness

### 5.1 Breakpoints

| Name              | Width     | Target           |
|-------------------|-----------|------------------|
| Mobile landscape  | 640×360   | Minimum support  |
| Tablet landscape  | 1024×600  | Mid-tier         |
| Desktop           | 1280×720+ | Full experience  |

### 5.2 Aspect Ratio

- **Target**: 16:9 always.
- Use **letterboxing** (black bars top/bottom) if viewport aspect differs.
- All positioning uses **percentage-based** or **viewport units** internally.

```css
#game-container {
  width: 100vw;
  height: 100vh;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #0F172A;
}
```

---

## 6. Sound Design

| Event               | Sound Type        | Notes                   |
|---------------------|-------------------|-------------------------|
| UI click            | Short, subtle     | Minimal, non-distracting|
| Evidence unlock     | Satisfying chime  | Rewarding feedback      |
| Contradiction found | Dramatic sting    | Tension moment          |
| Scene transition    | Soft whoosh       | Smooth flow             |
| BGM crossfade       | 1000ms linear     | Seamless music change   |

---

## 7. Asset Naming Conventions

```
bg-{location}-{variant}       Background images
char-{name}-{expression}      Character sprites (e.g. char-nala-happy)
ui-{component}-{state}        UI elements (e.g. ui-btn-choice-hover)
evidence-{id}-{state}         Evidence icons (e.g. evidence-001-locked)
sfx-{event}                   Sound effects (e.g. sfx-evidence-unlock)
bgm-{chapter/mood}            Music tracks (e.g. bgm-chapter1-tense)
```

---

## 8. Implementation Notes

- **Engine**: Phaser 3 (or chosen framework) — all hex values and px sizes map directly to framework equivalents.
- **CSS custom properties**: define all tokens as CSS variables for runtime theming if needed.
- **Touch targets**: minimum 48px for all interactive elements (accessibility).
- **Text rendering**: use `font-smoothing: antialiased` for crisp Jakarta Sans on mobile.
- **Backdrop blur**: use `will-change: backdrop-filter` sparingly; test performance on low-end devices.

---

*Last updated: 2026-06-14*
