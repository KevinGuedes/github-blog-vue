import { GitHubApi } from '@/lib/gitHubApi'
import type { Post } from '@/models/post.model'

export const usePostsStore = defineStore('posts', () => {
  const posts = ref<Post[]>([])

  async function getPostsByQuery(query: string = '') {
    const postsResponse = await GitHubApi.getPostsByQuery(query)
    posts.value = postsResponse.data.items
  }

  return { posts, getPostsByQuery }
})
