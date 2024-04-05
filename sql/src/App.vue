<script setup>
  import { ref, onMounted } from 'vue'
  import { supabase } from './lib/supabaseClient'

  // const Users = ref([])
  // async function getUsers() {
  //   let { data } = await supabase.from('Users').select()
  //   Users.value = data
  // }
  // onMounted(() => {
  //   getUsers()
  // })
  // console.log(Users.value)

   const email = ref('')
   const password = ref('')
   const f_name =ref('')
   const grade =ref()
  async function signup() {
    let { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
        first_name: f_name.value,
        grade: grade.value
      }
    }
  }
  })
  console.log(data)
  console.log(email.value, password)
  }
  </script>

  <template>
    <div>
    <input v-model="email" type="text" placeholder="email" />
    <input v-model="password" type="text" placeholder="password" />
    <button @click="signup">Sign Up</button>
  </div>
  </template>