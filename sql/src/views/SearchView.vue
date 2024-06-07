<template>
  <div class="about">
    <h1>Here are the results for: {{ name }}</h1>

    <div v-if="filtered.length === 0">No results found.</div>

    <div v-else>
      <div v-for="i in filtered" :key="i.id">
        <SearchQuestionComponent
          :id="i.id"
          :title="i.question_name"
          :subject="i.subject"
          :class_name="i.class_name"
          :question_text="i.question_text"
          :img_url="i.image"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { supabase } from '../lib/supabaseClient';
import SearchQuestionComponent from '../components/SearchQuestionComponent.vue';

const router = useRouter();
const route = useRoute();
const name = route.params.name;

const all_questions = ref<any[]>([]);
const filtered = ref<any[]>([]);

async function getEntries() {
  const { data, error } = await supabase.from('questions').select();
  if (error) {
    console.error('Error fetching data:', error.message);
    return;
  }

  all_questions.value = data || []; // Handling potential null value

  filtered.value = all_questions.value.filter(i =>
    typeof i.question_name === 'string' &&
    i.question_name.toLowerCase().includes(String(name).toLowerCase())
  );
}

onMounted(() => {
  getEntries();
});
</script>

<style scoped>
.about {
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 10%;
}
</style>