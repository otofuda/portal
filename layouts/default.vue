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
        <li v-for="link in navLinks">
          <NuxtLink :to="link.url">
            {{ link.title }}
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <main>
      <slot/>
    </main>

    <footer>
      © Otofuda Project
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  display: grid;
  grid-template-columns: 300px 1fr;

  header {
    grid-column: 1 / 3;
  }

  nav {
    ul li a {
      color: $primary;
    }
  }

  main {
    color: $text;
  }

  footer {
    grid-column: 1 / 3;
    font-size: 0.75rem;
    color: $sub;
  }
}
</style>
