<script lang="ts" setup>
import { ComicInfo, ComicPayload } from '~/types/comics'

const route = useRoute()
const runtimeConfig = useRuntimeConfig()

const { data, pending } = await useAsyncData<ComicPayload>('comics', () => {
  return $fetch(`${runtimeConfig.public.apiBase}api/v1/comics`, {
    params: { limit: 1000 },
    headers: { 'X-MICROCMS-API-KEY': runtimeConfig.public.apiToken }
  })
})

const content = computed<ComicInfo | null>(() => {
  if (!data.value) { return null }
  return data.value.contents.find((comic) => {
    return route.params.id.includes(comic.id)
  }) || null
})

const title = ref(content.value?.title)
</script>

<template>
  <div>
    <Head>
      <Title>{{ title }}</Title>
    </Head>

    <HeadingTitle>{{ title }}</HeadingTitle>

    <div v-if="pending" class="loading">
      Loading...
    </div>

    <div v-else-if="content">
      <img
        :src="content.image.url"
        :alt="title"
        class="comic-img"
      >
    </div>

    <div v-else class="error">
      マンガが見つかりません
    </div>

    <NuxtLink to="/comics">
      戻る
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
.comic-img {
  width: calc(100% - 2rem);
  margin: 1rem;
}
</style>
