<script setup>
import { useDisplay } from 'vuetify'

const navItems = [
  { title: 'Dashboard', icon: 'mdi-view-dashboard', path: '/admin/dashboard' },
  { title: 'Events', icon: 'mdi-calendar-multiselect', path: '/admin/event' },
  { title: 'Vendors', icon: 'mdi-store-outline', path: '/admin/vendor' },
  { title: 'Bookings', icon: 'mdi-calendar-check', path: '/admin/booking' },
]

const { mobile } = useDisplay()
</script>

<template>
  <v-app-bar color="grey-lighten-3">
        <img
          src="/images/VendorVantage.png"
          alt="VendorVantage Logo"
          height="40"
          width="100"
          class="ml-5"
        />
        <v-spacer />
      </v-app-bar>
  <v-navigation-drawer expand-on-hover rail>
    <v-list nav density="comfortable">
      <v-list-item class="mb-4 mt-2">
        <template #prepend>
          <v-avatar color="green-darken-2" size="32">
            <v-icon icon="mdi-shield-account" color="white" />
          </v-avatar>
        </template>
        <v-list-item-title v-if="!mobile" class="font-weight-bold">
          <h2>Admin Panel</h2>
        </v-list-item-title>
      </v-list-item>

      <v-divider class="mb-2" />

      <v-list-item v-for="item in navItems" :key="item.title" :to="item.path" link exact>
        <template #prepend>
          <v-icon>{{ item.icon }}</v-icon>
        </template>
        <v-list-item-title v-if="!mobile">{{ item.title }}</v-list-item-title>
      </v-list-item>

      <v-divider class="my-2" />

      <v-list-item to="/" link exact>
        <template #prepend>
          <v-icon>mdi-logout</v-icon>
        </template>
        <v-list-item-title v-if="!mobile">Logout</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
