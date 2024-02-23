<script lang="ts" setup>
import type { BreadcrumbLink } from '#ui/types'
import type { ComicInfo, ComicPayload } from '~/types/comics'

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

const breadcrumbLinks = computed<BreadcrumbLink[]>(() => {
  return [
    { label: 'TOP', icon: 'i-heroicons-home', to: '/' },
    { label: 'マンガ一覧', to: '' }
  ]
})

useSeoMeta({
  title: 'マンガ一覧｜音札ポータル',
  ogTitle: 'マンガ一覧｜音札ポータル',
  description: '音札の世界をゆる〜くお届けする4コマ漫画「おとふだびより♪」のアーカイブを掲載中！',
  ogDescription: '音札の世界をゆる〜くお届けする4コマ漫画「おとふだびより♪」のアーカイブを掲載中！'
})
</script>

<template>
  <div class="comics">
    <Head>
      <Title>{{ title }}</Title>
    </Head>

    <div class="breadcrumb">
      <UBreadcrumb :links="breadcrumbLinks" />
    </div>

    <HeadingTitle>
      {{ title }}
      <template #sub>
        Comics
      </template>
    </HeadingTitle>

    <p class="description">
      「おとふだびより♪」は音札の世界をゆる〜くお届けする4コマ漫画です！
    </p>

    <div v-if="pending">
      Loading...
    </div>

    <div class="comics-list">
      <ComicLink
        v-for="comic in comics"
        :key="`comic-${comic.id}`"
        :comic="comic"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.breadcrumb {
  margin: 0 1rem 1rem 1rem;
}

.description {
  margin: 1rem;
  text-align: center;
}

.comics-list {
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 1rem;
}
</style>
