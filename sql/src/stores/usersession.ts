import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSessionStore = defineStore('session', () => {
  const session = null
  // this assumes `app.provide('appProvided', 'value')` was called
  function setSession(newSession){
    sessionStorage.value = newSession
  }

  return {
    session, setSession
  }
})