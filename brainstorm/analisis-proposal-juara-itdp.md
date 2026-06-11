# Analisis Proposal Juara LIDM ITDP — "Dewan Bengawan"

> **Sumber**: Draft Proposal LIDM 2026 — Fajari Arkan Fadhlurrahman, Universitas Pendidikan Indonesia
> **Divisi**: ITDP (Inovasi Teknologi Digital Pendidikan)
> **Produk**: *Dewan Bengawan* — Gim serius mitigasi banjir berbasis Cellular Automata 3D
> **Tujuan analisis**: Menggali pola pikir, struktur argumen, dan pendekatan yang membuat proposal ini unggul, untuk ditiru dalam pengembangan ide sendiri.

---

## Daftar Isi

1. [Struktur Proposal](#1-struktur-proposal)
2. [Analisis Pola Pikir Per-Bagian](#2-analisis-pola-pikir-per-bagian)
   - [2.1. Abstrak](#21-abstrak)
   - [2.2. Latar Belakang](#22-latar-belakang)
   - [2.3. Tujuan dan Manfaat](#23-tujuan-dan-manfaat)
   - [2.4. Metode Pengembangan](#24-metode-pengembangan)
   - [2.5. Analisis Fungsional Teknologi](#25-analisis-fungsional-teknologi)
   - [2.6. Desain Produk](#26-desain-produk)
   - [2.7. Rencana Implementasi dan Validasi](#27-rencana-implementasi-dan-validasi)
3. [Pola Pikir Inti (Yang Harus Ditiru)](#3-pola-pikir-inti-yang-harus-ditiru)
4. [Checklist Kekuatan Proposal Ini](#4-checklist-kekuatan-proposal-ini)
5. [Rencana Aksi: Terapkan Pola ke Ide Kita](#5-rencana-aksi-terapkan-pola-ke-ide-kita)
   - [5.1. Data Nasional](#51-data-nasional)
   - [5.2. Kurikulum](#52-kurikulum)
   - [5.3. Gap Analysis](#53-gap-analysis)
   - [5.4. Novelty / Uniqueness](#54-novelty--uniqueness)
   - [5.5. Desain Produk](#55-desain-produk)
   - [5.6. Validasi](#56-validasi)
   - [5.7. Timeline](#57-timeline)

---

## 1. Struktur Proposal

```
1.  ABSTRAK                           → Ringkasan eksekutif (1 halaman)
2.  LATAR BELAKANG                    → Data → Kurikulum → 3 Gap → Solusi
3.  TUJUAN DAN MANFAAT                → Tujuan umum → khusus → indikator → manfaat
4.  METODE PENGEMBANGAN PRODUK        → ADDIE (5 fase) + Iterative Development
5.  ANALISIS FUNGSIONAL TEKNOLOGI     → Functional Reqs → Non-Functional → Use Case
6.  DESAIN PRODUK TEKNOLOGI DIGITAL   → Arsitektur → UI/UX → Model Data → Tech Stack
7.  RENCANA IMPLEMENTASI & VALIDASI   → Timeline → Validasi → Indikator → Mitigasi Risiko
8.  DAFTAR PUSTAKA                    → 20+ referensi akademik
9.  LAMPIRAN                          → User journey, dll.
```

**Ciri khas**: Struktur sangat sistematis, setiap bagian punya *output konkret*, bukan deskripsi abstrak.

---

## 2. Analisis Pola Pikir Per-Bagian

### 2.1. Abstrak

**Apa yang mereka lakukan:**

| Elemen | Isi | Fungsi |
|--------|-----|--------|
| **Pembuka** | "Capaian Pembelajaran Geografi Fase F mengamanatkan…" | Langsung kaitkan dengan kurikulum resmi |
| **Masalah** | Pembelajaran konvensional sulit hadirkan dinamika kausalitas real-time | Spesifik, bukan "pendidikan kurang" |
| **Riset pendukung** | (Ewing dkk., 2022; Sim & Kim, 2025; Idris dkk., 2025) | Ada bukti akademik |
| **Solusi** | "Dewan Bengawan adalah gim serius berbasis Cellular Automata 3D" | Nama + teknologi langsung disebut |
| **Cara kerja** | Pemain sebagai anggota dewan tata ruang DAS, 4 siklus plan–build–simulate–harvest | Gameplay konkret |
| **Inovasi inti** | "socio-technical coupling: efektivitas kebijakan dimodulasi oleh reputasi pemain dan tingkat pendidikan publik" | Novelty jelas, beda dari yang lain |
| **Validasi** | Pilot test pre-post berpikir spasial-kritis | Dampak terukur |
| **Luaran** | Prototipe, artikel ilmiah, HKI | Output konkret |

**Pola pikir**: Abstrak bukan sekedar ringkasan — ini **pitch deck**. Dalam 200 kata, juri langsung tau:
- Masalahnya apa (dengan bukti)
- Produknya apa
- Kenapa ini baru (novelty)
- Dampaknya terukur
- Outputnya apa

### 2.2. Latar Belakang

Ini bagian **terkuat**. Struktur mikro yang bisa diurai:

**Paragraf 1 — Data Nasional (Pembuka)**
> "Indonesia menghadapi krisis bencana hidrometeorologi yang kian eskalatif. Hingga akhir tahun 2025, BNPB mencatat sebanyak 4.727 kejadian bencana, dengan dominasi mencapai 99,26% sebagai bencana hidrometeorologi."

- **Mulai dari data keras terbaru** → pembaca langsung sadar "ini masalah serius"
- Sumber jelas: BNPB 2025 + link
- Diikuti grafik (Gambar 1) — visual memperkuat

**Pola**: Masalah global/nasional → lalu sempitkan ke ranah pendidikan.

**Paragraf 2 — Kurikulum (Kaitan dengan Pendidikan)**
> "Kurikulum Merdeka menjawab kebutuhan ini melalui Capaian Pembelajaran Geografi Fase F..."

- Dari masalah nasional → tarik ke **amanat kurikulum**
- CP disebut spesifik: elemen Pemahaman Konsep dan Keterampilan Proses
- Sumber: BSKAP, 2024

**Pola**: Data nasional → "Nah, kurikulum sebenarnya sudah mengamanatkan ini, tapi..."

**Paragraf 3-4 — Tiga Kesenjangan (Gap Analysis)**
> "Namun, ada kesenjangan substansial antara amanat kurikulum dan media pembelajaran yang tersedia. **Pertama**, ... **Kedua**, ... **Ketiga**,..."

Tiga gap yang diidentifikasi:

| Gap | Masalah | Sumber |
|-----|---------|--------|
| **1** | Media konvensional gagal representasikan dinamika kausal real-time | Idris dkk., 2025 |
| **2** | Simulator profesional (SWMM, InfoWorks) terlalu lambat untuk interaktif — simulasi 6 jam butuh 8 menit proses | Sim & Kim, 2025 |
| **3** | Game serius mitigasi yang ada cuma fase respons (evakuasi), bukan fase pencegahan tata ruang | Ducatti dkk., 2026 |

**Pola**: Bukan sekedar "media yang ada kurang" — tapi **3 gap spesifik yang masing-masing bersumber dari riset**.

**Paragraf 5 — Kesenjangan Terbesar (The Real Novelty)**
> "Kesenjangan **terbesar** dalam pendidikan mitigasi saat ini terletak pada pengabaian dimensi sosio-teknis."

- Mereka menyebut UU No. 24/2007 dan PP No. 21/2008 → ada **landasan legal**
- "Belum ditemukan media pembelajaran geografi SMA yang mampu memodelkan ketiga pilar (kebijakan, infrastruktur, partisipasi publik) secara coupled"
- Ini **the gap that they fill** — bukan sekedar "membuat game" tapi "memodelkan sesuatu yang belum pernah dimodelkan"

**Pola**: Semakin spesifik gap-nya, semakin jelas novelty-nya.

**Paragraf 6 — Solusi Teknologi (Justifikasi Teknis)**
> "Cellular Automata (CA) menawarkan solusi yang terbukti efisien dan akurat..."

- Bukan sekedar "kami pakai Unity" — tapi **kenapa** CA dipilih
- Dikutip dari Feng dkk., 2023: CA-DUSRM lebih baik dari SWMM
- Dipadukan dengan DOTS Unity — justifikasi teknis yang dalam

**Paragraf 7 — Penutup (Ringkasan Solusi)**
> "Karya ini menjawab tiga kebutuhan sekaligus: (1) akurasi fisis, (2) interaktivitas real-time, (3) pemodelan eksplisit kausalitas sosio-teknis."

- Tabel perbandingan (Tabel 1): Media Konvensional vs Simulator Profesional vs Dewan Bengawan
- Mempertegas posisi mereka di antara solusi yang ada

---

**Kesimpulan Latar Belakang:**

```
DATA NASIONAL (BNPB)
       ↓
AMANAT KURIKULUM (BSKAP)
       ↓
3 GAP SPESIFIK (dari riset)
       ↓
KESENJANGAN TERBESAR → NOVELTY KITA (belum ada yang bisa X)
       ↓
SOLUSI TEKNOLOGI (dengan justifikasi kenapa pilih ini)
       ↓
TABEL PERBANDINGAN (kami vs existing)
```

### 2.3. Tujuan dan Manfaat

**Uniknya**: Mereka punya **Indikator Pencapaian Kompetensi** untuk pengguna (poin 1–7).
Bukan cuma "tujuan" abstrak, tapi:
- Setelah main 45-60 menit, siswa mampu **menganalisis minimal 3 faktor** karakteristik wilayah
- Mampu **merancang peta zonasi mitigasi** dengan justifikasi data simulasi
- Mampu **mengevaluasi trade-off** kebijakan teknis vs partisipatif
- **Menunjukkan empati** pada korban banjir — ada aspek afektif juga!

**Pola**: Tujuan yang **terukur dan observable** — bukan "meningkatkan pemahaman" tapi output spesifik yang bisa dinilai.

### 2.4. Metode Pengembangan

Mereka pake **ADDIE** + **Iterative Development**.

Kenapa ADDIE? "Kesesuaiannya dengan produk media pembelajaran yang menuntut keselarasan antara desain instruksional dan implementasi teknis."

Setiap fase → output konkret:
- Analisis → *learning objective mapping* + *physical parameter sheet*
- Desain → arsitektur Hybrid Voxel-Prefab, desain game loop, UI/UX dengan Cognitive Load Theory
- Pengembangan → Unity DOTS, Job System, Burst Compiler
- Implementasi → pilot deployment di sekolah mitra
- Evaluasi → SUS, rubrik pre-post, observasi, wawancara

**Pola**: Bukan cuma "kami pakai metode waterfall/agile" — tapi **metode yang dipilih karena cocok untuk masalah spesifik**, dan setiap fase ada output.

### 2.5. Analisis Fungsional Teknologi

Ini yang bikin proposal ini beda dari kebanyakan.

**Functional Requirements** (8 fungsi):
Bukan daftar fitur biasa — setiap fungsi punya **nama kode** (F1–F8) dan deskripsi teknis yang jelas:
- F1 → Sistem Zonasi (Painting the Grid)
- F2 → Procedural City Generation
- F3 → Simulasi Hidrologi Cellular Automata
- F4 → Sistem Anggaran dan Kebijakan
- F5 → Sistem Reputasi dan Pendidikan Publik
- F6 → Mode Analisis (Heatmap Overlay)
- F7 → Insight Card Pasca-Siklus
- F8 → Sistem Skor dan Progres

**Non-Functional Requirements** (5 item):
Bukan sekedar "cepat dan mudah dipakai" — tapi **terukur**:
- 30 FPS di grid 128×20×128
- Latensi <100 ms
- SUS Score ≥ 70
- WCAG AA contrast ratio
- Arsitektur data-driven

**Pola**: Technical depth yang bikin juri (yang pasti akademisi/staf pengajar) puas — ini bukan "ide mahasiswa biasa" tapi sudah seperti dokumen teknis beneran.

### 2.6. Desain Produk

**Arsitektur**: 3 lapisan — Data (NativeArray) → Simulasi (Job System + Burst) → Presentasi (Procedural Mesh + GPU Instancing)
- Bukan cuma diagram, tapi **kenapa milih NativeArray?** "cache locality untuk komputasi paralel"

**UI/UX**: Progressive disclosure — 4 siklus memperkenalkan mekanik bertahap
- Siklus 1: zona dasar saja
- Siklus 2: + industri + anggaran
- Siklus 3: + kearifan lokal + heatmap
- Siklus 4: + reputasi-pendidikan publik
- **Landasan teori**: Cognitive Load Theory (Sweller dkk., 2019)

**Tech stack**: Spesifik dan relevan. Bukan "kami pakai React Native" tapi "Unity LTS + URP + DOTS + C# + Job System + Burst Compiler".

### 2.7. Rencana Implementasi dan Validasi

**Timeline**: 4 bulan, per-bulan ada milestone jelas
- Bulan 1 → Foundation
- Bulan 2 → Core Mechanics MVP (ini penting: **video pengembangan ≤3 menit diproduksi akhir bulan 2** — buat seleksi LIDM)
- Bulan 3 → Validation Build
- Bulan 4 → Pilot Test dan Iterasi

**Validasi**: 2 tingkat
1. Formatif (internal tiap 2 minggu) — think-aloud protocol
2. Sumatif (sekolah mitra) — one-group pretest-posttest

**Instrumen validasi:**
- Pre-post test berpikir spasial-kritis berbasis rubrik (divalidasi ahli)
- SUS Score
- Observasi terstruktur
- Wawancara guru
- NASA-TLX (cognitive load)

**Indikator keberhasilan** (terukur semua!):
1. ↑ min 20% pre-post, p < 0.05
2. SUS ≥ 70 (kategori "Good")
3. ≥80% siswa selesaikan 4 siklus
4. Respon positif guru mitra
5. NASA-TLX di kategori moderat

**Mitigasi risiko**:
- Kompleksitas DOTS → modularisasi, prototipe awal, pembagian peran

---

## 3. Pola Pikir Inti (Yang Harus Ditiru)

### 3.1. Bottom-Up Problem Framing

```
┌─────────────────────────────────────────┐
│         DATA NASIONAL / GLOBAL          │  ← Bukan opini
│         (BNPB, Komdigi, BPS, dll)       │
├─────────────────────────────────────────┤
│         KURIKULUM / LEGAL MANDAT        │  ← Kaitkan ke pendidikan
│         (CP, UU, Permendikbud)          │
├─────────────────────────────────────────┤
│      3 GAP SPESIFIK (dari riset)        │  ← Gap 1, 2, 3
│         (masing-masing ada sumber)       │
├─────────────────────────────────────────┤
│    KESENJANGAN TERBESAR = NOVELTY KITA  │  ← "Belum ada yang bisa X"
│         (ini celah yang kita isi)        │
└─────────────────────────────────────────┘
```

### 3.2. Academic Grounding

Setiap klaim → ada sumber. Bukan:
- ❌ "Banyak siswa yang kesulitan..."
- ✅ "Riset Ewing dkk. (2022) menunjukkan kemampuan berpikir spasial siswa masih berada pada kategori sedang..."

Bahkan data nasional pun dikasih sumber dan link.

### 3.3. Gap-Driven Innovation (Bukan Idea-Driven)

Kebanyakan proposal: "Kami punya ide keren, yaitu..."
Proposal ini: "Ini yang **belum ada** di dunia pendidikan → ini yang kami isi → produk kami."

Urutannya:
1. Apa yang sudah ada?
2. Kenapa itu belum cukup?
3. Apa yang belum ada sama sekali?
4. Itulah yang kami buat.

### 3.4. Measurement Obsession

Semua terukur:
- Masalah = data angka
- Gap = teridentifikasi
- Solusi = ada performance spec
- Dampak = indikator keberhasilan dengan threshold numerik

### 3.5. Konteks Indonesia Bukan Tempelan

Kearifan lokal bukan sekedar "kami pake batik di UI" — tapi **bermakna secara mekanis**:
- Kartu "Subak" → memodifikasi variabel hidrologis
- Kartu "Lubuk Larangan" → memengaruhi partisipasi publik
- Ini terintegrasi ke gameplay, bukan hiasan

### 3.6. Technical Depth Tepat Sasaran

Mereka gak perlu terlalu dalam sampai coding — tapi cukup untuk menunjukkan:
- Mereka **paham teknologi** yang dipilih
- Mereka **tahu kenapa** milih itu dibanding alternatif
- Mereka **sadar constraint** teknis (performa, latensi, skalabilitas)

### 3.7. Narrative Arc Proposal

Proposal ini bercerita seperti alur ilmiah:
```
Masalah Besar → Kok bisa? → Ternyata kurikulum sudah amanatkan...
   → Tapi medianya gak ada yang memadai → Apalagi yang paling kurang?
   → Nah, ini celahnya → Kami buat ini untuk mengisinya
   → Begini cara kerjanya → Begini cara ujinya
   → Ini target capaiannya
```

---

## 4. Checklist Kekuatan Proposal Ini

| No | Kekuatan | Ada di Proposal? |
|----|----------|------------------|
| 1 | **Lead dengan data nasional** (bukan asumsi) | ✅ BNPB 2025 |
| 2 | **Kaitan eksplisit dengan kurikulum** + CP spesifik | ✅ Geografi Fase F |
| 3 | **3 gap teridentifikasi**, masing-masing dari riset | ✅ Gap 1, 2, 3 |
| 4 | **Tabel perbandingan** proposisi kami vs existing | ✅ Tabel 1 |
| 5 | **Novelty satu kalimat yang jelas** | ✅ "socio-technical coupling" |
| 6 | **Justifikasi pemilihan teknologi** (kenapa CA, kenapa DOTS) | ✅ Feng dkk., 2023 |
| 7 | **Indikator capaian kompetensi** siswa yang terukur | ✅ Poin 1-7 |
| 8 | **Functional + Non-functional requirements** | ✅ F1-F8 + NFR |
| 9 | **Constraint performa numerik** | ✅ 30 FPS, <100ms, SUS≥70 |
| 10 | **Metode pengembangan formal** (ADDIE) | ✅ |
| 11 | **Landasan teori desain** (Cognitive Load Theory, Flow) | ✅ |
| 12 | **Rencana validasi 2 tingkat** (formatif + sumatif) | ✅ |
| 13 | **Indikator keberhasilan numerik** | ✅ ≥20%, p<0.05, SUS≥70 |
| 14 | **Mitigasi risiko teknis** | ✅ |
| 15 | **Konteks lokal bermakna** (kearifan lokal sebagai mekanik) | ✅ |
| 16 | **Daftar pustaka akademik** (bukan link blog) | ✅ 20+ referensi |
| 17 | **Output konkret** (prototipe, artikel, HKI) | ✅ |

---

## 5. Rencana Aksi: Terapkan Pola ke Ide Kita

> **Ide**: Gim edukasi untuk melatih critical thinking & deteksi hoax bagi pelajar (target SMA ke bawah)
> **Inspirasi gameplay**: Visual Novel × Papers Please

### 5.1. Data Nasional 🔍

**Yang perlu dicari** (PR tim):
| Data | Sumber Potensial | Status |
|------|------------------|--------|
| Jumlah hoax per tahun di Indonesia | Komdigi (1.923 konten di 2024) | ✅ Ditemukan |
| % masyarakat yang tidak bisa bedakan hoax | Mafindo Survei 2024 (60%) | ✅ Ditemukan |
| % remaja yang pernah terpapar hoax | Belum | ❌ Cari |
| % netizen yang tidak verifikasi informasi | ICT Watch (52,2%) | ✅ Ditemukan |
| Dampak hoax pada remaja (psikologis/sosial) | Belum | ❌ Cari |

### 5.2. Kurikulum 📚

**Yang perlu dicari**:

| Mapel | Fase | Topik Relevan | Status |
|-------|------|---------------|--------|
| Informatika | F (Kelas 11-12) | Dampak Sosial Informatika, Literasi Digital, Etika Digital | ✅ CP teridentifikasi |
| PPKn | F | Partisipasi digital bertanggung jawab? | ❌ Cari |
| Mapel lain? | — | — | ❌ |

**PR**: Buka CP Informatika Fase F resmi, cari kata kunci "literasi digital", "etika digital", "dampak sosial informatika". Juga cek apakah ada mata pelajaran "Literasi Digital" sebagai mapel tersendiri.

### 5.3. Gap Analysis 🔎

**Pertanyaan: Apa 3 gap media pembelajaran literasi digital yang ada sekarang?**

Tebakan awal (perlu diverifikasi riset):

| Gap | Hipotesis | Perlu Riset |
|-----|-----------|-------------|
| **1** | Media literasi digital yang ada masih bersifat **pasif** (poster, video, booklet) — belum ada yang membuat siswa **berlatih deteksi hoax secara interaktif** | Cari existing anti-hoax edu games |
| **2** | Game edukasi deteksi hoax yang ada belum mengajarkan **metodologi verifikasi** secara eksplisit (cek sumber, cek tanggal, reverse image, dll) — kebanyakan hanya kuis "hoax atau bukan" | Riset produk kompetitor |
| **3** | Belum ada yang memodelkan **dimensi sosio-teknis penyebaran hoax** — kenapa hoax menyebar, faktor psikologis, echo chamber, bias konfirmasi | Riset literatur |

**Kesenjangan terbesar (candidate novelty)**: Belum ada media pembelajaran yang memodelkan secara eksplisit **siklus hidup hoax + mekanisme psikologis penyebarannya** dalam bentuk simulasi interaktif.

### 5.4. Novelty / Uniqueness 💡

**Candidate angles** (perlu dipilih satu atau dikombinasi):

| Angle | Deskripsi | Contoh Judul |
|-------|-----------|--------------|
| **Papers Please × Hoax Detection** | Mekanik verifikasi dokumen ala Papers Please diterapkan ke konteks deteksi hoax — pemain harus periksa sumber, tanggal, bukti, sebelum memutuskan | "Verifikasi!" |
| **Socio-technical hoax simulation** | Pemain tidak hanya deteksi hoax, tapi juga mengalami **mengapa hoax menyebar** — faktor algoritma, bias, echo chamber | — |
| **Roleplay fact-checker** | Pemain jadi editor/moderator yang harus memverifikasi kontus sebelum publish | "Rubrik Verifikator" |
| **Visual novel × critical thinking** | Narasi interaktif di mana pilihan pemain menentukan apakah hoax menyebar atau tidak — belajar dari konsekuensi | — |

### 5.5. Desain Produk 🎮

**Struktur yang butuh didefinisikan** (PR tim):

| Komponen | Status |
|----------|--------|
| **Nama produk** | ❌ Belum ada |
| **Game loop** | ❌ Belum detail |
| **Target pengguna** | ✅ SMA ke bawah |
| **Platform** | ✅ Website |
| **Core mechanic** (Papers Please-style verification) | ⚠️ Masih konsep |
| **Narrative framework** (Visual Novel) | ⚠️ Masih konsep |
| **Level/scenario design** | ❌ Belum ada |
| **Domain hoax** per level | ⚠️ Campuran, belum detail |
| **Learning objective** → indikator terukur | ❌ Belum ada |
| **Tech stack final** | ❌ Next.js vs Laravel |
| **AI/LLM untuk dynamic content** | ⚠️ Masih diskusi |
| **Non-functional requirements** | ❌ Belum ada |

### 5.6. Validasi 🔬

**Rencana validasi yang perlu dirancang**:

| Komponen | PR |
|----------|----|
| **Sekolah mitra** | Cari SMA untuk pilot test |
| **Desain validasi** | One-group pretest-posttest? |
| **Instrumen** | Tes critical thinking, SUS, wawancara |
| **Indikator keberhasilan** | Minimal improvement berapa %? |

### 5.7. Timeline 📅

**Estimasi** (perlu disesuaikan dengan deadline LIDM 2025: 1 Agt–14 Sep):

| Bulan | Milestone |
|-------|-----------|
| **Sekarang** | Finalisasi konsep + data + kurikulum + gap |
| **Juli 2025** | Penulisan proposal + pembuatan video gagasan |
| **1 Agt – 14 Sep 2025** | Pendaftaran + kirim proposal |
| **Agustus–September** | Development MVP |
| **Sep–Okt** | Seleksi nasional |
| **Okt–Nov** | Penyempurnaan final |
| **1–4 Des 2025** | Final luring |

---

## Catatan Akhir

**Apa yang membuat proposal "Dewan Bengawan" juara bukanlah karena:**

- ❌ Teknologinya canggih (Unity DOTS) semata
- ❌ Grafisnya bagus
- ❌ Idenya unik

**Tapi karena:**

- ✅ Setiap klaim ada **bukti** (data, riset, kurikulum, regulasi)
- ✅ Gap yang mereka isi **sangat spesifik** — "belum ada media yang memodelkan socio-technical coupling"
- ✅ Teknologi dipilih **karena tepat untuk masalah**, bukan karena lagi trend
- ✅ Dampak **terukur** dengan indikator numerik
- ✅ Konteks Indonesia **bermakna** secara mekanis, bukan tempelan
- ✅ Proposal ditulis dengan **kerangka akademik yang rapi** — dari problem framing sampai validasi

**Untuk menang, lakukan hal yang sama, bukan membuat game yang sama.**

---

> **Dokumen ini disusun sebagai panduan analisis dan rencana aksi.**
> Langkah selanjutnya setelah tim menyelesaikan riset data dan kurikulum adalah brainstorming ulang untuk mengisi bagian [PR] di atas.
