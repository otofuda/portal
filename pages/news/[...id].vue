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

/** お知らせの画像(なければデフォルト画像) */
const newsImage = computed<string>(() => {
  return '/news_default.png'
})
</script>

<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="news">
    <Head>
      <Title>{{ title }}</Title>
    </Head>

    <img v-if="content" class="image" :src="newsImage" :alt="title">

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

    <div class="article-menu">
      <UButton
        icon="i-heroicons-arrow-left"
        size="lg"
        color="primary"
        variant="outline"
        label="一覧にもどる"
        to="/news"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@primer/css/markdown/index.scss";

.news {
  display: flex;
  flex-direction: column;
}

.image {
  margin-bottom: 1rem;
  max-height: 25vh;
  object-fit: contain;
}

.detail {
  margin-top: 1rem;
  padding: 0 1rem;
  color: $sub;
}

.article {
  padding: 0 1rem;
  font-family: $fonts;

  :deep(p) {
    line-height: 2;
  }

  :deep(a) {
    color: $primary;
  }
}

.article-menu {
  padding: 1rem;
}
</style>
