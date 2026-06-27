import type { EvidenceRule } from '../../types';

export const rules: EvidenceRule[] = [
  {
    id: 'CH1_RULE_001',
    evidenceAId: 'EV_CH1_002',
    evidenceBId: 'EV_CH1_003',
    kind: 'correlation',
    label: 'Bukti Palsu Digunakan',
    explanation:
      'Screenshot chat guru yang buram disebar dan dijadikan "bukti primer" oleh akun menfess untuk memperkuat narasinya, meski konteks aslinya tidak jelas.',
    unlocksConfrontation: false,
    insightId: 'INS_CH1_HOAX_FOUNDATION',
  },
  {
    id: 'CH1_RULE_002',
    evidenceAId: 'EV_CH1_004',
    evidenceBId: 'EV_CH1_005',
    kind: 'context_needed',
    label: 'Pengakuan Sesuai dengan Kecurigaan',
    explanation:
      'Aldi membenarkan desas-desus Bintang bahwa ia pergi ke ruang BK. Namun, niat Aldi adalah mengurus beasiswa, bukan mengubah nilai.',
    unlocksConfrontation: false,
    insightId: 'INS_CH1_ALDI_ALIBI_CONTEXT',
  },
  {
    id: 'CH1_RULE_003',
    evidenceAId: 'EV_CH1_005',
    evidenceBId: 'EV_CH1_006',
    kind: 'correlation',
    label: 'Log Mengonfirmasi Kesaksian',
    explanation:
      'Kesaksian Aldi bahwa ia melihat komputer BK tidak dikunci saat guru sedang rapat terbukti sinkron dengan log sistem komputer yang menunjukkan ada orang tak dikenal yang login di jam tersebut.',
    unlocksConfrontation: true,
    insightId: 'INS_CH1_REAL_CULPRIT_CLUE',
  }
];
