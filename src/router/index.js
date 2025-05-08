import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/system/HomePage.vue'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import DashboardView from '@/views/system/DashboardView.vue'
import ContactView from '@/views/system/ContactView.vue'
import AboutView from '@/views/system/AboutView.vue'
import EventView from '@/views/system/EventView.vue'
import ProfileView from '@/views/system/ProfileView.vue'
import AdminDashboard from '@/views/system/Admin/AdminDashboard.vue'
import AdminEventSection from '@/views/system/Admin/AdminEventSection.vue'
import AdminBookingSection from '@/views/system/Admin/AdminBookingSection.vue'
import AdminVendorSection from '@/views/system/Admin/AdminVendorSection.vue'

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
      path: '/profile',
      name: 'profile',
      component: ProfileView,
    },
    {
      path: '/admin/dashboard',
      name: 'AdminDashboard',
      component: AdminDashboard,
    },
    {
      path: '/admin/event',
      name: 'AdminEvents',
      component: AdminEventSection,
    },
    {
      path: '/admin/booking',
      name: 'AdminBookings',
      component: AdminBookingSection,
    },
    {
      path: '/admin/vendor',
      name: 'AdminVendor',
      component: AdminVendorSection,
    },
  ],
})

export default router
