<script lang="ts" setup>
const emit = defineEmits<{ (e: 'close-nav'): void }>()
const imgWidth = 400
</script>

<template>
  <div class="nav-links">
    <ul>
      <li>
        <NuxtLink
          to="/"
          @click="emit('close-nav')"
        >
          <NuxtImg
            src="/assets/nav/top_1.png"
            format="webp"
            :width="imgWidth"
            alt="トップページ"
          />
          <NuxtImg
            src="/assets/nav/top_2.png"
            format="webp"
            :width="imgWidth"
            alt="トップページ"
          />
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/news"
          @click="emit('close-nav')"
        >
          <NuxtImg
            src="/assets/nav/news_1.png"
            format="webp"
            :width="imgWidth"
            alt="お知らせ"
          />
          <NuxtImg
            src="/assets/nav/news_2.png"
            format="webp"
            :width="imgWidth"
            alt="お知らせ"
          />
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/characters"
          @click="emit('close-nav')"
        >
          <NuxtImg
            src="/assets/nav/character_1.png"
            format="webp"
            :width="imgWidth"
            alt="キャラクター"
          />
          <NuxtImg
            src="/assets/nav/character_2.png"
            format="webp"
            :width="imgWidth"
            alt="キャラクター"
          />
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/songs"
          @click="emit('close-nav')"
        >
          <NuxtImg
            src="/assets/nav/songs_1.png"
            format="webp"
            :width="imgWidth"
            alt="収録楽曲"
          />
          <NuxtImg
            src="/assets/nav/songs_2.png"
            format="webp"
            :width="imgWidth"
            alt="収録楽曲"
          />
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/comics"
          @click="emit('close-nav')"
        >
          <NuxtImg
            src="/assets/nav/comics_1.png"
            format="webp"
            :width="imgWidth"
            alt="マンガ"
          />
          <NuxtImg
            src="/assets/nav/comics_2.png"
            format="webp"
            :width="imgWidth"
            alt="マンガ"
          />
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/_vars.scss" as vars;

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

      &.--disabled {
        opacity: 0.5;
      }

      img {
        min-width: 100%;
      }

      img:nth-child(2) {
        display: none;
      }

      &.router-link-active {
        img:nth-child(1) {
          display: none;
        }
        img:nth-child(2) {
          display: unset;
        }
      }
    }
  }
}
</style>
