import { useEffect, useMemo, useRef, useState } from 'react';
import { scheduleDays } from '../../content/schedule';
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
      <SectionHeader
        eyebrow="Schedule"
        title="Weekend timeline"
        subtitle="The current item highlights itself and the list follows along."
      />

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
                <div className="absolute bottom-4 left-4 top-4 w-px bg-white/10" />
                <div className="relative pl-7">
                  <div className="absolute left-0 top-1 h-3 w-3 rounded-full bg-[color:var(--color-brand-text)] shadow-[0_0_0_6px_rgba(73,58,171,0.12)]" />
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{event.category.replace('-', ' ')}</p>
                      <h3 className="mt-1 text-lg font-semibold text-white">{event.title}</h3>
                    </div>
                    {isCurrent ? (
                      <span className="rounded-full bg-[color:var(--color-brand-soft)] px-2 py-1 text-xs font-medium text-[color:var(--color-brand-text)]">
                        Now
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-3 text-sm text-slate-300">
                    {formatTime(event.start)} - {formatTime(event.end)} · {event.location}
                  </p>
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
