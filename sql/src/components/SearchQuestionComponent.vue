<script setup lang="ts">
const props = defineProps<{
  id: Number,
  title: String,
  subject: String,
  class_name: String,
  question_text: String,
  img_url:String

}>()
const url = '/question/'+ props.id
</script>

<template>


  <!-- <div class="card">
    <h1>{{ id }}</h1>
    <h1>{{ title }}</h1>
    <h1>{{ subject }}</h1>
    <h1>{{ class_name }}</h1>
    <h1>{{ question_text }}</h1>
    <img :src="props.img_url" alt="Profile image">
  </div> -->

  <RouterLink :to="url">
  <Card style="width: 25rem; overflow: hidden;">
    <!-- <>
       <img :src="props.img_url" alt="Profile image">
    </> -->
    <h1>{{title}}</h1>
    <h3>{{subject}}</h3>
    <div>
        <p class="m-0">
            {{question_text}}
        </p>
    </div>
    <h5>
        <div class="flex gap-3 mt-1">
          <p class="m-0">
            {{ class_name }}
</p>
        </div>
    </h5>
</Card>
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
