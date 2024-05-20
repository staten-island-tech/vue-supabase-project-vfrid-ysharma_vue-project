<script setup lang="ts">

  import { ref, onMounted } from 'vue'
  import { supabase } from "../lib/supabaseClient"
  import {useSessionStore} from "@/stores/usersession.ts"
  const showsignin =ref(true)
  const email = ref("")
  const password = ref("")
  const f_name =ref("")
  const l_name=ref("")
  const grade =ref("")
  const username=ref("")
  const osis=ref("")
  const sessionStore = useSessionStore()

  async function signup() {
    console.log(username.value)
  //   if (
  // email.value === "" || password.value === "" || f_name.value === "" || l_name.value === "" || grade.value === null || username.value === "" ||osis.value==""){
  //   alert("please fill out all fields")
  //   return
  // }
  if(!(9<=grade.value<=12)){
      alert("Please enter a valid grade")
      console.log(grade.value)
      return
    }
    let { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
        f_name: f_name.value,
        grade:Number(grade.value),
        l_name: l_name.value,
        grade: grade.value,
        osis: Number(osis.value),
        username: username.value,
      }
    }
  })  
  if(error!==null){
    alert(error)
  }
  console.log(data)
  console.log(error)
  sessionStore.session=data
  console.log(sessionStore.session)
  }
  async function signin() {
    let { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
      })
    if(error!==null){
      alert(error)
      }
    console.log(data)
    console.log(error)
    if(error==null){
      sessionStore.session=data
      console.log(sessionStore.session)
      }
    }
  function showsignupfunc() {
    showsignin.value= !showsignin.value
    console.log(showsignin)
  }
  </script>
  

  <template>
    <div class="signin" v-if="showsignin">
      <input v-model="email" type="text" placeholder="E-mail" />
      <input v-model="password" type="text" placeholder="Password" />
      <button @click="signin">Sign In</button>
      <button @click="showsignupfunc">Want to Sign Up?</button>

    </div>
    <div v-else class="signup">
      <input v-model="email" type="text" placeholder="E-mail" />
      <input v-model="username" type="text" placeholder="Username"/>
      <input v-model="password" type="text" placeholder="Password" />
      <input v-model="f_name" type="text" placeholder="First Name" />
      <input v-model="l_name" type="text" placeholder="Last Name">
      <input v-model="grade" type="number" placeholder="Your Grade" />
      <input v-model="osis" type="number" placeholder="Osis Number"/>

      <button @click="signup">Sign Up</button>
      <button @click="showsignupfunc">Want to Sign In?</button>

    </div>
  </template>