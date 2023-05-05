import { gitHubApi } from '@/lib/gitHubApi'
import { defineStore } from 'pinia'
import { ref } from 'vue'
const user: string = import.meta.env.VITE_USER

export interface ProfileData {
  name: string
  login: string
  avatar_url: string
  html_url: string
  bio: string
  company?: string
  followers: number
}

export const useProfileStore = defineStore('profile', () => {
  const profile = ref<ProfileData | null>(null)

  async function fetchProfileData(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        throw new Error('bad thinds')

        const hasProfileData = Boolean(profile.value)
        if (hasProfileData) return

        setTimeout(async () => {
          const profileResponse = await gitHubApi.get<ProfileData>(`users/${user}`)
          profile.value = profileResponse.data
        }, 3000)
      } catch (err) {
        reject(err)
      }
    })
  }

  return { profile, fetchProfileData }
})
