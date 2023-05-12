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

const dateString = computed<string>(() => {
  const article = content.value
  if (!article) { return '' }
  const date = new Date(article.createdAt)
  return date.toLocaleDateString('ja')
})
</script>

<!-- eslint-disable vue/no-v-html -->
<template>
  <div>
    <Head>
      <Title>{{ title }}</Title>
    </Head>

    <HeadingTitle>{{ title }}</HeadingTitle>

    <div v-if="pending" class="loading">
      Loading...
    </div>

    <template v-else-if="content">
      <div class="detail">
        {{ dateString }}
      </div>

      <article
        class="markdown-body article"
        v-html="content.content"
      />
    </template>

    <div v-else class="detail">
      記事が見つかりません
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@primer/css/markdown/index.scss";

.detail {
  margin-top: 1rem;
  padding: 0 1rem;
  color: $sub;
}

.article {
  padding: 0 1rem;
  font-family: $fonts;

  :deep(a) {
    color: $primary;
  }
}
</style>
