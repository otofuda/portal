<script lang="ts" setup>
import { TopicInfo, TopicPayload } from '~/types/topics'

const title = ref('TOP')

const runtimeConfig = useRuntimeConfig()

const { data } = await useAsyncData<TopicPayload>('topics', () => {
  return $fetch(`${runtimeConfig.public.apiBase}api/v1/topics`, {
    params: { limit: 1000 },
    headers: { 'X-MICROCMS-API-KEY': runtimeConfig.public.apiToken }
  })
})

const topics = computed<TopicInfo[]>(() => {
  return data.value ? data.value.contents : []
})
</script>

<template>
  <div>
    <Head>
      <Title>{{ title }}</Title>
    </Head>

    <p class="welcome">
      音札ポータルへようこそ！
    </p>

    <!-- <HeadingTitle>最新のお知らせ</HeadingTitle> -->

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
  </div>
</template>

<style lang="scss" scoped>
.welcome {
  text-align: center;
}

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
