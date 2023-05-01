<script lang="ts" setup>
import { NewsArticle } from '~/types/news'

const props = defineProps<{
  article: NewsArticle;
}>()

const dateString = computed<string>(() => {
  const date = new Date(props.article.createdAt)
  return date.toLocaleDateString('ja')
})
</script>

<template>
  <NuxtLink :to="`news/${props.article.id}`" class="news-link">
    <strong class="title">{{ props.article.title }}</strong>
    <div class="date">
      {{ dateString }}
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.news-link {
  color: $primary;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  padding: 1rem;

  .title {
    font-size: 1.25rem;
  }

  .date {
    color: $sub;
  }
}
</style>
