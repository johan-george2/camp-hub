import { campDates, schedule } from '../lib/content';
import type { DayKey, ScheduleEvent } from '../types';

// TODO: If the schedule later comes from Google Sheets, keep the helpers below unchanged.
// Route the remote CSV rows through a parser that returns the same ScheduleEvent shape,
// then this service and the existing UI can continue working without page-level changes.
export const getEventsByDay = (day: DayKey) =>
  schedule.filter((event) => event.day === day);

export const getCampDayFromDate = (date = new Date()): DayKey => {
  const localDate = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Australia/Sydney',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);

  if (localDate === campDates.friday) return 'friday';
  if (localDate === campDates.sunday) return 'sunday';
  return 'saturday';
};

export const getCurrentEvent = (date = new Date()): ScheduleEvent | null => {
  return (
    schedule.find((event) => {
      const start = new Date(event.start).getTime();
      const end = new Date(event.end).getTime();
      const now = date.getTime();
      return now >= start && now < end;
    }) ?? null
  );
};

export const getNextEvent = (date = new Date()): ScheduleEvent | null => {
  return (
    schedule.find((event) => {
      const start = new Date(event.start).getTime();
      return start > date.getTime();
    }) ?? null
  );
};

export const getCurrentOrClosestEventId = (day: DayKey, date = new Date()) => {
  const events = getEventsByDay(day);
  const current = events.find((event) => {
    const start = new Date(event.start).getTime();
    const end = new Date(event.end).getTime();
    return date.getTime() >= start && date.getTime() < end;
  });

  if (current) {
    return current.id;
  }

  const next = events.find((event) => new Date(event.start).getTime() > date.getTime());
  return next?.id ?? events.at(-1)?.id ?? null;
};
