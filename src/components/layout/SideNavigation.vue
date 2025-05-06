<script setup>
import { useDisplay } from 'vuetify'
import { ref, watch } from 'vue'

const props = defineProps(['isDrawerVisible'])
const { mobile } = useDisplay()

const isDrawerVisible = ref(props.isDrawerVisible)
watch(props, () => {
  isDrawerVisible.value = props.isDrawerVisible
})

const mainNav = [
  ['User Management', 'mdi-account-box-multiple'],
  ['Product Management', 'mdi-clipboard-list'],
  ['Inventory Management', 'mdi-invoice-list'],
  ['Expenses Management', 'mdi-cash-register'],
  ['Reporting', 'mdi-file-chart'],
]

const menuItemNav1 = [
  ['User Roles', 'mdi-tag-multiple', '', '/user-roles'],
  ['User Management', 'mdi-account-multiple', '', '/user-management'],
]

const menuItemsNav2 = [
  ['Product Information', 'mdi-information-box', 'Add and Manage Products', '/product-information'],
]

const menuItemsNav3 = [
  ['Stock In', 'mdi-tray-arrow-down', '', '/stock-in'],
  ['Stock Out', 'mdi-tray-arrow-up', '', '/stock-out'],
]

const menuItemsNav4 = [['Expense', 'mdi-cash-remove', 'Tally and Manage Expenses', '/expenses']]

const menuItemsNav5 = [
  ['Balance Sheet', 'mdi-scale-balance', '', '/balance-sheet'],
  ['Gross Revenue & Net Profit', 'mdi-cash-100', '', '/gross-revenue'],
  ['Sales', 'mdi-sale', '', '/sales'],
  ['Expenses', 'mdi-cash-multiple', '', '/expenses-report'],
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
      <v-list-item
        prepend-icon="mdi-view-dashboard"
        title="Dashboard"
        value="Dashboard"
        to="/dashboard"
      ></v-list-item>

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
            :to="to ?? undefined"
          ></v-list-item>
        </template>

        <template v-else-if="title === 'Product Management'">
          <v-list-item
            v-for="([title, icon, subtitle, to], i) in menuItemsNav2"
            :key="i"
            :prepend-icon="icon"
            :title="title"
            :subtitle="subtitle ?? undefined"
            :to="to ?? undefined"
          ></v-list-item>
        </template>

        <template v-else-if="title === 'Inventory Management'">
          <v-list-item
            v-for="([title, icon, subtitle, to], i) in menuItemsNav3"
            :key="i"
            :prepend-icon="icon"
            :title="title"
            :subtitle="subtitle ?? undefined"
            :to="to ?? undefined"
          ></v-list-item>
        </template>

        <template v-else-if="title === 'Expenses Management'">
          <v-list-item
            v-for="([title, icon, subtitle, to], i) in menuItemsNav4"
            :key="i"
            :prepend-icon="icon"
            :title="title"
            :subtitle="subtitle ?? undefined"
            :to="to ?? undefined"
          ></v-list-item>
        </template>

        <template v-else-if="title === 'Reporting'">
          <v-list-item
            v-for="([title, icon, subtitle, to], i) in menuItemsNav5"
            :key="i"
            :prepend-icon="icon"
            :title="title"
            :subtitle="subtitle ?? undefined"
            :to="to ?? undefined"
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
