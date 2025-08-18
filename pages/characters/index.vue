<script lang="ts" setup>
import type SimpleParallax from 'simple-parallax-js'
import { characters } from '~/assets/characters'

const title = ref('キャラクター')

const instances: SimpleParallax[] = []

const { onLoaded } = useScriptNpm({
  packageName: 'simple-parallax-js',
  file: 'dist/simpleParallax.min.js',
  version: '5.6.2',
  scriptOptions: {
    use() {
      return { SimpleParallax: window.simpleParallax }
    },
    trigger: 'client',
  },
})

onMounted(() => {
  onLoaded(({ SimpleParallax }) => {
    const parallaxConfig = [
      { scale: 1.5, el: document.querySelector<HTMLImageElement>('.pictures .character.--kanon > img')! },
      { scale: 1.75, el: document.querySelector<HTMLImageElement>('.pictures .character.--kadone > img')! },
      { scale: 1.75, el: document.querySelector<HTMLImageElement>('.pictures .character.--kunon > img')! },
      { scale: 1.5, el: document.querySelector<HTMLImageElement>('.pictures .character.--hirono > img')! },
    ]

    parallaxConfig.forEach((config) => {
      instances.push(new SimpleParallax(config.el, {
        delay: 1,
        orientation: 'down',
        scale: config.scale,
        transition: 'cubic-bezier(0, 0, 0, 1)',
        overflow: true,
      }))
    })
  })
})

onUnmounted(() => {
  instances.forEach(instance => instance.destroy())
})

useSeoMeta({
  title: `${title.value}｜音札ポータル`,
  ogTitle: `${title.value}｜音札ポータル`,
  description: '音札のストーリーとキャラクターを紹介するページです！',
  ogDescription: '音札のストーリーとキャラクターを紹介するページです！',
  ogImage: '/thumb.png',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div class="characters">
    <Head>
      <Title>{{ title }}</Title>
    </Head>

    <CommonHeadingTitle>
      ストーリー
      <template #sub>
        Story
      </template>
    </CommonHeadingTitle>

    <div class="pictures">
      <NuxtPicture
        format="webp"
        class="character --kanon"
        sizes="640"
        src="/characters/ac/kanon.png"
      />
      <NuxtPicture
        format="webp"
        class="character --kadone"
        sizes="640"
        src="/characters/ac/kadone.png"
      />
      <NuxtPicture
        format="webp"
        class="character --kunon"
        sizes="640"
        src="/characters/ac/kunon.png"
      />
      <NuxtPicture
        format="webp"
        class="character --hirono"
        sizes="640"
        src="/characters/ac/hirono.png"
      />
    </div>

    <div class="story">
      <IntersectionContent>
        <p>これは、ある世界の物語</p>
      </IntersectionContent>

      <IntersectionContent>
        <p>時は2466年、人類は地球上に蓄えられていた化石燃料や資源を使い果たし、衰退の一途を辿っていた。</p>
      </IntersectionContent>

      <IntersectionContent>
        <p>しかし、100年前に突如発見された音を原料にしたエネルギー、音エネルギーにより衰退を一時的に止めることに成功し、復興の兆しが、見え始めていた。</p>
      </IntersectionContent>

      <IntersectionContent>
        <p>だが、音エネルギーの発展とともに音怪と言われる怪物が地上に出現するようになった。</p>
      </IntersectionContent>

      <IntersectionContent>
        <p>そして、その同時期に音怪を狩る組織が結成された。</p>
      </IntersectionContent>

      <IntersectionContent>
        <p>これはその組織に所属する少女たちの物語である。</p>
      </IntersectionContent>
    </div>

    <CommonHeadingTitle>
      {{ title }}
      <template #sub>
        Characters
      </template>
    </CommonHeadingTitle>

    <div class="character-links">
      <NuxtLink
        v-for="character in characters"
        :key="`characters-${character.id}`"
        :to="`/characters/${character.id}`"
      >
        <NuxtPicture
          format="webp"
          sizes="250"
          :src="`/characters/button/${character.id}.png`"
        />
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/_vars.scss" as vars;

.characters {
  .pictures {
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
    margin-top: -5%;
    margin-bottom: -10%;

    > .character {
      position: relative;
      justify-self: center;
      min-width: 175%;
      aspect-ratio: 1 / 2;

      &.--kanon,
      &.--hirono {
        top: 10%;
      }

      &.--kadone,
      &.--kunon {
        top: 5%;
      }

      img {
        aspect-ratio: 1 / 2;
        object-fit: contain;
      }
    }
  }

  .story {
    padding-top: 2rem;
    text-align: center;
    line-height: 2;
    font-size: 1.25rem;
    font-weight: bold;
    position: relative;
    z-index: 2;
    background: rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(0.25rem);

    p {
      background-image: linear-gradient(135deg, #0080b3 0%, #47caff 100%);
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
      padding: 0 2rem;
      margin-bottom: 2rem;
    }
  }

  .character-links {
    margin: 2rem 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, 10rem);
    justify-content: center;
    gap: 0 0.5rem;

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 10rem;
    }
  }
}

@media (max-width: vars.$spwidth) {
  .characters .pictures {
    grid-template-columns: 50% 50%;
    grid-template-rows: auto auto auto auto auto;
    padding: 0 15%;
    margin-top: -15%;
    margin-bottom: -120%;
    overflow: hidden;

    > .character {
      position: static;
      min-width: 200%;
      top: 0;
      margin-bottom: -315%;

      &.--hirono {
        grid-column: 2;
        grid-row: 3;
      }

      &.--kadone {
        grid-column: 1;
        grid-row: 4;
      }

      &.--kunon {
        grid-column: 2;
        grid-row: 5;
        z-index: 1;
        margin-bottom: 30%;
      }
    }
  }
}
</style>
