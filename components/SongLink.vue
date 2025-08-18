<script lang="ts" setup>
import type { SongInfo, SongSort } from '~/types/songs'

const props = defineProps<{
  song: SongInfo
  sort?: SongSort
}>()

const jacketSrc = computed<string>(() => {
  const size = Math.min(320, props.song.jacket.width)
  return `${props.song.jacket.url}?w=${size}`
})
</script>

<template>
  <NuxtLink
    :to="`songs/${props.song.song_id}`"
    class="song-link"
  >
    <!-- ジャケット -->
    <NuxtPicture
      class="jacket"
      :src="jacketSrc.replace('https://images.microcms-assets.io', 'microcms')"
      :alt="props.song.name"
      :style="{ boxShadow: `0 0.5rem 0.75rem 0 rgba(${props.song.color}, 0.5)` }"
      sizes="160px"
    />

    <strong class="title">{{ props.song.name }}</strong>
    <div class="artist">
      {{ props.song.artist }}
    </div>

    <!-- 特殊なソート適用時 -->
    <div
      v-if="sort?.type === 'level' || sort?.type === 'notes'"
      class="info"
    >
      <!-- 難易度情報 -->
      <div
        v-if="sort.difficulty === 'e'"
        class="difficulty --e"
      >
        {{ props.song.easy }}
      </div>
      <div
        v-else-if="sort.difficulty === 'n'"
        class="difficulty --n"
      >
        {{ props.song.normal }}
      </div>
      <div
        v-else-if="sort.difficulty === 'h'"
        class="difficulty --h"
      >
        {{ props.song.hard }}
      </div>
      <!-- ノーツ数情報 -->
      <div
        v-if="sort.difficulty === 'e'"
        class="number"
      >
        {{ props.song.easy_notes }} Notes
      </div>
      <div
        v-else-if="sort.difficulty === 'n'"
        class="number"
      >
        {{ props.song.normal_notes }} Notes
      </div>
      <div
        v-else-if="sort.difficulty === 'h'"
        class="number"
      >
        {{ props.song.hard_notes }} Notes
      </div>
    </div>

    <!-- BPMソート適用時 -->
    <div
      v-else-if="sort?.type === 'bpm'"
      class="info"
    >
      <div class="number">
        BPM: {{ props.song.dispbpm }}
      </div>
    </div>

    <!-- 通常時 -->
    <div
      v-else
      class="info"
    >
      <!-- 難易度情報 -->
      <div class="difficulty --e">
        {{ props.song.easy }}
      </div>
      <div class="difficulty --n">
        {{ props.song.normal }}
      </div>
      <div class="difficulty --h">
        {{ props.song.hard }}
      </div>
    </div>

    <!-- 収録タイトル情報 -->
    <div class="titles">
      <!-- 音札(AC) -->
      <UBadge
        v-if="props.song.for_ac"
        variant="subtle"
        class="badge"
      >
        <UIcon name="i-heroicons-musical-note" />
        音札
      </UBadge>
      <UBadge
        v-else
        color="neutral"
        variant="soft"
        class="badge --d"
      >
        <UIcon name="i-heroicons-minus" />
        音札
      </UBadge>

      <!-- 音札Étude -->
      <UBadge
        v-if="props.song.for_mb"
        color="success"
        variant="subtle"
        class="badge"
      >
        <UIcon name="i-heroicons-musical-note" />
        音札Étude
      </UBadge>
      <UBadge
        v-else
        color="neutral"
        variant="soft"
        class="badge --d"
      >
        <UIcon name="i-heroicons-minus" />
        音札Étude
      </UBadge>
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
@use "@/assets/_vars.scss" as vars;

.song-link {
  color: vars.$text;
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
    overflow: hidden;

    img {
      aspect-ratio: 1 / 1;
      object-fit: cover;
    }
  }

  .title {
    font-size: 1.25rem;
    line-height: 1;
  }

  .artist {
    color: vars.$sub;
    line-height: 1;
  }

  .info {
    display: flex;
    gap: 0.5rem;

    .difficulty {
      color: vars.$bg;
      font-weight: bold;
      text-align: center;
      width: 40px;
      border-radius: 0.3rem;

      &.--e {
        background: vars.$color-easy-gradient;
      }

      &.--n {
        background: vars.$color-normal-gradient;
      }

      &.--h {
        background: vars.$color-hard-gradient;
      }
    }

    .number {
      color: vars.$sub;
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
