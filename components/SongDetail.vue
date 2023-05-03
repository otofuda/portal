<script lang="ts" setup>
import { SongInfo } from '~/types/songs'

const props = defineProps<{
  song: SongInfo;
}>()

const jacketSrc = computed<string>(() => {
  const size = Math.min(320, props.song.jacket.width)
  return `${props.song.jacket.url}?w=${size}`
})

interface LevelInfo {
  color: string;
  difficulty: number;
  nd: string;
  notes: number;
  video?: string;
}

const levels = computed<LevelInfo[]>(() => {
  return [
    {
      color: '#25ca25',
      difficulty: props.song.easy,
      nd: props.song.easy_nd,
      notes: props.song.easy_notes,
      video: props.song.easy_video
    },
    {
      color: '#ffb223',
      difficulty: props.song.normal,
      nd: props.song.normal_nd,
      notes: props.song.normal_notes,
      video: props.song.normal_video
    },
    {
      color: '#ff0984',
      difficulty: props.song.hard,
      nd: props.song.hard_nd,
      notes: props.song.hard_notes,
      video: props.song.hard_video
    }
  ]
})
</script>

<template>
  <div class="song-data">
    <img class="jacket" :src="jacketSrc">

    <strong class="title">{{ props.song.name }}</strong>

    <div class="artist">
      {{ props.song.artist }}
    </div>

    <div v-if="props.song.comment" class="comment">
      {{ props.song.comment }}
    </div>

    <div class="levels">
      <div
        v-for="(level, i) in levels"
        :key="`song-level-${i}`"
        class="level"
      >
        <span class="level-number" :style="{ background: level.color }">
          {{ level.difficulty }}
        </span>
        <span class="level-nd">
          {{ level.nd }}
        </span>
        <span class="level-notes">
          {{ level.notes }}
        </span>
        <NuxtLink
          v-if="level.video"
          :to="level.video"
          class="level-video"
          target="_blank"
        >
          譜面動画を視聴
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.song-data {
  color: $text;
  text-decoration: none;
  display: grid;
  grid-template-columns: 5rem 1fr;
  column-gap: 1rem;

  .jacket {
    width: 100%;
    grid-row: 1 / 5;
  }

  .title {
    font-size: 2rem;
  }

  .artist {
    color: $sub;
  }

  .comment {
    color: $sub;
  }

  .levels {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .level {
      display: grid;
      align-items: flex-start;
      grid-template-columns: 4rem 1fr;
      column-gap: 0.5rem;

      .level-number {
        flex-shrink: 0;
        color: $bg;
        font-size: 1.5rem;
        font-weight: bold;
        text-align: center;
        padding: 0.25rem 0;
        grid-row: 1 / 4;
      }

      .level-nd {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        &::before {
          content: '譜面制作';
          font-size: 0.75rem;
          color: $bg;
          background: $text;
          padding: 0 0.5rem;
        }
      }

      .level-notes {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        &::before {
          content: 'ノーツ数';
          font-size: 0.75rem;
          color: $bg;
          background: $text;
          padding: 0 0.5rem;
        }
      }

      .level-video {
        color: $bg;
        background: #dc143c;
        justify-self: start;
        text-decoration: none;
        font-size: 0.75rem;
        padding: 0.25rem 0.5rem;
      }
    }
  }
}
</style>
