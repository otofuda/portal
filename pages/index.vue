<script lang="ts" setup>
import type { TopicInfo, TopicPayload } from '~/types/topics'
import type { NewsArticle, NewsPayload } from '~/types/news'

const title = ref('トップ')

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

useSeoMeta({
  title: '音札ポータル',
  ogTitle: '音札ポータル',
  description: '音札ポータルは、アーケード版「音札」やスマホ・PCで遊べる「音札Étude」の最新情報をお届けするポータルサイトです。',
  ogDescription: '音札ポータルは、アーケード版「音札」やスマホ・PCで遊べる「音札Étude」の最新情報をお届けするポータルサイトです。',
  ogImage: '/thumb.png',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <div>
    <Head>
      <Title>{{ title }}</Title>
    </Head>

    <!-- トピックス -->
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
    </swiper-container>

    <!-- お知らせ -->
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

    <!-- 動画 -->
    <HeadingTitle>「音札」紹介動画</HeadingTitle>
    <iframe
      class="video"
      src="https://www.youtube-nocookie.com/embed/94LRZjHgpM0?si=476AppZZNFs0jQPY&amp;controls=0"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    />

    <HeadingTitle>「音札Étude」紹介動画</HeadingTitle>
    <iframe
      class="video"
      src="https://www.youtube-nocookie.com/embed/nQ7wnzQEDpM?si=_AQUAGihH8h7sCQl&amp;controls=0"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    />

    <!-- バナー -->
    <HeadingTitle>コンテンツ</HeadingTitle>
    <div class="banners">
      <NuxtLink to="comics">
        <NuxtImg src="/banners/banner_comic.png" alt="おとふだびより" />
      </NuxtLink>
    </div>

    <!-- 共有ボタン -->
    <ShareButtons :text="title" />
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

.video {
  width: 100%;
  aspect-ratio: 16 / 9;
  margin-bottom: 2rem;
  border-radius: 1rem;
  box-shadow: 0 0.25rem 0.5rem 0 rgba($text, 0.125);
}

.banners {
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  margin-bottom: 2rem;

  a {
    border-radius: 0.5rem;
    box-shadow: 0 0.25rem 0.5rem 0 rgba($border, 0.5);

    img {
      border-radius: 0.5rem;
      width: 100%;
    }
  }
}

.share {
  margin-bottom: 2rem;
}

@media (max-width: $spwidth) {
  .video {
    border-radius: 0;
    box-shadow: none;
  }
}
</style>
