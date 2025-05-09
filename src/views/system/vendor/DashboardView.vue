<script setup>
import { ref, provide } from 'vue'
import AppLayout from '@/components/layout/AppLayout.vue'
import DashboardOverview from '@/views/system/vendor/DashboardOverview.vue'
import BookingSection from '@/views/system/BookingSection.vue'
import EventSection from '@/views/system/EventSection.vue'
import ProfileSection from '@/views/system/ProfileSection.vue'
import BoothSelection from '@/views/system/BoothSelection.vue'
import ApplicationForm from '@/views/system/ApplicationForm.vue'
// Using tab names that match the side navigation
const activeTab = ref('overview') // default to overview tab
provide('activeTab', activeTab) // Provide this to the layout for active highlighting

// Map of tab names to components
const tabComponents = {
  overview: DashboardOverview,
  bookings: BookingSection,
  events: EventSection,
  profile: ProfileSection,
  BoothSelection: BoothSelection,
  ApplicationForm: ApplicationForm,
}
</script>

<template>
  <AppLayout>
    <template #content>
      <v-row>
        <v-col cols="12" md="3" class="mt-8 ml-5">
          <v-card class="rounded-lg" flat>
            <!-- Optional card content -->
          </v-card>
        </v-col>
        <v-col cols="12" md="9">
          <!-- Optional content for right column -->
        </v-col>
        <v-col cols="12" md="12" class="mt-n4">
          <!-- Dynamic component rendering based on active tab -->
          <component :is="tabComponents[activeTab]" />
        </v-col>
      </v-row>
    </template>
  </AppLayout>
</template>

<style scoped>
.tight-heading {
  margin-bottom: -6px;
}
</style>
