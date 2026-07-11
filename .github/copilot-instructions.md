## プロジェクト概要

音札ポータル - アーケード版「音札」とスマホ・PC版「音札Étude」の情報ポータルサイト

## 技術スタック

- **フレームワーク**: Nuxt v4 (Vue 3)
- **言語**: TypeScript
- **UI ライブラリ**: @nuxt/ui
- **スタイリング**: SCSS
- **Node.js**: v24
- **パッケージマネージャー**: npm v11

## コーディング規則

### TypeScript

- すべての新しいコードは TypeScript で記述する
- 型定義は `/types` ディレクトリに配置する
- `any` 型の使用を避け、適切な型を定義する
- インターフェースや型のインポートには `import type` を使用する

### Vue コンポーネント

- `<script setup>` 構文を使用する
- props は `defineProps<T>()` でジェネリック型を指定する
- composables と utilities の使用を優先する
- コンポーネント名は PascalCase で記述する

### Nuxt 固有のパターン

- ページコンポーネントは `/app/pages` ディレクトリに配置する
- 自動インポートを活用する（composables, components, utils）
- `useRuntimeConfig()` で環境変数にアクセスする
- 画像には `<NuxtPicture>` または `<NuxtImg>` を使用する
- ナビゲーションには `<NuxtLink>` を使用する

### API 連携

- microCMS API との連携には `useFetch` を使用する
- API キーは `useRuntimeConfig().public.apiToken` から取得する
- API ベース URL は `useRuntimeConfig().public.apiBase` から取得する
- レスポンスの型は `/app/types` ディレクトリで定義する

### スタイリング

- クラス名は適切な命名規則に従う
- グローバルスタイルは `/app/assets` ディレクトリに配置する
- コンポーネント固有のスタイルは `<style scoped>` を使用する
- Nuxt UI のコンポーネントとユーティリティクラスを優先的に使用する

## ファイル構造

- `/app/components` - 再利用可能な Vue コンポーネント
- `/app/pages` - ページコンポーネント（ファイルベースルーティング）
- `/app/types` - TypeScript 型定義
- `/server` - サーバーサイドコード
- `/app/assets` - スタイルシート、画像などの静的アセット
- `/public` - 公開する静的ファイル

## コード生成時の注意点

- コメントは日本語で記述する
- エラーハンドリングを適切に実装する
- アクセシビリティを考慮したコードを生成する
- パフォーマンスを意識した実装を行う
- セキュリティ上のリスク（XSS、CSRF など）に注意する
- API キーやシークレットをハードコードしない

## 使用する型の例

プロジェクトで使用される主要な型：

- `SongInfo` - 楽曲情報
- `SongsPayload` - 楽曲一覧のレスポンス
- `NewsInfo` - ニュース情報
- `ComicInfo` - コミック情報

これらの型は `/app/types` ディレクトリで定義されており、コード生成時に参照すること。
