<script lang="ts" setup>
import { SongInfo, SongsPayload } from '@/types/songs'

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
  return data.value.contents.find((song) => {
    return route.params.id.includes(song.song_id)
  }) || null
})

const title = ref(content.value?.name)
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

    <article v-else-if="content" class="song-info">
      Artist: {{ content.artist }}
      <br>
      Illustrator: {{ content.illustrator }}
      <br>
      BPM: {{ content.dispbpm }}
      <br>
      楽曲レベル: {{ content.easy }} | {{ content.normal }} | {{ content.hard }}
    </article>

    <div v-else>
      Not Found
    </div>
  </div>
</template>
