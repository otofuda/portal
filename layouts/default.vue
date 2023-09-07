<script lang="ts" setup>
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
        icon="i-heroicons-bars-3"
        size="xl"
        color="primary"
        variant="ghost"
        @click="showSpNav = true"
      />
    </header>

    <!-- ナビゲーション(PC用) -->
    <nav class="nav --pc">
      <NavLinkList />
    </nav>

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
  display: grid;
  grid-template-columns: 16rem minmax(0, 1fr);

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
  }

  .nav.--pc {
    margin: 1rem;
    padding: 1rem 0;
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 0.25rem 0.5rem 0 $border;
    height: max-content;
  }

  main {
    flex-grow: 1;
    color: $text;
  }

  footer {
    grid-column: 1 / 3;
    padding: 1rem 0;
    font-size: 0.75rem;
    color: $sub;
    text-align: center;
    border-top: 1px solid #ccc;

    .banners {
      display: flex;
      align-items: center;
      flex-direction: column;
      flex-wrap: wrap;
      gap: 1rem;
      margin-bottom: 1rem;

      a {
        width: 420px;
        max-width: 75%;

        img {
          width: 100%;
        }
      }
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
  }
}
</style>
