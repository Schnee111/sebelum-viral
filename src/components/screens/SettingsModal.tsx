import { motion, AnimatePresence } from 'framer-motion';
import { X, Type, Gauge, Home } from 'lucide-react';
import { useSettingsStore, TEXT_SPEED_MS } from '../../stores/settingsStore';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoHome: () => void;
}

const textSpeedLabels: Record<string, string> = {
  slow: 'Lambat',
  normal: 'Normal',
  fast: 'Cepat',
  instant: 'Instan',
};

export function SettingsModal({ isOpen, onClose, onGoHome }: SettingsModalProps) {
  const { textSpeed, setTextSpeed } = useSettingsStore();

  const speeds = Object.keys(TEXT_SPEED_MS) as Array<keyof typeof TEXT_SPEED_MS>;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="absolute inset-0 z-50 flex items-center justify-center p-4 font-body"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-sm bg-navy-800 border border-navy-600 rounded-2xl shadow-2xl overflow-hidden"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-navy-700 bg-navy-900/50">
                <h3 className="font-heading text-lg font-bold text-navy-100">Pengaturan</h3>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg hover:bg-navy-700 text-navy-400 hover:text-navy-100 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Body */}
              <div className="p-5 space-y-6">
                {/* Text Speed */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-navy-300 uppercase tracking-wider">
                    <Gauge size={16} className="text-game-accent" />
                    <span>Kecepatan Teks</span>
                  </div>
                  <div className="flex gap-2 bg-navy-900/50 p-1 rounded-xl border border-navy-700">
                    {speeds.map((speed) => (
                      <button
                        key={speed}
                        onClick={() => setTextSpeed(speed)}
                        className={`flex-1 py-2.5 px-2 rounded-lg text-xs font-bold transition-all duration-300 uppercase tracking-wider ${
                          textSpeed === speed
                            ? 'bg-game-accent text-white shadow-lg shadow-game-accent/20'
                            : 'bg-transparent text-navy-500 hover:text-navy-300 hover:bg-navy-700/50'
                        }`}
                      >
                        {textSpeedLabels[speed]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Info */}
                <div className="flex items-start gap-3 p-4 bg-navy-900/50 border border-navy-700 rounded-xl text-xs text-navy-400 leading-relaxed font-medium">
                  <Type size={14} className="mt-0.5 flex-shrink-0 text-navy-500" />
                  <span>Pengaturan tersimpan otomatis. Klik di mana saja pada layar cerita untuk melanjutkan dialog.</span>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-navy-700 bg-navy-900/50">
                <button
                  onClick={onGoHome}
                  className="w-full py-3.5 px-4 rounded-xl bg-navy-700 hover:bg-game-contradiction hover:text-white border border-navy-600 hover:border-game-contradiction/50 text-navy-300 text-sm font-bold tracking-wide uppercase transition-all flex items-center justify-center gap-2"
                >
                  <Home size={16} />
                  Kembali ke Menu Utama
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
