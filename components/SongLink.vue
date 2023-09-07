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
    <div class="info">
      <!-- 難易度情報 -->
      <div class="difficulty">
        {{ props.song.easy }}
      </div>
      <div class="difficulty">
        {{ props.song.normal }}
      </div>
      <div class="difficulty">
        {{ props.song.hard }}
      </div>
    </div>
    <!-- 収録タイトル情報 -->
    <div class="titles">
      <UBadge v-if="props.song.for_ac" variant="subtle">
        音札
      </UBadge>
      <UBadge v-if="props.song.for_mb" variant="subtle" color="teal">
        音札Étude
      </UBadge>
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.song-link {
  color: $text;
  text-decoration: none;
  display: grid;
  grid-template-columns: 5rem 1fr;
  grid-template-rows: auto auto 1fr;
  gap: 0.5rem;

  .jacket {
    width: 100%;
    grid-row: 1 / 5;
  }

  .title {
    font-size: 1.25rem;
    line-height: 1;
  }

  .artist {
    color: $sub;
    line-height: 1;
  }

  .info {
    display: flex;
    gap: 0.5rem;

    .difficulty {
      color: $bg;
      font-weight: bold;
      text-align: center;
      width: 40px;
      border-radius: 0.25rem;

      &:nth-child(1) {
        background-color: $e;
      }

      &:nth-child(2) {
        background-color: $n;
      }

      &:nth-child(3) {
        background-color: $h;
      }
    }
  }

  .titles {
    display: flex;
    gap: 0.5rem;
  }
}
</style>
