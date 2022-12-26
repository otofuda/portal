<script lang="ts" setup>
const title = ref('お知らせ一覧')

const { data: contents } = await useAsyncData('content', () => {
  return $fetch('/api/_content/query?without=body')
})
</script>

<template>
  <div>
    <Head>
      <Title>{{ title }}</Title>
    </Head>

    <h1>{{ title }}</h1>

    <NuxtLink
      v-for="article in contents"
      :to="article._path"
      class="article"
    >
      <h2>{{ article.title }}</h2>
      {{ article.description }}
    </NuxtLink>
  </div>
</template>
