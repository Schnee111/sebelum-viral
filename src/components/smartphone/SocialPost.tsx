import { motion } from 'framer-motion';
import { Heart, MessageCircle, Send, Bookmark } from 'lucide-react';

interface SocialPostProps {
  handle: string;
  content: string;
}

export function SocialPost({ handle, content }: SocialPostProps) {
  return (
    <motion.div
      className="rounded-2xl overflow-hidden my-4 border border-navy-600/60 bg-navy-800/90 backdrop-blur-md shadow-2xl font-body"
      initial={{ opacity: 0, y: 15, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
    >
      {/* Post header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-navy-700/60 bg-navy-900/30">
        {/* Avatar */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-[12px] font-bold shadow-inner"
          style={{
            background: 'linear-gradient(135deg, #FF3366, #FF9933)',
            color: '#FFF',
          }}
        >
          {handle.slice(1, 3).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[13px] font-bold text-navy-100 tracking-wide">
            {handle}
          </div>
          <div className="text-[10px] text-game-accent font-bold uppercase tracking-widest mt-0.5">
            Sponsored
          </div>
        </div>
        <div className="text-navy-400 font-bold tracking-widest cursor-pointer hover:text-navy-100 transition-colors">⋯</div>
      </div>

      {/* Post image area (gradient placeholder) */}
      <div
        className="w-full aspect-square flex items-center justify-center px-8 py-10 relative overflow-hidden group"
        style={{
          background: 'linear-gradient(145deg, rgba(15,23,42,0.95) 0%, rgba(30,41,59,0.95) 100%)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-0" />
        
        <p className="relative z-10 text-center text-[15px] leading-relaxed font-bold text-white drop-shadow-lg group-hover:scale-105 transition-transform duration-700">
          "{content}"
        </p>
      </div>

      {/* Action bar */}
      <div className="px-4 py-3 bg-navy-900/50">
        <div className="flex items-center gap-5 mb-3">
          <Heart size={24} className="text-navy-100 hover:text-game-accent transition-colors cursor-pointer" />
          <MessageCircle size={24} className="text-navy-100 hover:text-game-warm transition-colors cursor-pointer" />
          <Send size={24} className="text-navy-100 hover:text-blue-400 transition-colors cursor-pointer" />
          <div className="flex-1" />
          <Bookmark size={24} className="text-navy-100 hover:text-white transition-colors cursor-pointer" />
        </div>

        {/* Likes */}
        <div className="text-[12px] font-bold text-navy-100 mb-1">
          {randomLikes(handle)} Suka
        </div>

        {/* Caption */}
        <div className="text-[12px] leading-relaxed text-navy-300">
          <span className="font-bold text-navy-100 mr-2">{handle}</span>
          <span className="font-medium">{content}</span>
        </div>

        {/* Comments link */}
        <div className="text-[11px] mt-1.5 text-navy-500 font-bold hover:text-navy-400 cursor-pointer transition-colors">
          Lihat semua {randomComments(handle)} komentar
        </div>

        {/* Timestamp */}
        <div className="text-[9px] mt-1.5 text-navy-600 font-bold uppercase tracking-widest">
          2 JAM YANG LALU
        </div>
      </div>
    </motion.div>
  );
}

/** Deterministic fake engagement numbers */
function randomLikes(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash + seed.charCodeAt(i)) | 0;
  }
  const n = 1240 + (Math.abs(hash) % 8900);
  return n.toLocaleString('id-ID');
}

function randomComments(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 3) - hash + seed.charCodeAt(i)) | 0;
  }
  return String(120 + (Math.abs(hash) % 800));
}
