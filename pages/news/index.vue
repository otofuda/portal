<script lang="ts" setup>
import type { BreadcrumbItem } from '#ui/types'
import { type NewsArticle, type NewsTagString, newsTags } from '@/types/news'

const route = useRoute()

const title = ref('お知らせ一覧')

const searchWord = ref<string>('')
const searchTag = ref<NewsTagString | null>((() => {
  const tag = route.query.tag ? route.query.tag.toString() : null
  if (tag) { return newsTags.get(tag as NewsTagString)?.label || null }
  return null
})())

const runtimeConfig = useRuntimeConfig()

const { data, pending } = await useFetch('/api/news')

const contents = computed<NewsArticle[]>(() => {
  return data.value ? data.value.contents : []
})

const filteredContents = computed<NewsArticle[]>(() => {
  if (contents.value === null) { return [] }
  return contents.value.filter((article) => {
    let flag = true
    if (searchWord.value !== '') {
      flag = article.title.toLowerCase().includes(searchWord.value.toLowerCase())
    }
    if (flag && searchTag.value !== null) {
      flag = article.tags.includes(searchTag.value)
    }
    return flag
  })
})

const breadcrumbLinks = computed<BreadcrumbItem[]>(() => {
  return [
    { label: 'TOP', icon: 'i-heroicons-home', to: '/' },
    { label: 'お知らせ一覧', to: '' }
  ]
})

const onClickTag = (tag: NewsTagString) => {
  if (searchTag.value === tag) {
    searchTag.value = null
  } else {
    searchTag.value = tag
  }
}
</script>

<template>
  <div class="news">
    <Head>
      <Title>{{ title }}</Title>
    </Head>

    <div class="breadcrumb">
      <UBreadcrumb :links="breadcrumbLinks" />
    </div>

    <HeadingTitle>
      {{ title }}
      <template #sub>
        News
      </template>
    </HeadingTitle>

    <div class="news-search">
      <UInput
        v-model="searchWord"
        icon="i-heroicons-magnifying-glass-20-solid"
        size="lg"
        color="primary"
        placeholder="検索ワードを入力"
        class="w-full"
      />

      <UAlert
        v-show="searchWord"
        class="mt-4"
        :title="`「${ searchWord }」で検索中`"
        :close="{ icon: 'i-heroicons-x-mark-20-solid', color: 'white', variant: 'ghost' }"
        @update:open="searchWord = ''"
        variant="subtle"
      />
    </div>

    <div class="news-tags">
      <UButton
        v-for="[tagName, tag] in newsTags"
        :key="`news-tag-${tagName}`"
        icon="i-heroicons-tag"
        size="sm"
        :color="tag.color"
        :variant="searchTag === tagName ? 'solid' : 'link'"
        :label="tagName"
        @click="onClickTag(tagName)"
      />
    </div>

    <div class="news-list">
      <div v-if="pending" class="px-4">
        Loading...
      </div>

      <div v-if="filteredContents.length === 0" class="px-4">
        <UAlert
          title="条件に一致するお知らせが見つかりませんでした"
          color="primary"
          variant="outline"
        />
      </div>

      <TransitionGroup name="list">
        <NewsLink
          v-for="article in filteredContents"
          :key="`news-${article.id}`"
          :article="article"
          class="article"
        />
      </TransitionGroup>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.breadcrumb {
  margin: 0 1rem 1rem 1rem;
}

.news-search {
  margin: 1.5rem 0;
  padding: 0 1rem;
}

.news-tags {
  margin-bottom: 1.5rem;
  padding: 0 1rem;
}

.news-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;

  .list-move,
  .list-enter-active {
    transition: all 0.5s ease;
  }

  .list-leave-active {
    transition: none;
  }

  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(2rem);
  }
}
</style>
