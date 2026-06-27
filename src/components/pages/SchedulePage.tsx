import { useEffect, useMemo, useRef, useState } from 'react';
import { scheduleDays } from '../../lib/content';
import { Card } from '../Card';
import { SectionHeader } from '../SectionHeader';
import { formatTime } from '../../lib/time';
import {
  getCampDayFromDate,
  getCurrentEvent,
  getCurrentOrClosestEventId,
  getEventsByDay,
} from '../../services/scheduleService';
import type { DayKey } from '../../types';

interface SchedulePageProps {
  now: Date;
}

export const SchedulePage = ({ now }: SchedulePageProps) => {
  const [activeDay, setActiveDay] = useState<DayKey>(() => getCampDayFromDate(now));
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const currentEvent = getCurrentEvent(now);
  const autoFocusId = getCurrentOrClosestEventId(activeDay, now);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const CategoryIcon = ({ category }: { category: string }) => {
    const commonProps = {
      className: 'h-[17px] w-[17px] text-[color:var(--color-brand-text)]',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 1.9,
      strokeLinecap: 'round' as const,
      strokeLinejoin: 'round' as const,
      viewBox: '0 0 24 24',
      'aria-hidden': true,
    };

    switch (category) {
      case 'bible-study':
      case 'devotion':
        return (
          <svg {...commonProps}>
            <path d="M5 4.5h9.5A2.5 2.5 0 0 1 17 7v12.5H7.5A2.5 2.5 0 0 0 5 22V4.5Z" />
            <path d="M17 19.5h1.5A1.5 1.5 0 0 0 20 18V6a2 2 0 0 0-2-2h-1" />
            <path d="M7.5 19.5h9.5" />
          </svg>
        );
      case 'session':
        return (
          <svg {...commonProps}>
            <path d="M8 8.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
            <path d="M16 8.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
            <path d="M6 18v-3a2.5 2.5 0 0 1 2.5-2.5h7A2.5 2.5 0 0 1 18 15v3" />
            <path d="M12 10.5v4" />
          </svg>
        );
      case 'worship':
        return (
          <svg {...commonProps}>
            <path d="m12 20-1.2-1.1C6.1 14.7 3 11.9 3 8.5A4.5 4.5 0 0 1 7.5 4c1.7 0 3.3.8 4.5 2.1A6 6 0 0 1 16.5 4 4.5 4.5 0 0 1 21 8.5c0 3.4-3.1 6.2-7.8 10.4L12 20Z" />
          </svg>
        );
      case 'meal':
        return (
          <svg {...commonProps}>
            <path d="M5.5 4v7" />
            <path d="M8.5 4v7" />
            <path d="M7 4v16" />
            <path d="M14.5 4v8a2.5 2.5 0 0 0 5 0V4" />
            <path d="M17 12v8" />
          </svg>
        );
      case 'activity':
        return (
          <svg {...commonProps}>
            <path d="m12 3 1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3Z" />
            <path d="M5 18c1.7-1.4 4.1-2.2 7-2.2S17.3 16.6 19 18" />
          </svg>
        );
      case 'arrival':
        return (
          <svg {...commonProps}>
            <rect x="5" y="4.5" width="14" height="15" rx="2.5" />
            <path d="M9 4.5v-1" />
            <path d="M15 4.5v-1" />
            <path d="M8 10.5h8" />
            <path d="m9.5 14 2 2 4-4" />
          </svg>
        );
      case 'departure':
        return (
          <svg {...commonProps}>
            <path d="M10 6H6.5A2.5 2.5 0 0 0 4 8.5v7A2.5 2.5 0 0 0 6.5 18H10" />
            <path d="M13 8.5 18 12l-5 3.5" />
            <path d="M18 12H9" />
          </svg>
        );
      case 'free-time':
      case 'break':
        return (
          <svg {...commonProps}>
            <path d="M7 4h8" />
            <path d="M8 4v5" />
            <path d="M14 4v5" />
            <path d="M6 9h10l-1 10H7L6 9Z" />
            <path d="M18 10a2 2 0 0 1 0 4h-1" />
          </svg>
        );
      case 'discussion':
        return (
          <svg {...commonProps}>
            <path d="M7 8.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
            <path d="M17 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
            <path d="M2.5 19a4.5 4.5 0 0 1 9 0" />
            <path d="M12.5 19a4.5 4.5 0 0 1 9 0" />
          </svg>
        );
      case 'rest':
        return (
          <svg {...commonProps}>
            <path d="M18 14.5A6.5 6.5 0 0 1 10.2 5a6.5 6.5 0 1 0 7.8 9.5Z" />
          </svg>
        );
      default:
        return (
          <svg {...commonProps}>
            <circle cx="12" cy="12" r="8.5" />
            <path d="M12 8v4l2.5 2.5" />
          </svg>
        );
    }
  };

  useEffect(() => {
    if (!autoFocusId) return;
    itemRefs.current[autoFocusId]?.scrollIntoView({
      block: 'center',
      behavior: 'smooth',
    });
  }, [autoFocusId, activeDay]);

  const events = useMemo(() => getEventsByDay(activeDay), [activeDay]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-2 rounded-3xl border border-white/10 bg-white/6 p-1">
        {(['friday', 'saturday', 'sunday'] as DayKey[]).map((day) => {
          const isActive = activeDay === day;
          return (
            <button
              key={day}
              type="button"
              onClick={() => setActiveDay(day)}
              className={`rounded-[20px] px-3 py-3 text-sm font-medium transition ${
                isActive ? 'bg-[color:var(--color-brand)] text-white' : 'text-slate-400'
              }`}
            >
              {scheduleDays[day]}
            </button>
          );
        })}
      </div>

      <div className="space-y-3">
        {events.map((event) => {
          const isCurrent = currentEvent?.id === event.id;
          const isExpanded = expandedId === event.id;
          const timeRange = `${formatTime(event.start)} - ${formatTime(event.end)}`;

          return (
            <button
              key={event.id}
              ref={(element) => {
                itemRefs.current[event.id] = element;
              }}
              type="button"
              onClick={() => setExpandedId(isExpanded ? null : event.id)}
              className="w-full text-left"
            >
              <Card
                className={`relative overflow-hidden transition duration-300 ${
                  isCurrent
                    ? 'border-[color:var(--color-brand-border)] bg-[linear-gradient(145deg,rgba(73,58,171,0.2),rgba(73,58,171,0.06)_40%,rgba(255,255,255,0.04))]'
                    : ''
                }`}
              >
                <div className="absolute bottom-5 left-4 top-5 w-px bg-white/10" />
                <div className="relative pl-9">
                  <div className="absolute left-[10px] top-5 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[color:var(--color-brand-text)] shadow-[0_0_0_5px_rgba(73,58,171,0.1)]" />
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-start gap-3">
                      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[color:var(--color-brand-border)] bg-[rgba(73,58,171,0.18)] shadow-[0_0_0_1px_rgba(123,107,216,0.08),0_10px_28px_rgba(73,58,171,0.16)]">
                        <CategoryIcon category={event.category} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold leading-6 text-white">{event.title}</h3>
                        <p className="mt-2 text-sm font-medium text-slate-300">{timeRange}</p>
                        {event.location ? <p className="mt-1 text-sm text-slate-500">{event.location}</p> : null}
                      </div>
                    </div>
                    {isCurrent ? (
                      <span className="rounded-full bg-[color:var(--color-brand-soft)] px-2 py-1 text-xs font-medium text-[color:var(--color-brand-text)]">
                        Now
                      </span>
                    ) : null}
                  </div>
                  {isExpanded ? (
                    <div className="mt-4 space-y-2 rounded-2xl bg-black/20 p-4 text-sm text-slate-300">
                      {event.speaker ? <p><span className="text-slate-500">Speaker:</span> {event.speaker}</p> : null}
                      {event.notes ? <p><span className="text-slate-500">Notes:</span> {event.notes}</p> : null}
                    </div>
                  ) : null}
                </div>
              </Card>
            </button>
          );
        })}
      </div>
    </div>
  );
};
