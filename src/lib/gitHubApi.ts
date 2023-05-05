import axios from 'axios'

const accessToken: string = import.meta.env.VITE_GITHUB_ACCESS_TOKEN

export const gitHubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: accessToken ? `Bearer ${accessToken}` : ''
  }
})
