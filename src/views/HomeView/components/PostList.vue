<template>
  <ul v-if="hasResults">
    <PostCard v-for="post in posts" :key="post.number" :post="post" v-motion-fade-visible-once />
  </ul>
  <NoResults v-else />
</template>

<script setup lang="ts">
import { usePostsStore } from '@/stores/posts'

const postsStore = usePostsStore()
await postsStore.fetchPostsByQuery()
const { posts } = storeToRefs(postsStore)

const hasResults = computed(() => posts.value.length > 0)
</script>

<style scoped lang="scss">
ul {
  gap: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(21rem, 100%), 1fr));
  list-style: none;

  &:has(li:hover) {
    li:not(:hover) {
      opacity: 0.5;
    }
  }

  li:hover {
    scale: 1.01;
  }
}
</style>
