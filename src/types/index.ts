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

export interface Contact {
  id: string;
  name: string;
  role: string;
  phone?: string;
  address?: string;
  notes?: string;
}

export interface PackingItem {
  id: string;
  label: string;
  category: string;
}

export interface PrayerRequest {
  id: string;
  message: string;
  createdAt: string;
  prayedCount: number;
}

export interface CampContent {
  name: string;
  locationName: string;
  theme: string;
  themeSubtitle: string;
  themeScripture: string;
  themeScriptureReference: string;
  start: string;
  end: string;
  address: string;
  addressLines: string[];
  mapsLink: string;
}
