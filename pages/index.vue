<script lang="ts" setup>
import type { TopicInfo, TopicPayload } from '~/types/topics'
import type { NewsArticle, NewsPayload } from '~/types/news'

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

const latestNews = computed<NewsArticle[]>(() => {
  return newsData.data.value ? newsData.data.value.contents.slice(0, 5) : []
})
</script>

<template>
  <div>
    <Head>
      <Title>{{ title }}</Title>
    </Head>

    <HeadingTitle>トピックス</HeadingTitle>

    <swiper-container
      class="topics"
      :space-between="20"
      :centered-slides="true"
      navigation="true"
    >
      <swiper-slide
        v-for="topic in topics"
        :key="`topic-${topic.id}`"
      >
        <NuxtLink
          :to="topic.link"
          class="topic"
        >
          <LazyNuxtPicture
            :src="`${topic.image.replace('https://pbs.twimg.com', 'twimg')}?format=jpg&name=large`"
            :width="1280"
            :alt="topic.alt"
          />
        </NuxtLink>
      </swiper-slide>
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
    </swiper-container>

    <HeadingTitle>最新のお知らせ</HeadingTitle>

    <swiper-container
      class="latest-news"
      :space-between="20"
      pagination="true"
    >
      <swiper-slide
        v-for="news in latestNews"
        :key="`latest-news-${news.id}`"
      >
        <NewsLink :article="news" />
      </swiper-slide>
    </swiper-container>

    <div class="menu">
      <UButton
        icon="i-heroicons-newspaper"
        size="lg"
        color="primary"
        variant="outline"
        label="すべてのお知らせを見る"
        to="/news"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.heading {
  margin: 1rem 0;
  justify-content: center;
}

.topics {
  --swiper-theme-color: #ffffff;

  .topic {
    height: 100%;
    display: flex;
    justify-content: center;
  }
}

.latest-news {
  --swiper-pagination-color: #202020;
  margin-bottom: 1rem;
}

.menu {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 2rem;
}
</style>
