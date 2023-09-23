<script lang="ts" setup>
import { TopicInfo, TopicPayload } from '~/types/topics'
import { NewsArticle, NewsPayload } from '~/types/news'

const title = ref('TOP')

const runtimeConfig = useRuntimeConfig()

const topicsData = await useAsyncData<TopicPayload>('topics', () => {
  return $fetch(`${runtimeConfig.public.apiBase}api/v1/topics`, {
    params: { limit: 1000 },
    headers: { 'X-MICROCMS-API-KEY': runtimeConfig.public.apiToken }
  })
})

const topics = computed<TopicInfo[]>(() => {
  return topicsData.data.value ? topicsData.data.value.contents : []
})

const newsData = await useAsyncData<NewsPayload>('news', () => {
  return $fetch(`${runtimeConfig.public.apiBase}api/v1/news`, {
    params: { limit: 1000, filters: 'for_portal[equals]true' },
    headers: { 'X-MICROCMS-API-KEY': runtimeConfig.public.apiToken }
  })
})

const latestNews = computed<NewsArticle | null>(() => {
  return newsData.data.value ? newsData.data.value.contents.at(0) || null : null
})
</script>

<template>
  <div>
    <Head>
      <Title>{{ title }}</Title>
    </Head>

    <HeadingTitle>トピックス</HeadingTitle>

    <div class="topics">
      <NuxtLink
        v-for="topic in topics"
        :key="`topic-${topic.id}`"
        :to="topic.link"
        class="topic"
      >
        <img
          :src="`${topic.image}?format=jpg&name=large`"
          :alt="topic.alt"
        >
      </NuxtLink>
    </div>

    <HeadingTitle>最新のお知らせ</HeadingTitle>

    <NewsLink
      v-if="latestNews"
      :article="latestNews"
      class="article"
    />
  </div>
</template>

<style lang="scss" scoped>
.topics {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;

  .topic {
    margin: 1rem;
    scroll-snap-align: center;

    img {
      min-width: 300px;
      width: 300px;
    }
  }
}
</style>
