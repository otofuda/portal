<script setup>
const navLinks = [
  { title: 'TOP', url: '/' },
  { title: 'お知らせ', url: '/news' },
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
    ul {
      display: flex;
      gap: 1rem;
      justify-content: center;
      padding: 0;

      li {
        list-style: none;
        a {
          color: $primary;
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
  }
}
</style>
