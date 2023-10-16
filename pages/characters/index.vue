<script lang="ts" setup>
const title = ref('キャラクター')
</script>

<template>
  <div class="characters">
    <Head>
      <Title>{{ title }}</Title>
    </Head>

    <HeadingTitle>{{ title }}</HeadingTitle>

    <p class="caution">
      🏗️ このページは工事中です
    </p>
  </div>
</template>

<style lang="scss" scoped>
.characters {
  .caution {
    text-align: center;
    margin-top: 2rem;
  }
}
</style>
