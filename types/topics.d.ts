export interface TopicPayload {
  contents: TopicInfo[];
  totalCount: number;
  offset: number;
  limit: number;
}

export interface TopicInfo {
  id: string;
  createdAt: string;
  updatedAt: string;
  image: string;
  alt: string;
  link?: string;
}