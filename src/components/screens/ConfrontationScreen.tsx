import { motion } from 'framer-motion';
import { Background } from '../visual-novel/Background';

interface ConfrontationScreenProps {
  dialogue: { speaker: string; text: string }[];
  onContinue: () => void;
  background?: string;
}

export function ConfrontationScreen({ dialogue, onContinue, background }: ConfrontationScreenProps) {
  return (
    <div className="absolute inset-0 bg-[#09090B] flex flex-col font-body text-[#FAFAFA] overflow-hidden">
      {background && <Background src={`/assets/backgrounds/${background}.jpg`} />}
      
      <div className="absolute inset-0 bg-black/60 z-0" /> {/* Dark overlay for readability */}
      
      <div className="relative z-10 flex flex-col h-full">
      {/* Minimalist Header */}
      <div className="px-8 pt-12 pb-6 border-b border-[#27272A]">
        <div className="text-[10px] font-bold text-[#E11D48] tracking-widest uppercase mb-1">Fase 02</div>
        <h2 className="font-heading text-3xl font-bold tracking-tight">Konfrontasi</h2>
      </div>

      {/* Chat Bubble Style Dialogue */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-8 space-y-4 max-w-4xl mx-auto w-full">
        {dialogue.map((line, index) => {
          const isPlayer = line.speaker.toLowerCase() === 'nala';
          
          return (
            <motion.div
              key={index}
              className={`flex w-full ${isPlayer ? 'justify-end' : 'justify-start'}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
            >
              <div className={`flex flex-col ${isPlayer ? 'items-end' : 'items-start'} max-w-[85%] md:max-w-[70%]`}>
                {/* Speaker Label */}
                <span className={`text-[10px] font-bold tracking-widest uppercase mb-1.5 px-1 ${isPlayer ? 'text-[#E11D48]' : 'text-[#71717A]'}`}>
                  {line.speaker}
                </span>
                
                {/* Dialogue Bubble */}
                <div 
                  className={`px-5 py-3.5 rounded-2xl text-[14px] leading-relaxed ${
                    isPlayer 
                      ? 'bg-[#E11D48] text-white rounded-tr-sm' 
                      : 'bg-[#18181B] text-[#FAFAFA] border border-[#27272A] rounded-tl-sm'
                  }`}
                >
                  {line.text}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer Action */}
      <div className="p-8 border-t border-[#27272A] flex justify-end">
        <button 
          onClick={onContinue}
          className="px-8 py-3 bg-[#FAFAFA] text-[#09090B] font-bold text-sm tracking-wide rounded-full hover:bg-[#E4E4E7] hover:scale-105 active:scale-95 transition-all"
        >
          Lanjutkan
        </button>
      </div>
      </div>
    </div>
  );
}
