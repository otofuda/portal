<script lang="ts" setup>
import { type NewsArticle, type NewsPayload, type NewsTag, newsTags } from '@/types/news'

const route = useRoute('news-id')
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
    if (!route.params.id) { return null }
    return route.params.id.includes(news.id)
  }) || null
})

const title = ref(content.value?.title)

/** 公開日 */
const dateString = computed<string>(() => {
  const article = content.value
  if (!article) { return '' }
  const date = new Date(article.date || article.createdAt)
  return date.toLocaleDateString('ja')
})

/** お知らせの画像(なければデフォルト画像) */
const newsImage = computed<string>(() => {
  const article = content.value
  return article && article.thumbnail
    ? article.thumbnail.url
    : '/news_default.png'
})

/** お知らせの種類(色とラベル) */
const tags = computed<NewsTag[]>(() => {
  const article = content.value
  const defaultTag: NewsTag = { label: 'お知らせ', color: 'sky' }
  return article && article.tags.length > 0
    ? article.tags.map(tag => newsTags.get(tag) || defaultTag)
    : [defaultTag]
})

useSeoMeta({
  title: title.value,
  ogTitle: title.value,
  description: content.value?.content,
  ogDescription: content.value?.content,
  ogImage: newsImage.value,
  twitterCard: 'summary_large_image'
})
</script>

<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="news">
    <Head>
      <Title>{{ title }}</Title>
      <Meta name="thumbnail" :content="newsImage" />
    </Head>

    <NuxtImg
      v-if="content"
      class="image"
      format="webp"
      width="640"
      :src="newsImage.replace('https://images.microcms-assets.io', 'microcms')"
      :alt="title"
    />

    <h1 class="title">
      {{ title }}
    </h1>

    <div v-if="pending" class="loading">
      Loading...
    </div>

    <template v-else-if="content">
      <div class="detail">
        {{ dateString }}
      </div>

      <div class="tags">
        <UButton
          v-for="tag in tags"
          :key="`newsLink-${content.id}-tag-${tag.label}`"
          :color="tag.color"
          :label="tag.label"
          icon="i-heroicons-tag"
          class="py-1"
          :to="{ path: '/news', query: { tag: tag.label } }"
        >
          {{ tag.label }}
        </UButton>
      </div>

      <ShareButtons :text="content.title" />

      <article
        class="markdown-body article"
        v-html="content.content"
      />

      <ShareButtons :text="content.title" />
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

  :deep(.image) {
    object-fit: contain;

    img { width: 100%; }
  }

  .title {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 1rem;
  }

  .detail {
    margin-bottom: 1rem;
    padding: 0 1rem;
    color: $sub;
  }

  .tags {
    display: flex;
    gap: 0.5rem;
    align-items: flex-start;
    margin-bottom: 1rem;
    padding: 0 1rem;
  }

  .share {
    margin-bottom: 1rem;
  }
}

.article {
  padding: 0 1rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid $border;
  margin-bottom: 2rem;
  font-family: $fonts;

  :deep(p) {
    line-height: 2;
  }

  :deep(a) {
    color: $primary;
  }

  :deep(img) {
    border-radius: 0.5rem;
  }

  :deep(h2) {
    font-weight: bold;
    font-size: 1.5rem;
    margin: 1.5rem 0;
  }

  :deep(h3) {
    font-weight: bold;
    font-size: 1.25rem;
    margin: 1.5rem 0;
  }

  :deep(ul) {
    list-style: disc inside;
    line-height: 2;
    margin-left: 0.5rem;
    margin-bottom: 1.5rem;
  }
}

.article-menu {
  display: flex;
  justify-content: center;
  padding: 1rem;
}
</style>
