# CHAPTER 1: SEBELUM VIRAL
## Konten Lengkap — Dialog, Adegan, dan Pilihan

---

## CH1_S00: SETELAH VIRAL (Cold Open)

**Setting:** Koridor sekolah SMA Garuda Nusantara — pagi hari
**Background:** `BG_CORRIDOR_MORNING`
**Mood:** Tegang, tidak nyaman
**Characters on screen:** None (narrator over establishing shots)
**Duration:** ~6 dialog lines, no choices

---

### Dialog Sequence

```
NARRATOR | expression=null
"Pagi ini, suasana SMA Garuda Nusantara berbeda."

NARRATOR | expression=null
"Siswa-siswa bergerombol di koridor, bukan untuk bercanda seperti biasa—melainkan untuk membicarakan sesuatu."

SISWA_1 | expression=whisper
"Lo udah lihat story-nya belum? Soal calon ketua OSIS..."

SISWA_2 | expression=shocked
"Gila ya, kalau beneran... padahal dia yang paling populer."

NARRATOR | expression=null
"Di ujung koridor, seorang siswa berjalan sendiri. Kepala tertunduk. Poster kampanye dengan fotonya terlihat disobek di salah satu sudut."

NARRATOR | expression=null
"Namanya Aldi. Dan hari ini, nama dia sudah viral."
```

**Evidence Unlock:** None
**Transition:** `TRANSITION_REWIND` — layar berputar, teks "24 JAM SEBELUMNYA" muncul

---

## CH1_S01: 24 JAM SEBELUMNYA

**Setting:** Ruang Mading — siang hari, setelah pulang sekolah
**Background:** `BG_MADING_ROOM`
**Mood:** Santai, hari biasa
**Characters on screen:** Nala (center-left), Lala (center-right)
**Evidence Unlock:** `EV_CH1_001` (Brief Tugas Mading)
**Duration:** ~10 dialog lines + 1 choice

---

### Dialog Sequence

```
LALA | expression=smile
"Hei, Nala! Akhirnya datang juga. Aku udah nungguin dari tadi."

NALA | expression=neutral
"Maaf, tadi les molor. Ini pertama kali aku ke ruang mading, jadi... agak bingung."

LALA | expression=explain
"Nggak apa-apa. Jadi gini—kamu itu anggota baru tim mading, kan? Tugas pertama kamu: liputan pemilihan OSIS."

NALA | expression=curious
"Pemilihan OSIS? Serius? Itu kan isu yang lumayan sensitif..."

LALA | expression=smile
"Makanya justru menarik! Kamu bisa interview calon, liput debat, dan tulis artikel yang netral. Gitu konsepnya."

LALA | expression=explain
"Yang penting: kita nggak cuma nulis opini. Kita verifikasi fakta dulu sebelum publish. Itu prinsip jurnalisme."

NALA | expression=thinking
"Verifikasi fakta... jadi kita harus cek sumber sebelum nulis?"

LALA | expression=serious
"Tepat. Kalau kita asal tulis tanpa cek, kita bisa ikut menyebarkan misinformasi. Dan itu bahaya banget, apalagi soal pemilihan."

[SISTEM] | expression=null
"📋 Brief Tugas Mading ditambahkan ke arsip investigasi."

LALA | expression=thinking
"Nah, ada satu hal lagi yang perlu kamu tahu. Ada akun anonim yang belakangan sering posting soal calon OSIS..."

LALA | expression=worried
"Namanya @suarakelas12. Entah siapa yang manage. Tapi postingannya mulai rame."
```

### Choice 1: Respons Nala

**Option A:** "Kita cek sumbernya dulu sebelum percaya apa pun."
- Effect: `caution += 1`
- Response:

```
LALA | expression=impressed
"Bagus! Itu attitude yang tepat buat jurnalis mading."
```

**Option B:** "Kalau udah viral, kita harus cepat tulis juga dong!"
- Effect: `speed += 1`
- Response:

```
LALA | expression=concerned
"Hati-hati, Nal. Kecepatan tanpa akurasi itu bisa jadi masalah. Tapi... ya, kita memang harus sigap."
```

**Transition:** Nala's phone buzzes — transition to `CH1_S02`

---

## CH1_S02: STORY VIRAL

**Setting:** Smartphone overlay — Nala melihat Instagram story
**Background:** `BG_PHONE_INSTAGRAM`
**Mood:** Kaget, penasaran
**Characters on screen:** Phone UI overlay
**Evidence Unlock:** `EV_CH1_002` (Story Anonim Aldi)
**Duration:** ~5 dialog lines, no choices

---

### Social Post Content (Visual)

```
┌─────────────────────────────────┐
│  @suarakelas12                  │
│  ─────────────────────────────  │
│  ⚠️ INFO DAPAT                  │
│                                 │
│  Ada yang tahu? Katanya calon   │
│  ketua OSIS A pakai dana OSIS   │
│  buat acara pribadi. Cek rekap  │
│  dana deh... 🤔                 │
│                                 │
│  Kalau bener, kok bisa lolos    │
│  seleksi ya?                    │
│                                 │
│  #BersihkanOSIS #SMAgaruda     │
│                                 │
│  💬 48 balasan  ↗️ dibagikan 23x│
└─────────────────────────────────┘
```

### Dialog Sequence

```
NALA | expression=shocked
"Wah... ini nih yang tadi Lala bilang. Langsung nge-cap calon A pakai dana OSIS."

NALA | expression=thinking
"Tapi... nggak ada bukti sama sekali. Cuma 'katanya' doang. Siapa sumbernya?"

[SISTEM] | expression=null
"📱 Story @suarakelas12 disimpan ke arsip investigasi."

NALA | expression=concerned
"48 balasan... dan udah dibagikan 23 kali. Ini cepet banget penyebarannya."

NALA | expression=thinking
"Calon A... itu pasti Aldi. Dia kan calon ketua yang paling populer. Harus cari tahu kebenarannya."
```

**Transition:** `TRANSITION_PHONE` — overlay berubah ke WhatsApp

---

## CH1_S03: CHAT KELAS XI-B

**Setting:** WhatsApp group overlay
**Background:** `BG_PHONE_WHATSAPP`
**Mood:** Gosip, ramai
**Characters on screen:** Chat UI with multiple senders
**Evidence Unlock:** `EV_CH1_003` (Chat Grup XI-B)
**Duration:** ~8 chat bubbles, no choices

---

### Chat Messages

```
┌─────────────────────────────────────┐
│  📱 Grup: XI-B Angkatan 🔥          │
│  ────────────────────────────────── │
│                                     │
│  BINTANG (14:23)                    │
│  "WOI ADA YANG LIHAT STORY         │
│  @suarakelas12???"                  │
│                                     │
│  CITRA (14:23)                      │
│  "Udah dong 😱 Gila sih kalau      │
│  beneran"                           │
│                                     │
│  DEWA (14:24)                       │
│  "Hahaha akhirnya ketahuan juga     │
│  tuh orang"                         │
│                                     │
│  BINTANG (14:24)                    │
│  "Eh tapi emang bener nggak sih?   │
│  Kok kayak nggak ada bukti"         │
│                                     │
│  CITRA (14:25)                      │
│  "Lagian kalau bener, masa iya     │
│  lolos seleksi? Pasti ada           │
│  pengecekan dong"                   │
│                                     │
│  DEWA (14:25)                       │
│  "Ya kali aja lolos karena          │
│  'koneksi'"                         │
│                                     │
│  BINTANG (14:26)                    │
│  "Jangan asal tuduh lah. Kita      │
│  nggak tahu kronologinya"           │
│                                     │
│  CITRA (14:26)                      │
│  "Tapi kalau emang nggak salah,    │
│  ngapain dia diem aja?"             │
│                                     │
└─────────────────────────────────────┘
```

### Narration Over Chat

```
NALA | expression=thinking
"Menyebar dengan cepat. Dan lihat—ada yang langsung percaya, ada yang skeptis."

NALA | expression=concerned
"Tapi yang percaya lebih banyak. Ini yang bahaya dari hoaks—sekali viral, susah dikendalikan."

[SISTEM] | expression=null
"💬 Chat Grup XI-B disimpan ke arsip investigasi."

NALA | expression=determined
"Aku harus bicara langsung sama Aldi. Dengar dari sumber pertama."
```

**Transition:** `TRANSITION_SCENE` — ke koridor sekolah

---

## CH1_S04: WAWANCARA ALDI

**Setting:** Koridor sekolah — dekat kantin
**Background:** `BG_CORRIDOR_CAFETERIA`
**Mood:** Tegang, simpatik
**Characters on screen:** Nala (left), Aldi (right)
**Evidence Unlock:** `EV_CH1_004` (Klarifikasi Aldi)
**Duration:** ~10 dialog lines + 1 choice

---

### Dialog Sequence

```
NALA | expression=neutral
"Aldi? Aku Nala, dari tim mading. Boleh ngobrol sebentar?"

ALDI | expression=tired
"...Mading? Soal apa?"

NALA | expression=careful
"Soal postingan @suarakelas12 yang lagi viral itu. Aku mau dengar langsung dari kamu."

ALDI | expression=sighs
"Kamu juga, ya? Semua orang tanya hal yang sama hari ini."

NALA | expression=gentle
"Aku nggak mau nge-judge. Aku cuma mau tahu ceritanya dari sudut pandang kamu."

ALDI | expression=sad
"Aku... aku nggak tahu harus mulai dari mana. Aku dengar rumor itu dari teman-teman. Katanya aku pakai dana OSIS buat acara pribadi."

ALDI | expression=frustrated
"Tapi aku nggak pernah ngelakuin itu. Aku bahkan nggak tahu soal dana OSIS secara detail—itu urusan bendahara, bukan aku."

ALDI | expression=worried
"Dan sekarang... semua orang langsung percaya. Poster kampanye aku ada yang disobek. Grup kelas rame ngebahas aku."
```

### Choice 2: Pendekatan Wawancara

**Option A:** Tanya langsung soal dana — "Jadi kamu nggak tahu soal rekap dana kegiatan OSIS?"
- Effect: `caution += 1`, unlocks additional dialog detail about funds
- Response:

```
ALDI | expression=thinking
"Rekap dana? Aku pernah lihat sekilas waktu rapat, tapi aku nggak pegang dokumennya. Coba tanya Rendra—dia bendahara."

ALDI | expression=confused
"Tapi anehnya... kalau ada masalah dana, harusnya ketahuan dari audit internal. Kok tiba-tiba muncul di akun anonim?"
```

**Option B:** Tanya soal jadwal — "Kamu lagi sibuk apa aja belakangan ini? Kampanye kan?"
- Effect: `speed += 1`, unlocks clue about Aldi's schedule
- Response:

```
ALDI | expression=thinking
"Jadwal aku padet banget. Pagi sekolah, siang rapat kampanye, sore latihan basket..."

ALDI | expression=tired
"Basket itu udah dari sebelum pencalonan. Aku nggak bisa tinggalin tim—mereka butuh aku buat pertandingan minggu depan."
```

### Continuation (both paths)

```
NALA | expression=noting
"Oke, Aldi. Makasih ya. Aku akan coba cari tahu lebih dalam."

ALDI | expression=hopeful
"...Kamu beneran mau bantu? Bukan cuma mau bikin artikel yang rame?"

NALA | expression=serious
"Aku mau bikin artikel yang benar. Ada bedanya."
```

**Evidence Unlock:** `EV_CH1_004` (Klarifikasi Aldi)
**Transition:** `TRANSITION_SCENE` — ke ruang OSIS

---

## CH1_S05: ARSIP OSIS

**Setting:** Ruang OSIS — sore hari
**Background:** `BG_OSIS_ROOM`
**Mood:** Investigatif, fokus
**Characters on screen:** Nala (left), Rendra (right)
**Evidence Unlock:** `EV_CH1_005` (Rekap Dana Kegiatan), `EV_CH1_006` (Catatan Bendahara), `EV_CH1_007` (Foto Ruang OSIS), `EV_CH1_009` (Jadwal Latihan Basket)
**Duration:** ~12 dialog lines, no choices

---

### Dialog Sequence

```
RENDA | expression=neutral
"Jadi kamu dari mading? Lala udah bilang sih kamu mau lihat arsip."

NALA | expression=polite
"Iya, Rendra. Aku butuh data soal rekap dana kegiatan OSIS. Boleh?"

RENDA | expression=opens_cabinet
"Silakan. Ini dokumen rekap dana kegiatan semester ini. Aku yang pegang sebagai bendahara."

[SISTEM] | expression=null
"📄 Rekap Dana Kegiatan ditambahkan ke arsip."

NALA | expression=reading
"Hmm... ada beberapa pos pengeluaran. Acara pentas seni, rapat kerja, operasional kampanye..."

RENDA | expression=explains
"Iya, semua tercatat. Nggak ada yang keluar tanpa persetujuan ketua dan bendahara. Itu prosedurnya."

NALA | expression=noticing
"Rendra, ini catatan pribadi kamu soal alur dana? Boleh aku lihat?"

RENDA | expression=hands_over
"Oh, ini? Iya, catatan tambahan aku pribadi. Silakan—biar transparan."

[SISTEM] | expression=null
"📝 Catatan Bendahara ditambahkan ke arsip."

NALA | expression=noticing
"Ruang OSIS ini... boleh aku foto? Untuk dokumentasi artikel mading."

RENDA | expression=shrugs
"Silakan, nggak masalah."

[SISTEM] | expression=null
"📷 Foto Ruang OSIS ditambahkan ke arsip."

NALA | expression=reading
"Eh, ini apa? Jadwal di papan pengumuman..."

RENDA | expression=explains
"Oh itu jadwal kegiatan ekskul. Basket, pramuka, PMR... kenapa?"

NALA | expression=noticing
"Jadwal latihan basket... hari Rabu dan Jumat, jam 15:30-17:30. Aldi ikut basket kan?"

RENDA | expression=nods
"Iya, Aldi itu kapten basket. Dia latihan rutin. Bahkan sekarang lagi persiapan pertandingan."

[SISTEM] | expression=null
"📋 Jadwal Latihan Basket ditambahkan ke arsip."

NALA | expression=thinking
"Menarik... kalau Aldi rutin latihan basket di jam-jam tertentu, kapan dia sempat urusi dana OSIS?"

RENDA | expression=curious
"Memangnya kenapa? Ada hubungannya sama rumor itu?"

NALA | expression=diplomatic
"Masih aku telusuri. Makasih banyak ya, Rendra. Ini sangat membantu."

RENDA | expression=friendly
"Sama-sama. Kalau butuh apa-apa lagi, kabarin aja."
```

**Transition:** `TRANSITION_INVESTIGATE` — layar berubah ke papan investigasi

---

## CH1_S06: DETECTIVE BOARD TUTORIAL

**Setting:** Mode Investigasi — Papan Detektif
**Background:** `BG_DETECTIVE_BOARD`
**Mood:** Analitis
**Characters on screen:** System UI + evidence cards
**Evidence Unlock:** `EV_CH1_008` (Komentar Siswa), `EV_CH1_010` (Pesan Maya ke Panitia)
**Duration:** Tutorial interactive, ~10 system dialog lines

---

### Tutorial Dialog

```
[SISTEM] | expression=null
"🔍 SELAMAT DATANG DI PAPAN INVESTIGASI"

[SISTEM] | expression=null
"Di sini kamu bisa melihat semua bukti yang sudah dikumpulkan dan mencari hubungan antar bukti."

[SISTEM] | expression=null
"Cara kerjanya: pilih dua bukti, lalu tekan 'Hubungkan.' Jika ada koneksi logis, kamu akan menemukan petunjuk baru."

[SISTEM] | expression=null
"Tapi hati-hati—koneksi yang salah bisa menyesatkan. Pastikan logikanya masuk akal."

[SISTEM] | expression=null
"💡 Komentar dari siswa-siswi ditambahkan ke arsip. Perhatikan apa yang mereka katakan—terkadang ada petunjuk tersembunyi."

[SISTEM] | expression=null
"📩 Pesan dari Maya ke panitia ditambahkan ke arsip. Maya adalah sekretaris OSIS."
```

### Evidence Cards Available on Board

| ID | Nama | Deskripsi Singkat |
|---|---|---|
| EV_CH1_001 | Brief Tugas Mading | Instruksi liputan dari Lala |
| EV_CH1_002 | Story Anonim Aldi | Postingan @suarakelas12 menuduh Aldi |
| EV_CH1_003 | Chat Grup XI-B | Reaksi siswa terhadap rumor |
| EV_CH1_004 | Klarifikasi Aldi | Penjelasan langsung dari Aldi |
| EV_CH1_005 | Rekap Dana Kegiatan | Dokumen keuangan OSIS |
| EV_CH1_006 | Catatan Bendahara | Catatan tambahan Rendra |
| EV_CH1_007 | Foto Ruang OSIS | Dokumentasi ruangan |
| EV_CH1_008 | Komentar Siswa | Kumpulan komentar dari berbagai sisi |
| EV_CH1_009 | Jadwal Latihan Basket | Jadwal ekskul Aldi |
| EV_CH1_010 | Pesan Maya ke Panitia | Chat Maya soal rapat panitia |

### Tutorial Challenge

```
[SISTEM] | expression=null
"🎯 TUGAS: Coba hubungkan bukti yang menunjukkan kontradiksi dengan tuduhan @suarakelas12."

[SISTEM] | expression=null
"Petunjung: Kapan Aldi terakhir beraktivitas? Apakah jadwalnya cocok dengan tuduhan?"
```

**Key Contradiction (CH1_RULE_001):**
- **EV_CH1_002** (Story menuduh Aldi pakai dana OSIS untuk acara pribadi) + **EV_CH1_009** (Jadwal latihan basket Aldi)
- **Insight:** Aldi latihan basket setiap Rabu dan Jumat sore. Waktu yang sama dengan jadwal rapat pengelolaan dana. Jika Aldi selalu di lapangan basket, bagaimana dia bisa mengelola dana OSIS secara langsung?

### On Success

```
[SISTEM] | expression=null
"✅ PETUNJUK DITEMUKAN: Kontradiksi Jadwal!"

[SISTEM] | expression=null
"Catatan: Postingan @suarakelas12 menuduh Aldi 'pakai dana OSIS buat acara pribadi.' Tapi jadwal basket Aldi menunjukkan dia rutin latihan di jam yang bentrok dengan pengurusan dana."

[SISTEM] | expression=null
"Ini bukan bukti kesalahan Aldi, tapi ini menunjukkan tuduhan anonim itu lemah dan perlu diteliti lebih lanjut."

[SISTEM] | expression=null
"⚠️ Aturan Investigasi ditambahkan: CH1_RULE_001"
```

**Transition:** `TRANSITION_SCENE` — ke koridor

---

## CH1_S07: KONFRONTASI ALDI

**Setting:** Koridor dekat ruang mading — keesokan harinya
**Background:** `BG_CORRIDOR_MORNING`
**Mood:** Intens, serius
**Characters on screen:** Nala (left), Aldi (right)
**Duration:** ~10 dialog lines, conditional branching

---

### Branch A: Player Found Key Contradiction (CH1_RULE_001)

```
NALA | expression=serious
"Aldi, aku mau ngomong serius. Aku sudah telusuri dokumen OSIS dan jadwal kamu."

ALDI | expression=nervous
"...Dan?"

NALA | expression=explains
"Menurut jadwal, kamu latihan basket setiap Rabu dan Jumat sore. Tapi rapat pengelolaan dana OSIS juga di jam yang sama."

ALDI | expression=confused
"Iya... memang. Aku bahkan nggak pernah ikut rapat soal dana. Itu urusan Rendra sama panitia lain."

NALA | expression=thinking
"Nah, itu masalahnya. Tuduhan @suarakelas12 bilang kamu 'pakai dana OSIS buat acara pribadi.' Tapi dari data yang aku punya, kamu bahkan nggak pegang dana itu."

ALDI | expression=relieved
"Jadi... kamu percaya sama aku?"

NALA | expression=honest
"Aku nggak 'percaya' begitu saja. Tapi bukti yang ada nggak mendukung tuduhan itu. Jadi pertanyaannya: siapa yang bikin rumor ini, dan kenapa?"

ALDI | expression=determined
"Kalau kamu bisa bantu buktiin, aku... aku nggak tahu harus bilang apa. Terima kasih."

NALA | expression=thoughtful
"Jangan terima kasih dulu. Masih banyak yang belum jelas. Tapi setidaknya, kita tahu tuduhan itu nggak punya dasar yang kuat."
```

### Branch B: Player Did NOT Find Key Contradiction

```
NALA | expression=neutral
"Aldi, aku sudah coba telusuri. Tapi aku belum menemukan bukti yang kuat untuk membantah atau mengonfirmasi."

ALDI | expression=disappointed
"Jadi... kamu juga nggak yakin?"

NALA | expression=honest
"Aku nggak mau asal simpulkan. Tapi aku janji akan terus cari tahu. Ada beberapa dokumen yang masih perlu aku analisis."

ALDI | expression=tired
"Ya udah... terserah. Yang penting jangan ikut-ikutan sebar rumor tanpa bukti."

NALA | expression=guilty
"Aku nggak akan ngelakuin itu. Aku cuma butuh waktu lebih."
```

**Transition:** `TRANSITION_SCENE` — ke ruang mading

---

## CH1_S08: KEPUTUSAN EDITORIAL

**Setting:** Ruang mading — siang hari
**Background:** `BG_MADING_ROOM`
**Mood:** Berat, penuh pertimbangan
**Characters on screen:** Nala (left), Lala (right)
**Duration:** ~6 dialog lines + 1 critical choice

---

### Dialog Before Choice

```
LALA | expression=serious
"Nal, situasinya udah makin panas. Beberapa siswa udah mulai minta klarifikasi dari OSIS."

NALA | expression=thinking
"Aku tahu. Dan kita sebagai tim mading harus memutuskan: kita publish apa?"

LALA | expression=explains
"Pilihan kita penting, Nal. Apa yang kita tulis bisa mempengaruhi opini banyak orang. Jadi... apa rekomendasi kamu?"

LALA | expression=serious
"Ingat, kita bisa memilih untuk publish sekarang, atau tunggu sampai semua fakta terkumpul."
```

### Choice 3: Keputusan Editorial (CRITICAL)

**Option A: "Publish berita utuh dengan semua fakta yang ada."**
- Effect: `balanced += 1`
- Outcome: Artikel seimbang, tapi mungkin belum cukup kuat
- Response:
```
LALA | expression=nods
"Oke. Kita tulis berdasarkan fakta yang ada—termasuk klarifikasi Aldi dan data dana. Netral, tanpa opini."
```

**Option B: "Publish pembelaan Aldi saja—bantu dia melawan rumor."**
- Effect: `bias += 1`
- Outcome: Terkesan bias, bisa kehilangan kredibilitas mading
- Response:
```
LALA | expression=concerned
"Hati-hati, Nal. Kalau kita cuma publish satu sisi, kita nggak beda jauh dari @suarakelas12."
```

**Option C: "Jangan publish dulu. Kita investigasi lebih dalam."**
- Effect: `caution += 1`
- Outcome: Keputusan aman, tapi rumor terus menyebar tanpa counter
- Response:
```
LALA | expression=thinking
"Bisa jadi pilihan yang tepat... tapi ingat, kalau kita diam, orang lain yang akan 'mengisi kekosongan' itu."
```

**Option D: "Publish klarifikasi singkat—imbau semua pihak untuk menahan diri."**
- Effect: `wisdom += 1`
- Outcome: Pendekatan dewasa, mengedepankan literasi
- Response:
```
LALA | expression=impressed
"Ini pendekatan yang dewasa. Kita nggak ikut panas, tapi kita juga nggak diam. Bagus, Nal."
```

**Transition:** `TRANSITION_DEBRIEF` — ke halaman refleksi

---

## CH1_S09: REFLEKSI CHAPTER

**Setting:** Debrief screen + halaman refleksi
**Background:** `BG_DEBRIEF`
**Mood:** Kontemplatif, edukatif
**Characters on screen:** Nala (center), text panels
**Duration:** ~6 dialog lines + reflection UI

---

### Closing Dialog

```
NALA | expression=thinking
"Hari ini aku belajar sesuatu. Informasi yang viral belum tentu benar."

NALA | expression=thoughtful
"Dan sebagai yang menyebarkan—atau yang meluruskan—kita punya tanggung jawab besar."

NALA | expression=determined
"Ini baru permulaan. Masih banyak yang harus aku cari tahu. Tapi setidaknya, sekarang aku tahu: jurnalisme itu bukan soal siapa yang paling cepat."

LALA | expression=smile
"Tapi siapa yang paling jujur. Selamat datang di dunia mading, Nala."

NALA | expression=smile
"...Dan ini baru sebelum viral."
```

### Learning Summary Panel (UI)

```
┌─────────────────────────────────────────────┐
│        📚 RINGKASAN PEMBELAJARAN            │
│                                             │
│  Chapter 1 mengajarkan:                     │
│                                             │
│  1. Verifikasi sebelum menyebarkan          │
│     Informasi tanpa sumber jelas harus      │
│     ditelusuri, bukan langsung dibagikan.   │
│                                             │
│  2. Mendengar semua sisi                    │
│     Sebelum menghakimi, dengarkan dulu      │
│     penjelasan dari pihak yang dituduh.     │
│                                             │
│  3. Membaca kritis                           │
│     Perhatikan bahasa yang digunakan.       │
│     "Katanya" dan "konon" bukan fakta.      │
│                                             │
│  4. Tanggung jawab media                    │
│     Apa yang kita tulis atau bagikan        │
│     punya dampak nyata bagi orang lain.     │
│                                             │
│  🔍 Bukti terkumpul: [X]/10                 │
│  ⚖️ Keputusan: [pilihan pemain]             │
│  📊 Gaya investigasi: [caution/speed/...]   │
│                                             │
│         ➡️ LANJUT KE CHAPTER 2              │
└─────────────────────────────────────────────┘
```

---

## APPENDIX: EVIDENCE CATALOG — CHAPTER 1

| ID | Nama | Tipe | Deskripsi | Scene Unlock |
|---|---|---|---|---|
| EV_CH1_001 | Brief Tugas Mading | Dokumen | Instruksi liputan pemilihan OSIS dari Lala | S01 |
| EV_CH1_002 | Story Anonim Aldi | Media Sosial | Postingan @suarakelas12 menuduh Aldi | S02 |
| EV_CH1_003 | Chat Grup XI-B | Chat Log | Reaksi siswa terhadap rumor | S03 |
| EV_CH1_004 | Klarifikasi Aldi | Wawancara | Penjelasan langsung dari Aldi | S04 |
| EV_CH1_005 | Rekap Dana Kegiatan | Dokumen | Catatan keuangan OSIS semester ini | S05 |
| EV_CH1_006 | Catatan Bendahara | Catatan | Catatan tambahan Rendra soal alur dana | S05 |
| EV_CH1_007 | Foto Ruang OSIS | Foto | Dokumentasi ruangan OSIS | S05 |
| EV_CH1_008 | Komentar Siswa | Media Sosial | Kumpulan komentar dari berbagai sisi | S06 |
| EV_CH1_009 | Jadwal Latihan Basket | Jadwal | Jadwal ekskul Aldi — Rabu & Jumat sore | S05 |
| EV_CH1_010 | Pesan Maya ke Panitia | Chat Log | Chat Maya soal rapat panitia | S06 |

## APPENDIX: KEY RULE — CHAPTER 1

| Rule ID | Evidence Required | Contradiction | Insight |
|---|---|---|---|
| CH1_RULE_001 | EV_CH1_002 + EV_CH1_009 | Tuduhan pakai dana vs jadwal basket yang bentrok | Aldi tidak mungkin mengelola dana langsung karena jadwalnya bentrok dengan rapat dana |

## APPENDIX: PLAYER STATS TRACKED

| Stat | Source | Effect |
|---|---|---|
| caution | S01 Choice A, S04 Choice A, S08 Option C | Pemain cenderung hati-hati dan teliti |
| speed | S01 Choice B, S04 Choice B | Pemain cenderung cepat bertindak |
| balanced | S08 Option A | Artikel seimbang, kredibilitas terjaga |
| bias | S08 Option B | Risiko bias, kredibilitas terancam |
| wisdom | S08 Option D | Pendekatan dewasa, fokus literasi |

---

*End of Chapter 1 Content Document*
