export interface SongsPayload {
  contents: SongInfo[];
  totalCount: number;
  offset: number;
  limit: number;
}

export interface SongInfo {
  id: string;
  song_id: string;
  name: string;
  artist: string;
  illustrator: string;
  bpm: number;
  dispbpm: string;
  easy: number;
  normal: number;
  hard: number;
  createdAt: string;
  updatedAt: string;
}
