<script lang="ts" setup>
import type { SongInfo, SongSort, SongsPayload } from '~/types/songs'

const title = ref('収録楽曲一覧')
const runtimeConfig = useRuntimeConfig()

const { data, pending, error } = await useAsyncData<SongsPayload>('songs', () => {
  return $fetch(`${runtimeConfig.public.apiBase}api/v1/songs`, {
    params: { limit: 1000 },
    headers: { 'X-MICROCMS-API-KEY': runtimeConfig.public.apiToken }
  })
})

const SORT_OPTIONS: SongSort[] = [
  { type: 'default', label: '新着順' },
  { type: 'name', label: '楽曲名順' },
  { type: 'artist', label: 'アーティスト名順' },
  { type: 'level', label: '楽曲難易度順', difficulty: 'e', color: '#25ca25' },
  { type: 'level', label: '楽曲難易度順', difficulty: 'n', color: '#ffb223' },
  { type: 'level', label: '楽曲難易度順', difficulty: 'h', color: '#ff0984' },
  { type: 'bpm', label: 'BPM順' },
  { type: 'notes', label: 'ノーツ数順', difficulty: 'e', color: '#25ca25' },
  { type: 'notes', label: 'ノーツ数順', difficulty: 'n', color: '#ffb223' },
  { type: 'notes', label: 'ノーツ数順', difficulty: 'h', color: '#ff0984' }
] as const

const filterText = ref<string>('')
const sortOptions = ref<SongSort[]>(SORT_OPTIONS)
const songSort = ref<SongSort>(SORT_OPTIONS[0])
const isDesc = ref<boolean>(true)

const songs = computed<SongInfo[]>(() => {
  let songs = data.value ? [...data.value.contents] : []
  // 検索ワードの処理
  if (filterText.value) {
    const word = filterText.value.toLowerCase();
    songs = songs.filter(song => {
      if (song.name.toLowerCase().includes(word)) { return true }
      if (song.artist.toLowerCase().includes(word)) { return true }
      if (song.illustrator.toLowerCase().includes(word)) { return true }
      if (song.easy_nd.toLowerCase().includes(word)) { return true }
      if (song.normal_nd.toLowerCase().includes(word)) { return true }
      if (song.hard_nd.toLowerCase().includes(word)) { return true }
      return false
    })
  }
  // ならびかえの処理
  if (songSort.value.type !== 'default') {
    let key: (keyof SongInfo) | null = null
    switch (songSort.value.type) {
      case 'bpm':
      case 'name':
      case 'artist':
        key = songSort.value.type
        break
      case 'level': {
        if (songSort.value.difficulty === 'e') { key = 'easy' }
        if (songSort.value.difficulty === 'n') { key = 'normal' }
        if (songSort.value.difficulty === 'h') { key = 'hard' }
        break
      }
      case 'notes': {
        if (songSort.value.difficulty === 'e') { key = 'easy_notes' }
        if (songSort.value.difficulty === 'n') { key = 'normal_notes' }
        if (songSort.value.difficulty === 'h') { key = 'hard_notes' }
        break
      }
    }
    if (key) {
      songs.sort((a, b) => {
        const A = a[key]
        const B = b[key]
        if (typeof A === 'string' && typeof B === 'string') {
          return A.localeCompare(B)
        } else if (A < B) {
          return -1
        } else if (B < A) {
          return 1
        } else {
          return 0
        }
      })
    }
  }
  return isDesc.value ? songs.reverse() : songs
})

const allCopyrights = computed(() => {
  const result = new Set<string>()
  if (data.value) {
    data.value.contents.forEach((song) => {
      if (song.copyright) { result.add(song.copyright) }
    })
  }
  return Array.from(result)
})
</script>

<template>
  <div>
    <Head>
      <Title>{{ title }}</Title>
    </Head>

    <HeadingTitle>
      {{ title }}
      <template #sub>
        Songs
      </template>
    </HeadingTitle>

    <p class="description">
      音札シリーズに収録されている楽曲の情報を見ることができます！
    </p>

    <div v-if="pending">
      Loading...
    </div>

    <div v-if="error">
      {{ error.name }}: {{ error.message }}
    </div>

    <!-- 検索ワード -->
    <div class="search-form">
      <UInput
        v-model="filterText"
        icon="i-heroicons-magnifying-glass-20-solid"
        size="lg"
        color="white"
        placeholder="検索ワードを入力"
      />
    </div>

    <!-- ならびかえ -->
    <div class="sort-form">
      <span>ならびかえ</span>
      <UButtonGroup size="lg" orientation="horizontal">
        <USelectMenu v-model="songSort" :options="sortOptions" class="flex-grow">
          <template #label>
            <span
              v-if="songSort.type === 'level' || songSort.type === 'notes'"
              class="flex-shrink-0 w-2 h-2 mt-px rounded-full"
              :style="{ background: songSort.color }"
            />
            {{ songSort.label }}
          </template>
          <template #option="{ option }: { option: SongSort }">
            <span
              v-if="option.type === 'level' || option.type === 'notes'"
              class="flex-shrink-0 w-2 h-2 mt-px rounded-full"
              :style="{ background: option.color }"
            />
            <span class="truncate">{{ option.label }}</span>
          </template>
        </USelectMenu>
        <!-- 昇順／降順 -->
        <UButton
          v-if="isDesc"
          icon="i-heroicons-bars-arrow-down"
          color="gray"
          @click="isDesc = false"
        />
        <UButton
          v-else
          icon="i-heroicons-bars-arrow-up"
          color="gray"
          @click="isDesc = true"
        />
      </UButtonGroup>
    </div>

    <div v-if="songs" class="songs-list">
      <SongLink
        v-for="song in songs"
        :key="`songs-${song.song_id}`"
        class="song"
        :song="song"
        :sort="songSort"
      />
    </div>

    <ul class="copyrights">
      <li v-for="(copyright, i) in allCopyrights" :key="`copyright-${i}`">
        {{ copyright }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/_vars.scss" as vars;

.description {
  font-size: 0.8rem;
  margin: 1rem;
  text-align: center;
}

.search-form {
  margin: 1rem 0;
  padding: 0 1rem;
}

.sort-form {
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  padding: 0 1rem;

  > span {
    color: vars.$sub;
    font-weight: bold;
    font-size: 0.8rem;
  }
}

.songs-list {
  display: flex;
  flex-direction: column;
  margin: 1rem;
}

.copyrights {
  text-align: center;
  color: vars.$sub;
  font-size: 0.75rem;
  margin-bottom: 1rem;
}
</style>
