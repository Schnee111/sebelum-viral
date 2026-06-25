# Audio Requirements — Sebelum Viral

---

## Background Music (BGM) — 3 tracks

| # | Filename | Mood / Description | Source | Status |
|---|----------|-------------------|--------|--------|
| 1 | BGM_SCHOOL_DAY | Ringan, santai, suasana sekolah normal | DOVA-SYNDROME | Pending |
| 2 | BGM_INVESTIGATION | Fokus, sedikit misterius, detective mood | DOVA-SYNDROME | Pending |
| 3 | BGM_CONFRONTATION | Tegang, serius | DOVA-SYNDROME | Pending |

---

## Sound Effects (SFX) — 6 sounds

| # | Filename | Description | Source | Status |
|---|----------|-------------|--------|--------|
| 1 | sfx_notification | Bukti/chat baru masuk | Freesound | Pending |
| 2 | sfx_click | Klik tombol UI | Freesound | Pending |
| 3 | sfx_evidence_unlock | Evidence baru diperoleh | Freesound | Pending |
| 4 | sfx_edge_connect | Node evidence dihubungkan | Freesound | Pending |
| 5 | sfx_contradiction | Kontradiksi ditemukan | Freesound | Pending |
| 6 | sfx_reflection | Halaman refleksi muncul | Freesound | Pending |

---

## TTS Dialog — Chapter 1

### Engine

- **Primary:** Microsoft Edge TTS (free, neural voices)
- **Fallback:** Web Speech API (browser built-in)

### Voice Mapping

| Character | Voice | Customization |
|-----------|-------|---------------|
| Nala | id-ID-GadisNeural | Pitch/rate tuned per character |
| Lala | id-ID-GadisNeural | Pitch/rate tuned per character |
| Citra | id-ID-GadisNeural | Pitch/rate tuned per character |
| Bu Sari | id-ID-GadisNeural | Pitch/rate tuned per character |
| Maya | id-ID-GadisNeural | Pitch/rate tuned per character |
| Aldi | id-ID-ArdiNeural | Pitch/rate tuned per character |
| Bintang | id-ID-ArdiNeural | Pitch/rate tuned per character |
| Rendra | id-ID-ArdiNeural | Pitch/rate tuned per character |
| Pak Ardi | id-ID-ArdiNeural | Pitch/rate tuned per character |
| Dimas | id-ID-ArdiNeural | Pitch/rate tuned per character |
| Reza | id-ID-ArdiNeural | Pitch/rate tuned per character |

### Dialog Lines

- **Estimated count:** ~50-70 lines for Chapter 1
- **Format:** MP3
- **Naming convention:** `CH1_SXX_DXXX.mp3`
  - `CH1` = Chapter 1
  - `SXX` = Scene number (e.g. S01, S02)
  - `DXXX` = Dialog number within scene (e.g. D001, D002)

| # | Scene | Lines | Status |
|---|-------|-------|--------|
| 1 | CH1_S01 | TBD | Pending |
| 2 | CH1_S02 | TBD | Pending |
| 3 | CH1_S03 | TBD | Pending |
| 4 | CH1_S04 | TBD | Pending |
| 5 | CH1_S05 | TBD | Pending |

*Exact line counts per scene to be filled once script is finalized.*

---

## Summary

| Category | Count | Format | Source |
|----------|-------|--------|--------|
| BGM | 3 | MP3/OGG | DOVA-SYNDROME |
| SFX | 6 | MP3/OGG | Freesound |
| TTS Dialog | ~50-70 | MP3 | Edge TTS / Web Speech API |
