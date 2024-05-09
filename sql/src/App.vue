<script setup>
import {RouterLink, RouterView} from 'vue-router'
  </script>
  

  <template>
    <RouterView/>
    <div><RouterLink to="/LogIn">Go to Login</RouterLink></div>
    <RouterLink to="/">Go to Home</RouterLink>

  </template>