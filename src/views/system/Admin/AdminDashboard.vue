<script setup>
import { onMounted } from 'vue'
import { useAdminDashboard } from '@/composables/system/useAdminDashboard'
import AdminAppLayout from '@/components/layout/AdminAppLayout.vue'

// Use the composable
const { recentBookings, upcomingEvents, stats, fetchDashboardData } = useAdminDashboard()

// Fetch data on component mount
onMounted(fetchDashboardData)
</script>

<template>
  <AdminAppLayout>
    <template #content>
      <v-container fluid>
        <!-- Header -->
        <v-card class="mb-6 pa-6 rounded-lg elevation-1">
          <v-card-item class="pa-0">
            <v-card-title class="text-h3 font-weight-bold"> Admin Dashboard </v-card-title>
            <v-card-subtitle class="text-h6 text-high-emphasis mt-1">
              Manage events, vendors, and bookings
            </v-card-subtitle>
          </v-card-item>
        </v-card>

        <!-- Stats Section -->
        <v-row dense>
          <v-col v-for="(stat, index) in stats" :key="index" cols="12" sm="6" md="4">
            <v-card
              class="pa-5 d-flex flex-column justify-space-between elevation-1 rounded-lg"
              style="min-height: 240px"
            >
              <!-- Header -->
              <div class="d-flex align-center mb-4">
                <v-icon :icon="stat.icon" :color="stat.iconColor" size="65" class="me-3" />
                <div class="text-h5 font-weight-bold">
                  {{ stat.title }}
                </div>
              </div>

              <!-- Content -->
              <div class="flex-grow-1 d-flex flex-column justify-end">
                <div class="text-h4 font-weight-bold mb-1">
                  {{ stat.value }}
                </div>
                <div class="text-body-1 text-medium-emphasis mb-4">
                  {{ stat.subtitle }}
                </div>
                <v-btn
                  :to="stat.linkTo"
                  variant="elevated"
                  class="pl-0 text-none text-subtitle font-weight-medium align-self-start"
                  :color="stat.iconColor"
                  style="
                    text-transform: none;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                  "
                >
                  {{ stat.linkText }}
                </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <!-- List Sections -->
        <v-row dense class="mt-6">
          <!-- Recent Bookings -->
          <v-col cols="12" md="6">
            <v-card class="rounded-lg elevation-1">
              <v-card-item>
                <v-card-title class="text-subtitle-1 font-weight-bold">
                  Recent Bookings
                </v-card-title>
                <v-card-subtitle class="text-body-1 text-high-emphasis">
                  Latest booth bookings from vendors
                </v-card-subtitle>
              </v-card-item>
              <v-divider />
              <v-card-text>
                <v-list lines="two">
                  <v-list-item
                    v-for="(booking, index) in recentBookings"
                    :key="index"
                    :border="index !== recentBookings.length - 1"
                  >
                    <v-list-item-title class="font-weight-medium">
                      {{ booking.vendor }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="text-medium-emphasis">
                      {{ booking.details }}
                    </v-list-item-subtitle>
                    <template #append>
                      <v-chip
                        :color="booking.status === 'Pending' ? 'warning' : 'success'"
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
                  variant="elevated"
                  class="text-white pl-0 text-none text-subtitle font-weight-medium align-self-start"
                  block
                  style="
                    text-transform: none;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    background-color: #009688;
                  "
                >
                  View all bookings
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Upcoming Events -->
          <v-col cols="12" md="6">
            <v-card class="rounded-lg elevation-1">
              <v-card-item>
                <v-card-title class="text-subtitle-1 font-weight-bold">
                  Upcoming Events
                </v-card-title>
                <v-card-subtitle class="text-body-1 text-high-emphasis">
                  Events scheduled in the next 30 days
                </v-card-subtitle>
              </v-card-item>
              <v-divider />
              <v-card-text>
                <v-list lines="two">
                  <v-list-item
                    v-for="(event, index) in upcomingEvents"
                    :key="index"
                    :border="index !== upcomingEvents.length - 1"
                  >
                    <v-list-item-title class="font-weight-medium">
                      {{ event.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="text-medium-emphasis">
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
                  variant="elevated"
                  class="text-white pl-0 text-none text-subtitle font-weight-medium align-self-start"
                  block
                  style="
                    text-transform: none;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    background-color: #009688;
                  "
                >
                  Manage events
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </AdminAppLayout>
</template>
