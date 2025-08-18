<script lang="ts" setup>
import type { NuxtError } from '#app'
import '@/assets/normalize.css'

const props = defineProps({
  error: Object as () => NuxtError
})
</script>

<template>
  <UApp>
    <TheBackground />
    <NuxtLayout>
      <NuxtLoadingIndicator color="#52a9ff" />
      <div class="error">
        <h1>{{ props.error?.statusCode }}</h1>
        <p>{{ props.error?.message }}</p>
        <UButton
          to="/"
          variant="outline"
          class="my-8"
        >
          トップページへ戻る
        </UButton>
      </div>
    </NuxtLayout>
  </UApp>
</template>

<style lang="scss">
@use "@/assets/_vars.scss" as vars;

body {
  font-family: vars.$fonts;
  line-height: 1.5;
}

.error {
  padding: 0 1rem;
  text-align: center;
}
</style>
