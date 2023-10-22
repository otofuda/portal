<script lang="ts" setup>
interface NavLink {
  title: string;
  class: string;
  url: string;
  disabled?: boolean;
}

const navLinks: NavLink[] = [
  { title: 'TOP', class: 'top', url: '/' },
  { title: 'お知らせ', class: 'news', url: '/news' },
  { title: 'キャラクター', class: 'character', url: '/characters', disabled: true },
  { title: '収録楽曲', class: 'songs', url: '/songs' },
  { title: 'マンガ', class: 'comics', url: '/comics' }
]

const emit = defineEmits<{(e: 'close-nav'): void}>()
</script>

<template>
  <div class="nav-links">
    <ul>
      <li v-for="(link, i) in navLinks" :key="`navlink-${i}`">
        <NuxtLink
          :to="link.disabled ? undefined : link.url"
          :class="`--${link.class}`"
          @click="emit('close-nav')"
        >
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
      color: transparent;
      text-decoration: none;
      aspect-ratio: 1438 / 380;
      background-size: contain;

      &.--top {
        background-image: url("~/assets/nav/top_1.png");

        &.router-link-active {
          background-image: url("~/assets/nav/top_2.png");
        }
      }

      &.--news {
        background-image: url("~/assets/nav/news_1.png");

        &.router-link-active {
          background-image: url("~/assets/nav/news_2.png");
        }
      }

      &.--character {
        opacity: 0.5;
        background-image: url("~/assets/nav/character_1.png");

        &.router-link-active {
          background-image: url("~/assets/nav/character_2.png");
        }
      }

      &.--songs {
        background-image: url("~/assets/nav/songs_1.png");

        &.router-link-active {
          background-image: url("~/assets/nav/songs_2.png");
        }
      }

      &.--comics {
        background-image: url("~/assets/nav/comics_1.png");

        &.router-link-active {
          background-image: url("~/assets/nav/comics_2.png");
        }
      }
    }
  }
}
</style>
