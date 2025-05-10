<script setup>
import { isAuthenticated } from '@/utils/supabase'
import { onMounted, ref } from 'vue'
import SideNavbar from './SideNavbar.vue'
import ProfileHeader from './ProfileHeader.vue'

const itemsVendor = ref([
  { title: 'Dashboard', icon: 'mdi-view-dashboard', tab: 'overview', path: '/dashboard' },
  { title: 'My Bookings', icon: 'mdi-calendar-check', tab: 'bookings', path: '/bookings' },
  { title: 'Events', icon: 'mdi-calendar-multiselect', tab: 'events', path: '/events' },
  { title: 'Profile', icon: 'mdi-account', tab: 'profile', path: '/profileSection' },
  {
    title: 'ApplicationForm',
    icon: 'mdi-application',
    tab: 'ApplicationForm',
    path: '/ApplicationForm',
  },
])

const isLoggedIn = ref(false)

const getLoggedStatus = async () => {
  isLoggedIn.value = await isAuthenticated()
}

onMounted(() => {
  getLoggedStatus()
})
</script>

<template>
  <v-app>
    <v-layout>
      <v-app-bar color="grey-lighten-3">
        <img
          src="/images/VendorVantage.png"
          alt="VendorVantage Logo"
          height="40"
          width="100"
          class="ml-5"
        />
        <v-spacer />
        <ProfileHeader v-if="isLoggedIn"></ProfileHeader>
      </v-app-bar>

      <SideNavbar :nav-items="itemsVendor" />

      <v-main>
        <slot name="content"></slot>
      </v-main>
    </v-layout>
  </v-app>
</template>
