<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { supabase } from '../lib/supabaseClient';
import { onMounted, ref } from 'vue';
import { useSessionStore } from '@/stores/usersession';

interface User {
  id: string;
  user_metadata: {
    username: string;
  };
}

interface Session {
  user: User | null;
}

const sessionStore = useSessionStore();
const router = useRouter();
const route = useRoute();
const id = route.params.id;
let question = ref<any>();
let changed = ref(false);
let loading = ref(true);
let question_id: number | undefined;
let title: string | undefined;
let text: string | undefined;
let answered: boolean | undefined;
let subject: string | undefined;
let teacher: string | undefined;
let image: string | undefined;
let grade: string | undefined;
let author: string | undefined;
let message = '';
let messages = ref<any[]>([]);
let own_question = false;
let answer_id: number | undefined;

async function getEntries() {
  try {
    const { data, error } = await supabase.from('questions').select().eq('id', id);
    if (error) throw error;
    question.value = data;
    changed.value = true;
    loading.value = false;
    author = question.value[0]?.user;
    question_id = question.value[0]?.id;
    title = question.value[0]?.question_name;
    text = question.value[0]?.question_text;
    answered = question.value[0]?.answered;
    subject = question.value[0]?.subject;
    teacher = question.value[0]?.teacher;
    image = question.value[0]?.image;
    grade = question.value[0]?.grade;
    console.log(image)
    if (sessionStore.session && sessionStore.session.user) {
      console.log(sessionStore.session.user.user_metadata.username);

      if (author) {
        if (sessionStore.session.user.user_metadata.username === author) {
          own_question = true;
        }
      }
    }
  } catch (error) {
    console.error("Failed to fetch question:", error);
  }

  try {
    const { data, error } = await supabase.from('comments').select().eq('question_id', id);
    if (error) throw error;
    messages.value = data;
    messages.value.reverse();
    console.log(messages);
  } catch (error) {
    console.error("Failed to fetch question:", error);
  }

  if (answered === true) {
    for (let i = 0; i < messages.value.length; i++) {
      if (messages.value[i].is_answer === true) {
        answer_id = messages.value[i].id;
      }
      console.log(answer_id);
    }
  }
}

async function submit_supa() {
  if (sessionStore.session && sessionStore.session.user) {
    if (message !== '') {
      const { data, error } = await supabase.from('comments').insert({
        user: sessionStore.session.user.user_metadata.username,
        question_id: id,
        message: message,
      });
      if (error) {
        console.error('Error inserting data:', error);
      } else {
        console.log('Data inserted:', data);
        getEntries();
        message = "";
        alert("successfully added a comment!");
      }
    } else {
      alert("Please submit a non-blank comment");
    }
  } else {
    alert("You need to be logged in to submit a comment.");
  }
}

async function accepted(submittedid: number | undefined) {
  let { error } = await supabase.from('questions').update({ answered: true }).eq('id', id);
  let { error: err } = await supabase.from('comments').update({ is_answer: true }).eq('id', submittedid);
  console.log("ran the answered function");
  console.log(submittedid);
  console.log(answer_id);
  getEntries();
}

async function unaccept(submittedid: number | undefined) {
  let { error } = await supabase.from('questions').update({ answered: false }).eq('id', id);
  let { error: err } = await supabase.from('comments').update({ is_answer: false }).eq('id', submittedid);
  console.log("ran the answered function");
  console.log(submittedid);
  console.log(answer_id);
  getEntries();
}

onMounted(() => {
  getEntries();
});
</script>

<template>
  <div class="container">
    <!-- <RouterLink :to="'/questions'"><  Back To Questions</RouterLink> -->
    <div v-if="loading" class="loading-state">Loading...</div>

    <div v-else-if="changed" class="poppins-medium container-card">
      <h1 class="title">{{ title }}</h1>
      <h3 class="subject">{{ subject }}</h3>
      <p>{{ text }}</p>
      <div v-if="image!='https://bupfgvujmfpqumcodids.supabase.co/storage/v1/object/sign/question_images/question_mark_default.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJxdWVzdGlvbl9pbWFnZXMvcXVlc3Rpb25fbWFya19kZWZhdWx0LnBuZyIsImlhdCI6MTcxMjMyNjA2MiwiZXhwIjoxNzQzODYyMDYyfQ.6Q7KiS7kH8vgT5wmBoyyth6adMKzOUAnvWwIFFgQ-uI&t=2024-04-05T14%3A12%3A17.644Z'"><img :src="image" class="image"></div>
    </div>

    <div class="comment_form">
      <div v-if="sessionStore.session != null">
        <form action="">
          <h3>Comments</h3>
          <textarea v-model="message" name="" id="" rows="10"></textarea>
          <button type="button" @click="submit_supa" class="formbold-btn">Submit</button>
        </form>
      </div>
      <div v-else>Please Sign in to comment</div>
    </div>

    <div class="answer">
      <div v-if="answered" v-for="i in messages" :key="i.id">
        <div v-if="i.id === answer_id" class="comment comment_gray">
          <div class="profile">{{ i.user }}</div>
          <div class="body">{{ i.message }}</div>
          <button v-if="own_question" @click="unaccept(i.id)">Remove as accepted</button>
        </div>
      </div>
      <div v-else>No Answer Selected</div>
    </div>
    
    <div class="comments">
    <div class = "comment_section" v-for="i in messages">
      <div class = "comment comment_gray" v-if="i.id % 2 == 0 && i.id!=answer_id">
        <div class="profile"><RouterLink :to="'/profile/'+ i.user ">{{i.user}}</RouterLink></div>
        <div class="body">{{i.message}}</div>
        <button v-if="own_question && !answered" @click="accepted(i.id)">Mark as accepted</button>
      </div>
      <div class = "comment comment_white" v-if="i.id % 2 == 1 && i.id!=answer_id">
        <div class="profile"><RouterLink :to="'/profile/'+ i.user ">{{i.user}}</RouterLink></div>
        <div class="body">{{i.message}}</div>
        <button v-if="own_question && !answered" @click="accepted(i.id)">Mark as accepted</button>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
.container{
  font-family: 'Poppins';
  display: flex;
  align-items: center;
  flex-direction: column;
}
.comment_form{
width:90vw
}
.container-card{
  border: 1px solid black;
  border-radius: 20px;
  margin:0%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Poppins';
}
.loading-state {
  text-align: center;
  padding-top: 20%;
}
.subject{
  opacity: 90%;
  color:rgb(0, 10, 24);
  font-size: 15px;
}

textarea{
  border-radius: 10px;
  resize: vertical;
  width: 450px;
  border-width: 3px;
}
.comment_section{
  padding:6px;
  background-color: rgb(234, 234, 234);

}
.comment{
  padding:50px;
  width: 650px;
  margin: 15px;
}

.comment_gray{
  background-color: rgb(234, 234, 234);
}

.comment_white{
  background-color: white;
}




  .poppins-thin {
  font-family: "Poppins", sans-serif;
  font-weight: 100;
  font-style: normal;
}

.poppins-extralight {
  font-family: "Poppins", sans-serif;
  font-weight: 200;
  font-style: normal;
}

.poppins-light {
  font-family: "Poppins", sans-serif;
  font-weight: 300;
  font-style: normal;
}

.poppins-regular {
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-style: normal;
}

.poppins-medium {
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-style: normal;
}

.poppins-semibold {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-style: normal;
}

.poppins-bold {
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-style: normal;
}

.poppins-extrabold {
  font-family: "Poppins", sans-serif;
  font-weight: 800;
  font-style: normal;
}

.poppins-black {
  font-family: "Poppins", sans-serif;
  font-weight: 900;
  font-style: normal;
}

.poppins-thin-italic {
  font-family: "Poppins", sans-serif;
  font-weight: 100;
  font-style: italic;
}

.poppins-extralight-italic {
  font-family: "Poppins", sans-serif;
  font-weight: 200;
  font-style: italic;
}

.poppins-light-italic {
  font-family: "Poppins", sans-serif;
  font-weight: 300;
  font-style: italic;
}

.poppins-regular-italic {
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-style: italic;
}

.poppins-medium-italic {
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-style: italic;
}

.poppins-semibold-italic {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-style: italic;
}

.poppins-bold-italic {
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-style: italic;
}

.poppins-extrabold-italic {
  font-family: "Poppins", sans-serif;
  font-weight: 800;
  font-style: italic;
}

.poppins-black-italic {
  font-family: "Poppins", sans-serif;
  font-weight: 900;
  font-style: italic;
}
.image{
  max-height: 400px;
}
</style>
