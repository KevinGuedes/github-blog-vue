<template>
  <div class="post-viewer-container">
    <div v-html="body"></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  postBody: string
}>()

import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'

async function convertPostMarkdownToHtml(postBody: string) {
  const html = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .use(rehypeSanitize)
    .process(postBody)

  return String(html)
}

const body = await convertPostMarkdownToHtml(props.postBody)
</script>

<style scoped lang="scss">
.post-viewer-container {
  overflow: hidden;
  word-break: break-word;

  a {
    text-decoration: none;
    color: $brand-blue;
    border-bottom: 1px solid transparent;
    padding-inline: 2px;

    &:hover {
      transition: border-color 0.3s;
      border-color: $brand-blue;
    }
  }

  h1 {
    font-size: 1.5rem;

    &:not(:first-child) {
      margin-top: 1.25rem;
    }
  }

  h2 {
    font-size: 1.25rem;
    margin-top: 0.75rem;
  }

  h3 {
    font-size: 1.125rem;
    margin-top: 0.5rem;
  }

  hr {
    border: 0.5px solid $border-color;
    margin: 1rem 0;
  }

  pre {
    font-size: 0.875rem;
    margin: 1.5rem 0;

    div {
      border: 1px solid $border-color;
      background: $profile-color !important;
    }
  }

  ul,
  ol {
    padding-left: 2rem;
  }

  img {
    width: 100%;
    height: auto;
  }

  table {
    border-collapse: collapse;

    td,
    th {
      padding: 0.5rem 1rem;
      border: 1px solid $border-color;
    }
  }

  p {
    white-space: pre;
  }
}
</style>
