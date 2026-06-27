import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, AlertCircle, Search, Zap, ArrowLeft, ChevronRight, X } from 'lucide-react';
import { Background } from '../visual-novel/Background';
import type { Scene, Evidence } from '../../types';

interface ExplorationScreenProps {
  scene: Scene;
  inventory: Evidence[];
  visitedSceneIds: string[];
  onAction: (sceneId: string) => void;
  onBack: () => void;
}

export function ExplorationScreen({ scene, inventory, visitedSceneIds, onAction, onBack }: ExplorationScreenProps) {
  const [activeMenu, setActiveMenu] = useState<'main' | 'interrogate' | 'present'>('main');

  const exp = scene.exploration;
  if (!exp) return null;

  const charSprite = `/assets/characters/${exp.characterId}/${exp.characterId}_neutral.png`; // Fallback simple sprite logic

  return (
    <div className="absolute inset-0 bg-[#09090B] flex flex-col font-body text-[#FAFAFA] overflow-hidden">
      <Background src={`/assets/backgrounds/${scene.background}.jpg`} />
      
      {/* Top Bar */}
      <div className="absolute top-0 inset-x-0 py-6 pl-6 pr-16 z-20 flex justify-between items-start bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
        <button
          onClick={onBack}
          className="pointer-events-auto flex items-center gap-2 text-sm font-semibold hover:text-white transition-colors text-[#A1A1AA] bg-black/40 px-4 py-2 rounded-full backdrop-blur-md border border-white/10"
        >
          <ArrowLeft size={16} />
          <span>Kembali ke Hub</span>
        </button>
        <div className="text-right">
          <div className="text-xl font-bold tracking-tight text-white drop-shadow-md">{scene.title}</div>
          <div className="text-[10px] font-bold text-[#E11D48] tracking-widest uppercase drop-shadow-md">Eksplorasi</div>
        </div>
      </div>

      {/* Character Sprite */}
      <div className="absolute inset-0 z-10 flex items-end justify-center pointer-events-none">
        <motion.img
          src={charSprite}
          alt={exp.characterId}
          className="h-[75vh] object-contain drop-shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      {/* Action Dashboard */}
      <div className="absolute bottom-0 inset-x-0 z-30 p-6 md:p-8 bg-gradient-to-t from-black via-black/90 to-transparent">
        <div className="max-w-4xl mx-auto w-full">
          <AnimatePresence mode="wait">
            
            {/* MAIN MENU */}
            {activeMenu === 'main' && (
              <motion.div
                key="main"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                <ActionButton
                  icon={<MessageSquare size={20} />}
                  label="Ngomong"
                  desc="Obrolan santai"
                  onClick={() => onAction(exp.talkSceneId)}
                  color="#34D399"
                />
                <ActionButton
                  icon={<AlertCircle size={20} />}
                  label="Interogasi"
                  desc={!visitedSceneIds.includes(exp.talkSceneId) ? 'Terkunci (Ngobrol dulu)' : 'Beri tekanan'}
                  onClick={() => setActiveMenu('interrogate')}
                  color="#F59E0B"
                  disabled={!exp.interrogationScenes || !visitedSceneIds.includes(exp.talkSceneId)}
                />
                <ActionButton
                  icon={<Search size={20} />}
                  label="Investigasi"
                  desc={!visitedSceneIds.includes(exp.talkSceneId) ? 'Terkunci (Ngobrol dulu)' : 'Cari petunjuk'}
                  onClick={() => exp.investigationSceneId && onAction(exp.investigationSceneId)}
                  color="#3B82F6"
                  disabled={!exp.investigationSceneId || !visitedSceneIds.includes(exp.talkSceneId)}
                />
                <ActionButton
                  icon={<Zap size={20} />}
                  label="Konfrontasi"
                  desc={!visitedSceneIds.includes(exp.talkSceneId) ? 'Terkunci (Ngobrol dulu)' : 'Sodorkan bukti'}
                  onClick={() => setActiveMenu('present')}
                  color="#E11D48"
                  disabled={!visitedSceneIds.includes(exp.talkSceneId)}
                />
              </motion.div>
            )}

            {/* INTERROGATE MENU */}
            {activeMenu === 'interrogate' && (
              <motion.div
                key="interrogate"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="flex flex-col gap-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-bold text-[#F59E0B] tracking-widest uppercase">Pilih Pendekatan</div>
                  <button onClick={() => setActiveMenu('main')} className="p-2 text-zinc-400 hover:text-white"><X size={20}/></button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <ActionButton
                    icon={null}
                    label="Lembut"
                    desc="Pendekatan santai"
                    onClick={() => exp.interrogationScenes?.soft && onAction(exp.interrogationScenes.soft)}
                  />
                  <ActionButton
                    icon={null}
                    label="Keras"
                    desc={!visitedSceneIds.includes(exp.interrogationScenes?.soft || '') ? 'Terkunci (Coba halus dulu)' : 'Tekanan tinggi'}
                    onClick={() => exp.interrogationScenes?.hard && onAction(exp.interrogationScenes.hard)}
                    disabled={!exp.interrogationScenes?.hard || !visitedSceneIds.includes(exp.interrogationScenes?.soft || '')}
                  />
                  <ActionButton
                    icon={null}
                    label="Psikologis"
                    desc={!visitedSceneIds.includes(exp.interrogationScenes?.hard || '') ? 'Terkunci (Coba keras dulu)' : 'Bongkar motif'}
                    onClick={() => exp.interrogationScenes?.psychological && onAction(exp.interrogationScenes.psychological)}
                    disabled={!exp.interrogationScenes?.psychological || !visitedSceneIds.includes(exp.interrogationScenes?.hard || '')}
                  />
                </div>
              </motion.div>
            )}

            {/* PRESENT EVIDENCE MENU */}
            {activeMenu === 'present' && (
              <motion.div
                key="present"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="flex flex-col gap-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-bold text-[#E11D48] tracking-widest uppercase">Sodorkan Bukti</div>
                  <button onClick={() => setActiveMenu('main')} className="p-2 text-zinc-400 hover:text-white"><X size={20}/></button>
                </div>
                
                {inventory.length === 0 ? (
                  <div className="p-8 text-center text-zinc-500 italic border border-zinc-800 rounded-2xl bg-zinc-900/50">
                    Belum ada bukti di Case File.
                  </div>
                ) : (
                  <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
                    {inventory.map(item => (
                      <button
                        key={item.id}
                        className="snap-start flex-shrink-0 w-64 p-4 rounded-xl border border-zinc-800 bg-zinc-900/80 hover:border-[#E11D48] hover:bg-zinc-800 transition-all text-left group"
                        onClick={() => {
                          const routeId = exp.presentEvidenceRoutes?.[item.id] || exp.defaultPresentSceneId;
                          if (routeId) onAction(routeId);
                        }}
                      >
                        <div className="text-xs font-bold text-[#E11D48] mb-1 truncate">{item.title}</div>
                        <div className="text-[10px] text-zinc-400 line-clamp-2">{item.claim}</div>
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function ActionButton({ icon, label, desc, onClick, color = '#FAFAFA', disabled = false }: any) {
  return (
    <motion.button
      className={`group relative p-4 text-left flex flex-col justify-between overflow-hidden rounded-2xl border transition-all h-28 ${
        disabled 
          ? 'border-zinc-800 bg-zinc-900/50 opacity-50 cursor-not-allowed' 
          : 'border-zinc-800 bg-zinc-900/80 hover:border-zinc-600 hover:bg-zinc-800'
      }`}
      onClick={disabled ? undefined : onClick}
      whileHover={disabled ? {} : { scale: 1.02, y: -2 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
    >
      <div className="flex justify-between items-start w-full">
        <div style={{ color: disabled ? '#52525B' : color }}>{icon}</div>
        {!disabled && <ChevronRight size={16} className="text-zinc-600 group-hover:text-white transition-colors" />}
      </div>
      <div>
        <div className="text-sm font-bold mt-2" style={{ color: disabled ? '#52525B' : '#FAFAFA' }}>{label}</div>
        <div className="text-[10px] text-zinc-500 mt-0.5">{desc}</div>
      </div>
      
      {/* Background glow on hover */}
      {!disabled && (
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" 
          style={{ background: `radial-gradient(circle at top right, ${color}, transparent 70%)` }}
        />
      )}
    </motion.button>
  );
}
