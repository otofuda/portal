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
  comment?: string;
  bpm: number;
  dispbpm: string;

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
}
