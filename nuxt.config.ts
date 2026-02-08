import type SimpleParallax from 'simple-parallax-js'

export default defineNuxtConfig({
  // 使用するモジュール
  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxtjs/seo',
    '@nuxt/scripts',
    '@nuxt/eslint',
    '@nuxt/fonts'
  ],

  app: {
    // ページ遷移時のアニメーション
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    },
    // <head> の内容
    head: {
      titleTemplate: '%s | 音札ポータル',
      title: '音札ポータル',
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

  css: ['~/assets/main.css'],

  vue: {
    compilerOptions: {}
  },

  // Nuxt SEO 関連
  site: {
    url: 'otofuda.com',
    name: '音札ポータル',
    description: '音札ポータルは、アーケード版「音札」やスマホ・PCで遊べる「音札Étude」の最新情報をお届けするポータルサイトです。'
  },

  colorMode: {
    preference: 'light'
  },

  ui: {
    // icons: ['fa6-brands'],
    theme: {
      colors: ['primary', 'secondary', 'info', 'success', 'warning', 'error', 'rose', 'emerald', 'blue', 'orange', 'lime', 'cyan', 'purple']
    }
  },

  // 環境変数
  runtimeConfig: {
    public: {
      apiBase: '',
      apiToken: ''
    }
  },

  devServer: { port: 8080 },

  experimental: {
    typedPages: true,
    sharedPrerenderData: true
  },

  compatibilityDate: '2024-07-19',

  vite: {
    css: {
      preprocessorOptions: {
        // 色変数のscss
        scss: {
          // additionalData: '@use "@/assets/_vars.scss" as vars;'
        }
      }
    },
    build: {
      target: 'es2015'
    }
  },

  eslint: {
    config: {
      stylistic: true
    }
  },

  image: {
    provider: process.env.VERCEL_ENV ? 'vercel' : 'ipx',
    quality: 100,
    format: ['webp', 'png'],
    domains: ['images.microcms-assets.io', 'pbs.twimg.com'],
    alias: {
      microcms: 'https://images.microcms-assets.io',
      twimg: 'https://pbs.twimg.com'
    }
  },
  linkChecker: { enabled: false },
  ogImage: { enabled: false }
})

declare global {
  interface Window {
    simpleParallax: typeof SimpleParallax
  }
}
