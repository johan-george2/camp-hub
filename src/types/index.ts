export type TabId =
  | 'home'
  | 'schedule'
  | 'playlist'
  | 'pre-camp'
  | 'more';

export type DayKey = 'friday' | 'saturday' | 'sunday';

export interface ScheduleEvent {
  id: string;
  day: DayKey;
  title: string;
  start: string;
  end: string;
  location: string;
  notes?: string;
  speaker?: string;
  category: 'session' | 'meal' | 'free-time' | 'arrival' | 'departure' | 'worship';
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  timestamp: string;
  pinned?: boolean;
}

export interface Contact {
  id: string;
  name: string;
  role: string;
  phone?: string;
  address?: string;
  notes?: string;
}

export interface PlaylistLink {
  id: string;
  title: string;
  description: string;
  href: string;
}

export interface PlaylistEmbed {
  title: string;
  embedUrl: string;
  openUrl: string;
}

export interface PlaylistSongMeaning {
  id: string;
  title: string;
  artist: string;
  meaning: string;
}

export interface PackingItem {
  id: string;
  label: string;
  category: string;
}

export interface BibleVerse {
  id: string;
  reference: string;
  text: string;
  reflection?: string;
}

export interface PrayerRequest {
  id: string;
  message: string;
  createdAt: string;
  prayedCount: number;
}

export interface CampContent {
  name: string;
  theme: string;
  themeVerse: string;
  start: string;
  end: string;
  arrivalInfo: string;
  departureInfo: string;
  address: string;
  mapsLink: string;
  reminders: string;
}

export interface PrayerWallContent {
  introTitle: string;
  introSubtitle: string;
  formPlaceholder: string;
  submitLabel: string;
  prayedLabel: string;
  sampleRequests: PrayerRequest[];
}
