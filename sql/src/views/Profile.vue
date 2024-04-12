<script setup>
  import { ref, onMounted } from 'vue'
  import { supabase } from '../lib/supabaseClient'
  import {useRoute,useRouter} from 'vue-router'
  const info = ref([])

  const router = useRouter()
  const route = useRoute()
  const osis_num = route.params.osis
  console.log(osis_num)
  async function getProfile() {
    const { data } = await supabase.from('Users')
      .select()
      .eq('osis',osis_num )
    info.value = data
  }

  onMounted(() => {
    getProfile()
  })
  
  console.log(info)
</script>

<template>
  <div v-for="data in info">
    <h1> {{data.osis}} </h1>
  </div>

</template>
