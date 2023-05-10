<template>
  <div class="home-view-container">
    <ProfileCard />
    <SearchForm />
    <PostList />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.home-view-container {
  display: flex;
  flex-direction: column;
  gap: 4.5rem;
}
</style>
