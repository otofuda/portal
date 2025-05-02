import type { ButtonProps } from '#ui/types'

export type NewsTagString = 'お知らせ' | 'ゲーム情報' | '音札Étude' | 'アーケード版' | 'イベント情報' | 'おとふだNET' | '音札ポータル' | 'おとふだびより♪'

export interface NewsTag {
  label: NewsTagString
  color: ButtonProps['color']
}

export interface NewsArticle {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
  tags: NewsTagString[]
  /** 記事公開日(なければcreatedAtを使用) */
  date?: string
  /** サムネイル画像 */
  thumbnail?: {
    url: string
    height: number
    width: number
  }
}

export interface NewsPayload {
  contents: NewsArticle[]
  totalCount: number
  offset: number
  limit: number
}

export const newsTags = new Map<NewsTagString, NewsTag>([
  [
    'ゲーム情報',
    { label: 'ゲーム情報', color: 'rose' },
  ],
  [
    '音札Étude',
    { label: '音札Étude', color: 'emerald' },
  ],
  [
    'アーケード版',
    { label: 'アーケード版', color: 'blue' },
  ],
  [
    'イベント情報',
    { label: 'イベント情報', color: 'orange' },
  ],
  [
    'おとふだNET',
    { label: 'おとふだNET', color: 'neutral' },
  ],
  [
    '音札ポータル',
    { label: '音札ポータル', color: 'lime' },
  ],
  [
    'おとふだびより♪',
    { label: 'おとふだびより♪', color: 'cyan' },
  ],
])
