import React from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { TIMELINE_EVENTS } from '../../data/timeline';
import { Calendar, GitCommit } from 'lucide-react';

export const TimelineSection: React.FC = () => {
  return (
    <section id="timeline" className="py-16 sm:py-20 border-b border-white/[0.06]" aria-label="Learning Progression Timeline">
      <SectionHeader
        number="08"
        label="Progression & Growth"
        title="Engineering Evolution Timeline"
        description="The structured progression from low-level systems programming foundations to full-stack web platforms and modern artificial intelligence pipelines."
      />

      <div className="relative pl-6 sm:pl-8 border-l border-white/[0.1] space-y-10">
        {TIMELINE_EVENTS.map((event, idx) => (
          <div key={idx} className="relative group">
            {/* Timeline Marker Node */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#090a0f] border-2 border-cyan-400 flex items-center justify-center group-hover:scale-125 transition-transform duration-200">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            </div>

            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-mono text-xs font-semibold">
                  {event.year}
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  {event.category}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {event.title}
              </h3>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-2xl font-normal">
                {event.description}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {event.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-[11px] font-mono text-zinc-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
