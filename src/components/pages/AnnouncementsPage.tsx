import { announcements } from '../../content/announcements';
import { Card } from '../Card';
import { SectionHeader } from '../SectionHeader';
import { formatDateTime } from '../../lib/time';

const sortedAnnouncements = [...announcements].sort((a, b) => {
  if (a.pinned && !b.pinned) return -1;
  if (!a.pinned && b.pinned) return 1;
  return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
});

export const AnnouncementsPage = () => (
  <div className="space-y-5">
    <SectionHeader
      eyebrow="Feed"
      title="Camp updates"
      subtitle="Pinned updates stay at the top, everything else follows in time order."
    />

    <div className="space-y-3">
      {sortedAnnouncements.map((announcement) => (
        <Card key={announcement.id} className={announcement.pinned ? 'border-amber-300/30 bg-amber-300/6' : ''}>
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-white">{announcement.title}</h3>
              {announcement.pinned ? (
                <span className="rounded-full bg-amber-300/15 px-2 py-1 text-xs font-medium text-amber-200">Pinned</span>
              ) : null}
            </div>
            <p className="text-sm leading-6 text-slate-300">{announcement.body}</p>
            <p className="text-xs text-slate-500">{formatDateTime(announcement.timestamp)}</p>
          </div>
        </Card>
      ))}
    </div>
  </div>
);
