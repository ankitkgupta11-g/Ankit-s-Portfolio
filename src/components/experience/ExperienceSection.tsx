import React from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { EXPERIENCE_LIST } from '../../data/experience';
import { Briefcase, Calendar, CheckCircle2, Clock, MapPin } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-16 sm:py-20 border-b border-white/[0.06]" aria-label="Professional Experience & Training">
      <SectionHeader
        number="05"
        label="Hands-on Training"
        title="Internship & Practical Engineering"
        description="Verifiable professional training and hands-on laboratory experience focused on machine learning and deep learning pipelines."
      />

      <div className="relative pl-6 sm:pl-8 border-l border-white/[0.08] space-y-8">
        {EXPERIENCE_LIST.map((exp, index) => (
          <div key={index} className="relative group">
            {/* Timeline Node Marker */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#090a0f] border-2 border-cyan-400 flex items-center justify-center shadow-md shadow-cyan-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            </div>

            {/* Experience Card */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#10121a]/80 border border-white/[0.08] hover:border-cyan-500/30 transition-all duration-300 space-y-5">
              {/* Header Details */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-white/[0.06] pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[11px] font-mono uppercase tracking-wider">
                      {exp.type}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {exp.role}
                  </h3>
                  <p className="text-sm font-semibold text-cyan-400 mt-1">
                    {exp.organization}
                  </p>
                </div>

                <div className="flex sm:flex-col items-start sm:items-end gap-1.5 text-xs font-mono text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{exp.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{exp.period}</span>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                {exp.summary}
              </p>

              {/* Core Focus Areas */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-3">
                  Key Technical Competencies &amp; Labs Covered:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {exp.focusAreas.map((area, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/[0.04] text-xs text-zinc-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
