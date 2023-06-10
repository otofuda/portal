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
        { name: 'description', content: '「音札」ポータルサイトです' },
        { name: 'robots', content: 'noindex' }
      ]
    }
  },

  // 使用するモジュール
  modules: [
    ['@nuxtjs/eslint-module', { lintOnStart: false }],
    ['@nuxthq/ui', {}],
    ['nuxt-viewport', {}],
    ['@nuxtjs/google-fonts', {
      families: {
        Inter: { wght: [400, 700] },
        'Zen+Kaku+Gothic+Antique': { wght: [400, 700] }
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
