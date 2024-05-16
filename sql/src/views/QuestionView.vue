<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { supabase } from '../lib/supabaseClient';
import { onMounted, ref } from 'vue';

const router = useRouter();
const route = useRoute();
const id = route.params.id;
let question = ref();
let changed = ref(false);
let loading = ref(true); // Added loading state
let question_id,title,text,answered,subject,teacher,image,grade
async function getEntries() {
  try {
    const { data, error } = await supabase.from('questions').select().eq('id', id);
    if (error) throw error; // Throw error if any occurs
    question.value = data;
    changed.value = true;
    loading.value = false; // Set loading to false once data is fetched
    question_id = question.value[0].id
    title = question.value[0].question_name
    text = question.value[0].question_text
    answered = question.value[0].answered
    subject = question.value[0].subject
    teacher = question.value[0].teacher
    image = question.value[0].image
    grade = question.value[0].grade
  } catch (error) {
    console.error("Failed to fetch question:", error);
    // Handle error appropriately
  }
}

onMounted(() => {
  getEntries();
});
</script>

<template>
  <div class="container">
<div v-if='loading' class="loading-state">Loading...</div>
  <div v-else-if='changed' class="poppins-medium container-card">
    <h1 class = 'title'>{{ title }}</h1>
    <h3 class = 'subject'>{{ subject }}</h3>
    <p>{{ text }}</p>
  </div>

  <div class = 'comment_form'>
    <form action="">
      <h3>Comments</h3>
      <textarea name="" id="" rows="10"></textarea>
    </form>
  </div>
</div>
</template>

<style scoped>
.container{
  font-family: 'Poppins';
  display: flex;
  align-items: center;
  flex-direction: column;
}
.comment_form{
width:90vw
}
.container-card{
  border: 1px solid black;
  border-radius: 20px;
  margin:0%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Poppins';
}
.loading-state {
  text-align: center;
  padding-top: 20%;
}
.subject{
  opacity: 90%;
  color:rgb(0, 10, 24);
  font-size: 15px;
}

textarea{
  border-radius: 10px;
  resize: vertical;
}


  .poppins-thin {
  font-family: "Poppins", sans-serif;
  font-weight: 100;
  font-style: normal;
}

.poppins-extralight {
  font-family: "Poppins", sans-serif;
  font-weight: 200;
  font-style: normal;
}

.poppins-light {
  font-family: "Poppins", sans-serif;
  font-weight: 300;
  font-style: normal;
}

.poppins-regular {
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-style: normal;
}

.poppins-medium {
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-style: normal;
}

.poppins-semibold {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-style: normal;
}

.poppins-bold {
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-style: normal;
}

.poppins-extrabold {
  font-family: "Poppins", sans-serif;
  font-weight: 800;
  font-style: normal;
}

.poppins-black {
  font-family: "Poppins", sans-serif;
  font-weight: 900;
  font-style: normal;
}

.poppins-thin-italic {
  font-family: "Poppins", sans-serif;
  font-weight: 100;
  font-style: italic;
}

.poppins-extralight-italic {
  font-family: "Poppins", sans-serif;
  font-weight: 200;
  font-style: italic;
}

.poppins-light-italic {
  font-family: "Poppins", sans-serif;
  font-weight: 300;
  font-style: italic;
}

.poppins-regular-italic {
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-style: italic;
}

.poppins-medium-italic {
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-style: italic;
}

.poppins-semibold-italic {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-style: italic;
}

.poppins-bold-italic {
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-style: italic;
}

.poppins-extrabold-italic {
  font-family: "Poppins", sans-serif;
  font-weight: 800;
  font-style: italic;
}

.poppins-black-italic {
  font-family: "Poppins", sans-serif;
  font-weight: 900;
  font-style: italic;
}


</style>
