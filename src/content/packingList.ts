import type { PackingItem } from '../types';

// Update the checklist items and pre-camp packing notes here.
// These strings feed the Pre-Camp page directly.
export const packingList: PackingItem[] = [
  { id: 'bible', label: 'Bible', category: 'Essentials' },
  { id: 'notebook', label: 'Notebook and pen', category: 'Essentials' },
  { id: 'jacket', label: 'Warm jacket or hoodie', category: 'Clothing' },
  { id: 'torch', label: 'Torch or phone torch', category: 'Gear' },
  { id: 'water-bottle', label: 'Refillable water bottle', category: 'Gear' },
  { id: 'toiletries', label: 'Toiletries', category: 'Essentials' },
  { id: 'medication', label: 'Personal medication', category: 'Health' },
  { id: 'sports', label: 'Sports clothes and shoes', category: 'Clothing' },
];

export const whatToBring =
  'Bedding, Bible, toiletries, warm clothes, medications, a refillable bottle, and activewear for team activities.';

export const whatNotToBring =
  'Alcohol, vaping devices, portable speakers, or anything unsafe or disruptive in shared cabins.';
