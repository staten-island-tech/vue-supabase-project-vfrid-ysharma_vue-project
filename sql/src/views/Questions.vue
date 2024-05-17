<script setup>
  import { ref, onMounted } from 'vue'
  import { supabase } from '../lib/supabaseClient'

  const Questions = ref([])

  async function getQuestions() {
    const { data } = await supabase.from('questions').select()
    Questions.value = data
  }
  const searched = ref(null)
  // const form = document.querySelector("#form");
  // form.addEventListener("submit", function(e){
  //   e.preventDefault();
  //   const searched = document.querySelector("#search")
  //   console.log(searched.value)
  // })

  onMounted(() => {
    getQuestions()
  })
  
  console.log(Questions)
  </script>

  <template>
    <div class="navbar_container">
      <ul>
        <li class="dropdown"><a href="#"  class="dropbtn">Math</a>
          <div class="dropdown_content">
            <a>Algebra I</a>
            <a>Geometry</a>
            <a>Algebra II</a>
            <a>AP PreCalculus</a>
            <a>AP Calculus AB</a>
            <a>AP Calculus BC</a>
            <a>AP Statistics</a>
            <a>Multivariable Calculus</a>
            <a>Math Team</a>
          </div>
        </li>
        <li class="dropdown"><a href="#"  class="dropbtn">Technology</a>
          <div class="dropdown_content">
            <a>Intro to STEM Engineering and Robotics</a>
            <a>Intro to AV Engineering and TV Studio</a>
            <a>Computer Science and Engineering</a>
            <a>C.A.D.</a>
            <a>AP Computer Science Principles</a>
            <a>Advanced Computer Applications and Development</a>
            <a>Electronics and Green Technology</a>
            <a>Advanced AV Engineering and TV Studio 1</a>
            <a>Advanced AV Engineering and TV Studio 2/3</a>
            <a>Fundamentals of Engineering</a>
          </div>
        </li>
        <li class="dropdown"><a href="#" class="dropbtn">Science</a>
          <div class="dropdown_content">
            <a>Chemistry</a>
            <a>Regents Physics</a>
            <a>Physics in Medicine</a>
            <a>AP Physics 1</a>
            <a>AP Physics 2</a>
            <a>AP Physics C</a>
            <a>Applied Physics</a>
            <a>AP Environmental Science</a>
            <a>AP Psychology</a>
            <a>Forensic Science</a>
            <a>Biotechnology</a>
            <a>Human Anatomy and Physiology</a>
            <a>S.E.R.P.</a>
          </div>
        </li>
        <li class="dropdown"><a href="#" class="dropbtn">English</a>
          <div class="dropdown_content">
            <a>English 1/2</a>
            <a>English 3/4</a>
            <a>English 5/6</a>
            <a>AP English Language</a>
            <a>AP English Literature</a>
            <a>Modern Mythology: Gods and Monsters</a>
            <a>Creative Writing</a>
            <a>Publications</a>
            <a>Public Speaking</a>
          </div>
        </li>
        <li class="dropdown"><a href="#" class="dropbtn">Social Studies</a>
          <div class="dropdown_content">
            <a>AP World History: Ancient</a>
            <a>AP World History: Modern</a>
            <a>APUSH</a>
            <a>APUSH through Film, Art, and Music</a>
            <a>AP US Government and Politics</a>
            <a>Participation in Government</a>
            <a>Economics</a>
            <a>AP Macroeconomics</a>
          </div>
        </li>
        <li class="dropdown"><a href="#" class="dropbtn">Russian</a>
          <div class="dropdown_content">
            <a>Russian Language 1</a>
            <a>Russian Language: Heritage 1</a>
            <a>Russian Language 2</a>
            <a>Russian Language: Accelerated</a>
            <a>Russian Langugae: Advanced Heritage</a>
            <a>Russian Language 3</a>
            <a>College Russian Accelerated</a>
            <a>College Russian Advanced Heritage</a>
            <a>Russian for Business</a>
          </div>
        </li>
      </ul>
    </div>
    <div class="form_container">
      <label for="search" class="form_label">Search: </label>
     <input type="text" name="search" id="search" class="input_field" v-model="searched"/>
     <RouterLink :to="'/search/'+searched" class="search_btn">Update Information</RouterLink>
    </div>
    <div class="projcard-container">
    
    <div v-for="question in Questions"class="projcard projcard-blue">
      <div class="projcard-innerbox">
        <img class="projcard-img" :src="question.image" />
        <div class="projcard-textbox">
            <div class="projcard-username"><RouterLink  :to="'/profile/'+question.user">{{question.user}}</RouterLink></div> <!--  Remember to link this to the user's profile later! -->
          <div class="projcard-title">{{question.question_name}} <a class="projcard-button">Click For More</a> </div><!-- Remember to link this to the question view later! -->
          <div class="projcard-subtitle">Class: {{ question.class_name }}, Teacher: {{ question.teacher }}</div>
          <div class="projcard-bar"></div>
          <div class="projcard-description">{{ question.question_text }}</div>
          <div class="projcard-tagbox">Answered: {{ question.answered }}</div>
        </div>
      </div>
    </div>
    
  </div>
  </template>
  <style>
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
  margin-left: 50%;
  margin-right: 50%;
  margin-bottom: 10px;
  width: 1000px;
  justify-content: center;

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
  top:50px;
  position:absolute;
}
.navbar_container{
  display:inline;
  position:absolute;
  top:0%;
  z-index: 2;

  /* overflow:hidden; */
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
.dropdown:hover, .navbar_container{
  height: 100%;
}
</style>