<script setup>
import { inject } from 'vue'
import { useDisplay } from 'vuetify'
import { useRouter } from 'vue-router'

// Props
const props = defineProps({
  navItems: {
    type: Array,
    required: true,
  },
})

// Try to inject activeTab if provided
const activeTab = inject('activeTab', null)
const router = useRouter()
const { mobile } = useDisplay()

const handleNavigation = (item) => {
  if (activeTab?.value && window.location.pathname === '/dashboard') {
    activeTab.value = item.tab
  } else {
    router.push(item.path)
  }
}
</script>

<template>
  <v-navigation-drawer expand-on-hover rail>
    <v-list>
      <v-list-item
        v-for="item in props.navItems"
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
</template>
