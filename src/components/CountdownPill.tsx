import { formatRelativeCountdown } from '../lib/time';

interface CountdownPillProps {
  targetIso: string;
  prefix: string;
  now: Date;
}

export const CountdownPill = ({ targetIso, prefix, now }: CountdownPillProps) => (
  <div className="inline-flex items-center rounded-full border border-[color:var(--color-brand-border)] bg-[color:var(--color-brand-soft)] px-3 py-1 text-xs font-medium text-slate-100">
    {prefix} {formatRelativeCountdown(new Date(targetIso), now)}
  </div>
);
