<script setup>
import { useRoute,useRouter } from 'vue-router';
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabaseClient'
import FormComponent from '../components/FormComponent.vue'
  const router = useRouter()
  const route = useRoute()
  const name = route.params.name
  async function getEntries() {
  const { data, error } = await supabase.from('questions').insert({
    user: 'test', 
    question_name: 'questionname', 
    question_text: 'questiontext', 
    answered: 'True', 
    subject: "compsci", 
    teacher: 'Simon', 
    class_name: 'AP computer science principles'
  });

  if (error) console.error('Error inserting data:', error);
  else console.log('Data inserted:', data);
}


onMounted(() => {
//   getEntries()
})

</script>

<template>
<FormComponent />
</template>

<style>

</style>
