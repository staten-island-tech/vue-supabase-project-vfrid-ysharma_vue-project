<script setup>
import { useRoute,useRouter } from 'vue-router';

import { ref, onMounted } from 'vue'
  import { supabase } from '../lib/supabaseClient'
import SearchQuestionComponent from '../components/SearchQuestionComponent.vue'
  const router = useRouter()
  const route = useRoute()
  const name = route.params.name
  let all_questions = ref([])
  let filtered = ref([])
async function getEntries() {
  const { data } = await supabase.from('questions').select()
  all_questions.value = data
  all_questions.value.forEach(i => {
    if(i.question_name.toLowerCase().includes(name.toLowerCase())){
      filtered.value.push(i)
    }
});
}

onMounted(() => {
  getEntries()
})

</script>

<template>
  <div class="about">
    <h1>Here are the results for: {{ name }}</h1>

    

    <div v-for="i in filtered">
      <SearchQuestionComponent :id="i.id" :title="i.question_name" :subject="i.subject" :class_name="i.class_name" :question_text="i.question_text" :img_url="i.image"/>


    </div>
</div>
</template>

<style>
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding:10%
  }


</style>
