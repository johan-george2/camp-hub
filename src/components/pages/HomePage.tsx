import { announcements } from '../../content/announcements';
import { LogoBadge } from '../LogoBadge';
import { Card } from '../Card';
import { CountdownPill } from '../CountdownPill';
import { SectionHeader } from '../SectionHeader';
import { formatDateTime, formatTime } from '../../lib/time';
import { getCurrentEvent, getNextEvent } from '../../services/scheduleService';
import type { BibleVerse } from '../../types';

interface HomePageProps {
  now: Date;
  verse: BibleVerse | null;
}

export const HomePage = ({ now, verse }: HomePageProps) => {
  const currentEvent = getCurrentEvent(now);
  const nextEvent = getNextEvent(now);
  const latestAnnouncement = [...announcements].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  )[0];

  return (
    <div className="space-y-5">
      <div className="pt-1">
        <LogoBadge />
      </div>

      <Card className="overflow-hidden bg-[linear-gradient(145deg,rgba(73,58,171,0.22),rgba(56,189,248,0.08)_48%,rgba(255,255,255,0.04))]">
        <div className="space-y-3">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-[color:var(--color-brand-text)]">Verse Of The Day</p>
          <p className="text-lg leading-8 text-white">{verse?.text}</p>
          <p className="text-sm text-slate-300">{verse?.reference}</p>
          {verse?.reflection ? <p className="text-sm leading-6 text-slate-400">{verse.reflection}</p> : null}
        </div>
      </Card>

      <SectionHeader
        eyebrow="Now"
        title="Right now at camp"
        subtitle="Quick glance updates so campers always know where to be."
      />

      <Card className="bg-[linear-gradient(145deg,rgba(73,58,171,0.18),rgba(73,58,171,0.05)_40%,rgba(255,255,255,0.04))]">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm text-[color:var(--color-brand-text)]">Happening Now</p>
              <h3 className="mt-1 text-2xl font-semibold text-white">
                {currentEvent ? currentEvent.title : 'No event at the moment'}
              </h3>
            </div>
            {currentEvent ? <CountdownPill targetIso={currentEvent.end} prefix="Ends in" now={now} /> : null}
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm text-slate-200">
            <div className="rounded-2xl bg-black/20 p-3">
              <p className="text-slate-400">Time</p>
              <p className="mt-1 font-medium">
                {currentEvent ? `${formatTime(currentEvent.start)} - ${formatTime(currentEvent.end)}` : 'Check schedule'}
              </p>
            </div>
            <div className="rounded-2xl bg-black/20 p-3">
              <p className="text-slate-400">Location</p>
              <p className="mt-1 font-medium">{currentEvent?.location ?? 'Stay tuned'}</p>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm text-slate-400">Up Next</p>
              <h3 className="mt-1 text-xl font-semibold text-white">{nextEvent?.title ?? 'That was the last event'}</h3>
            </div>
            {nextEvent ? <CountdownPill targetIso={nextEvent.start} prefix="Starts in" now={now} /> : null}
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-white/6 px-4 py-3 text-sm">
            <div>
              <p className="font-medium text-white">{nextEvent?.location ?? 'See you next camp'}</p>
              <p className="text-slate-400">{nextEvent ? formatDateTime(nextEvent.start) : 'No further events scheduled'}</p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="border-[color:var(--color-brand-border)]">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <SectionHeader eyebrow="Latest" title="Announcement" />
            {latestAnnouncement?.pinned ? (
              <span className="rounded-full bg-amber-300/15 px-2 py-1 text-xs font-medium text-amber-200">Pinned</span>
            ) : null}
          </div>
          <h3 className="text-lg font-semibold text-white">{latestAnnouncement.title}</h3>
          <p className="text-sm leading-6 text-slate-300">{latestAnnouncement.body}</p>
          <p className="text-xs text-slate-500">{formatDateTime(latestAnnouncement.timestamp)}</p>
        </div>
      </Card>
    </div>
  );
};
