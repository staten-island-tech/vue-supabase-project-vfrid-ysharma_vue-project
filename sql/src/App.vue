<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
import { useSessionStore } from '@/stores/usersession.ts'  
import { ref, onMounted } from 'vue'
const sessionStore = useSessionStore()
console.log(sessionStore.session)
function logout(){
  location.reload()
}

  </script>
  

  <template>
    <div class="navbar_container">
      <ul class=navbar>
        <li><RouterLink :to="'/'">Home</RouterLink></li>
        <li><RouterLink :to="'/questions'">Questions</RouterLink></li>
        <li>  <div v-if="sessionStore.session && sessionStore.session.user">
          <RouterLink :to="'/profile/'+sessionStore.session.user.user_metadata.username">Profile</RouterLink></div></li>
        <li><div v-if="sessionStore.session!=null"> <RouterLink :to="'/create'">Create Question</RouterLink></div></li>
        <li><div v-if="sessionStore.session===null"><RouterLink to="/LogIn" >Go to Login</RouterLink></div> <div v-if="sessionStore.session!=null"><a @click="logout()">Logout</a></div></li>
      </ul>
    </div>
    <RouterView/>
    <!-- <div v-if="sessionStore.session===null"><RouterLink to="/LogIn" >Go to Login</RouterLink></div>
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/questions">Questions</RouterLink>
    <RouterLink to="/profile/v_friddy">v_friddy</RouterLink>
    <RouterLink to="/profile/yanick">yanick</RouterLink>
    <RouterLink to="/create">ask question</RouterLink> -->

  </template>
<style scoped>
.navbar_container{
  display:flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 20px;
  flex-direction: row;
}
.navbar{
  list-style-type: none;
}
li{
  display:inline-flex;
  margin: 20px;
}

</style>