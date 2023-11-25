<script lang="ts" setup>
import type { SongInfo, SongsPayload } from '~/types/songs'

const title = ref('収録楽曲一覧')
const runtimeConfig = useRuntimeConfig()

const { data, pending, error } = await useAsyncData<SongsPayload>('songs', () => {
  return $fetch(`${runtimeConfig.public.apiBase}api/v1/songs`, {
    params: { limit: 1000 },
    headers: { 'X-MICROCMS-API-KEY': runtimeConfig.public.apiToken }
  })
})

const songs = computed<SongInfo[]>(() => {
  const allSongs = data.value ? [...data.value.contents] : []
  return allSongs.reverse()
})
</script>

<template>
  <div>
    <Head>
      <Title>{{ title }}</Title>
    </Head>

    <HeadingTitle>{{ title }}</HeadingTitle>

    <div v-if="pending">
      Loading...
    </div>

    <div v-if="error">
      {{ error.name }}: {{ error.message }}
    </div>

    <div v-if="songs" class="songs-list">
      <SongLink
        v-for="song in songs"
        :key="`songs-${song.song_id}`"
        :song="song"
        class="song"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.songs-list {
  display: flex;
  flex-direction: column;
  margin: 1rem;
}
</style>
