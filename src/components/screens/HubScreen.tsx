import { motion } from 'framer-motion';
import { Search, FileText, ArrowRight, ChevronRight, Hash, Eye } from 'lucide-react';
import type { Evidence } from '../../types';

interface HubScreenProps {
  inventory: Evidence[];
  foundInsightIds: string[];
  onOpenBoard: () => void;
  onOpenInspection: () => void;
  onContinueStory: () => void;
  canInspect: boolean;
}

export function HubScreen({
  inventory,
  foundInsightIds,
  onOpenBoard,
  onOpenInspection,
  onContinueStory,
  canInspect,
}: HubScreenProps) {
  return (
    <div className="absolute inset-0 bg-[#09090B] flex flex-col font-body text-[#FAFAFA] overflow-hidden">
      
      {/* Top Header - Minimalist */}
      <div className="px-8 pt-12 pb-6">
        <h2 className="font-heading text-4xl font-bold tracking-tight mb-2">Workspace</h2>
        <div className="flex items-center gap-6 text-[11px] font-bold tracking-widest uppercase text-[#A1A1AA]">
          <span className="flex items-center gap-2">
            <Hash size={14} /> {inventory.length} Evidences
          </span>
          <span className="flex items-center gap-2">
            <Eye size={14} /> {foundInsightIds.length} Insights
          </span>
        </div>
      </div>

      {/* Main Content Split */}
      <div className="flex-1 flex flex-col md:flex-row gap-12 px-8 pb-12 overflow-y-auto">
        
        {/* Navigation List */}
        <div className="flex-1 flex flex-col gap-2 max-w-xl">
          <motion.button
            className="group relative w-full p-6 text-left flex items-center justify-between overflow-hidden rounded-xl border border-transparent hover:bg-[#18181B] hover:border-[#27272A] transition-all"
            onClick={onOpenBoard}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <div>
              <div className="flex items-center gap-3 mb-1">
                <Search size={16} className="text-[#E11D48]" />
                <span className="text-sm font-bold tracking-widest uppercase">Detective Board</span>
              </div>
              <div className="text-sm text-[#71717A] ml-7">Hubungkan bukti dan temukan pola kasus</div>
            </div>
            <ChevronRight size={18} className="text-[#3F3F46] group-hover:text-[#FAFAFA] transition-colors" />
          </motion.button>

          {canInspect && (
            <motion.button
              className="group relative w-full p-6 text-left flex items-center justify-between overflow-hidden rounded-xl border border-transparent hover:bg-[#18181B] hover:border-[#27272A] transition-all"
              onClick={onOpenInspection}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <FileText size={16} className="text-[#E11D48]" />
                  <span className="text-sm font-bold tracking-widest uppercase">Cross-Check</span>
                </div>
                <div className="text-sm text-[#71717A] ml-7">Sandingkan klaim dengan bukti</div>
              </div>
              <ChevronRight size={18} className="text-[#3F3F46] group-hover:text-[#FAFAFA] transition-colors" />
            </motion.button>
          )}

          <div className="h-px w-full bg-[#27272A] my-4" />

          <motion.button
            className="group relative w-full p-6 text-left flex items-center justify-between overflow-hidden rounded-xl border border-transparent hover:bg-[#18181B] hover:border-[#27272A] transition-all"
            onClick={onContinueStory}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <div>
              <div className="flex items-center gap-3 mb-1">
                <ArrowRight size={16} className="text-[#E11D48]" />
                <span className="text-sm font-bold tracking-widest uppercase">Lanjut Narasi</span>
              </div>
              <div className="text-sm text-[#71717A] ml-7">Kembali ke cerita utama</div>
            </div>
            <ChevronRight size={18} className="text-[#3F3F46] group-hover:text-[#FAFAFA] transition-colors" />
          </motion.button>
        </div>

        {/* Evidence List - Minimalist Text List */}
        <div className="flex-1 md:border-l md:border-[#27272A] md:pl-12">
          <h3 className="text-[10px] font-bold text-[#71717A] tracking-widest uppercase mb-6">Berkas Terkumpul</h3>
          <div className="flex flex-col gap-3">
            {inventory.length === 0 ? (
              <div className="text-sm text-[#52525B] italic">Belum ada berkas.</div>
            ) : (
              inventory.map((evidence, i) => (
                <motion.div
                  key={evidence.id}
                  className="flex items-start gap-4 py-2 border-b border-[#27272A]/50 last:border-0"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <span className="text-[10px] font-bold text-[#E11D48] mt-1 tracking-widest">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1">
                    <div className="text-sm font-semibold">{evidence.title}</div>
                    <div className="text-[11px] text-[#71717A] mt-1">{evidence.source}</div>
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
