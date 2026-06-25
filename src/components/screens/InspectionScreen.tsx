import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Evidence, ClaimInspectionRule } from '../../types';
import { ArrowLeft, FileText, CheckCircle2, XCircle, AlertTriangle, HelpCircle, Search } from 'lucide-react';

interface InspectionScreenProps {
  evidences: Evidence[];
  claimRules: ClaimInspectionRule[];
  foundInsightIds: string[];
  onEvaluate: (evidenceId: string) => void;
  onBack: () => void;
}

const VERDICT_CONFIG = {
  supports: { icon: CheckCircle2, color: 'text-[#10B981]', label: 'MENDUKUNG' },
  contradicts: { icon: XCircle, color: 'text-[#E11D48]', label: 'BERTENTANGAN' },
  weak: { icon: AlertTriangle, color: 'text-[#F59E0B]', label: 'LEMAH' },
  needs_context: { icon: HelpCircle, color: 'text-[#71717A]', label: 'PERLU KONTEKS' },
};

export function InspectionScreen({
  evidences,
  claimRules,
  foundInsightIds,
  onEvaluate,
  onBack,
}: InspectionScreenProps) {
  const [selectedEvidence, setSelectedEvidence] = useState<string | null>(null);
  const [evaluationResult, setEvaluationResult] = useState<{
    verdict: string;
    feedback: string;
  } | null>(null);

  const claimText = 'Aldi memakai dana OSIS untuk acara pribadi';

  const handleEvaluate = () => {
    if (!selectedEvidence) return;

    const rule = claimRules.find((r) => r.evidenceId === selectedEvidence);
    if (rule) {
      const requirementsMet = rule.requiredInsightIds.every((id) =>
        foundInsightIds.includes(id),
      );
      setEvaluationResult({
        verdict: requirementsMet ? rule.verdict : 'needs_context',
        feedback: requirementsMet
          ? rule.feedback
          : 'Hubungkan bukti terkait di detective board sebelum memakai bukti ini untuk konfrontasi.',
      });
      if (requirementsMet) {
        onEvaluate(selectedEvidence);
      }
    } else {
      setEvaluationResult({
        verdict: 'needs_context',
        feedback: 'Bukti ini belum cukup untuk memeriksa klaim tersebut.',
      });
    }
  };

  return (
    <div className="absolute inset-0 bg-[#09090B] flex flex-col font-body text-[#FAFAFA]">
      
      {/* Minimalist Header */}
      <div className="px-8 pt-8 pb-4 border-b border-[#27272A] flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[10px] font-bold text-[#A1A1AA] hover:text-[#FAFAFA] uppercase tracking-widest transition-colors"
        >
          <ArrowLeft size={14} />
          Kembali
        </button>
        <div className="text-[10px] font-bold text-[#E11D48] tracking-widest uppercase">
          Cross-Check
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-8 py-8 flex flex-col max-w-3xl mx-auto w-full">
        
        {/* Claim Block */}
        <div className="mb-12 border-l-2 border-[#E11D48] pl-6 py-2">
          <div className="text-[10px] font-bold text-[#71717A] tracking-widest uppercase mb-2 flex items-center gap-2">
            <Search size={12} />
            Subjek Pemeriksaan
          </div>
          <h3 className="text-xl font-medium leading-relaxed italic text-[#D4D4D8]">
            "{claimText}"
          </h3>
        </div>

        <div className="text-[10px] font-bold text-[#71717A] tracking-widest uppercase mb-4">
          Pilih Berkas Referensi
        </div>

        {/* Evidence List */}
        <div className="flex-1 space-y-2 mb-8">
          {evidences.map((evidence, index) => {
            const isSelected = selectedEvidence === evidence.id;
            return (
              <motion.div
                key={evidence.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <button
                  className={`w-full text-left p-4 rounded-xl border flex items-center gap-4 transition-all ${
                    isSelected
                      ? 'bg-[#18181B] border-[#E11D48]'
                      : 'bg-[#09090B] border-[#27272A] hover:bg-[#18181B] hover:border-[#3F3F46]'
                  }`}
                  onClick={() => {
                    setSelectedEvidence(evidence.id);
                    setEvaluationResult(null);
                  }}
                >
                  <FileText size={18} className={isSelected ? 'text-[#E11D48]' : 'text-[#71717A]'} />
                  <div className="flex-1">
                    <div className={`text-sm font-semibold mb-1 ${isSelected ? 'text-[#FAFAFA]' : 'text-[#D4D4D8]'}`}>
                      {evidence.title}
                    </div>
                    <div className="text-[10px] text-[#71717A] uppercase tracking-widest">
                      Sumber: {evidence.source}
                    </div>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Evaluation Result */}
        <AnimatePresence mode="wait">
          {evaluationResult && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-8"
            >
              {(() => {
                const config = VERDICT_CONFIG[evaluationResult.verdict as keyof typeof VERDICT_CONFIG];
                if (!config) return null;
                const Icon = config.icon;
                return (
                  <div className="p-6 bg-[#18181B] rounded-xl border border-[#27272A] flex items-start gap-4">
                    <Icon size={20} className={config.color} />
                    <div>
                      <div className={`text-[10px] font-bold tracking-widest mb-2 ${config.color}`}>
                        {config.label}
                      </div>
                      <div className="text-sm text-[#D4D4D8] leading-relaxed">
                        {evaluationResult.feedback}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Action */}
        <button
          onClick={handleEvaluate}
          disabled={!selectedEvidence}
          className={`w-full py-4 rounded-full font-bold text-[11px] tracking-widest uppercase transition-all ${
            selectedEvidence
              ? 'bg-[#FAFAFA] text-[#09090B] hover:bg-[#E4E4E7]'
              : 'bg-[#18181B] text-[#71717A] cursor-not-allowed border border-[#27272A]'
          }`}
        >
          {selectedEvidence ? 'Evaluasi Bukti' : 'Pilih Berkas'}
        </button>
      </div>
    </div>
  );
}
