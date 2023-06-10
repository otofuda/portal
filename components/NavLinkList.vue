<script lang="ts" setup>
const navLinks = [
  { title: 'TOP', url: '/' },
  { title: 'お知らせ', url: '/news' },
  { title: 'キャラクター', url: '/characters' },
  { title: 'マンガ', url: '/comics' },
  { title: '収録楽曲', url: '/songs' }
]

const emit = defineEmits<{(e: 'close-nav'): void}>()
</script>

<template>
  <div class="nav-links">
    <ul>
      <li v-for="(link, i) in navLinks" :key="`navlink-${i}`">
        <NuxtLink :to="link.url" @click="emit('close-nav')">
          {{ link.title }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
ul {
  display: flex;
  flex-direction: column;
  align-items: stretch;

  li {
    list-style: none;
    flex-shrink: 0;

    a {
      display: block;
      padding: 0.5rem 0.5rem;
      color: $primary;
      text-decoration: none;

      &.router-link-active {
        color: $bg;
        background: $primary;
      }
    }
  }
}
</style>
