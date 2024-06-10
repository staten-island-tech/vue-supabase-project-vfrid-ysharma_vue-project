<script setup>
import { useRoute,useRouter } from 'vue-router';
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabaseClient'
import { useSessionStore } from '@/stores/usersession.ts'  

  const sessionStore = useSessionStore()
  const router = useRouter()
  const route = useRoute()
  const name = route.params.name
  let question_text_f = ref('')
  const question_name_f = ref('')
  const pic_address = ref('')
  const class_name_f = ref('')
  const subject_f = ref('')
  const teacher_f = ref('')
  let question_name_error = ref('')
  let subject_error = ref('')
  let question_text_error = ref('')
  let teacher_error = ref('')
  let class_name_error = ref('')
  let grade_error = ref('')
    async function submit_supa() {
      if (pic_address.value=="" ){
        console.log(pic_address.value)
        pic_address.value="https://bupfgvujmfpqumcodids.supabase.co/storage/v1/object/sign/question_images/question_mark_default.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJxdWVzdGlvbl9pbWFnZXMvcXVlc3Rpb25fbWFya19kZWZhdWx0LnBuZyIsImlhdCI6MTcxMjMyNjA2MiwiZXhwIjoxNzQzODYyMDYyfQ.6Q7KiS7kH8vgT5wmBoyyth6adMKzOUAnvWwIFFgQ-uI&t=2024-04-05T14%3A12%3A17.644Z"
      }
      if(question_name_f.value != '' && question_text_f.value != '' && subject_f.value != '' && teacher_f.value != '' && class_name_f.value != '' ){
  const { data, error } = await supabase.from('questions').insert({
    user: sessionStore.session.user.user_metadata.username, 
    question_name: question_name_f.value, 
    question_text: question_text_f.value, 
    answered: 'False', 
    subject: subject_f.value, 
    teacher: teacher_f.value, 
    class_name: class_name_f.value,
    grade_level:sessionStore.session.user.user_metadata.grade,
    image:pic_address.value
  });


  if (error){ console.error('Error inserting data:', error);}
  else {
    console.log('Data inserted:', data);
    alert("thanks for asking a question!")
    router.push('/')
  }
}else{
  document.getElementById('main-wrapper').classList.add('formbold-main-wrapper-red')
  if(question_name_f.value == ''){
    question_name_error.value = "Please fill out this field"
  }else{
    question_name_error.value = ''
  }
  if(subject_f.value == ''){
    subject_error.value = "Please fill out this field"
  }
  if(question_text_f.value == ''){
    question_text_error.value = "Please fill out this field"
  }else{
    question_text_error.value = ''
  }
  if(teacher_f.value == ''){
    teacher_error.value = "Please fill out this field"
  }else{
    teacher_error.value = ''
  }
  if(class_name_f.value == ''){
    class_name_error.value = "Please fill out this field"
  }else{
    class_name_error.value = ''
  }
  }
}

    

    function update_radio(value){
      subject_f.value = value
    }


    function dropdown_f(value){
      class_name_f.value = value
      document.getElementById("myDropdown").classList.remove("show");
      document.getElementById('dd_btn').innerHTML = 'Selected: ' + value
    }


onMounted(() => {
//   getEntries()
})

function submit(){
  submit_supa()
}

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function filterFunction() {
  const input = document.getElementById("myInput");
  const filter = input.value.toUpperCase();
  // const filter ='S'
  let txtValue
  const div = document.getElementById("myDropdown");
  const a = div.getElementsByTagName("a");
  let displayedCount = 0; // Keep track of displayed links

  for (let i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1 && displayedCount < 11) {
      a[i].style.display = "";
      displayedCount++; // Increment displayed count
    } else {
      a[i].style.display = "none";
    }
  }
}



onMounted(() => {
//   getEntries()
filterFunction()

})

</script>

<template>
  <div id='main-wrapper'class="formbold-main-wrapper">
  <!-- Author: FormBold Team -->
  <!-- Learn More: https://formbold.com -->
  <div class="formbold-form-wrapper" v-if="sessionStore.session!=null">
    <!-- <RouterLink :to="'/'">< Back To Home</RouterLink><RouterLink :to="'/questions'"><  Back To Questions</RouterLink> -->
    <h2>Post A Question</h2>
    <form>
      <div class="formbold-input-group">
        <label for="name" class="formbold-form-label"> Question Title </label>
        <span class = 'error-message'>{{ question_name_error }}</span>
        <input
        v-model="question_name_f"
          type="text"
          name="title"
          id="name"
          placeholder="Enter title here..."
          class="formbold-form-input"
        />
      </div>

      <div class="formbold-input-group">
        <label for="email" class="formbold-form-label"> Class Name </label>
        <span class = 'error-message'>{{ class_name_error }}</span>

        <!--

        <input
        v-model="class_name_f"
          type="text"
          name="class_name"
          id="email"
          placeholder="Ex. Algebra II"
          class="formbold-form-input"
        /> -->

        
<div class="dropdown">
  <button id = 'dd_btn' type = 'button' @click="myFunction" class="dropbtn">Select a Class</button>
  <div id="myDropdown" class="dropdown-content">
    <input autocomplete="none" type="text" placeholder="Search.." id="myInput" @keyup="filterFunction">
    <a @click="dropdown_f('Algebra I')">Algebra I</a>
<a @click="dropdown_f('Geometry')">Geometry</a>
<a @click="dropdown_f('Algebra II')">Algebra II</a>
<a @click="dropdown_f('AP PreCalculus')">AP PreCalculus</a>
<a @click="dropdown_f('AP Calculus AB')">AP Calculus AB</a>
<a @click="dropdown_f('AP Calculus BC')">AP Calculus BC</a>
<a @click="dropdown_f('AP Statistics')">AP Statistics</a>
<a @click="dropdown_f('Multivariable Calculus')">Multivariable Calculus</a>
<a @click="dropdown_f('Math Team')">Math Team</a>
<a @click="dropdown_f('Intro to STEM Engineering and Robotics')">Intro to STEM Engineering and Robotics</a>
<a @click="dropdown_f('Intro to AV Engineering and TV Studio')">Intro to AV Engineering and TV Studio</a>
<a @click="dropdown_f('Computer Science and Engineering')">Computer Science and Engineering</a>
<a @click="dropdown_f('C.A.D.')">C.A.D.</a>
<a @click="dropdown_f('AP Computer Science Principles')">AP Computer Science Principles</a>
<a @click="dropdown_f('Advanced Computer Applications and Development')">Advanced Computer Applications and Development</a>
<a @click="dropdown_f('Electronics and Green Technology')">Electronics and Green Technology</a>
<a @click="dropdown_f('Advanced AV Engineering and TV Studio 1')">Advanced AV Engineering and TV Studio 1</a>
<a @click="dropdown_f('Advanced AV Engineering and TV Studio 2/3')">Advanced AV Engineering and TV Studio 2/3</a>
<a @click="dropdown_f('Fundamentals of Engineering')">Fundamentals of Engineering</a>
<a @click="dropdown_f('Chemistry')">Chemistry</a>
<a @click="dropdown_f('AP Chemistry')">AP Chemistry</a>
<a @click="dropdown_f('Physics in Medicine')">Physics in Medicine</a>
<a @click="dropdown_f('Regents Physics')">Regents Physics</a>
<a @click="dropdown_f('AP Physics 1')">AP Physics 1</a>
<a @click="dropdown_f('AP Physics 2')">AP Physics 2</a>
<a @click="dropdown_f('AP Physics C')">AP Physics C</a>
<a @click="dropdown_f('Applied Physics')">Applied Physics</a>
<a @click="dropdown_f('AP Environmental Science')">AP Environmental Science</a>
<a @click="dropdown_f('AP Psychology')">AP Psychology</a>
<a @click="dropdown_f('Forensic Science')">Forensic Science</a>
<a @click="dropdown_f('AP Biology')">AP Biology</a>
<a @click="dropdown_f('Biotechnology')">Biotechnology</a>
<a @click="dropdown_f('Human Anatomy and Physiology')">Human Anatomy and Physiology</a>
<a @click="dropdown_f('S.E.R.P.')">S.E.R.P.</a>
<a @click="dropdown_f('English 3/4')">English 3/4</a>
<a @click="dropdown_f('English 1/2')">English 1/2</a>
<a @click="dropdown_f('AP English Language')">AP English Language</a>
<a @click="dropdown_f('English 5/6')">English 5/6</a>
<a @click="dropdown_f('AP English Literature')">AP English Literature</a>
<a @click="dropdown_f('Modern Mythology: Gods and Monsters')">Modern Mythology: Gods and Monsters</a>
<a @click="dropdown_f('Creative Writing')">Creative Writing</a>
<a @click="dropdown_f('Publications')">Publications</a>
<a @click="dropdown_f('Public Speaking')">Public Speaking</a>
<a @click="dropdown_f('AP World History: Modern')">AP World History: Modern</a>
<a @click="dropdown_f('AP World History: Ancient')">AP World History: Ancient</a>
<a @click="dropdown_f('APUSH')">APUSH</a>
<a @click="dropdown_f('APUSH through Film, Art, and Music')">APUSH through Film, Art, and Music</a>
<a @click="dropdown_f('AP US Government and Politics')">AP US Government and Politics</a>
<a @click="dropdown_f('Participation in Government')">Participation in Government</a>
<a @click="dropdown_f('Economics')">Economics</a>
<a @click="dropdown_f('AP Macroeconomics')">AP Macroeconomics</a>
<a @click="dropdown_f('Russian Language 1')">Russian Language 1</a>
<a @click="dropdown_f('Russian Language: Heritage 1')">Russian Language: Heritage 1</a>
<a @click="dropdown_f('Russian Language 2')">Russian Language 2</a>
<a @click="dropdown_f('Russian Language: Accelerated')">Russian Language: Accelerated</a>
<a @click="dropdown_f('Russian Language: Advanced Heritage')">Russian Language: Advanced Heritage</a>
<a @click="dropdown_f('Russian Language 3')">Russian Language 3</a>
<a @click="dropdown_f('College Russian Accelerated')">College Russian Accelerated</a>
<a @click="dropdown_f('College Russian Advanced Heritage')">College Russian Advanced Heritage</a>
<a @click="dropdown_f('Russian for Business')">Russian for Business</a>

 

  </div>
</div>

      </div>

      <div class="formbold-input-group">
        <label for="age" class="formbold-form-label"> Teacher Name </label>
        <span class = 'error-message'>{{ teacher_error }}</span>
        <input
        v-model="teacher_f"
          type="text"
          name="age"
          id="age"
          placeholder="Name of this subject teacher"
          class="formbold-form-input"
        />
      </div>

      <div class="formbold-input-group">
        <label class="formbold-form-label">
          Grade Level?
        </label>
        <span class = 'error-message'>{{ grade_error }}</span>

      </div>

      <div class="formbold-input-radio-wrapper">
        <label for="ans" class="formbold-form-label">
          Subject
        </label>
        <span class = 'error-message'>{{ subject_error }}</span>
        <div class="formbold-radio-flex">
          <div class="formbold-radio-group">
            <label class="formbold-radio-label">
              <input
              @click="update_radio('Math')"
                class="formbold-input-radio"
                type="radio"
                name="ans"
                id="ans"
                value="Math"
              />
              Math
              <span class="formbold-radio-checkmark"></span>
            </label>
          </div>

          <div class="formbold-radio-group">
            <label class="formbold-radio-label">
              <input
              @click="update_radio('Science')"
                class="formbold-input-radio"
                type="radio"
                name="ans"
                id="ans"
                value="Science"
              />
              Science
              <span class="formbold-radio-checkmark"></span>
            </label>
          </div>
          <div class="formbold-radio-group">
            <label class="formbold-radio-label">
              <input
              @click="update_radio('Tecnhology')"
                class="formbold-input-radio"
                type="radio"
                name="ans"
                id="ans"
                value="Technology"
              />
              Technology
              <span class="formbold-radio-checkmark"></span>
            </label>
          </div>

          <div class="formbold-radio-group">
            <label class="formbold-radio-label">
              <input
              @click="update_radio('English')"
                class="formbold-input-radio"
                type="radio"
                name="ans"
                id="ans"
                value="English"
              />
              English
              <span class="formbold-radio-checkmark"></span>
            </label>
          </div>
          <div class="formbold-radio-group">
            <label class="formbold-radio-label">
              <input
              @click="update_radio('English')"
                class="formbold-input-radio"
                type="radio"
                name="ans"
                id="ans"
                value="English"
              />
              Russian
              <span class="formbold-radio-checkmark"></span>
            </label>
          </div>
          <div class="formbold-radio-group">
            <label class="formbold-radio-label">
              <input
              @click="update_radio('English')"
                class="formbold-input-radio"
                type="radio"
                name="ans"
                id="ans"
                value="English"
              />
              Social Studies
              <span class="formbold-radio-checkmark"></span>
            </label>
          </div>
        </div>
      </div>
	  

      <div>
        <label for="message" class="formbold-form-label">
          Question Text
        </label>
        <span class = 'error-message'>{{ question_text_error }}</span>
        <textarea
        v-model="question_text_f"
          rows="12"
          name="message"
          id="message"
          placeholder="Whats on your mind?"
          class="formbold-form-input"
        ></textarea>
      </div>
      <div>
        <label for="message" class="formbold-form-label">
          Image Address
        </label>
        <textarea
        v-model="pic_address"
          rows="3"
          name="message"
          id="message"
          placeholder="Image Adress"
          class="formbold-form-input"
        ></textarea>
      </div>
      <button type = 'button' @click="submit" class="formbold-btn">Submit</button>
    </form>
  </div>
  <div v-else>
    Please Sign In
  </div>
</div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

.dropbtn:hover, .dropbtn:focus {
  background-color: #3e8e41;
}

#myInput {
  box-sizing: border-box;
  background-image: url('searchicon.png');
  background-position: 14px 12px;
  background-repeat: no-repeat;
  font-size: 16px;
  padding: 14px 200px 12px 45px;
  border: none;
  border-bottom: 1px solid #ddd;
}

#myInput:focus {outline: 3px solid #ddd;}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f6f6f6;
  min-width: 400px;
  overflow: auto;
  border: 1px solid #ddd;
  z-index: 1;
}

.dropdown-content a {
  color: black;
  text-decoration: none;
  display: block;
}

.dropdown a:hover {background-color: #ddd;}

.show {display: block;}
  body {
    font-family: 'Inter', sans-serif;
  }
  h2{
    font-family: 'Inter', sans-serif;
  }
  .formbold-main-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 48px;
    background-color: rgb(252, 250, 255);
  }

  .formbold-form-wrapper {
    margin: 0 auto;
    max-width: 570px;
    width: 100%;
    background: white;
    padding: 40px;
    border-radius: 5px;
    border: 1px solid #6a64f1;
    /* box-shadow: 1px 1px 1px 1px; */
  }

  .formbold-form-img {
    margin-bottom: 45px;
  }

  .formbold-input-group {
    margin-bottom: 18px;
  }

  .formbold-form-select {
    width: 100%;
    padding: 12px 22px;
    border-radius: 5px;
    border: 1px solid #dde3ec;
    background: #ffffff;
    font-size: 16px;
    color: #536387;
    outline: none;
    resize: none;
  }

  .formbold-input-radio-wrapper {
    margin-bottom: 25px;
  }
  .formbold-radio-flex {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .formbold-radio-label {
    font-size: 14px;
    line-height: 24px;
    color: #07074d;
    position: relative;
    padding-left: 25px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .formbold-input-radio {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }
  .formbold-radio-checkmark {
    position: absolute;
    top: -1px;
    left: 0;
    height: 18px;
    width: 18px;
    background-color: #ffffff;
    border: 1px solid #dde3ec;
    border-radius: 50%;
  }
  .formbold-radio-label
    .formbold-input-radio:checked
    ~ .formbold-radio-checkmark {
    background-color: #6a64f1;
  }
  .formbold-radio-checkmark:after {
    content: '';
    position: absolute;
    display: none;
  }

  .formbold-radio-label
    .formbold-input-radio:checked
    ~ .formbold-radio-checkmark:after {
    display: block;
  }

  .formbold-radio-label .formbold-radio-checkmark:after {
    top: 50%;
    left: 50%;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #ffffff;
    transform: translate(-50%, -50%);
  }

  .formbold-form-input {
    width: 100%;
    padding: 13px 22px;
    border-radius: 5px;
    border: 1px solid #dde3ec;
    background: #ffffff;
    font-weight: 500;
    font-size: 16px;
    color: #07074d;
    outline: none;
    resize: none;
  }
  .formbold-form-input::placeholder {
    color: #536387;
  }
  .formbold-form-input:focus {
    border-color: #6a64f1;
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.05);
  }
  .formbold-form-label {
    color: #07074d;
    font-size: 14px;
    line-height: 24px;
    display: block;
    margin-bottom: 10px;
  }

  .formbold-btn {
    text-align: center;
    width: 100%;
    font-size: 16px;
    border-radius: 5px;
    padding: 14px 25px;
    border: none;
    font-weight: 500;
    background-color: #6a64f1;
    color: white;
    cursor: pointer;
    margin-top: 25px;
  }
  .formbold-btn:hover {
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.05);
  }

  .formbold-main-wrapper-red{
    background-color: rgb(255, 227, 227);
  }
  .error-message{
    color:red;
  }

  #dd_btn{
    color: #07074d;
    background: #ffffff;
    padding: 10px;
    border: 1px solid #07074d;
    border-radius: 5px;
    cursor: pointer;
    transition-duration: 100ms;
  }

  #dd_btn:hover{
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.05);

  }

  #myDropdown a{
    height:40px;
    border-radius: 0px;
    display: flex;
    align-items: center;
    padding: 10px 20px;
    cursor: pointer;
  }
</style>
