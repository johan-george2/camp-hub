import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className = '' }: CardProps) => (
  <section
    className={`rounded-[28px] border border-white/10 bg-[color:var(--color-surface)] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl ${className}`}
  >
    {children}
  </section>
);
