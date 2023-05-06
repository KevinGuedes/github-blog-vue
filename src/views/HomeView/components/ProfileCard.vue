<template>
  <section>
    <img :src="profile?.avatar_url" :alt="profileImageAlt" />
    <div>
      <div>
        <header>
          <h1>{{ profile?.name }}</h1>
          <a :href="profile?.html_url" target="_blank">
            GitHub <icon-fa6-solid:arrow-up-right-from-square />
          </a>
        </header>
        <p>{{ profile?.bio }}</p>
      </div>

      <div class="user-metrics">
        <span>
          <icon-fa6-brands:github />
          {{ profile?.login }}
        </span>
        <span>
          <icon-fa6-solid:building />
          {{ profile?.company }}
        </span>
        <span>
          <icon-fa6-solid:user-group />
          {{ followersMessage }}
        </span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useProfileStore } from '@/stores/profile'

const profileStore = useProfileStore()
const { profile } = storeToRefs(profileStore)
const { fetchProfileData } = profileStore
await fetchProfileData()

const profileImageAlt = computed(() => {
  return `${profile.value?.name} profile image`
})

const followersMessage = computed(() => {
  return profile.value?.followers === 1 ? '1 Follower' : `${profile.value?.followers} Followers`
})
</script>

<style scoped lang="scss">
section {
  padding: 2rem 2.5rem;
  min-height: 13.25rem;
  background: $profile-color;
  border-radius: 10px;
  box-shadow: 0px 2px 28px rgba(0, 0, 0, 0.2);

  display: flex;
  justify-content: center;
  flex: 1;
  gap: 2rem;

  img {
    width: 9.25rem;
    height: 9.25rem;
    border-radius: 8px;
  }

  > div {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    p {
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      text-align: justify;
    }
  }
}

header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  h1 {
    font-size: 1.5rem;
    color: $title-color;
    margin-bottom: 0.5rem;
  }

  a {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    text-decoration: none;
    text-transform: uppercase;
    font-size: 0.75rem;
    color: $brand-blue;

    border-bottom: 1px solid transparent;
    padding: 0.1rem;

    &:hover {
      transition: border-color 0.3s;
      border-color: $brand-blue;
    }
  }
}

.user-metrics {
  display: flex;
  gap: 1.5rem;
  margin-top: 1.5rem;

  span {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: $subtitle-color;

    svg {
      color: $label-color;
    }
  }
}

.spinner-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  place-items: center;

  .spinner {
    border: 0.5rem solid $label-color;
    border-radius: 50%;
    border-top: 0.5rem solid $brand-blue;
    width: 6rem;
    height: 6rem;
    animation: spin 2s linear infinite;
  }

  span {
    font-size: 1.25rem;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
