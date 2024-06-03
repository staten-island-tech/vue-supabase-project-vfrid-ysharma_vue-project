import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LogInView from '../views/LogInView.vue'
import Questions from '../views/Questions.vue'
import Profile from '../views/Profile.vue'
import CreateView from '../views/CreateView.vue'
import SubmittedView from '../views/SubmittedView.vue'
import QuestionView from '@/views/QuestionView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/LogIn',
      name: 'LogIn',
      component: LogInView
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
      path: '/search/:name',
      name: 'searched',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SearchView.vue')
    },
    {
      path: '/create',
      name: 'create',
      component: CreateView
    },
    {
      path: '/submitted',
      name: 'submitted',
      component: SubmittedView
    },
    {
      path: '/question/:id',
      name: 'question',
      component: QuestionView
    },
  ]
})

export default router
