<script setup lang="ts">
import { useSessionStore } from '@/stores/usersession.ts'  

const sessionStore = useSessionStore()
function print(){
  console.log(sessionStore.session.user)
  console.log(sessionStore.session.session)

}
function logout(){
  location.reload()
}
console.log(sessionStore.session)
</script>

<template>
    <!-- <button @click="print()">print</button> -->

  <div class="h1">
    <h1>Welcome to TutorBase!</h1>
    <div class="buttons">    <div v-if="sessionStore.session===null"><RouterLink to="/LogIn" >Go to Login</RouterLink></div> <div v-if="sessionStore.session!=null"><button @click="logout()">Logout</button></div></div>
  </div>

    <div class="navbar">
      <ul>
        <li><RouterLink :to="'/questions'">Questions</RouterLink> </li>
        <li><RouterLink :to="'/create'">Create Question</RouterLink> </li>
        <div v-if="sessionStore.session!=null"><li><RouterLink :to="'/profile/'+sessionStore.session.user.user_metadata.username">Profile</RouterLink> </li></div>
      </ul>
    </div>
    <p class="paragraph">At SITHS TutorBase, we believe in the power of peer-to-peer learning. Our online platform connects students across all grade levels, fostering a collaborative community where knowledge is shared and academic growth is nurtured. Whether you're struggling with a challenging concept or seeking a fresh perspective, our network of dedicated students is here to lend a helping hand. Through our intuitive discussion forums, you can engage with fellow classmates, ask questions, and receive insightful explanations from those who have recently mastered the material. Together, we can demystify complex subjects, reinforce understanding, and cultivate a passion for learning. Join our vibrant community today and experience the transformative power of students supporting students on their academic journeys.</p>
</template>

<style scoped>
body{
  font-family: 'Open Sans', arial, sans-serif;
  overflow: none;
  margin-top: 0;
}
/* #app{
  width: 100%;
} */
/* body{
  width:100%
}
main{
  width: 100%;
} */
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
  margin-left: 720px;
  margin-top: 200px;
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
  text-decoration: none;
  color:#0088FF;
  transition: 0.4s;
  padding: 3px;
  background-color: hsla(216, 100%, 37%, 0.07);
  border-radius: 6px;
  height: 38px;
  border: none;
  font-size: 30px;
}
button:hover{
  background-color:#8bc9ff;
}
.buttons{
  display:inline;
  width: 500px;
}
</style>