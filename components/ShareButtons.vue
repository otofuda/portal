<script lang="ts" setup>
const props = defineProps<{
  // シェアするテキスト
  text: string;
}>()

const onTweet = () => {
  console.log(props.text)
}
</script>

<template>
  <div class="share">
    <UBadge color="gray" variant="soft">
      共有
    </UBadge>
    <!-- X(Twitter) -->
    <UButton
      icon="i-fa6-brands-x-twitter"
      size="lg"
      color="primary"
      :ui="{ rounded: 'rounded-full' }"
      variant="outline"
      @click="onTweet"
    />
    <!-- Facebook -->
    <UButton
      icon="i-fa6-brands-facebook"
      size="lg"
      color="primary"
      :ui="{ rounded: 'rounded-full' }"
      variant="outline"
      @click="onTweet"
    />
    <!-- LINE -->
    <UButton
      icon="i-fa6-brands-line"
      size="lg"
      color="primary"
      :ui="{ rounded: 'rounded-full' }"
      variant="outline"
      @click="onTweet"
    />
    <!-- 共有 -->
    <UButton
      icon="i-heroicons-share"
      size="lg"
      color="primary"
      :ui="{ rounded: 'rounded-full' }"
      variant="outline"
      @click="onTweet"
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
