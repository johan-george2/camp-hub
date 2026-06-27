import { useEffect, useMemo, useState } from 'react';
import { preCamp } from '../../lib/content';
import { loadPackingState, savePackingState } from '../../lib/storage';
import { formatLongDate } from '../../lib/time';
import { Card } from '../Card';
import { PrayerPromptsSection } from '../PrayerPromptsSection';
import { SectionHeader } from '../SectionHeader';

interface PreCampPageProps {
  now: Date;
}

export const PreCampPage = ({ now }: PreCampPageProps) => {
  const packingCategories = useMemo(
    () => [...new Set(preCamp.packingChecklist.map((item) => item.category))],
    [],
  );
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>(() => packingCategories[0] ?? '');

  useEffect(() => {
    setCheckedItems(loadPackingState());
  }, []);

  useEffect(() => {
    savePackingState(checkedItems);
  }, [checkedItems]);

  const countdown = useMemo(() => {
    const campStart = new Date(preCamp.countdownDate);
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

  const visiblePackingItems = useMemo(() => {
    return preCamp.packingChecklist.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="space-y-5">
      <Card className="bg-[linear-gradient(145deg,rgba(73,58,171,0.24),rgba(73,58,171,0.08)_42%,rgba(255,255,255,0.04))]">
        <div className="space-y-3">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-[color:var(--color-brand-text)]">Pre-Camp</p>
          <h2 className="text-3xl font-semibold tracking-tight text-white">{countdown}</h2>
          <p className="text-sm leading-6 text-slate-300">
            Camp starts on {formatLongDate(preCamp.countdownDate)}.
          </p>
        </div>
      </Card>

      <SectionHeader
        eyebrow="Ready"
        title="Get set before the buses roll"
      />

      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Packing checklist</h3>
          <div className="-mx-1 overflow-x-auto pb-1">
            <div className="flex min-w-max gap-2 px-1">
              {packingCategories.map((category) => {
                const isActive = activeCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`rounded-[20px] px-4 py-3 text-sm font-medium whitespace-nowrap transition ${
                      isActive
                        ? 'bg-[color:var(--color-brand)] text-white shadow-[0_10px_24px_rgba(73,58,171,0.24)]'
                        : 'text-slate-400 hover:bg-white/8 hover:text-white'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="space-y-2">
            {visiblePackingItems.map((item) => {
              const checked = checkedItems.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => togglePackingItem(item.id)}
                  className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition ${
                    checked
                      ? 'border border-[color:var(--color-brand-border)] bg-[color:var(--color-brand-soft)] text-white'
                      : 'border border-white/8 bg-white/5 text-slate-300 hover:bg-white/7'
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
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </Card>

      <PrayerPromptsSection />
    </div>
  );
};
