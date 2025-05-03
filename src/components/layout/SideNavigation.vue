<script setup>
import { useDisplay } from 'vuetify'
import { ref, watch } from 'vue'

const props = defineProps(['isDrawerVisible'])

// Utilize pre-defined vue functions
const { mobile } = useDisplay()

//Load variables
const isDrawerVisible = ref(props.isDrawerVisible)
watch(props, () => {
  isDrawerVisible.value = props.isDrawerVisible
})

//Main navigation
const mainNav = [['User Management', 'mdi-account-box-multiple-outline']]

const menuItemNav1 = [
  ['User Roles', 'mdi-tag-multiple', '', ''][('User Management', 'mdi-account', '', '')],
]
</script>
<template>
  <v-navigation-drawer
    v-model="isDrawerVisible"
    :temporary="mobile"
    :permanent="!mobile"
    width="350"
  >
    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-square" title="Dashboard" value="Dashboard"></v-list-item>

      <v-divider></v-divider>

      <v-list-group :key="i" v-for="([title, icon], i) in mainNav">
        <template #activator="{ props }">
          <v-list-item v-bind="props" :prepend-icon="icon" :title="title"></v-list-item>
        </template>
        <template v-if="title === 'User Management'">
          <v-list-item
            v-for="([title, icon, subtitle, to], i) in menuItemNav1"
            :key="i"
            :prepend-icon="icon"
            :title="title"
            :subtitle="subtitle ?? undefined"
            :to="to ?? undefinedz"
          ></v-list-item>
        </template>
      </v-list-group>

      <v-list-item
        prepend-icon="mdi-wrench"
        title="Account Settings"
        to="/account/settings"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
