<script setup>
import { isAuthenticated } from '@/utils/supabase'
import { onMounted, ref } from 'vue'
import AdminSideNavbar from './AdminSideNavbar.vue'

const itemsVendor = ref([
  { title: 'Dashboard', icon: 'mdi-view-dashboard', tab: 'overview', path: '/dashboard' },
  { title: 'My Bookings', icon: 'mdi-calendar-check', tab: 'bookings', path: '/bookings' },
  { title: 'Events', icon: 'mdi-calendar-multiselect', tab: 'events', path: '/events' },
  { title: 'Profile', icon: 'mdi-account', tab: 'payments', path: '/profile' },
])

const isLoggedIn = ref(false)

onMounted(async () => {
  isLoggedIn.value = await isAuthenticated()
})
</script>

<template>
  <v-app>
    <v-layout>
      

      <AdminSideNavbar :nav-items="itemsVendor" />

      <v-main>
        <slot name="content"></slot>
      </v-main>
    </v-layout>
  </v-app>
</template>
