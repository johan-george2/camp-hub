import campJson from '../content/camp.json';
import contactsJson from '../content/contacts.json';
import playlistJson from '../content/playlist.json';
import preCampJson from '../content/pre-camp.json';
import prayerWallJson from '../content/prayer-wall.json';
import scheduleJson from '../content/schedule.json';
import type {
  CampContent,
  Contact,
  DayKey,
  PackingItem,
  PrayerRequest,
  ScheduleEvent,
} from '../types';

const SCHEDULE_TIMEZONE_OFFSET = '+10:00';

type ScheduleJsonEvent = {
  id: string;
  day: string;
  date: string;
  startTime: string;
  endTime: string;
  title: string;
  location: string;
  description: string;
  speaker?: string;
  category: string;
};

export const camp: CampContent = {
  name: campJson.name,
  locationName: campJson.locationName,
  theme: campJson.theme,
  themeSubtitle: campJson.themeSubtitle,
  themeScripture: campJson.themeVerseText,
  themeScriptureReference: campJson.themeVerseReference,
  start: campJson.start,
  end: campJson.end,
  address: campJson.address,
  addressLines: campJson.addressLines,
  mapsLink: campJson.mapsLink,
};

export const preCamp = preCampJson as {
  countdownDate: string;
  packingChecklist: PackingItem[];
  arrivalInformation: string;
  departureInformation: string;
  campAddressTitle: string;
  campAddressLines: string[];
  campAddress: string;
};

export const contacts = contactsJson as Contact[];

export const playlist = playlistJson as {
  spotifyTitle: string;
  spotifyEmbedUrl: string;
  spotifyOpenUrl: string;
  songsAndMeaning: Array<{
    id: string;
    title: string;
    artist: string;
    meaning: string;
  }>;
};

export const prayerWall = prayerWallJson as {
  sampleRequests: PrayerRequest[];
};

export const scheduleDays = Object.fromEntries(
  scheduleJson.days.map((day) => [day.key, day.label]),
) as Record<DayKey, string>;

export const campDates = Object.fromEntries(
  scheduleJson.days.map((day) => [day.key, day.date]),
) as Record<DayKey, string>;

export const schedule: ScheduleEvent[] = (scheduleJson.events as ScheduleJsonEvent[]).map((event) => ({
  id: event.id,
  day: event.day as DayKey,
  title: event.title,
  start: `${event.date}T${event.startTime}:00${SCHEDULE_TIMEZONE_OFFSET}`,
  end: `${event.date}T${event.endTime}:00${SCHEDULE_TIMEZONE_OFFSET}`,
  location: event.location,
  notes: event.description || undefined,
  speaker: event.speaker,
  category: event.category as ScheduleEvent['category'],
}));
