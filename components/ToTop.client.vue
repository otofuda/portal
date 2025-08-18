<script lang="ts" setup>
const showButton = ref<boolean>(false)

onMounted(() => {
  const mainEl = document.querySelector('main')!
  const height = window.innerHeight

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      showButton.value = entry.isIntersecting
    })
  }, {
    rootMargin: `${0}px 0px ${-height}px 0px`,
    threshold: [0],
  })
  observer.observe(mainEl)
})

const goToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
</script>

<template>
  <div class="top">
    <Transition name="top">
      <button
        v-show="showButton"
        @click="goToTop"
      >
        <NuxtImg
          format="webp"
          :width="98"
          :height="104"
          src="/assets/top.png"
          alt="TOPへ"
        />
      </button>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/_vars.scss" as vars;

.top {
  cursor: pointer;
  position: fixed;
  z-index: 10;
  bottom: 0;
  right: 0;
  padding: 1rem;

  button img {
    filter: drop-shadow(0 0.125rem 0.25rem rgba(vars.$blue, 0.4));
  }
}

.top-enter-active,
.top-leave-active {
  transition: all 1s ease;
}

.top-enter-from,
.top-leave-to {
  opacity: 0;
  transform: translateY(1rem);
}

@media (max-width: vars.$spwidth) {
  .top img {
    width: 5rem;
  }
}
</style>
