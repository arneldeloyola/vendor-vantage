<script setup>
import { isAuthenticated } from '@/utils/supabase'
import { onMounted, ref, inject } from 'vue'
import { useDisplay } from 'vuetify'
import { useRouter } from 'vue-router'

// Try to inject activeTab if provided
const activeTab = inject('activeTab', null)
const router = useRouter()

const items = ref([
  { title: 'Dashboard', icon: 'mdi-view-dashboard', tab: 'overview', path: '/dashboard' },
  { title: 'My Bookings', icon: 'mdi-calendar-check', tab: 'bookings', path: '/bookings' },
  { title: 'Events', icon: 'mdi-calendar-multiselect', tab: 'events', path: '/events' },
  { title: 'Profile', icon: 'mdi-account', tab: 'payments', path: '/profile' },
])

const { mobile } = useDisplay()
const isLoggedIn = ref(false)

const handleNavigation = (item) => {
  if (activeTab?.value && window.location.pathname === '/dashboard') {
    activeTab.value = item.tab
  } else {
    router.push(item.path)
  }
}

onMounted(async () => {
  isLoggedIn.value = await isAuthenticated()
})
</script>

<template>
  <v-app>
    <v-layout>
      <v-app-bar color="grey-lighten-3">
        <v-app-bar-nav-icon variant="text" />
        <img src="/images/VendorVantage.png" alt="VendorVantage Logo" height="40" width="100" />
        <v-spacer />
      </v-app-bar>

      <v-navigation-drawer expand-on-hover rail>
        <v-list>
          <v-list-item
            v-for="item in items"
            :key="item.title"
            @click="handleNavigation(item)"
            :active="activeTab?.value === item.tab && window.location.pathname === '/dashboard'"
            link
          >
            <template #prepend>
              <v-icon>{{ item.icon }}</v-icon>
            </template>
            <v-list-item-title v-if="!mobile">{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <slot name="content"></slot>
      </v-main>
    </v-layout>
  </v-app>
</template>
