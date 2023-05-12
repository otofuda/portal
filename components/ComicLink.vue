<script lang="ts" setup>
import { ComicInfo } from '~/types/comics'

const props = defineProps<{
  comic: ComicInfo;
}>()
</script>

<template>
  <NuxtLink :to="`comics/${props.comic.id}`" class="comic-link">
    <strong class="title">{{ props.comic.title }}</strong>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.comic-link {
  color: $primary;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  padding: 1rem;

  .title {
    font-size: 1.25rem;
  }
}
</style>
