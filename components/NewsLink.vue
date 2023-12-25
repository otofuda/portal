<script lang="ts" setup>
import { type NewsArticle, type NewsTag, newsTags } from '~/types/news'

const props = defineProps<{
  article: NewsArticle;
}>()

/** 公開日 */
const dateString = computed<string>(() => {
  const article = props.article
  const date = new Date(article.date || article.createdAt)
  return date.toLocaleDateString('ja')
})

/** お知らせの画像(なければデフォルト画像) */
const newsImage = computed<string>(() => {
  const article = props.article
  return article.thumbnail ? article.thumbnail.url : '/news_default.png'
})

/** お知らせの種類(色とラベル) */
const tags = computed<NewsTag[]>(() => {
  return props.article.tags.length > 0
    ? props.article.tags.map(tag => newsTags[tag])
    : [newsTags['お知らせ']]
})
</script>

<template>
  <NuxtLink
    :to="`news/${props.article.id}`"
    class="news-link"
  >
    <NuxtImg
      class="image"
      format="webp"
      :src="newsImage.replace('https://images.microcms-assets.io', 'microcms')"
      :alt="props.article.title"
      :width="500"
    />
    <strong class="title">{{ props.article.title }}</strong>
    <div class="date">
      <UBadge
        v-for="tag in tags"
        :key="`newsLink-${props.article.id}-tag-${tag.label}`"
        :color="tag.color"
        :label="tag.label"
        size="md"
      />
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
  margin: 0 1rem;
  overflow: hidden;
  text-align: left;

  .image {
    grid-row: 1 / 3;
    max-height: 25vh;
    min-width: 100%;
    object-fit: contain;
    align-self: stretch;
    justify-self: center;
  }

  .title {
    padding: 1rem 1rem 0 1rem;
    font-size: 1.25rem;
  }

  .date {
    padding: 0.5rem 1rem 1rem 1rem;
    color: $sub;
  }

  &:hover {
    background-color: $bg-alt;
  }
}

@media (max-width: $spwidth) {
  .news-link {

    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;

    .image {
      grid-row: 1 / 2;
    }
  }
}
</style>
