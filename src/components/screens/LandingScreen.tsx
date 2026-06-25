import { motion } from 'framer-motion';
import { Play, BookOpen, Search, AlertTriangle } from 'lucide-react';

interface LandingScreenProps {
  hasSave: boolean;
  onStart: () => void;
  onContinue: () => void;
}

export function LandingScreen({ hasSave, onStart, onContinue }: LandingScreenProps) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-navy-900 overflow-hidden font-body">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Deep dark gradient mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900" />
        
        {/* Floating particles / bokeh effect */}
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-game-accent/10 blur-[100px]"
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          style={{ top: '10%', left: '10%' }}
        />
        <motion.div
          className="absolute w-80 h-80 rounded-full bg-game-weak/10 blur-[80px]"
          animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          style={{ bottom: '10%', right: '10%' }}
        />
        
        {/* Grid lines overlay (subtle) */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Floating evidence icons */}
        <motion.div
          className="absolute text-game-accent/20"
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ top: '20%', right: '15%' }}
        >
          <Search size={48} />
        </motion.div>
        <motion.div
          className="absolute text-game-warm/20"
          animate={{ y: [0, 15, 0], rotate: [0, -3, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          style={{ bottom: '25%', left: '15%' }}
        >
          <AlertTriangle size={40} />
        </motion.div>
        <motion.div
          className="absolute text-game-weak/20"
          animate={{ y: [0, -10, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          style={{ top: '40%', left: '25%' }}
        >
          <BookOpen size={36} />
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center space-y-10 px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Title block */}
        <div className="space-y-5">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-800/80 border border-game-accent/30 text-game-accent text-xs font-semibold tracking-widest uppercase shadow-lg shadow-game-accent/10 backdrop-blur-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Search size={14} />
            Game Literasi Digital
          </motion.div>

          {/* Title */}
          <motion.h1
            className="font-heading text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="text-navy-100">Sebelum </span>
            <span className="bg-gradient-to-br from-game-accent to-game-warm bg-clip-text text-transparent drop-shadow-sm">
              Viral
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-navy-400 text-base md:text-lg max-w-md mx-auto leading-relaxed font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Selidiki rumor, kumpulkan bukti, dan buat keputusan editorial yang bertanggung jawab.
          </motion.p>
        </div>

        {/* Buttons */}
        <motion.div
          className="space-y-4 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {/* Primary button */}
          <motion.button
            onClick={onStart}
            className="group relative w-64 px-6 py-4 bg-game-accent rounded-xl text-white font-semibold text-lg shadow-lg shadow-game-accent/25 hover:shadow-game-accent/50 hover:bg-opacity-90 transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <Play size={22} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            <span className="relative z-10">Mulai Investigasi</span>
          </motion.button>

          {/* Continue button */}
          {hasSave && (
            <motion.button
              onClick={onContinue}
              className="w-64 px-6 py-4 bg-navy-800/80 hover:bg-navy-700/80 border border-navy-600 rounded-xl text-navy-100 font-medium text-lg transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-md shadow-lg"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <BookOpen size={20} className="text-game-weak" />
              Lanjutkan Cerita
            </motion.button>
          )}
        </motion.div>

        {/* Bottom info */}
        <motion.div
          className="flex flex-col items-center gap-3 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <div className="flex items-center gap-4 text-navy-500 text-sm font-semibold tracking-wider uppercase">
            <span className="flex items-center gap-1.5">
              <Search size={12} /> Investigasi
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-navy-600" />
            <span className="flex items-center gap-1.5">
              <AlertTriangle size={12} /> Keputusan
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-navy-600" />
            <span className="flex items-center gap-1.5">
              <BookOpen size={12} /> Refleksi
            </span>
          </div>
          <p className="text-navy-600 text-xs tracking-widest uppercase">LIDM 2026 — ITDP</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
