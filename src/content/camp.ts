import { getGoogleMapsSearchLink } from '../lib/maps';
import type { CampContent } from '../types';

// Update this file when core camp details change.
// Non-technical organisers can safely edit the text values below.
// Keep the date/time values in ISO format so countdowns and schedule logic keep working.
const address = '125 Wattle Ridge Road, Colo Heights NSW 2756';

export const camp: CampContent = {
  name: 'Sydney Local Camp 2026',
  theme: 'Rooted and Sent',
  themeVerse: 'Colossians 2:7',
  start: '2026-06-26T16:00:00+10:00',
  end: '2026-06-28T13:30:00+10:00',
  arrivalInfo:
    'Friday from 4:00 PM at Main Lodge. Check in, collect your welcome pack, and head to your cabin before dinner.',
  departureInfo:
    'Sunday at 1:00 PM from the main car park. Please return cabin keys and complete your cabin tidy-up first.',
  address,
  mapsLink: getGoogleMapsSearchLink(address),
  reminders:
    'Label your bags, arrive in time for dinner, let leaders know about medical needs, and bring clothes for cool mornings and evenings.',
};
