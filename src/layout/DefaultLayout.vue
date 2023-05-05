<template>
  <div>
    <PageHeader />
    <main>
      <RouterView v-slot="{ Component }">
        <template v-if="Component">
          <Transition name="fade" mode="out-in" appear>
            <KeepAlive>
              <Suspense>
                <Transition name="fade" mode="out-in" appear>
                  <component :is="Component"></component>
                </Transition>

                <template #fallback>
                  <div class="fallback-container">
                    <LoadSpinner loading-message="Loading Profile data..." />
                  </div>
                </template>
              </Suspense>
            </KeepAlive>
          </Transition>
        </template>
      </RouterView>
    </main>
  </div>
</template>

<script setup lang="ts">
onErrorCaptured((err: Error) => {
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

.fallback-container {
  margin-top: 10rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
