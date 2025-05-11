<script setup>
import { onMounted } from 'vue'
import { useAdminDashboard } from '@/composables/system/useAdminDashboard'
import AdminAppLayout from '@/components/layout/AdminAppLayout.vue'

const { recentBookings, upcomingEvents, stats, fetchDashboardData } = useAdminDashboard()
onMounted(fetchDashboardData)
</script>

<template>
  <AdminAppLayout style="background-color: #e0f2f1;">
    <template #content>
      <!-- Add flex classes to center the card -->
      <v-container class="d-flex justify-center">
     
          <v-container fluid class="pa-4">
            <!-- Header -->
            <v-card class="mb-4 pa-4 rounded-lg elevation-2" style="background-color: #ffffff;">
              <v-card-title class="text-h5 font-weight-bold text-teal darken-3">Admin Dashboard</v-card-title>
              <v-card-subtitle class="text-medium-emphasis text-teal darken-1">Manage events, vendors, and bookings</v-card-subtitle>
            </v-card>

            <!-- Stats -->
            <v-row dense>
              <v-col
                v-for="(stat, index) in stats"
                :key="index"
                cols="12"
                sm="6"
                md="4"
              >
                <v-card class="pa-4 elevation-2 rounded-lg" style="min-height: 180px; background-color: #ffffff;">
                  <div class="d-flex align-center mb-3">
                    <v-icon :icon="stat.icon" :color="stat.iconColor" size="40" class="me-3" />
                    <div>
                      <div class="text-subtitle-1 font-weight-medium text-teal darken-2">{{ stat.title }}</div>
                    </div>
                  </div>

                  <div class="d-flex flex-column justify-end">
                    <div class="text-h5 font-weight-bold text-teal darken-3">{{ stat.value }}</div>
                    <div class="text-medium-emphasis text-body-2 mb-2">{{ stat.subtitle }}</div>
                    <v-btn
                      :to="stat.linkTo"
                      variant="contained"
                     
                      class="text-white"
                      size="small"
                      style="background-color: #00796b; text-transform: none"
                      block
                    >
                      {{ stat.linkText }}
                    </v-btn>
                  </div>
                </v-card>
              </v-col>
            </v-row>

            <!-- Lists -->
            <v-row dense class="mt-5">
              <!-- Recent Bookings -->
              <v-col cols="12" md="6">
                <v-card class="rounded-lg elevation-2 pa-4" style="background-color: #ffffff;">
                  <div class="mb-2">
                    <div class="text-subtitle-1 font-weight-bold text-teal darken-2">Recent Bookings</div>
                    <div class="text-medium-emphasis text-caption text-teal darken-1">Latest booth bookings</div>
                  </div>
                  <v-divider />
                  <v-list lines="two" density="compact">
                    <v-list-item
                      v-for="(booking, index) in recentBookings"
                      :key="index"
                      :border="index !== recentBookings.length - 1"
                    >
                      <v-list-item-title class="text-body-2 font-weight-medium">
                        {{ booking.vendor }}
                      </v-list-item-title>
                      <v-list-item-subtitle class="text-caption text-medium-emphasis">
                        {{ booking.details }}
                      </v-list-item-subtitle>
                      <template #append>
                        <v-chip
                          :color="booking.status === 'Pending' ? 'orange' : 'green'"
                          variant="outlined"
                          size="small"
                        >
                          {{ booking.status }}
                        </v-chip>
                      </template>
                    </v-list-item>
                  </v-list>
                  <v-btn
                    to="/admin/booking"
                    variant="contained"
                    class="text-white mt-3"
                    size="small"
                    block
                    style="background-color: #00796b; text-transform: none"
                  >
                    View all bookings
                  </v-btn>
                </v-card>
              </v-col>

              <!-- Upcoming Events -->
              <v-col cols="12" md="6">
                <v-card class="rounded-lg elevation-2 pa-4" style="background-color: #ffffff;">
                  <div class="mb-2">
                    <div class="text-subtitle-1 font-weight-bold text-teal darken-2">Upcoming Events</div>
                    <div class="text-medium-emphasis text-caption text-teal darken-1">Next 30 days</div>
                  </div>
                  <v-divider />
                  <v-list lines="two" density="compact">
                    <v-list-item
                      v-for="(event, index) in upcomingEvents"
                      :key="index"
                      :border="index !== upcomingEvents.length - 1"
                    >
                      <v-list-item-title class="text-body-2 font-weight-medium text-teal darken-2">
                        {{ event.name }}
                      </v-list-item-title>
                      <v-list-item-subtitle class="text-caption text-medium-emphasis">
                        {{ event.date }} • {{ event.location }}
                      </v-list-item-subtitle>
                      <template #append>
                        <span class="text-caption text-medium-emphasis">
                          {{ event.boothsLeft }} booths left
                        </span>
                      </template>
                    </v-list-item>
                  </v-list>
                  <v-btn
                    to="/admin/event"
                    variant="contained"
                    class="text-white mt-3"
                    size="small"
                    block
                    style="background-color: #00796b; text-transform: none"
                  >
                    Manage events
                  </v-btn>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
      </v-container>
    </template>
  </AdminAppLayout>
</template>

