import { useEffect, useState } from 'react';
import { camp } from './content/camp';
import { BottomNav } from './components/BottomNav';
import { HomePage } from './components/pages/HomePage';
import { MorePage } from './components/pages/MorePage';
import { PreCampPage } from './components/pages/PreCampPage';
import { PlaylistPage } from './components/pages/PlaylistPage';
import { SchedulePage } from './components/pages/SchedulePage';
import { useNow } from './hooks/useNow';
import { getVerseOfTheDay } from './services/verseService';
import type { BibleVerse, TabId } from './types';

const pageTitles: Record<TabId, string> = {
  home: camp.name,
  schedule: 'Schedule',
  playlist: 'Playlist',
  'pre-camp': 'Pre-Camp',
  more: 'More',
};

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [verse, setVerse] = useState<BibleVerse | null>(null);
  const now = useNow(30000);

  useEffect(() => {
    getVerseOfTheDay().then(setVerse);
  }, []);

  useEffect(() => {
    document.title = `${camp.name} Camp Hub`;
  }, []);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(73,58,171,0.26),_transparent_24%),radial-gradient(circle_at_80%_0%,_rgba(56,189,248,0.10),_transparent_22%),linear-gradient(180deg,_#0b0d15_0%,_#070912_56%,_#05060c_100%)] text-white">
      <div className="mx-auto flex min-h-screen max-w-md flex-col">
        <header className="px-5 pb-4 pt-[calc(env(safe-area-inset-top)+1.2rem)]">
          <div className="rounded-[28px] border border-white/10 bg-white/6 px-5 py-4 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.24em] text-white/45">Camp Hub</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white">{pageTitles[activeTab]}</h1>
            <div className="mt-3 text-sm text-slate-400">
              {new Intl.DateTimeFormat('en-AU', {
                weekday: 'long',
                day: 'numeric',
                month: 'short',
              }).format(now)}
            </div>
          </div>
        </header>

        <main className="flex-1 px-5 pb-6">
          {activeTab === 'home' ? <HomePage now={now} verse={verse} /> : null}
          {activeTab === 'schedule' ? <SchedulePage now={now} /> : null}
          {activeTab === 'playlist' ? <PlaylistPage /> : null}
          {activeTab === 'pre-camp' ? <PreCampPage now={now} /> : null}
          {activeTab === 'more' ? <MorePage /> : null}
        </main>

        <BottomNav activeTab={activeTab} onChange={setActiveTab} />
      </div>
    </div>
  );
}

export default App;
