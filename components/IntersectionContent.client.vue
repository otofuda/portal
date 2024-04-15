<script lang="ts" setup>
const isVisible = ref(false)
const props = defineProps<{
  root?: IntersectionObserver['root'];
  rootMargin?: string;
  threshold?: number[];
}>()

const observer = new IntersectionObserver((entries) => {
  if (isVisible.value === false) {
    entries.forEach((entry) => {
      isVisible.value = entry.isIntersecting
    })
  }
}, {
  root: props.root || null,
  rootMargin: props.rootMargin || '0px 0px 0px 0px',
  threshold: props.threshold || [0.5]
})

const intersectionElement = ref<HTMLElement | null>(null)

onMounted(() => {
  nextTick(() => {
    if (intersectionElement.value) {
      observer.observe(intersectionElement.value)
    }
  })
})
</script>

<template>
  <div
    ref="intersectionElement"
    class="intersection"
    :class="{ '--visible': isVisible }"
  >
    <slot name="default" />
  </div>
</template>

<style lang="scss" scoped>
.intersection {
  opacity: 0;
  transition: all 2s ease;
  transform: translateY(1rem);

  &.--visible {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
