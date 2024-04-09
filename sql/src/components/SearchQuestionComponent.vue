<script setup lang="ts">
defineProps<{
  id: Number,
  title: String,
  subject: String,
  class_name: String,
  question_text: String,
  img_url:String

}>()

const url = 
</script>

<template>
<RouterLink to="/questions/{{ id }}">
  <div class="card">
    <h1>{{ id }}</h1>
    <h1>{{ title }}</h1>
    <h1>{{ subject }}</h1>
    <h1>{{ class_name }}</h1>
    <h1>{{ question_text }}</h1>
    <img :src="img_url" alt="This is an image">
  </div>
  </RouterLink>
</template>

<style scoped>
.card{
    display: flex;
    border-radius: 20px;
    border: 1px solid rgb(90, 90, 90);
    transition-duration: 500ms;
    background-color: white;

}
.card:hover{
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

</style>
