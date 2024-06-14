<template>
  <ul class="background">
    <li v-for="i in 20" :key="`bg-li-${i}`" />
  </ul>
</template>

<style lang="scss" scoped>
@keyframes cube {
  from {
    transform: scale(0) rotate(0deg) translate(-50%, -50%);
    opacity: 0.15;
  }
  to {
    transform: scale(20) rotate(360deg) translate(-50%, -50%);
    opacity: 0;
  }
}

.background {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  background: #ffffff;
  overflow: hidden;
  z-index: -1;

  li {
    position: absolute;
    top: 80vh;
    left: 45vw;
    width: 10px;
    height: 10px;
    border-radius: 2px;
    border: solid 0.5px $green;
    color: transparent;
    transform-origin: top left;
    transform: scale(0) rotate(0deg) translate(-50%, -50%);
    animation: cube 13s ease-in forwards infinite;
  }

  li:nth-child(0) {
    animation-delay: 0s;
    left: 65vw;
    top: 4vh;
    border-color: #ffffff;
  }

  li:nth-child(0) {
    animation-delay: 0s;
    left: 65vw;
    top: 4vh;
    border-color: $blue;
  }

  li:nth-child(1) {
    animation-delay: 2s;
    left: 72vw;
    top: 87vh;
    border-color: $blue;
  }

  li:nth-child(2) {
    animation-delay: 4s;
    left: 41vw;
    top: 28vh;
  }

  li:nth-child(3) {
    animation-delay: 6s;
    left: 46vw;
    top: 44vh;
    border-color: $blue;
  }

  li:nth-child(4) {
    animation-delay: 8s;
    left: 31vw;
    top: 19vh;
  }

  li:nth-child(5) {
    animation-delay: 10s;
    left: 15vw;
    top: 94vh;
    border-color: $blue;
  }

  li:nth-child(6) {
    animation-delay: 12s;
    left: 83vw;
    top: 23vh;
  }

  li:nth-child(7) {
    animation-delay: 14s;
    left: 94vw;
    top: 7vh;
  }

  li:nth-child(8) {
    animation-delay: 16s;
    left: 62vw;
    top: 78vh;
  }

  li:nth-child(9) {
    animation-delay: 18s;
    left: 23vw;
    top: 33vh;
  }

  li:nth-child(10) {
    animation-delay: 20s;
    left: 58vw;
    top: 36vh;
    border-color: $blue;
  }

  li:nth-child(11) {
    animation-delay: 22s;
    left: 29vw;
    top: 14vh;
    border-color: $blue;
  }

  li:nth-child(12) {
    animation-delay: 24s;
    left: 53vw;
    top: 98vh;
    border-color: $blue;
  }

  li:nth-child(13) {
    animation-delay: 26s;
    left: 87vw;
    top: 51vh;
    border-color: $blue;
  }

  li:nth-child(14) {
    animation-delay: 28s;
    left: 78vw;
    top: 62vh;
  }

  li:nth-child(15) {
    animation-delay: 30s;
    left: 8vw;
    top: 47vh;
  }

  li:nth-child(16) {
    animation-delay: 32s;
    left: 95vw;
    top: 71vh;
    border-color: $blue;
  }

  li:nth-child(17) {
    animation-delay: 34s;
    left: 3vw;
    top: 84vh;
  }

  li:nth-child(18) {
    animation-delay: 36s;
    left: 36vw;
    top: 57vh;
  }

  li:nth-child(19) {
    animation-delay: 38s;
    left: 12vw;
    top: 66vh;
    border-color: $blue;
  }
}
</style>
