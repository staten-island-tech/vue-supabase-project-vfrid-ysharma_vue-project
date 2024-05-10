<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { supabase } from '../lib/supabaseClient';
import { onMounted, ref } from 'vue';

const router = useRouter();
const route = useRoute();
const id = route.params.id;
let question = ref();
let changed = ref(false);
let loading = ref(true); // Added loading state

async function getEntries() {
  try {
    const { data, error } = await supabase.from('questions').select().eq('id', id);
    if (error) throw error; // Throw error if any occurs
    question.value = data;
    changed.value = true;
    loading.value = false; // Set loading to false once data is fetched
    console.log(question.value)
  } catch (error) {
    console.error("Failed to fetch question:", error);
    // Handle error appropriately
  }
}

onMounted(() => {
  getEntries();
});
</script>

<template>
<div v-if='loading' class="loading-state">Loading...</div>
  <div v-else-if='changed' class="container-card">
    <h1>{{ question.value}}</h1>
    <!-- Rest of your template -->
    {{ question.value }}
  </div>
</template>

<style scoped>
.container-card{
  border: 2px solid black;
  border-radius: 20px;
  margin:10%;
  padding: 20px;
}
.loading-state {
  text-align: center;
  padding-top: 20%;
}
</style>
