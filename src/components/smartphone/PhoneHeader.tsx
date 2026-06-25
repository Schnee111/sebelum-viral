import { Wifi, Battery, Signal } from 'lucide-react';

interface PhoneHeaderProps {
  variant: 'social' | 'chat';
}

export function PhoneHeader({ variant }: PhoneHeaderProps) {
  return (
    <div className="flex-shrink-0 flex flex-col relative z-20">
      {/* Status Bar */}
      <div className="px-6 py-2 flex items-center justify-between bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-1.5 text-white/90">
          <span className="text-[11px] font-bold tracking-wider">10:42</span>
        </div>
        {/* Notch */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-32 h-6 bg-black rounded-b-3xl shadow-[0_4px_15px_rgba(0,0,0,0.5)] flex items-center justify-center gap-3 z-30">
           <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50 blur-[0.5px]" />
           <div className="w-2.5 h-2.5 rounded-full bg-navy-900 border border-white/10 shadow-inner" />
        </div>
        <div className="flex items-center gap-2 text-white/90">
          <Signal size={12} />
          <Wifi size={12} />
          <Battery size={14} />
        </div>
      </div>
      
      {/* App Header */}
      <div className="px-5 py-3.5 bg-black/50 backdrop-blur-xl border-b border-white/5 flex items-center justify-center shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <span className="relative z-10 text-xs font-bold tracking-widest uppercase text-white/90 drop-shadow-md">
          {variant === 'chat' ? 'Pesan Terenkripsi' : 'Jejaring Sosial'}
        </span>
      </div>
    </div>
  );
}
