# Brainstorming Ide LIDM 2026 — Divisi ITDP

> Disusun: 11 Juni 2026
> Tim: 4 orang, Ilmu Komputer

---

## 📌 Konteks Lomba

| Item | Detail |
|---|---|
| **Lomba** | LIDM (Lomba Inovasi Digital Mahasiswa) 2025 |
| **Divisi** | ITDP — Inovasi Teknologi Digital Pendidikan |
| **Penyelenggara** | Kemendiktisaintek RI (Dit. Belmawa) |
| **Tema** | "Menuju Talenta Pendidik Indonesia Berinovasi dan Berliterasi Digital" |
| **Fokus ITDP** | Prototipe/produk teknologi digital BARU untuk pendidikan — makro (manajemen/administrasi) maupun mikro (pembelajaran klasikal) |
| **Deadline** | Pendaftaran: 1 Agustus – 14 September 2025 |
| **Seleksi Nasional** | 15 September – 6 Oktober 2025 |
| **Final (luring)** | 1–4 Desember 2025 |

---

## 👥 Profil Tim

- **Jumlah**: 4 orang
- **Latar belakang**: Ilmu Komputer (semua)
- **Skill teknis**:
  - Mobile development (Flutter)
  - Web development (Laravel + Inertia, Next.js)
  - 1 orang bisa gambar digital (asset grafis aman)
- **Output lomba**: MVP (prototipe yang bisa didemo)

---

## 💡 Ide Inti

**Game edukasi interaktif** untuk melatih **critical thinking**, meningkatkan **literasi digital**, dan mencegah **termakan hoax**.

### Inspirasi Gameplay
- **Papers Please** — mekanik verifikasi dokumen, tekanan waktu, decision-making
- **Visual Novel** — narasi interaktif, pilihan berdampak pada cerita

### Target Pengguna
Pelajar **SMA ke bawah** (remaja/sekolah menengah)

### Platform
**Website** (web-based game, bisa diakses dari browser)

---

## 🔥 3 Arah Konsep

### A. "Verifikasi!" — News Desk Simulator
- Pemain jadi **gatekeeper berita** di kantor berita
- Tiap level: terima "laporan masuk" (postingan medsos, artikel, screenshot WA)
- Mekanik ala Papers Please: periksa sumber, cek tanggal, verifikasi gambar, cross-reference
- UI: dokumen di kiri, tools verifikasi di kanan, timer
- Visual Novel: narasi tentang jurnalis muda lawan disinformasi

### B. "Cek Fakta" — Daily Life Hoax Hunter
- Pemain terima hoax di konteks sehari-hari (chat WA, notif, postingan medsos)
- Setiap level = kasus berbeda dari domain berbeda
- Mekanik: pilih tindakan — percaya, cek, atau laporkan
- Gameplay ringan, cocok untuk web
- Papers Please light: dokumen masuk, checklist verifikasi, stamp APPROVED / FLAGGED

### C. ⭐ Hybrid — "Satgas Anti Hoax" (Rekomendasi)
Gabungin terbaik dari A & B:
- **Setting**: Pemain anggota "Satgas Anti Hoax" di sekolah — terima laporan hoax dari siswa lain
- **Gameplay loop**: terima laporan → investigasi (cek sumber, cek fakta, cross-ref) → putuskan (valid/hoax) → edukasi pengirim
- **Papers Please**: interface dokumen, scanning, verification tools
- **Visual Novel**: alur cerita tentang perjuangan melawan misinformasi di lingkungan sekolah
- **Narrative arc**: makin tinggi level, kasus makin kompleks

---

## 🎯 Domain Hoax yang Diusulkan

Campuran — tiap level kasus dari domain berbeda:

| Domain | Contoh Kasus | Relevansi |
|---|---|---|
| **Kesehatan remaja** | Mitos skincare, vaksin, diet ekstrem, vaping | Paling dekat dengan keseharian target |
| **Bencana alam palsu** | Gempa/tsunami hoax, info cuaca palsu | Konteks Indonesia sangat relevan |
| **Info sekolah/beasiswa** | Pendaftaran UN palsu, beasiswa bodong, info akademik hoax | Relevan langsung buat pelajar |
| **Viral challenge hoax** | Tantangan TikTok berbahaya yang menyesatkan | Daily life remaja |
| **WhatsApp chain** | "Bagi-bagi BPJS", pesan berantai palsu | Modus penyebaran hoax paling umum |

---

## ⚙️ Tech Stack (Diskusi)

| Layer | Opsi 1 (Recommended) | Opsi 2 |
|---|---|---|
| **Frontend (game UI)** | Next.js + React | Laravel + Inertia |
| **Backend** | Laravel API | Next.js API routes |
| **LLM/AI** | Gemini/DeepSeek API untuk generate variasi kasus hoax dinamis | Hardcoded scenario library |
| **Assets grafis** | Tim ada yang bisa gambar digital — SVG + CSS animations |

**Catatan**: Next.js lebih recommended karena game ini UI-heavy (interface ala Papers Please + VN dialogue system). Tapi tim udah expert Laravel, jadi Laravel+Inertia tetap opsi valid. Perlu didiskusikan lebih lanjut.

---

## ❓ Hal yang Masih Perlu Diputuskan

- [ ] **Konsep final**: A, B, atau C? Atau modifikasi?
- [ ] **Stack final**: Next.js vs Laravel?
- [ ] **LLM/AI**: pake AI buat dynamic case generation atau hardcoded aja?
- [ ] **Nama game**: perlu nama yang catchy untuk lomba
- [ ] **Judul formal proposal**: apa angle akademiknya?
- [ ] **Pembagian peran tim**: frontend, backend, asset, desain game

---

## 📅 Timeline Target (Indikatif)

| Tenggat | Kegiatan |
|---|---|
| **Juli 2025** | Finalisasi konsep + tech stack + proposal awal |
| **1 Agt – 14 Sep 2025** | Pendaftaran + kirim proposal |
| **Agustus–September** | Development MVP |
| **September** | Seleksi nasional (penjurian proposal) |
| **Oktober** | Pengumuman finalis |
| **Oktober–November** | Penyempurnaan karya final |
| **1–4 Des 2025** | Final luring (presentasi + demo) |

---

> **Next step**: Pilih konsep, tentukan stack, dan breakdown tugas tim.
