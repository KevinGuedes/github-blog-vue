import { GitHubApi } from '@/lib/gitHubApi'
import type { Post } from '@/models/post.model'

export const usePostsStore = defineStore('posts', () => {
  const postsPerPage = 6
  const posts = ref<Post[]>([])
  const isLoadingPosts = ref(false)
  const numebrOfPostsFound = ref(0)
  const query = ref('')

  const isEmptyResult = computed(() => posts.value.length === 0)

  async function getPostsByQuery(page: number = 1) {
    const postsResponse = await GitHubApi.getPosts(query.value, page, postsPerPage)
    posts.value = postsResponse.posts
    numebrOfPostsFound.value = postsResponse.numebrOfPostsFound
    setIsLoadingPostsTo(false)
  }

  function setIsLoadingPostsTo(value: boolean) {
    isLoadingPosts.value = value
  }

  function setQuery(value: string) {
    query.value = value
  }

  return {
    posts: readonly(posts),
    isLoadingPosts: readonly(isLoadingPosts),
    numebrOfPostsFound: readonly(numebrOfPostsFound),
    postsPerPage,
    setQuery,
    isEmptyResult,
    getPostsByQuery,
    setIsLoadingPostsTo
  }
})
