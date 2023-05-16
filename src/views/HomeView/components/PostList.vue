<template>
  <div v-if="isLoadingPosts" class="spinner-container">
    <LoadSpinner loading-message="Loading posts..." :show-background="false" />
  </div>
  <NoResults v-else-if="isEmptyResult" />
  <ul v-else>
    <PostCard v-for="post in posts" :key="post.number" :post="post" v-motion-fade-visible-once />
  </ul>
  <div class="page-management">
    <button :disabled="isFirstPage" @click="prev">
      <icon-ep:arrow-left-bold />
    </button>
    <span>{{ currentPage }} / {{ pageCount }}</span>
    <button :disabled="isLastPage" @click="next">
      <icon-ep:arrow-right-bold />
    </button>
  </div>
</template>

<script setup lang="ts">
import { usePostsStore } from '@/stores/posts.store'

const postsStore = usePostsStore()
const { posts, isEmptyResult, isLoadingPosts, numebrOfPostsFound } = storeToRefs(postsStore)

await postsStore.getPostsByQuery()

async function fetchData() {
  postsStore.setIsLoadingPostsTo(true)
  await postsStore.getPostsByQuery(currentPage.value)
}

const { currentPage, pageCount, isFirstPage, isLastPage, prev, next } = useOffsetPagination({
  total: numebrOfPostsFound,
  page: 1,
  pageSize: postsStore.postsPerPage,
  onPageChange: fetchData
})
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

.spinner-container {
  height: 16.25rem;
  display: flex;
  justify-content: center;
}

.page-management {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;

  button {
    width: 4rem;
    padding: 0.75rem;
    background-color: $brand-blue;
    border-radius: 6px;
    border: none;
    color: $title-color;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      transition: background-color 0.2s;
      background: $brand-blue-lighter;
    }
  }
}
</style>
