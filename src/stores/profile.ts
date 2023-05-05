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
  const isLoadingProfileData = ref(true)

  async function fetchProfileData() {
    const hasProfileData = Boolean(profile.value)
    if (hasProfileData) return

    isLoadingProfileData.value = true
    const profileResponse = await gitHubApi.get<ProfileData>(`users/${user}`)
    profile.value = profileResponse.data
    isLoadingProfileData.value = false
  }

  return { profile, isLoadingProfileData, fetchProfileData }
})
