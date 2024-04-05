<script setup>
import { useRoute,useRouter } from 'vue-router';
import { ref, onMounted } from 'vue'
  import { supabase } from '../lib/supabaseClient'
  const router = useRouter()
  const route = useRoute()
  const name = route.params.name
  let all_questions = ref([])
  let filtered = ref([])
async function getCountries() {
  const { data } = await supabase.from('questions').select()
  all_questions.value = data
  all_questions.value.forEach(i => {
    if(i.question_name.toLowerCase().includes(name.toLowerCase())){
      filtered.value.push(i)
    }
});
}

onMounted(() => {
  getCountries()
})

</script>

<template>
  <div class="about">
    <h1>Here are the results for: {{ name }}</h1>
    <div v-for="i in filtered">{{i}}</div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
