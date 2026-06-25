# GAME DESIGN DOCUMENT — Sebelum Viral

**Version:** 1.0
**Date:** 2025-06-14
**Status:** Active Development
**Competition:** LIDM 2026

---

## Table of Contents

1. [Game Overview](#1-game-overview)
2. [Core Gameplay Loop](#2-core-gameplay-loop)
3. [Game Systems](#3-game-systems)
4. [Chapter 1: Awal Rumor](#4-chapter-1-awal-rumor)
5. [Evidence & Detective Board](#5-evidence--detective-board)
6. [NPC Confrontation System](#6-npc-confrontation-system)
7. [Editorial Decision & Outcomes](#7-editorial-decision--outcomes)
8. [Player State & Variables](#8-player-state--variables)
9. [Truth Table](#9-truth-table)
10. [UI/UX Specifications](#10-uiux-specifications)
11. [Audio & TTS](#11-audio--tts)
12. [Save System](#12-save-system)
13. [Feature Priority Matrix](#13-feature-priority-matrix)
14. [Technical Notes](#14-technical-notes)

---

## 1. Game Overview

### 1.1 Concept

**Sebelum Viral** is an educational detective visual novel where the player takes on the role of a student journalist at SMA Nusantara. A viral social media post accuses a fellow student, Aldi, of misusing OSIS (student council) funds. The player must investigate the claim, collect and analyze evidence, confront suspects responsibly, and make an editorial decision about what to publish — learning critical media literacy and digital citizenship along the way.

### 1.2 Key Details

| Field            | Value                                              |
|------------------|----------------------------------------------------|
| **Genre**        | Narrative-investigative visual novel with detective mechanics |
| **Platform**     | Web browser (mobile-first, landscape 16:9)         |
| **Target**       | Indonesian high school students (SMA/SMK/MA, ages 15–17) |
| **Language**     | Bahasa Indonesia                                   |
| **Play Time**    | ~30–45 minutes per chapter                         |
| **Engine**       | Web-based (HTML/CSS/JS or framework TBD)           |

### 1.3 Educational Goals

1. **Source verification** — Evaluate credibility of claims and sources
2. **Evidence-based reasoning** — Use facts, not feelings, to form conclusions
3. **Ethical journalism** — Understand responsibility before publishing
4. **Digital citizenship** — Recognize the harm of spreading unverified information
5. **Critical thinking** — Identify contradictions and missing context

---

## 2. Core Gameplay Loop

```
┌─────────────────────────────────────────────────────────────────┐
│                         CORE LOOP                                │
│                                                                  │
│  Read Narrative ──► Receive Rumor/Claim                          │
│       │                     │                                    │
│       ▼                     ▼                                    │
│  Explore Scene ──► Collect Evidence (unlock items)               │
│       │                     │                                    │
│       ▼                     ▼                                    │
│  Analyze Evidence ──► Connect on Detective Board                 │
│       │                     │                                    │
│       ▼                     ▼                                    │
│  Detect Correlation/Contradiction                                │
│       │                                                          │
│       ▼                                                          │
│  Confront NPC (conditional dialogue)                             │
│       │                                                          │
│       ▼                                                          │
│  Make Editorial Decision                                         │
│       │                                                          │
│       ▼                                                          │
│  See Consequences ──► Learning Reflection                        │
│       │                                                          │
│       └──────────────── Next scene / Chapter end                 │
└─────────────────────────────────────────────────────────────────┘
```

### 2.1 Loop Breakdown

| Phase               | Mechanic                                        | Player Action            |
|----------------------|------------------------------------------------|--------------------------|
| **Narrative**        | Visual novel dialog with choices                | Read, tap, choose        |
| **Investigation**    | Evidence cards unlock via scene progression     | Collect, review, read    |
| **Analysis**         | Detective board — connect evidence nodes        | Drag, connect, tag       |
| **Confrontation**    | Conditional dialog based on evidence found      | Select evidence, choose dialog |
| **Decision**         | Editorial choice with consequences              | Choose one of 4 options  |
| **Reflection**       | Debrief screen with learning summary            | Read, acknowledge        |

---

## 3. Game Systems

### 3.1 Visual Novel Mode

**Purpose:** Primary storytelling mechanism.

**Behavior:**
- Dialog box at bottom of screen (30% height)
- Character portrait on left or right (speaker indicator)
- Text typewriter effect (configurable speed)
- Tap/click to complete current line instantly, then advance
- Choice buttons appear inline during decision points
- Background art fills top 70% of screen

**Dialog Structure:**
```
scene_id: CH1_S00
dialog:
  - speaker: narrator
    text: "Koridor sekolah. Suasana sepi..."
    emotion: neutral
  - speaker: aldi
    portrait: aldi_sad
    text: "Kenapa semua orang langsung percaya..."
    emotion: sad
```

**Implementation Notes:**
- Dialog data stored in JSON/YAML per scene
- Speaker name + emotion drive portrait selection
- Support `#choice` blocks for branching

---

### 3.2 Evidence Inventory

**Purpose:** Track all collected evidence items.

**Behavior:**
- Card-based list view accessible via UI button (icon: magnifying glass)
- Each card shows: title, type icon, credibility badge, brief description
- Cards unlock when player reaches specific scenes
- Newly unlocked cards have a "NEW" indicator
- Player can tap card to view full evidence detail
- Evidence detail includes: title, type, full description, source, credibility rating

**Card Types:**
| Type           | Icon    | Description                    |
|----------------|---------|--------------------------------|
| `document`     | 📄     | Official written document      |
| `social_post`  | 📱     | Social media post/story        |
| `chat`         | 💬     | Chat message/conversation      |
| `testimony`    | 🗣️     | Verbal statement from NPC      |
| `photo`        | 📷     | Photograph evidence            |
| `social_comment` | 💭   | Comment on social media        |

**Credibility Levels:**
| Level    | Color  | Meaning                           |
|----------|--------|-----------------------------------|
| High     | Green  | Official, verifiable source       |
| Medium   | Yellow | Partially verified, needs corroboration |
| Low      | Red    | Anonymous, unverifiable, or hearsay |

---

### 3.3 Detective Board

**Purpose:** Core analytical mechanic — connect evidence to find contradictions and correlations.

**Behavior:**
- Grid-based canvas accessible via UI button (icon: cork board)
- Evidence cards appear as draggable nodes on the board
- Player taps/clicks two nodes to create a connection
- System evaluates the connection against contradiction rules
- Connection edges are color-coded by result

**Connection Colors:**
| Color  | Tag          | Meaning                                    |
|--------|-------------|--------------------------------------------|
| Red    | Kontradiksi  | Evidence pieces contradict each other      |
| Green  | Korelasi     | Evidence pieces support/corroborate each other |
| Yellow | Perlu Konteks | Related but inconclusive, needs more info  |
| Gray   | Tidak Relevan | No meaningful relationship                 |

**Interaction Flow:**
1. Player selects first evidence node (highlighted)
2. Player selects second evidence node
3. System looks up rule for this pair
4. If rule exists → draw colored edge + display tag label
5. If no rule exists → draw gray "Tidak Relevan" edge
6. Connection is saved to board state

**Implementation Notes:**
- Board state persisted in save data
- Canvas can be zoomed/panned on mobile
- Visual feedback: pulsing "hint" on evidence not yet connected

---

### 3.4 Claim-Evidence Inspection

**Purpose:** Allow player to directly evaluate NPC claims against evidence.

**Behavior:**
- During NPC dialog, player can pause and enter inspection mode
- Select a claim made by the NPC (system highlights claimable statements)
- Select evidence from inventory to evaluate against the claim
- System returns one of: Dukungan, Kontradiksi, Tidak Terkait

---

### 3.5 NPC Confrontation

**Purpose:** Player uses collected evidence to question NPCs.

**Behavior:**
- Triggered at specific story points (scene CH1_S07)
- Player selects evidence to present to NPC
- NPC response changes based on what evidence was presented
- Relationship state (trust) changes based on confrontation approach

**Confrontation Approaches:**
| Approach           | Effect on Trust  | Effect on Curiosity |
|--------------------|-----------------|---------------------|
| Empathetic         | +trust          | Neutral             |
| Neutral/Factual    | Neutral         | +curiosity          |
| Accusatory         | -trust          | -caution            |
| Irrelevant evidence| -trust, -reputation | No insight gained |

---

## 4. Chapter 1: Awal Rumor

### 4.1 Narrative Synopsis

The player is a student journalist assigned to cover the upcoming school mading (bulletin board) edition. While gathering stories, a viral social media post from an anonymous account (@suarakelas12) accuses student Aldi of misusing OSIS activity funds for personal use. The rumor spreads rapidly through the class WhatsApp group. The player must investigate the truth before the next mading deadline.

### 4.2 Scene Breakdown

| Scene ID    | Title                    | Location           | Key Events                                                    | Evidence Unlocked      |
|-------------|--------------------------|--------------------|---------------------------------------------------------------|------------------------|
| CH1_S00     | Setelah Viral            | School corridor    | Cold open — show Aldi surrounded by whispering students, establish stakes | —                      |
| CH1_S01     | 24 Jam Sebelumnya        | Mading room        | Title card, time rewind, meet team (Lala, Bintang), get mading task | EV_CH1_001             |
| CH1_S02     | Story Viral              | Smartphone overlay | Player reads @suarakelas12 Instagram story accusing Aldi      | EV_CH1_002             |
| CH1_S03     | Chat Kelas XI-B          | WhatsApp overlay   | Rumor spreads in class chat, players see escalation            | EV_CH1_003, EV_CH1_008 |
| CH1_S04     | Wawancara Aldi           | Corridor           | Player interviews Aldi, gets his initial denial                | EV_CH1_004             |
| CH1_S05     | Arsip OSIS               | OSIS room          | Player finds fund records, schedule docs, treasurer notes      | EV_CH1_005, EV_CH1_006, EV_CH1_007, EV_CH1_009, EV_CH1_010 |
| CH1_S06     | Detective Board Tutorial | Investigation mode | System teaches player how to use the detective board           | —                      |
| CH1_S07     | Konfrontasi Aldi         | Corridor / mading  | Player confronts Aldi using evidence (conditional dialog)      | —                      |
| CH1_S08     | Keputusan Editorial      | Mading room        | Player chooses what/how to publish                             | —                      |
| CH1_S09     | Refleksi Chapter         | Debrief screen     | Outcome reveal + reflection questions                          | —                      |

### 4.3 Scene Flow

```
CH1_S00 (cold open)
    │
    ▼
CH1_S01 (assignment) ──► EV_CH1_001 unlocked
    │
    ▼
CH1_S02 (viral post) ──► EV_CH1_002 unlocked
    │
    ▼
CH1_S03 (class chat) ──► EV_CH1_003, EV_CH1_008 unlocked
    │
    ▼
CH1_S04 (interview Aldi) ──► EV_CH1_004 unlocked
    │
    ▼
CH1_S05 (OSIS archive) ──► EV_CH1_005, EV_CH1_006, EV_CH1_007, EV_CH1_009, EV_CH1_010 unlocked
    │
    ▼
CH1_S06 (board tutorial) ──► Player must connect at least 1 contradiction rule
    │
    ▼
CH1_S07 (confrontation) ──► Conditional dialog based on board state
    │
    ▼
CH1_S08 (editorial decision) ──► Player picks one of 4 options
    │
    ▼
CH1_S09 (reflection) ──► Outcome + learning summary
```

---

## 5. Evidence & Detective Board

### 5.1 Evidence Registry — Chapter 1

| ID          | Title                     | Type           | Credibility | Scene      | Description                                                                 |
|-------------|--------------------------|----------------|-------------|------------|-----------------------------------------------------------------------------|
| EV_CH1_001  | Brief Tugas Mading       | document       | High        | CH1_S01    | Official assignment brief for mading team — establishes player's role and deadline |
| EV_CH1_002  | Story Anonim Aldi        | social_post    | Low         | CH1_S02    | Instagram story from @suarakelas12 accusing Aldi of using OSIS funds — **KEY EVIDENCE** |
| EV_CH1_003  | Chat Grup XI-B           | chat           | Medium      | CH1_S03    | Class WhatsApp group messages spreading the rumor with added speculation    |
| EV_CH1_004  | Klarifikasi Aldi         | testimony      | Medium      | CH1_S04    | Aldi's verbal denial: "Aku nggak pernah ambil dana itu untuk keperluan pribadi" |
| EV_CH1_005  | Rekap Dana Kegiatan      | document       | High        | CH1_S05    | OSIS fund recap showing a discrepancy in activity budget                    |
| EV_CH1_006  | Catatan Bendahara        | document       | Medium      | CH1_S05    | Treasurer's personal notes explaining a fund transfer for urgent supplies   |
| EV_CH1_007  | Foto Ruang OSIS          | photo          | Medium      | CH1_S05    | Photo of OSIS room showing schedule board and locked fund box               |
| EV_CH1_008  | Komentar Siswa           | social_comment | Low         | CH1_S03    | Comments on the viral post — speculation, not evidence                      |
| EV_CH1_009  | Jadwal Latihan Basket    | document       | High        | CH1_S05    | Basketball practice schedule showing Aldi was at practice during alleged time — **KEY CONTRADICTION** |
| EV_CH1_010  | Pesan Maya ke Panitia    | chat           | Medium      | CH1_S05    | Maya's message to OSIS committee about fund report access                   |

### 5.2 Contradiction & Correlation Rules

These rules define what happens when the player connects two evidence items on the detective board.

| Rule ID        | Evidence A     | Evidence B     | Result          | Tag           | Color  | Explanation                                                                 |
|----------------|---------------|----------------|-----------------|---------------|--------|-----------------------------------------------------------------------------|
| CH1_RULE_001   | EV_CH1_002    | EV_CH1_009     | **Kontradiksi** | Key Finding   | Red    | The viral post claims Aldi took funds at a specific time, but the basketball schedule proves Aldi was at practice then — **REQUIRED PATH** |
| CH1_RULE_002   | EV_CH1_002    | EV_CH1_005     | Perlu Konteks   | Partial Match | Yellow | Fund discrepancy is real, but nothing directly links Aldi to the misuse   |
| CH1_RULE_003   | EV_CH1_005    | EV_CH1_006     | **Korelasi**    | Explanation   | Green  | Treasurer notes explain the fund discrepancy — it was an authorized transfer |
| CH1_RULE_004   | EV_CH1_003    | EV_CH1_008     | Korelasi Lemah  | Rumor Echo    | Yellow | Chat and comments only prove the rumor is spreading, not that it's true   |
| CH1_RULE_005   | EV_CH1_006    | EV_CH1_010     | Korelasi        | Lead          | Green  | Maya had access to fund reports — possible alternative explanation          |

**Required Path:**
The player **must** discover CH1_RULE_001 (the key contradiction) to unlock the "Strong" outcome path. This is the core educational moment: the schedule proves Aldi couldn't have done what the rumor claims.

### 5.3 Board Tutorial (CH1_S06)

The tutorial teaches the player:
1. How to place evidence on the board (drag from inventory)
2. How to connect two items (tap first, then tap second)
3. How to read connection colors and tags
4. The player must successfully connect EV_CH1_002 + EV_CH1_009 to proceed
5. Tutorial hint system: if player hasn't found the key contradiction after 3 wrong attempts, highlight the correct pair

---

## 6. NPC Confrontation System

### 6.1 Confrontation Scene (CH1_S07)

**Location:** School corridor or mading room
**NPC:** Aldi
**Trigger:** After detective board tutorial

### 6.2 Confrontation Dialog Branches

The dialog tree changes based on what the player has on their detective board:

| Board State                          | Aldi's Response                                    | Trust Impact    |
|--------------------------------------|----------------------------------------------------|-----------------|
| Key contradiction found (RULE_001)   | Aldi relieved, shares more detail about practice  | +20 trust_aldi  |
| Only RULE_002 (context needed)       | Aldi defensive but cooperative                     | +5 trust_aldi   |
| No relevant connections              | Aldi frustrated, conversation stalls               | -10 trust_aldi  |
| Accusatory approach with weak evidence | Aldi walks away, rumors intensify                 | -25 trust_aldi, +15 rumor_spread |

### 6.3 Confrontation Choices

Player selects how to approach Aldi:

1. **"Aldi, aku menemukan jadwal latihan basket kamu..."** (Factual, empathetic)
   - Requires: CH1_RULE_001 found
   - Effect: Aldi opens up, trust +20

2. **"Ada selisih di dana OSIS. Kamu tau sesuatu?"** (Neutral)
   - Requires: EV_CH1_005 collected
   - Effect: Aldi explains, trust +5

3. **"Orang-orang bilang kamu pakai dana OSIS."** (Accusatory)
   - Requires: None
   - Effect: Aldi defensive, trust -15, rumor_spread +10

4. **"Kamu harus klarifikasi sekarang!"** (Pressuring)
   - Requires: None
   - Effect: Aldi stressed, trust -20

---

## 7. Editorial Decision & Outcomes

### 7.1 Decision Scene (CH1_S08)

After confrontation, the player must decide what to publish for the mading edition.

### 7.2 Editorial Options

| Option | Title                                                             | Description                                                                 | Requires              |
|--------|------------------------------------------------------------------|-----------------------------------------------------------------------------|-----------------------|
| 1      | **Terbitkan Cepat**: "Aldi Diduga Pakai Dana OSIS"               | Publish the viral claim as-is to get clicks                                  | None                  |
| 2      | **Tunda Semua Publikasi**                                        | Don't publish anything until more information is available                   | None                  |
| 3      | **Terbitkan Klarifikasi Sementara**: "Yang Sudah Terverifikasi dan Yang Masih Perlu Dicek" | Publish verified facts + note what's still unverified                        | CH1_RULE_001 found    |
| 4      | **Buat Imbauan Digital**: "Jangan Sebar Tuduhan Tanpa Konteks"   | Publish a general awareness post about unverified accusations                | None                  |

### 7.3 Outcome Tiers

| Tier              | Requirements                                                                                      | Result Description                                                                 |
|-------------------|---------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------|
| **Strong**        | Found CH1_RULE_001 + confronted responsibly (option 1 or 2 in confrontation) + chose editorial option 3 | Best outcome: Aldi vindicated, readers learn about verification, player reputation up |
| **Partial**       | Aware rumor is weak but didn't find CH1_RULE_001; chose option 2 or 4                              | Decent outcome: no harm done, but the real story isn't told                        |
| **Failure**       | Chose editorial option 1 (publish fast)                                                           | Harmful outcome: rumor spreads further, Aldi harmed, player reputation down        |
| **Wrong Confrontation** | Pressured Aldi with irrelevant evidence (option 3 or 4 in confrontation)                  | Aldi withdraws, player loses trust, story incomplete                               |

### 7.4 Outcome Effects

| Variable          | Strong | Partial | Failure | Wrong Confrontation |
|-------------------|--------|---------|---------|---------------------|
| curiosity_score   | +20    | +10     | -5      | +5                  |
| caution_score     | +15    | +10     | -20     | -10                 |
| reputation        | +25    | +10     | -30     | -15                 |
| credibility_score | +25    | +15     | -25     | -10                 |
| rumor_spread      | -20    | -5      | +30     | +10                 |
| evidence_quality  | +20    | +10     | -15     | -5                  |
| trust_aldi        | +20    | +10     | -25     | -20                 |

---

## 8. Player State & Variables

### 8.1 Core Player Variables

```json
{
  "curiosity_score": 50,       // 0-100, how thoroughly the player investigates
  "caution_score": 50,         // 0-100, how careful the player is with claims
  "reputation": 50,            // 0-100, school perception of the player
  "credibility_score": 50,     // 0-100, professional credibility as journalist
  "rumor_spread": 30,          // 0-100, how much the rumor has spread (lower is better)
  "evidence_quality": 0        // 0-100, overall quality of evidence collected
}
```

**Initialization (Chapter 1 start):**
- curiosity_score: 50
- caution_score: 50
- reputation: 50
- credibility_score: 50
- rumor_spread: 30 (already started spreading)
- evidence_quality: 0

### 8.2 Relationship State

```json
{
  "trust_lala": 60,        // Fellow journalist teammate
  "trust_aldi": 40,        // The accused student (starts skeptical)
  "trust_bintang": 55,     // Another teammate
  "trust_citra": 50,       // Classmate
  "trust_rendra": 50,      // Classmate
  "trust_pak_ardi": 50     // Teacher advisor
}
```

**Range:** 0–100 per NPC. Affects dialog options and endings in later chapters.

### 8.3 Board State

```json
{
  "evidence_collected": ["EV_CH1_001", "EV_CH1_002", ...],
  "connections": [
    {
      "from": "EV_CH1_002",
      "to": "EV_CH1_009",
      "rule_id": "CH1_RULE_001",
      "result": "Kontradiksi"
    }
  ],
  "confrontation_completed": false,
  "editorial_decision": null
}
```

---

## 9. Truth Table

The definitive truth about Chapter 1 events. This is the internal game state that determines what's actually true — the player's goal is to discover it.

| Claim | Verdict | Explanation |
|-------|---------|-------------|
| Ada selisih kas kegiatan OSIS | **BENAR** | The fund discrepancy is real, but the cause is unclear to the player initially |
| Aldi memakai dana OSIS untuk acara pribadi | **TIDAK TERBUKTI** | No evidence supports this — the rumor is false |
| Aldi ceroboh dalam administrasi | **BENAR (skala kecil)** | Minor administrative issues, but not theft |
| Story @suarakelas12 dapat dipercaya | **KREDIBILITAS RENDAH** | Anonymous, unverifiable, emotionally charged |
| Chat kelas membuktikan rumor | **TIDAK** | Chat only proves the rumor is spreading, not that it's true |
| Maya punya akses ke laporan kas | **BENAR** | This is a lead, not proof of wrongdoing — a thread for future chapters |

---

## 10. UI/UX Specifications

### 10.1 Layout (Landscape 16:9)

```
┌──────────────────────────────────────────────────────────┐
│  [Menu] [Save]              Chapter Title          [⚙️]  │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │                                                    │  │
│  │              BACKGROUND / SCENE ART                │  │
│  │                                                    │  │
│  │              CHARACTER PORTRAITS                   │  │
│  │              (left/right positioned)               │  │
│  │                                                    │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │ Speaker Name                                       │  │
│  │ Dialog text with typewriter effect...              │  │
│  │                                                    │  │
│  │  [Choice A]  [Choice B]  (when applicable)         │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  [🔍 Evidence] [📋 Board] [💬 Inventory]   [▶️ Next]     │
└──────────────────────────────────────────────────────────┘
```

### 10.2 UI Components

| Component            | Trigger              | Behavior                                      |
|----------------------|----------------------|-----------------------------------------------|
| Dialog Box           | Always visible       | Bottom 30%, typewriter text, tap to advance   |
| Choice Buttons       | Story branching      | Appear inside dialog box area                  |
| Evidence Button      | Tap magnifying glass | Opens evidence card overlay                    |
| Board Button         | Tap clipboard icon   | Opens detective board fullscreen overlay       |
| Smartphone Overlay   | Scene CH1_S02/CH1_S03| Fullscreen mock phone UI for social/chat      |
| Save Indicator       | Auto-save            | Small icon flash in corner                     |
| Settings             | Tap gear icon        | Volume, text speed, voice toggle               |

### 10.3 Overlays

**Smartphone Overlay (CH1_S02, CH1_S03):**
- Simulates Instagram story view (CH1_S02)
- Simulates WhatsApp chat (CH1_S03)
- Swipe/tap to advance messages
- Evidence items unlock by reading through

**Evidence Detail Overlay:**
- Card expansion from list
- Shows: image/icon, title, type badge, full text, source, credibility meter
- "Add to Board" button if not yet added

**Detective Board Overlay:**
- Fullscreen canvas
- Evidence nodes draggable
- Connection creation via double-tap or long-press-then-tap
- Tag label popup on connection creation
- Toolbar: clear board, hint button (limited uses)

---

## 11. Audio & TTS

### 11.1 Text-to-Speech (TTS)

**Purpose:** Accessibility and immersion for players who prefer audio.

**Implementation:**
- Pre-generated audio files using Edge TTS (Microsoft)
- One audio file per dialog line per scene
- Indonesian voice model
- Toggle on/off in settings
- Audio plays automatically with dialog (if enabled)
- File naming: `vo_{scene_id}_{line_index}.mp3`
- Storage: `/assets/audio/vo/CH1/`

### 11.2 Background Music

| Scene Type         | Mood          | Track              |
|--------------------|---------------|--------------------|
| Normal school      | Calm, ambient | `bgm_school.mp3`   |
| Investigation      | Tense, curious | `bgm_detective.mp3` |
| Confrontation      | Dramatic      | `bgm_confront.mp3` |
| Reflection         | Thoughtful    | `bgm_reflect.mp3`  |
| Viral/social media | Digital, fast | `bgm_social.mp3`   |

### 11.3 Sound Effects

| Event                | Sound File            |
|----------------------|-----------------------|
| Evidence unlock      | `sfx_evidence.mp3`    |
| Connection created   | `sfx_connect.mp3`     |
| Contradiction found  | `sfx_contradiction.mp3`|
| Choice selected      | `sfx_select.mp3`      |
| Scene transition     | `sfx_transition.mp3`  |

### 11.4 Audio Settings

```json
{
  "master_volume": 80,      // 0-100
  "bgm_volume": 70,         // 0-100
  "sfx_volume": 80,         // 0-100
  "voice_volume": 90,       // 0-100
  "tts_enabled": true,      // boolean
  "text_speed": "normal"    // slow | normal | fast
}
```

---

## 12. Save System

### 12.1 Auto-Save

- Triggered at the start of every scene transition
- Saves to `localStorage` (browser storage)
- Save key: `sebelum_viral_autosave`
- Stores: current scene ID, player variables, relationship state, board state, evidence inventory, editorial decisions

### 12.2 Manual Save/Load

- 3 manual save slots
- Save button accessible from menu bar
- Load button accessible from main menu
- Save data includes: timestamp, scene thumbnail, player stats preview

### 12.3 Save Data Schema

```json
{
  "version": "1.0",
  "timestamp": "2025-06-14T10:30:00Z",
  "current_scene": "CH1_S05",
  "chapter": 1,
  "player": {
    "curiosity_score": 55,
    "caution_score": 50,
    "reputation": 50,
    "credibility_score": 50,
    "rumor_spread": 30,
    "evidence_quality": 10
  },
  "relationships": {
    "trust_lala": 60,
    "trust_aldi": 40,
    "trust_bintang": 55,
    "trust_citra": 50,
    "trust_rendra": 50,
    "trust_pak_ardi": 50
  },
  "inventory": ["EV_CH1_001", "EV_CH1_002", "EV_CH1_003"],
  "board": {
    "connections": [
      {
        "from": "EV_CH1_002",
        "to": "EV_CH1_003",
        "rule_id": "CH1_RULE_004",
        "result": "Korelasi Lemah"
      }
    ]
  },
  "flags": {
    "CH1_S06_tutorial_completed": false,
    "CH1_S07_confrontation_done": false,
    "CH1_S08_decision": null,
    "CH1_outcome": null
  },
  "settings": {
    "master_volume": 80,
    "bgm_volume": 70,
    "sfx_volume": 80,
    "voice_volume": 90,
    "tts_enabled": true,
    "text_speed": "normal"
  }
}
```

---

## 13. Feature Priority Matrix

### 13.1 Core Features (Must Have — P0)

| #  | Feature                   | Description                                                  |
|----|--------------------------|--------------------------------------------------------------|
| 1  | Visual Novel Engine      | Dialog system, typewriter effect, choices, scene transitions  |
| 2  | Evidence Inventory       | Card-based list, unlock logic, detail view                   |
| 3  | Detective Board          | Grid canvas, node connections, rule evaluation, color-coded edges |
| 4  | Contradiction Rules      | 5 rules with correct evaluations                             |
| 5  | NPC Confrontation        | Conditional dialog tree based on evidence                    |
| 6  | Editorial Decision       | 4 options with 4 outcome tiers                               |
| 7  | Reflection System        | Debrief screen with outcome + learning summary               |
| 8  | Auto-Save                | Per-scene auto-save to localStorage                          |
| 9  | Chapter 1 Content        | All 10 scenes, 10 evidence items, full narrative             |
| 10 | Mobile-First Layout      | Responsive 16:9 landscape, touch-friendly                    |

### 13.2 Important Features (Should Have — P1)

| #  | Feature                   | Description                                                  |
|----|--------------------------|--------------------------------------------------------------|
| 11 | Smartphone Overlays      | Instagram story and WhatsApp chat simulation                 |
| 12 | TTS Voice                | Pre-generated Edge TTS per dialog line, toggle on/off        |
| 13 | Settings Menu            | Volume controls, text speed, voice toggle                    |
| 14 | Manual Save/Load         | 3 save slots with preview                                    |
| 15 | Background Music         | Scene-appropriate BGM with volume control                    |
| 16 | Sound Effects            | Evidence unlock, connection, transitions                     |

### 13.3 Nice-to-Have Features (Could Have — P2)

| #  | Feature                   | Description                                                  |
|----|--------------------------|--------------------------------------------------------------|
| 17 | Tutorial/Onboarding      | First-time player guide for VN + detective board             |
| 18 | Gallery Mode             | Unlock CGs and replay scenes                                 |
| 19 | Statistics Page          | Choices made, evidence found, connections discovered          |
| 20 | Chapter Select           | Replay chapters after completing once                        |
| 21 | Achievement System       | Badges for different play styles                             |
| 22 | Share Results            | Export reflection summary as image                           |

---

## 14. Technical Notes

### 14.1 Platform Requirements

- **Runtime:** Modern web browser (Chrome 90+, Safari 14+, Firefox 88+, Edge 90+)
- **Orientation:** Landscape locked (CSS `orientation: landscape` media query)
- **Resolution:** Design for 1280×720, scale responsively
- **Storage:** localStorage for saves (minimum 5MB available)
- **Network:** Initial load only (all assets bundled), except TTS audio streaming

### 14.2 Asset Specifications

| Asset Type       | Format     | Max Size Per File | Notes                          |
|-----------------|------------|-------------------|--------------------------------|
| Background art  | WebP/PNG   | 200KB             | 1280×720, scene backgrounds    |
| Character art   | WebP/PNG   | 100KB per emotion | Transparent PNG, ~400px wide   |
| UI elements     | SVG/WebP   | 50KB              | Icons, buttons, frames         |
| BGM             | MP3/OGG    | 1MB per track     | Loop-ready, 60-120s            |
| SFX             | MP3/OGG    | 50KB per clip     | Short clips, <3s               |
| TTS voice       | MP3        | 200KB per line    | Pre-generated, ~10-15s per line|
| Dialog data     | JSON       | 5KB per scene     | Text, metadata, branching      |

### 14.3 Data Architecture

```
/data/
  /chapters/
    /chapter1/
      scenes.json          # All scene definitions, dialog trees
      evidence.json        # Evidence registry with metadata
      rules.json           # Contradiction/correlation rules
      outcomes.json        # Outcome tier definitions and effects
  /characters/
    characters.json        # Character definitions, portraits mapping
  /settings/
    defaults.json          # Default player variables and settings
/assets/
  /images/
    /backgrounds/          # Scene backgrounds
    /characters/           # Character portraits (per emotion)
    /ui/                   # UI elements, icons
    /evidence/             # Evidence card artwork
  /audio/
    /bgm/                  # Background music tracks
    /sfx/                  # Sound effects
    /vo/CH1/               # TTS voice files for Chapter 1
/src/
  /engine/                 # Core game engine modules
  /systems/                # Game systems (evidence, board, confrontation)
  /scenes/                 # Scene-specific logic
  /ui/                     # UI components
```

### 14.4 Key Engine Requirements

1. **Scene Manager** — Load and transition between scenes, manage scene state
2. **Dialog System** — Parse dialog JSON, typewriter rendering, choice handling
3. **Inventory System** — Evidence collection, storage, and retrieval
4. **Board System** — Canvas-based node graph, connection evaluation engine
5. **State Manager** — Player variables, relationships, flags, save/load
6. **Overlay Manager** — Smartphone UI, evidence detail, settings, board fullscreen
7. **Audio Manager** — BGM, SFX, TTS playback with volume controls

### 14.5 Browser Compatibility

| Browser     | Min Version | Status      |
|------------|-------------|-------------|
| Chrome     | 90+         | Primary     |
| Safari iOS | 14+         | Primary     |
| Firefox    | 88+         | Secondary   |
| Edge       | 90+         | Secondary   |
| Samsung Internet | 14+   | Secondary   |

### 14.6 Performance Targets

| Metric                    | Target          |
|--------------------------|-----------------|
| First Contentful Paint   | < 2 seconds     |
| Time to Interactive      | < 3 seconds     |
| Scene Transition         | < 500ms         |
| Board Connection Eval    | < 100ms         |
| Save/Load                | < 200ms         |
| Total Chapter 1 Assets   | < 10MB          |

---

## Appendix A: Character Reference

| Character     | Role                  | Portrait Set               | Notes                              |
|--------------|-----------------------|----------------------------|------------------------------------|
| Player       | Student journalist    | None (1st person)          | Name customizable                  |
| Aldi         | Accused student       | neutral, sad, defensive, relieved | Target of the rumor          |
| Lala         | Teammate / journalist | neutral, happy, concerned  | Helpful, asks good questions       |
| Bintang      | Teammate / editor     | neutral, thinking, serious | Cautious, pushes for verification  |
| Citra        | Classmate             | neutral, gossiping, shocked| Spreader of rumor                  |
| Rendra       | Classmate             | neutral, angry, confused   | Aldi's friend, defensive           |
| Pak Ardi     | Teacher advisor       | neutral, stern, approving  | Guides ethical journalism          |
| Maya         | OSIS treasurer        | neutral, nervous           | Has access to fund records         |

---

## Appendix B: Glossary

| Term              | Definition                                              |
|-------------------|---------------------------------------------------------|
| Mading             | Majalah Dinding — school wall bulletin board            |
| OSIS               | Organisasi Siswa Intra Sekolah — student council        |
| Story              | Instagram Story — 24-hour social media post             |
| Viral              | Content that spreads rapidly online                     |
| Klarifikasi        | Clarification                                           |
| Kontradiksi        | Contradiction                                           |
| Korelasi           | Correlation                                             |
| Kredibilitas       | Credibility                                             |
| Bendahara          | Treasurer                                               |
| Imbauan            | Appeal/advisory                                         |
| Terverifikasi      | Verified                                                |

---

*End of Document*
