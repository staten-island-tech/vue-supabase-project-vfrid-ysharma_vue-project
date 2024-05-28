<script setup lang="ts">
</script>

<template>
    <RouterLink class = 'link' to="/">
      <div class="container">
        <h1>Congradulations your question has been submitted</h1>
        <h3>Click anywhere on your screen to go back to the home page</h3>
      </div>
  </RouterLink>
    </template>

<style scoped>
.container{
  width: 100vw;
  height: 100vh;
  color:black;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.link{
  overflow: hidden;
  padding: 0;
}
</style>