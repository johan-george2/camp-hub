import { useEffect, useRef, useState } from 'react';
import { prayerPrompts } from '../lib/content';
import { Card } from './Card';
import { SectionHeader } from './SectionHeader';

const PromptIcon = ({ icon }: { icon: string }) => {
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

  switch (icon) {
    case 'heart':
      return (
        <svg {...commonProps}>
          <path d="m12 20-1.2-1.1C6.1 14.7 3 11.9 3 8.5A4.5 4.5 0 0 1 7.5 4c1.7 0 3.3.8 4.5 2.1A6 6 0 0 1 16.5 4 4.5 4.5 0 0 1 21 8.5c0 3.4-3.1 6.2-7.8 10.4L12 20Z" />
        </svg>
      );
    case 'travel':
      return (
        <svg {...commonProps}>
          <path d="M5 16h14" />
          <path d="M7 16V9l5-2 5 2v7" />
          <path d="M4 11.5h16" />
          <path d="M8.5 16v-2.5" />
          <path d="M15.5 16v-2.5" />
        </svg>
      );
    case 'microphone':
      return (
        <svg {...commonProps}>
          <path d="M12 14a3.5 3.5 0 0 0 3.5-3.5v-3a3.5 3.5 0 1 0-7 0v3A3.5 3.5 0 0 0 12 14Z" />
          <path d="M6.5 10.5a5.5 5.5 0 0 0 11 0" />
          <path d="M12 16v4" />
          <path d="M9 20h6" />
        </svg>
      );
    case 'worship':
      return (
        <svg {...commonProps}>
          <path d="M7.5 11.5 10 9l1.8 1.8a1.8 1.8 0 0 0 2.5 0L16 9l2.5 2.5" />
          <path d="M6.5 13.5 9 11l2 2a1.7 1.7 0 0 0 2.4 0l2-2 2.1 2.1" />
          <path d="M5 16c1.6 1.8 4 3 7 3s5.4-1.2 7-3" />
        </svg>
      );
    case 'leaders':
      return (
        <svg {...commonProps}>
          <path d="M8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
          <path d="M16 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
          <path d="M3.5 19a4.5 4.5 0 0 1 9 0" />
          <path d="M12.5 18.5a4 4 0 0 1 7 0" />
        </svg>
      );
    case 'community':
      return (
        <svg {...commonProps}>
          <path d="M7 10a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
          <path d="M17 10a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
          <path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
          <path d="M2.5 19a4.5 4.5 0 0 1 7.5-3.2" />
          <path d="M14 15.8A4.5 4.5 0 0 1 21.5 19" />
          <path d="M7.5 19a5 5 0 0 1 9 0" />
        </svg>
      );
    case 'growth':
      return (
        <svg {...commonProps}>
          <path d="M12 20c0-4.8 2.3-8.7 6-10.5" />
          <path d="M12 20c0-5.2-2.1-9.1-6-11" />
          <path d="M12 20v-6" />
          <path d="M8 5.5c.5 2.1 2.1 3.5 4 3.5 0-2.1-.9-4-2.4-5.5A8.5 8.5 0 0 0 8 5.5Z" />
          <path d="M16.5 7c-2 .4-3.6 2-4.1 4 2 .1 4-.7 5.5-2.2A8.3 8.3 0 0 0 16.5 7Z" />
        </svg>
      );
    default:
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 8v4l2.5 2.5" />
        </svg>
      );
  }
};

const PrayerPromptCard = ({
  icon,
  title,
  prompt,
  index,
}: {
  icon: string;
  title: string;
  prompt: string;
  index: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <Card
      className={`border-white/10 bg-[linear-gradient(150deg,rgba(73,58,171,0.1),rgba(255,255,255,0.035)_42%,rgba(8,10,18,0.96))] transition-all duration-700 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      <section ref={cardRef} style={{ transitionDelay: `${index * 60}ms` }} className="space-y-3">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[color:var(--color-brand-border)] bg-[color:var(--color-brand-soft)] shadow-[0_10px_28px_rgba(73,58,171,0.12)]">
            <PromptIcon icon={icon} />
          </div>
          <div className="min-w-0 space-y-1">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-[color:var(--color-brand-text)]">
              Prayer Prompt
            </p>
            <h3 className="text-lg font-semibold leading-6 tracking-tight text-white">{title}</h3>
          </div>
        </div>
        <p className="text-sm leading-7 text-slate-200">{prompt}</p>
      </section>
    </Card>
  );
};

export const PrayerPromptsSection = () => (
  <section className="space-y-4">
    <SectionHeader
      eyebrow="Prayer Prompts"
      title={prayerPrompts.pageTitle}
      subtitle={<span className="leading-6 text-slate-300">{prayerPrompts.subtitle}</span>}
    />
    <div className="space-y-4">
      {prayerPrompts.prompts.map((prompt, index) => (
        <PrayerPromptCard key={prompt.id} index={index} {...prompt} />
      ))}
    </div>
  </section>
);
