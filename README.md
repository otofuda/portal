# Otofuda Portal

- Nuxt v4
- Node.js v22
- npm v10

![Otofuda Portal](public/thumb.png)

## Dev server

`.env` ファイルを作成し、以下の環境変数を設定

```.env
NUXT_PUBLIC_API_BASE=
NUXT_PUBLIC_API_TOKEN=
```

下記コマンドで開発サーバーを起動

```sh
npm install
npm run dev
```

## SSG

静的サイト生成

```sh
npm run generate
npx serve .output/public
```
