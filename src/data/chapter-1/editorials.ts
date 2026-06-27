import type { EditorialDecision, EditorialOutcome } from '../../types';

export const editorialDecisions: EditorialDecision[] = [
  {
    id: 'EDITORIAL_PUBLISH_FAST',
    label: 'Terbitkan headline: "Bukti Chat Memastikan Nilai Aldi Dikatrol"',
    description:
      'Tim Mading mengikuti arus viral demi mendapatkan atensi pembaca, dengan mengandalkan screenshot chat yang belum terverifikasi penuh.',
    summary: 'Menerbitkan tuduhan mengikuti arus viral',
  },
  {
    id: 'EDITORIAL_DELAY',
    label: 'Tahan Berita Sepenuhnya',
    description:
      'Mading memutuskan untuk diam sepenuhnya sampai pelaku peretas komputer BK tertangkap. Reputasi mading mungkin turun karena dianggap lambat/kudet.',
    summary: 'Menunda semua publikasi',
  },
  {
    id: 'EDITORIAL_CLARIFY',
    label: 'Rilis Liputan Investigasi Fakta',
    description:
      'Terbitkan artikel berisi klarifikasi log sistem BK yang membuktikan chat tersebut adalah editan dari hasil retasan, mematahkan hoax utama.',
    summary: 'Menerbitkan klarifikasi berbasis bukti kuat',
    requiredEvidenceIds: ['EV_CH1_006'], // Requires Log Sistem
  },
  {
    id: 'EDITORIAL_ANNOUNCEMENT',
    label: 'Buat Imbauan Opini',
    description:
      'Terbitkan tulisan opini: "Bahaya Menyebar Data Pribadi (Doxxing) Tanpa Konteks". Tidak membela Aldi secara langsung, tapi meredam emosi massa.',
    summary: 'Menerbitkan opini untuk mendinginkan massa',
    requiredEvidenceIds: ['EV_CH1_005'], // Requires Alibi Aldi
  },
];

export const editorialOutcomes: Record<string, EditorialOutcome> = {
  'EDITORIAL_PUBLISH_FAST': {
    tier: 'failure',
    title: 'Disinformasi Tersalurkan',
    narrative: 'Kamu memilih untuk mengikuti arus viral tanpa verifikasi yang cukup. Artikelmu memang banyak dibaca, tetapi kamu secara aktif telah menyebarkan hoaks dan merusak reputasi Aldi yang sebenarnya adalah korban.',
    reputationDelta: -20,
    rumorSpreadDelta: 30,
    reflectionBullets: [
      'Jurnalisme sekolah bukan tentang kecepatan, melainkan kebenaran.',
      'Menyebarkan screenshot tanpa konteks hanya memperkuat rantai hoaks.',
      'Sistem keamanan sekolah (komputer BK) adalah akar masalah sesungguhnya.'
    ]
  },
  'EDITORIAL_DELAY': {
    tier: 'partial',
    title: 'Keheningan yang Menghukum',
    narrative: 'Kamu menahan berita. Meski kamu tidak menyebarkan hoaks, ketidakadaan klarifikasi dari mading membuat rumor terus berkembang liar. Aldi tetap dibully karena tidak ada yang membelanya.',
    reputationDelta: -5,
    rumorSpreadDelta: 10,
    reflectionBullets: [
      'Kadang, tidak bersuara sama berbahayanya dengan menyebarkan hoaks.',
      'Klarifikasi dini bisa mencegah kerusakan nama baik yang permanen.',
      'Mading sekolah memiliki tanggung jawab meluruskan misinformasi.'
    ]
  },
  'EDITORIAL_CLARIFY': {
    tier: 'strong',
    title: 'Kebenaran Terungkap',
    narrative: 'Artikel investigasimu membongkar bukti log sistem BK, menggeser fokus dari rumor suap menjadi masalah keamanan siber. Reputasi Aldi pulih, dan sekolah mulai menyelidiki pelaku sebenarnya.',
    reputationDelta: 30,
    rumorSpreadDelta: -40,
    reflectionBullets: [
      'Klarifikasi berbasis bukti empiris (log sistem) mutlak mematahkan hoaks.',
      'Mengungkap kelemahan sistem (komputer BK) melindungi korban salah tuduh.',
      'Kamu telah menyelamatkan Aldi dan membuktikan integritas mading.'
    ]
  },
  'EDITORIAL_ANNOUNCEMENT': {
    tier: 'partial',
    title: 'Pereda Suasana',
    narrative: 'Kamu menerbitkan opini tentang bahaya doxxing. Opini ini berhasil membuat siswa menahan diri untuk membully Aldi, namun rumor utamanya tidak terpecahkan karena log sistem tidak diungkap.',
    reputationDelta: 10,
    rumorSpreadDelta: -10,
    reflectionBullets: [
      'Mengedukasi pembaca tentang etika digital cukup meredakan perburuan.',
      'Namun tanpa bukti valid yang mematahkan rumor, keraguan publik tetap ada.',
      'Dibutuhkan bukti absolut (log) untuk membersihkan nama korban sepenuhnya.'
    ]
  }
};
