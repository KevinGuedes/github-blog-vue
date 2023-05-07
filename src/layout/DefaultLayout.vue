<template>
  <PageHeader />
  <main>
    <div v-if="errorState.isError">
      <p>{{ errorState.errorMessage }}</p>
    </div>
    <div v-else>
      <RouterView v-slot="{ Component }">
        <template v-if="Component">
          <Transition name="fade" mode="out-in">
            <KeepAlive>
              <Suspense>
                <Transition name="fade" mode="out-in" appear>
                  <component :is="Component"></component>
                </Transition>

                <template #fallback>
                  <div class="fallback-container">
                    <LoadSpinner loading-message="Loading GitHub data..." />
                  </div>
                </template>
              </Suspense>
            </KeepAlive>
          </Transition>
        </template>
      </RouterView>
    </div>
  </main>
</template>

<script setup lang="ts">
const errorState = ref({
  isError: false,
  errorMessage: ''
})

onErrorCaptured((err: Error) => {
  errorState.value.isError = true
  errorState.value.errorMessage = err.message
  return false
})
</script>

<style scoped lang="scss">
div {
  main {
    max-width: 864px;
    margin: -5.5rem auto 3rem;
    padding: 0 2rem;
    box-sizing: content-box;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
