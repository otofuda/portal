export interface ComicPayload {
  contents: ComicInfo[];
  totalCount: number;
  offset: number;
  limit: number;
}

export interface ComicInfo {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  image: {
    url: string;
    height: number;
    width: number;
  }
}
