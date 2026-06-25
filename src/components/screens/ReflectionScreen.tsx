import { motion } from 'framer-motion';
import { Background } from '../visual-novel/Background';
import type { EditorialOutcome, Evidence } from '../../types';

interface ReflectionScreenProps {
  outcome: EditorialOutcome;
  collectedEvidence: Evidence[];
  missedEvidence: Evidence[];
  onRestart: () => void;
  background?: string;
}

export function ReflectionScreen({
  outcome,
  collectedEvidence,
  missedEvidence,
  onRestart,
  background,
}: ReflectionScreenProps) {
  const tierColors = {
    strong: 'text-[#10B981]', // Emerald
    partial: 'text-[#F59E0B]', // Amber
    failure: 'text-[#E11D48]', // Rose
  };

  const tierLabels = {
    strong: 'PUBLISHED (AKURASI TINGGI)',
    partial: 'REVISI (FAKTA KURANG LENGKAP)',
    failure: 'DITOLAK (DISINFORMASI)',
  };

  return (
    <div className="absolute inset-0 bg-[#09090B] flex flex-col font-body text-[#FAFAFA] overflow-y-auto">
      {background && <Background src={`/assets/backgrounds/${background}.jpg`} />}
      
      <div className="absolute inset-0 bg-black/70 z-0" /> {/* Dark overlay for readability */}
      
      <div className="relative z-10 w-full h-full">
      {/* Minimalist Header */}
      <div className="px-8 pt-16 pb-8 border-b border-[#27272A]">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-[10px] font-bold text-[#71717A] tracking-widest uppercase mb-1">Post-Mortem</div>
          <h2 className="font-heading text-4xl font-bold tracking-tight">Refleksi Kasus</h2>
        </div>
      </div>

      <div className="flex-1 px-8 py-12 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Column: Main Outcome */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className={`text-[11px] font-bold tracking-widest uppercase mb-4 flex items-center gap-2 ${tierColors[outcome.tier]}`}>
                <span className="w-2 h-2 rounded-full currentColor bg-current"></span>
                STATUS: {tierLabels[outcome.tier]}
              </div>
              <h3 className="font-heading text-4xl lg:text-5xl font-bold mb-6 leading-tight text-[#FAFAFA]">{outcome.title}</h3>
              <p className="text-[#A1A1AA] leading-relaxed text-[16px] lg:text-[18px]">
                {outcome.narrative}
              </p>
            </motion.div>

            {/* Restart Action */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="pt-12 mt-12 border-t border-[#27272A]"
            >
              <button 
                onClick={onRestart}
                className="px-8 py-4 bg-[#FAFAFA] text-[#09090B] font-bold text-[11px] tracking-widest uppercase rounded-full hover:bg-[#E4E4E7] hover:scale-105 active:scale-95 transition-all"
              >
                Tutup Kasus & Main Lagi
              </button>
            </motion.div>
          </div>

          {/* Right Column: Details */}
          <div className="lg:col-span-5 space-y-12">
            
            {/* Learning Points */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-[10px] font-bold text-[#71717A] tracking-widest uppercase mb-6 border-b border-[#27272A] pb-3">
                Poin Pembelajaran
              </h4>
              <ul className="space-y-4">
                {outcome.reflectionBullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-4 text-[13px] text-[#D4D4D8] leading-relaxed">
                    <span className="text-[#E11D48] mt-1 font-bold">—</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Evidence Summary */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="text-[10px] font-bold text-[#71717A] tracking-widest uppercase mb-6 border-b border-[#27272A] pb-3">
                Analisis Berkas
              </h4>
              
              <div className="grid grid-cols-2 gap-6 bg-[#18181B] border border-[#27272A] p-6 rounded-2xl">
                <div>
                  <div className="text-[10px] text-[#71717A] uppercase tracking-widest mb-1">Ditemukan</div>
                  <div className="text-4xl font-bold font-heading text-[#FAFAFA]">{collectedEvidence.length}</div>
                </div>
                
                <div>
                  <div className="text-[10px] text-[#71717A] uppercase tracking-widest mb-1">Terlewat</div>
                  <div className={`text-4xl font-bold font-heading ${missedEvidence.length > 0 ? 'text-[#E11D48]' : 'text-[#10B981]'}`}>
                    {missedEvidence.length}
                  </div>
                </div>
              </div>

              {missedEvidence.length > 0 && (
                <div className="mt-6 p-4 rounded-xl border border-[#27272A] bg-[#09090B]">
                  <div className="text-[10px] text-[#71717A] uppercase tracking-widest mb-2">Berkas yang Terlewat:</div>
                  <div className="text-[12px] text-[#A1A1AA] leading-relaxed">
                    {missedEvidence.map((e) => e.title).join(' • ')}
                  </div>
                </div>
              )}
            </motion.div>

          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
