<script lang="ts" setup>
const route = useRoute()
const showSpNav = ref<boolean>(false)
</script>

<template>
  <div
    class="layout"
  >
    <header>
      <NuxtLink to="/" class="logo">
        <img class="icon" src="~/assets/icon.png" alt="音札ポータル">
        <img class="type" src="~/assets/otofuda_portal.png" alt="音札ポータル">
      </NuxtLink>

      <div class="divider" />

      <UButton
        class="menu"
        icon="i-heroicons-bars-3"
        size="xl"
        color="primary"
        variant="ghost"
        @click="showSpNav = true"
      />
    </header>

    <!-- ナビゲーション(スマホ用) -->
    <USlideover v-model="showSpNav" class="nav --sp">
      <UButton
        icon="i-heroicons-x-mark"
        size="xl"
        color="primary"
        variant="ghost"
        trailing
        @click="showSpNav = false"
      />
      <NavLinkList @close-nav="showSpNav = false" />
    </USlideover>

    <ClientOnly>
      <Transition name="hero">
        <TheHero v-if="route.name === 'index'" />
      </Transition>
    </ClientOnly>

    <!-- ナビゲーション(PC用) -->
    <nav class="nav --pc">
      <NavLinkList />
    </nav>

    <main>
      <slot />
    </main>

    <footer>
      音札ポータルは、アーケード版「音札」やスマホ・PCで遊べる「音札Étude」の最新情報をお届けするポータルサイトです。

      <div class="banners">
        <a href="https://arcade.otofuda.com" target="_blank" rel="noopener noreferrer">
          <img src="~/assets/banners/banner_hp.png" alt="音札公式ホームページ">
        </a>
        <a href="https://www.youtube.com/@user-iw6ic4jl4b" target="_blank" rel="noopener noreferrer">
          <img src="~/assets/banners/banner_youtube.png" alt="YouTube公式チャンネル">
        </a>
      </div>

      <div class="icons">
        <UButton
          icon="i-fa6-brands-x-twitter"
          size="lg"
          color="gray"
          :ui="{ rounded: 'rounded-full' }"
          variant="ghost"
          to="https://twitter.com/otofuda"
          target="_blank"
        />
        <UButton
          icon="i-fa6-brands-instagram"
          size="lg"
          color="gray"
          :ui="{ rounded: 'rounded-full' }"
          variant="ghost"
          to="https://www.instagram.com/otfdpr/"
          target="_blank"
        />
        <UButton
          icon="i-fa6-brands-youtube"
          size="lg"
          color="gray"
          :ui="{ rounded: 'rounded-full' }"
          variant="ghost"
          to="https://www.youtube.com/@user-iw6ic4jl4b"
          target="_blank"
        />
        <UButton
          icon="i-fa6-brands-github"
          size="lg"
          color="gray"
          :ui="{ rounded: 'rounded-full' }"
          variant="ghost"
          to="https://github.com/otofuda"
          target="_blank"
        />
      </div>

      © 音札プロジェクト
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  display: grid;
  grid-template-columns: 20rem minmax(0, $spwidth);
  justify-content: center;

  header {
    grid-column: 1 / 3;
    padding: 1rem;
    display: flex;
    gap: 0.5rem;
    align-items: center;

    .logo {
      margin: 0;
      display: flex;
      align-items: center;

      .icon {
        width: 3rem;
      }

      .type {
        height: 3rem;
        max-width: calc(100vw - 130px);
        object-fit: contain;
      }
    }

    .divider {
      height: 2px;
      background: $primary;
      flex-grow: 1;
      opacity: 0.25;
    }

    .menu {
      display: none;
    }
  }

  .hero {
    grid-column: 1 / 3;
  }

  .nav.--pc {
    grid-column: 1 / 2;
    background: $bg;
    margin: 1rem;
    padding: 1rem 0;
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 0.25rem 0.5rem 0 $border;
    height: max-content;
    position: sticky;
    top: 2rem;
  }

  main {
    grid-column: 2 / 3;
    max-width: $spwidth;
    flex-grow: 1;
    color: $text;
  }

  footer {
    grid-column: 1 / 3;
    padding: 1rem 0;
    font-size: 0.75rem;
    color: $sub;
    text-align: center;
    border-top: 1px solid $border;

    .banners {
      display: flex;
      align-items: center;
      flex-direction: column;
      flex-wrap: wrap;
      gap: 1rem;
      margin: 1rem 0;

      a {
        width: 360px;
        max-width: 75%;

        img {
          border-radius: 00.5rem;
          width: 100%;
        }
      }
    }

    .icons {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 1rem;
      margin-bottom: 1rem;
    }
  }
}

@media (max-width: $spwidth) {
  .layout {
    display: flex;
    flex-direction: column;
    min-height: max-content;

    .nav.--pc {
      display: none;
    }

    header .menu {
      display: inline-flex;
    }
  }
}
</style>
