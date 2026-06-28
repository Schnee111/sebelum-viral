import { motion } from 'framer-motion';
import { Search, FileText, ChevronRight, Hash, Eye, MapPin, AlertCircle, Lock } from 'lucide-react';
import type { Evidence } from '../../types';

interface HubScreenProps {
  inventory: Evidence[];
  foundInsightIds: string[];
  currentHoaxWave: number;
  unlockedLocations: string[];
  onSelectLocation: (locationId: string) => void;
  onOpenBoard: () => void;
  onOpenInspection: () => void;
  canInspect: boolean;
}

const LOCATION_DETAILS: Record<string, { title: string, desc: string }> = {
  'kantin': { title: 'Kantin Sekolah', desc: 'Tempat Rendra biasa nongkrong. Tanya soal chat awal.' },
  'uks': { title: 'Ruang UKS', desc: 'Aldi masih di sini. Cari tahu soal chat "markup nilai".' },
  'mading': { title: 'Ruang Mading', desc: 'Kak Lala menunggu update investigasi.' },
  'bk': { title: 'Ruang BK', desc: 'Bu Salma menyimpan data nilai rapor angkatan.' },
  'lapangan': { title: 'Lapangan Basket', desc: 'Bintang sering latihan di sini. Tanya soal lomba.' }
};

export function HubScreen({
  inventory,
  foundInsightIds,
  currentHoaxWave,
  unlockedLocations,
  onSelectLocation,
  onOpenBoard,
  onOpenInspection,
  canInspect,
}: HubScreenProps) {
  return (
    <div className="absolute inset-0 bg-[#09090B] flex flex-col font-body text-[#FAFAFA] overflow-hidden">
      
      {/* Top Header */}
      <div className="px-5 md:px-8 pt-10 md:pt-16 pb-4 md:pb-6 border-b border-[#27272A]">
        <div className="flex justify-between items-end mb-2">
          <h2 className="font-heading text-2xl md:text-4xl font-bold tracking-tight">Investigasi</h2>
          <div className="flex items-center gap-1.5 md:gap-2 bg-[#E11D48]/10 text-[#E11D48] border border-[#E11D48]/30 px-2 md:px-3 py-1 md:py-1.5 rounded-full">
            <AlertCircle size={12} />
            <span className="text-[9px] md:text-[10px] font-bold tracking-widest uppercase">
              Gelombang Hoax {currentHoaxWave} / 5
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4 md:gap-6 text-[10px] md:text-[11px] font-bold tracking-widest uppercase text-[#A1A1AA]">
          <span className="flex items-center gap-1.5 md:gap-2">
            <Hash size={12} /> {inventory.length} Berkas
          </span>
          <span className="flex items-center gap-1.5 md:gap-2">
            <Eye size={12} /> {foundInsightIds.length} Fakta
          </span>
        </div>
      </div>

      {/* Main Content Split */}
      <div className="flex-1 flex flex-col md:flex-row gap-6 md:gap-12 px-5 md:px-8 py-5 md:py-8 overflow-y-auto">
        
        {/* Navigation List - Locations */}
        <div className="flex-1 flex flex-col gap-4 md:gap-6 max-w-xl">
          
          <div>
            <h3 className="text-[9px] md:text-[10px] font-bold text-[#71717A] tracking-widest uppercase mb-3 md:mb-4">Lokasi Tersedia</h3>
            <div className="flex flex-col gap-1.5 md:gap-2">
              {Object.entries(LOCATION_DETAILS).map(([locId, loc]) => {
                const isUnlocked = unlockedLocations.includes(locId);
                return (
                  <motion.button
                    key={locId}
                    disabled={!isUnlocked}
                    className={`group relative w-full p-3 md:p-4 text-left flex items-center justify-between overflow-hidden rounded-xl border transition-all ${
                      isUnlocked 
                        ? 'border-[#27272A] bg-[#18181B] hover:border-[#E11D48]/50 hover:bg-[#E11D48]/5 cursor-pointer'
                        : 'border-[#27272A]/30 bg-[#18181B]/30 opacity-50 cursor-not-allowed'
                    }`}
                    onClick={() => isUnlocked && onSelectLocation(locId)}
                    whileHover={isUnlocked ? { scale: 1.01 } : {}}
                    whileTap={isUnlocked ? { scale: 0.99 } : {}}
                  >
                    <div>
                      <div className="flex items-center gap-2 md:gap-3 mb-0.5 md:mb-1">
                        {isUnlocked ? (
                          <MapPin size={14} className="text-[#E11D48]" />
                        ) : (
                          <Lock size={14} className="text-[#71717A]" />
                        )}
                        <span className="text-xs md:text-sm font-bold">{loc.title}</span>
                      </div>
                      <div className="text-[10px] md:text-xs text-[#71717A] ml-5 md:ml-7">
                        {isUnlocked ? loc.desc : 'Lokasi belum terbuka...'}
                      </div>
                    </div>
                    {isUnlocked && (
                      <ChevronRight size={16} className="text-[#3F3F46] group-hover:text-[#E11D48] transition-colors flex-shrink-0" />
                    )}
                  </motion.button>
                )
              })}
            </div>
          </div>

          <div className="h-px w-full bg-[#27272A]" />

          <div>
            <h3 className="text-[9px] md:text-[10px] font-bold text-[#71717A] tracking-widest uppercase mb-3 md:mb-4">Tools</h3>
            <div className="flex flex-col gap-1.5 md:gap-2">
              <motion.button
                className="group relative w-full p-3 md:p-4 text-left flex items-center justify-between overflow-hidden rounded-xl border border-transparent hover:bg-[#18181B] hover:border-[#27272A] transition-all"
                onClick={onOpenBoard}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div>
                  <div className="flex items-center gap-2 md:gap-3 mb-0.5 md:mb-1">
                    <Search size={14} className="text-[#FAFAFA]" />
                    <span className="text-xs md:text-sm font-bold">Papan Detektif</span>
                  </div>
                  <div className="text-[10px] md:text-xs text-[#71717A] ml-5 md:ml-7">Hubungkan bukti & cari pola</div>
                </div>
                <ChevronRight size={16} className="text-[#3F3F46] group-hover:text-[#FAFAFA] transition-colors flex-shrink-0" />
              </motion.button>

              {canInspect && (
                <motion.button
                  className="group relative w-full p-3 md:p-4 text-left flex items-center justify-between overflow-hidden rounded-xl border border-transparent hover:bg-[#18181B] hover:border-[#27272A] transition-all"
                  onClick={onOpenInspection}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div>
                    <div className="flex items-center gap-2 md:gap-3 mb-0.5 md:mb-1">
                      <FileText size={14} className="text-[#FAFAFA]" />
                      <span className="text-xs md:text-sm font-bold">Cross-Check Klaim</span>
                    </div>
                    <div className="text-[10px] md:text-xs text-[#71717A] ml-5 md:ml-7">Sandingkan klaim rumor dengan bukti</div>
                  </div>
                  <ChevronRight size={16} className="text-[#3F3F46] group-hover:text-[#FAFAFA] transition-colors flex-shrink-0" />
                </motion.button>
              )}

              {foundInsightIds.includes('INS_CH1_REAL_CULPRIT_CLUE') ? (
                <motion.button
                  className="group relative w-full p-3 md:p-4 text-left flex items-center justify-between overflow-hidden rounded-xl border border-[#E11D48] bg-[#E11D48]/10 hover:bg-[#E11D48]/20 transition-all shadow-[0_0_15px_rgba(225,29,72,0.3)]"
                  onClick={() => onSelectLocation('konfrontasi')}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div>
                    <div className="flex items-center gap-2 md:gap-3 mb-0.5 md:mb-1">
                      <AlertCircle size={14} className="text-[#E11D48]" />
                      <span className="text-xs md:text-sm font-bold text-white">Konfrontasi Pelaku</span>
                    </div>
                    <div className="text-[10px] md:text-xs text-[#FAFAFA]/70 ml-5 md:ml-7">Kamu telah menemukan korelasi bukti pamungkas.</div>
                  </div>
                  <ChevronRight size={16} className="text-[#E11D48] group-hover:text-[#FAFAFA] transition-colors flex-shrink-0" />
                </motion.button>
              ) : (
                inventory.length >= 4 && (
                  <motion.div
                    className="w-full p-3 md:p-4 text-left flex items-center justify-between overflow-hidden rounded-xl border border-[#10B981]/50 bg-[#10B981]/10 shadow-[0_0_15px_rgba(16,185,129,0.2)] animate-pulse"
                  >
                    <div>
                      <div className="flex items-center gap-2 md:gap-3 mb-0.5 md:mb-1">
                        <Search size={14} className="text-[#10B981]" />
                        <span className="text-xs md:text-sm font-bold text-white">Petunjuk Tersembunyi</span>
                      </div>
                      <div className="text-[10px] md:text-xs text-[#FAFAFA]/70 ml-5 md:ml-7">Gunakan Papan Detektif untuk menghubungkan bukti-bukti yang sudah kamu kumpulkan!</div>
                    </div>
                  </motion.div>
                )
              )}
            </div>
          </div>

        </div>

        {/* Evidence List */}
        <div className="flex-1 md:border-l md:border-[#27272A] md:pl-12 pt-4 md:pt-0 border-t md:border-t-0 border-[#27272A]">
          <h3 className="text-[9px] md:text-[10px] font-bold text-[#71717A] tracking-widest uppercase mb-4 md:mb-6">Berkas di Case File</h3>
          <div className="flex flex-col gap-2 md:gap-3">
            {inventory.length === 0 ? (
              <div className="text-xs md:text-sm text-[#52525B] italic">Case file masih kosong. Mulai keliling sekolah.</div>
            ) : (
              inventory.map((evidence, i) => (
                <motion.div
                  key={evidence.id}
                  className="flex items-start gap-3 md:gap-4 py-2 border-b border-[#27272A]/50 last:border-0"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <span className="text-[9px] md:text-[10px] font-bold text-[#E11D48] mt-1 tracking-widest">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs md:text-sm font-semibold truncate">{evidence.title}</div>
                    <div className="text-[10px] md:text-[11px] text-[#71717A] mt-0.5 md:mt-1">{evidence.source}</div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
