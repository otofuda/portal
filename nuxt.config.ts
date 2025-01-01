export default defineNuxtConfig({
  app: {
    // ページ遷移時のアニメーション
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    },
    // <head> の内容
    head: {
      titleTemplate: '%s | 音札ポータル',
      meta: [
        { name: 'description', content: '音札ポータルは、アーケード版「音札」やスマホ・PCで遊べる「音札Étude」の最新情報をお届けするポータルサイトです。' },
        { name: 'thumbnail', content: '/thumb.png' },
        { property: 'twitter:card', content: 'summary_large_image' },
        { property: 'twitter:site', content: '@otofuda' }
      ],
      link: [
        { rel: 'icon', href: '/maskable_icon_x512.png', type: 'image/png' },
        { rel: 'apple-touch-icon', href: '/maskable_icon_x512.png' },
        { rel: 'manifest', href: '/manifest.webmanifest' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Zen+Kaku+Gothic+Antique:wght@400;700&display=swap' }
      ]
    }
  },

  experimental: {
    typedPages: true,
    sharedPrerenderData: true
  },

  vue: {
    compilerOptions: {}
  },

  // 使用するモジュール
  modules: [
    // ['@nuxtjs/eslint-module', { lintOnStart: false }],
    ['@nuxt/ui', {
      icons: ['fa6-brands']
    }],
    ['@nuxt/image', {
      provider: process.env.VERCEL_ENV ? 'vercel' : undefined,
      quality: 100,
      format: ['webp', 'png'],
      domains: ['images.microcms-assets.io', 'pbs.twimg.com'],
      alias: {
        microcms: 'https://images.microcms-assets.io',
        twimg: 'https://pbs.twimg.com'
      }
    }],
    ['@nuxtjs/seo', {}]
  ],

  // Nuxt SEO 関連
  site: {
    url: 'otofuda.com',
    name: '音札ポータル',
    description: '音札ポータルは、アーケード版「音札」やスマホ・PCで遊べる「音札Étude」の最新情報をお届けするポータルサイトです。'
  },
  ogImage: { enabled: false },
  linkChecker: { enabled: false },

  devServer: { port: 8080 },

  // 環境変数
  runtimeConfig: {
    public: {
      apiBase: '',
      apiToken: ''
    }
  },

  colorMode: {
    preference: 'light'
  },

  vite: {
    css: {
      preprocessorOptions: {
        // 色変数のscss
        scss: {
          // additionalData: '@use "@/assets/_vars.scss" as vars;'
        }
      }
    }
  },

  compatibilityDate: '2024-07-19'
})
