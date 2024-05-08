import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateView from '../views/CreateView.vue'
import SubmittedView from '../views/SubmittedView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
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
  ]
})

export default router
