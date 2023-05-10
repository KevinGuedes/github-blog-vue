import { GitHubApi } from '@/lib/gitHubApi'
import type { Post } from '@/models/post.model'

export const usePostsStore = defineStore('posts', () => {
  const posts = ref<Post[]>([])
  const isLoadingPosts = ref(false)

  async function getPostsByQuery(query: string = '') {
    posts.value = await GitHubApi.getPostsByQuery(query)
    console.log(posts.value)
  }

  function setIsLoadingPostsTo(value: boolean) {
    isLoadingPosts.value = value
  }

  const postsCount = computed(() => posts.value.length)
  const isEmptyResult = computed(() => posts.value.length === 0)

  return {
    posts: readonly(posts),
    isLoadingPosts: readonly(isLoadingPosts),
    postsCount,
    isEmptyResult,
    getPostsByQuery,
    setIsLoadingPostsTo
  }
})
