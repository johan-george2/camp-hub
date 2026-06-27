import { playlist } from '../../lib/content';
import { Card } from '../Card';
import { SectionHeader } from '../SectionHeader';

export const PlaylistPage = () => (
  <div className="space-y-5">
    <SectionHeader eyebrow="Spotify" title="Camp playlist" />

    <Card className="overflow-hidden p-0">
      <div className="border-b border-white/10 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-slate-400">Embedded playlist</p>
            <h3 className="mt-1 text-xl font-semibold text-white">{playlist.spotifyTitle}</h3>
          </div>
          <a
            href={playlist.spotifyOpenUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-[color:var(--color-brand)] px-4 text-sm font-semibold text-white transition hover:bg-[color:var(--color-brand-strong)]"
          >
            Open Spotify
          </a>
        </div>
      </div>
      <div className="overflow-hidden rounded-b-[28px] bg-[#121212] p-2">
        <div className="overflow-hidden rounded-[22px] bg-[#121212] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
          <iframe
            title={playlist.spotifyTitle}
            src={playlist.spotifyEmbedUrl}
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            className="block h-[392px] w-full rounded-[22px] bg-[#121212]"
          />
        </div>
      </div>
    </Card>

    <SectionHeader eyebrow="Songs & Meaning" title="Why these songs belong here" />

    <div className="space-y-3">
      {playlist.songsAndMeaning.map((song) => (
        <Card key={song.id}>
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-white">{song.title}</h3>
                <p className="text-sm text-[color:var(--color-brand-text)]">{song.artist}</p>
              </div>
            </div>
            <p className="text-sm leading-6 text-slate-300">{song.meaning}</p>
          </div>
        </Card>
      ))}
    </div>
  </div>
);
