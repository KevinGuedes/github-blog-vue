<template>
  <DataCard class="post-header-container">
    <header>
      <nav>
        <RouterLink to="/">
          <icon:ep:arrow-left-bold />
          Back
        </RouterLink>
        <a :href="post.html_url" target="_blank" rel="noreferrer">
          See on GitHub <icon-fa6-solid:arrow-up-right-from-square />
        </a>
      </nav>

      <h1 :title="post.title">{{ post.title }}</h1>

      <div>
        <span>
          <icon-fa6-brands:github />
          {{ post.user.login }}
        </span>
        <span>
          <icon-fa6-solid:calendar-day />
          <time :dateTime="post.created_at" :title="formattedCreationDate">
            {{ creationDateRelativeToNow }}
          </time>
        </span>
        <span>
          <icon-fa6-solid:comment />
          {{ post.comments }} Comment(s)
        </span>
      </div>
    </header>
  </DataCard>
</template>

<script setup lang="ts">
import type { Post } from '@/models/post.model'
import { format, formatDistanceToNow } from 'date-fns'

const props = defineProps<{
  post: Post
}>()

const createdAt = new Date(props.post.created_at)
const formattedCreationDate = format(createdAt, "iiii, d MMMM yyyy 'at' hh:mm aa")
const creationDateRelativeToNow = formatDistanceToNow(createdAt, {
  addSuffix: true
})
</script>

<style scoped lang="scss">
.post-header-container {
  display: flex;
  flex-direction: column;
  justify-content: center;

  header {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    nav {
      display: flex;
      justify-content: space-between;

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

    h1 {
      font-size: 1.5rem;
      color: $title-color;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    > div {
      display: flex;
      gap: 2rem;
      margin-top: 0.5rem;

      time::first-letter {
        text-transform: uppercase;
      }

      span {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        color: $span-color;

        svg {
          color: $label-color;
        }
      }
    }
  }
}
</style>
