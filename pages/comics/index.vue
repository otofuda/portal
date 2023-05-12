<script lang="ts" setup>
import { ComicInfo, ComicPayload } from '~/types/comics'

const title = ref('マンガ一覧')

const runtimeConfig = useRuntimeConfig()

const { data, pending } = await useAsyncData<ComicPayload>('comics', () => {
  return $fetch(`${runtimeConfig.public.apiBase}api/v1/comics`, {
    params: { limit: 1000 },
    headers: { 'X-MICROCMS-API-KEY': runtimeConfig.public.apiToken }
  })
})

const comics = computed<ComicInfo[]>(() => {
  return data.value ? data.value.contents : []
})
</script>

<template>
  <div class="comics">
    <Head>
      <Title>{{ title }}</Title>
    </Head>

    <HeadingTitle>{{ title }}</HeadingTitle>

    <div class="comics-list">
      <div v-if="pending">
        Loading...
      </div>

      <ComicLink
        v-for="comic in comics"
        :key="`comic-${comic.id}`"
        :comic="comic"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.comics-list {
  display: flex;
  flex-direction: column;
}
</style>