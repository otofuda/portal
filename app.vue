<template>
  <div>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<style lang="scss">
body {
  font-family: ui-sans-serif,"ui-sans-serif override",system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
  line-height: 1.5;
}

.page-enter-active,
.page-leave-active {
  position: relative;
  left: 0;
  transition: all 0.25s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  left: -1rem;
}
</style>
