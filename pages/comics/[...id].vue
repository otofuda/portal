<script lang="ts" setup>
import type { BreadcrumbItem } from '#ui/types'
import type { ComicInfo } from '~/types/comics'

const route = useRoute('comics-id')

const { data, pending } = await useFetch('/api/comics')

const content = computed<ComicInfo | null>(() => {
  if (!data.value) { return null }
  return data.value.contents.find((comic) => {
    if (!route.params.id) { return null }
    return route.params.id.includes(comic.id)
  }) || null
})

const title = ref(content.value?.title)

const breadcrumbLinks = computed<BreadcrumbItem[]>(() => {
  return [
    { label: 'TOP', icon: 'i-heroicons-home', to: '/' },
    { label: 'マンガ一覧', to: '/comics' },
    { label: content.value?.title || '' },
  ]
})

/** SEO用画像 */
const imageSrc = computed<string | null>(() => {
  if (!content.value) { return null }
  return content.value.image.url.replace('https://images.microcms-assets.io', 'microcms')
})

useSeoMeta({
  title: `「おとふだびより♪」${title.value}｜音札ポータル`,
  ogTitle: `「おとふだびより♪」${title.value}｜音札ポータル`,
  description: '「おとふだびより♪」は音札の世界をゆる〜くお届けする4コマ漫画です！',
  ogDescription: '「おとふだびより♪」は音札の世界をゆる〜くお届けする4コマ漫画です！',
  ogImage: imageSrc.value,
  twitterCard: 'summary',
})
</script>

<template>
  <div class="comic">
    <Head>
      <Title>{{ title }}</Title>
    </Head>

    <div class="breadcrumb">
      <UBreadcrumb :links="breadcrumbLinks" />
    </div>

    <HeadingTitle>
      {{ title }}
      <template #sub>
        Comics
      </template>
    </HeadingTitle>

    <div
      v-if="pending"
      class="loading"
    >
      Loading...
    </div>

    <div
      v-else-if="content"
      class="comic-img"
    >
      <NuxtPicture
        :src="content.image.url.replace('https://images.microcms-assets.io', 'microcms')"
        :alt="title"
        format="webp"
        sizes="320"
      />
    </div>

    <div
      v-else
      class="error"
    >
      マンガが見つかりません
    </div>

    <ShareButtons
      v-if="content"
      :text="content.title"
    />

    <div class="comic-menu">
      <UButton
        icon="i-heroicons-arrow-left"
        size="lg"
        color="primary"
        variant="outline"
        label="一覧にもどる"
        to="/comics"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.comic {
  .breadcrumb {
    margin: 0 1rem 1rem 1rem;
  }

  .comic-img {
    display: flex;
    justify-content: center;
    margin: 2rem 0;

    img {
      width: calc(100% - 2rem);
      max-width: 400px;
    }
  }

  .share {
    margin-bottom: 1rem;
  }

  .comic-menu {
    display: flex;
    justify-content: center;
    padding: 1rem;
  }
}
</style>
