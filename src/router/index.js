import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/system/HomePage.vue'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import DashboardView from '@/views/system/DashboardView.vue'
import ContactView from '@/views/system/ContactView.vue'
import AboutView from '@/views/system/AboutView.vue'
import EventView from '@/views/system/EventView.vue'
import DashboardOverview from '@/views/system/DashboardOverview.vue'
import EventSection from '@/views/system/EventSection.vue'
import AdminDashboard from '@/views/system/AdminDashboard.vue'
import ProfileSection from '@/views/system/ProfileSection.vue'
import ApplicationForm from '@/views/system/ApplicationForm.vue'
import BoothSelection from '@/views/system/BoothSelection.vue'

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
      path: '/contact',
      name: 'contact',
      component: ContactView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/event',
      name: 'event',
      component: EventView,
    },

    {
      path: '/admin/dashboard',
      name: 'admin',
      component: AdminDashboard,
    },
    {
      path: '/',
      name: 'Dashboard',
      component: DashboardOverview,
    },
    {
      path: '/events',
      name: 'EventSection',
      component: EventSection,
    },
    {
      path: '/ProfileSection',
      name: 'ProfileSection',
      component: ProfileSection,
    },
    {
      path: '/BoothSelection',
      name: 'BoothSelection',
      component: BoothSelection,
    },
    {
      path: '/ApplicationForm',
      name: 'ApplicationForm',
      component: ApplicationForm,
    },
  ],
})

export default router
