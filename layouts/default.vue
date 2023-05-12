<script setup>
const navLinks = [
  { title: 'TOP', url: '/' },
  { title: 'お知らせ', url: '/news' },
  { title: 'キャラクター', url: '/characters' },
  { title: 'マンガ', url: '/comics' },
  { title: '収録楽曲', url: '/songs' }
]
</script>

<template>
  <div class="layout">
    <header>
      Otofuda Portal
    </header>

    <nav>
      <ul>
        <li v-for="(link, i) in navLinks" :key="`navlink-${i}`">
          <NuxtLink :to="link.url">
            {{ link.title }}
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <main>
      <slot />
    </main>

    <footer>
      <div class="banners">
        <a href="https://j.mp/otofuda" target="_blank" rel="noopener noreferrer">
          <img src="~/assets/banners/banner_hp.png" alt="音札公式ホームページ">
        </a>
        <a href="https://j.mp/otfdyt" target="_blank" rel="noopener noreferrer">
          <img src="~/assets/banners/banner_youtube.png" alt="YouTube公式チャンネル">
        </a>
      </div>

      © Otofuda Project
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: max-content;

  header {
    padding-top: 1rem;
    font-size: 1.5rem;
    text-align: center;
  }

  nav {
    display: flex;
    justify-content: center;

    ul {
      display: flex;
      justify-content: left;
      overflow-x: auto;
      padding: 1rem 0;

      li {
        list-style: none;
        flex-shrink: 0;

        a {
          padding: 0.25rem 0.5rem;
          color: $primary;
          text-decoration: none;

          &.router-link-active {
            color: $bg;
            background: $primary;
          }
        }
      }
    }
  }

  main {
    flex-grow: 1;
    color: $text;
  }

  footer {
    padding: 1rem 0;
    font-size: 0.75rem;
    color: $sub;
    text-align: center;
    border-top: 1px solid #ccc;

    .banners {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 1rem;

      a {
        img {
          width: 420px;
          max-width: 75%;
        }
      }
    }
  }
}
</style>
