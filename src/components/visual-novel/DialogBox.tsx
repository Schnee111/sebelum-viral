import { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useTypewriter } from '../../hooks/useTypewriter';
import { useSfx } from '../../hooks';
import type { DialogueLine } from '../../types';
import { Howl } from 'howler';
import { useMemo, useEffect } from 'react';

interface DialogBoxProps {
  line: DialogueLine;
  onTap: () => void;
}

export function DialogBox({ line, onTap }: DialogBoxProps) {
  const { displayedText, isComplete, skip } = useTypewriter(line.text);
  const { play: playSfx } = useSfx();

  const blip = useMemo(() => {
    let src = '/assets/audio/sfx/blip_mid.wav';
    if (line.speaker === 'nala' || line.speaker === 'lala') src = '/assets/audio/sfx/blip_high.wav';
    if (line.speaker === 'narrator' || line.speaker === 'system') src = '/assets/audio/sfx/blip_deep.wav';
    
    return new Howl({
      src: [src],
      volume: 0.15,
    });
  }, [line.speaker]);

  // Play blip occasionally during typing
  useEffect(() => {
    if (!isComplete && displayedText.length > 0) {
      const lastChar = displayedText[displayedText.length - 1];
      if ((lastChar ?? '').trim() && displayedText.length % 2 === 0) {
        blip.play();
      }
    }
  }, [displayedText, isComplete, blip]);


  const handleClick = useCallback(() => {
    if (!isComplete) {
      skip();
    } else {
      playSfx('/assets/audio/sfx/sfx_click.wav');
      onTap();
    }
  }, [isComplete, skip, onTap, playSfx]);

  const isNarrator = line.speaker === 'narrator' || line.speaker === 'system';
  
  const speakerName = isNarrator
    ? ''
    : line.speaker.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  // ── CINEMATIC NARRATOR LAYOUT ──
  if (isNarrator) {
    return (
      <div 
        className="absolute inset-0 flex items-center justify-center z-30 cursor-pointer bg-[#09090B]/80 backdrop-blur-md transition-colors duration-500"
        onClick={handleClick}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="max-w-4xl px-5 md:px-8 text-center"
        >
          <p 
            className="text-base md:text-xl lg:text-2xl leading-relaxed md:leading-loose font-body text-[#FAFAFA] tracking-wide"
            style={{ textShadow: '0px 2px 12px rgba(0,0,0,0.8)' }}
          >
            {displayedText}
            {!isComplete && (
              <span className="inline-block w-[2px] h-[1em] bg-[#FAFAFA] ml-2 align-text-bottom animate-pulse-slow drop-shadow-md" />
            )}
          </p>
          
          <AnimatePresence>
            {isComplete && (
              <motion.div
                className="mt-8 md:mt-12 text-[9px] md:text-[10px] font-bold text-[#A1A1AA] tracking-widest uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Klik untuk lanjut
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    );
  }

  // ── CHARACTER DIALOGUE LAYOUT ──
  return (
    <motion.div
      className="absolute bottom-3 md:bottom-6 left-0 right-0 mx-auto w-[92%] md:w-[90%] max-w-5xl z-30 cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onClick={handleClick}
    >
      <div className="relative w-full bg-navy-800/80 backdrop-blur-md border border-navy-600/50 rounded-xl md:rounded-2xl p-4 md:p-6 pt-3 md:pt-5 shadow-2xl min-h-[120px] md:min-h-[160px] overflow-visible">
        
        {/* Speaker Name Tag */}
        <AnimatePresence>
          {speakerName && (
            <motion.div
              initial={{ opacity: 0, x: -20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              key={speakerName}
              className="inline-block mb-2 md:mb-3 px-3 md:px-4 py-1 md:py-1.5 rounded-lg border border-game-accent/50 bg-navy-900/95 shadow-md shadow-game-accent/20 relative z-20"
            >
              <span className="text-[11px] md:text-sm font-semibold tracking-wide text-game-accent uppercase">
                {speakerName}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dialog Text */}
        <div className="relative z-10">
          <p className="text-base md:text-lg leading-relaxed font-body text-navy-100 min-h-[56px] md:min-h-[72px]">
            {displayedText}
            {!isComplete && (
              <span className="inline-block w-[3px] h-[1em] bg-game-accent ml-1 align-text-bottom animate-pulse-slow shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
            )}
          </p>
        </div>

        {/* Next Indicator */}
        <AnimatePresence>
          {isComplete && (
            <motion.div
              className="absolute bottom-3 right-4 md:bottom-5 md:right-6 flex items-center gap-1.5 md:gap-2 text-[10px] md:text-xs font-semibold text-game-accent tracking-widest uppercase z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span>Lanjut</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronRight size={12} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-24 md:w-32 h-24 md:h-32 bg-game-accent/5 rounded-bl-full pointer-events-none z-0" />
        <div className="absolute bottom-0 left-0 w-18 md:w-24 h-18 md:h-24 bg-game-weak/5 rounded-tr-full pointer-events-none z-0" />
      </div>
    </motion.div>
  );
}
