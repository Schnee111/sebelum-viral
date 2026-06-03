# Game Design Document (GDD)
# **Sebelum Viral**

**Versi:** 0.1  
**Tanggal:** 3 Juni 2026  
**Jenis dokumen:** GDD kerja tim / production package  
**Divisi:** LIDM ITDP 2026  
**Genre:** Game edukasi naratif-investigatif, visual novel, decision-making simulation  
**Platform target:** Web browser  
**Target pemain:** Siswa SMA/SMK/MA kelas X–XI  

---

## 1. Ringkasan Eksekutif

**Sebelum Viral** adalah game edukasi naratif-investigatif berbasis web untuk melatih literasi digital dan berpikir kritis siswa melalui simulasi pengambilan keputusan berbasis bukti. Pemain berperan sebagai reporter junior tim mading sekolah yang harus menyelidiki rumor viral seputar pemilihan ketua OSIS. Pemain membaca dialog, mengumpulkan bukti, menghubungkan bukti pada detective board, mendeteksi korelasi atau kontradiksi, mengonfrontasi NPC, lalu mengambil keputusan editorial.

Fokus utama game ini bukan sekadar memberi kuis benar-salah, tetapi membuat pemain mengalami proses verifikasi informasi: mengenali klaim, membaca sumber, membandingkan bukti, memahami konteks, dan mempertimbangkan konsekuensi sosial dari keputusan menyebarkan informasi.

---

## 2. Visi Produk

### 2.1 Visi

Membuat game edukasi literasi digital yang terasa dekat dengan kehidupan siswa Indonesia, menarik secara naratif, dan memiliki mekanik investigasi yang mendorong kebiasaan berpikir kritis sebelum mempercayai atau menyebarkan informasi.

### 2.2 Pilar Desain

| Pilar | Penjelasan |
|---|---|
| Naratif kontekstual | Cerita berlatar sekolah, media sosial, grup chat, mading, dan pemilihan OSIS agar dekat dengan keseharian siswa. |
| Berpikir berbasis bukti | Pemain tidak cukup memilih jawaban benar/salah, tetapi harus mengumpulkan dan menghubungkan bukti. |
| Konsekuensi keputusan | Keputusan pemain memengaruhi reputasi, relasi karakter, dan hasil editorial. |
| Edukasi tidak menggurui | Konsep literasi digital disisipkan melalui kasus, feedback, dan refleksi singkat. |
| Modular dan scalable | Konten cerita, evidence, dialog, dan rules disusun dalam format data terstruktur agar mudah diperluas. |

### 2.3 Unique Selling Point

1. **Evidence Graph System**: pemain menghubungkan bukti sebagai node dan edge pada detective board untuk menemukan korelasi atau kontradiksi.
2. **Real-time Contradiction Detection**: pemain dapat menyandingkan ucapan NPC dengan bukti yang dimiliki untuk membuka opsi konfrontasi.
3. **Narasi lokal Indonesia**: konflik disinformasi dikemas melalui pemilihan OSIS, mading sekolah, akun anonim, chat kelas, dan dinamika sosial siswa.
4. **Refleksi pembelajaran**: game menutup setiap chapter dengan rangkuman keputusan, bukti penting, dan konsep literasi digital yang dipelajari.

---

## 3. Target Pemain dan Persona

### 3.1 Target Pemain Utama

| Aspek | Detail |
|---|---|
| Usia | 15–17 tahun |
| Jenjang | SMA/SMK/MA kelas X–XI |
| Kebiasaan digital | Aktif menggunakan Instagram, TikTok, WhatsApp, dan grup kelas |
| Tantangan | Mudah terpapar rumor, screenshot tanpa konteks, akun anonim, dan tekanan sosial untuk ikut menyebarkan informasi |
| Kebutuhan belajar | Mampu membedakan klaim, opini, bukti, sumber kredibel, dan manipulasi konteks |

### 3.2 Persona Utama

**Nama:** Nadia Rahmawati  
**Usia:** 16 tahun  
**Kelas:** XI  
**Peran:** Anggota baru majalah sekolah  
**Platform harian:** TikTok, Instagram, WhatsApp  
**Literasi digital:** sedang  
**Motivasi:** ingin menulis berita yang kredibel dan diakui teman sekolah  
**Hambatan:** mudah terdorong oleh informasi viral, takut ketinggalan kabar, dan belum terbiasa melakukan verifikasi mendalam  

---

## 4. Konsep Game

### 4.1 Premis

Pemain adalah anggota baru tim mading SMA Garuda Nusantara. Sekolah sedang memasuki masa kampanye pemilihan ketua OSIS. Di tengah suasana kampanye, muncul akun anonim Instagram bernama **@suarakelas12** yang menyebarkan tuduhan terhadap para kandidat. Rumor tersebut cepat menyebar melalui story, grup kelas, dan percakapan siswa.

Sebagai reporter junior, pemain memiliki akses untuk membaca unggahan viral, bertanya kepada siswa, melihat arsip OSIS, mewawancarai kandidat, dan menyusun laporan mading. Namun setiap keputusan editorial dapat memengaruhi reputasi pemain, kepercayaan karakter lain, dan suasana sekolah.

### 4.2 Konflik Utama

Bagaimana pemain memilah informasi benar, setengah benar, dan palsu di tengah tekanan sosial, keterbatasan waktu, bias personal, dan dorongan untuk segera menerbitkan berita?

### 4.3 Tema Pembelajaran

| Tema | Implementasi dalam game |
|---|---|
| Lateral reading | Pemain membandingkan beberapa sumber sebelum percaya pada satu klaim. |
| Source triangulation | Pemain memeriksa konsistensi informasi dari chat, dokumen, saksi, dan postingan. |
| Red flags | Pemain mengenali akun anonim, klaim emosional, screenshot tanpa konteks, dan framing menyesatkan. |
| Evidence-based decision | Pemain harus menghubungkan bukti sebelum mengambil keputusan editorial. |
| Etika menyebarkan informasi | Pemain mempertimbangkan dampak sosial dari publikasi berita. |

---

## 5. Scope Produksi

### 5.1 Fitur Inti yang Dikembangkan

| Fitur | Status | Catatan |
|---|---|---|
| Visual novel interaktif | Prioritas utama | Dialog, pilihan, ekspresi karakter, transisi scene. |
| Evidence inventory | Prioritas utama | Menyimpan bukti yang dikumpulkan pemain. |
| Detective board | Prioritas utama | Board berbasis node dan edge untuk menghubungkan bukti. |
| Evidence Graph System | Prioritas utama | Validasi hubungan antar bukti menggunakan tag dan rules. |
| Real-time Contradiction Detection | Prioritas utama | Menyandingkan dialog NPC dengan evidence. |
| Konfrontasi NPC | Prioritas utama | Membuka dialog khusus jika bukti relevan/kontradiktif. |
| Refleksi akhir chapter | Prioritas utama | Ringkasan keputusan dan konsep pembelajaran. |
| Save lokal | Prioritas utama | LocalStorage atau IndexedDB. |

### 5.2 Fitur Lanjutan

| Fitur | Catatan |
|---|---|
| Autentikasi pengguna | Dapat menggunakan Supabase Auth jika diperlukan. |
| Cloud save | Dapat menggunakan Supabase Database. |
| Dashboard guru | Untuk melihat data agregat keputusan siswa. |
| Analitik kelas | Untuk visualisasi pola keputusan dan pemahaman siswa. |
| Authoring tool | Guru dapat membuat skenario literasi digital sendiri. |
| AI reflection | Refleksi personal berbasis pola keputusan pemain. |
| Mode kolaboratif | Shared detective board untuk pembelajaran kelompok. |

---

## 6. Core Gameplay Loop

```text
Baca narasi → Terima rumor/klaim → Kumpulkan evidence → Analisis evidence → Hubungkan evidence di detective board → Deteksi korelasi/kontradiksi → Konfrontasi NPC → Ambil keputusan editorial → Lihat konsekuensi → Refleksi pembelajaran
```

### 6.1 Loop Detail

| Tahap | Aktivitas Pemain | Output Sistem |
|---|---|---|
| Orientasi | Membaca intro cerita dan tugas mading | Pemain memahami konteks konflik |
| Investigasi awal | Membaca rumor, chat, dan unggahan viral | Evidence awal masuk inventory |
| Verifikasi sumber | Bertanya ke NPC atau membuka dokumen | Evidence tambahan terbuka |
| Analisis bukti | Menghubungkan bukti di detective board | Sistem memberi label hubungan |
| Konfrontasi | Menyandingkan bukti dengan ucapan NPC | Dialog khusus atau informasi baru terbuka |
| Keputusan editorial | Memilih terbitkan, tunda, revisi, atau tolak | Reputasi dan relasi karakter berubah |
| Refleksi | Membaca ringkasan pembelajaran | Konsep literasi digital diperkuat |

---

## 7. Struktur Chapter

### 7.1 Rencana Chapter

| Chapter | Judul | Fokus Cerita | Fokus Literasi Digital |
|---|---|---|---|
| 1 | Awal Rumor | Akun anonim menyebarkan tuduhan pertama terhadap kandidat OSIS. | Membedakan klaim, opini, sumber, dan bukti awal. |
| 2 | Jejak yang Tidak Utuh | Pemain menemukan screenshot dan kesaksian yang tidak konsisten. | Konteks, framing, dan misdirection. |
| 3 | Suara dari Banyak Arah | Pemain menyadari rumor berasal dari beberapa aktor berbeda. | Disinformasi terdistribusi dan motivasi sumber. |
| 4 | Di Balik Akun Anonim | Pemain menemukan motif dan pola manipulasi. | Fabrication, half-truth, dan bias sumber. |
| 5 | Sebelum Viral | Pemain mengambil keputusan editorial akhir. | Etika publikasi, tanggung jawab digital, dan refleksi personal. |

### 7.2 Fokus Implementasi Awal

Untuk produksi awal, tim fokus membuat **Chapter 1–3 dapat dimainkan secara utuh**. Chapter 4–5 dapat disiapkan sebagai naskah lanjut atau konten ekspansi jika waktu produksi memungkinkan.

---

## 8. Chapter 1 Detail: Awal Rumor

### 8.1 Tujuan Chapter

Mengenalkan pemain pada dunia game, tugas sebagai reporter mading, rumor pertama dari akun anonim, serta mekanik dasar: membaca dialog, mengumpulkan evidence, membuka inventory, dan membuat koneksi awal di detective board.

### 8.2 Tujuan Pembelajaran

Setelah menyelesaikan chapter ini, pemain diharapkan mampu:

1. Membedakan klaim, opini, dan bukti.
2. Mengenali risiko mempercayai akun anonim tanpa verifikasi.
3. Memahami bahwa screenshot viral belum tentu cukup sebagai bukti.
4. Melakukan verifikasi awal dengan membandingkan minimal dua sumber.

### 8.3 Alur Scene Chapter 1

| Scene ID | Nama Scene | Lokasi | Tujuan Scene | Evidence Unlock |
|---|---|---|---|---|
| CH1_S01 | Brief Redaksi | Ruang mading | Lala memberi tugas pertama kepada pemain. | EV_CH1_001 |
| CH1_S02 | Story Viral | Overlay smartphone | Pemain membaca unggahan @suarakelas12. | EV_CH1_002 |
| CH1_S03 | Chat Kelas XI-B | Overlay WhatsApp | Pemain melihat rumor menyebar di grup kelas. | EV_CH1_003 |
| CH1_S04 | Wawancara Aldi | Koridor sekolah | Aldi memberi klarifikasi awal. | EV_CH1_004 |
| CH1_S05 | Arsip OSIS | Ruang OSIS | Pemain melihat jadwal dan dokumen kegiatan OSIS. | EV_CH1_005, EV_CH1_006 |
| CH1_S06 | Detective Board Tutorial | Mode inspeksi | Pemain menghubungkan bukti pertama. | - |
| CH1_S07 | Keputusan Editorial | Ruang mading | Pemain memilih sikap: terbitkan, tunda, atau investigasi lanjut. | - |
| CH1_S08 | Refleksi Chapter | Halaman refleksi | Sistem merangkum keputusan dan konsep belajar. | Reflection CH1 |

### 8.4 Keputusan Akhir Chapter 1

| Pilihan | Dampak Naratif | Dampak State |
|---|---|---|
| Terbitkan cepat | Rumor makin ramai, reputasi awal naik tetapi risiko akurasi rendah. | reputation +5, caution -5, accuracy_flag rendah |
| Tunda publikasi | Lala kecewa, tetapi kualitas investigasi lebih baik. | caution +8, trust_lala -2, credibility +5 |
| Investigasi lanjut | Membuka jalur evidence tambahan. | curiosity +8, unlock CH2 evidence lead |

---

## 9. Karakter

### 9.1 Karakter Pemain

| Field | Detail |
|---|---|
| Nama default | Nala |
| Nama dapat diubah | Ya |
| Kelas | XI |
| Posisi | Reporter junior tim mading |
| Fungsi gameplay | Avatar pemain, pengambil keputusan, pengumpul evidence |
| State utama | curiosity_score, caution_score, reputation, trust per karakter |

### 9.2 Karakter Utama

| Nama | Peran | Kepribadian | Fungsi Cerita | Ekspresi Dibutuhkan |
|---|---|---|---|---|
| Nala | Pemain/reporter junior | Dapat dibentuk pemain | Protagonis dan pengambil keputusan | neutral, curious, worried, determined |
| Lala Pradipta | Senior mading | Ambisius, cepat, mengejar scoop | Mentor sekaligus tekanan editorial | neutral, excited, serious, annoyed |
| Aldi Pratama | Kandidat OSIS | Populer, ceroboh, karismatik | Target tuduhan pertama | neutral, confident, confused, defensive |
| Bintang Maulana | Kandidat OSIS | Pendiam, cerdas, sistematis | Target tuduhan berbasis half-truth | neutral, anxious, calm, hurt |
| Citra Anggraini | Kandidat OSIS | Tegas, vokal, berintegritas | Target tuduhan berbasis fabrication | neutral, angry, focused, tired |
| Rendra Wijaya | Ketua OSIS lama | Netral, kooperatif | Pemberi akses arsip OSIS | neutral, formal, concerned |
| Pak Ardi | Pembina OSIS | Skeptis, hati-hati | Otoritas dan validator sekolah | neutral, stern, reflective |
| Bu Sari | Guru Bahasa Inggris | Peduli, bias terhadap anak | Sumber konflik Bintang | neutral, defensive, sad |

### 9.3 Trio di Balik Akun Anonim

| Nama | Motif | Target | Tipe Disinformasi | Tingkat Kebenaran Klaim |
|---|---|---|---|---|
| Dimas Rahardian | Dendam personal ke Citra | Citra | Fabrication | Hampir 0% |
| Maya Larasati | Menutupi penyalahgunaan kas OSIS | Aldi | Misdirection | Sekitar 30% |
| Reza Aditya | Membela kakak yang merasa dirugikan | Bintang | Half-truth | Sekitar 60% |

---

## 10. State dan Variabel Game

### 10.1 Player State

| Variable | Tipe | Rentang | Fungsi |
|---|---|---|---|
| curiosity_score | number | 0–100 | Mewakili kecenderungan pemain menggali informasi. |
| caution_score | number | 0–100 | Mewakili kehati-hatian pemain sebelum mengambil keputusan. |
| reputation | number | 0–100 | Reputasi pemain sebagai reporter mading. |
| credibility_score | number | 0–100 | Kualitas keputusan editorial pemain. |
| evidence_collected | array | evidence_id[] | Daftar bukti yang sudah dikumpulkan. |
| choice_history | array | choice_id[] | Riwayat pilihan penting pemain. |
| confronted_npcs | array | character_id[] | NPC yang sudah dikonfrontasi. |
| graph_state | object | nodes + edges | Struktur detective board pemain. |
| master_insight_flags | array | string[] | Wawasan besar yang sudah ditemukan pemain. |

### 10.2 Relationship State

| Variable | Target Karakter | Fungsi |
|---|---|---|
| trust_lala | Lala | Menentukan dukungan senior mading. |
| trust_aldi | Aldi | Menentukan keterbukaan Aldi saat diwawancarai. |
| trust_bintang | Bintang | Menentukan akses informasi terkait olimpiade. |
| trust_citra | Citra | Menentukan akses ke gerakan Ruang Aman. |
| trust_rendra | Rendra | Menentukan akses ke arsip OSIS. |
| trust_pak_ardi | Pak Ardi | Menentukan legitimasi investigasi. |

---

## 11. Evidence Design

### 11.1 Prinsip Evidence

Setiap evidence harus memiliki:

1. **Sumber**: dari siapa/apa bukti berasal.
2. **Klaim**: pernyataan utama yang dapat diverifikasi.
3. **Tag entitas**: siapa yang disebut.
4. **Tag waktu**: kapan peristiwa diklaim terjadi.
5. **Tag lokasi**: di mana peristiwa diklaim terjadi.
6. **Kredibilitas awal**: rendah, sedang, tinggi.
7. **Relasi**: bukti lain yang mendukung atau bertentangan.
8. **Fungsi pembelajaran**: konsep literasi digital yang diajarkan.

### 11.2 Format Evidence

| Field | Deskripsi | Contoh |
|---|---|---|
| evidence_id | ID unik evidence | EV_CH1_001 |
| title | Judul yang muncul di UI | Story Anonim tentang Dana OSIS |
| type | Jenis evidence | social_post, chat, document, testimony, photo |
| source | Sumber evidence | @suarakelas12 |
| claim | Klaim utama | Aldi memakai dana OSIS untuk acara pribadi |
| entity_tags | Entitas terkait | Aldi, OSIS, Dana Kegiatan |
| time_tags | Waktu terkait | Senin pagi, jam 10.00 |
| location_tags | Lokasi terkait | Ruang OSIS |
| credibility | Kredibilitas awal | low, medium, high |
| unlock_scene | Scene pembuka evidence | CH1_S02 |
| related_evidence | Evidence berkorelasi | EV_CH1_005 |
| contradiction_with | Evidence bertentangan | EV_CH1_006 |
| learning_point | Konsep belajar | Akun anonim perlu diverifikasi |

### 11.3 Evidence Chapter 1

| ID | Judul | Tipe | Sumber | Klaim | Kredibilitas | Relasi |
|---|---|---|---|---|---|---|
| EV_CH1_001 | Brief Tugas Mading | document | Lala | Mading harus menulis laporan kampanye OSIS. | high | - |
| EV_CH1_002 | Story Anonim Aldi | social_post | @suarakelas12 | Aldi memakai dana OSIS untuk acara pribadi. | low | EV_CH1_005, EV_CH1_006 |
| EV_CH1_003 | Chat Grup XI-B | chat | Grup kelas | Banyak siswa percaya rumor tanpa bukti tambahan. | medium | EV_CH1_002 |
| EV_CH1_004 | Klarifikasi Aldi | testimony | Aldi | Aldi tidak tahu soal dana yang hilang. | medium | EV_CH1_005 |
| EV_CH1_005 | Rekap Dana Kegiatan | document | Arsip OSIS | Ada selisih kas pada kegiatan kampanye. | high | EV_CH1_002, EV_CH1_006 |
| EV_CH1_006 | Catatan Bendahara | document | Maya | Dana dipindahkan untuk kebutuhan dekorasi. | medium | EV_CH1_005 |
| EV_CH1_007 | Foto Ruang OSIS | photo | Rendra | Aldi tidak terlihat di ruang OSIS saat transaksi dicatat. | medium | EV_CH1_002 |
| EV_CH1_008 | Komentar Siswa | social_comment | Siswa anonim | “Katanya Aldi emang sering pakai uang OSIS.” | low | EV_CH1_003 |
| EV_CH1_009 | Jadwal Latihan Basket | document | Klub basket | Aldi berada di lapangan saat jam transaksi. | high | EV_CH1_002, EV_CH1_007 |
| EV_CH1_010 | Pesan Maya ke Panitia | chat | Maya | Maya meminta akses laporan kas kepada panitia. | medium | EV_CH1_006 |

---

## 12. Contradiction Rules

### 12.1 Jenis Output Validasi

| Output | Makna | Feedback UI |
|---|---|---|
| Korelasi | Dua bukti saling mendukung atau punya hubungan relevan. | Edge biru/hijau + label “Korelasi” |
| Kontradiksi | Dua bukti saling bertentangan. | Edge merah + label “Kontradiksi” |
| Tidak Relevan | Tidak ada cukup hubungan tag/klaim. | Edge abu-abu + label “Tidak relevan” |
| Perlu Konteks | Ada hubungan, tetapi belum cukup untuk kesimpulan. | Edge kuning + label “Perlu konteks” |

### 12.2 Rules Umum

| Rule ID | Kondisi | Output | Contoh |
|---|---|---|---|
| RULE_001 | entity sama + time sama + location berbeda | Kontradiksi | Aldi disebut di ruang OSIS jam 10, tetapi jadwal menunjukkan Aldi di lapangan jam 10. |
| RULE_002 | source anonim + tidak ada bukti pendukung | Perlu Konteks | Story @suarakelas12 menuduh Aldi tanpa dokumen pendukung. |
| RULE_003 | dokumen resmi + klaim viral berbeda | Kontradiksi | Rekap dana tidak menyebut Aldi, tetapi story menuduh Aldi. |
| RULE_004 | dua sumber independen menyatakan klaim serupa | Korelasi | Arsip OSIS dan catatan panitia sama-sama menyebut selisih kas. |
| RULE_005 | klaim benar sebagian tetapi target salah | Misdirection | Ada uang hilang, tetapi tertuduh belum tentu pelaku. |
| RULE_006 | screenshot/chat tanpa metadata | Perlu Konteks | Screenshot chat beredar tanpa tanggal dan pengirim asli. |
| RULE_007 | kesaksian personal bertentangan dengan dokumen resmi | Kontradiksi | Saksi berkata Aldi hadir, jadwal resmi menunjukkan sebaliknya. |
| RULE_008 | komentar banyak orang tanpa sumber primer | Tidak Relevan | Banyak komentar mengulang rumor yang sama tanpa bukti baru. |
| RULE_009 | tag entitas sama tetapi klaim berbeda aspek | Perlu Konteks | Dua bukti membahas Aldi, tetapi satu soal dana dan satu soal basket. |
| RULE_010 | bukti menunjukkan motif sumber | Korelasi | Maya punya akses laporan kas dan rumor mengarah ke pengalihan tuduhan. |

### 12.3 Rules Khusus Chapter 1

| Rule ID | Evidence A | Evidence B | Output | Insight |
|---|---|---|---|---|
| CH1_RULE_001 | EV_CH1_002 | EV_CH1_009 | Kontradiksi | Aldi tidak berada di lokasi transaksi saat waktu yang dituduhkan. |
| CH1_RULE_002 | EV_CH1_002 | EV_CH1_005 | Perlu Konteks | Ada selisih kas, tetapi belum membuktikan pelaku. |
| CH1_RULE_003 | EV_CH1_005 | EV_CH1_006 | Korelasi | Catatan bendahara menjelaskan perpindahan dana, tetapi perlu validasi. |
| CH1_RULE_004 | EV_CH1_003 | EV_CH1_008 | Korelasi lemah | Chat dan komentar menunjukkan penyebaran rumor, bukan kebenaran rumor. |
| CH1_RULE_005 | EV_CH1_006 | EV_CH1_010 | Korelasi | Maya punya akses dan aktivitas terkait laporan kas. |

---

## 13. Mekanik Utama

### 13.1 Visual Novel Mode

**Fungsi:** Menyampaikan narasi, dialog, konflik, dan pilihan pemain.

Komponen:

- Background scene
- Character sprite
- Dialog box
- Nama speaker
- Pilihan respons
- Auto/skip/log dialog
- Transisi scene

Interaksi:

1. Pemain membaca dialog.
2. Pemain klik/tap untuk lanjut.
3. Pada titik tertentu, pilihan respons muncul.
4. Sistem menyimpan choice history.
5. Scene berikutnya terbuka berdasarkan pilihan atau state.

### 13.2 Evidence Inventory

**Fungsi:** Menyimpan semua bukti yang ditemukan pemain.

Komponen evidence card:

- Judul bukti
- Tipe bukti
- Preview visual/teks
- Sumber
- Klaim utama
- Kredibilitas awal
- Tombol “Tambahkan ke Board”

### 13.3 Detective Board

**Fungsi:** Area utama untuk mengorganisir dan menghubungkan bukti.

Interaksi:

1. Pemain menyeret evidence ke board.
2. Evidence tampil sebagai node.
3. Pemain menarik edge dari satu node ke node lain.
4. Sistem mengevaluasi hubungan berdasarkan tag dan rules.
5. Edge diberi label: korelasi, kontradiksi, tidak relevan, atau perlu konteks.

### 13.4 Real-time Conversation Inspection

**Fungsi:** Pemain dapat memeriksa ucapan NPC saat dialog berlangsung.

Interaksi:

1. Pemain membuka log dialog NPC.
2. Pemain memilih satu kalimat/klaim NPC.
3. Pemain memilih evidence dari inventory.
4. Sistem mengevaluasi hubungan klaim NPC dengan evidence.
5. Jika kontradiksi terdeteksi, opsi konfrontasi terbuka.

### 13.5 NPC Confrontation

**Fungsi:** Pemain menekan NPC dengan evidence yang relevan.

Kemungkinan respons NPC:

| Respons | Kondisi | Dampak |
|---|---|---|
| Mengaku | Evidence kuat dan trust cukup | Informasi baru terbuka |
| Mengelak | Evidence relevan tetapi belum kuat | Membuka jalur investigasi lain |
| Marah | Konfrontasi salah/tidak relevan | Trust turun |
| Diam | NPC tertekan | Flag baru terbuka tetapi relasi turun |

### 13.6 Reflection System

**Fungsi:** Memberi feedback pembelajaran setelah chapter selesai.

Isi refleksi:

- Keputusan utama pemain
- Bukti yang dikumpulkan
- Bukti penting yang terlewat
- Konsep literasi digital yang relevan
- Saran perilaku digital di dunia nyata

---

## 14. Choice and Consequence

### 14.1 Prinsip Pilihan

Pilihan tidak selalu “benar” atau “salah”. Setiap pilihan memiliki trade-off antara kecepatan, kehati-hatian, relasi sosial, dan kualitas informasi.

### 14.2 Contoh Pilihan

| Choice ID | Teks Pilihan | Efek State | Dampak Naratif |
|---|---|---|---|
| CH1_C001 | “Kita cek sumbernya dulu.” | caution +5, curiosity +3 | Lala menganggap pemain lambat, tetapi investigasi lebih kuat. |
| CH1_C002 | “Kalau sudah viral, kita harus cepat tulis.” | reputation +3, caution -5 | Berita cepat naik, tetapi risiko salah meningkat. |
| CH1_C003 | “Aku mau tanya Aldi langsung.” | curiosity +6, trust_aldi +2 | Jalur wawancara terbuka. |
| CH1_C004 | “Postingan anonim belum cukup.” | credibility +5 | Pemain mendapat refleksi positif. |
| CH1_C005 | “Komentar siswa sudah cukup jadi bukti.” | credibility -5 | Sistem menunjukkan feedback tentang hearsay. |

---

## 15. UI/UX Flow

### 15.1 Flow Utama

```text
Landing Page → Main Menu → New Game → Opening Scene → Visual Novel → Evidence Inventory → Detective Board → Conversation Inspection → NPC Confrontation → Editorial Decision → Reflection → Next Chapter
```

### 15.2 Layar Utama

| Layar | Fungsi |
|---|---|
| Landing Page | Mengenalkan game dan tombol mulai. |
| Main Menu | New Game, Continue, Settings, Credits. |
| Visual Novel Screen | Dialog, sprite, background, pilihan. |
| Smartphone Overlay | Chat, social feed, news feed, inventory. |
| Evidence Inventory | Daftar bukti yang dikumpulkan. |
| Detective Board | Menghubungkan evidence node. |
| Conversation Inspection | Menyandingkan dialog NPC dengan evidence. |
| Reflection Screen | Menampilkan hasil belajar chapter. |
| Ending Screen | Menampilkan jalur keputusan dan kesimpulan akhir. |

### 15.3 Prinsip UI

1. Teks harus mudah dibaca pada layar laptop dan mobile.
2. Warna edge/label harus kontras.
3. Evidence card tidak boleh terlalu panjang.
4. Tutorial harus muncul secara bertahap, bukan sekaligus.
5. Feedback validasi harus jelas tetapi tidak menggurui.

---

## 16. Art Direction

### 16.1 Gaya Visual

Gaya visual semi-modern sekolah Indonesia, dengan UI bersih, sedikit nuansa investigatif, dan elemen digital seperti chat, story, dan feed media sosial.

### 16.2 Mood

| Situasi | Mood |
|---|---|
| Mading/sekolah | Hangat, realistis, ramai |
| Investigasi | Tegang ringan, fokus |
| Detective board | Analitis, rapi, kontras |
| Konfrontasi | Intens, serius |
| Refleksi | Tenang, edukatif |

### 16.3 Palet Warna Awal

| Fungsi | Warna yang Disarankan |
|---|---|
| Background UI utama | Putih, abu muda, biru gelap |
| Aksen investigasi | Cyan/biru elektrik |
| Kontradiksi | Merah tegas |
| Korelasi | Hijau/biru |
| Perlu konteks | Kuning/oranye |
| Tidak relevan | Abu-abu |

### 16.4 Asset Minimum

| Jenis | Jumlah Awal | Catatan |
|---|---|---|
| Character sprite | 5–6 karakter | Nala, Lala, Aldi, Bintang, Citra, Rendra/Pak Ardi |
| Ekspresi | 3–4 per karakter | neutral, serious, surprised, worried/angry |
| Background | 5–7 lokasi | kelas, koridor, ruang mading, ruang OSIS, halaman sekolah, kantin |
| UI component | 10–15 komponen | dialog box, buttons, evidence card, node, edge, overlay phone |
| Evidence visual | 15–25 item | screenshot chat, post IG, dokumen, foto, komentar |
| Audio | 1–3 BGM, 3–5 SFX | BGM sekolah, investigasi, konfrontasi |

---

## 17. Audio Direction

### 17.1 BGM

| Track | Situasi | Mood |
|---|---|---|
| BGM_SCHOOL_DAY | Scene sekolah normal | Ringan, santai |
| BGM_INVESTIGATION | Detective board/investigasi | Fokus, sedikit misterius |
| BGM_CONFRONTATION | Konfrontasi NPC | Tegang, serius |
| BGM_REFLECTION | Refleksi akhir chapter | Tenang, kontemplatif |

### 17.2 Sound Effect

| SFX | Trigger |
|---|---|
| sfx_notification | Bukti/chat baru masuk |
| sfx_click | Klik tombol UI |
| sfx_evidence_unlock | Evidence baru diperoleh |
| sfx_edge_connect | Node evidence dihubungkan |
| sfx_contradiction | Kontradiksi ditemukan |
| sfx_reflection | Halaman refleksi muncul |

---

## 18. Technical Design

### 18.1 Stack Rekomendasi

| Komponen | Teknologi |
|---|---|
| Frontend | Next.js / React |
| Styling | Tailwind CSS |
| State Management | Zustand |
| Detective Board | React Flow |
| Story Data | JSON |
| Save Lokal | LocalStorage atau IndexedDB |
| Backend Lanjutan | Supabase |
| Deployment | Vercel atau Netlify |
| Design | Figma |
| Asset | Krita, Photoshop, Aseprite, Canva/Figma |

### 18.2 Arsitektur Frontend-First

```text
Browser Client
├── Next.js / React App
├── Visual Novel Layer
├── Smartphone Overlay
├── Evidence Inventory
├── Detective Board (React Flow)
├── JSON Story Engine
├── Tag-Matching Engine
├── Contradiction Rules Engine
├── Reflection Generator
└── Local Save System

Optional Future Service
└── Supabase
    ├── Auth
    ├── PostgreSQL Database
    ├── Storage
    └── Teacher Dashboard / Analytics
```

### 18.3 Struktur Folder Awal

```text
src/
  app/
  components/
    visual-novel/
    evidence/
    detective-board/
    inspection/
    reflection/
    ui/
  data/
    story/
      chapter-1/
        scenes.json
        dialogues.json
        choices.json
        evidences.json
        rules.json
        reflections.json
  stores/
    gameStore.ts
    evidenceStore.ts
    graphStore.ts
  engines/
    storyEngine.ts
    tagMatchingEngine.ts
    contradictionEngine.ts
    reflectionEngine.ts
  types/
    story.ts
    evidence.ts
    gameState.ts
```

### 18.4 Format JSON Scene

```json
{
  "scene_id": "CH1_S01",
  "chapter_id": "CH1",
  "title": "Brief Redaksi",
  "background": "bg_mading_room",
  "characters": ["nala", "lala"],
  "dialogues": [
    {
      "speaker": "lala",
      "expression": "serious",
      "text": "Nala, ada rumor soal kandidat OSIS yang mulai viral. Kita harus hati-hati sebelum menulis."
    }
  ],
  "choices": ["CH1_C001", "CH1_C002"],
  "unlock_evidence": ["EV_CH1_001"],
  "next_scene": "CH1_S02"
}
```

### 18.5 Format JSON Evidence

```json
{
  "evidence_id": "EV_CH1_002",
  "title": "Story Anonim tentang Aldi",
  "type": "social_post",
  "source": "@suarakelas12",
  "claim": "Aldi memakai dana OSIS untuk acara pribadi.",
  "entity_tags": ["Aldi", "OSIS", "Dana Kegiatan"],
  "time_tags": ["Senin Pagi"],
  "location_tags": ["Ruang OSIS"],
  "credibility": "low",
  "unlock_scene": "CH1_S02",
  "related_evidence": ["EV_CH1_005"],
  "contradiction_with": ["EV_CH1_009"],
  "learning_point": "Akun anonim perlu diverifikasi dengan sumber lain."
}
```

### 18.6 Format JSON Rule

```json
{
  "rule_id": "CH1_RULE_001",
  "evidence_a": "EV_CH1_002",
  "evidence_b": "EV_CH1_009",
  "result": "contradiction",
  "label": "Kontradiksi Waktu dan Lokasi",
  "explanation": "Story anonim menyebut Aldi berada di ruang OSIS saat transaksi, tetapi jadwal latihan menunjukkan Aldi berada di lapangan pada waktu yang sama."
}
```

---

## 19. Testing dan Validasi

### 19.1 Functional Test

| Fitur | Test Case | Kriteria Berhasil |
|---|---|---|
| Visual novel | Pemain klik dialog sampai scene berikutnya | Dialog tampil urut tanpa error |
| Choice system | Pemain memilih opsi respons | Choice tersimpan di history |
| Evidence unlock | Scene tertentu membuka evidence | Evidence masuk inventory |
| Detective board | Pemain menambahkan node evidence | Node tampil di board |
| Edge connection | Pemain menghubungkan dua evidence | Edge tampil dan divalidasi |
| Contradiction detection | Evidence kontradiktif dihubungkan | Sistem memberi label kontradiksi |
| Conversation inspection | Evidence disandingkan dengan dialog NPC | Feedback sesuai/kontradiksi/tidak relevan muncul |
| Reflection | Chapter selesai | Halaman refleksi tampil |

### 19.2 Usability Test

Target pengujian:

- 10–15 siswa SMA/SMK/MA
- 2–3 guru/ahli literasi digital untuk review konten

Task playtest:

1. Mulai permainan dari main menu.
2. Selesaikan scene pembuka.
3. Temukan minimal tiga evidence.
4. Tambahkan evidence ke detective board.
5. Hubungkan dua evidence yang relevan.
6. Temukan minimal satu kontradiksi.
7. Lakukan satu konfrontasi NPC.
8. Ambil keputusan editorial.
9. Baca refleksi akhir chapter.

### 19.3 Metrik Evaluasi

| Metrik | Target |
|---|---|
| Completion rate chapter awal | ≥ 85% |
| Task success rate fitur inti | ≥ 80% |
| SUS | ≥ 75 |
| Pemahaman instruksi detective board | Mayoritas tester memahami tanpa bantuan besar |
| Feedback konten dari guru/ahli | Tidak ada revisi mayor terkait konsep literasi digital |

---

## 20. Risiko dan Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Scope cerita terlalu besar | Produksi tidak selesai | Fokus pada chapter yang playable utuh. |
| Evidence terlalu kompleks | Pemain bingung | Batasi jumlah evidence per chapter dan beri tutorial bertahap. |
| Detective board sulit dipahami | Core mechanic gagal | Gunakan onboarding interaktif dan contoh koneksi pertama. |
| Aset belum final | Visual kurang menarik | Gunakan placeholder rapi, lalu ganti bertahap. |
| Rules kontradiksi ambigu | Feedback sistem membingungkan | Buat ground truth evidence dan rules sejak awal. |
| UI terlalu penuh teks | Readability turun | Ringkas evidence card dan gunakan progressive disclosure. |
| Tim tidak sinkron | Pekerjaan tumpang tindih | Gunakan GitHub Projects/Notion dengan task kecil. |

---

## 21. Production Task Breakdown

### 21.1 Content/Narrative

- [ ] Finalisasi premis chapter 1–3
- [ ] Tulis scene list chapter 1
- [ ] Tulis dialog chapter 1
- [ ] Buat choice consequence chapter 1
- [ ] Buat reflection text chapter 1
- [ ] Buat character sheet final

### 21.2 Evidence & Rules

- [ ] Buat evidence database chapter 1
- [ ] Buat tag untuk setiap evidence
- [ ] Buat contradiction rules chapter 1
- [ ] Buat ground truth hubungan evidence
- [ ] Review evidence dengan anggota tim

### 21.3 UI/UX

- [ ] Finalisasi flow utama
- [ ] Desain evidence card
- [ ] Desain detective board node
- [ ] Desain label edge
- [ ] Desain reflection screen
- [ ] Desain smartphone overlay

### 21.4 Frontend

- [ ] Setup Next.js + Tailwind
- [ ] Implementasi story engine sederhana
- [ ] Implementasi visual novel screen
- [ ] Implementasi choice system
- [ ] Implementasi inventory evidence
- [ ] Integrasi React Flow
- [ ] Implementasi tag-matching engine
- [ ] Implementasi contradiction engine
- [ ] Implementasi local save

### 21.5 Asset

- [ ] Buat sprite Nala
- [ ] Buat sprite Lala
- [ ] Buat sprite Aldi
- [ ] Buat background ruang mading
- [ ] Buat background koridor
- [ ] Buat background ruang OSIS
- [ ] Buat mock evidence visual
- [ ] Siapkan BGM/SFX awal

### 21.6 Testing

- [ ] Buat test case fungsional
- [ ] Buat form usability test
- [ ] Buat form feedback siswa
- [ ] Buat pre-test/post-test sederhana
- [ ] Lakukan playtest internal
- [ ] Lakukan revisi berdasarkan feedback

---

## 22. Definition of Done

Satu chapter dianggap selesai jika:

1. Semua scene dapat dimainkan dari awal sampai refleksi.
2. Semua pilihan utama tersimpan dalam state.
3. Evidence dapat dikumpulkan dan dibuka di inventory.
4. Minimal beberapa evidence dapat ditempatkan di detective board.
5. Hubungan evidence dapat divalidasi oleh rules.
6. Minimal satu kontradiksi dapat ditemukan.
7. Minimal satu konfrontasi NPC dapat dilakukan.
8. Keputusan akhir chapter menghasilkan feedback/refleksi.
9. Tidak ada bug fatal yang menghentikan permainan.
10. Minimal 3 tester internal dapat menyelesaikan chapter tanpa bantuan besar.

---

## 23. Catatan untuk Tim

Dokumen ini adalah GDD kerja, bukan dokumen final yang kaku. Isinya boleh berubah selama proses produksi, tetapi perubahan harus tetap menjaga tiga hal utama:

1. Game harus dapat dimainkan secara utuh.
2. Mekanik evidence dan contradiction detection harus terbukti berjalan.
3. Tujuan edukasi literasi digital harus tetap jelas dan tidak menjadi tempelan.

Prioritas produksi terdekat adalah:

1. Finalisasi Chapter 1.
2. Buat evidence database.
3. Buat contradiction rules.
4. Tentukan struktur JSON.
5. Buat prototype visual novel dan detective board.

