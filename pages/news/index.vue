<script lang="ts" setup>
import { NewsArticle, NewsPayload } from '~/types/news'

const title = ref('お知らせ一覧')
const searchWord = ref('')

const runtimeConfig = useRuntimeConfig()

const { data, pending } = await useAsyncData<NewsPayload>('news', () => {
  return $fetch(`${runtimeConfig.public.apiBase}api/v1/news`, {
    params: { limit: 1000, filters: 'for_portal[equals]true' },
    headers: { 'X-MICROCMS-API-KEY': runtimeConfig.public.apiToken }
  })
})

const contents = computed<NewsArticle[]>(() => {
  return data.value ? data.value.contents : []
})

const filteredContents = computed<NewsArticle[]>(() => {
  if (contents.value === null) { return [] }
  if (searchWord.value === '') { return contents.value }
  return contents.value.filter((article) => {
    return article.title.includes(searchWord.value)
  })
})
</script>

<template>
  <div class="news">
    <Head>
      <Title>{{ title }}</Title>
    </Head>

    <HeadingTitle>{{ title }}</HeadingTitle>

    <div class="news-search">
      <UInput
        v-model="searchWord"
        icon="i-heroicons-magnifying-glass-20-solid"
        size="lg"
        color="primary"
        trailing
      />
    </div>

    <div class="news-list">
      <div v-if="pending">
        Loading...
      </div>

      <NewsLink
        v-for="article in filteredContents"
        :key="`news-${article.id}`"
        :article="article"
        class="article"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.news-search {
  margin: 1.5rem 0;
  padding: 0 1rem;
}

.news-list {
  display: flex;
  flex-direction: column;
}
</style>
