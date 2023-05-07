<template>
  <li>
    <header>
      <h1>{{ post.title }}</h1>
      <time :title="formattedCreationDate" dateTime="{post.created_at}">
        {{ creationDateRelativeToNow }}
      </time>
    </header>
  </li>
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
li {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  height: 16.25rem;
  max-width: 26rem;

  background: $post-color;
  border: 1px solid transparent;
  border-radius: 10px;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.4s;

  &:hover {
    border-color: $label-color;
  }

  header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;

    h1 {
      flex: 1;
      color: $title-color;
      font-size: 1.25rem;

      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    time {
      color: $span-color;

      &::first-letter {
        text-transform: uppercase;
      }
    }
  }
}
</style>
