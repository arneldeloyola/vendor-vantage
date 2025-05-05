<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import { ref } from 'vue'

const tab = ref('one')
</script>

<template>
  <AppLayout>
    <template #content>
      <v-row>
        <v-col cols="12" md="3" class="mt-4 mx-2">
          <v-card class="rounded-lg" flat>
            <div class="d-flex justify-space-evenly bg-grey-lighten-3 rounded-lg pa-1">
              <v-btn
                :color="tab === 'one' ? 'white' : 'grey-lighten-3'"
                :variant="tab === 'one' ? 'elevated' : 'text'"
                :class="[' rounded-lg', tab === 'one' ? 'text-black' : 'text-grey-darken-3']"
                @click="tab = 'one'"
              >
                <span class="text-subtitle-2">Overview</span>
              </v-btn>
              <v-btn
                :color="tab === 'two' ? 'white' : 'grey-lighten-3'"
                :variant="tab === 'two' ? 'elevated' : 'text'"
                :class="[' rounded-lg', tab === 'two' ? 'text-black' : 'text-grey-darken-3']"
                @click="tab = 'two'"
              >
                <span class="text-subtitle-2">Bookings</span>
              </v-btn>
              <v-btn
                :color="tab === 'three' ? 'white' : 'grey-lighten-3'"
                :variant="tab === 'three' ? 'elevated' : 'text'"
                :class="[' rounded-lg', tab === 'three' ? 'text-black' : 'text-grey-darken-3']"
                @click="tab = 'three'"
              >
                <span class="text-subtitle-2">Events</span>
              </v-btn>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" md="9"></v-col>
        <v-col cols="12" md="12" class="mt-n4">
          <div v-if="tab === 'one'" class="pa-4">
            <v-row>
              <v-col cols="12" md="3">
                <v-card class="pa-4" elevation="2" rounded>
                  <div class="d-flex align-center mb-2">
                    <div class="text-subtitle-2 font-weight-medium">Spring Festival</div>
                    <v-icon class="ms-auto" size="small">mdi-calendar-check</v-icon>
                  </div>
                  <div class="text-h5 font-weight-bold">2</div>
                  <div class="text-caption text-grey-darken-1">+1 from last month</div>
                </v-card>
              </v-col>

              <!-- Upcoming Events -->
              <v-col cols="12" md="3">
                <v-card class="pa-4" elevation="2" rounded>
                  <div class="d-flex align-center mb-2">
                    <div class="text-subtitle-2 font-weight-medium">Upcoming Events</div>
                    <v-icon class="ms-auto" size="small">mdi-calendar</v-icon>
                  </div>
                  <div class="text-h5 font-weight-bold">1</div>
                  <div class="text-caption text-grey-darken-1">Next event in 5 days</div>
                </v-card>
              </v-col>

              <!-- Pending Payments -->
              <v-col cols="12" md="3">
                <v-card class="pa-4" elevation="2" rounded>
                  <div class="d-flex align-center mb-2">
                    <div class="text-subtitle-2 font-weight-medium">Pending Payments</div>
                    <v-icon class="ms-auto" size="small">mdi-currency-usd</v-icon>
                  </div>
                  <div class="text-h5 font-weight-bold">$150</div>
                  <div class="text-caption text-grey-darken-1">For Spring Festival</div>
                </v-card>
              </v-col>

              <!-- Profile Status -->
              <v-col cols="12" md="3">
                <v-card class="pa-4" elevation="2" rounded>
                  <div class="d-flex align-center mb-2">
                    <div class="text-subtitle-2 font-weight-medium">Profile Status</div>
                    <v-icon class="ms-auto" size="small">mdi-account-check</v-icon>
                  </div>
                  <div class="text-h6 font-weight-bold text-success">Verified</div>
                  <div class="text-caption text-grey-darken-1">Last updated 2 days ago</div>
                </v-card>
              </v-col>
              <v-col cols="12" md="7"></v-col>
              <v-col cols="12" md="5"></v-col>
            </v-row>
          </div>
          <div v-else-if="tab === 'two'" class="pa-4">Tab Two Content</div>
          <div v-else-if="tab === 'three'" class="pa-4">Tab Three Content</div>
        </v-col>
      </v-row>

      <v-sheet class="mt-4" :height="200" :width="200" rounded />
    </template>
  </AppLayout>
</template>
