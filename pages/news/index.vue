<script lang="ts" setup>
import { NewsArticle, NewsPayload } from '~/types/news';

const title = ref('お知らせ一覧')
const searchWord = ref('')

const runtimeConfig = useRuntimeConfig()

const { data, pending } = await useAsyncData<NewsPayload>('news', () => {
  return $fetch(`${runtimeConfig.public.apiBase}api/v1/news?limit=1000`, {
    headers: { 'X-MICROCMS-API-KEY': runtimeConfig.public.apiToken }
  })
})

const contents = computed<NewsArticle[]>(() => {
  return data.value ? data.value.contents : [];
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
  <div>
    <Head>
      <Title>{{ title }}</Title>
    </Head>

    <h1>{{ title }}</h1>

    <input type="text" v-model="searchWord" />

    <div v-if="pending">Loading...</div>

    <NuxtLink
      v-for="article in filteredContents"
      :to="`news/${article.id}`"
      class="article"
    >
      <h2>{{ article.title }}</h2>
      {{ article.createdAt }}
    </NuxtLink>
  </div>
</template>
