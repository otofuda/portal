export interface NewsPayload {
  contents: NewsArticle[];
  totalCount: number;
  offset: number;
  limit: number;
}

export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
