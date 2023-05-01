<script lang="ts" setup>
import { SongInfo } from '~/types/songs'

const props = defineProps<{
  song: SongInfo;
}>()

const jacketSrc = computed<string>(() => {
  const size = Math.min(320, props.song.jacket.width)
  return `${props.song.jacket.url}?w=${size}`
})
</script>

<template>
  <NuxtLink :to="`songs/${props.song.song_id}`" class="song-link">
    <img class="jacket" :src="jacketSrc">
    <strong class="title">{{ props.song.name }}</strong>
    <div class="artist">
      {{ props.song.artist }}
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.song-link {
  color: $text;
  text-decoration: none;
  display: grid;
  grid-template-columns: 5rem 1fr;
  grid-template-rows: auto 1fr;
  column-gap: 0.5rem;

  .jacket {
    width: 100%;
    grid-row: 1 / 3;
  }

  .title {
    font-size: 1.25rem;
  }

  .artist {
    color: $sub;
  }
}
</style>
