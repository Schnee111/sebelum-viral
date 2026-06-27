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
    label: 'Rilis Liputan Investigasi Fakta Keamanan Sistem',
    description:
      'Terbitkan artikel berisi pernyataan resmi BK dan bukti log sistem bahwa nilai rapor tidak pernah diubah, mematahkan hoax dari akar.',
    summary: 'Menerbitkan klarifikasi sistemik',
    requiredEvidenceIds: ['EV_CH1_006'], // Requires Log Sistem
    requiredChoiceId: 'CONF_C3', // Must confront Bu Salma to get her official statement
  },
  {
    id: 'EDITORIAL_CLARIFY_ALDI',
    label: 'Klarifikasi Konteks Candaan Internal',
    description:
      'Terbitkan pembelaan Aldi tentang konteks asli chatnya. Membersihkan namanya dari tuduhan suap, walau tidak mengungkap celah keamanan BK.',
    summary: 'Membersihkan nama korban langsung',
    requiredEvidenceIds: ['EV_CH1_005'], // Requires Alibi Aldi
    requiredChoiceId: 'CONF_C1', // Must confront Aldi
  },
  {
    id: 'EDITORIAL_ANNOUNCEMENT',
    label: 'Buat Opini: Bahaya Kesenjangan & Doxxing',
    description:
      'Terbitkan tulisan opini tentang kesenjangan sosial yang memicu kecemburuan, meredam emosi massa tanpa membela Aldi secara spesifik.',
    summary: 'Menerbitkan opini untuk mendinginkan massa',
    requiredChoiceId: 'CONF_C2', // Must confront Bintang
  },
  {
    id: 'EDITORIAL_GOSSIP_CULTURE',
    label: 'Buat Opini: Toxicnya Budaya Gosip',
    description:
      'Terbitkan opini keras mengutuk budaya sebar screenshot tanpa izin dan bahaya anonimitas di sekolah.',
    summary: 'Menerbitkan teguran keras soal etika gosip',
    requiredChoiceId: 'CONF_C4', // Must confront Rendra
  }
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
    title: 'Kebenaran Sistemik Terungkap',
    narrative: 'Dengan restu BK, artikel investigasimu membongkar bukti log sistem, menggeser fokus dari rumor suap menjadi masalah keamanan siber. Reputasi Aldi pulih total, dan sekolah sadar mereka harus berbenah.',
    reputationDelta: 30,
    rumorSpreadDelta: -40,
    reflectionBullets: [
      'Konfrontasi dengan pihak otoritas (BK) memberikan validitas mutlak pada artikelmu.',
      'Mengungkap kelemahan sistem (komputer BK) melindungi korban salah tuduh secara struktural.',
      'Kamu telah menyelamatkan Aldi dan membuktikan integritas mading sebagai pilar literasi digital.'
    ]
  },
  'EDITORIAL_CLARIFY_ALDI': {
    tier: 'partial',
    title: 'Nama Baik Terselamatkan',
    narrative: 'Kamu berhasil meyakinkan Aldi untuk memberikan pernyataan terbuka soal konteks candaannya. Publik berhenti menyerang Aldi, namun rumor tentang "ada siswa lain yang menyuap Kepsek" masih beredar karena akar masalah (log sistem) tidak dipublikasikan.',
    reputationDelta: 15,
    rumorSpreadDelta: -20,
    reflectionBullets: [
      'Konfrontasi langsung dengan korban (Aldi) memberinya ruang membela diri.',
      'Konteks adalah hal pertama yang hilang di dunia digital.',
      'Meski nama Aldi bersih, gagal mengungkap celah sistem membiarkan rumor berevolusi.'
    ]
  },
  'EDITORIAL_ANNOUNCEMENT': {
    tier: 'partial',
    title: 'Pereda Suasana (Opini Sosial)',
    narrative: 'Setelah berdiskusi dengan Bintang, kamu menulis opini tajam tentang bagaimana kesenjangan sosial memicu perburuan penyihir (witch-hunt) di sekolah. Siswa merenung dan eskalasi menurun, tapi misteri siapa peretas BK tetap tak terpecahkan.',
    reputationDelta: 10,
    rumorSpreadDelta: -10,
    reflectionBullets: [
      'Diskusi dengan Bintang menyadarkanmu bahwa isu ini berakar pada ketidaksetaraan.',
      'Opini publik bisa diarahkan untuk introspeksi massal.',
      'Namun tanpa bukti absolut (log sistem BK), isu teknis peretasan tidak terselesaikan.'
    ]
  },
  'EDITORIAL_GOSSIP_CULTURE': {
    tier: 'failure',
    title: 'Menyalahkan Tanpa Solusi',
    narrative: 'Setelah memarahi Rendra, kamu merilis tulisan yang mengutuk budaya gosip sekolah. Sayangnya, artikelmu dianggap sok suci dan tidak relevan. Murid tetap menyebarkan rumor karena mereka merasa mading gagal menjawab inti tuduhan terhadap Aldi.',
    reputationDelta: -10,
    rumorSpreadDelta: 15,
    reflectionBullets: [
      'Menyerang penyebar pasif (Rendra) tidak menyentuh akar masalah.',
      'Tulisan normatif (ceramah moral) di tengah krisis fakta sering kali diabaikan audiens.',
      'Dibutuhkan jurnalisme data, bukan sekadar opini, untuk mematahkan hoaks spesifik.'
    ]
  }
};
