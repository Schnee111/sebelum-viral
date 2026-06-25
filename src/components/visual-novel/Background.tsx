import { motion, AnimatePresence } from 'framer-motion';

interface BackgroundProps {
  src: string;
  alt?: string;
}

export function Background({ src, alt = 'Background' }: BackgroundProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={src}
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-navy-900/30" />
      </motion.div>
    </AnimatePresence>
  );
}
