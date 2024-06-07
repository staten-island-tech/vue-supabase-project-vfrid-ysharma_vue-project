<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabaseClient'
import { useSessionStore } from '@/stores/usersession.ts'

const Questions = ref<any[]>([])

async function getQuestions() {
  const { data } = await supabase.from('questions').select()
  Questions.value = data || []
}

const name = ref<string | null>(null)

async function subject_search(subject: string) {
  console.log(subject)
  const { data } = await supabase.from('questions').select().eq('class_name', subject)
  Questions.value = data || []
  show_return()
}

function reload() {
  getQuestions()
  hide_return()
}

function show_return() {
  const returnToQ = document.querySelector('.return_to_q')
  if (returnToQ) {
    returnToQ.style.display = 'block'
  }
}

function hide_return() {
  const returnToQ = document.querySelector('.return_to_q')
  if (returnToQ) {
    returnToQ.style.display = 'none'
  }
}

onMounted(() => {
  getQuestions()
})

const sessionStore = useSessionStore()

function print() {
  console.log(sessionStore.session.user)
  console.log(sessionStore.session.session)
}

function logout() {
  location.reload()
}

console.log(sessionStore.session)
console.log(Questions)



  // import { ref, onMounted } from 'vue'
  // import { supabase } from '../lib/supabaseClient'
  // import { useSessionStore } from '@/stores/usersession.ts'  


  // const Questions = ref([])

  // async function getQuestions() {
  //   const { data } = await supabase.from('questions').select()
  //   Questions.value = data
  // }
  // const name = ref(null)
  // // const form = document.querySelector("#form");
  // // form.addEventListener("submit", function(e){
  // //   e.preventDefault();
  // //   const searched = document.querySelector("#search")
  // //   console.log(searched.value)
  // // })
  // async function subject_search(subject){
  //   console.log(subject)
  //   const {data} = await supabase.from('questions').select().eq('class_name',subject)
  //   Questions.value = data
  //   show_return();
  // }
  // function reload(){
  //   getQuestions();
  //   hide_return();
  // }
  // function show_return(){
  //   document.querySelector(".return_to_q").style.display="block";
  // }
  // function hide_return(){
  //   document.querySelector(".return_to_q").style.display="none";
  // }
  // onMounted(() => {
  //   getQuestions()
  // })
  
  
  // const sessionStore = useSessionStore()
  // function print(){
  //   console.log(sessionStore.session.user)
  //   console.log(sessionStore.session.session)

  // }
  // function logout(){
  //   location.reload()
  // }
  // console.log(sessionStore.session)
  // console.log(Questions)
  </script>

  <template>
    <div class="navbar_container">
      <ul>
        <li class="dropdown"><a href="#"  class="dropbtn">Math</a>
          <div class="dropdown_content">
            <a @click="subject_search('Algebra I');">Algebra I</a>
            <a @click="subject_search('Geometry');">Geometry</a>
            <a @click="subject_search('Algebra II');">Algebra II</a>
            <a @click="subject_search('AP PreCalculus');">AP PreCalculus</a>
            <a @click="subject_search('AP Calculus AB');">AP Calculus AB</a>
            <a @click="subject_search('AP Calculus BC');">AP Calculus BC</a>
            <a @click="subject_search('AP Statistics');">AP Statistics</a>
            <a @click="subject_search('Multivariable Calculus');">Multivariable Calculus</a>
            <a @click="subject_search('Math Team');">Math Team</a>
          </div>
        </li>
        <li class="dropdown"><a href="#"  class="dropbtn">Technology</a>
          <div class="dropdown_content">
            <a @click="subject_search('Intro to STEM Engineering and Robotics');">Intro to STEM Engineering and Robotics</a>
            <a @click="subject_search('Intro to AV Engineering and TV Studio');">Intro to AV Engineering and TV Studio</a>
            <a @click="subject_search('Computer Science and Engineering');">Computer Science and Engineering</a>
            <a @click="subject_search('C.A.D.');">C.A.D.</a>
            <a @click="subject_search('AP Computer Science Principles');">AP Computer Science Principles</a>
            <a @click="subject_search('Advanced Computer Applications and Development');">Advanced Computer Applications and Development</a>
            <a @click="subject_search('Electronics and Green Technology');">Electronics and Green Technology</a>
            <a @click="subject_search('Advanced AV Engineering and TV Studio 1');">Advanced AV Engineering and TV Studio 1</a>
            <a @click="subject_search('Advanced AV Engineering and TV Studio 2/3');">Advanced AV Engineering and TV Studio 2/3</a>
            <a @click="subject_search('Fundamentals of Engineering');">Fundamentals of Engineering</a>
          </div>
        </li>
        <li class="dropdown"><a href="#" class="dropbtn">Science</a>
          <div class="dropdown_content">
            <a @click="subject_search('Chemistry')">Chemistry</a>
            <a @click="subject_search('AP Chemistry')">AP Chemistry</a>
            <a @click="subject_search('Physics in Medicine')">Physics in Medicine</a>
            <a @click="subject_search('Regents Physics')">Regents Physics</a>
            <a @click="subject_search('AP Physics 1');">AP Physics 1</a>
            <a @click="subject_search('AP Physics 2');">AP Physics 2</a>
            <a @click="subject_search('AP Physics C');">AP Physics C</a>
            <a @click="subject_search('Applied Physics');">Applied Physics</a>
            <a @click="subject_search('AP Environmental Science');">AP Environmental Science</a>
            <a @click="subject_search('AP Psychology');">AP Psychology</a>
            <a @click="subject_search('Forensic Science');">Forensic Science</a>
            <a @click="subject_search('AP Biology');">AP Biology</a>
            <a @click="subject_search('Biotechnology');">Biotechnology</a>
            <a @click="subject_search('Human Anatomy and Physiology');">Human Anatomy and Physiology</a>
            <a @click="subject_search('S.E.R.P.');">S.E.R.P.</a>
          </div>
        </li>
        <li class="dropdown"><a href="#" class="dropbtn">English</a>
          <div class="dropdown_content">
            <a @click="subject_search('English 3/4');">English 3/4</a>
            <a @click="subject_search('English 1/2');">English 1/2</a>
            <a @click="subject_search('AP English Language');">AP English Language</a>
            <a @click="subject_search('English 5/6');">English 5/6</a>
            <a @click="subject_search('AP English Literature');">AP English Literature</a>
            <a @click="subject_search('Modern Mythology: Gods and Monsters');">Modern Mythology: Gods and Monsters</a>
            <a @click="subject_search('Creative Writing');">Creative Writing</a>
            <a @click="subject_search('Publications');">Publications</a>
            <a @click="subject_search('Public Speaking');">Public Speaking</a>
          </div>
        </li>
        <li class="dropdown"><a href="#" class="dropbtn">Social Studies</a>
          <div class="dropdown_content">
            <a @click="subject_search('AP World History: Modern');">AP World History: Modern</a>
            <a @click="subject_search('AP World History: Ancient');">AP World History: Ancient</a>
            <a @click="subject_search('APUSH');">APUSH</a>
            <a @click="subject_search('APUSH through Film, Art, and Music');">APUSH through Film, Art, and Music</a>
            <a @click="subject_search('AP US Government and Politics');">AP US Government and Politics</a>
            <a @click="subject_search('Participation in Government');">Participation in Government</a>
            <a @click="subject_search('Economics');">Economics</a>
            <a @click="subject_search('AP Macroeconomics');">AP Macroeconomics</a>
          </div>
        </li>
        <li class="dropdown"><a href="#" class="dropbtn">Russian</a>
          <div class="dropdown_content">
            <a @click="subject_search('Russian Language 1');">Russian Language 1</a>
            <a @click="subject_search('Russian Language: Heritage 1');">Russian Language: Heritage 1</a>
            <a @click="subject_search('Russian Language 2');">Russian Language 2</a>
            <a @click="subject_search('Russian Language: Accelerated');">Russian Language: Accelerated</a>
            <a @click="subject_search('Russian Language: Advanced Heritage');">Russian Language: Advanced Heritage</a>
            <a @click="subject_search('Russian Language 3');">Russian Language 3</a>
            <a @click="subject_search('Collee Russian Accelerated');">College Russian Accelerated</a>
            <a @click="subject_search('College Russian Advanced Heritage');">College Russian Advanced Heritage</a>
            <a @click="subject_search('Russian for Business');">Russian for Business</a>
          </div>
        </li>
      </ul>
    </div>
    <div class="form_container">
      <label for="search" class="form_label">Search: </label>
     <input type="text" name="search" id="search" class="input_field" v-model="name" autocomplete="off"/>
     <RouterLink :to="'/search/'+name" class="search_btn" @click="show_return()">Update Information</RouterLink>
     <div class="return_to_q"><RouterLink :to="'/questions'" @click="reload()">Return To All</RouterLink></div>
    </div>
    <div class="projcard-container">
    
    <div v-for="question in Questions"class="projcard projcard-blue">
      <div class="projcard-innerbox">
        <img class="projcard-img" :src="question.image" />
        <div class="projcard-textbox">
            <div class="projcard-username"><RouterLink  :to="'/profile/'+question.user">{{question.user}}</RouterLink></div> <!--  Remember to link this to the user's profile later! -->
          <div class="projcard-title">{{question.question_name}} <RouterLink  :to="'/question/'+question.id">Click For More</RouterLink> </div><!-- Remember to link this to the question view later! -->
          <div class="projcard-subtitle">Class: {{ question.class_name }}, Teacher: {{ question.teacher }}</div>
          <div class="projcard-bar"></div>
          <div class="projcard-description">{{ question.question_text }}</div>
          <div class="projcard-tagbox">Answered: {{ question.answered }}</div>
        </div>
      </div>
    </div>
    
  </div>
  <!-- <div class="links">
    <RouterLink :to="'/'">Home</RouterLink>
    <div v-if="sessionStore.session!=null"><RouterLink :to="'/profile/'+sessionStore.session.user.user_metadata.username">Profile</RouterLink> <RouterLink :to="'/create'">Create Question</RouterLink></div>
    <div v-if="sessionStore.session===null"><RouterLink to="/LogIn" >Go to Login</RouterLink></div> <div v-if="sessionStore.session!=null"><a @click="logout()">Logout</a></div>
  </div> -->
  </template>
  <style scoped>
body {
  font-family: 'Open Sans', arial, sans-serif;
  color: #333;
  font-size: 14px;
  overflow: scroll;
  overflow-x: hidden;
  justify-content: center;
}
/* .projcard-container {
  margin: 50px 0;
  justify-content: center;
  left: 50%;
} */

/* Actual Code: */
.projcard-container,
.projcard-container * {
  box-sizing: border-box;
  z-index: 1;
}
.projcard-container {
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
  width: 1000px;
  justify-content: center;
  margin-top: 60px;

}
.projcard {
  position: relative;
  width: 100%;
  height: 300px;
  margin-bottom: 40px;
  border-radius: 10px;
  background-color: #fff;
  border: 2px solid #ddd;
  font-size: 18px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 4px 21px -12px rgba(0, 0, 0, .66);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  justify-content: center;

}
.projcard:hover {
  box-shadow: 0 34px 32px -33px rgba(0, 0, 0, .18);
  transform: translate(0px, -3px);
}
.projcard::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: linear-gradient(-70deg, #424242, transparent 50%);
  opacity: 0.07;
}
.projcard:nth-child(2n)::before {
  background-image: linear-gradient(-250deg, #424242, transparent 50%);
}
.projcard-innerbox {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.projcard-img {
  position: absolute;
  height: 300px;
  width: 340px;
  top: 0;
  left: 0;
  /* transition: transform 0.2s ease; */
}
.projcard:nth-child(2n) .projcard-img {
  left: initial;
  right: 0;
}
/* .projcard:hover .projcard-img {
  transform: scale(1.05) rotate(1deg);
} */
.projcard:hover .projcard-bar {
  width: 70px;
}
.projcard-textbox {
  position: absolute;
  top: 7%;
  bottom: 7%;
  left: 430px;
  width: calc(100% - 470px);
  font-size: 17px;
}
.projcard:nth-child(2n) .projcard-textbox {
  left: initial;
  right: 430px;
}
.projcard-textbox::before,
.projcard-textbox::after {
  content: "";
  position: absolute;
  display: block;
  background: #ff0000bb;
  background: #fff;
  top: -20%;
  left: -55px;
  height: 140%;
  width: 60px;
  transform: rotate(8deg);
}
.projcard:nth-child(2n) .projcard-textbox::before {
  display: none;
}
.projcard-textbox::after {
  display: none;
  left: initial;
  right: -55px;
}
.projcard:nth-child(2n) .projcard-textbox::after {
  display: block;
}
.projcard-textbox * {
  position: relative;
}
.projcard-title {
  font-family: 'Voces', 'Open Sans', arial, sans-serif;
  font-size: 24px;
}
.projcard-subtitle {
  font-family: 'Voces', 'Open Sans', arial, sans-serif;
  color: #727272;
}
.projcard-bar {
  left: -2px;
  width: 50px;
  height: 5px;
  margin: 10px 0;
  border-radius: 5px;
  background-color: #424242;
  transition: width 0.2s ease;
}
.projcard-blue .projcard-bar { background-color: #0088FF; }
.projcard-blue::before { background-image: linear-gradient(-70deg, #0088FF, transparent 50%); }
.projcard-blue:nth-child(2n)::before { background-image: linear-gradient(-250deg, #0088FF, transparent 50%); }
.projcard-red .projcard-bar { background-color: #D62F1F; }
.projcard-red::before { background-image: linear-gradient(-70deg, #D62F1F, transparent 50%); }
.projcard-red:nth-child(2n)::before { background-image: linear-gradient(-250deg, #D62F1F, transparent 50%); }
.projcard-green .projcard-bar { background-color: #40BD00; }
.projcard-green::before { background-image: linear-gradient(-70deg, #40BD00, transparent 50%); }
.projcard-green:nth-child(2n)::before { background-image: linear-gradient(-250deg, #40BD00, transparent 50%); }
.projcard-yellow .projcard-bar { background-color: #F5AF41; }
.projcard-yellow::before { background-image: linear-gradient(-70deg, #F5AF41, transparent 50%); }
.projcard-yellow:nth-child(2n)::before { background-image: linear-gradient(-250deg, #F5AF41, transparent 50%); }
.projcard-orange .projcard-bar { background-color: #FF5722; }
.projcard-orange::before { background-image: linear-gradient(-70deg, #FF5722, transparent 50%); }
.projcard-orange:nth-child(2n)::before { background-image: linear-gradient(-250deg, #FF5722, transparent 50%); }
.projcard-brown .projcard-bar { background-color: #C49863; }
.projcard-brown::before { background-image: linear-gradient(-70deg, #C49863, transparent 50%); }
.projcard-brown:nth-child(2n)::before { background-image: linear-gradient(-250deg, #C49863, transparent 50%); }
.projcard-grey .projcard-bar { background-color: #424242; }
.projcard-grey::before { background-image: linear-gradient(-70deg, #424242, transparent 50%); }
.projcard-grey:nth-child(2n)::before { background-image: linear-gradient(-250deg, #424242, transparent 50%); }
.projcard-customcolor .projcard-bar { background-color: var(--projcard-color); }
.projcard-customcolor::before { background-image: linear-gradient(-70deg, var(--projcard-color), transparent 50%); }
.projcard-customcolor:nth-child(2n)::before { background-image: linear-gradient(-250deg, var(--projcard-color), transparent 50%); }
.projcard-description {
  z-index: 10;
  font-size: 15px;
  color: #424242;
  height: 125px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.projcard-tagbox {
  position: absolute;
  bottom: 3%;
  font-size: 14px;
  cursor: default;
  user-select: none;
  pointer-events: none;
}
.projcard-tag {
  display: inline-block;
  background: #E0E0E0;
  color: #777;
  border-radius: 3px 0 0 3px;
  line-height: 26px;
  padding: 0 10px 0 23px;
  position: relative;
  margin-right: 20px;
  cursor: default;
  user-select: none;
  transition: color 0.2s;
}
.projcard-tag::before {
  content: '';
  position: absolute;
  background: #fff;
  border-radius: 10px;
  box-shadow: inset 0 1px rgba(0, 0, 0, 0.25);
  height: 6px;
  left: 10px;
  width: 6px;
  top: 10px;
}
.projcard-tag::after {
  content: '';
  position: absolute;
  border-bottom: 13px solid transparent;
  border-left: 10px solid #E0E0E0;
  border-top: 13px solid transparent;
  right: -10px;
  top: 0;
}
.projcard-button{
  font-size:16px;
}
.input_field{
  width:200px;
}
.form_container{
  display:inline;
  font-family: 'Voces', 'Open Sans', arial, sans-serif;
  font-weight: 600;
  height: 50px;
  top:335px;
  position:absolute;
  z-index: 2;
}
.navbar_container{
  display:inline;
  position:absolute;
  top:0%;
  z-index: 2;
  height: 50px;
}
.navbar_container li {
  float: left;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  width: 300px;
}
.dropdown {
  float: left;
  overflow:hidden;
}
.navbar_container li:hover, .dropdown:hover .dropbtn {
  background-color: #0088FF;
  color:#ddd;
}
.dropdown_content {
  display: none;
  position: absolute;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  margin-top: 15px;

}
.dropdown_content a {
  /* float: none; */
  color: black;
  /* padding: 12px 16px; */
  display: block;
  text-align: center;
  border-radius: 0px;
  background-color: white

}
/* .dropdown_content a:hover {
  background-color: #ddd;
} */
.dropdown_content a:hover{
  background-color: #8bc9ff;
  color:white;
  z-index: 2;
}
/* Show the dropdown menu on hover */
.dropdown:hover .dropdown_content {
  display: block;
  overflow-y: visible;
}
.return_to_q{
  margin: 15px;
  display:none;
  font-size: 20px;
}
.links{
  position:absolute;
  top: 300px;
  right: 50px;
  font-size: 30px;
}
</style>