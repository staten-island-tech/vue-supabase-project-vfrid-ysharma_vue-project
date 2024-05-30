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
    const { data } = await supabase.from('profiles')
      .select()
      .eq('username',username )
    info.value = data
  }
  function change_pic_form(){
    const id = info.value[0].id
    const change_pic_div = document.querySelector(".change_pic")
    change_pic_div.innerHTML="<form action='' id='form' class='form_container'><label for='pic' class='form_label'>Profile Picture URL: </label><input  autocomplete='off' type='text' name='pic' id='pic' class='input_field'/><input type='submit' value='Update Information' class='btn'/></form>"
    const form = document.querySelector("#form")
    form.addEventListener("submit", async function(e){
    e.preventDefault();
    const pic_url = document.querySelector("#pic").value
    console.log(pic_url)
    const {dat} = await supabase.from('profiles').update({profile_pic:pic_url}).eq('id',id)
    getProfile()
    // location.reload()
    change_pic_div.innerHTML="<button class='edit_pic_button' @click='change_pic_form()'>Change Profile Picture</button>"
  })
  }
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
      <div class="change_pic"><button class="edit_pic_button" @click="change_pic_form()">Change Profile Picture</button></div>
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
  height: 150px;
  width: 150px;
  border-radius: 90px;
  border-color: #333;
  border-style:dashed;
  border-width: 4px;
  overflow: hidden;
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
button, .btn{
  font-style: bold;
  text-decoration: none;
  color:#0088FF;
  transition: 0.4s;
  padding: 3px;
  background-color: hsla(216, 100%, 37%, 0.07);
  border-radius: 6px;
  border: none;
  height: 28px;
}
.form_container{
  display: inline;
    font-family: 'Voces', 'Open Sans', arial, sans-serif;
    font-weight: 600;
    height: 50px;
    position: absolute;
    margin: 5px;
    font-style:bold;
}
</style>