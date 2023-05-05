<template>
  <div class="spinner-container">
    <div class="spinner"></div>
    <span>{{ loadingMessage }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  loadingMessage: string
}>()
</script>

<style scoped lang="scss">
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
