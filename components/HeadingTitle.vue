<script lang="ts" setup></script>

<template>
  <h1 class="heading">
    <span v-if="$slots['sub']" class="sub">
      <slot name="sub" />
    </span>

    <span class="title">
      <slot />
    </span>
  </h1>
</template>

<style lang="scss" scoped>
.heading {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: bold;
  font-size: 1.5rem;
  padding: 0 1rem;
  margin: 0;

  .title {
    z-index: 1;
    background-image: $otofuda-gradient;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }

  .sub {
    user-select: none;
    font-size: 2.5rem;
    margin-bottom: -2rem;
    transform: scaleX(1.25);
    opacity: 0.5;
    text-transform: uppercase;
    background-clip: text;
    background-image: $otofuda-gradient;
    color: $bg;
    padding: 1px;
    -webkit-text-stroke-color: transparent;
    -webkit-text-stroke-width: 2px;
  }
}
</style>
