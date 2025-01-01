<script lang="ts" setup>
import type { BreadcrumbLink } from '#ui/types'
import type { SongInfo, SongsPayload } from '@/types/songs'

const route = useRoute()
const runtimeConfig = useRuntimeConfig()

const { data, pending } = await useAsyncData<SongsPayload>('songs', () => {
  return $fetch(`${runtimeConfig.public.apiBase}api/v1/songs`, {
    params: { limit: 1000 },
    headers: { 'X-MICROCMS-API-KEY': runtimeConfig.public.apiToken }
  })
})

const content = computed<SongInfo | null>(() => {
  if (!data.value) { return null }
  // @ts-expect-error
  const id = route.params.id as string
  return data.value.contents.find((song) => {
    return id.includes(song.song_id)
  }) || null
})

const title = ref(`${content.value?.name} - 楽曲情報`)

const links = computed<BreadcrumbLink[]>(() => {
  return [
    { label: 'TOP', icon: 'i-heroicons-home', to: '/' },
    { label: '楽曲一覧', to: '/songs' },
    { label: content.value?.name || '' }
  ]
})
</script>

<template>
  <div>
    <Head>
      <Title>{{ title }}</Title>
    </Head>

    <div class="breadcrumb">
      <UBreadcrumb :links="links" />
    </div>

    <div v-if="pending">
      Loading...
    </div>

    <SongDetail v-else-if="content" :song="content" />

    <div v-else>
      Not Found
    </div>
  </div>
</template>

<style lang="scss" scoped>
.breadcrumb {
  margin: 0 1rem;
}

.song-data {
  margin: 1rem 1rem 0 1rem;
}
</style>
