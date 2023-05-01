<script lang="ts" setup>
import { NewsArticle, NewsPayload } from '@/types/news'

const route = useRoute()
const runtimeConfig = useRuntimeConfig()

const { data, pending } = await useAsyncData<NewsPayload>('news', () => {
  return $fetch(`${runtimeConfig.public.apiBase}api/v1/news`, {
    params: { limit: 1000, filters: 'for_portal[equals]true' },
    headers: { 'X-MICROCMS-API-KEY': runtimeConfig.public.apiToken }
  })
})

const content = computed<NewsArticle | null>(() => {
  if (!data.value) { return null }
  return data.value.contents.find((news) => {
    return route.params.id.includes(news.id)
  }) || null
})

const title = ref(content.value?.title)
</script>

<!-- eslint-disable vue/no-v-html -->
<template>
  <div>
    <Head>
      <Title>{{ title }}</Title>
    </Head>

    <HeadingTitle>{{ title }}</HeadingTitle>

    <div v-if="pending">
      Loading...
    </div>

    <article
      v-else-if="content"
      class="markdown-body article"
      v-html="content.content"
    />

    <div v-else>
      Not Found
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@primer/css/markdown/index.scss";

.article {
  padding: 1rem;

  :deep(a) {
    color: $primary;
  }
}
</style>
