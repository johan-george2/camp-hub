import type { PlaylistEmbed, PlaylistLink, PlaylistSongMeaning } from '../types';

// Edit this file to swap the Spotify embed, the open links, or the song explanations.
// The embed URL should be the Spotify "embed" link, while `openUrl` should be the normal playlist link.
export const spotifyEmbed: PlaylistEmbed = {
  title: 'Sydney Local Camp 2026 Playlist',
  embedUrl:
    'https://open.spotify.com/embed/playlist/37i9dQZF1DX4WYpdgoIcn6?utm_source=generator&theme=0',
  openUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX4WYpdgoIcn6',
};

export const playlists: PlaylistLink[] = [
  {
    id: 'official',
    title: 'Official Camp Playlist',
    description: 'Road trip energy, late-night hangs, and the songs everybody will know.',
    href: 'https://open.spotify.com/playlist/37i9dQZF1DX4WYpdgoIcn6',
  },
  {
    id: 'worship',
    title: 'Worship Playlist',
    description: 'Setlist-inspired worship tracks for the weekend and after camp.',
    href: 'https://open.spotify.com/playlist/37i9dQZF1DWVpjAJGB70vU',
  },
];

export const worshipPlaylistTitle = 'Worship Playlist';

export const playlistSongMeanings: PlaylistSongMeaning[] = [
  {
    id: 'song-1',
    title: 'Build My Life',
    artist: 'Pat Barrett',
    meaning:
      'A simple prayer to be grounded in Jesus, which connects directly with the camp theme of being rooted.',
  },
  {
    id: 'song-2',
    title: 'Another In The Fire',
    artist: 'Hillsong UNITED',
    meaning: 'Reminds campers that God stays present in pressure, change, and uncertain seasons.',
  },
  {
    id: 'song-3',
    title: 'The Commission',
    artist: 'CAIN',
    meaning: 'Points beyond the camp weekend and toward being sent out with courage and purpose.',
  },
  {
    id: 'song-4',
    title: 'King of Kings',
    artist: 'Hillsong Worship',
    meaning:
      'Centers the playlist on the gospel story and helps the weekend feel worshipful, not just energetic.',
  },
];
