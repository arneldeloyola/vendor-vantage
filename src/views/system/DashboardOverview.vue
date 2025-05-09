<script setup>
import { ref } from 'vue'
import { inject } from 'vue'

const activeTab = inject('activeTab')

const viewAllEvents = () => {
  activeTab.value = 'events'
}

const goToBookings = () => {
  activeTab.value = 'bookings'
}

const goToProfile = () => {
  activeTab.value = 'profile'
}
// Dashboard data
const upcomingEvents = ref({
  count: 3,
  description: 'Events in the next 30 days',
})

const activeBookings = ref({
  count: 2,
  description: 'Confirmed booth bookings',
})

const profileCompletion = ref({
  percentage: 80,
  description: 'Complete your profile for better visibility',
})

// Recent activity data
const recentActivities = ref([
  {
    type: 'event',
    title: 'New Event Added',
    message: 'Summer Craft Fair has been added to available events.',
    timeAgo: '2 days ago',
    icon: 'mdi-calendar-plus',
  },
  {
    type: 'booking',
    title: 'Booking Confirmed',
    message: 'Your booth for Spring Market has been confirmed.',
    timeAgo: '1 week ago',
    icon: 'mdi-check-circle',
  },
])
</script>

<template>
  <div-container>
    <div class="mx-4 mt-n11">
      <v-sheet :elevation="6" height="auto" width="auto" class="pb-10 px-2 pt-3" rounded>
        <div class="px-5 mb-6">
          <h1 class="text-h3 font-weight-bold">Dashboard</h1>
          <span class="text-caption text-grey-darken-1">Welcome to your vendor dashboard</span>
        </div>

        <v-row>
          <!-- Upcoming Events Card -->
          <v-col cols="12" md="4 ">
            <v-card height="100%" class="pa-4" elevation="5">
              <div class="d-flex justify-space-between align-center">
                <h2 class="text-h6">Upcoming Events</h2>
                <v-icon color="teal" size="small">mdi-calendar</v-icon>
              </div>

              <div class="my-4">
                <div class="text-h3 font-weight-bold">{{ upcomingEvents.count }}</div>
                <div class="text-body-2 text-medium-emphasis">{{ upcomingEvents.description }}</div>
              </div>

              <v-btn variant="outlined" color="teal" class="px-2" @click="viewAllEvents">
                View all events
              </v-btn>
            </v-card>
          </v-col>

          <!-- Active Bookings Card -->
          <v-col cols="12" md="4">
            <v-card height="100%" class="pa-4" elevation="5">
              <div class="d-flex justify-space-between align-center">
                <h2 class="text-h6">Active Bookings</h2>
                <v-icon color="teal" size="small">mdi-bookmark-check</v-icon>
              </div>

              <div class="my-4">
                <div class="text-h3 font-weight-bold">{{ activeBookings.count }}</div>
                <div class="text-body-2 text-medium-emphasis">{{ activeBookings.description }}</div>
              </div>

              <v-btn color="teal" variant="outlined" @click="goToBookings"> Manage Bookings </v-btn>
            </v-card>
          </v-col>

          <!-- Profile Completion Card -->
          <v-col cols="12" md="4">
            <v-card height="100%" class="pa-4" elevation="5">
              <div class="d-flex justify-space-between align-center">
                <h2 class="text-h6">Profile Completion</h2>
                <v-icon color="teal" size="small">mdi-account-check</v-icon>
              </div>

              <div class="my-4">
                <div class="d-flex align-center mb-1">
                  <div class="text-h3 font-weight-bold">{{ profileCompletion.percentage }}%</div>
                </div>
                <div class="text-body-2 text-medium-emphasis">
                  {{ profileCompletion.description }}
                </div>
              </div>

              <v-btn color="teal" variant="outlined" @click="goToProfile"> Update Profile </v-btn>
            </v-card>
          </v-col>
        </v-row>

        <v-card class="mt-6" elevation="5">
          <v-card-title class="d-flex align-center py-4 px-4">
            <h2 class="text-h5 font-weight-bold">Recent Activity</h2>
          </v-card-title>
          <v-card-subtitle class="px-4 pb-0">
            Your recent actions and notifications
          </v-card-subtitle>

          <v-card-text class="pb-0">
            <v-list>
              <v-list-item v-for="(activity, index) in recentActivities" :key="index" class="px-0">
                <template v-slot:prepend>
                  <v-avatar color="teal" class="mr-4" size="48">
                    <v-icon color="white" size="24">
                      {{ activity.type === 'event' ? 'mdi-calendar-plus' : 'mdi-check-circle' }}
                    </v-icon>
                  </v-avatar>
                </template>

                <v-list-item-title class="font-weight-bold">
                  {{ activity.title }}
                </v-list-item-title>

                <v-list-item-subtitle>
                  {{ activity.message }}
                </v-list-item-subtitle>

                <v-list-item-subtitle class="text-caption text-grey-darken-1 mt-1">
                  {{ activity.timeAgo }}
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-sheet>
    </div>
    <div></div>
  </div-container>
</template>

<style scoped>
.v-card {
  border-radius: 8px;
  transition: box-shadow 0.3s ease;
}

.v-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.v-list-item {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  padding: 16px 16px;
}

.v-list-item:last-child {
  border-bottom: none;
}
</style>
