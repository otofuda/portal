<script lang="ts" setup>
const route = useRoute()

const props = defineProps<{
  // シェアするテキスト
  text: string
}>()

const text = computed(() => props.text + ' | 音札ポータル')
const url = 'https://otofuda.com' + route.fullPath

const twitterLink = computed(() => {
  return `https://twitter.com/intent/tweet?text=${encodeURI(text.value)}&url=${url}&hashtags=音札&via=otofuda`
})

const facebookLink = computed(() => {
  return `https://www.facebook.com/sharer.php?quote=${encodeURI(text.value)}&u=${url}`
})

const lineLink = computed(() => {
  return `https://line.me/R/share?text=${encodeURI(text.value)}%20${url}`
})

const onShare = () => {
  navigator.share({
    text: text.value,
    url,
  })
}
</script>

<template>
  <div class="share">
    <UBadge
      color="neutral"
      variant="subtle"
    >
      共有
    </UBadge>
    <!-- X(Twitter) -->
    <UButton
      icon="i-fa6-brands-x-twitter"
      size="lg"
      color="primary"
      :ui="{ base: 'rounded-full' }"
      variant="outline"
      :to="twitterLink"
      target="_blank"
    />
    <!-- Facebook -->
    <UButton
      icon="i-fa6-brands-facebook"
      size="lg"
      color="primary"
      :ui="{ base: 'rounded-full' }"
      variant="outline"
      :to="facebookLink"
      target="_blank"
    />
    <!-- LINE -->
    <UButton
      icon="i-fa6-brands-line"
      size="lg"
      color="primary"
      :ui="{ base: 'rounded-full' }"
      variant="outline"
      :to="lineLink"
      target="_blank"
    />
    <!-- 共有 -->
    <UButton
      icon="i-heroicons-share"
      size="lg"
      color="primary"
      :ui="{ base: 'rounded-full' }"
      variant="outline"
      @click="onShare"
    />
  </div>
</template>

<style lang="scss" scoped>
.share {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}
</style>
