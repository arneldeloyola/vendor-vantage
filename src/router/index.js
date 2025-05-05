import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/system/HomePage.vue'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import DashboardView from '@/views/system/DashboardView.vue'
import MyApplication from '@/views/system/MyApplication.vue'
import ApplicationForm from '@/views/system/ApplicationForm.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: HomePage,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/myapplication',
      name: 'myapplication',
      component: MyApplication,
    },
    {
      path: '/applicationform',
      name: 'applicationform',
      component: ApplicationForm,
    },
  ],
})

export default router
