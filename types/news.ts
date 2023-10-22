type NewsTagString = 'お知らせ' | 'ゲーム情報' | 'イベント情報' | 'おとふだNET' | '音札ポータル'

export interface NewsTag {
  label: NewsTagString;
  color: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tags: NewsTagString[];
  /** 記事公開日(なければcreatedAtを使用) */
  date?: string;
  /** サムネイル画像 */
  thumbnail?: {
    url: string;
    height: number;
    width: number;
  };
}

export interface NewsPayload {
  contents: NewsArticle[];
  totalCount: number;
  offset: number;
  limit: number;
}

export const newsTags: Record<NewsTagString, NewsTag> = {
  お知らせ: {
    label: 'お知らせ',
    color: 'sky'
  },
  イベント情報: {
    label: 'イベント情報',
    color: 'green'
  },
  ゲーム情報: {
    label: 'ゲーム情報',
    color: 'sky'
  },
  おとふだNET: {
    label: 'おとふだNET',
    color: 'orange'
  },
  音札ポータル: {
    label: '音札ポータル',
    color: 'teal'
  }
}
