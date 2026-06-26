import {
  playlistSongMeanings,
  playlists,
  spotifyEmbed,
  worshipPlaylistTitle,
} from '../../content/playlist';
import { Card } from '../Card';
import { SectionHeader } from '../SectionHeader';

export const PlaylistPage = () => (
  <div className="space-y-5">
    <Card className="overflow-hidden bg-[linear-gradient(145deg,rgba(73,58,171,0.28),rgba(73,58,171,0.08)_45%,rgba(255,255,255,0.04))]">
      <div className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-[color:var(--color-brand-text)]">Soundtrack</p>
        <h2 className="max-w-xs text-3xl font-semibold tracking-tight text-white">
          Keep camp in your ears before, during, and after the weekend.
        </h2>
        <p className="max-w-sm text-sm leading-6 text-slate-300">
          The main playlist stays front and center, with quick access to Spotify and a little context for why each song belongs.
        </p>
      </div>
    </Card>

    <SectionHeader eyebrow="Spotify" title="Featured playlist" />

    <Card className="overflow-hidden p-0">
      <div className="border-b border-white/10 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-slate-400">Embedded playlist</p>
            <h3 className="mt-1 text-xl font-semibold text-white">{spotifyEmbed.title}</h3>
          </div>
          <a
            href={spotifyEmbed.openUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-[color:var(--color-brand)] px-4 text-sm font-semibold text-white transition hover:bg-[color:var(--color-brand-strong)]"
          >
            Open Spotify
          </a>
        </div>
      </div>
      <iframe
        title={spotifyEmbed.title}
        src={spotifyEmbed.embedUrl}
        loading="lazy"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        className="h-[392px] w-full bg-slate-950"
      />
    </Card>

    <div className="space-y-4">
      {playlists.map((playlist) => (
        <Card key={playlist.id} className="overflow-hidden">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-slate-300">
                {playlist.title === worshipPlaylistTitle ? 'Worship focus' : 'Curated for camp'}
              </p>
              <h3 className="mt-1 text-2xl font-semibold text-white">{playlist.title}</h3>
            </div>
            <p className="text-sm leading-6 text-slate-300">{playlist.description}</p>
            <a
              href={playlist.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-14 w-full items-center justify-center rounded-2xl bg-white/8 px-4 text-base font-semibold text-white transition hover:bg-white/12"
            >
              Open in Spotify
            </a>
          </div>
        </Card>
      ))}
    </div>

    <SectionHeader eyebrow="Songs & Meaning" title="Why these songs fit camp" />

    <div className="space-y-3">
      {playlistSongMeanings.map((song) => (
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
