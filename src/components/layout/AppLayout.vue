<script setup>
import { isAuthenticated } from '@/utils/supabase'
import ProfileHeader from './ProfileHeader.vue'
import { onMounted, ref } from 'vue'
import { useDisplay } from 'vuetify'

// Navigation drawer state
const drawer = ref(false)

// Navigation items for drawer
const items = ref([
  { title: 'Home', icon: 'mdi-home', to: '/' },
  { title: 'Files', icon: 'mdi-folder', to: '/files' },
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
          <v-toolbar-title>My Vendor</v-toolbar-title>
          <v-spacer />
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" :location="mobile ? 'bottom' : undefined" temporary>
          <v-list :items="items" />
        </v-navigation-drawer>

        <v-main>
          <ProfileHeader v-if="isLoggedIn" />
          <slot name="content"></slot>
          <!-- This is the named slot -->
        </v-main>
      </v-layout>
    </v-app>
  </v-responsive>
</template>
