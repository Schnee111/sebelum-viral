import { motion, AnimatePresence } from 'framer-motion';

interface TransitionOverlayProps {
  isActive: boolean;
  onComplete?: () => void;
  duration?: number;
}

export function TransitionOverlay({
  isActive,
  onComplete,
  duration = 500,
}: TransitionOverlayProps) {
  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isActive && (
        <motion.div
          className="absolute inset-0 z-50 bg-navy-900"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: duration / 1000 }}
        />
      )}
    </AnimatePresence>
  );
}
