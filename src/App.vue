<script setup lang="ts">
</script>

<template>
  <main>
    <img src="./assets/logo.png" class="logo" alt="音札" />
    <a href="https://www.ne.senshu-u.ac.jp/~proj2019-13/">
      <img src="./assets/banner_hp.png" class="link" alt="音札公式ホームページ" />
    </a>
    <a href="https://etude.otofuda.com">
      <img src="./assets/banner_etude.png" class="link" alt="音札Étude" />
    </a>
    <a href="https://twitter.com/otofuda" target="_blank">
      <img src="./assets/banner_twitter.png" class="link s" alt="Twitter" />
    </a>
    <a href="https://j.mp/otfdyt" target="_blank">
      <img src="./assets/banner_youtube.png" class="link s" alt="YouTube" />
    </a>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
}

.logo {
  width: 8em;
  margin-bottom: 3em;
}

.link {
  width: 25em;
  max-width: 100%;
  will-change: filter;
  transition: 0.5s filter ease;
  filter: drop-shadow(0 0 1em #64bcff00);
}

.link:hover {
  filter: drop-shadow(0 0 1em #64bcff88);
}

.link.s {
  width: 15em;
}
</style>
