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
      <v-container>
        <div class="mb-6">
          <h1 class="text-h4 font-weight-bold">Admin Dashboard</h1>
          <p class="text-subtitle-1 text-medium-emphasis">Manage events, vendors, and bookings</p>
        </div>
        <v-row>
          <v-col v-for="(stat, index) in stats" :key="index" cols="12" md="6" lg="3">
            <v-card>
              <v-card-item class="pb-0">
                <template v-slot:prepend>
                  <v-icon :color="stat.iconColor" :icon="stat.icon"></v-icon>
                </template>
                <v-card-title class="text-subtitle-1 font-weight-medium">{{
                  stat.title
                }}</v-card-title>
              </v-card-item>
              <v-card-text>
                <div class="text-h5 font-weight-bold">{{ stat.value }}</div>
                <p class="text-caption text-medium-emphasis">{{ stat.subtitle }}</p>
                <v-btn
                  :to="stat.linkTo"
                  variant="text"
                  density="comfortable"
                  class="mt-2 pl-0"
                  :color="stat.iconColor"
                >
                  {{ stat.linkText }}
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row class="mt-4">
          <v-col cols="12" md="6">
            <v-card>
              <v-card-item>
                <v-card-title>Recent Bookings</v-card-title>
                <v-card-subtitle>Latest booth bookings from vendors</v-card-subtitle>
              </v-card-item>
              <v-card-text>
                <v-list lines="two">
                  <v-list-item
                    v-for="(booking, index) in recentBookings"
                    :key="index"
                    :border="index !== recentBookings.length - 1"
                  >
                    <v-list-item-title class="font-weight-medium">{{
                      booking.vendor
                    }}</v-list-item-title>
                    <v-list-item-subtitle class="text-medium-emphasis">{{
                      booking.details
                    }}</v-list-item-subtitle>
                    <template v-slot:append>
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
                <v-btn to="/admin/bookings" variant="outlined" class="mt-4" block>
                  View all bookings
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card>
              <v-card-item>
                <v-card-title>Upcoming Events</v-card-title>
                <v-card-subtitle>Events scheduled in the next 30 days</v-card-subtitle>
              </v-card-item>
              <v-card-text>
                <v-list lines="two">
                  <v-list-item
                    v-for="(event, index) in upcomingEvents"
                    :key="index"
                    :border="index !== upcomingEvents.length - 1"
                  >
                    <v-list-item-title class="font-weight-medium">{{
                      event.name
                    }}</v-list-item-title>
                    <v-list-item-subtitle class="text-medium-emphasis"
                      >{{ event.date }} • {{ event.location }}</v-list-item-subtitle
                    >
                    <template v-slot:append>
                      <span class="text-caption text-medium-emphasis"
                        >{{ event.boothsLeft }} booths left</span
                      >
                    </template>
                  </v-list-item>
                </v-list>
                <v-btn to="/admin/events" variant="outlined" class="mt-4" block>
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
