<script lang="ts" setup>
import { SongInfo, SongsPayload } from '~/types/songs'

const title = ref('楽曲一覧')
const runtimeConfig = useRuntimeConfig()

const { data, pending, error } = await useAsyncData<SongsPayload>('songs', () => {
  return $fetch(`${runtimeConfig.public.apiBase}api/v1/songs?limit=1000`, {
    headers: { 'X-MICROCMS-API-KEY': runtimeConfig.public.apiToken }
  })
})

const songs = computed<SongInfo[]>(() => {
  return data.value ? data.value.contents : []
})
</script>

<template>
  <div>
    <Head>
      <Title>{{ title }}</Title>
    </Head>

    <h1>{{ title }}</h1>

    <div>音札の収録楽曲一覧</div>

    <div v-if="pending">
      Loading...
    </div>

    <div v-if="songs">
      <NuxtLink
        v-for="song in songs"
        :key="`songs-${song.song_id}`"
        :to="`songs/${song.song_id}`"
        class="song"
      >
        <h2>{{ song.name }}</h2>
        {{ song.artist }}
      </NuxtLink>
    </div>

    <div v-if="error">
      {{ error.name }}: {{ error.message }}
    </div>
  </div>
</template>
