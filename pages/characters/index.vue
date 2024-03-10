<script lang="ts" setup>
import { characters } from '~/assets/characters'

const title = ref('キャラクター')
</script>

<template>
  <div class="characters">
    <Head>
      <Title>{{ title }}</Title>
    </Head>

    <HeadingTitle>
      ストーリー
      <template #sub>
        Story
      </template>
    </HeadingTitle>

    <div class="story">
      <p>これは、ある世界の物語</p>
      <p>時は2466年、人類は地球上に蓄えられていた化石燃料や資源を使い果たし、衰退の一途を辿っていた。</p>
      <p>しかし、100年前に突如発見された音を原料にしたエネルギー、その音エネルギーにより衰退を一時的に止めることに成功し、復興の兆しが、見え始めていた。</p>
      <p>だが、音エネルギーの発展とともに音怪と言われる怪物が地上に出現するようになった。そして、その同時期に音怪を狩る組織が結成された。</p>
      <p>これはその組織に所属する2人の少女の物語である。</p>
    </div>

    <HeadingTitle>
      {{ title }}
      <template #sub>
        Characters
      </template>
    </HeadingTitle>

    <div class="character-links">
      <NuxtLink
        v-for="character in characters"
        :key="`characters-${character.id}`"
        :to="`/characters/${character.id}`"
      >
        {{ character.name }}
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.characters {
  .story {
    margin-top: 1rem;
    text-align: center;
    line-height: 2;

    p {
      padding: 0 2rem;
      margin-bottom: 2rem;
    }
  }

  .character-links {
    margin: 2rem 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, 8rem);
    justify-content: center;
    gap: 1rem;

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      height: 8rem;
      width: 8rem;
      background: $border;
      font-size: 1.5rem;
      font-weight: bold;
    }
  }
}
</style>
