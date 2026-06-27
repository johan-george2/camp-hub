import { useEffect, useRef, useState } from 'react';
import { camp } from '../../lib/content';
import { Card } from '../Card';
import { SectionHeader } from '../SectionHeader';
import { formatDateTime, formatEventCountdown, formatEventDateTime, formatTime } from '../../lib/time';
import { getCurrentEvent, getNextEvent } from '../../services/scheduleService';

interface HomePageProps {
  now: Date;
}

export const HomePage = ({ now }: HomePageProps) => {
  const [logoMissing, setLogoMissing] = useState(false);
  const [themeTapCount, setThemeTapCount] = useState(0);
  const [showEasterEggOverlay, setShowEasterEggOverlay] = useState(false);
  const [themeCardMotion, setThemeCardMotion] = useState<'idle' | 'pressed' | 'celebrate'>('idle');
  const tapResetTimeoutRef = useRef<number | null>(null);
  const overlayTimeoutRef = useRef<number | null>(null);
  const themeMotionTimeoutRef = useRef<number | null>(null);
  const overlayRevealTimeoutRef = useRef<number | null>(null);
  const campStart = new Date(camp.start);
  const isBeforeCamp = now.getTime() < campStart.getTime();
  const currentEvent = getCurrentEvent(now);
  const nextEvent = getNextEvent(now);
  const campStartCountdown = formatEventCountdown(campStart, now);
  const nextEventCountdown = nextEvent ? formatEventCountdown(new Date(nextEvent.start), now) : null;

  const renderCountdownText = (prefix: 'Starts in' | 'Ends in', countdown: string | null) => {
    if (!countdown) return null;
    if (countdown === 'tomorrow') {
      return prefix === 'Starts in' ? 'Starts tomorrow' : 'Ends tomorrow';
    }
    if (countdown === 'Started') {
      return prefix === 'Starts in' ? 'Started' : 'Ends now';
    }
    return `${prefix} ${countdown}`;
  };

  const Icon = ({ type }: { type: 'calendar' | 'clock' | 'pin' }) => {
    const commonProps = {
      className: 'h-[18px] w-[18px] text-[color:var(--color-brand-text)]',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 1.8,
      strokeLinecap: 'round' as const,
      strokeLinejoin: 'round' as const,
      viewBox: '0 0 24 24',
      'aria-hidden': true,
    };

    if (type === 'calendar') {
      return (
        <svg {...commonProps}>
          <path d="M8 2v4" />
          <path d="M16 2v4" />
          <rect x="3" y="5" width="18" height="16" rx="3" />
          <path d="M3 10h18" />
        </svg>
      );
    }

    if (type === 'clock') {
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7.5v5l3 2" />
        </svg>
      );
    }

    return (
      <svg {...commonProps}>
        <path d="M12 20s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z" />
        <circle cx="12" cy="10" r="2.3" />
      </svg>
    );
  };

  const DetailTile = ({
    label,
    value,
    icon,
  }: {
    label: string;
    value: string;
    icon: 'calendar' | 'clock' | 'pin';
  }) => (
    <div className="rounded-2xl border border-white/8 bg-white/[0.045] px-4 py-3">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-[color:var(--color-brand-soft)]">
          <Icon type={icon} />
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-slate-500">{label}</p>
          <p className="mt-1.5 text-[1rem] font-medium leading-6 text-white">{value}</p>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    return () => {
      if (tapResetTimeoutRef.current) {
        window.clearTimeout(tapResetTimeoutRef.current);
      }
      if (overlayTimeoutRef.current) {
        window.clearTimeout(overlayTimeoutRef.current);
      }
      if (themeMotionTimeoutRef.current) {
        window.clearTimeout(themeMotionTimeoutRef.current);
      }
      if (overlayRevealTimeoutRef.current) {
        window.clearTimeout(overlayRevealTimeoutRef.current);
      }
    };
  }, []);

  const dismissEasterEggOverlay = () => {
    setShowEasterEggOverlay(false);

    if (overlayTimeoutRef.current) {
      window.clearTimeout(overlayTimeoutRef.current);
      overlayTimeoutRef.current = null;
    }
  };

  const handleThemeCardTap = () => {
    if (tapResetTimeoutRef.current) {
      window.clearTimeout(tapResetTimeoutRef.current);
    }
    if (themeMotionTimeoutRef.current) {
      window.clearTimeout(themeMotionTimeoutRef.current);
    }
    if (overlayRevealTimeoutRef.current) {
      window.clearTimeout(overlayRevealTimeoutRef.current);
    }

    const nextCount = themeTapCount + 1;

    if (nextCount >= 7) {
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate?.(80);
      }

      setThemeTapCount(0);
      setThemeCardMotion('celebrate');

      themeMotionTimeoutRef.current = window.setTimeout(() => {
        setThemeCardMotion('idle');
      }, 220);

      overlayRevealTimeoutRef.current = window.setTimeout(() => {
        setShowEasterEggOverlay(true);

        if (overlayTimeoutRef.current) {
          window.clearTimeout(overlayTimeoutRef.current);
        }

        overlayTimeoutRef.current = window.setTimeout(() => {
          setShowEasterEggOverlay(false);
        }, 3000);
      }, 180);

      return;
    }

    setThemeCardMotion('pressed');
    setThemeTapCount(nextCount);
    themeMotionTimeoutRef.current = window.setTimeout(() => {
      setThemeCardMotion('idle');
    }, 180);
    tapResetTimeoutRef.current = window.setTimeout(() => {
      setThemeTapCount(0);
    }, 2000);
  };

  return (
    <div className="space-y-5">
      {!logoMissing ? (
        <div className="flex justify-center py-2">
          <img
            src="/logo.png"
            alt={`${camp.name} logo banner`}
            onError={() => setLogoMissing(true)}
            className="w-[90%] max-w-[620px] object-contain"
          />
        </div>
      ) : null}

      <Card
        className={`relative overflow-hidden border-[color:var(--color-brand-border)] bg-[radial-gradient(circle_at_top_left,rgba(140,121,255,0.28),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,173,71,0.12),transparent_28%),linear-gradient(145deg,rgba(73,58,171,0.42),rgba(28,20,63,0.94)_58%,rgba(6,8,16,0.98))] px-6 py-6 transition-[transform,box-shadow] duration-200 ease-out ${
          themeCardMotion === 'pressed'
            ? 'scale-[0.98] shadow-[0_28px_68px_rgba(0,0,0,0.42),0_0_28px_rgba(123,107,216,0.12)]'
            : themeCardMotion === 'celebrate'
              ? 'theme-card-pulse shadow-[0_30px_74px_rgba(0,0,0,0.42),0_0_34px_rgba(123,107,216,0.16)]'
              : 'scale-100 shadow-[0_20px_60px_rgba(0,0,0,0.35)]'
        }`}
      >
        <div className="pointer-events-none absolute -right-10 top-4 h-24 w-24 rounded-full border border-white/8 bg-white/4 blur-sm" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-20 w-20 bg-[radial-gradient(circle,rgba(255,255,255,0.12),transparent_65%)]" />
        <button
          type="button"
          onClick={handleThemeCardTap}
          className="relative block w-full rounded-[1.7rem] text-left outline-none active:scale-[0.995]"
          aria-label="Camp theme verse"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-white/10 text-sm text-amber-100 shadow-[0_0_24px_rgba(255,202,120,0.16)]">
                ♛
              </span>
            </div>
            <div className="space-y-3">
              <p className="max-w-[31ch] text-[1.02rem] leading-7 text-slate-100">{camp.themeScripture}</p>
              <p className="pt-1 text-sm font-medium tracking-[0.04em] text-[color:var(--color-brand-text)]">
                {camp.themeScriptureReference}
              </p>
            </div>
          </div>
        </button>
      </Card>

      <SectionHeader eyebrow="Now" title="What’s happening now" />

      <Card className="bg-[linear-gradient(145deg,rgba(73,58,171,0.14),rgba(73,58,171,0.04)_38%,rgba(255,255,255,0.04))]">
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-[color:var(--color-brand-text)]">Happening Now</p>
            <span className="rounded-full border border-[color:var(--color-brand-border)] bg-[color:var(--color-brand-soft)] px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[color:var(--color-brand-text)]">
              {isBeforeCamp ? 'Pre-Camp' : currentEvent ? 'Live' : 'Between'}
            </span>
          </div>

          {isBeforeCamp ? (
            <div className="space-y-3">
              <h3 className="text-[1.55rem] font-semibold leading-tight text-white">
                Patiently waiting for camp to start
              </h3>
              <div className="space-y-2.5">
                <DetailTile
                  label="Starts In"
                  value={renderCountdownText('Starts in', campStartCountdown) ?? ''}
                  icon="calendar"
                />
                <DetailTile
                  label="First Check-In"
                  value={formatEventDateTime(camp.start)}
                  icon="clock"
                />
                <DetailTile
                  label="Location"
                  value={camp.locationName}
                  icon="pin"
                />
              </div>
            </div>
          ) : currentEvent ? (
            <div className="space-y-3">
              <h3 className="text-[1.55rem] font-semibold leading-tight text-white">{currentEvent.title}</h3>
              <div className="space-y-2.5">
                <DetailTile
                  label="Time"
                  value={`${formatTime(currentEvent.start)} - ${formatTime(currentEvent.end)}`}
                  icon="clock"
                />
                <DetailTile
                  label="Location"
                  value={currentEvent.location}
                  icon="pin"
                />
                <DetailTile
                  label="Ends In"
                  value={renderCountdownText('Ends in', formatEventCountdown(new Date(currentEvent.end), now)) ?? ''}
                  icon="calendar"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <h3 className="text-[1.55rem] font-semibold leading-tight text-white">
                A quiet pocket before the next moment
              </h3>
              <p className="text-sm leading-6 text-slate-300">Check the schedule and be ready for what’s next.</p>
            </div>
          )}
        </div>
      </Card>

      <Card>
        <div className="space-y-4">
          <p className="text-sm font-medium text-slate-400">Up Next</p>

          {nextEvent ? (
            <div className="space-y-3">
              <h3 className="text-[1.35rem] font-semibold leading-tight text-white">{nextEvent.title}</h3>
              <div className="space-y-2.5">
                <DetailTile
                  label="Time"
                  value={formatDateTime(nextEvent.start)}
                  icon="clock"
                />
                <DetailTile
                  label="Location"
                  value={nextEvent.location}
                  icon="pin"
                />
                <DetailTile
                  label="Starts In"
                  value={renderCountdownText('Starts in', nextEventCountdown) ?? ''}
                  icon="calendar"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <h3 className="text-[1.35rem] font-semibold leading-tight text-white">That was the last event</h3>
              <p className="text-sm leading-6 text-slate-300">Rest well and hold onto the weekend.</p>
            </div>
          )}
        </div>
      </Card>

      <div
        className={`fixed inset-0 z-50 flex items-center justify-center px-6 transition duration-300 ${
          showEasterEggOverlay ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={!showEasterEggOverlay}
        aria-live="polite"
        onClick={dismissEasterEggOverlay}
      >
        <div className="absolute inset-0 bg-slate-950/54 backdrop-blur-sm" />
        <div
          className={`relative w-full max-w-sm rounded-[2rem] border border-[color:var(--color-brand-border)] bg-[radial-gradient(circle_at_top,rgba(160,147,255,0.18),transparent_42%),linear-gradient(160deg,rgba(18,20,34,0.96),rgba(9,11,20,0.98))] px-6 py-7 text-center shadow-[0_26px_80px_rgba(0,0,0,0.42),0_0_42px_rgba(123,107,216,0.2)] transition duration-300 ${
            showEasterEggOverlay ? 'scale-100 translate-y-0' : 'scale-95 translate-y-3'
          }`}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-brand-text)]/70 to-transparent" />
          <p className="text-[1.5rem] font-semibold tracking-[-0.02em] text-white">
            ❤️ Jesus loves you ❤️
          </p>
        </div>
      </div>
    </div>
  );
};
