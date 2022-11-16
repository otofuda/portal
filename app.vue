<template>
  <div>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<style>
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
