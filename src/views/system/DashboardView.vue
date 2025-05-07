<script setup>
import { ref } from 'vue'
import AppLayout from '@/components/layout/AppLayout.vue'
import DashboardOverview from './DashboardOverview.vue'
import BookingSection from './BookingSection.vue'
import EventSection from './EventSection.vue'

const tab = ref('one')
</script>

<template>
  <AppLayout>
    <template #content>
      <v-row>
        <v-col cols="12" md="3" class="mt-8 ml-5">
          <v-card class="rounded-lg" flat>
            <div class="d-flex justify-space-evenly bg-grey-lighten-3 rounded-lg pa-1">
              <v-btn
                :color="tab === 'one' ? 'white' : 'grey-lighten-3'"
                :variant="tab === 'one' ? 'elevated' : 'text'"
                :class="['rounded-lg', tab === 'one' ? 'text-black' : 'text-grey-darken-3']"
                @click="tab = 'one'"
              >
                <span class="text-subtitle-2">Overview</span>
              </v-btn>
              <v-btn
                :color="tab === 'two' ? 'white' : 'grey-lighten-3'"
                :variant="tab === 'two' ? 'elevated' : 'text'"
                :class="['rounded-lg', tab === 'two' ? 'text-black' : 'text-grey-darken-3']"
                @click="tab = 'two'"
              >
                <span class="text-subtitle-2">Bookings</span>
              </v-btn>
              <v-btn
                :color="tab === 'three' ? 'white' : 'grey-lighten-3'"
                :variant="tab === 'three' ? 'elevated' : 'text'"
                :class="['rounded-lg', tab === 'three' ? 'text-black' : 'text-grey-darken-3']"
                @click="tab = 'three'"
              >
                <span class="text-subtitle-2">Events</span>
              </v-btn>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" md="9"></v-col>
        <v-col cols="12" md="12" class="mt-n4">
          <component
            :is="tab === 'one' ? DashboardOverview : tab === 'two' ? BookingSection : EventSection"
          />
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
