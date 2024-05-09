<script setup lang="ts">
import { useRoute,useRouter } from 'vue-router';



const router = useRouter()
const route = useRoute()
const id = route.params.id
console.log(id)

</script>

<template>
{{  }}
</template>
