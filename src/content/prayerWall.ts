import type { PrayerWallContent } from '../types';

// Add sample prayer requests or adjust the wording for the prayer wall here.
// Live submissions are still stored locally in the browser by the app.
export const prayerWallContent: PrayerWallContent = {
  introTitle: 'Share anonymously',
  introSubtitle: 'Requests stay on this device for now.',
  formPlaceholder: 'Share a prayer request anonymously...',
  submitLabel: 'Post prayer request',
  prayedLabel: "I've prayed for this",
  sampleRequests: [
    {
      id: 'seed-1',
      message: 'Pray that our hearts would be open and ready to receive from God this weekend.',
      createdAt: '2026-06-20T10:00:00+10:00',
      prayedCount: 14,
    },
    {
      id: 'seed-2',
      message: 'Please pray for safe travel for everyone arriving on Friday afternoon.',
      createdAt: '2026-06-24T18:30:00+10:00',
      prayedCount: 9,
    },
  ],
};
