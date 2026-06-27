import type { Scene } from '../../types';

export const scenes: Scene[] = [
  // ACT 1 - S00: The Bomb (Gelombang 1)
  {
    id: 'CH1_S00',
    chapterId: 'CH1',
    title: 'Satu Percikan',
    location: 'Smartphone',
    mode: 'phone',
    background: 'bg_phone',
    characters: [
      { characterId: 'nala', position: 'center', initialExpression: 'shocked' },
    ],
    dialogues: [
      { id: 'CH1_S00_D001', speaker: 'system', expression: 'neutral', text: '[Notifikasi] @GarudaMenfess baru saja memposting sesuatu.' },
      { id: 'CH1_S00_D002', speaker: 'system', expression: 'neutral', text: '@GarudaMenfess: "Bisa-bisanya ada yang bangga nyogok demi kuota SNBP. Pantes yang pinter kalah sama yang berduit. #TolakAldi #GarudaKorupsi"' },
      { id: 'CH1_S00_D003', speaker: 'narrator', expression: 'neutral', text: 'Terdapat lampiran screenshot chat WA. Di situ tertulis jelas dari Aldi: "Santai, bokap gue udah ngopi sama Kepsek. Nilai rapor aman di-markup, kuota FK di tangan. Yang miskin minggir dulu wkwk."' },
      { id: 'CH1_S00_D004', speaker: 'system', expression: 'neutral', text: '[Komentar netizen masuk dengan sangat cepat]', autoAdvance: true, autoAdvanceDelay: 800 },
      { id: 'CH1_S00_D005a', speaker: 'system', expression: 'neutral', text: 'User1: "Gila! DO aja nih anak!"', autoAdvance: true, autoAdvanceDelay: 300 },
      { id: 'CH1_S00_D005b', speaker: 'system', expression: 'neutral', text: 'User2: "Bapaknya PNS ya? Cek rekeningnya woy!"', autoAdvance: true, autoAdvanceDelay: 300 },
      { id: 'CH1_S00_D005c', speaker: 'system', expression: 'neutral', text: 'User3: "Spill alamatnya dong! Berani amat korupsi seat."', autoAdvance: true, autoAdvanceDelay: 300 },
      { id: 'CH1_S00_D005d', speaker: 'system', expression: 'neutral', text: 'User4: "Sekolah mana nih? Blacklist aja kampus-kampus!"', autoAdvance: true, autoAdvanceDelay: 300 },
      { id: 'CH1_S00_D005e', speaker: 'system', expression: 'neutral', text: 'User5: "Muka tebel banget bangsat."', autoAdvance: true, autoAdvanceDelay: 300 },
      { id: 'CH1_S00_D005f', speaker: 'system', expression: 'neutral', text: 'User6: "Kawal terus sampe pake baju oren!"', autoAdvance: true, autoAdvanceDelay: 500 },
      { id: 'CH1_S00_D006', speaker: 'nala', expression: 'shocked', text: 'Apa-apaan ini?! Ini baru di-post 9 menit yang lalu, retweets-nya udah ribuan!' },
      { id: 'CH1_S00_D007', speaker: 'narrator', expression: 'neutral', text: 'Nala tahu itu gaya bercandaan Aldi yang sarkas. Tapi bagi ribuan orang di internet, itu adalah pengakuan dosa.' },
      { id: 'CH1_S00_D008', speaker: 'nala', expression: 'worried', text: 'Gawat, aku harus cari Aldi sekarang sebelum situasi makin parah!' },
    ],
    unlockEvidenceIds: ['EV_CH1_001'], // Screenshot Chat Aldi
    nextSceneId: 'CH1_S01',
  },

  // ACT 1 - S01: The Fallout
  {
    id: 'CH1_S01',
    chapterId: 'CH1',
    title: 'Kehancuran',
    location: 'Ruang UKS',
    mode: 'visual_novel',
    background: 'bg_osis_room', // reuse as UKS for now
    characters: [
      { characterId: 'nala', position: 'left', initialExpression: 'worried' },
      { characterId: 'aldi', position: 'right', initialExpression: 'defensive' }, // use defensive as proxy for panic
    ],
    dialogues: [
      { id: 'CH1_S01_D001', speaker: 'narrator', expression: 'neutral', text: 'Suasana sekolah benar-benar kacau. Mobil orang tua Aldi di parkiran sudah dicoret dengan spidol merah: "MALING KUOTA".' },
      { id: 'CH1_S01_D002', speaker: 'narrator', expression: 'neutral', text: 'Nala menemukan Aldi mengunci diri di Ruang UKS, napasnya tersengal-sengal melihat ponselnya.' },
      { id: 'CH1_S01_D003', speaker: 'nala', expression: 'worried', text: 'Al, kamu nggak apa-apa? Tarik napas, Al...' },
      { id: 'CH1_S01_D004', speaker: 'aldi', expression: 'defensive', text: 'Na... gue hancur, Na. Gue bahkan nggak masuk kuota eligible SNBP. Gue gagal!' },
      { id: 'CH1_S01_D005', speaker: 'aldi', expression: 'defensive', text: 'Tapi kenapa... kenapa satu sekolah nuduh gue nyuap Kepsek?!' },
      { id: 'CH1_S01_D006', speaker: 'nala', expression: 'worried', text: 'Chat di menfess itu... itu beneran chat kamu?' },
      { id: 'CH1_S01_D007', speaker: 'aldi', expression: 'defensive', text: 'Itu jokes, Na! Candaan sebulan lalu pas mabar game! Gue niruin meme anak pejabat di TikTok! Tapi gue lupa ngetik itu ke siapa...' },
      { id: 'CH1_S01_D008', speaker: 'aldi', expression: 'defensive', text: 'Gue mau bikin klarifikasi di IG sekarang, Na. Gue bakal jelasin semuanya!' },
    ],
    choices: [
      { 
        id: 'CH1_C001', 
        text: 'Jangan Al, netizen lagi panas. Nanti malah jadi bumerang.', 
        effect: 'Menyarankan Aldi untuk diam sementara waktu', 
        stateChanges: { cautionScore: 10 } 
      },
      { 
        id: 'CH1_C002', 
        text: 'Ya, kamu harus bela diri! Post sekarang juga!', 
        effect: 'Mendukung Aldi berhadapan langsung dengan massa', 
        stateChanges: { cautionScore: -10, rumorSpread: 15 } 
      },
    ],
    unlockEvidenceIds: [],
    nextSceneId: 'CH1_S02',
  },

  // ACT 1 - S02: The Promise
  {
    id: 'CH1_S02',
    chapterId: 'CH1',
    title: 'Janji Nala',
    location: 'Ruang Mading',
    mode: 'visual_novel',
    background: 'bg_mading_room',
    characters: [
      { characterId: 'nala', position: 'left', initialExpression: 'determined' },
      { characterId: 'lala', position: 'right', initialExpression: 'serious' },
    ],
    dialogues: [
      { id: 'CH1_S02_D001', speaker: 'narrator', expression: 'neutral', text: 'Klarifikasi Aldi ternyata tidak membantu. Tangkapan layarnya justru disebar lagi untuk dicari-cari kesalahannya. Api makin membesar.' },
      { id: 'CH1_S02_D002', speaker: 'narrator', expression: 'neutral', text: 'Sementara itu, Kepala Sekolah baru saja mengadakan konferensi pers dadakan. "Sekolah akan mengusut tuntas pelanggaran etika," ujarnya, yang justru terdengar seolah menyalahkan Aldi.' },
      { id: 'CH1_S02_D003', speaker: 'lala', expression: 'serious', text: 'Nala, ini sudah lepas kendali. Hoax baru mulai bermunculan. Sekarang ada yang bahas nilai rapor Aldi.' },
      { id: 'CH1_S02_D004', speaker: 'nala', expression: 'determined', text: 'Setahun yang lalu, waktu aku di-bully gara-gara gosip murahan, Aldi satu-satunya yang maju belain aku, Kak.' },
      { id: 'CH1_S02_D005', speaker: 'nala', expression: 'determined', text: 'Kalau chat itu cuma candaan yang dipotong konteksnya, kita harus cari tahu siapa yang motong konteks itu.' },
      { id: 'CH1_S02_D006', speaker: 'lala', expression: 'serious', text: 'Ingat, Nala. Tujuan kita bukan mencari siapa pelakunya untuk balas dendam, tapi menghentikan siklus hoax ini.' },
      { id: 'CH1_S02_D007', speaker: 'nala', expression: 'determined', text: 'Aku paham. Aku akan mulai menyelidiki. Mulai dari mana sumber kebocoran ini.' },
    ],
    unlockEvidenceIds: [],
    nextSceneId: 'CH1_HUB',
  },

  // ACT 2 - HUB: Free Investigation Mode
  {
    id: 'CH1_HUB',
    chapterId: 'CH1',
    title: 'Investigasi Bebas',
    location: 'Area Sekolah',
    mode: 'hub',
    background: 'bg_corridor',
    characters: [],
    dialogues: [],
    unlockEvidenceIds: [],
    // Hub scenes typically do not have a forced nextSceneId.
  },
  
  {
    id: 'CH1_CONFRONTATION_HUB',
    chapterId: 'CH1',
    title: 'Penentuan Sudut Pandang',
    location: 'Ruang Mading',
    mode: 'visual_novel',
    background: 'bg_mading_room',
    characters: [
      { characterId: 'nala', position: 'center', initialExpression: 'determined' }
    ],
    dialogues: [
      { id: 'CONF_HUB_01', speaker: 'nala', expression: 'worried', text: 'Hoaks ini sudah menyebar terlalu jauh. Satu tuduhan dibantah, dua tuduhan baru muncul.' },
      { id: 'CONF_HUB_02', speaker: 'nala', expression: 'determined', text: 'Tugas jurnalis bukan sekadar mencari "siapa pelakunya" untuk dijadikan samsak sosial baru. Itu hanya akan memutar siklus kebencian.' },
      { id: 'CONF_HUB_03', speaker: 'nala', expression: 'determined', text: 'Aku harus memutus rantai ini. Siapa yang harus aku konfrontasi untuk meredam kekacauan ini dari akar masalahnya?' }
    ],
    choices: [
      { id: 'CONF_C1', text: 'Aldi (Minta dia akui konteks candaannya)', effect: 'Redam narasi suap', tickerDelta: 0, nextSceneId: 'CH1_CONFRONTATION_ALDI' },
      { id: 'CONF_C2', text: 'Bintang (Ajak diskusi kesenjangan siswa)', effect: 'Redam isu kaya vs miskin', tickerDelta: 0, nextSceneId: 'CH1_CONFRONTATION_BINTANG' },
      { id: 'CONF_C3', text: 'Bu Salma (Tuntut transparansi nilai)', effect: 'Redam isu sistemik', tickerDelta: 0, nextSceneId: 'CH1_CONFRONTATION_SALMA' },
      { id: 'CONF_C4', text: 'Rendra (Minta klarifikasi rantai pesan)', effect: 'Redam penyebaran awal', tickerDelta: 0, nextSceneId: 'CH1_CONFRONTATION_RENDRA' }
    ],
    unlockEvidenceIds: [],
  },
  {
    id: 'CH1_CONFRONTATION_ALDI',
    chapterId: 'CH1',
    title: 'Konfrontasi Aldi',
    location: 'UKS',
    mode: 'confrontation',
    background: 'bg_corridor',
    characters: [
      { characterId: 'nala', position: 'left', initialExpression: 'determined' },
      { characterId: 'aldi', position: 'right', initialExpression: 'defensive' }
    ],
    dialogues: [
      { id: 'CONF_A_01', speaker: 'nala', expression: 'determined', text: 'Al, gue tau chat itu cuma sarkasme. Tapi lo sadar nggak kalau candaan lo itu punya konsekuensi?' },
      { id: 'CONF_A_02', speaker: 'aldi', expression: 'defensive', text: 'Gue cuma bercanda sama temen, Nal! Mana gue tau bakal disebar sama anonim dan dipelintir begini?' },
      { id: 'CONF_A_03', speaker: 'nala', expression: 'neutral', text: 'Di era digital, konteks itu hal pertama yang hilang saat pesan diteruskan. Candaan soal "orang dalam" nyakitin mereka yang udah berjuang keras tapi gagal.' },
      { id: 'CONF_A_04', speaker: 'aldi', expression: 'worried', text: 'Gue... gue nggak mikir sejauh itu. Gue cuma mau kelihatan keren aja di depan anak-anak tongkrongan.' },
      { id: 'CONF_A_05', speaker: 'nala', expression: 'determined', text: 'Kalau lo beneran mau bersihin nama lo, jangan cuma playing victim. Akui kebodohan lo, dan luruskan konteks aslinya.' },
      { id: 'CONF_A_06', speaker: 'narrator', expression: 'neutral', text: 'Aldi akhirnya setuju untuk membuat pernyataan resmi mengenai konteks asli chat tersebut, mematikan narasi bahwa dia menyuap sekolah.' },
      { id: 'CONF_A_07', speaker: 'narrator', expression: 'neutral', text: 'Satu rantai terputus. Tapi berita apa yang akan kamu rilis besok?' }
    ],
    unlockEvidenceIds: [],
  },
  {
    id: 'CH1_CONFRONTATION_BINTANG',
    chapterId: 'CH1',
    title: 'Konfrontasi Bintang',
    location: 'Lobi Utama',
    mode: 'confrontation',
    background: 'bg_corridor',
    characters: [
      { characterId: 'nala', position: 'left', initialExpression: 'determined' },
      { characterId: 'bintang', position: 'right', initialExpression: 'defensive' }
    ],
    dialogues: [
      { id: 'CONF_B_01', speaker: 'nala', expression: 'determined', text: 'Bin, gue ngerti kenapa banyak yang percaya rumor ini. Ada frustrasi nyata soal kesenjangan kesempatan di sekolah kita.' },
      { id: 'CONF_B_02', speaker: 'bintang', expression: 'defensive', text: 'Bagus kalau lo sadar. Aldi itu simbol dari anak emas yang dapetin segalanya tanpa harus susah payah akademis.' },
      { id: 'CONF_B_03', speaker: 'nala', expression: 'neutral', text: 'Tapi menghancurkan Aldi dengan hoaks nggak akan memperbaiki sistem, Bin. Kalau kita benci sistem yang nggak adil, kita harus serang sistemnya, bukan individunya.' },
      { id: 'CONF_B_04', speaker: 'bintang', expression: 'shocked', text: 'Jadi menurut lo gue harus diam aja liat ketidakadilan ini?' },
      { id: 'CONF_B_05', speaker: 'nala', expression: 'determined', text: 'Bantu gue nulis opini di Mading. Kita angkat soal transparansi seleksi lomba dan beasiswa. Pake data, bukan fitnah.' },
      { id: 'CONF_B_06', speaker: 'narrator', expression: 'neutral', text: 'Bintang terdiam, lalu mengangguk pelan. Energi marahnya kini dialihkan ke arah yang lebih konstruktif.' },
      { id: 'CONF_B_07', speaker: 'narrator', expression: 'neutral', text: 'Hoaks berbasis kecemburuan sosial berhasil diredam. Saatnya memutuskan judul berita utama.' }
    ],
    unlockEvidenceIds: [],
  },
  {
    id: 'CH1_CONFRONTATION_RENDRA',
    chapterId: 'CH1',
    title: 'Konfrontasi Rendra',
    location: 'Kantin',
    mode: 'confrontation',
    background: 'bg_corridor',
    characters: [
      { characterId: 'nala', position: 'left', initialExpression: 'determined' },
      { characterId: 'rendra', position: 'right', initialExpression: 'defensive' }
    ],
    dialogues: [
      { id: 'CONF_R_01', speaker: 'nala', expression: 'determined', text: 'Ren, gue tau lo yang nyebarin screenshot itu pertama kali ke grup tongkrongan, kan?' },
      { id: 'CONF_R_02', speaker: 'rendra', expression: 'defensive', text: 'Gue kan cuma nerusin! Gue dapet dari DM IG. Ya gue kira beneran, abisnya chatnya pake akun Aldi!' },
      { id: 'CONF_R_03', speaker: 'nala', expression: 'angry', text: 'Itu dia masalahnya! Lo nerusin sesuatu tanpa repot ngecek ke Aldi langsung. Jari lo lebih cepet dari otak lo.' },
      { id: 'CONF_R_04', speaker: 'rendra', expression: 'worried', text: 'Y-ya maaf... Gue nyesel kok. Sekarang satu sekolah jadi ribut.' },
      { id: 'CONF_R_05', speaker: 'nala', expression: 'determined', text: 'Lo harus klarifikasi ke grup bahwa lo nyebarin itu tanpa tahu konteks. Jangan biarin followers lo terus digiring sama asumsi buta.' },
      { id: 'CONF_R_06', speaker: 'narrator', expression: 'neutral', text: 'Rendra akhirnya mengakui kesalahannya di publik. Kecepatan penyebaran hoaks pertama berhasil diperlambat.' },
      { id: 'CONF_R_07', speaker: 'narrator', expression: 'neutral', text: 'Tapi kerusakan sudah terjadi. Saatnya membuat keputusan editorial untuk mading besok.' }
    ],
    unlockEvidenceIds: [],
  },
  {
    id: 'CH1_CONFRONTATION_SALMA',
    chapterId: 'CH1',
    title: 'Konfrontasi Bu Salma',
    location: 'Ruang BK',
    mode: 'confrontation',
    background: 'bg_bk_room',
    characters: [
      { characterId: 'nala', position: 'left', initialExpression: 'determined' },
      { characterId: 'busalma', position: 'right', initialExpression: 'defensive' }
    ],
    dialogues: [
      { id: 'CONF_S_01', speaker: 'nala', expression: 'determined', text: 'Bu Salma, rumor bahwa nilai Aldi dikatrol nggak akan menyebar kalau sekolah transparan dari awal.' },
      { id: 'CONF_S_02', speaker: 'busalma', expression: 'defensive', text: 'Nala, kurikulum dan penilaian itu wewenang guru. Siswa tidak perlu ikut campur urusan dapur sekolah.' },
      { id: 'CONF_S_03', speaker: 'nala', expression: 'neutral', text: 'Ketertutupan itulah yang melahirkan asumsi liar, Bu. Kalau sekolah nggak mau dituduh terima suap, sekolah harus buka data bahwa inflasi nilai itu sistemik.' },
      { id: 'CONF_S_04', speaker: 'busalma', expression: 'worried', text: 'Tapi itu akan memalukan nama sekolah... Mengakui bahwa standar penilaian kita diturunkan demi statistik?' },
      { id: 'CONF_S_05', speaker: 'nala', expression: 'determined', text: 'Lebih baik jujur sekarang daripada mengorbankan masa depan murid-murid karena fitnah, Bu.' },
      { id: 'CONF_S_06', speaker: 'narrator', expression: 'neutral', text: 'Bu Salma menyadari kesalahannya dan berjanji akan membujuk Kepala Sekolah untuk merilis data nilai yang sebenarnya.' },
      { id: 'CONF_S_07', speaker: 'narrator', expression: 'neutral', text: 'Tuduhan institusional bisa direda. Sekarang, saatnya menentukan sudut pandang editorialmu.' }
    ],
    unlockEvidenceIds: [],
  },

  // ==========================================
  // ACT 2 - HOAX WAVES (ESCALATION INTERRUPTS)
  // ==========================================
  {
    id: 'WAVE_2_ALERT',
    chapterId: 'CH1',
    title: 'Gelombang 2: Rapor Dikatrol',
    location: 'Smartphone',
    mode: 'phone',
    background: 'bg_phone',
    characters: [
      { characterId: 'nala', position: 'center', initialExpression: 'shocked' }
    ],
    dialogues: [
      { id: 'W2_01', speaker: 'system', expression: 'neutral', text: '[Notifikasi] Postingan baru di @GarudaMenfess viral!' },
      { id: 'W2_02', speaker: 'system', expression: 'neutral', text: '@Anon: "Pantesan aja Aldi eligible. Coba cek nilai rapornya dari semester 1, naiknya drastis banget ga wajar. Bau-bau katrolan massal nih."' },
      { id: 'W2_03', speaker: 'system', expression: 'neutral', text: 'UserX: "Wah parah, dari dulu udah curang ternyata!"', autoAdvance: true, autoAdvanceDelay: 500 },
      { id: 'W2_04', speaker: 'system', expression: 'neutral', text: 'UserY: "Spill data rapornya dong!"', autoAdvance: true, autoAdvanceDelay: 500 },
      { id: 'W2_05', speaker: 'nala', expression: 'shocked', text: 'Ya ampun, hoax baru muncul lagi. Sekarang mereka nyerang nilai Aldi dari kelas 10.' },
      { id: 'W2_06', speaker: 'nala', expression: 'determined', text: 'Aku harus ke Ruang BK untuk cek apakah nilai Aldi benar-benar dimanipulasi atau ini cuma tren inflasi nilai.' }
    ],
    unlockEvidenceIds: [],
    nextSceneId: 'CH1_HUB'
  },
  {
    id: 'WAVE_3_ALERT',
    chapterId: 'CH1',
    title: 'Gelombang 3: Lomba Diatur',
    location: 'Smartphone',
    mode: 'phone',
    background: 'bg_phone',
    characters: [
      { characterId: 'nala', position: 'center', initialExpression: 'shocked' }
    ],
    dialogues: [
      { id: 'W3_01', speaker: 'system', expression: 'neutral', text: '[Notifikasi] Isu baru meledak di grup angkatan.' },
      { id: 'W3_02', speaker: 'system', expression: 'neutral', text: 'SiswaA: "Eh kalian sadar ga sih, yang dikirim lomba keluar selalu Aldi. Bintang yang juara 1 olimpiade aja ga pernah dikirim."' },
      { id: 'W3_03', speaker: 'system', expression: 'neutral', text: 'SiswaB: "Ada maen sih ini. Bapaknya Aldi sering nyumbang buat sekolah kan?"' },
      { id: 'W3_04', speaker: 'nala', expression: 'worried', text: 'Api merambat lagi. Sekarang soal seleksi lomba. Aku harus tanya Bintang di lapangan.' }
    ],
    unlockEvidenceIds: [],
    nextSceneId: 'CH1_HUB'
  },
  {
    id: 'WAVE_4_ALERT',
    chapterId: 'CH1',
    title: 'Gelombang 4: Doxxing',
    location: 'Smartphone',
    mode: 'phone',
    background: 'bg_phone',
    characters: [
      { characterId: 'nala', position: 'center', initialExpression: 'worried' }
    ],
    dialogues: [
      { id: 'W4_01', speaker: 'system', expression: 'neutral', text: '[Peringatan: Doxxing Massal]' },
      { id: 'W4_02', speaker: 'system', expression: 'neutral', text: 'AnonX: "Ini foto rumah si Aldi, dan ini IG bapaknya. Gaskan silaturahmi!"' },
      { id: 'W4_03', speaker: 'system', expression: 'neutral', text: 'Netizen: "Wah, pejabat rupanya. Pantas kebal hukum!"' },
      { id: 'W4_04', speaker: 'nala', expression: 'shocked', text: 'Mereka mulai nyebarin data pribadi Aldi! Ini udah masuk ke ranah kriminal.' }
    ],
    unlockEvidenceIds: [],
    nextSceneId: 'CH1_HUB'
  },
  {
    id: 'WAVE_5_ALERT',
    chapterId: 'CH1',
    title: 'Gelombang 5: Kepsek Terlibat',
    location: 'Smartphone',
    mode: 'phone',
    background: 'bg_phone',
    characters: [
      { characterId: 'nala', position: 'center', initialExpression: 'shocked' }
    ],
    dialogues: [
      { id: 'W5_01', speaker: 'system', expression: 'neutral', text: '@gerakan_siswa_sadar: "Kami menuntut transparansi! Ada dugaan Kepala Sekolah menerima transfer untuk memasukkan siswa ke daftar prioritas!"' },
      { id: 'W5_02', speaker: 'nala', expression: 'shocked', text: 'Tuduhan suap ke Kepala Sekolah... Kalau ini dipercaya, sekolah kita bisa hancur.' },
      { id: 'W5_03', speaker: 'nala', expression: 'determined', text: 'Waktuku habis. Aku harus memilih siapa yang akan kukonfrontasi secara total dengan bukti-bukti yang ada.' }
    ],
    unlockEvidenceIds: [],
    nextSceneId: 'CH1_HUB' // Or force to Confrontation decision
  },

  // ==========================================
  // ACT 2 - LOCATION ENTRY SCENES (HUB MENUS)
  // ==========================================
  {
    id: 'LOC_KANTIN',
    chapterId: 'CH1',
    title: 'Kantin (Rendra)',
    location: 'Kantin Sekolah',
    mode: 'exploration',
    background: 'bg_corridor',
    characters: [
      { characterId: 'nala', position: 'left', initialExpression: 'neutral' },
      { characterId: 'rendra', position: 'right', initialExpression: 'neutral' }
    ],
    dialogues: [],
    unlockEvidenceIds: [],
    exploration: {
      characterId: 'rendra',
      talkSceneId: 'LOC_KANTIN_TALK',
      investigationSceneId: 'LOC_KANTIN_INVESTIGATION',
      interrogationScenes: {
        soft: 'LOC_KANTIN_INTEROGASI_SOFT',
        hard: 'LOC_KANTIN_INTEROGASI_HARD'
      },
      presentEvidenceRoutes: {
        'EV_CH1_002': 'LOC_KANTIN_PRESENT_CHAT'
      },
      defaultPresentSceneId: 'LOC_KANTIN_PRESENT_DEFAULT'
    }
  },
  {
    id: 'LOC_KANTIN_TALK',
    chapterId: 'CH1',
    title: 'Ngobrol dengan Rendra',
    location: 'Kantin Sekolah',
    mode: 'visual_novel',
    background: 'bg_corridor',
    characters: [
      { characterId: 'nala', position: 'left', initialExpression: 'neutral' },
      { characterId: 'rendra', position: 'right', initialExpression: 'neutral' }
    ],
    dialogues: [
      { id: 'LR_T1', speaker: 'rendra', expression: 'neutral', text: 'Eh, Nala. Tumben ke kantin jam segini. Nyariin gue?' },
      { id: 'LR_T2', speaker: 'nala', expression: 'neutral', text: 'Nggak sih, kebetulan lewat aja. Lo santai banget, padahal sekolah lagi heboh.' },
      { id: 'LR_T3', speaker: 'rendra', expression: 'neutral', text: 'Biasa aja kali, yang heboh kan Aldi. Makanya jangan kebanyakan tingkah.' }
    ],
    choices: [
      { id: 'LKT_C1', text: 'Kembali', effect: 'Selesai bicara', tickerDelta: 0, nextSceneId: 'LOC_KANTIN' }
    ],
    unlockEvidenceIds: [],
    nextSceneId: 'LOC_KANTIN'
  },
  {
    id: 'LOC_KANTIN_INVESTIGATION',
    chapterId: 'CH1',
    title: 'Investigasi Kantin',
    location: 'Kantin Sekolah',
    mode: 'visual_novel',
    background: 'bg_corridor',
    characters: [
      { characterId: 'nala', position: 'center', initialExpression: 'curious' }
    ],
    dialogues: [
      { id: 'LKI_1', speaker: 'narrator', expression: 'neutral', text: 'Nala mengamati meja tempat Rendra dan teman-temannya nongkrong.' },
      { id: 'LKI_2', speaker: 'nala', expression: 'curious', text: 'Mereka pada asyik main HP sambil ketawa-ketawa. Kayaknya mereka punya grup tongkrongan sendiri.' },
      { id: 'LKI_3', speaker: 'narrator', expression: 'neutral', text: 'Insight baru ditambahkan ke catatan Nala: "Grup Tongkrongan Rendra". Ini bisa jadi sumber awal mula tersebarnya foto.' }
    ],
    choices: [
      { id: 'LKPD_C1', text: 'Kembali', effect: '', tickerDelta: 1, nextSceneId: 'LOC_KANTIN' }
    ],
    unlockEvidenceIds: [],
    nextSceneId: 'LOC_KANTIN'
  },
  {
    id: 'LOC_KANTIN_PRESENT_DEFAULT',
    chapterId: 'CH1',
    title: 'Konfrontasi (Gagal)',
    location: 'Kantin',
    mode: 'visual_novel',
    background: 'bg_corridor',
    characters: [
      { characterId: 'nala', position: 'left', initialExpression: 'determined' },
      { characterId: 'rendra', position: 'right', initialExpression: 'defensive' }
    ],
    dialogues: [
      { id: 'LKPD_1', speaker: 'nala', expression: 'determined', text: 'Coba lo lihat bukti ini, Rendra.' },
      { id: 'LKPD_2', speaker: 'rendra', expression: 'defensive', text: 'Hah? Bukti apaan? Nggak nyambung sama sekali sama gue.' },
      { id: 'LKPD_3', speaker: 'nala', expression: 'worried', text: '(Sepertinya aku menunjukkan bukti yang salah...)' }
    ],
    unlockEvidenceIds: [],
    nextSceneId: 'LOC_KANTIN'
  },
  {
    id: 'LOC_KANTIN_PRESENT_CHAT',
    chapterId: 'CH1',
    title: 'Konfrontasi Bukti Chat',
    location: 'Kantin',
    mode: 'visual_novel',
    background: 'bg_corridor',
    characters: [
      { characterId: 'nala', position: 'left', initialExpression: 'determined' },
      { characterId: 'rendra', position: 'right', initialExpression: 'shocked' }
    ],
    dialogues: [
      { id: 'LKPC_1', speaker: 'nala', expression: 'determined', text: 'Lo tau kan sama screenshot chat ini? Akun lo yang pertama kali nge-retweet postingan GarudaMenfess.' },
      { id: 'LKPC_2', speaker: 'rendra', expression: 'shocked', text: 'L-lah? Kok nuduh gue? Gue cuma bantu nge-share biar orang-orang pada melek!' },
      { id: 'LKPC_3', speaker: 'nala', expression: 'determined', text: 'Berarti lo emang udah nyimpen screenshot ini sebelum viral. Jujur aja, lo dapet dari mana?!' },
      { id: 'LKPC_4', speaker: 'narrator', expression: 'neutral', text: '(Pertahanan Rendra goyah. Bagaimana caramu mendesaknya?)' }
    ],
    choices: [
      { id: 'LKPC_C1', text: 'Pendekatan Halus: Bujuk agar jujur', effect: 'Rendra mungkin menghindar', tickerDelta: 1, nextSceneId: 'LOC_KANTIN_INTEROGASI_SOFT' },
      { id: 'LKPC_C2', text: 'Pendekatan Keras: Ancam lapor sekolah', effect: 'Rendra akan tertekan', tickerDelta: 1, nextSceneId: 'LOC_KANTIN_INTEROGASI_HARD' }
    ],
    unlockEvidenceIds: [],
    nextSceneId: 'LOC_KANTIN'
  },
  {
    id: 'LOC_KANTIN_INTEROGASI_SOFT',
    chapterId: 'CH1',
    title: 'Interogasi (Halus)',
    location: 'Kantin',
    mode: 'visual_novel',
    background: 'bg_corridor',
    characters: [
      { characterId: 'nala', position: 'left', initialExpression: 'neutral' },
      { characterId: 'rendra', position: 'right', initialExpression: 'defensive' }
    ],
    dialogues: [
      { id: 'LKIS_1', speaker: 'nala', expression: 'neutral', text: 'Ren, gue cuma nanya baik-baik. Kalau bukan lo yang bikin editan itu, kasih tau gue sumbernya biar nama lo bersih.' },
      { id: 'LKIS_2', speaker: 'rendra', expression: 'defensive', text: 'Gue dapet dari... aduh, gue lupa. Pokoknya dari orang lain.' },
      { id: 'LKIS_3', speaker: 'nala', expression: 'worried', text: '(Dia berbohong. Pendekatan halus tidak mempan untuk Rendra, dia butuh ditekan keras.)' }
    ],
    choices: [
      { id: 'LKIS_C1', text: 'Kembali', effect: '', tickerDelta: 1, nextSceneId: 'LOC_KANTIN' }
    ],
    unlockEvidenceIds: [],
    nextSceneId: 'LOC_KANTIN'
  },
  {
    id: 'LOC_KANTIN_INTEROGASI_HARD',
    chapterId: 'CH1',
    title: 'Interogasi (Keras)',
    location: 'Kantin',
    mode: 'visual_novel',
    background: 'bg_corridor',
    characters: [
      { characterId: 'nala', position: 'left', initialExpression: 'angry' },
      { characterId: 'rendra', position: 'right', initialExpression: 'shocked' }
    ],
    dialogues: [
      { id: 'LKIH_1', speaker: 'nala', expression: 'angry', text: 'Jangan bohong! Gue udah perhatiin, anak-anak tongkrongan lo dari tadi ketawa-ketiwi mantengin HP. Kalian kan yang merencanakan ini?!' },
      { id: 'LKIH_2', speaker: 'rendra', expression: 'shocked', text: 'B-bukan! Bukan dari tongkrongan gue! Sumpah!' },
      { id: 'LKIH_3', speaker: 'nala', expression: 'determined', text: 'Lalu dari mana?! Ngaku sekarang atau gue laporin ke sekolah kalau lo otak doxxing-nya!' },
      { id: 'LKIH_4', speaker: 'rendra', expression: 'defensive', text: 'Oke, oke! Gue dapet dari DM IG akun fake! Ada yang ngirim tangkapan layar itu ke gue.' },
      { id: 'LKIH_5', speaker: 'nala', expression: 'curious', text: 'Akun fake? Ada petunjuk lain?' },
      { id: 'LKIH_6', speaker: 'rendra', expression: 'neutral', text: 'Nggak tahu. Tapi jujur aja, Bintang juga kemaren sempet nyindir Aldi soal nilai. Bintang bilang Aldi sering keluar masuk ruang BK seminggu terakhir ini.' }
    ],
    choices: [
      { id: 'LKIH_C1', text: 'Kembali', effect: '', tickerDelta: 1, nextSceneId: 'LOC_KANTIN' }
    ],
    unlockEvidenceIds: ['EV_CH1_004'], // New evidence: Rendra's testimony about Bintang
    nextSceneId: 'LOC_KANTIN'
  },
  {
    id: 'LOC_UKS',
    chapterId: 'CH1',
    title: 'UKS (Aldi)',
    location: 'Ruang UKS',
    mode: 'exploration',
    background: 'bg_osis_room',
    characters: [
      { characterId: 'nala', position: 'left', initialExpression: 'neutral' },
      { characterId: 'aldi', position: 'right', initialExpression: 'defensive' }
    ],
    dialogues: [],
    choices: [],
    unlockEvidenceIds: [],
    nextSceneId: 'CH1_HUB',
    exploration: {
      characterId: 'aldi',
      talkSceneId: 'LOC_UKS_TALK',
      investigationSceneId: 'LOC_UKS_INVESTIGATION',
      interrogationScenes: {
        soft: 'LOC_UKS_INTEROGASI_SOFT',
        hard: 'LOC_UKS_INTEROGASI_HARD'
      },
      presentEvidenceRoutes: {
        'EV_CH1_004': 'LOC_UKS_PRESENT_TESTIMONI'
      },
      defaultPresentSceneId: 'LOC_UKS_PRESENT_DEFAULT'
    }
  },
  {
    id: 'LOC_UKS_TALK',
    chapterId: 'CH1',
    title: 'Bicara dengan Aldi',
    location: 'Ruang UKS',
    mode: 'visual_novel',
    background: 'bg_osis_room',
    characters: [
      { characterId: 'nala', position: 'left', initialExpression: 'neutral' },
      { characterId: 'aldi', position: 'right', initialExpression: 'defensive' }
    ],
    dialogues: [
      { id: 'LU_01', speaker: 'aldi', expression: 'defensive', text: 'Na... gimana di luar? Masih parah?' },
      { id: 'LU_02', speaker: 'nala', expression: 'worried', text: 'Tenang aja Al, aku lagi usut. Kamu istirahat aja dulu di sini.' },
      { id: 'LU_03', speaker: 'aldi', expression: 'defensive', text: 'Gue bingung, sumpah. Gue ngerasa dijebak.' }
    ],
    choices: [
      { id: 'LUPD_C1', text: 'Kembali', effect: '', tickerDelta: 1, nextSceneId: 'LOC_UKS' }
    ],
    unlockEvidenceIds: [],
    nextSceneId: 'LOC_UKS'
  },
  {
    id: 'LOC_UKS_INVESTIGATION',
    chapterId: 'CH1',
    title: 'Investigasi UKS',
    location: 'Ruang UKS',
    mode: 'visual_novel',
    background: 'bg_osis_room',
    characters: [
      { characterId: 'nala', position: 'center', initialExpression: 'neutral' }
    ],
    dialogues: [
      { id: 'LUI_1', speaker: 'narrator', expression: 'neutral', text: 'Nala melihat ke sekeliling UKS. Tidak ada yang aneh, hanya botol-botol obat dan ranjang.' },
      { id: 'LUI_2', speaker: 'nala', expression: 'neutral', text: 'Kayaknya nggak ada petunjuk apa-apa di sini. Fokusku harusnya nanya ke Aldi.' }
    ],
    choices: [
      { id: 'LUI_C1', text: 'Kembali', effect: '', tickerDelta: 1, nextSceneId: 'LOC_UKS' }
    ],
    unlockEvidenceIds: [],
    nextSceneId: 'LOC_UKS'
  },
  {
    id: 'LOC_UKS_PRESENT_DEFAULT',
    chapterId: 'CH1',
    title: 'Konfrontasi (Gagal)',
    location: 'Ruang UKS',
    mode: 'visual_novel',
    background: 'bg_osis_room',
    characters: [
      { characterId: 'nala', position: 'left', initialExpression: 'determined' },
      { characterId: 'aldi', position: 'right', initialExpression: 'defensive' }
    ],
    dialogues: [
      { id: 'LUPD_1', speaker: 'nala', expression: 'determined', text: 'Al, coba lihat ini.' },
      { id: 'LUPD_2', speaker: 'aldi', expression: 'defensive', text: 'Itu apa Na? Gue lagi pusing banget, nggak bisa mikir.' },
      { id: 'LUPD_3', speaker: 'nala', expression: 'worried', text: '(Bukan ini bukti yang tepat untuk ditanyakan pada Aldi saat ini.)' }
    ],
    unlockEvidenceIds: [],
    nextSceneId: 'LOC_UKS'
  },
  {
    id: 'LOC_UKS_PRESENT_TESTIMONI',
    chapterId: 'CH1',
    title: 'Konfrontasi Testimoni Rendra',
    location: 'Ruang UKS',
    mode: 'visual_novel',
    background: 'bg_osis_room',
    characters: [
      { characterId: 'nala', position: 'left', initialExpression: 'determined' },
      { characterId: 'aldi', position: 'right', initialExpression: 'shocked' }
    ],
    dialogues: [
      { id: 'LUPT_1', speaker: 'nala', expression: 'determined', text: 'Al, aku butuh kejujuranmu. Rendra dan Bintang bilang kamu sering keluar masuk ruang BK seminggu ini.' },
      { id: 'LUPT_2', speaker: 'aldi', expression: 'shocked', text: 'Hah?! Mereka nuduh gue nyogok guru karena itu?!' },
      { id: 'LUPT_3', speaker: 'nala', expression: 'determined', text: 'Jadi bener kamu sering ke sana? Ngapain?' },
      { id: 'LUPT_4', speaker: 'narrator', expression: 'neutral', text: '(Aldi tampak ragu. Bagaimana caramu mendesaknya?)' }
    ],
    choices: [
      { id: 'LUPT_C1', text: 'Pendekatan Halus: Bujuk perlahan', effect: 'Aldi masih menutupi sesuatu', tickerDelta: 1, nextSceneId: 'LOC_UKS_INTEROGASI_SOFT' },
      { id: 'LUPT_C2', text: 'Pendekatan Keras: Desak kebenarannya', effect: 'Aldi akan buka suara', tickerDelta: 1, nextSceneId: 'LOC_UKS_INTEROGASI_HARD' }
    ],
    unlockEvidenceIds: [],
    nextSceneId: 'LOC_UKS'
  },
  {
    id: 'LOC_UKS_INTEROGASI_SOFT',
    chapterId: 'CH1',
    title: 'Interogasi (Halus)',
    location: 'Ruang UKS',
    mode: 'visual_novel',
    background: 'bg_osis_room',
    characters: [
      { characterId: 'nala', position: 'left', initialExpression: 'neutral' },
      { characterId: 'aldi', position: 'right', initialExpression: 'defensive' }
    ],
    dialogues: [
      { id: 'LUIS_1', speaker: 'nala', expression: 'neutral', text: 'Al, ceritain pelan-pelan aja. Kamu ngapain ke ruang BK?' },
      { id: 'LUIS_2', speaker: 'aldi', expression: 'defensive', text: 'Gue ngurus berkas beasiswa. Udah, itu aja.' },
      { id: 'LUIS_3', speaker: 'nala', expression: 'worried', text: '(Sepertinya ada yang dia sembunyikan atau ragu untuk diceritakan. Aku harus menekan lebih keras.)' }
    ],
    choices: [
      { id: 'LUIS_C1', text: 'Kembali', effect: '', tickerDelta: 1, nextSceneId: 'LOC_UKS' }
    ],
    unlockEvidenceIds: [],
    nextSceneId: 'LOC_UKS'
  },
  {
    id: 'LOC_UKS_INTEROGASI_HARD',
    chapterId: 'CH1',
    title: 'Interogasi (Keras)',
    location: 'Ruang UKS',
    mode: 'visual_novel',
    background: 'bg_osis_room',
    characters: [
      { characterId: 'nala', position: 'left', initialExpression: 'determined' },
      { characterId: 'aldi', position: 'right', initialExpression: 'defensive' }
    ],
    dialogues: [
      { id: 'LUIH_1', speaker: 'nala', expression: 'determined', text: 'Al, kamu tau nggak, orang-orang udah bikin narasi kalau kamu nyogok Bu Salma di ruang BK!' },
      { id: 'LUIH_2', speaker: 'aldi', expression: 'defensive', text: 'Gila! Gue ke sana murni buat ngurus berkas beasiswa gue! Gue butuh banget beasiswa itu!' },
      { id: 'LUIH_3', speaker: 'nala', expression: 'curious', text: 'Tapi kenapa harus bolak-balik seminggu ini?' },
      { id: 'LUIH_4', speaker: 'aldi', expression: 'defensive', text: 'Karena... karena waktu itu ada yang aneh.' },
      { id: 'LUIH_5', speaker: 'nala', expression: 'curious', text: 'Aneh gimana?' },
      { id: 'LUIH_6', speaker: 'aldi', expression: 'neutral', text: 'Waktu rapat guru kemaren, gue diam-diam masuk ke ruang BK buat naruh berkas di meja Bu Salma biar cepat diproses.' },
      { id: 'LUIH_7', speaker: 'aldi', expression: 'shocked', text: 'Dan komputer Bu Salma waktu itu nyala! Nggak dikunci! Gue liat sekilas ada aplikasi database sekolah yang kebuka.' },
      { id: 'LUIH_8', speaker: 'nala', expression: 'shocked', text: 'Artinya... siapa pun bisa aja masuk dan mengubah nilai kalau kondisinya begitu!' }
    ],
    choices: [
      { id: 'LUIH_C1', text: 'Kembali', effect: '', tickerDelta: 1, nextSceneId: 'LOC_UKS' }
    ],
    unlockEvidenceIds: ['EV_CH1_005'], // New evidence: Aldi's Alibi
    unlockLocationIds: ['bk'],
    nextSceneId: 'LOC_UKS'
  },
  {
    id: 'LOC_BK',
    chapterId: 'CH1',
    title: 'Ruang BK (Bu Salma)',
    location: 'Ruang BK',
    mode: 'exploration',
    background: 'bg_bk_room',
    characters: [
      { characterId: 'nala', position: 'left', initialExpression: 'neutral' },
      { characterId: 'busalma', position: 'right', initialExpression: 'neutral' }
    ],
    dialogues: [],
    unlockEvidenceIds: [],
    nextSceneId: 'CH1_HUB',
    exploration: {
      characterId: 'busalma',
      talkSceneId: 'LOC_BK_TALK',
      investigationSceneId: 'LOC_BK_INVESTIGATION',
      interrogationScenes: {
        soft: 'LOC_BK_INTEROGASI_SOFT',
        hard: 'LOC_BK_INTEROGASI_HARD'
      },
      presentEvidenceRoutes: {
        'EV_CH1_005': 'LOC_BK_PRESENT_ALIBI'
      },
      defaultPresentSceneId: 'LOC_BK_PRESENT_DEFAULT'
    }
  },
  {
    id: 'LOC_BK_TALK',
    chapterId: 'CH1',
    title: 'Bicara dengan Bu Salma',
    location: 'Ruang BK',
    mode: 'visual_novel',
    background: 'bg_bk_room',
    characters: [
      { characterId: 'nala', position: 'left', initialExpression: 'neutral' },
      { characterId: 'busalma', position: 'right', initialExpression: 'neutral' }
    ],
    dialogues: [
      { id: 'LB_T1', speaker: 'busalma', expression: 'neutral', text: 'Ada apa Nala? Ibu sedang sibuk merekap nilai try out kelas 12.' },
      { id: 'LB_T2', speaker: 'nala', expression: 'neutral', text: 'Maaf ganggu Bu, situasi di luar makin panas karena kasus Aldi.' },
      { id: 'LB_T3', speaker: 'busalma', expression: 'neutral', text: 'Iya, pihak sekolah sedang menyelidiki. Kamu jangan ikut-ikutan menyebarkan gosip ya.' }
    ],
    choices: [
      { id: 'LBT_C1', text: 'Baik, Bu', effect: '', tickerDelta: 0, nextSceneId: 'LOC_BK' }
    ],
    unlockEvidenceIds: [],
    nextSceneId: 'LOC_BK'
  },
  {
    id: 'LOC_BK_INVESTIGATION',
    chapterId: 'CH1',
    title: 'Investigasi BK',
    location: 'Ruang BK',
    mode: 'visual_novel',
    background: 'bg_bk_room',
    characters: [
      { characterId: 'nala', position: 'center', initialExpression: 'curious' }
    ],
    dialogues: [
      { id: 'LBI_1', speaker: 'narrator', expression: 'neutral', text: 'Nala melirik layar komputer Bu Salma. Layarnya menonjolkan aplikasi penginputan nilai yang terbuka penuh.' },
      { id: 'LBI_2', speaker: 'nala', expression: 'curious', text: '(Komputer ini menyimpan semua data rahasia siswa. Pasti ada password-nya kan?)' }
    ],
    choices: [
      { id: 'LBPD_C1', text: 'Kembali', effect: '', tickerDelta: 1, nextSceneId: 'LOC_BK' }
    ],
    unlockEvidenceIds: [],
    nextSceneId: 'LOC_BK'
  },
  {
    id: 'LOC_BK_PRESENT_DEFAULT',
    chapterId: 'CH1',
    title: 'Konfrontasi (Gagal)',
    location: 'Ruang BK',
    mode: 'visual_novel',
    background: 'bg_bk_room',
    characters: [
      { characterId: 'nala', position: 'left', initialExpression: 'determined' },
      { characterId: 'busalma', position: 'right', initialExpression: 'neutral' }
    ],
    dialogues: [
      { id: 'LBPD_1', speaker: 'nala', expression: 'determined', text: 'Bu Salma, tolong lihat ini.' },
      { id: 'LBPD_2', speaker: 'busalma', expression: 'neutral', text: 'Itu apa Nala? Ibu tidak ada waktu mengurusi hal yang tidak relevan dengan sistem sekolah.' },
      { id: 'LBPD_3', speaker: 'nala', expression: 'worried', text: '(Sial, sepertinya Bu Salma tidak peduli dengan bukti ini.)' }
    ],
    unlockEvidenceIds: [],
    nextSceneId: 'LOC_BK'
  },
  {
    id: 'LOC_BK_PRESENT_ALIBI',
    chapterId: 'CH1',
    title: 'Konfrontasi Bukti Komputer',
    location: 'Ruang BK',
    mode: 'visual_novel',
    background: 'bg_bk_room',
    characters: [
      { characterId: 'nala', position: 'left', initialExpression: 'determined' },
      { characterId: 'busalma', position: 'right', initialExpression: 'shocked' }
    ],
    dialogues: [
      { id: 'LBPA_1', speaker: 'nala', expression: 'determined', text: 'Bu, saya mendapat kesaksian bahwa saat rapat guru kemarin, komputer Ibu dibiarkan menyala tanpa dikunci.' },
      { id: 'LBPA_2', speaker: 'busalma', expression: 'shocked', text: 'Apa maksudmu?!' },
      { id: 'LBPA_3', speaker: 'nala', expression: 'determined', text: 'Aplikasi database sekolah Ibu terbuka dan bisa diakses siapa saja yang masuk ke ruangan ini.' },
      { id: 'LBPA_4', speaker: 'narrator', expression: 'neutral', text: '(Bu Salma terlihat panik. Bagaimana caramu mendesaknya?)' }
    ],
    choices: [
      { id: 'LBPA_C1', text: 'Pendekatan Halus: Konfirmasi kepergiannya', effect: 'Bu Salma akan berkelit', tickerDelta: 1, nextSceneId: 'LOC_BK_INTEROGASI_SOFT' },
      { id: 'LBPA_C2', text: 'Pendekatan Keras: Tuntut cek log sistem', effect: 'Bu Salma terpaksa mengecek', tickerDelta: 1, nextSceneId: 'LOC_BK_INTEROGASI_HARD' }
    ],
    unlockEvidenceIds: [],
    nextSceneId: 'LOC_BK'
  },
  {
    id: 'LOC_BK_INTEROGASI_SOFT',
    chapterId: 'CH1',
    title: 'Interogasi (Halus)',
    location: 'Ruang BK',
    mode: 'visual_novel',
    background: 'bg_bk_room',
    characters: [
      { characterId: 'nala', position: 'left', initialExpression: 'neutral' },
      { characterId: 'busalma', position: 'right', initialExpression: 'neutral' }
    ],
    dialogues: [
      { id: 'LBIS_1', speaker: 'nala', expression: 'neutral', text: 'Bu, saya mohon maaf sebelumnya, tapi apa betul Ibu sempat meninggalkan ruangan ini?' },
      { id: 'LBIS_2', speaker: 'busalma', expression: 'neutral', text: 'Tentu saja saat rapat Ibu meninggalkan ruangan. Tapi pintu selalu tertutup rapat.' },
      { id: 'LBIS_3', speaker: 'nala', expression: 'worried', text: '(Bu Salma menutup-nutupi kesalahannya. Aku harus lebih berani menekannya.)' }
    ],
    unlockEvidenceIds: [],
    nextSceneId: 'LOC_BK'
  },
  {
    id: 'LOC_BK_INTEROGASI_HARD',
    chapterId: 'CH1',
    title: 'Interogasi (Keras)',
    location: 'Ruang BK',
    mode: 'visual_novel',
    background: 'bg_bk_room',
    characters: [
      { characterId: 'nala', position: 'left', initialExpression: 'determined' },
      { characterId: 'busalma', position: 'right', initialExpression: 'shocked' }
    ],
    dialogues: [
      { id: 'LBIH_1', speaker: 'nala', expression: 'determined', text: 'Bu Salma, kelalaian Ibu bisa berakibat hancurnya masa depan Aldi!' },
      { id: 'LBIH_2', speaker: 'busalma', expression: 'shocked', text: 'Kamu jangan lancang Nala! Komputer ini selalu Ibu password!' },
      { id: 'LBIH_3', speaker: 'nala', expression: 'determined', text: 'Kalau Ibu benar-benar menguncinya, tolong buktikan! Cek log aktivitas sistem komputer Ibu kemarin saat jam rapat!' },
      { id: 'LBIH_4', speaker: 'narrator', expression: 'neutral', text: 'Bu Salma dengan gemetar mengecek log sistem di layarnya.' },
      { id: 'LBIH_5', speaker: 'busalma', expression: 'shocked', text: 'Astaga... Ada login aktif selama jam rapat kemarin. Seseorang meretas masuk atau... menggunakan komputer ini.' },
      { id: 'LBIH_6', speaker: 'nala', expression: 'shocked', text: 'Siapa pun orang itu, dialah yang mengubah nilai Aldi.' }
    ],
    choices: [
      { id: 'LBIH_C1', text: 'Kembali', effect: '', tickerDelta: 1, nextSceneId: 'LOC_BK' }
    ],
    unlockEvidenceIds: ['EV_CH1_006'], // New evidence: Login Aktif Jam Rapat
    unlockLocationIds: ['lapangan'],
    nextSceneId: 'LOC_BK'
  },
  {
    id: 'LOC_MADING',
    chapterId: 'CH1',
    title: 'Ruang Mading (Lala)',
    location: 'Ruang Mading',
    mode: 'exploration',
    background: 'bg_mading_room',
    characters: [
      { characterId: 'nala', position: 'left', initialExpression: 'neutral' },
      { characterId: 'lala', position: 'right', initialExpression: 'neutral' }
    ],
    dialogues: [],
    choices: [],
    unlockEvidenceIds: [],
    nextSceneId: 'CH1_HUB',
    exploration: {
      talkSceneId: 'LOC_MADING_TALK',
      characterId: 'lala'
    }
  },
  {
    id: 'LOC_MADING_TALK',
    chapterId: 'CH1',
    title: 'Bicara dengan Lala',
    location: 'Ruang Mading',
    mode: 'visual_novel',
    background: 'bg_mading_room',
    characters: [
      { characterId: 'nala', position: 'left', initialExpression: 'neutral' },
      { characterId: 'lala', position: 'right', initialExpression: 'neutral' }
    ],
    dialogues: [
      { id: 'LMT_1', speaker: 'lala', expression: 'neutral', text: 'Gimana Na investigasinya? Ada progres?' },
      { id: 'LMT_2', speaker: 'nala', expression: 'determined', text: 'Lumayan La, aku udah dapet beberapa petunjuk penting dari anak-anak.' },
      { id: 'LMT_3', speaker: 'lala', expression: 'neutral', text: 'Semangat! Kalau butuh aku cek silang data atau nge-stalk medsos orang, bilang aja.' }
    ],
    choices: [
      { id: 'LMT_C1', text: 'Kembali', effect: '', tickerDelta: 0, nextSceneId: 'LOC_MADING' }
    ],
    unlockEvidenceIds: [],
    unlockLocationIds: ['kantin', 'uks'],
    nextSceneId: 'LOC_MADING'
  },
  {
    id: 'LOC_MADING_INVESTIGATION',
    chapterId: 'CH1',
    title: 'Investigasi Mading',
    location: 'Koridor Utama',
    mode: 'visual_novel',
    background: 'bg_mading_room',
    characters: [
      { characterId: 'nala', position: 'center', initialExpression: 'curious' }
    ],
    dialogues: [
      { id: 'LMI_1', speaker: 'narrator', expression: 'neutral', text: 'Nala melihat papan mading yang tertata rapi. Artikel tentang siswa berprestasi terpampang jelas.' },
      { id: 'LMI_2', speaker: 'nala', expression: 'neutral', text: 'Ada foto Bintang dan Aldi berdampingan sebagai peraih nilai tertinggi try out bulan lalu.' },
      { id: 'LMI_3', speaker: 'nala', expression: 'curious', text: '(Mereka memang saingan ketat. Pasti tekanan untuk selalu jadi nomor satu itu besar.)' }
    ],
    choices: [
      { id: 'LMI_C1', text: 'Kembali', effect: '', tickerDelta: 1, nextSceneId: 'LOC_MADING' }
    ],
    unlockEvidenceIds: [],
    nextSceneId: 'LOC_MADING'
  },
  {
    id: 'LOC_MADING_PRESENT_DEFAULT',
    chapterId: 'CH1',
    title: 'Konfrontasi (Gagal)',
    location: 'Koridor Utama',
    mode: 'visual_novel',
    background: 'bg_mading_room',
    characters: [
      { characterId: 'nala', position: 'left', initialExpression: 'determined' },
      { characterId: 'lala', position: 'right', initialExpression: 'neutral' }
    ],
    dialogues: [
      { id: 'LMPD_1', speaker: 'nala', expression: 'determined', text: 'La, coba kamu analisis ini.' },
      { id: 'LMPD_2', speaker: 'lala', expression: 'neutral', text: 'Hmm... ini bukti lumayan, tapi kayaknya belum mengarah ke pelaku utamanya deh Na.' },
      { id: 'LMPD_3', speaker: 'nala', expression: 'worried', text: '(Lala benar, aku harus menunjukkan bukti paling krusial kepadanya untuk meminta saran akhir.)' }
    ],
    unlockEvidenceIds: [],
    nextSceneId: 'LOC_MADING'
  },
  {
    id: 'LOC_MADING_PRESENT_LOG',
    chapterId: 'CH1',
    title: 'Konsultasi Log BK',
    location: 'Koridor Utama',
    mode: 'visual_novel',
    background: 'bg_mading_room',
    characters: [
      { characterId: 'nala', position: 'left', initialExpression: 'determined' },
      { characterId: 'lala', position: 'right', initialExpression: 'shocked' }
    ],
    dialogues: [
      { id: 'LMPL_1', speaker: 'nala', expression: 'determined', text: 'La, aku berhasil mendesak Bu Salma buka log komputernya. Ada yang ganti data pas rapat guru!' },
      { id: 'LMPL_2', speaker: 'lala', expression: 'shocked', text: 'Serius?! Wah gila... berarti pelakunya anak murid dong? Tapi siapa yang ngerti sistem sekolah?' },
      { id: 'LMPL_3', speaker: 'nala', expression: 'determined', text: 'Rendra bilang Bintang tau kalau Aldi bolak-balik BK. Padahal harusnya urusan BK itu rahasia.' },
      { id: 'LMPL_4', speaker: 'lala', expression: 'neutral', text: 'Jangan-jangan... Coba kamu interogasi Bintang di lapangan basket. Konfrontasi dia dengan semua temuanmu!' }
    ],
    unlockEvidenceIds: [],
    nextSceneId: 'LOC_MADING'
  },
  {
    id: 'LOC_MADING_INTEROGASI_SOFT',
    chapterId: 'CH1',
    title: 'Tanya Saran',
    location: 'Koridor Utama',
    mode: 'visual_novel',
    background: 'bg_mading_room',
    characters: [
      { characterId: 'nala', position: 'left', initialExpression: 'neutral' },
      { characterId: 'lala', position: 'right', initialExpression: 'neutral' }
    ],
    dialogues: [
      { id: 'LMIS_1', speaker: 'nala', expression: 'neutral', text: 'La, menurutmu motif penyebar hoaks ini apa?' },
      { id: 'LMIS_2', speaker: 'lala', expression: 'neutral', text: 'Paling iri dengki. Persaingan nilai kelas 12 itu sadis Na. Apalagi buat ngejar kuota SNBP.' },
      { id: 'LMIS_3', speaker: 'nala', expression: 'curious', text: '(Iri dengki... Persaingan nilai... Bintang adalah saingan terberat Aldi.)' }
    ],
    unlockEvidenceIds: [],
    nextSceneId: 'LOC_MADING'
  },
  {
    id: 'LOC_LAPANGAN',
    chapterId: 'CH1',
    title: 'Lapangan (Bintang)',
    location: 'Lapangan Basket',
    mode: 'exploration',
    background: 'bg_corridor',
    characters: [
      { characterId: 'nala', position: 'left', initialExpression: 'neutral' },
      { characterId: 'bintang', position: 'right', initialExpression: 'neutral' }
    ],
    dialogues: [],
    choices: [],
    unlockEvidenceIds: [],
    nextSceneId: 'CH1_HUB',
    exploration: {
      characterId: 'bintang',
      talkSceneId: 'LOC_LAPANGAN_TALK',
      investigationSceneId: 'LOC_LAPANGAN_INVESTIGATION',
      interrogationScenes: {
        soft: 'LOC_LAPANGAN_INTEROGASI_SOFT',
        hard: 'LOC_LAPANGAN_INTEROGASI_HARD'
      },
      presentEvidenceRoutes: {
        'EV_CH1_006': 'LOC_LAPANGAN_PRESENT_LOG'
      },
      defaultPresentSceneId: 'LOC_LAPANGAN_PRESENT_DEFAULT'
    }
  },
  {
    id: 'LOC_LAPANGAN_TALK',
    chapterId: 'CH1',
    title: 'Bicara dengan Bintang',
    location: 'Lapangan Basket',
    mode: 'visual_novel',
    background: 'bg_corridor',
    characters: [
      { characterId: 'nala', position: 'left', initialExpression: 'neutral' },
      { characterId: 'bintang', position: 'right', initialExpression: 'neutral' }
    ],
    dialogues: [
      { id: 'LLT_1', speaker: 'bintang', expression: 'neutral', text: 'Oh, ada anak jurnalistik. Cari berita soal Aldi ya?' },
      { id: 'LLT_2', speaker: 'nala', expression: 'neutral', text: 'Iya. Kok kamu kelihatan santai banget soal isu itu?' },
      { id: 'LLT_3', speaker: 'bintang', expression: 'neutral', text: 'Buat apa heboh? Kebenaran selalu nemuin jalannya. Kalau dia curang, biar sistem yang hukum.' }
    ],
    choices: [
      { id: 'LLT_C1', text: 'Kembali', effect: '', tickerDelta: 0, nextSceneId: 'LOC_LAPANGAN' }
    ],
    unlockEvidenceIds: [],
    nextSceneId: 'LOC_LAPANGAN'
  },
  {
    id: 'LOC_LAPANGAN_INVESTIGATION',
    chapterId: 'CH1',
    title: 'Investigasi Lapangan',
    location: 'Lapangan Basket',
    mode: 'visual_novel',
    background: 'bg_corridor',
    characters: [
      { characterId: 'nala', position: 'center', initialExpression: 'curious' }
    ],
    dialogues: [
      { id: 'LLI_1', speaker: 'narrator', expression: 'neutral', text: 'Bintang sedang duduk santai di pinggir lapangan sambil memegang sebuah tablet.' },
      { id: 'LLI_2', speaker: 'nala', expression: 'curious', text: '(Dia selalu update dengan data akademik. Bintang terkenal sering membantu guru rekap nilai karena dia jago IT.)' },
      { id: 'LLI_3', speaker: 'nala', expression: 'determined', text: '(Dia punya akses. Dia punya skill. Dan dia punya motif.)' }
    ],
    choices: [
      { id: 'LLI_C1', text: 'Kembali', effect: '', tickerDelta: 1, nextSceneId: 'LOC_LAPANGAN' }
    ],
    unlockEvidenceIds: [],
    nextSceneId: 'LOC_LAPANGAN'
  },
  {
    id: 'LOC_LAPANGAN_PRESENT_DEFAULT',
    chapterId: 'CH1',
    title: 'Konfrontasi (Gagal)',
    location: 'Lapangan Basket',
    mode: 'visual_novel',
    background: 'bg_corridor',
    characters: [
      { characterId: 'nala', position: 'left', initialExpression: 'determined' },
      { characterId: 'bintang', position: 'right', initialExpression: 'neutral' }
    ],
    dialogues: [
      { id: 'LLPD_1', speaker: 'nala', expression: 'determined', text: 'Bintang, coba kamu jelaskan ini.' },
      { id: 'LLPD_2', speaker: 'bintang', expression: 'neutral', text: 'Itu apa? Nggak ada hubungannya sama gue.' },
      { id: 'LLPD_3', speaker: 'nala', expression: 'worried', text: '(Bintang terlalu pintar untuk ditekan dengan bukti yang lemah. Aku butuh bukti konkrit.)' }
    ],
    unlockEvidenceIds: [],
    nextSceneId: 'LOC_LAPANGAN'
  },
  {
    id: 'LOC_LAPANGAN_PRESENT_LOG',
    chapterId: 'CH1',
    title: 'Konfrontasi Pelaku',
    location: 'Lapangan Basket',
    mode: 'visual_novel',
    background: 'bg_corridor',
    characters: [
      { characterId: 'nala', position: 'left', initialExpression: 'determined' },
      { characterId: 'bintang', position: 'right', initialExpression: 'neutral' }
    ],
    dialogues: [
      { id: 'LLPL_1', speaker: 'nala', expression: 'determined', text: 'Bintang, aku punya bukti catatan Log Sistem Komputer BK. Ada seseorang yang mengubah nilai Aldi.' },
      { id: 'LLPL_2', speaker: 'bintang', expression: 'neutral', text: 'Lalu? Bisa saja Aldi sendiri yang mengubahnya.' },
      { id: 'LLPL_3', speaker: 'nala', expression: 'determined', text: 'Waktu rapat guru, Aldi ada di depan kelasku, kami ada ekskul. Sementara kamu... permisi ke UKS, kan? Yang searah dengan ruang BK.' },
      { id: 'LLPL_4', speaker: 'bintang', expression: 'neutral', text: 'Lo nggak punya bukti nyata gue pelakunya. Itu asumsi murahan, Nala.' },
      { id: 'LLPL_5', speaker: 'narrator', expression: 'neutral', text: '(Bintang masih mencoba berkelit. Bagaimana caramu mendesaknya?)' }
    ],
    choices: [
      { id: 'LLPL_C1', text: 'Pendekatan Halus: Bicara dari hati ke hati', effect: 'Bintang akan defensif', tickerDelta: 1, nextSceneId: 'LOC_LAPANGAN_INTEROGASI_SOFT' },
      { id: 'LLPL_C2', text: 'Pendekatan Keras: Patahkan logikanya', effect: 'Bintang kehabisan alasan', tickerDelta: 1, nextSceneId: 'LOC_LAPANGAN_INTEROGASI_HARD' }
    ],
    unlockEvidenceIds: [],
    nextSceneId: 'LOC_LAPANGAN'
  },
  {
    id: 'LOC_LAPANGAN_INTEROGASI_SOFT',
    chapterId: 'CH1',
    title: 'Interogasi (Halus)',
    location: 'Lapangan Basket',
    mode: 'visual_novel',
    background: 'bg_corridor',
    characters: [
      { characterId: 'nala', position: 'left', initialExpression: 'neutral' },
      { characterId: 'bintang', position: 'right', initialExpression: 'neutral' }
    ],
    dialogues: [
      { id: 'LLIS_1', speaker: 'nala', expression: 'neutral', text: 'Bintang, kalau kamu merasa tersaingi oleh Aldi, kita bisa selesaikan ini baik-baik ke pihak sekolah.' },
      { id: 'LLIS_2', speaker: 'bintang', expression: 'neutral', text: 'Tersaingi? Gue cuma peduli pada keadilan. Orang yang nilainya tiba-tiba naik drastis itu yang patut dipertanyakan.' },
      { id: 'LLIS_3', speaker: 'nala', expression: 'worried', text: '(Dia masih merasa tindakannya benar. Aku harus menekannya tanpa ampun.)' }
    ],
    unlockEvidenceIds: [],
    nextSceneId: 'LOC_LAPANGAN'
  },
  {
    id: 'LOC_LAPANGAN_INTEROGASI_HARD',
    chapterId: 'CH1',
    title: 'Interogasi (Keras)',
    location: 'Lapangan Basket',
    mode: 'visual_novel',
    background: 'bg_corridor',
    characters: [
      { characterId: 'nala', position: 'left', initialExpression: 'angry' },
      { characterId: 'bintang', position: 'right', initialExpression: 'neutral' }
    ],
    dialogues: [
      { id: 'LLIH_1', speaker: 'nala', expression: 'angry', text: 'Cukup Bintang! Rendra mengaku dari awal dia curiga ke Aldi karena OMONGANMU. Kamu sengaja memanipulasi Rendra untuk memviralkan isu ini kan?!' },
      { id: 'LLIH_2', speaker: 'bintang', expression: 'neutral', text: '...' },
      { id: 'LLIH_3', speaker: 'nala', expression: 'determined', text: 'Kamu meretas komputer Bu Salma saat rapat, memalsukan bukti chat dari akun bodong, lalu mengirimkannya ke tongkrongan Rendra yang kamu tahu pasti ember!' },
      { id: 'LLIH_4', speaker: 'nala', expression: 'determined', text: 'Kamu pikir kamu membela keadilan? Kamu cuma pengecut yang takut kalah saing beasiswa!' },
      { id: 'LLIH_5', speaker: 'bintang', expression: 'neutral', text: 'Kalah saing? Lo pikir gue lakuin ini karena takut kalah sama anak kayak dia?' },
      { id: 'LLIH_6', speaker: 'narrator', expression: 'neutral', text: 'Bintang terdiam, tapi ia menolak bicara lebih jauh tanpa bukti yang kuat.' }
    ],
    unlockEvidenceIds: ['INS_CH1_BINTANG_MOTIVE'],
    nextSceneId: 'LOC_LAPANGAN'
  },
  {
    id: 'WAVE_2_ALERT',
    chapterId: 'CH1',
    title: 'Notifikasi Darurat',
    location: 'Smartphone',
    mode: 'phone',
    background: 'bg_phone',
    characters: [],
    dialogues: [
      { id: 'W2_1', speaker: 'netizen1', expression: 'neutral', text: '@garudamenfess: Gila, ternyata nilainya si A emang melonjak drastis pas kelas 12!' },
      { id: 'W2_2', speaker: 'netizen2', expression: 'neutral', text: 'Pantesan dapet kuota SNBP. Dikatrol gila-gilaan bro wkwk.' },
      { id: 'W2_3', speaker: 'nala', expression: 'worried', text: '(Gawat... Rumornya merembet ke isu manipulasi nilai akademik! Kepanikan mulai terjadi.)' }
    ],
    unlockEvidenceIds: [],
    nextSceneId: 'CH1_HUB'
  },
  {
    id: 'WAVE_3_ALERT',
    chapterId: 'CH1',
    title: 'Notifikasi Darurat',
    location: 'Smartphone',
    mode: 'phone',
    background: 'bg_phone',
    characters: [],
    dialogues: [
      { id: 'W3_1', speaker: 'netizen1', expression: 'neutral', text: '@lambesekolah: Denger-denger, bukan cuma nilai rapot, lomba sains kemaren juga juri-nya disogok sama pihak A.' },
      { id: 'W3_2', speaker: 'netizen3', expression: 'neutral', text: 'Wah parah sih, pantesan yang juara dia mulu.' },
      { id: 'W3_3', speaker: 'nala', expression: 'shocked', text: '(Mereka mulai mengarang cerita tak berdasar. Aldi diserang dari semua sisi!)' }
    ],
    unlockEvidenceIds: [],
    nextSceneId: 'CH1_HUB'
  },
  {
    id: 'WAVE_4_ALERT',
    chapterId: 'CH1',
    title: 'Notifikasi Darurat',
    location: 'Smartphone',
    mode: 'phone',
    background: 'bg_phone',
    characters: [],
    dialogues: [
      { id: 'W4_1', speaker: 'netizen4', expression: 'neutral', text: 'Nih alamat rumah si anak titipan: Jl. Kenari No. 12. Spill nomor WhatsAppnya sekalian!' },
      { id: 'W4_2', speaker: 'netizen2', expression: 'neutral', text: 'Gas serang sosmednya sekarang!!' },
      { id: 'W4_3', speaker: 'nala', expression: 'angry', text: '(Doxxing... Ini sudah masuk ranah kriminal. Aku harus segera menyelesaikan investigasi ini!)' }
    ],
    unlockEvidenceIds: [],
    nextSceneId: 'CH1_HUB'
  },
  {
    id: 'WAVE_5_TIMEOUT',
    chapterId: 'CH1',
    title: 'Notifikasi Darurat',
    location: 'Smartphone',
    mode: 'phone',
    background: 'bg_phone',
    characters: [],
    dialogues: [
      { id: 'W5_1', speaker: 'netizen1', expression: 'neutral', text: 'Boikot sekolah Garuda! Jangan mau masuk sana kalau prestasinya hasil sogokan semua!' },
      { id: 'W5_2', speaker: 'nala', expression: 'worried', text: '(Hoaksnya sudah menyebar ke publik luar sekolah. Waktuku benar-benar habis. Aku harus menarik kesimpulan sekarang!)' }
    ],
    unlockEvidenceIds: [],
    nextSceneId: 'CH1_REFLECTION' // Force to reflection if time runs out
  }
];
