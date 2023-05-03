<template>
  <div>
    <PageHeader />
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped lang="scss">
div {
  main {
    max-width: 864px;
    margin: -5.5rem auto 3rem;
    padding: 0 2rem;
    box-sizing: content-box;
  }
}
</style>
