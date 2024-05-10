<script setup lang="ts">
import { useSessionStore } from '@/stores/usersession.ts'
const sessionStore = useSessionStore()
function print(){
  console.log(sessionStore.session.user)
  console.log(sessionStore.session.session)

}
</script>

<template>
  <main>
    <button @click="print()">print</button>
  </main>
</template>
