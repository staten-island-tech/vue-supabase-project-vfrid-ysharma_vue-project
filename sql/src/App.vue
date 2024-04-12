<script setup>
  import { ref, onMounted } from 'vue'
  import { supabase } from './lib/supabaseClient'
  import {RouterLink, RouterView} from 'vue-router'
  </script>

  <template>
    <RouterView/>
  </template>