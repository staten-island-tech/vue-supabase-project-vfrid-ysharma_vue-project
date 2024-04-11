<script setup>
  import { ref, onMounted } from 'vue'
  import { supabase } from '../lib/supabaseClient'

  const Profile_Info = ref([])

  async function getProfile() {
    const { data } = await supabase.from('Users').select()
    Profile_Info.value = data
  }

  onMounted(() => {
    getProfile()
  })
  
  console.log(Profile_Info)
</script>

<template>
    <h1> hey.. </h1>
</template>
