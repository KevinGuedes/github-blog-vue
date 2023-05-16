<template>
  <section>
    <header>
      <h2>Posts</h2>
      <span v-if="hasOnlyOnePost">1 Post</span>
      <span v-else>{{ numebrOfPostsFound }} Posts</span>
    </header>

    <form>
      <input type="text" placeholder="Search content" @input="handleQueryChange($event)" />
    </form>
  </section>
</template>

<script setup lang="ts">
import { usePostsStore } from '@/stores/posts.store'

const postsStore = usePostsStore()
const { numebrOfPostsFound } = storeToRefs(postsStore)
const hasOnlyOnePost = computed(() => numebrOfPostsFound.value === 1)

const getPostsByQueryDebounced = useDebounceFn(
  async () => {
    await postsStore.getPostsByQuery()
    postsStore.setIsLoadingPostsTo(false)
  },
  1500,
  { maxWait: 5000 }
)

function handleQueryChange(event: Event) {
  const query = (event.target as HTMLInputElement).value
  postsStore.setQuery(query)
  postsStore.setIsLoadingPostsTo(true)
  getPostsByQueryDebounced()
}
</script>

<style scoped lang="scss">
section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h2 {
      color: $subtitle-color;
      font-size: 1.125rem;
    }

    span {
      color: $span-color;
      font-size: 0.875rem;
    }
  }

  form {
    input {
      width: 100%;
      padding: 0.75rem 1rem;
      border-radius: 6px;
      border: 1px solid $border-color;
      background: $input-color;
      color: $text-color;

      &::placeholder {
        color: $label-color;
      }
    }
  }
}
</style>
