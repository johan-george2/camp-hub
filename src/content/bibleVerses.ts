import { camp } from './camp';
import type { BibleVerse } from '../types';

// Keep the theme verse and daily verse list together here.
// Add or remove daily verses freely. The verse-of-the-day service rotates through this list.
export const themeVerse: BibleVerse = {
  id: 'theme-verse',
  reference: camp.themeVerse,
  text: 'Rooted and built up in him, strengthened in the faith as you were taught, and overflowing with thankfulness.',
  reflection: 'A reminder that camp is about growing deeper in Christ before being sent out again.',
};

export const verseOfTheDayList: BibleVerse[] = [
  themeVerse,
  {
    id: 'verse-2',
    reference: 'Isaiah 40:31',
    text: 'But those who hope in the Lord will renew their strength. They will soar on wings like eagles.',
    reflection: 'Perfect for a camp weekend that calls people to fresh trust and renewed endurance.',
  },
  {
    id: 'verse-3',
    reference: 'Psalm 119:105',
    text: 'Your word is a lamp for my feet, a light on my path.',
    reflection: 'Helps frame the weekend around guidance, clarity, and listening to God.',
  },
  {
    id: 'verse-4',
    reference: 'Ephesians 3:20',
    text: 'Now to him who is able to do immeasurably more than all we ask or imagine, according to his power that is at work within us.',
    reflection: 'Encourages faith for what God can do in people during camp and beyond it.',
  },
  {
    id: 'verse-5',
    reference: 'Romans 12:12',
    text: 'Be joyful in hope, patient in affliction, faithful in prayer.',
    reflection: 'A strong anchor for prayer, patience, and hope throughout the weekend.',
  },
];
