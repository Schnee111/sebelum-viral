import { motion } from 'framer-motion';

interface ChatBubbleProps {
  sender: string;
  message: string;
  color: string;
  isSelf?: boolean;
}

export function ChatBubble({ sender, message, color, isSelf }: ChatBubbleProps) {
  return (
    <div className={`flex flex-col ${isSelf ? 'items-end' : 'items-start'} mb-3 font-body`}>
      {/* Sender name */}
      {!isSelf && (
        <span
          className="text-[10px] font-bold ml-3 mb-1.5 uppercase tracking-widest opacity-90 drop-shadow-sm"
          style={{ color }}
        >
          {sender}
        </span>
      )}

      {/* Bubble */}
      <motion.div
        className={`relative max-w-[85%] px-4 py-3 backdrop-blur-md shadow-lg ${
          isSelf 
            ? 'rounded-2xl rounded-br-sm bg-game-accent/90 border border-game-accent/50 text-white' 
            : 'rounded-2xl rounded-bl-sm bg-navy-800/95 border border-navy-600/50 text-navy-100'
        }`}
        initial={{ scale: 0.95, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 400 }}
      >
        <p className="text-[13px] leading-relaxed font-medium">{message}</p>
        <div className={`flex justify-end mt-1.5 opacity-70 ${isSelf ? 'text-white/80' : 'text-navy-400'}`}>
          <span className="text-[9px] font-bold tracking-wider">
            {formatTime(sender)}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

/** Generate a plausible time string based on sender name hash */
function formatTime(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash + seed.charCodeAt(i)) | 0;
  }
  const hour = 7 + (Math.abs(hash) % 12);
  const minute = (Math.abs(hash * 7) % 60);
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
}
