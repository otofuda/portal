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

    <ClientOnly>
      <Teleport to="#hero">
        <TheHero />
      </Teleport>
    </ClientOnly>

    <!-- トピックス -->
    <HeadingTitle>トピックス</HeadingTitle>

    <div
      class="slider topics"
      :space-between="20"
      :centered-slides="true"
      :navigation="true"
    >
      <div
        v-for="topic in topics"
        :key="`topic-${topic.id}`"
        class="topic"
      >
        <NuxtLink
          :to="topic.link"
        >
          <NuxtPicture
            :src="`${topic.image.replace('https://pbs.twimg.com', 'twimg')}?format=jpg&name=large`"
            :width="1280"
            sizes="sm:1000px 500px"
            :alt="topic.alt"
          />
        </NuxtLink>
      </div>
    </div>

    <!-- お知らせ -->
    <HeadingTitle>最新のお知らせ</HeadingTitle>

    <div
      class="slider latest-news"
      :space-between="20"
      :pagination="true"
    >
      <div
        v-for="news in latestNews"
        :key="`latest-news-${news.id}`"
      >
        <NewsLink :article="news" />
      </div>
    </div>

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
        <NuxtImg
          src="/banners/banner_comic.png"
          alt="おとふだびより"
          sizes="sm:1280px 500px"
        />
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

.slider {
  display: flex;
  flex-flow: row nowrap;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  align-items: center;
  scrollbar-width: thin;
  scrollbar-color: rgb(var(--color-primary-500)) transparent;

  &::-webkit-scrollbar {
    height: 0.5rem;
    background-color: rgba(0, 0, 0, 0.05);
  }

  &::-webkit-scrollbar-thumb {
    background: rgb(var(--color-primary-500));
  }
}

.topics {
  margin-bottom: 1rem;

  .topic {
    width: 100%;
    flex: none;
    scroll-snap-align: center;
  }
}

.latest-news {
  margin-bottom: 1rem;

  > div {
    width: 100%;
    flex: none;
    scroll-snap-align: center;
  }
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
