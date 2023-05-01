<script lang="ts" setup>
import { NewsArticle, NewsPayload } from '@/types/news'

const route = useRoute()
const runtimeConfig = useRuntimeConfig()

const { data, pending } = await useAsyncData<NewsPayload>('news', () => {
  return $fetch(`${runtimeConfig.public.apiBase}api/v1/news?limit=1000`, {
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

    <h1>{{ title }}</h1>

    <div v-if="pending">
      Loading...
    </div>

    <article
      v-else-if="content"
      class=""
      v-html="content.content"
    />

    <div v-else>
      Not Found
    </div>
  </div>
</template>
