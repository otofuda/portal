<script lang="ts" setup>
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

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
    <p class="description">
      音札の最新情報はこちらから！
    </p>

    <Carousel class="slider" :items-to-show="1.2" :wrap-around="true">
      <Slide
        v-for="topic in topics"
        :key="`topic-${topic.id}`"
        class="topic"
      >
        <NuxtLink :to="topic.link" target="_blank">
          <NuxtPicture
            format="webp"
            :src="`${topic.image.replace('https://pbs.twimg.com', 'twimg')}?format=jpg&name=large`"
            sizes="500"
            :alt="topic.alt"
          />
        </NuxtLink>
      </Slide>
      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>

    <!-- お知らせ -->
    <HeadingTitle>最新のお知らせ</HeadingTitle>
    <p class="description">
      音札ポータルに掲載しているお知らせです
    </p>

    <Carousel class="slider">
      <Slide
        v-for="news in latestNews"
        :key="`latest-news-${news.id}`"
      >
        <NewsLink :article="news" />
      </Slide>
      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>

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
    <p class="description">
      アーケード版「音札」のご紹介
    </p>
    <iframe
      class="video"
      src="https://www.youtube-nocookie.com/embed/94LRZjHgpM0?si=476AppZZNFs0jQPY&amp;controls=0"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    />

    <HeadingTitle>「音札Étude」紹介動画</HeadingTitle>
    <p class="description">
      スマホ・PCで遊べる「音札Étude」のご紹介
    </p>
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
    <p class="description">
      音札ポータルのコンテンツをご紹介
    </p>
    <div class="banners">
      <NuxtLink to="comics">
        <NuxtImg
          format="webp"
          :width="500"
          src="/banners/banner_comic.png"
          alt="おとふだびより"
        />
      </NuxtLink>
      <NuxtLink to="songs">
        <NuxtImg
          format="webp"
          :width="500"
          src="/banners/banner_songs.png"
          alt="収録楽曲一覧"
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
  margin-bottom: 2rem;
  --vc-pgn-margin: 0 2px;
  --vc-pgn-width: 8px;
  --vc-pgn-active-color: rgb(var(--color-primary-DEFAULT));
  --vc-pgn-background-color: rgb(var(--color-primary-100));
  --vc-nav-color: rgb(var(--color-primary-DEFAULT));

  &::before {
    content: '';
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 1rem;
    height: 100%;
    background: linear-gradient(to right, #ffffff88, #ffffff00);
  }

  &::after {
    content: '';
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;
    width: 1rem;
    height: 100%;
    background: linear-gradient(to left, #ffffff88, #ffffff00);
  }

  .carousel__slide {
    padding: 1rem;
  }
}

.description {
  font-size: 0.9rem;
  text-align: center;
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
  margin: 1rem 0 2rem 0;
  border-radius: 1rem;
  box-shadow: 0 0.25rem 0.5rem 0 rgba($text, 0.125);
}

.banners {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0 1rem;
  margin: 1rem 0 2rem 0;

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
