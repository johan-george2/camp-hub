import { verseOfTheDayList } from '../content/bibleVerses';
import type { BibleVerse } from '../types';

const REFERENCE_DATE = new Date('2026-01-01T00:00:00+10:00');

export const getLocalVerseOfTheDay = (date = new Date()): BibleVerse => {
  const diffDays = Math.floor(
    (date.getTime() - REFERENCE_DATE.getTime()) / (1000 * 60 * 60 * 24),
  );

  const index =
    ((diffDays % verseOfTheDayList.length) + verseOfTheDayList.length) %
    verseOfTheDayList.length;
  return verseOfTheDayList[index];
};

export const getVerseOfTheDay = async (): Promise<BibleVerse> => {
  // Replace this with an external API later without changing UI consumers.
  return getLocalVerseOfTheDay();
};
