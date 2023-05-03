import HomeView from '@/views/HomeView/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/post/:id',
      name: 'Post Details',
      component: () => import('@/views/PostDetailsView/PostDetailsView.vue')
    }
  ]
})

export default router
