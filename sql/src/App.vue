<script setup>
  import { ref, onMounted } from 'vue'
  import { supabase } from './lib/supabaseClient'

  const Users = ref([])

  async function getUsers() {
    const { data } = await supabase.from('Users').select()
    Users.value = data
  }

  onMounted(() => {
    getUsers()
  })
  console.log(Users)
  </script>

  <template>
    <ul>
      <li v-for="user in Users" >{{ user.username }}<img :src="user.profile_pic" ></li>
    </ul>
  </template>