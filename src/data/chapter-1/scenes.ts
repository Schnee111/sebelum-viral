import type { Scene } from '../../types';

export const scenes: Scene[] = [
  // CH1_S00: Cold Open
  {
    id: 'CH1_S00',
    chapterId: 'CH1',
    title: 'Setelah Viral',
    location: 'Koridor Sekolah',
    mode: 'visual_novel',
    background: 'bg_corridor',
    characters: [],
    dialogues: [
      { id: 'CH1_S00_D001', speaker: 'narrator', expression: 'neutral', text: 'Koridor sekolah pagi itu terasa berbeda. Udara yang biasanya riuh dengan canda tawa kini dipenuhi bisikan-bisikan.' },
      { id: 'CH1_S00_D002', speaker: 'narrator', expression: 'neutral', text: 'Para siswa bergerombol di sudut-sudut koridor, mata mereka tertuju pada layar ponsel masing-masing.' },
      { id: 'CH1_S00_D003', speaker: 'narrator', expression: 'neutral', text: '"Kamu lihat postingan itu belum? Soal Aldi dan dana OSIS..." suara itu terdengar dari balik kerumunan.' },
      { id: 'CH1_S00_D004', speaker: 'narrator', expression: 'neutral', text: 'Poster-poster kampanye OSIS yang terpasang di dinding seolah menatap kosong, sekarang dipenuhi coretan tanda tanya.' },
      { id: 'CH1_S00_D005', speaker: 'narrator', expression: 'neutral', text: 'Tapi semua ini bermula 24 jam sebelumnya...' },
    ],
    unlockEvidenceIds: [],
    nextSceneId: 'CH1_S01',
  },

  // CH1_S01: 24 Jam Sebelumnya
  {
    id: 'CH1_S01',
    chapterId: 'CH1',
    title: '24 Jam Sebelumnya',
    location: 'Ruang Mading',
    mode: 'visual_novel',
    background: 'bg_mading_room',
    characters: [
      { characterId: 'nala', position: 'left', initialExpression: 'neutral' },
      { characterId: 'lala', position: 'right', initialExpression: 'serious' },
    ],
    dialogues: [
      { id: 'CH1_S01_D001', speaker: 'lala', expression: 'serious', text: 'Nala, sebentar lagi pemilihan OSIS. Kamu tahu kan ini tugas besar buat mading kita?' },
      { id: 'CH1_S01_D002', speaker: 'nala', expression: 'neutral', text: 'Iya, Kak Lala. Aku sudah lihat jadwalnya. Ada tiga calon tahun ini, kan?' },
      { id: 'CH1_S01_D003', speaker: 'lala', expression: 'excited', text: 'Betul! Dan yang paling jadi perbincangan itu Aldi, calon dari kelas XI-A.' },
      { id: 'CH1_S01_D004', speaker: 'nala', expression: 'curious', text: 'Aldi? Anak basket itu? Memangnya dia kenapa?' },
      { id: 'CH1_S01_D005', speaker: 'lala', expression: 'serious', text: 'Ada rumor soal dana OSIS yang nggak jelas. Makanya aku tugaskan kamu untuk liputan ini.' },
      { id: 'CH1_S01_D006', speaker: 'nala', expression: 'neutral', text: 'Baik, Kak. Aku akan coba cari informasi seobjektif mungkin.' },
      { id: 'CH1_S01_D007', speaker: 'lala', expression: 'serious', text: 'Ingat, ini bukan soal cari sensasi. Kita jurnalis mading, harus berimbang.' },
      { id: 'CH1_S01_D008', speaker: 'nala', expression: 'determined', text: 'Paham, Kak. Aku mulai dari sumber yang bisa dipercaya.' },
    ],
    choices: [
      { id: 'CH1_C001', text: 'Kita cek sumbernya dulu', effect: 'Pendekatan hati-hati untuk memverifikasi informasi', stateChanges: { cautionScore: 5 } },
      { id: 'CH1_C002', text: 'Kalau sudah viral, kita harus cepat tulis', effect: 'Mengejar berita sebelum terlambat', stateChanges: { reputation: 3, credibilityScore: -5 } },
    ],
    unlockEvidenceIds: ['EV_CH1_001'],
    nextSceneId: 'CH1_S02',
  },

  // CH1_S02: Story Viral
  {
    id: 'CH1_S02',
    chapterId: 'CH1',
    title: 'Story Viral',
    location: 'Smartphone',
    mode: 'phone',
    background: 'bg_phone',
    characters: [
      { characterId: 'nala', position: 'center', initialExpression: 'shocked' },
    ],
    dialogues: [
      { id: 'CH1_S02_D001', speaker: 'system', expression: 'neutral', text: '[Notifikasi] @suarakelas12 baru saja memposting story baru.' },
      { id: 'CH1_S02_D002', speaker: 'narrator', expression: 'neutral', text: 'Nala membuka story tersebut dengan cepat. Layar ponselnya menampilkan tangkapan layar yang mengejutkan.' },
      { id: 'CH1_S02_D003', speaker: 'system', expression: 'neutral', text: '@suarakelas12: "Teman-teman, ada yang tau nggak ke mana perginya dana OSIS yang ratusan ribu itu? Katanya buat acara, tapi acaranya nggak ada. Yang jadi bendahara... Aldi. 🤔"' },
      { id: 'CH1_S02_D004', speaker: 'nala', expression: 'shocked', text: 'Ini serius? Tuduhan langsung ke Aldi tanpa bukti yang jelas...' },
      { id: 'CH1_S02_D005', speaker: 'narrator', expression: 'neutral', text: 'Postingan itu sudah dibagikan puluhan kali. Komentar-komentar mulai membanjiri, ada yang pro dan kontra.' },
    ],
    unlockEvidenceIds: ['EV_CH1_002'],
    nextSceneId: 'CH1_S03',
  },

  // CH1_S03: Chat Kelas XI-B
  {
    id: 'CH1_S03',
    chapterId: 'CH1',
    title: 'Chat Kelas XI-B',
    location: 'Smartphone',
    mode: 'phone',
    background: 'bg_phone',
    characters: [
      { characterId: 'nala', position: 'center', initialExpression: 'worried' },
    ],
    dialogues: [
      { id: 'CH1_S03_D001', speaker: 'system', expression: 'neutral', text: '[Grup Chat: Kelas XI-B]' },
      { id: 'CH1_S03_D002', speaker: 'system', expression: 'neutral', text: 'Budi: "Woy, kalian lihat story @suarakelas12 belum? Aldi nipu??"' },
      { id: 'CH1_S03_D003', speaker: 'system', expression: 'neutral', text: 'Sari: "Seriusan? Padahal dia anak basket terkenal. Gak nyangka."' },
      { id: 'CH1_S03_D004', speaker: 'system', expression: 'neutral', text: 'Rizal: "Jangan langsung percaya lah, namanya juga rumor."' },
      { id: 'CH1_S03_D005', speaker: 'system', expression: 'neutral', text: 'Dewi: "Tapi kalau benar, berarti dia nipu semua orang dong? Aku hampir milih dia."' },
      { id: 'CH1_S03_D006', speaker: 'nala', expression: 'worried', text: 'Gawat, isu ini sudah menyebar luas. Aku harus cari tahu yang sebenarnya.' },
    ],
    unlockEvidenceIds: ['EV_CH1_003'],
    nextSceneId: 'CH1_S04',
  },

  // CH1_S04: Wawancara Aldi
  {
    id: 'CH1_S04',
    chapterId: 'CH1',
    title: 'Wawancara Aldi',
    location: 'Koridor Sekolah',
    mode: 'visual_novel',
    background: 'bg_corridor',
    characters: [
      { characterId: 'nala', position: 'left', initialExpression: 'neutral' },
      { characterId: 'aldi', position: 'right', initialExpression: 'defensive' },
    ],
    dialogues: [
      { id: 'CH1_S04_D001', speaker: 'nala', expression: 'neutral', text: 'Aldi, boleh aku ngobrol sebentar? Soal postingan yang lagi viral itu.' },
      { id: 'CH1_S04_D002', speaker: 'aldi', expression: 'defensive', text: 'Kalau soal itu, aku nggak mau komentar. Itu fitnah semua.' },
      { id: 'CH1_S04_D003', speaker: 'nala', expression: 'neutral', text: 'Aku nggak mau menuduh. Aku cuma mau dengar versimu.' },
      { id: 'CH1_S04_D004', speaker: 'aldi', expression: 'confused', text: 'Aku... aku nggak tahu kenapa ada orang yang nulis begitu. Dana itu bukan urusan aku.' },
      { id: 'CH1_S04_D005', speaker: 'nala', expression: 'curious', text: 'Tapi katanya kamu yang jadi bendahara kegiatan OSIS?' },
      { id: 'CH1_S04_D006', speaker: 'aldi', expression: 'confused', text: 'Aku memang pernah bantu, tapi bukan aku yang pegang duitnya. Itu Kakak kelas yang atur.' },
      { id: 'CH1_S04_D007', speaker: 'nala', expression: 'neutral', text: 'Siapa yang pegang dana waktu itu?' },
      { id: 'CH1_S04_D008', speaker: 'aldi', expression: 'defensive', text: 'Aku nggak tahu pasti. Tapi yang jelas bukan aku. Coba tanya Kak Rendra, dia mantan ketua OSIS.' },
    ],
    choices: [
      { id: 'CH1_C003', text: 'Aku mau tanya soal dana kampanye', effect: 'Menggali informasi soal aliran dana kampanye Aldi', stateChanges: { curiosityScore: 5 } },
      { id: 'CH1_C004', text: 'Ceritakan jadwalmu hari Senin', effect: 'Mengecek alibi Aldi untuk hari yang dituduhkan', stateChanges: { cautionScore: 3 } },
    ],
    unlockEvidenceIds: ['EV_CH1_004'],
    nextSceneId: 'CH1_S05',
  },

  // CH1_S05: Arsip OSIS
  {
    id: 'CH1_S05',
    chapterId: 'CH1',
    title: 'Arsip OSIS',
    location: 'Ruang OSIS',
    mode: 'visual_novel',
    background: 'bg_osis_room',
    characters: [
      { characterId: 'nala', position: 'left', initialExpression: 'curious' },
      { characterId: 'rendra', position: 'right', initialExpression: 'formal' },
    ],
    dialogues: [
      { id: 'CH1_S05_D001', speaker: 'nala', expression: 'curious', text: 'Kak Rendra, terima kasih sudah mau ketemu. Aku mau tanya soal arsip keuangan OSIS.' },
      { id: 'CH1_S05_D002', speaker: 'rendra', expression: 'formal', text: 'Silakan, Nala. Aku senang ada yang mau telusuri dengan serius, bukan langsung percaya rumor.' },
      { id: 'CH1_S05_D003', speaker: 'nala', expression: 'curious', text: 'Bisa aku lihat catatan dana kegiatan OSIS dari semester lalu?' },
      { id: 'CH1_S05_D004', speaker: 'rendra', expression: 'formal', text: 'Tentu. Ini buku kasnya. Dana untuk acara peringatan Hari Pahlawan tercatat di sini.' },
      { id: 'CH1_S05_D005', speaker: 'nala', expression: 'curious', text: 'Ada selisih di sini... Rp 350.000 tercatat keluar, tapi bukti pengeluarannya nggak ada.' },
      { id: 'CH1_S05_D006', speaker: 'rendra', expression: 'concerned', text: 'Memang ada kejanggalan waktu itu. Aku sudah curiga, tapi keburu lulus.' },
      { id: 'CH1_S05_D007', speaker: 'nala', expression: 'curious', text: 'Siapa yang menandatangani pengeluaran ini?' },
      { id: 'CH1_S05_D008', speaker: 'rendra', expression: 'formal', text: 'Tanda tangannya... itu bukan tanda tangan Aldi. Itu tanda tangan wakil ketua, Andra.' },
      { id: 'CH1_S05_D009', speaker: 'nala', expression: 'curious', text: 'Kak, aku juga mau lihat jadwal kegiatan Aldi. Dia bilang dia sering ikut basket.' },
      { id: 'CH1_S05_D010', speaker: 'rendra', expression: 'formal', text: 'Ini jadwalnya. Hari Senin minggu itu Aldi ada latihan basket dari jam 3 sampai jam 5 sore.' },
    ],
    unlockEvidenceIds: ['EV_CH1_005', 'EV_CH1_006', 'EV_CH1_007', 'EV_CH1_009'],
    nextSceneId: 'CH1_S06',
  },

  // CH1_S06: Detective Board Tutorial
  {
    id: 'CH1_S06',
    chapterId: 'CH1',
    title: 'Detective Board Tutorial',
    location: 'Investigasi',
    mode: 'board',
    background: 'bg_board',
    characters: [
      { characterId: 'nala', position: 'center', initialExpression: 'determined' },
    ],
    dialogues: [
      { id: 'CH1_S06_D001', speaker: 'system', expression: 'neutral', text: '[Papan Investigasi]' },
      { id: 'CH1_S06_D002', speaker: 'system', expression: 'neutral', text: 'Di papan ini, kamu bisa menghubungkan bukti-bukti yang sudah kamu kumpulkan. Seret bukti ke papan, lalu tarik garis antar bukti yang saling berkaitan.' },
      { id: 'CH1_S06_D003', speaker: 'system', expression: 'neutral', text: 'Hubungan yang benar akan mengungkap fakta baru. Hubungan yang salah bisa menyesatkan penyelidikanmu.' },
      { id: 'CH1_S06_D004', speaker: 'nala', expression: 'determined', text: 'Oke, waktunya menyusun semua bukti yang sudah aku temukan.' },
    ],
    unlockEvidenceIds: ['EV_CH1_008', 'EV_CH1_010'],
    nextSceneId: 'CH1_S07',
  },

  // CH1_S07: Konfrontasi Aldi
  {
    id: 'CH1_S07',
    chapterId: 'CH1',
    title: 'Konfrontasi Aldi',
    location: 'Koridor Sekolah',
    mode: 'confrontation',
    background: 'bg_corridor',
    characters: [
      { characterId: 'nala', position: 'left', initialExpression: 'determined' },
      { characterId: 'aldi', position: 'right', initialExpression: 'confused' },
    ],
    dialogues: [
      { id: 'CH1_S07_D001', speaker: 'nala', expression: 'determined', text: 'Aldi, aku sudah cek arsip OSIS. Ada yang menarik.' },
      { id: 'CH1_S07_D002', speaker: 'aldi', expression: 'confused', text: 'Apa maksudmu? Kamu sudah lihat buktinya?' },
      { id: 'CH1_S07_D003', speaker: 'nala', expression: 'determined', text: 'Pengeluaran yang dituduhkan ke kamu itu ditandatangani oleh Andra, bukan kamu. Dan hari itu kamu ada latihan basket.' },
      { id: 'CH1_S07_D004', speaker: 'aldi', expression: 'confused', text: 'Serius? Jadi selama ini orang-orang nyalahin aku, padahal bukan aku yang tanggung jawab?' },
      { id: 'CH1_S07_D005', speaker: 'nala', expression: 'neutral', text: 'Kemungkinan besar. Tapi aku masih perlu klarifikasi dari Andra.' },
      { id: 'CH1_S07_D006', speaker: 'aldi', expression: 'neutral', text: 'Terima kasih, Nala. Kamu orang pertama yang benar-benar mau cek fakta.' },
    ],
    unlockEvidenceIds: [],
    nextSceneId: 'CH1_S08',
  },

  // CH1_S08: Keputusan Editorial
  {
    id: 'CH1_S08',
    chapterId: 'CH1',
    title: 'Keputusan Editorial',
    location: 'Ruang Mading',
    mode: 'decision',
    background: 'bg_mading_room',
    characters: [
      { characterId: 'nala', position: 'left', initialExpression: 'worried' },
      { characterId: 'lala', position: 'right', initialExpression: 'serious' },
    ],
    dialogues: [
      { id: 'CH1_S08_D001', speaker: 'lala', expression: 'serious', text: 'Nala, besok adalah deadline untuk edisi mading. Apa yang harus kita tulis?' },
      { id: 'CH1_S08_D002', speaker: 'nala', expression: 'worried', text: 'Aku sudah kumpulkan beberapa bukti. Tapi situasinya belum sepenuhnya jelas.' },
      { id: 'CH1_S08_D003', speaker: 'lala', expression: 'serious', text: 'Kita harus membuat keputusan. Publik sudah menunggu jawaban.' },
      { id: 'CH1_S08_D004', speaker: 'nala', expression: 'worried', text: 'Keputusan ini akan menentukan arah liputan kita. Aku harus pikirkan dengan matang.' },
    ],
    unlockEvidenceIds: [],
    nextSceneId: 'CH1_S09',
  },

  // CH1_S09: Refleksi Chapter
  {
    id: 'CH1_S09',
    chapterId: 'CH1',
    title: 'Refleksi Chapter',
    location: 'Refleksi',
    mode: 'reflection',
    background: 'bg_mading_room',
    characters: [
      { characterId: 'nala', position: 'center', initialExpression: 'neutral' },
    ],
    dialogues: [
      { id: 'CH1_S09_D001', speaker: 'narrator', expression: 'neutral', text: 'Sehari yang panjang bagi Nala. Dari rumor yang viral hingga menemukan bukti yang bertentangan.' },
      { id: 'CH1_S09_D002', speaker: 'nala', expression: 'neutral', text: 'Aku belajar hari ini bahwa tidak semua yang viral itu benar. Tapi bagaimana caranya menyampaikan kebenaran tanpa menyakiti siapapun?' },
      { id: 'CH1_S09_D003', speaker: 'narrator', expression: 'neutral', text: 'Sekarang saatnya merefleksikan pilihan-pilihan yang sudah dibuat sejauh ini...' },
    ],
    unlockEvidenceIds: [],
    nextSceneId: undefined,
  },
];
