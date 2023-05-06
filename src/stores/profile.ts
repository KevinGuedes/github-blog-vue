import { gitHubApi } from '@/lib/gitHubApi'

const user: string = import.meta.env.VITE_USER

interface ProfileData {
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
    const hasProfileData = Boolean(profile.value)
    if (hasProfileData) return

    const profileResponse = await gitHubApi.get<ProfileData>(`users/${user}`)
    profile.value = profileResponse.data
  }

  return { profile, fetchProfileData }
})
