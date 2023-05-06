import { gitHubApi } from '@/lib/gitHubApi'

const user: string = import.meta.env.VITE_USER
const repo: string = import.meta.env.VITE_REPO

export interface Post {
  number: number
  title: string
  body: string
  comments: number
  html_url: string
  created_at: string
  user: {
    login: string
  }
}

export const usePostsStore = defineStore('posts', () => {
  const posts = ref<Post[]>([])

  async function fetchPostsByQuery(query: string = '') {
    const postsResponse = await gitHubApi.get<{ items: Post[] }>('search/issues', {
      headers: {
        accept: 'application/vnd.github+json'
      },
      params: {
        q: `repo:${user}/${repo} is:issue ${query}`,
        sort: 'updated'
      }
    })

    console.log(postsResponse.data.items)

    posts.value = postsResponse.data.items
  }

  return { posts, fetchPostsByQuery }
})
