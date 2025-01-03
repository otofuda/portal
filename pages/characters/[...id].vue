<script lang="ts" setup>
import type { BreadcrumbLink } from '#ui/types'
import type SimpleParallax from 'simple-parallax-js'
import { characters } from '~/assets/characters'

const route = useRoute('characters-id')

const character = characters.find((character) => {
  return route.params.id && route.params.id.includes(character.id)
})

const title = `${character?.name} キャラクター紹介`

const breadcrumbLinks = computed<BreadcrumbLink[]>(() => {
  return [
    { label: 'TOP', icon: 'i-heroicons-home', to: '/' },
    { label: 'キャラクター', to: '/characters' },
    { label: character?.name || '？' }
  ]
})

let instance: SimpleParallax | null = null

onMounted(async () => {
  const SimpleParallax = await import('simple-parallax-js')
  const el = document.querySelector<HTMLImageElement>('.character .intro-image-picture > img')!
  // eslint-disable-next-line new-cap
  instance = new SimpleParallax.default(el, {
    delay: 1,
    orientation: 'down',
    scale: 1.5,
    transition: 'cubic-bezier(0, 0, 0, 1)',
    overflow: true
  })
})

onUnmounted(() => {
  instance?.destroy()
})

useSeoMeta({
  title: `${title}｜音札ポータル`,
  ogTitle: `${title}｜音札ポータル`,
  description: `音札のキャラクター「${character?.name}」の紹介ページです！`,
  ogDescription: `音札のキャラクター「${character?.name}」の紹介ページです！`,
  ogImage: '/thumb.png',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <div class="character">
    <Head>
      <Title>{{ title }}</Title>
    </Head>

    <div class="breadcrumb">
      <UBreadcrumb :links="breadcrumbLinks" />
    </div>

    <div v-if="character" class="intro">
      <div class="intro-image">
        <NuxtPicture
          format="webp"
          class="intro-image-picture"
          sizes="640"
          :src="character.image"
        />
        <NuxtPicture
          format="webp"
          class="intro-image-battle"
          sizes="160"
          :src="character.battleImage"
        />
      </div>

      <div class="intro-info">
        <h1>
          <ruby>
            {{ character.name }}
            <rp>(</rp><rt>{{ character.ruby }}</rt><rp>)</rp>
          </ruby>
        </h1>

        <dl class="desclist">
          <dt>血液型</dt>
          <dd>{{ character.blood }}型</dd>
          <dt>身長</dt>
          <dd>{{ character.height }}cm</dd>
          <dt>体重</dt>
          <dd>{{ character.weight }}</dd>
          <dt>趣味</dt>
          <dd>{{ character.hobby }}</dd>
          <dt>好きな食べ物</dt>
          <dd>{{ character.favorite }}</dd>
        </dl>

        <UButton
          v-if="character.comic"
          icon="i-heroicons-book-open"
          size="lg"
          block
          color="primary"
          label="このキャラクターのマンガを見る"
          :to="character.comic"
        />
      </div>
    </div>

    <ShareButtons v-if="character" :text="character.name" />

    <div class="character-menu">
      <UButton
        icon="i-heroicons-arrow-left"
        size="lg"
        color="primary"
        variant="outline"
        label="一覧にもどる"
        to="/characters"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/_vars.scss" as vars;

.character {
  .breadcrumb {
    margin: 0 1rem 1rem 1rem;
  }

  .intro {
    display: grid;
    grid-template-columns: 2fr 3fr;
    grid-template-rows: 1fr;

    .intro-image {
      position: relative;

      .intro-image-battle {
        width: 7rem;
        position: absolute;
        bottom: 0;
        right: 0;

        &::before {
          position: absolute;
          left: 0;
          bottom: 0;
          z-index: -1;
          content: '';
          width: 7rem;
          height: 2.5rem;
          background: rgba(0, 0, 0, 0.25);
          border-radius: 50%;
        }
      }
    }

    .intro-info {
      padding: 0 1rem 0 0;

      h1 {
        margin: 0;
        font-size: 2.5rem;
        font-weight: bold;

        ruby {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
      }

      .desclist {
        padding: 1rem 0;
        display: grid;
        grid-template-columns: 7rem auto;
        justify-content: start;
        align-items: center;
        gap: 1rem 0.5rem;
        font-size: 0.9rem;
        margin-bottom: 2rem;
        background: rgba(255, 255, 255, 0.75);
        backdrop-filter: blur(0.25rem);

        dt {
          padding: 0.25rem 1rem;
          text-align: center;
          font-size: 0.7rem;
          font-weight: bold;
          color: vars.$bg;
          background: vars.$otofuda-gradient;
          clip-path: polygon(
            0% 50%,
            10% 0,
            90% 0,
            100% 50%,
            100% 50%,
            90% 100%,
            10% 100%,
            0% 50%
          );
        }
      }
    }
  }

  .share {
    margin-bottom: 1rem;
  }

  .character-menu {
    display: flex;
    justify-content: center;
    padding: 1rem;
  }
}

@media (max-width: vars.$spwidth) {
  .character {
    .intro {
      grid-template-columns: 1fr;
      grid-template-rows: 30rem auto;

      .intro-image {
        max-width: 20rem;
        justify-self: center;

        .intro-image-battle {
          bottom: -4rem;
        }
      }

      .intro-info {
        z-index: 1;
        padding: 1rem 1rem 2rem 1rem;
      }
    }
  }
}
</style>
