import type { TabId } from '../types';

const tabs: { id: TabId; label: string; icon: string }[] = [
  { id: 'home', label: 'Home', icon: '◉' },
  { id: 'schedule', label: 'Schedule', icon: '◎' },
  { id: 'playlist', label: 'Playlist', icon: '♫' },
  { id: 'pre-camp', label: 'Pre-Camp', icon: '✦' },
  { id: 'more', label: 'More', icon: '☰' },
];

interface BottomNavProps {
  activeTab: TabId;
  onChange: (tab: TabId) => void;
}

export const BottomNav = ({ activeTab, onChange }: BottomNavProps) => (
  <nav className="sticky bottom-0 z-30 border-t border-white/10 bg-slate-950/85 px-3 pb-[calc(env(safe-area-inset-bottom)+0.8rem)] pt-3 backdrop-blur-2xl">
    <div className="mx-auto grid max-w-md grid-cols-5 gap-2">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`flex min-h-16 flex-col items-center justify-center gap-1 rounded-2xl px-2 text-center transition duration-200 ${
              isActive
                ? 'bg-[color:var(--color-brand)] text-white shadow-[0_12px_28px_rgba(73,58,171,0.32)]'
                : 'text-slate-400 hover:bg-white/6 hover:text-white'
            }`}
          >
            <span className="text-base leading-none">{tab.icon}</span>
            <span className="text-[11px] font-medium">{tab.label}</span>
          </button>
        );
      })}
    </div>
  </nav>
);
