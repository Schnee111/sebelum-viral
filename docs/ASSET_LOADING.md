# Asset Loading Strategy — Sebelum Viral

> Implementation-ready spec for loading, caching, and fallback behavior.
> Platform: Web (mobile-first, landscape), PWA-capable.

---

## 1. Loading Phases

Assets are loaded in three priority tiers to minimize time-to-playable.

### Phase 1 — Critical (blocks interaction)

| Asset Type         | Examples                                    |
|--------------------|---------------------------------------------|
| UI elements        | Dialog box, name plate, choice buttons, HUD |
| First scene BG     | `bg_corridor.webp`                          |
| First 2 character sprites | `char_narrator_neutral.webp`, etc.    |

- **Goal:** Player sees and can interact within 3 seconds.
- **Technique:** Inline `fetch()` with `priority: 'high'` or `<link rel="preload">`.

### Phase 2 — Important (loaded during Phase 1 play)

| Asset Type              | Examples                           |
|-------------------------|------------------------------------|
| Remaining scene sprites | `char_mentor_smile.webp`           |
| BGM                     | `bgm_main_theme.mp3`              |
| Dialog audio (current scene) | `vo_s00_narrator_001.mp3`    |

- **Goal:** Audio and visual polish available by second dialog line.
- **Technique:** `fetch()` with `priority: 'low'`, attach to pool on resolve.

### Phase 3 — Background (loaded after game starts)

| Asset Type         | Examples                           |
|--------------------|------------------------------------|
| Other backgrounds  | `bg_cafeteria.webp`, `bg_lobby.webp` |
| Evidence visuals   | `ev_screenshot_01.webp`            |
| Remaining audio    | Future scene VO, alternate BGM     |

- **Goal:** Complete asset set cached before first scene transition.
- **Technique:** Idle callback or request scheduler between dialog ticks.

---

## 2. Preload Strategy

```
App Start
  └─ Preload: title BG, logo, UI buttons (Phase 1 subset)

Game Start (player taps "Mulai")
  └─ Preload: S00 assets — corridor BG, narrator sprite, first dialog audio

Scene Transition (S00 → S01)
  └─ While S00 plays final dialog lines:
       Fetch S01 background, S01 character sprites, S01 BGM
  └─ Fade-to-black transition masks any remaining load

Inventory Opened
  └─ Load evidence detail image on-demand (not before)
```

### Implementation Notes

```ts
// Scene transition preload hook
onSceneProgress(sceneId: string, progress: number) {
  if (progress > 0.7) {  // 70% through current scene
    preloadSceneAssets(nextSceneId);
  }
}
```

---

## 3. Loading UI

| Context            | UI Behavior                                      |
|--------------------|--------------------------------------------------|
| **Initial load**   | Full-screen overlay: game logo + animated progress bar + "Memuat..." text |
| **Scene transition** | Fade-to-black (800ms) covers asset load — no spinner |
| **Evidence detail** | Skeleton card (pulsing gray placeholder) until image resolves |
| **Audio**          | Silent fail, no loading indicator, no buffering spinner |

### Loading Screen Spec

```
┌─────────────────────────────────────┐
│                                     │
│         [GAME LOGO IMAGE]           │
│         SEBELUM VIRAL               │
│                                     │
│    ████████████░░░░░░░░  62%       │
│                                     │
│         "Memuat aset..."            │
│                                     │
└─────────────────────────────────────┘
```

- Background: `#0a0a0a` solid black
- Logo: centered, max 60% viewport width
- Progress bar: 240px wide, `#ff6b35` fill on `#333` track
- Text: 14px, `#999`, below progress bar
- Fades out over 400ms when Phase 1 completes

---

## 4. Caching

### Service Worker (PWA)

```
workbox config:
  - precache: app shell (HTML, CSS, JS bundles)
  - runtimeCaching:
      - images: CacheFirst, maxAge 30 days, maxEntries 200
      - audio:  CacheFirst, maxAge 30 days, maxEntries 100
      - fonts:  CacheFirst, maxAge 365 days
```

### Cache Strategy by Asset Type

| Asset Type    | Strategy                 | TTL       |
|---------------|--------------------------|-----------|
| Images        | Cache-first              | 30 days   |
| Audio         | Cache-first              | 30 days   |
| Fonts         | Cache-first              | 365 days  |
| JS/CSS bundles | Stale-while-revalidate  | 7 days    |
| Save data     | IndexedDB                | Permanent |

### IndexedDB Schema

```
Database: sebelum-viral-db
  Store: save-data
    key: slotId (1-3)
    value: { sceneId, flags, inventory, timestamp }

  Store: asset-meta
    key: assetUrl
    value: { cachedAt, version, size }
```

### Update Flow

1. Service Worker installs new version in background
2. `stale-while-revalidate` serves cached JS/CSS immediately, fetches update
3. On next navigation, new version activates
4. Asset version mismatch triggers selective re-download (compare `asset-meta`)

---

## 5. Fallback Behavior

| Failure Type     | Fallback                                                     |
|------------------|--------------------------------------------------------------|
| **Image fails**  | Show placeholder: colored rectangle (#2a2a2a) + generic image icon (🖼️), log URL |
| **Audio fails**  | Skip silently, continue playback, log error to console       |
| **Font fails**   | `font-family: 'Noto Sans', -apple-system, sans-serif`        |
| **TTS fails**    | Fall back to `window.speechSynthesis` (Web Speech API)       |
| **Scene BG fails** | Use solid color `#111` as background                      |
| **Sprite fails** | Show "silhouette" placeholder SVG (character-shaped outline)  |

### Placeholder Asset (inline SVG, no network request)

```svg
<!-- ~200 bytes inline, used for all image failures -->
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect fill="#2a2a2a" width="100" height="100"/>
  <text x="50" y="55" text-anchor="middle" fill="#555" font-size="24">🖼</text>
</svg>
```

### Error Logging

```ts
function onAssetError(type: 'image'|'audio'|'font', url: string, err: Error) {
  console.warn(`[AssetLoad] ${type} failed: ${url}`, err.message);
  // Future: send to analytics endpoint
}
```

---

## 6. Performance Targets

| Metric                    | Target              | Measurement              |
|---------------------------|---------------------|--------------------------|
| Initial load (to playable)| < 3s on 3G (1.6Mbps) | Lighthouse TTI metric  |
| Scene transition          | < 500ms             | Time from trigger to new BG visible |
| Total asset bundle        | < 50MB              | `du` on `/assets/` dir   |
| Individual image          | < 500KB             | Largest file in `/images/` |
| Individual audio          | < 2MB               | Largest file in `/audio/`  |
| First Contentful Paint    | < 1.5s              | Lighthouse               |
| Cumulative Layout Shift   | < 0.1               | Lighthouse               |

### Budget Enforcement (CI check)

```bash
# scripts/check-asset-sizes.sh
MAX_IMAGE=512000   # 500KB
MAX_AUDIO=2097152  # 2MB
MAX_TOTAL=52428800 # 50MB

find assets/images -type f -size +${MAX_IMAGE}c && echo "FAIL: oversized image"
find assets/audio -type f -size +${MAX_AUDIO}c && echo "FAIL: oversized audio"
TOTAL=$(du -sb assets/ | cut -f1)
[ "$TOTAL" -gt "$MAX_TOTAL" ] && echo "FAIL: total exceeds 50MB"
```

---

## 7. Optimization

### Images

| Technique          | Detail                                                |
|--------------------|-------------------------------------------------------|
| Format             | WebP primary, PNG fallback via `<picture>` element    |
| Compression        | Lossy 80% quality for BGs, lossless for sprites with alpha |
| Sizing             | 1920×1080 max for BGs, 720px wide for character sprites |
| Responsive         | Serve 1x on `< 768px` viewport, 2x on wider          |
| Lazy loading       | `loading="lazy"` on all non-critical `<img>`          |

### Audio

| Type      | Format | Bitrate  | Notes                          |
|-----------|--------|----------|--------------------------------|
| Dialog VO | MP3    | 128kbps  | Mono, ~1MB/min                 |
| BGM       | MP3    | 192kbps  | Stereo, ~1.4MB/min             |
| SFX       | MP3    | 128kbps  | Short clips, < 100KB each      |

### Code Splitting

```
src/
  ├── main.ts              # Entry, router only
  ├── screens/
  │   ├── landing.ts       # Lazy: loaded on app start
  │   ├── game.ts          # Lazy: loaded on game start
  │   ├── evidence.ts      # Lazy: loaded on inventory open
  │   └── credits.ts       # Lazy: loaded on game end
  └── engine/
      ├── dialog.ts        # Shared, in main bundle (< 20KB)
      ├── renderer.ts      # Shared
      └── audio.ts         # Shared
```

- Dynamic `import()` for screen modules
- Shared engine code stays in main bundle (small, always needed)

### Asset Manifest

```json
// assets/manifest.json — generated at build time
{
  "version": "1.0.0",
  "scenes": {
    "S00": {
      "backgrounds": ["bg_corridor.webp"],
      "sprites": ["char_narrator_neutral.webp", "char_mentor_neutral.webp"],
      "audio": ["vo_s00_narrator_001.mp3", "vo_s00_mentor_001.mp3"],
      "bgm": "bgm_main_theme.mp3"
    }
  },
  "ui": {
    "images": ["ui_dialog_box.webp", "ui_choice_bg.webp"],
    "fonts": ["NotoSans-Regular.woff2"]
  }
}
```

---

## 8. Implementation Checklist

- [ ] Configure Workbox service worker with cache rules above
- [ ] Build asset manifest generator (reads `/assets/`, outputs `manifest.json`)
- [ ] Implement `AssetLoader` class with Phase 1/2/3 prioritization
- [ ] Add `<link rel="preload">` tags for Phase 1 assets in `index.html`
- [ ] Create placeholder SVG and fallback rendering logic
- [ ] Set up IndexedDB stores for save data and asset metadata
- [ ] Add `check-asset-sizes.sh` to CI pipeline
- [ ] Implement scene-transition preload hook (70% threshold)
- [ ] Add skeleton card component for evidence detail view
- [ ] Test on simulated 3G (Chrome DevTools) to verify < 3s target
