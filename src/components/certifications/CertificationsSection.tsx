import React, { useState } from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { CERTIFICATIONS } from '../../data/certifications';
import { CertificationItem } from '../../types';
import { Award, CheckCircle2, ShieldCheck, ExternalLink, Sparkles, X } from 'lucide-react';

export const CertificationsSection: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null);

  return (
    <section id="certifications" className="py-16 sm:py-20 border-b border-white/[0.06]" aria-label="Certifications and Verification">
      <SectionHeader
        number="07"
        label="Credentials & Continuous Learning"
        title="Certifications & Technical Training"
        description="Transparent verification of completed intensive training programs and verified technical competencies."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CERTIFICATIONS.map((cert, index) => (
          <div
            key={index}
            className="p-5 sm:p-6 rounded-2xl bg-[#10121a]/80 border border-white/[0.08] hover:border-cyan-500/30 transition-all duration-300 flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[11px] font-mono">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{cert.status}</span>
                </span>
                {cert.date && (
                  <span className="text-xs font-mono text-zinc-500">{cert.date}</span>
                )}
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                {cert.title}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-cyan-400 mt-1">
                {cert.organization}
              </p>
              <p className="text-xs text-zinc-400 mt-2.5 leading-relaxed font-normal">
                {cert.focus}
              </p>
            </div>

            <div className="pt-3 border-t border-white/[0.04] flex items-center justify-between">
              <span className="text-[11px] font-mono text-zinc-500">Documented Skillset</span>
              <button
                type="button"
                onClick={() => setSelectedCert(cert)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-zinc-300 hover:text-white transition-colors cursor-pointer"
              >
                <span>View Details</span>
                <ExternalLink className="w-3 h-3 text-cyan-400" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Transparent Credential Policy Notice */}
      <div className="mt-6 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-start gap-3">
        <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <p className="text-xs text-zinc-400 leading-relaxed font-mono">
          <strong className="text-zinc-200">Integrity Notice:</strong> In adherence to strict transparency standards, only actual verified certifications and academic training are cataloged. Physical training completion transcripts and repository links are available upon recruiter request.
        </p>
      </div>

      {/* Certificate Detail Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-lg p-6 rounded-2xl border border-white/10 bg-[#0e1017] shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-cyan-400" />
                <h4 className="text-base font-bold text-white">Credential Verification</h4>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-[11px] font-mono uppercase text-zinc-500 block">Certificate Title</span>
                <p className="text-sm font-bold text-white mt-0.5">{selectedCert.title}</p>
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase text-zinc-500 block">Issuing Authority / Entity</span>
                <p className="text-sm text-cyan-300 mt-0.5">{selectedCert.organization}</p>
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase text-zinc-500 block">Domain Curriculum</span>
                <p className="text-xs text-zinc-300 leading-relaxed mt-0.5">{selectedCert.focus}</p>
              </div>
            </div>

            <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified Curriculum</span>
              </span>
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
