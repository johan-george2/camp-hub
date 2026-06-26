import type { ReactNode } from 'react';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: ReactNode;
}

export const SectionHeader = ({ eyebrow, title, subtitle }: SectionHeaderProps) => (
  <div className="space-y-1">
    {eyebrow ? <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/45">{eyebrow}</p> : null}
    <h2 className="text-xl font-semibold tracking-tight text-white">{title}</h2>
    {subtitle ? <div className="text-sm text-slate-300">{subtitle}</div> : null}
  </div>
);
