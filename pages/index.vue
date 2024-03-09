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
    <HeadingTitle>
      トピックス
      <template #sub>
        Topics
      </template>
    </HeadingTitle>
    <p class="description">
      音札の最新情報はこちら！
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
    <HeadingTitle>
      最新のお知らせ
      <template #sub>
        News
      </template>
    </HeadingTitle>

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

    <HeadingTitle>
      アーケード版「音札」紹介
      <template #sub>
        Arcade
      </template>
    </HeadingTitle>
    <p class="description">
      「音札」は、リズムに乗って演奏する爽快な音楽ゲームに、花札をモチーフにした「音札」によるカードバトルを組み合わせたゲームです。
    </p>
    <dl class="desclist">
      <dt>ジャンル</dt>
      <dd>対戦型音楽カードゲーム</dd>
      <dt>プレイ人数</dt>
      <dd>2人</dd>
      <dt>プレイ料金</dt>
      <dd>無料</dd>
      <dt>プラットフォーム</dt>
      <dd>アーケード</dd>
    </dl>
    <iframe
      class="video"
      src="https://www.youtube-nocookie.com/embed/94LRZjHgpM0?si=476AppZZNFs0jQPY&amp;controls=0"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    />

    <HeadingTitle>
      「音札Étude」紹介
      <template #sub>
        Mobile
      </template>
    </HeadingTitle>
    <p class="description">
      「音札Étude」はスマホやPCで一人で手軽に遊べる対戦音楽ゲームです。<br>
      敵との勝敗を決めるのは、音ゲーの上手さとカードゲームの上手さ！「音札」を使って敵を妨害し、音ゲーを有利に進めよう！
    </p>
    <a class="etude-link" href="https://etude.otofuda.com/" target="_blank">
      <NuxtImg format="webp" :width="500" class="--etude" src="/assets/button_etude.png" />
    </a>
    <p class="description">
      デッキ編成や戦略を研究する、同じ譜面を繰り返し練習する、好きな楽曲をひたすらリピートする、など楽しみ方はあなた次第！
    </p>
    <dl class="desclist">
      <dt>ジャンル</dt>
      <dd>家庭用音楽カードゲーム</dd>
      <dt>プレイ人数</dt>
      <dd>1人</dd>
      <dt>価格</dt>
      <dd>無料</dd>
      <dt>プラットフォーム</dt>
      <dd>Android, iOS, iPad OS, Windows</dd>
    </dl>
    <iframe
      class="video"
      src="https://www.youtube-nocookie.com/embed/nQ7wnzQEDpM?si=_AQUAGihH8h7sCQl&amp;controls=0"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    />

    <!-- バナー -->
    <HeadingTitle>
      コンテンツ
      <template #sub>
        Contents
      </template>
    </HeadingTitle>
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
  line-height: 2;
  text-align: center;
  margin: 0 2rem;
}

.desclist {
  display: grid;
  grid-template-columns: 8rem auto;
  justify-content: center;
  align-items: center;
  gap: 1rem 0.5rem;
  margin: 1rem;
  font-size: 0.9rem;

  dt {
    padding: 0.25rem 1rem;
    text-align: center;
    font-size: 0.7rem;
    font-weight: bold;
    color: $bg;
    background: $otofuda-gradient;
    clip-path: polygon(
      0% 50%,
      10% 0,
      90% 0,
      100% 50%,
      100% 50%,
      90% 100%,
      10% 100%,
      0% 50%
    );
  }
}

.etude-link {
  display: flex;
  justify-content: center;
  padding: 0 2rem;
  margin: 2rem 0;

  img {
    width: 100%;
    max-width: 25rem;
    filter: drop-shadow(0 0.25rem 0.5rem rgba($green, 0.2));
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
  margin: 2rem 0;
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
