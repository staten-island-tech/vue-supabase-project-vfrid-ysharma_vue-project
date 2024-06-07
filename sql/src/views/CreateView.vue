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
      if(question_name_f.value != '' && question_text_f.value != '' && subject_f.value != '' && teacher_f.value != '' && class_name_f.value != '' ){
  const { data, error } = await supabase.from('questions').insert({
    user: sessionStore.session.user.user_metadata.username, 
    question_name: question_name_f.value, 
    question_text: question_text_f.value, 
    answered: 'False', 
    subject: subject_f.value, 
    teacher: teacher_f.value, 
    class_name: class_name_f.value,
    grade_level:sessionStore.session.user.user_metadata.grade
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

onMounted(() => {
//   getEntries()
})

function submit(){
  submit_supa()
}

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

        <input
        v-model="class_name_f"
          type="text"
          name="class_name"
          id="email"
          placeholder="Ex. Algebra II"
          class="formbold-form-input"
        />
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

      <button type = 'button' @click="submit" class="formbold-btn">Submit</button>
    </form>
  </div>
  <div v-else>
    Please Sign In
  </div>
</div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

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
</style>
