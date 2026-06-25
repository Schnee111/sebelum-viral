import type { EvidenceRule } from '../../types';

export const rules: EvidenceRule[] = [
  {
    id: 'CH1_RULE_001',
    evidenceAId: 'EV_CH1_002',
    evidenceBId: 'EV_CH1_009',
    kind: 'contradiction',
    label: 'Kontradiksi Waktu dan Lokasi',
    explanation:
      'Story anonim menyebut Aldi berada di ruang OSIS saat transaksi, tetapi jadwal latihan menunjukkan Aldi berada di lapangan pada waktu yang sama.',
    unlocksConfrontation: true,
    insightId: 'INS_CH1_KEY_CONTRADICTION',
  },
  {
    id: 'CH1_RULE_002',
    evidenceAId: 'EV_CH1_002',
    evidenceBId: 'EV_CH1_005',
    kind: 'context_needed',
    label: 'Ada Selisih, Tetapi Belum Membuktikan Pelaku',
    explanation:
      'Ada selisih kas pada rekap dana, tetapi belum ada bukti yang menunjukkan Aldi sebagai pelaku.',
    unlocksConfrontation: false,
    insightId: 'INS_CH1_FUND_DISCREPANCY',
  },
  {
    id: 'CH1_RULE_003',
    evidenceAId: 'EV_CH1_005',
    evidenceBId: 'EV_CH1_006',
    kind: 'correlation',
    label: 'Catatan Bendahara Menjelaskan Perpindahan Dana',
    explanation:
      'Rekap dana menunjukkan selisih, dan catatan bendahara memberikan kemungkinan penjelasan administratif.',
    unlocksConfrontation: false,
    insightId: 'INS_CH1_TREASURER_NOTE',
  },
  {
    id: 'CH1_RULE_004',
    evidenceAId: 'EV_CH1_003',
    evidenceBId: 'EV_CH1_008',
    kind: 'weak_correlation',
    label: 'Penyebaran Rumor, Bukan Kebenaran',
    explanation:
      'Chat kelas dan komentar siswa menunjukkan rumor menyebar luas, tetapi pengulangan bukan bukti kebenaran.',
    unlocksConfrontation: false,
    insightId: 'INS_CH1_RUMOR_SPREAD',
  },
  {
    id: 'CH1_RULE_005',
    evidenceAId: 'EV_CH1_006',
    evidenceBId: 'EV_CH1_010',
    kind: 'correlation',
    label: 'Maya Punya Akses ke Laporan Kas',
    explanation:
      'Catatan bendahara dan pesan Maya menunjukkan Maya memiliki akses ke laporan kas, tetapi ini belum membuktikan kesalahan.',
    unlocksConfrontation: false,
    insightId: 'INS_CH1_MAYA_ACCESS',
  },
];
