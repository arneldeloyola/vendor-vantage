<script setup>
import { isAuthenticated } from '@/utils/supabase'
import { onMounted, ref, inject } from 'vue'
import { useDisplay } from 'vuetify'
import { useRouter } from 'vue-router'

// Try to inject activeTab if it exists (will be null if not provided)
const activeTab = inject('activeTab', null)

// Navigation drawer state
const drawer = ref(false)
const router = useRouter()

// Navigation items for drawer
const items = ref([
  { title: 'Overview', icon: 'mdi-view-dashboard', tab: 'overview', path: '/dashboard' },
  { title: 'My Bookings', icon: 'mdi-calendar-check', tab: 'bookings', path: '/bookings' },
  { title: 'Events', icon: 'mdi-calendar-multiselect', tab: 'events', path: '/events' },
  { title: 'Payments', icon: 'mdi-credit-card-outline', tab: 'payments', path: '/payments' },
  { title: 'Profile', icon: 'mdi-account-circle', tab: 'profile', path: '/profile' },
  { title: 'Settings', icon: 'mdi-cog', tab: 'settings', path: '/settings' },
])

// Utilize predefined functions
const { mobile } = useDisplay()

// Load Variables
const isLoggedIn = ref(false)

// Handle navigation - either update tab or navigate to path
const handleNavigation = (item) => {
  if (activeTab && window.location.pathname === '/dashboard') {
    // If we're on the dashboard and activeTab is provided, just update the tab
    activeTab.value = item.tab
    drawer.value = false // Close drawer after selection on mobile
  } else {
    // Otherwise navigate to the path
    router.push(item.path)
  }
}

// Get Authentication status from supabase
const getLoggedStatus = async () => {
  isLoggedIn.value = await isAuthenticated()
}

// Load functions during component rendering
onMounted(() => {
  getLoggedStatus()
})
</script>

<template>
  <v-responsive>
    <v-app>
      <v-layout>
        <v-app-bar color="grey-lighten-3">
          <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" />
          <img src="/public/images/VendorVantage.png" alt="" height="40px" width="100px" />
          <v-spacer />
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" :location="mobile ? 'bottom' : undefined" temporary>
          <v-list>
            <v-list-item
              v-for="item in items"
              :key="item.title"
              @click="handleNavigation(item)"
              :active="activeTab === item.tab && window.location.pathname === '/dashboard'"
              link
            >
              <template v-slot:prepend>
                <v-icon>{{ item.icon }}</v-icon>
              </template>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>

        <v-main>
          <slot name="content"></slot>
        </v-main>
      </v-layout>
    </v-app>
  </v-responsive>
</template>
