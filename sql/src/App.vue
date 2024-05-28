<script setup>
import {RouterLink, RouterView} from 'vue-router'
import { useSessionStore } from '@/stores/usersession.ts'  
import { ref, onMounted } from 'vue'
  import { supabase } from './lib/supabaseClient'
  import {RouterLink, RouterView} from 'vue-router'
const sessionStore = useSessionStore()
console.log(sessionStore.session)

  </script>
  

  <template>
    <RouterView/>
    <div v-if="sessionStore.session===null"><RouterLink to="/LogIn" >Go to Login</RouterLink></div>
    <RouterLink to="/">Go to Home</RouterLink>

  </template>