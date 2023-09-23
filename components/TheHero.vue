<script lang="ts" setup>
import SimpleParallax from 'simple-parallax-js'

const instances: SimpleParallax[] = []

onMounted(() => {
  const parallaxConfig = [
    { scale: 1.25, el: document.querySelector<HTMLImageElement>('img.character.--kanon')! },
    { scale: 1.5, el: document.querySelector<HTMLImageElement>('img.character.--kadone')! },
    { scale: 1.75, el: document.querySelector<HTMLImageElement>('img.character.--kunon')! },
    { scale: 1.5, el: document.querySelector<HTMLImageElement>('img.character.--hirono')! },
    { scale: 1.25, el: document.querySelector<HTMLImageElement>('img.character.--shuon')! }
  ]

  parallaxConfig.forEach((config) => {
    instances.push(new SimpleParallax(config.el, {
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
    <img class="character --kanon" src="~/assets/characters/kanon.png">
    <img class="character --kadone" src="~/assets/characters/kadone.png">
    <img class="character --kunon" src="~/assets/characters/kunon.png">
    <img class="character --hirono" src="~/assets/characters/hirono.png">
    <img class="character --shuon" src="~/assets/characters/shuon.png">

    <div class="text">
      花札 × 対戦 × 音楽
    </div>

    <div class="buttons">
      <a href="https://j.mp/otofuda" target="_blank">
        <img class="--arcade" src="~/assets/button_arcade.png">
      </a>
      <a href="https://etude.otofuda.com/" target="_blank">
        <img class="--etude" src="~/assets/button_etude.png">
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
  }

  .text {
    position: absolute;
    justify-self: center;
    bottom: 32%;
    background: $bg;
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
    bottom: 2rem;
    display: flex;
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

    .text {
      top: 20rem;
      bottom: unset;
      z-index: 10;
      writing-mode: vertical-rl;
      font-size: 2rem;
      padding: 1rem 0;
    }

    .buttons {
      bottom: 1rem;
      flex-direction: column;
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
