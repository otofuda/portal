export interface SongInfo {
  id: string;
  song_id: string;
  name: string;
  artist: string;
  illustrator: string;
  comment?: string;
  copyright?: string;
  bpm: number;
  dispbpm: string;
  color: string;

  easy: number;
  normal: number;
  hard: number;

  easy_nd: string;
  normal_nd: string;
  hard_nd: string;

  easy_notes: number;
  normal_notes: number;
  hard_notes: number;

  easy_video?: string;
  normal_video?: string;
  hard_video?: string;

  for_ac?: boolean;
  for_mb?: boolean;

  createdAt: string;
  updatedAt: string;
  jacket: {
    url: string;
    height: number;
    width: number;
  };

  youtube_music?: string;
  youtube_chart?: string;
}

export interface SongsPayload {
  contents: SongInfo[];
  totalCount: number;
  offset: number;
  limit: number;
}

/** 楽曲一覧のソート条件 */
export type SongSort =
  {
    type: 'default' | 'name' | 'artist' | 'bpm';
    label: string;
  } |
  {
    type: 'level';
    label: string;
    difficulty: 'e' | 'n' | 'h';
    color: string;
  } |
  {
    type: 'notes';
    label: string;
    difficulty: 'e' | 'n' | 'h';
    color: string;
  };
