export const formatTime = (iso: string) =>
  new Intl.DateTimeFormat('en-AU', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(iso));

export const formatDateTime = (iso: string) =>
  new Intl.DateTimeFormat('en-AU', {
    weekday: 'short',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(iso));

export const formatEventDateTime = (iso: string) =>
  new Intl.DateTimeFormat('en-AU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(iso));

export const formatRelativeCountdown = (target: Date, now: Date) => {
  const diffMs = target.getTime() - now.getTime();
  if (diffMs <= 0) {
    return 'Started';
  }

  const totalMinutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) {
    return `${minutes}m`;
  }

  return `${hours}h ${minutes}m`;
};

export const formatEventCountdown = (target: Date, now: Date) => {
  const diffMs = target.getTime() - now.getTime();
  if (diffMs <= 0) {
    return 'Started';
  }

  const dayMs = 1000 * 60 * 60 * 24;
  const totalDays = Math.floor(diffMs / dayMs);

  if (totalDays >= 2) {
    return `${totalDays} days`;
  }

  if (totalDays >= 1) {
    return 'tomorrow';
  }

  return formatRelativeCountdown(target, now);
};

export const formatLongDate = (iso: string) =>
  new Intl.DateTimeFormat('en-AU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(iso));
