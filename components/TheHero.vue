<script lang="ts" setup>
import type SimpleParallax from 'simple-parallax-js'

const instances: SimpleParallax[] = []

onMounted(async () => {
  const SimpleParallax = await import('simple-parallax-js')

  const parallaxConfig = [
    { scale: 1.25, el: document.querySelector<HTMLImageElement>('.character.--kanon > img')! },
    { scale: 1.5, el: document.querySelector<HTMLImageElement>('.character.--kadone > img')! },
    { scale: 1.75, el: document.querySelector<HTMLImageElement>('.character.--kunon > img')! },
    { scale: 1.5, el: document.querySelector<HTMLImageElement>('.character.--hirono > img')! },
    { scale: 1.25, el: document.querySelector<HTMLImageElement>('.character.--shuon > img')! }
  ]

  parallaxConfig.forEach((config) => {
    // eslint-disable-next-line new-cap
    instances.push(new SimpleParallax.default(config.el, {
      delay: 1,
      orientation: 'down',
      scale: config.scale,
      transition: 'cubic-bezier(0, 0, 0, 1)',
      overflow: true
    }))
  })
})

onUnmounted(() => {
  instances.forEach(instance => instance.destroy())
})
</script>

<template>
  <div class="hero">
    <NuxtPicture format="webp" class="character --kanon" sizes="640" src="/characters/kanon.png" />
    <NuxtPicture format="webp" class="character --kadone" sizes="640" src="/characters/kadone.png" />
    <NuxtPicture format="webp" class="character --kunon" sizes="640" src="/characters/kunon.png" />
    <NuxtPicture format="webp" class="character --hirono" sizes="640" src="/characters/hirono.png" />
    <NuxtPicture format="webp" class="character --shuon" sizes="640" src="/characters/shuon.png" />

    <div class="copy">
      <span>これまでにない、新感覚<wbr>「対戦型音楽カードゲーム」</span>
    </div>

    <div class="text">
      花札 × 対戦 × 音楽
    </div>

    <div class="buttons">
      <a href="https://arcade.otofuda.com" target="_blank">
        <NuxtImg format="webp" :width="500" class="--arcade" src="/assets/button_arcade.png" />
      </a>
      <a href="https://etude.otofuda.com/" target="_blank">
        <NuxtImg format="webp" :width="500" class="--etude" src="/assets/button_etude.png" />
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hero {
  position: relative;
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  padding-bottom: 8rem;
  overflow: hidden;

  > .character {
    position: relative;
    justify-self: center;
    min-width: 125%;
    aspect-ratio: 1 / 2;

    &.--kanon,
    &.--shuon {
      top: -5%;
    }

    &.--kadone,
    &.--hirono {
      top: -10%;
    }

    &.--kunon {
      top: -15%;
    }

    img {
      aspect-ratio: 1 / 2;
      object-fit: contain;
    }
  }

  .copy {
    position: absolute;
    justify-self: center;
    bottom: 30%;
    padding: 0.25rem 0.5rem;
    background: rgba($bg, 0.8);
    backdrop-filter: blur(0.5rem);
    box-shadow: 0 0.25rem 0.5rem -0.25rem rgba($green, 0.5);

    > span {
      font-weight: bold;
      font-size: 1rem;
      color: transparent;
      background-image: linear-gradient(135deg, $green, $blue);
      background-clip: text;
      background-origin: border-box;
    }
  }

  .text {
    position: absolute;
    justify-self: center;
    bottom: calc(30% + 2.5rem);
    padding: 0 0.5rem;
    font-weight: bold;
    font-size: 2rem;
    color: $bg;
    background: linear-gradient(135deg, $green, $blue);
    text-shadow: 0 0.25rem 0.5rem rgba($text, 0.25);
    box-shadow: 0 0.5rem 1rem -0.25rem rgba($blue, 0.5);
  }

  .buttons {
    position: absolute;
    width: 100%;
    bottom: 2rem;
    display: grid;
    grid-template-columns: 50% 50%;
    justify-items: center;
    padding: 0 5%;
    gap: 5%;

    img.--arcade {
      filter: drop-shadow(0 0.25rem 0.5rem rgba($blue, 0.4));
    }

    img.--etude {
      filter: drop-shadow(0 0.25rem 0.5rem rgba($green, 0.2));
    }
  }
}

@media (max-width: $spwidth) {
  .hero {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto auto auto auto;
    margin-top: -10%;
    margin-bottom: 1rem;
    padding: 0;

    > .character {
      position: static;
      min-width: 115%;
      top: 0;
      margin-bottom: -160%;

      &.--shuon {
        grid-column: 2;
        grid-row: 2;
        z-index: 2;
      }

      &.--kadone {
        grid-column: 1;
        grid-row: 3;
        z-index: 3;
      }

      &.--hirono {
        grid-column: 2;
        grid-row: 4;
        z-index: 4;
      }

      &.--kunon {
        grid-column: 1;
        grid-row: 5;
        z-index: 5;
        margin-bottom: 30%;
      }
    }

    .copy {
      top: 4rem;
      height: 12rem;
      z-index: 10;
      bottom: unset;
      writing-mode: vertical-rl;
      font-size: 1rem;
      word-break: keep-all;
      background: transparent;
      backdrop-filter: none;
      box-shadow: none;
      transform: skewY(-10deg);
    }

    .text {
      top: 20rem;
      bottom: unset;
      z-index: 10;
      writing-mode: vertical-rl;
      font-size: 2rem;
      padding: 1rem 0;
    }

    .buttons {
      grid-template-rows: auto auto;
      grid-template-columns: 1fr;
      bottom: 1rem;
      gap: 1rem;
      z-index: 10;
    }
  }
}

@keyframes parallax-layer {
  from {
    transform: translateY(500px);
  }
  to {
    transform: translateY(0px);
  }
}
</style>
