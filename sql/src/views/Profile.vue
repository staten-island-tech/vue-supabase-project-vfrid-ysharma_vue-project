<script setup>
  import { ref, onMounted } from 'vue'
  import { supabase } from '../lib/supabaseClient'
  import {useRoute,useRouter} from 'vue-router'
  const info = ref([])

  const router = useRouter()
  const route = useRoute()
  const username = route.params.username
  console.log(username)
  async function getProfile() {
    const { data } = await supabase.from('Users')
      .select()
      .eq('username',username )
    info.value = data
  }
  // async function updateProfile(grade,email,f_name,l_name){
  //   const {new_data} = await supabase.from('Users')
  //     .upsert({username:username, grade:grade, email:email, f_name:f_name, l_name:l_name})
  //     .select()
  //     .eq('username',username)
  //   console.log(grade,email,f_name,l_name)
  //   info.value = new_data
  //   }
  // function openForm(){
  //   const inform = document.querySelector(".info")
  //   inform.innerHTML=(
  //     `    <form action="" id="form" class="form_container">
  //     <label for="grade" class="form_label">Grade: </label>
  //     <input type="text" name="grade" id="grade" class="input_field"/>
  //     <label for="email" class="form_label">Email: </label>
  //     <input type="text" name="email" id="email" class="input_field"/>
  //     <label for="f_name" class="form_label">First Name: </label>
  //     <input type="text" name="f_name" id="f_name" class="input_field"/>
  //     <label for="l_name" class="form_label">Last Name: </label>
  //     <input type="text" name="l_name" id="l_name" class="input_field"/>
  //     <input type="submit" value="Update Information" class="btn"/>
  //   </form>`
  //   )
  //   const grade = document.querySelector("#grade").value
  //   const email = document.querySelector("#email").value
  //   const f_name = document.querySelector("#f_name").value
  //   const l_name = document.querySelector("#l_name").value
  //   console.log('changed',grade,email,f_name,l_name)
  //   const form = document.querySelector("#form")
  //   form.addEventListener("submit", function(e){
  //   e.preventDefault();
  //   updateProfile(grade,email,f_name,l_name)
  // })
  // }
  onMounted(() => {
    getProfile()
  })
  
  console.log(info)

</script>

<template>
  <div v-for="data in info" class="overall">
    <div class="headers">
      <div class="inline">
        <img :src=data.profile_pic class="profile_pic">
        <h1 class="full_name_title"> {{data.f_name + " "+ data.l_name}} </h1>
      </div>
      <h2 class="username">{{ data.username }}</h2>
      <!-- <button class="edit_pic_button">Change Profile Picture</button> -->
    </div>
    <div class="info">
      <h2>{{"Grade: "+ data.grade }}</h2>
      <h2>{{ "Email: "+data.email }}</h2>
      <h2>{{ "Date Account Was Created: "+data.created_at }}</h2>
      <h2>{{"First Name: "+ data.f_name }}</h2>
      <h2>{{ "Last Name: "+data.l_name }}</h2>
      <!-- <button class="edit_button" @click="openForm()">Edit</button> -->
    </div>
  </div>

</template>
<style scoped>
body {
  font-family: 'Open Sans', arial, sans-serif;
  color: #333;
  font-size: 14px;
  overflow: scroll;
  overflow-x: hidden;
}
.overall{
  margin-left: 0;
  margin-right: auto;
  margin-bottom: 10px;
}
.full_name_title{
  margin: 10px;
  margin-top:auto;
  margin-bottom:auto;
  font-size: 25px;
}
.profile_pic{
  height: 25%;
  width: 25%;
  border-radius: 70px;
  border-color: #333;
  border-style:dashed;
  border-width: 4px;
}
.inline{
  display:inline-flex;
}
.username{
  margin:2px;
  margin-top:auto;
  margin-bottom:auto;
  font-size: 18px;
  font-style: italic;
}
button{
  font-style: bold;
}
</style>