<script lang="ts" setup>
import { NewsArticle } from '~/types/news'

const props = defineProps<{
  article: NewsArticle;
}>()

const viewport = useViewport()

const dateString = computed<string>(() => {
  const date = new Date(props.article.createdAt)
  return date.toLocaleDateString('ja')
})

/** お知らせの画像(なければデフォルト画像) */
const newsImage = computed<string>(() => {
  return '/news_default.png'
})

/** お知らせの種類(色とラベルのタプル) */
const newsType = computed<[string, string]>(() => {
  return ['primary', 'お知らせ']
})
</script>

<template>
  <NuxtLink
    :to="`news/${props.article.id}`"
    class="news-link"
    :class="{
      '--sp': viewport.isLessThan('tablet')
    }"
  >
    <img class="image" :src="newsImage" :alt="props.article.title">
    <strong class="title">{{ props.article.title }}</strong>
    <div class="date">
      <UBadge :color="newsType[0]" :label="newsType[1]" />
      {{ dateString }}
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.news-link {
  color: $primary;
  text-decoration: none;
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr;
  margin: 0 1rem 1rem 1rem;
  border-radius: 1rem;
  overflow: hidden;

  .image {
    grid-row: 1 / 3;
  }

  .title {
    padding: 1rem 1rem 0 1rem;
    font-size: 1.25rem;
  }

  .date {
    padding: 0.5rem 1rem;
    color: $sub;
  }

  &.--sp {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;

    .image {
      grid-row: 1 / 2;
    }
  }
}
</style>
