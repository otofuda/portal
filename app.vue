<script lang="ts" setup>
import '@/assets/normalize.css'
onMounted(() => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', { scope: '/' })
  }
})
</script>

<template>
  <div>
    <TheBackground />
    <NuxtLayout>
      <NuxtLoadingIndicator color="#52a9ff" />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style lang="scss">
body {
  font-family: $fonts;
  line-height: 1.5;
}

.page-enter-active,
.page-leave-active {
  position: relative;
  left: 0;
  transition: all 0.25s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  left: -1rem;
}
</style>
