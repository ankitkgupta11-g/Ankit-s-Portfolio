import React from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { EDUCATION_LIST } from '../../data/education';
import { GraduationCap, MapPin, Award, CheckCircle2 } from 'lucide-react';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-16 sm:py-20 border-b border-white/[0.06]" aria-label="Academic Education">
      <SectionHeader
        number="06"
        label="Academic Foundation"
        title="Engineering Education"
        description="Formal university education providing foundations in computer science theory, algorithms, and artificial intelligence."
      />

      <div className="space-y-6">
        {EDUCATION_LIST.map((edu, idx) => (
          <div
            key={idx}
            className="p-6 sm:p-7 rounded-2xl bg-[#10121a]/80 border border-white/[0.08] hover:border-cyan-500/30 transition-all duration-300 space-y-5"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-white/[0.06] pb-4">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0 mt-0.5">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-zinc-300 text-[11px] font-mono">
                      {edu.status}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[11px] font-mono">
                      {edu.score}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {edu.degree}
                  </h3>
                  <p className="text-sm font-semibold text-cyan-400 mt-0.5">
                    {edu.field}
                  </p>
                  <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{edu.institution}, {edu.location}</span>
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-3">
                Curriculum Focus &amp; Practical Engineering Coursework:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {edu.highlights.map((point, pIdx) => (
                  <div
                    key={pIdx}
                    className="flex items-start gap-2 p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04] text-xs text-zinc-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
