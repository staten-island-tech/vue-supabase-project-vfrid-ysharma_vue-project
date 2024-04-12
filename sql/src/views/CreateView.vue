<script setup>
import { useRoute,useRouter } from 'vue-router';
import { ref, onMounted } from 'vue'
  import { supabase } from '../lib/supabaseClient'
  const router = useRouter()
  const route = useRoute()
  const name = route.params.name
  let all_questions = ref([])
  let filtered = ref([])
async function getEntries() {
  const { error } = await supabase.from('questions').insert({user:'test', question_name: 'questionname', question_text:'questiontext', answered: 'nope', subject:"compsci", teacher:'Simon', class_name: 'AP computer science princeiplas'})
}

onMounted(() => {
  getEntries()
})

</script>

<template>

</div>
</template>

<style>

</style>
