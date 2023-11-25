<script lang="ts" setup>
import type { BreadcrumbLink } from '@nuxt/ui/dist/runtime/types'
import type { ComicInfo, ComicPayload } from '~/types/comics'

const route = useRoute()
const runtimeConfig = useRuntimeConfig()

const { data, pending } = await useAsyncData<ComicPayload>('comics', () => {
  return $fetch(`${runtimeConfig.public.apiBase}api/v1/comics`, {
    params: { limit: 1000 },
    headers: { 'X-MICROCMS-API-KEY': runtimeConfig.public.apiToken }
  })
})

const content = computed<ComicInfo | null>(() => {
  if (!data.value) { return null }
  return data.value.contents.find((comic) => {
    return route.params.id.includes(comic.id)
  }) || null
})

const title = ref(content.value?.title)

const links = computed<BreadcrumbLink[]>(() => {
  return [
    { label: 'TOP', icon: 'i-heroicons-home', to: '/' },
    { label: 'マンガ一覧', to: '/comics' },
    { label: content.value?.title || '' }
  ]
})
</script>

<template>
  <div class="comic">
    <Head>
      <Title>{{ title }}</Title>
    </Head>

    <div class="breadcrumb">
      <UBreadcrumb :links="links" />
    </div>

    <HeadingTitle>{{ title }}</HeadingTitle>

    <div v-if="pending" class="loading">
      Loading...
    </div>

    <div v-else-if="content" class="comic-img">
      <NuxtPicture
        :src="content.image.url.replace('https://images.microcms-assets.io', 'microcms')"
        :alt="title"
      />
    </div>

    <div v-else class="error">
      マンガが見つかりません
    </div>

    <ShareButtons v-if="content" :text="content.title" />

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
