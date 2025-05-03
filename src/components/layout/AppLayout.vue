<script setup>
import { isAuthenticated } from '@/utils/supabase'
import ProfileHeader from './ProfileHeader.vue'

import { onMounted } from 'vue'
import { useDisplay } from 'vuetify'
import { ref } from 'vue'

const props = defineProps(['isWithAppBarNavIcon'])

const emit = defineEmits(['isDrawerVisible'])

//Utilize predefined functions
const { mobile } = useDisplay()
const theme = ref(localStorage.getItem('theme') ?? 'light')

//Load Variables
const isloggedIn = ref(false)

// toggle theme
function onToggleThene() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  localStorage.setItem('theme', theme.value)
}

//Get Authentication status form supabase
const getLoggedStatus = async () => {
  isloggedIn.value = await isAuthenticated()
}

//Load functions durinfg component rendering
onMounted(() => {
  getLoggedStatus()
})
</script>
<template>
  <v-responsive>
    <v-app :theme="theme">
      <v-app-bar
        class="px-3"
        :color="theme === 'light' ? 'grey-lighten-2' : 'grey-darken-1'"
        border
      >
        <v-app-bar-nav-icon
          v-if="props.isWithAppBarNavIcon"
          icon="mdi-menu"
          :theme="theme"
          @click="emit('isDwawerVisible')"
        ></v-app-bar-nav-icon>

        <v-spacer></v-spacer>

        <v-btn
          :icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          class="bg-success"
          variant="elavated"
          text="Toggle Theme"
          slim
          @click="onToggleThene"
        ></v-btn>

        <ProfileHeader v-if="isloggedIn"></ProfileHeader>
      </v-app-bar>

      <slot name="navigation "></slot>

      <v-main>
        <slot name="content"></slot>
      </v-main>

      <v-footer
        class="font-weight-bold"
        :class="mobile ? 'text-caption' : ''"
        :color="theme === 'light' ? 'grey-lighten-2' : 'grey-darken-1'"
        border
        app
      >
        <div :class="mobile ? 'w-100 text-center' : ''">
          Copyright 2024 - Vendor Management System | All Rights Reserved
        </div>
      </v-footer>
    </v-app>
  </v-responsive>
</template>
