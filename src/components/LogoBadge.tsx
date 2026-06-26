import { useState } from 'react';
import { camp } from '../content/camp';

interface LogoBadgeProps {
  compact?: boolean;
}

export const LogoBadge = ({ compact = false }: LogoBadgeProps) => {
  const [imageMissing, setImageMissing] = useState(false);

  if (!imageMissing) {
    return (
      <img
        src="/logo.png"
        alt={`${camp.name} logo`}
        onError={() => setImageMissing(true)}
        className={compact ? 'h-11 w-auto rounded-2xl object-contain' : 'h-14 w-auto rounded-2xl object-contain'}
      />
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-3 rounded-2xl border border-[color:var(--color-brand-border)] bg-[color:var(--color-brand-soft)] px-3 py-2 ${
        compact ? '' : 'shadow-[0_16px_34px_rgba(73,58,171,0.18)]'
      }`}
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[color:var(--color-brand)] text-sm font-semibold text-white">
        SC
      </div>
      <div>
        <p className="text-sm font-semibold text-white">{camp.name}</p>
        <p className="text-xs text-[color:var(--color-brand-text)]">Replace with `/public/logo.png` later</p>
      </div>
    </div>
  );
};
