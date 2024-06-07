<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
import { useSessionStore } from '@/stores/usersession.ts'  
import { ref, onMounted } from 'vue'
const sessionStore = useSessionStore()
console.log(sessionStore.session)

  </script>
  

  <template>
    <RouterView/>
    <div v-if="sessionStore.session===null"><RouterLink to="/LogIn" >Go to Login</RouterLink></div>
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/questions">Questions</RouterLink>
    <RouterLink to="/profile/v_friddy">v_friddy</RouterLink>
    <RouterLink to="/profile/yanick">yanick</RouterLink>
    <RouterLink to="/create">ask question</RouterLink>

  </template>
