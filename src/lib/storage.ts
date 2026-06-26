import { prayerWallContent } from '../content/prayerWall';
import type { PrayerRequest } from '../types';

const prayerWallKey = 'camp-hub-prayer-wall';
const packingKey = 'camp-hub-packing-checklist';

export const loadPrayerRequests = (): PrayerRequest[] => {
  const raw = localStorage.getItem(prayerWallKey);
  if (!raw) {
    return prayerWallContent.sampleRequests;
  }

  try {
    return JSON.parse(raw) as PrayerRequest[];
  } catch {
    return [];
  }
};

export const savePrayerRequests = (requests: PrayerRequest[]) => {
  localStorage.setItem(prayerWallKey, JSON.stringify(requests));
};

export const loadPackingState = (): string[] => {
  const raw = localStorage.getItem(packingKey);
  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw) as string[];
  } catch {
    return [];
  }
};

export const savePackingState = (ids: string[]) => {
  localStorage.setItem(packingKey, JSON.stringify(ids));
};
