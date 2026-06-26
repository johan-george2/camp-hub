import { useEffect, useMemo, useState } from 'react';
import { camp } from '../../content/camp';
import { packingList, whatNotToBring, whatToBring } from '../../content/packingList';
import { loadPackingState, savePackingState } from '../../lib/storage';
import { formatLongDate } from '../../lib/time';
import { Card } from '../Card';
import { SectionHeader } from '../SectionHeader';

interface PreCampPageProps {
  now: Date;
}

export const PreCampPage = ({ now }: PreCampPageProps) => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  useEffect(() => {
    setCheckedItems(loadPackingState());
  }, []);

  useEffect(() => {
    savePackingState(checkedItems);
  }, [checkedItems]);

  const countdown = useMemo(() => {
    const campStart = new Date(camp.start);
    const diff = campStart.getTime() - now.getTime();
    if (diff <= 0) return 'Camp is underway';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    return `${days}d ${hours}h to go`;
  }, [now]);

  const togglePackingItem = (id: string) => {
    setCheckedItems((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  return (
    <div className="space-y-5">
      <Card className="bg-[linear-gradient(145deg,rgba(73,58,171,0.24),rgba(73,58,171,0.08)_42%,rgba(255,255,255,0.04))]">
        <div className="space-y-3">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-[color:var(--color-brand-text)]">Pre-Camp</p>
          <h2 className="text-3xl font-semibold tracking-tight text-white">{countdown}</h2>
          <p className="text-sm leading-6 text-slate-300">
            Camp starts on {formatLongDate(camp.start)}.
          </p>
        </div>
      </Card>

      <SectionHeader
        eyebrow="Ready"
        title="Everything to sort before arrival"
        subtitle="A practical checklist and key details built for a quick mobile scan."
      />

      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Packing checklist</h3>
          <div className="space-y-2">
            {packingList.map((item) => {
              const checked = checkedItems.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => togglePackingItem(item.id)}
                  className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition ${
                    checked
                      ? 'bg-[color:var(--color-brand-soft)] text-white'
                      : 'bg-white/5 text-slate-300 hover:bg-white/7'
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                      checked
                        ? 'border-[color:var(--color-brand)] bg-[color:var(--color-brand)] text-white'
                        : 'border-white/15'
                    }`}
                  >
                    {checked ? '✓' : ''}
                  </span>
                  <span className="flex-1">
                    {item.label}
                    <span className="ml-2 text-xs text-slate-500">{item.category}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </Card>

      <Card>
        <div className="grid gap-4 text-sm leading-6 text-slate-300">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-brand-text)]">Arrival</p>
            <p>{camp.arrivalInfo}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-brand-text)]">Departure</p>
            <p>{camp.departureInfo}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-brand-text)]">Camp Address</p>
            <p>{camp.address}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-brand-text)]">What to Bring</p>
            <p>{whatToBring}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-brand-text)]">What Not to Bring</p>
            <p>{whatNotToBring}</p>
          </div>
          <div className="rounded-2xl border border-[color:var(--color-brand-border)] bg-[color:var(--color-brand-soft)] p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-brand-text)]">Theme</p>
            <p className="mt-1 text-lg font-semibold text-white">{camp.theme}</p>
            <p className="mt-2 text-sm text-slate-200">{camp.themeVerse}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-brand-text)]">Important Reminders</p>
            <p>{camp.reminders}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
