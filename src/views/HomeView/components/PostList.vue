<template>
  <div v-if="isLoadingPosts">
    <LoadSpinner loading-message="Loading posts..." />
  </div>
  <NoResults v-else-if="isEmptyResult" />
  <ul v-else>
    <!-- <PostCard v-for="post in posts" :key="post.number" :post="post" v-motion-fade-visible-once /> -->
    <PostCard v-for="post in posts" :key="post.number" :post="post" />
  </ul>
</template>

<script setup lang="ts">
import { usePostsStore } from '@/stores/posts.store'

const postsStore = usePostsStore()
await postsStore.getPostsByQuery()
const { posts, isEmptyResult, isLoadingPosts } = storeToRefs(postsStore)
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
