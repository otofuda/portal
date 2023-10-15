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
    <!-- ジャケット -->
    <img
      class="jacket"
      :src="jacketSrc"
      :style="{ boxShadow: `0 0.5rem 0.75rem 0 rgba(${props.song.color}, 0.5)` }"
    >

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
      <!-- 音札(AC) -->
      <UBadge v-if="props.song.for_ac" variant="subtle" class="badge">
        <UIcon name="i-heroicons-musical-note" />
        音札
      </UBadge>
      <UBadge v-else color="gray" variant="soft" class="badge --d">
        <UIcon name="i-heroicons-minus" />
        音札
      </UBadge>

      <!-- 音札Étude -->
      <UBadge v-if="props.song.for_mb" color="teal" variant="subtle" class="badge">
        <UIcon name="i-heroicons-musical-note" />
        音札Étude
      </UBadge>
      <UBadge v-else color="gray" variant="soft" class="badge --d">
        <UIcon name="i-heroicons-minus" />
        音札Étude
      </UBadge>
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.song-link {
  color: $text;
  text-decoration: none;
  padding: 0.5rem 0;
  display: grid;
  grid-template-columns: 6rem 1fr;
  grid-template-rows: auto auto 1fr;
  row-gap: 0.5rem;
  column-gap: 1rem;

  &:hover .title {
    text-decoration: underline;
  }

  .jacket {
    width: 100%;
    aspect-ratio: 1;
    grid-row: 1 / 5;
    border-radius: 0.5rem;
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
      border-radius: 0.3rem;

      &:nth-child(1) {
        background: $color-easy-gradient;
      }

      &:nth-child(2) {
        background: $color-normal-gradient;
      }

      &:nth-child(3) {
        background: $color-hard-gradient;
      }
    }
  }

  .titles {
    display: flex;
    gap: 0.5rem;

    .badge {
      gap: 0.25rem;

      &.--d {
        opacity: 0.5;
      }
    }
  }
}
</style>
