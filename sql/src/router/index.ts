import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Questions from '../views/Questions.vue'
import Profile from '../views/Profile.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/questions',
      name: 'questions',
      component: Questions
    },
    {
      path: '/profile/:username',
      name: 'profile',
      component: Profile
    },
    {
      path:'/search/:search',
      name:'search',
      component: Questions
    }

  ]
})

export default router
