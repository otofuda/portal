<script lang="ts" setup></script>

<template>
  <h1 class="heading">
    <slot />
  </h1>
</template>

<style lang="scss" scoped>
.heading {
  display: flex;
  justify-content: center;
  font-weight: bold;
  font-size: 1.5rem;
  padding: 0 1rem;
  margin: 0;
}
</style>
