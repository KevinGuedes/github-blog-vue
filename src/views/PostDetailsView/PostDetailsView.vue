<template>
  <Transition name="fade" mode="out-in">
    <LoadSpinner v-if="isLoadingPosts" loading-message="Loading post..." :showBackground="true" />
    <article v-else-if="!isLoadingPosts && post">
      <PostHeader :post="post" />
      <PostViewer :postBody="post.body" />
    </article>
  </Transition>
</template>

<script setup lang="ts">
import type { Post } from '@/models/post.model'
import { usePostsStore } from '@/stores/posts.store'
const post = ref<Post>()

const route = useRoute()
const postsStore = usePostsStore()
const { isLoadingPosts } = storeToRefs(postsStore)
const postNumber = route.params.postNumber as string

onMounted(async () => {
  post.value = await postsStore.getPostDetailsByPostNumber(Number(postNumber))
})
</script>

<style scoped lang="scss">
div {
  article {
    > div {
      padding: 2.5rem 2rem;
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
