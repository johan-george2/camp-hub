import type { Announcement } from '../types';

// Add important notices here.
// Set `pinned: true` for anything that should stay above the rest of the feed.
// Use ISO timestamps so the app can keep everything in time order.
export const announcements: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Welcome Pack Pickup',
    body: 'Welcome packs are available at Main Lodge from 4:00 PM. Please pick yours up before dinner.',
    timestamp: '2026-06-26T15:30:00+10:00',
    pinned: true,
  },
  {
    id: 'ann-2',
    title: 'Bring a Jacket for Devotion',
    body: 'Saturday morning devotion is outdoors at the Lakeside Deck, and it will be chilly before sunrise.',
    timestamp: '2026-06-26T20:45:00+10:00',
    pinned: true,
  },
  {
    id: 'ann-3',
    title: 'Workshop Selection Reminder',
    body: 'Please choose your breakout workshop by 10:30 AM on Saturday using the sign-up board near Summit Hall.',
    timestamp: '2026-06-27T08:10:00+10:00',
  },
  {
    id: 'ann-4',
    title: 'Prayer Team Available',
    body: 'A prayer team will be available after Main Session 2 near the front left side of Summit Hall.',
    timestamp: '2026-06-27T17:10:00+10:00',
  },
  {
    id: 'ann-5',
    title: 'Cabin Key Return',
    body: 'Before departure on Sunday, return cabin keys to the Main Lodge desk to avoid delays.',
    timestamp: '2026-06-28T10:20:00+10:00',
  },
];
