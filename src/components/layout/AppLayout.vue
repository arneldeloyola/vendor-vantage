<script setup>
import { isAuthenticated } from '@/utils/supabase'
// import ProfileHeader from './ProfileHeader.vue'
import { onMounted, ref } from 'vue'
import { useDisplay } from 'vuetify'

// Navigation drawer state
const drawer = ref(false)

// Navigation items for drawer
const items = ref([
  { title: 'Overview', icon: 'mdi-view-dashboard', to: '/dashboard' },
  { title: 'My Bookings', icon: 'mdi-calendar-check', to: '/bookings' },
  { title: 'Events', icon: 'mdi-calendar-multiselect', to: '/events' },
  { title: 'Payments', icon: 'mdi-credit-card-outline', to: '/payments' },
  { title: 'Profile', icon: 'mdi-account-circle', to: '/profile' },
  { title: 'Settings', icon: 'mdi-cog', to: '/settings' },
])

// Utilize predefined functions
const { mobile } = useDisplay()
// const theme = ref(localStorage.getItem('theme') ?? 'light')

// Load Variables
const isLoggedIn = ref(false)

// Toggle theme
// function onToggleTheme() {
//   theme.value = theme.value === 'light' ? 'dark' : 'light'
//   localStorage.setItem('theme', theme.value)
// }

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
            <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
              <v-list-item-content class="d-flex align-center gap-3">
                <v-icon>{{ item.icon }}</v-icon>
                <span>{{ item.title }}</span>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>

        <v-main>
          <!-- <ProfileHeader v-if="isLoggedIn" /> -->
          <slot name="content"></slot>
          <!-- This is the named slot -->
        </v-main>
      </v-layout>
    </v-app>
  </v-responsive>
</template>
