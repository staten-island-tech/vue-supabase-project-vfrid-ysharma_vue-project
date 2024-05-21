<script setup lang="ts">
</script>

<template>
  <main>
    <h1 class="h1">Welcome to TutorBase!</h1>

    <div class="navbar">
      <ul>
        <li><RouterLink :to="'/questions'">Questions</RouterLink> </li>
        <li><RouterLink :to="'/create'">Create Question</RouterLink> </li>
        <li><RouterLink :to="'/profile'">Profile</RouterLink> </li> <!-- add +username to route once merged w yan -->
      </ul>
    </div>
  </main>
</template>
<style scoped>
.navbar{
  position: absolute;
  left: 0;
  top: 50px;
  font-size: 30px;
}
ul{
  list-style-type: none;
}
.h1{
  font-size: 50px;
  top: 60px;
  position:absolute;
}
</style>