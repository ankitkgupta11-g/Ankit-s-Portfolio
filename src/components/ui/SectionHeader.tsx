import React from 'react';

interface SectionHeaderProps {
  number: string;
  label: string;
  title: string;
  description?: string;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  number,
  label,
  title,
  description,
  className = '',
}) => {
  return (
    <div className={`mb-8 sm:mb-10 ${className}`}>
      <div className="flex items-center gap-2.5 mb-2.5">
        <span className="font-mono text-xs font-semibold text-cyan-400 tracking-wider">
          {number}
        </span>
        <span className="w-6 h-px bg-cyan-500/30" />
        <span className="text-[11px] font-mono tracking-widest uppercase text-zinc-400 font-medium">
          {label}
        </span>
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-2.5 text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl font-normal">
          {description}
        </p>
      )}
    </div>
  );
};
