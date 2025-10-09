# GitHub Copilot 使用ガイド

このドキュメントは、音札ポータルリポジトリにおける GitHub Copilot の使用方法とベストプラクティスをまとめたものです。

## 概要

GitHub Copilot は AI を活用したコーディングアシスタントです。このプロジェクトで Copilot を効果的に活用するためのガイドラインを以下に示します。

## プロジェクト固有の設定

### 技術スタック

- **フレームワーク**: Nuxt v4 (Vue 3)
- **言語**: TypeScript
- **UI ライブラリ**: @nuxt/ui
- **スタイリング**: SCSS
- **Node.js**: v22
- **パッケージマネージャー**: npm v10

### コーディングスタイル

このプロジェクトでは ESLint を使用しており、以下のスタイル規則に従ってください：

- **カンマ**: 末尾カンマなし (`@stylistic/comma-dangle: ['error', 'never']`)
- **1行あたりの文の数**: 最大4つ (`@stylistic/max-statements-per-line: ['error', { max: 4 }]`)
- **インデント**: 2スペース
- **Vue コンポーネント**: `<script setup>` 構文を使用

### ファイル構造

```
/components     - 再利用可能な Vue コンポーネント
/pages          - ページコンポーネント（ファイルベースルーティング）
/types          - TypeScript 型定義
/server         - サーバーサイドコード
/assets         - スタイルシート、画像などの静的アセット
/public         - 公開する静的ファイル
```

## Copilot のベストプラクティス

### 1. 型定義の活用

Copilot は TypeScript の型情報を理解します。型定義ファイル（`/types`）に定義されたインターフェースを活用してください。

**例：楽曲データを扱う場合**

```typescript
import type { SongInfo } from '~/types/songs'

// Copilot は SongInfo の型情報から適切なプロパティを提案します
const song: SongInfo = {
  // ここで Copilot が補完を提案
}
```

### 2. Vue コンポーネントのパターン

このプロジェクトでは `<script setup>` 構文を使用しています。

**プロンプト例：**
- "Create a Vue component with script setup that displays song information"
- "Vue コンポーネントで楽曲情報を表示するカードを作成"

**期待される出力：**

```vue
<script lang="ts" setup>
import type { SongInfo } from '~/types/songs'

const props = defineProps<{
  song: SongInfo
}>()
</script>

<template>
  <div class="song-card">
    <h3>{{ props.song.name }}</h3>
    <p>{{ props.song.artist }}</p>
  </div>
</template>
```

### 3. Nuxt の機能を活用

Copilot に Nuxt 固有の機能を使用することを明示してください。

**プロンプト例：**
- "Use NuxtLink for navigation"
- "NuxtPicture コンポーネントを使って画像を表示"
- "useRuntimeConfig でAPI設定を取得"

### 4. API との連携

このプロジェクトは microCMS などの外部 API と連携しています。

**プロンプト例：**
- "Fetch data from API using useFetch"
- "useFetch を使って楽曲一覧を取得"

**期待される出力：**

```typescript
const config = useRuntimeConfig()
const { data: songs } = await useFetch<SongsPayload>(
  `${config.public.apiBase}/songs`,
  {
    headers: {
      'X-MICROCMS-API-KEY': config.public.apiToken
    }
  }
)
```

### 5. スタイリングの規則

- クラス名は BEM 記法または適切な命名規則に従う
- グローバルスタイルは `/assets` に配置
- コンポーネント固有のスタイルは `<style scoped>` を使用

## Copilot の設定

### VS Code での設定

1. **Copilot の有効化/無効化**
   - コマンドパレット (Ctrl+Shift+P / Cmd+Shift+P) を開く
   - "GitHub Copilot: Enable" または "GitHub Copilot: Disable" を選択

2. **特定の言語で無効化**
   - VS Code の設定を開く
   - `github.copilot.enable` で検索
   - 言語ごとに設定を調整

3. **インライン提案の受け入れ**
   - Tab キー: 提案を受け入れる
   - Esc キー: 提案を拒否
   - Alt + ] / Option + ]: 次の提案を表示
   - Alt + [ / Option + [: 前の提案を表示

### プロジェクト固有の設定

`.vscode/settings.json` に Copilot 関連の設定を追加できます：

```json
{
  "editor.tabSize": 2,
  "github.copilot.enable": {
    "*": true,
    "yaml": false,
    "plaintext": false
  }
}
```

## 効果的なプロンプトの書き方

### 良いプロンプトの例

✅ **具体的で文脈のあるコメント**
```typescript
// 楽曲一覧を難易度でフィルタリングし、BPMの昇順でソートする関数
function filterAndSortSongs(songs: SongInfo[], difficulty: string): SongInfo[] {
  // Copilot がフィルタリングとソートのロジックを提案
}
```

✅ **型情報を含む**
```typescript
// SongInfo 配列から特定の artist の楽曲だけを抽出
const filterByArtist = (songs: SongInfo[], artist: string) => {
  // Copilot が型安全なフィルタリングを提案
}
```

### 避けるべきプロンプトの例

❌ **曖昧すぎる**
```typescript
// データ処理
function process() {
  // 何を処理するのか不明確
}
```

❌ **文脈が不足**
```typescript
// フィルター
const filter = () => {
  // 何をフィルターするのか、型情報もない
}
```

## Copilot Chat の活用

### コマンド例

- `/explain`: コードの説明を求める
- `/fix`: バグ修正の提案を求める
- `/tests`: テストコードの生成
- `/doc`: ドキュメント生成

### このプロジェクトでの使用例

```
Q: このコンポーネントの使い方を説明してください
A: （Copilot がコンポーネントの使い方を説明）

Q: SongInfo 型に新しいプロパティを追加したい
A: （Copilot が型定義の拡張方法を提案）

Q: この関数のユニットテストを書いて
A: （Copilot がテストコードを生成）
```

## トラブルシューティング

### 提案が表示されない場合

1. Copilot が有効になっているか確認
2. インターネット接続を確認
3. GitHub アカウントでログインしているか確認
4. VS Code を再起動

### 不適切な提案が表示される場合

1. より具体的なコメントを書く
2. 型情報を明示的に記述する
3. プロジェクトのコーディング規則に合わせてコメントを調整
4. 提案を拒否して、別の提案を確認

## 参考リンク

- [GitHub Copilot 公式ドキュメント](https://docs.github.com/ja/copilot)
- [Copilot のベストプラクティス](https://gh.io/copilot-coding-agent-tips)
- [Nuxt 3 公式ドキュメント](https://nuxt.com/)
- [Vue 3 公式ドキュメント](https://ja.vuejs.org/)

## 注意事項

- **セキュリティ**: API キーやパスワードなどの機密情報を含むコードを Copilot に提案させないでください
- **ライセンス**: Copilot が生成したコードも、このプロジェクトのライセンスに従います
- **レビュー**: Copilot の提案は必ずレビューし、プロジェクトの要件に合っているか確認してください
- **テスト**: 生成されたコードは適切にテストを行ってください

---

このガイドは随時更新されます。質問や改善提案がある場合は、Issue を作成してください。
