import { GitHubApi } from '@/lib/gitHubApi'
import type { ProfileData } from '@/models/profile.model'

export const useProfileStore = defineStore('profile', () => {
  const profile = ref<ProfileData | null>(null)

  async function fetchProfileData(): Promise<void> {
    const hasProfileData = Boolean(profile.value)
    if (hasProfileData) return

    profile.value = await GitHubApi.getProfile()
  }

  return { profile: readonly(profile), fetchProfileData }
})
