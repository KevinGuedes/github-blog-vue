import type { Post } from '@/models/post.model'
import type { ProfileData } from '@/models/profile.model'
import axios from 'axios'

const accessToken: string = import.meta.env.VITE_GITHUB_ACCESS_TOKEN
const user: string = import.meta.env.VITE_USER
const repo: string = import.meta.env.VITE_REPO

const gitHubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: accessToken ? `Bearer ${accessToken}` : ''
  }
})

export class GitHubApi {
  static async getPostsByQuery(query: string = '') {
    const response = await gitHubApi.get<{ items: Post[] }>('search/issues', {
      headers: {
        accept: 'application/vnd.github+json'
      },
      params: {
        q: `repo:${user}/${repo} is:issue ${query}`,
        sort: 'updated'
      }
    })

    return response.data.items
  }

  static async getProfile(): Promise<ProfileData> {
    const response = await gitHubApi.get<ProfileData>(`users/${user}`)
    return response.data
  }
}
