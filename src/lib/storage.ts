const packingKey = 'camp-hub-packing-checklist';

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
