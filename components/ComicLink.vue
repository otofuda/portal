<script lang="ts" setup>
import type { ComicInfo } from '~/types/comics'

const props = defineProps<{
  comic: ComicInfo;
}>()
</script>

<template>
  <NuxtLink :to="`comics/${props.comic.id}`" class="comic-link">
    <NuxtImg
      class="thumbnail"
      :src="props.comic.image.url.replace('https://images.microcms-assets.io', 'microcms')"
      format="webp"
      :width="160"
      :alt="props.comic.title"
    />
    <strong class="title">{{ props.comic.title }}</strong>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.comic-link {
  color: $primary;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  overflow: hidden;
  background-color: $bg-alt;

  .thumbnail {
    object-fit: cover;
    object-position: top center;
    aspect-ratio: 0.99;
  }

  .title {
    padding: 1rem;
    font-size: 1.25rem;
  }
}
</style>
