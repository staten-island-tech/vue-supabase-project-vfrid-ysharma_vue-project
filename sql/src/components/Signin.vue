<script setup lang="ts">
  import { useRouter } from 'vue-router'

  import { ref, onMounted } from 'vue'
  import { supabase } from "../lib/supabaseClient"
  import {useSessionStore} from "@/stores/usersession.ts"
  interface User {
  id: string;
  aud: string;
  role: string;
  email: string;
  email_confirmed_at: string;
  phone: string;
  confirmed_at: string;
  last_sign_in_at: string;
  app_metadata: {
    provider: string;
    providers: string[];
  };
  user_metadata: {
    email: string;
    email_verified: boolean;
    f_name: string;
    grade: number;
    l_name: string;
    osis: number;
    phone_verified: boolean;
    sub: string;
    username: string;
  };
  identities: Identity[];
  created_at: string;
  updated_at: string;
  is_anonymous: boolean;
}

interface Session {
  user: User | null;
  access_token: string;
  token_type: string;
  expires_in: number;
  expires_at: number;
  refresh_token: string;
}

interface Identity {
  identity_id: string;
  id: string;
  user_id: string;
  identity_data: {
    email: string;
    email_verified: boolean;
    f_name: string;
    grade: number;
    l_name: string;
    osis: number;
    phone_verified: boolean;
    sub: string;
    username: string;
  };
  provider: string;
  last_sign_in_at: string;
  created_at: string;
  updated_at: string;
  email: string;
}
  const showsignin =ref(true)
  const email = ref("")
  const password = ref("")
  const f_name =ref("")
  const l_name=ref("")
  const grade =ref("")
  const username=ref("")
  const osis=ref("")
  const sessionStore = useSessionStore()
  const router=useRouter()

  async function signup() {
    let { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
        f_name: f_name.value,
        grade:Number(grade.value),
        l_name: l_name.value,
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
  sessionStore.session= data as unknown as Session
  console.log(sessionStore.session)
  alert("sign-up success!")
  router.push('/')
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
      sessionStore.session = data as unknown as Session;
      console.log(sessionStore.session)
      alert("sign-in success!")
      router.push('/')
      }
    }
  function showsignupfunc() {
    showsignin.value= !showsignin.value
    console.log(showsignin)
  }
  </script>
  

  <template>
    <div class="container">
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
    </div>
  </template>
  <style scoped>
.signin{
  display:flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-direction: column;
  width: 500px;
  margin: 10px;
}
.container{
  background-color: rgb(189, 211, 255);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 550px;
  /* left: 50%;
  right: 50%; */
  justify-self: center;
  border-radius: 10px;
  margin: 50px;
}
#app{
  display:flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>