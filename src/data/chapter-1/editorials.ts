import type { EditorialDecision } from '../../types';

export const editorialDecisions: EditorialDecision[] = [
  {
    id: 'EDITORIAL_PUBLISH_FAST',
    label: 'Terbitkan cepat: "Aldi Diduga Pakai Dana OSIS"',
    description:
      'Mading langsung menerbitkan tuduhan berdasarkan story viral',
    summary: 'Menerbitkan tuduhan tanpa verifikasi',
  },
  {
    id: 'EDITORIAL_DELAY',
    label: 'Tunda semua publikasi',
    description:
      'Mading tidak menerbitkan apa pun sampai investigasi selesai',
    summary: 'Menunda semua publikasi',
  },
  {
    id: 'EDITORIAL_CLARIFY',
    label: 'Terbitkan klarifikasi sementara',
    description:
      '"Yang Sudah Terverifikasi dan Yang Masih Perlu Dicek"',
    summary: 'Menerbitkan klarifikasi berbasis bukti',
  },
  {
    id: 'EDITORIAL_ANNOUNCEMENT',
    label: 'Buat imbauan digital',
    description:
      '"Jangan Sebar Tuduhan Tanpa Konteks"',
    summary: 'Menerbitkan imbauan tanpa membahas kasus spesifik',
  },
];
