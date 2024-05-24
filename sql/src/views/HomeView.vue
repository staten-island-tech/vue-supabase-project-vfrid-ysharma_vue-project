<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { supabase } from '../lib/supabaseClient'


</script>

<template>
  <div class="h1">
    <h1>Welcome to TutorBase!</h1>
    <div class="buttons">    <button>Log In</button><button>Sign Up</button></div>
  </div>

    <div class="navbar">
      <ul>
        <li><RouterLink :to="'/questions'">Questions</RouterLink> </li>
        <li><RouterLink :to="'/create'">Create Question</RouterLink> </li>
        <li><RouterLink :to="'/profile'">Profile</RouterLink> </li> <!-- add +username to route once merged w yan -->
      </ul>
    </div>
    <!-- <img > -->
    <p class="paragraph">At SITHS TutorBase, we believe in the power of peer-to-peer learning. Our online platform connects students across all grade levels, fostering a collaborative community where knowledge is shared and academic growth is nurtured. Whether you're struggling with a challenging concept or seeking a fresh perspective, our network of dedicated students is here to lend a helping hand. Through our intuitive discussion forums, you can engage with fellow classmates, ask questions, and receive insightful explanations from those who have recently mastered the material. Together, we can demystify complex subjects, reinforce understanding, and cultivate a passion for learning. Join our vibrant community today and experience the transformative power of students supporting students on their academic journeys.</p>
</template>
<style scoped>
/* body{
  font-family: 'Open Sans', arial, sans-serif;
} */
#app{
  width: 100%;
}
body{
  width:100%
}
main{
  width: 100%;
}
.navbar{
  position: absolute;
  left: 0;
  top: 50px;
  font-size: 50px;
}
ul{
  list-style-type: none;
}
li{
  margin: 10px;
}
.h1{
  font-size: 40px;
  font-weight: 100;
  margin-left: 120%;
  margin-top: -350px;
}
.paragraph{
  bottom:250px;
  position:absolute;
  font-size: 20px;
  left:30px;
  right: 900px;
  font-style: oblique;
}
button{
  font-size: 20px;
}
.buttons{
  display:inline;
  width: 500px;
}
</style>