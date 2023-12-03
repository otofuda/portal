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

  vue: {
    compilerOptions: {}
  },

  // 使用するモジュール
  modules: [
    ['@nuxtjs/eslint-module', { lintOnStart: false }],
    ['@pinia/nuxt', {}],
    ['@nuxt/ui', {
      icons: ['fa6-brands']
    }],
    ['nuxt-swiper', {
      modules: ['navigation', 'pagination']
    }],
    ['@nuxt/image', {
      provider: 'vercel',
      format: ['webp', 'png'],
      domains: ['images.microcms-assets.io', 'pbs.twimg.com'],
      alias: {
        microcms: 'https://images.microcms-assets.io',
        twimg: 'https://pbs.twimg.com'
      }
    }]
  ],

  devServer: { port: 8080 },

  // 環境変数
  runtimeConfig: {
    public: {
      apiBase: '',
      apiToken: ''
    }
  },

  css: ['normalize.css'],

  colorMode: {
    preference: 'light'
  },

  vite: {
    css: {
      preprocessorOptions: {
        // 色変数のscss
        scss: {
          additionalData: '@use "@/assets/_vars.scss" as *;'
        }
      }
    }
  }
})
