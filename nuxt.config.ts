export default defineNuxtConfig({
  app: {
    // ページ遷移時のアニメーション
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    }
  },
  vite: {
    css: {
      preprocessorOptions: {
        // 色変数のscss
        scss: {
          additionalData: '@use "@/assets/_colors.scss" as *;'
        }
      }
    }
  }
})
