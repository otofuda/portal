<script lang="ts" setup>
import type { SongInfo } from '~/types/songs'

const props = defineProps<{
  song: SongInfo
}>()

const jacketSrc = computed<string>(() => {
  const size = Math.min(640, props.song.jacket.width)
  return `${props.song.jacket.url}?w=${size}`
})

interface LevelInfo {
  difficulty: number
  nd: string
  notes: number
  video?: string
  video_etude?: string
}

const levels = computed<LevelInfo[]>(() => {
  return [
    {
      difficulty: props.song.easy,
      nd: props.song.easy_nd,
      notes: props.song.easy_notes,
      video: props.song.easy_video,
      video_etude: props.song.easy_video_etude,
    },
    {
      difficulty: props.song.normal,
      nd: props.song.normal_nd,
      notes: props.song.normal_notes,
      video: props.song.normal_video,
      video_etude: props.song.normal_video_etude,
    },
    {
      difficulty: props.song.hard,
      nd: props.song.hard_nd,
      notes: props.song.hard_notes,
      video: props.song.hard_video,
      video_etude: props.song.hard_video_etude,
    },
  ]
})
</script>

<template>
  <div class="song-data">
    <NuxtPicture
      class="jacket"
      :src="jacketSrc.replace('https://images.microcms-assets.io', 'microcms')"
      :alt="props.song.name"
      :style="{ boxShadow: `0 0.75rem 1rem 0 rgba(${props.song.color}, 0.5)` }"
      sizes="320px"
    />

    <strong class="title">{{ props.song.name }}</strong>

    <div class="artist">
      {{ props.song.artist }}
    </div>

    <div
      v-if="props.song.comment || $props.song.copyright"
      class="comment"
    >
      {{ props.song.comment }}

      <div
        v-if="props.song.copyright"
        class="copyright"
      >
        {{ props.song.copyright }}
      </div>
    </div>

    <div class="detail">
      <label>ILLUSTRATOR</label>
      {{ props.song.illustrator }}
    </div>

    <div class="detail">
      <label>BPM</label>
      {{ props.song.dispbpm }}
    </div>

    <div class="detail">
      <label>収録タイトル</label>

      <div class="detail-badges">
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
    </div>

    <div class="links">
      <UButton
        v-if="props.song.youtube_music"
        :to="props.song.youtube_music"
        target="_blank"
        color="primary"
        variant="solid"
        icon="i-heroicons-musical-note"
      >
        楽曲を聴く
        <UIcon name="i-heroicons-arrow-top-right-on-square" />
      </UButton>
    </div>

    <div class="detail" v-if="props.song.youtube_chart">
      <label>譜面攻略動画</label>
      <UButton
        :to="props.song.youtube_chart"
        target="_blank"
        color="rose"
        class="my-4"
        icon="i-fa6-brands-youtube"
      >
        譜面攻略動画を見る
      </UButton>
      <CommonYouTube
        :video-id="props.song.youtube_chart"
        class="video mb-4"
      />
    </div>

    <div class="levels">
      <div
        v-for="(level, i) in levels"
        :key="`song-level-${i}`"
        class="level"
      >
        <!-- 楽曲レベル -->
        <span class="level-number">
          {{ level.difficulty }}
        </span>

        <div class="level-detail">
          <label class="level-label">譜面制作</label>
          <span class="level-nd">
            {{ level.nd }}
          </span>

          <label class="level-label">ノーツ数</label>
          <span class="level-notes">
            {{ level.notes }}
          </span>

          <template v-if="level.video">
            <label class="level-label">譜面紹介</label>
            <UButton
              :to="level.video"
              target="_blank"
              color="rose"
              icon="i-fa6-brands-youtube"
            >
              動画を見る
            </UButton>
            <CommonYouTube
              v-if="level.video"
              :video-id="level.video"
              class="video"
            />
          </template>

          <template v-if="level.video_etude">
            <label class="level-label">攻略動画</label>
            <UButton
              :to="level.video_etude"
              target="_blank"
              color="rose"
              icon="i-fa6-brands-youtube"
            >
              動画を見る
            </UButton>
            <CommonYouTube
              :video-id="level.video_etude"
              class="video"
            />
          </template>
        </div>
      </div>
    </div>

    <ShareButtons :text="`${props.song.name} - 楽曲情報`" />

    <div class="menu">
      <UButton
        icon="i-heroicons-arrow-left"
        size="lg"
        color="primary"
        variant="outline"
        label="一覧にもどる"
        to="/songs"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/_vars.scss" as vars;

.song-data {
  color: vars.$text;
  text-decoration: none;
  display: grid;
  grid-template-columns: 1fr;
  padding-bottom: 2rem;

  :deep(.jacket) {
    width: 240px;
    max-width: 100%;
    aspect-ratio: 1;
    border-radius: 1.5rem;
    justify-self: center;
    margin-bottom: 1.5rem;
    overflow: hidden;

    img {
      aspect-ratio: 1 / 1;
      object-fit: cover;
      width: 100%;
    }
  }

  .title {
    font-size: 2rem;
    justify-self: center;
  }

  .artist {
    justify-self: center;
    margin-bottom: 1rem;
  }

  .comment {
    justify-self: stretch;
    padding: 1rem;
    background: vars.$bg-alt;
    text-align: center;
    border-radius: 1rem;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .copyright {
      color: vars.$sub;
      font-size: 0.75rem;
    }
  }

  .detail {
    justify-self: center;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    label {
      width: 6rem;
      font-size: 0.7rem;
      text-align: center;
      padding: 0.125rem;
      background: vars.$border;
      clip-path: polygon(
        0% 50%,
        10% 0,
        90% 0,
        100% 50%,
        100% 50%,
        90% 100%,
        10% 100%,
        0% 50%
      );
    }

    .detail-badges {
      display: flex;
      gap: 0.5rem;
      margin-top: 0.5rem;

      .badge {
        gap: 0.25rem;

        &.--d {
          opacity: 0.5;
        }
      }
    }
  }

  .links {
    justify-self: center;
    padding-top: 1rem;
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .levels {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    margin-bottom: 2rem;

    .level {
      flex: 1;
      display: grid;
      align-items: flex-start;
      grid-template-rows: 5rem 1fr;
      gap: 1rem;

      .level-number {
        color: vars.$bg;
        font-size: 1.5rem;
        font-weight: bold;
        text-align: center;
        padding: 0.5rem;
        border: 0.2rem solid rgba(vars.$bg, 0.75);
        border-radius: 0.5rem;
        box-shadow: 0 0.75rem 0.75rem -0.5rem rgba(vars.$text, 0.25);
      }

      &:nth-child(1) .level-number {
        background: vars.$color-easy-gradient;
      }

      &:nth-child(2) .level-number {
        background: vars.$color-normal-gradient;
      }

      &:nth-child(3) .level-number {
        background: vars.$color-hard-gradient;
      }

      .level-detail {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
      }

      .level-label {
        justify-self: start;
        width: 6rem;
        font-size: 0.75rem;
        text-align: center;
        padding: 0.125rem;
        color: vars.$bg;
        background: vars.$text;
        clip-path: polygon(
          0% 50%,
          10% 0,
          90% 0,
          100% 50%,
          100% 50%,
          90% 100%,
          10% 100%,
          0% 50%
        );
      }

      .level-nd {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }

      .level-notes {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }

      .level-video {
        color: vars.$bg;
        background: #dc143c;
        justify-self: start;
        text-decoration: none;
        font-size: 0.75rem;
        padding: 0.25rem 0.5rem;
      }
    }
  }

  .video {
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: 1rem;
    box-shadow: 0 0.25rem 0.5rem 0 rgba(vars.$text, 0.125);
    overflow: hidden;
  }

  .share {
    margin-bottom: 2rem;
  }

  .menu {
    display: flex;
    justify-content: center;
  }
}

@media (max-width: vars.$spwidth) {
  .song-data {
    .levels {
      flex-direction: column;
      gap: 2rem;

      .level {
        grid-template-columns: 6rem 1fr;
        grid-template-rows: auto;

        .level-detail {
          align-items: flex-start;
          gap: 0.5rem;
        }
      }
    }
  }
}
</style>
