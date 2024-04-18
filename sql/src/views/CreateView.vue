<script setup>
import { useRoute,useRouter } from 'vue-router';
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabaseClient'
  const router = useRouter()
  const route = useRoute()
  const name = route.params.name
  let question_text_f = ref('')
  const question_name_f = ref('')
  const class_name_f = ref('')
  const user = 'simonsaff'
  //run pinia code later to get this
  const subject_f = ref('')
  const teacher_f = ref('')
    async function submit_supa() {
      console.log(question_name_f)
  const { data, error } = await supabase.from('questions').insert({
    user: 'simonsaff', 
    question_name: question_name_f.value, 
    question_text: question_text_f.value, 
    answered: 'False', 
    subject: subject_f.value, 
    teacher: teacher_f.value, 
    class_name: class_name_f.value
  });

  if (error) console.error('Error inserting data:', error);
  else console.log('Data inserted:', data);
}


//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

$(".next").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	next_fs = $(this).parent().next();
	
	//activate next step on progressbar using the index of next_fs
	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
	
	//show the next fieldset
	next_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale current_fs down to 80%
			scale = 1 - (1 - now) * 0.2;
			//2. bring next_fs from the right(50%)
			left = (now * 50)+"%";
			//3. increase opacity of next_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({
        'transform': 'scale('+scale+')',
        'position': 'absolute'
      });
			next_fs.css({'left': left, 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(".previous").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();
	
	//de-activate current step on progressbar
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
	
	//show the previous fieldset
	previous_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			left = ((1-now) * 50)+"%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'left': left});
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});



onMounted(() => {
//   getEntries()
})

function submit(){
  console.log('sumbitted')
  submit_supa()
}

</script>

<template>
  <div class="formbold-main-wrapper">
  <!-- Author: FormBold Team -->
  <!-- Learn More: https://formbold.com -->
  <div class="formbold-form-wrapper">
    <h2>Post A Question</h2>
    <form>
      <div class="formbold-input-group">
        <label for="name" class="formbold-form-label"> Question Title </label>
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

        <select class="formbold-form-select" v-model = 'subject_f' name="occupation" id="occupation">
          <option value="Freshman">Freshman</option>
          <option value="Sophmore">Sophmore</option>
          <option value="Junior">Junior</option>
          <option value="Senior">Senior</option>
        </select>
      </div>

      <div class="formbold-input-radio-wrapper">
        <label for="ans" class="formbold-form-label">
          Subject
        </label>

        <div class="formbold-radio-flex">
          <div class="formbold-radio-group">
            <label class="formbold-radio-label">
              <input
                class="formbold-input-radio"
                type="radio"
                name="ans"
                id="ans"
              />
              Math
              <span class="formbold-radio-checkmark"></span>
            </label>
          </div>

          <div class="formbold-radio-group">
            <label class="formbold-radio-label">
              <input
                class="formbold-input-radio"
                type="radio"
                name="ans"
                id="ans"
              />
              Science
              <span class="formbold-radio-checkmark"></span>
            </label>
          </div>
          <div class="formbold-radio-group">
            <label class="formbold-radio-label">
              <input
                class="formbold-input-radio"
                type="radio"
                name="ans"
                id="ans"
              />
              Technology
              <span class="formbold-radio-checkmark"></span>
            </label>
          </div>

          <div class="formbold-radio-group">
            <label class="formbold-radio-label">
              <input
                class="formbold-input-radio"
                type="radio"
                name="ans"
                id="ans"
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
  }

  .formbold-form-wrapper {
    margin: 0 auto;
    max-width: 570px;
    width: 100%;
    background: white;
    padding: 40px;
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
</style>
