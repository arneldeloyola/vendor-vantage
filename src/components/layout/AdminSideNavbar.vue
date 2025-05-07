<script setup>
import { inject } from 'vue'
import { useDisplay } from 'vuetify'
import { useRouter } from 'vue-router'

// Admin navigation items
const navItems = [
  { title: 'Dashboard', icon: 'mdi-view-dashboard', tab: 'overview', path: '/admin/dashboard' },
  { title: 'Events', icon: 'mdi-calendar-multiselect', tab: 'events', path: '/admin/events' },
  { title: 'Vendors', icon: 'mdi-store-outline', tab: 'vendors', path: '/admin/vendors' },
  { title: 'Bookings', icon: 'mdi-calendar-check', tab: 'bookings', path: '/admin/bookings' },
]

// Try to inject activeTab if provided
const activeTab = inject('activeTab', null)
const router = useRouter()
const { mobile } = useDisplay()

const handleNavigation = (item) => {
  if (activeTab?.value && window.location.pathname === '/admin/dashboard') {
    activeTab.value = item.tab
  } else {
    router.push(item.path)
  }
}
</script>

<template>
  <v-navigation-drawer expand-on-hover rail>
    <v-list>
      <v-list-item class="mb-4 mt-2">
        <template #prepend>
          <v-avatar color="green-darken-2" size="32">
            <v-icon icon="mdi-shield-account" color="white"></v-icon>
          </v-avatar>
        </template>
        <v-list-item-title v-if="!mobile" class="text-subtitle-1 font-weight-bold">
          Admin Panel
        </v-list-item-title>
      </v-list-item>

      <v-divider class="mb-2"></v-divider>

      <v-list-item
        v-for="item in navItems"
        :key="item.title"
        @click="handleNavigation(item)"
        :active="activeTab?.value === item.tab && window.location.pathname === '/admin/dashboard'"
        link
      >
        <template #prepend>
          <v-icon>{{ item.icon }}</v-icon>
        </template>
        <v-list-item-title v-if="!mobile">{{ item.title }}</v-list-item-title>
      </v-list-item>

      <v-divider class="my-2"></v-divider>

      <v-list-item to="/admin/profile" link>
        <template #prepend>
          <v-icon>mdi-account-cog</v-icon>
        </template>
        <v-list-item-title v-if="!mobile">Profile</v-list-item-title>
      </v-list-item>

      <v-list-item @click="router.push('/')" link>
        <template #prepend>
          <v-icon>mdi-logout</v-icon>
        </template>
        <v-list-item-title v-if="!mobile">Logout</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
