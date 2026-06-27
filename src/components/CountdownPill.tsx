import { formatEventCountdown, formatRelativeCountdown } from '../lib/time';

interface CountdownPillProps {
  targetIso: string;
  prefix: string;
  now: Date;
  mode?: 'default' | 'event';
}

export const CountdownPill = ({
  targetIso,
  prefix,
  now,
  mode = 'default',
}: CountdownPillProps) => {
  const label =
    mode === 'event'
      ? formatEventCountdown(new Date(targetIso), now)
      : formatRelativeCountdown(new Date(targetIso), now);

  return (
    <div className="inline-flex items-center rounded-full border border-[color:var(--color-brand-border)] bg-[color:var(--color-brand-soft)] px-3 py-1 text-xs font-medium text-slate-100">
      {mode === 'event' && label === 'tomorrow' ? `Starts ${label}` : `${prefix} ${label}`}
    </div>
  );
};
