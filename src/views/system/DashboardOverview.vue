<!-- DashboardOverview.vue -->
<script setup>
import { ref, computed } from 'vue'

const eventHandler = ref([{ num_event: '5' }, { days: '30' }])

// Access values cleanly using computed
const numEvents = computed(() => eventHandler.value[0].num_event)
const numDays = computed(() => eventHandler.value[1].days)

const dashboardStats = ref({
  totalBookings: { count: 5, fromLastMonth: 30 },
  upcomingEvents: { count: 1, nextInDays: 5 },
  pendingPayments: { amount: 150, forEvent: 'Spring Festival' },
  profileStatus: { status: 'Verified', updatedAgo: '2 days ago' },
})

const upcomingBookings = ref([
  {
    title: 'Spring Festival',
    date: 'May 15, 2025',
    booth: 'Booth #12',
    status: 'Confirmed',
    color: 'success',
  },
  {
    title: 'Tech Expo',
    date: 'June 10, 2025',
    booth: 'Booth #5',
    status: 'Pending Payment',
    color: 'warning',
  },
])

const businessInfo = ref({
  shopName: 'Kwek Kwek papart',
  contact: '+63-917-1234-5678',
  type: 'food',
  memberSince: '1/15/2025',
})
</script>

<template>
  <h1 class="mt-n10 ml-5 mb-4">Overview</h1>
  <v-row class="mx-2">
    <v-col cols="12" md="3">
      <v-card class="pa-4" elevation="2" rounded>
        <div class="d-flex align-center mb-2">
          <div class="text-subtitle-2 font-weight-medium">Total Bookings</div>
          <v-icon class="ms-auto" size="small">mdi-calendar-check</v-icon>
        </div>
        <div class="text-h5 font-weight-bold">{{ numEvents }}</div>
        <div class="text-caption text-grey-darken-1">{{ numDays }} from last month</div>
      </v-card>
    </v-col>

    <!-- Upcoming Events -->
    <v-col cols="12" md="3">
      <v-card class="pa-4" elevation="2" rounded>
        <div class="d-flex align-center mb-2">
          <div class="text-subtitle-2 font-weight-medium">Upcoming Events</div>
          <v-icon class="ms-auto" size="small">mdi-calendar</v-icon>
        </div>
        <div class="text-h5 font-weight-bold">{{ dashboardStats.upcomingEvents.count }}</div>
        <div class="text-caption text-grey-darken-1">
          Next event in {{ dashboardStats.upcomingEvents.nextInDays }} days
        </div>
      </v-card>
    </v-col>

    <!-- Pending Payments -->
    <v-col cols="12" md="3">
      <v-card class="pa-4" elevation="2" rounded>
        <div class="d-flex align-center mb-2">
          <div class="text-subtitle-2 font-weight-medium">Pending Payments</div>
          <v-icon class="ms-auto" size="small">mdi-currency-usd</v-icon>
        </div>
        <div class="text-h5 font-weight-bold">P{{ dashboardStats.pendingPayments.amount }}</div>
        <div class="text-caption text-grey-darken-1">
          For {{ dashboardStats.pendingPayments.forEvent }}
        </div>
      </v-card>
    </v-col>

    <!-- Profile Status -->
    <v-col cols="12" md="3">
      <v-card class="pa-4" elevation="2" rounded>
        <div class="d-flex align-center mb-2">
          <div class="text-subtitle-2 font-weight-medium">Profile Status</div>
          <v-icon class="ms-auto" size="small">mdi-account-check</v-icon>
        </div>
        <div class="text-h6 font-weight-bold text-success">
          {{ dashboardStats.profileStatus.status }}
        </div>
        <div class="text-caption text-grey-darken-1">
          Last updated {{ dashboardStats.profileStatus.updatedAgo }}
        </div>
      </v-card>
    </v-col>
    <!-- Upcoming Bookings -->
    <v-col cols="12" md="7">
      <v-card class="elevation-2" rounded>
        <v-card-title class="text-h6 font-weight-bold py-3">
          <v-icon start class="me-2">mdi-calendar-clock</v-icon>
          Upcoming Bookings
        </v-card-title>

        <v-list>
          <template v-for="(booking, index) in upcomingBookings" :key="index">
            <v-list-item>
              <v-list-item-title class="font-weight-bold text-body-2">
                {{ booking.title }}
              </v-list-item-title>
              <v-list-item-subtitle>
                <div class="d-flex flex-column">
                  <span class="text-caption">{{ booking.date }}</span>
                </div>
                <v-chip size="x-small">{{ booking.booth }}</v-chip>
              </v-list-item-subtitle>
              <template v-slot:append>
                <v-chip :color="booking.color" size="small">{{ booking.status }}</v-chip>
              </template>
            </v-list-item>

            <v-divider v-if="index < upcomingBookings.length - 1" />
          </template>
        </v-list>
      </v-card>
    </v-col>

    <!-- Your Business -->
    <v-col cols="12" md="5">
      <v-card class="elevation-2" rounded>
        <v-card-title class="text-h6 font-weight-bold py-3">
          <v-icon start class="me-2">mdi-store</v-icon>
          Your Business
        </v-card-title>

        <v-list density="compact">
          <v-list-item>
            <v-list-item-title class="text-grey">Shop Name</v-list-item-title>
            <template v-slot:append>
              <span class="font-weight-medium">{{ businessInfo.shopName }}</span>
            </template>
          </v-list-item>

          <v-list-item>
            <v-list-item-title class="text-grey">Contact</v-list-item-title>
            <template v-slot:append>
              <span class="font-weight-medium">{{ businessInfo.contact }}</span>
            </template>
          </v-list-item>

          <v-list-item>
            <v-list-item-title class="text-grey">Business Type</v-list-item-title>
            <template v-slot:append>
              <v-chip size="small" class="text-capitalize">{{ businessInfo.type }}</v-chip>
            </template>
          </v-list-item>

          <v-list-item>
            <v-list-item-title class="text-grey">Member Since</v-list-item-title>
            <template v-slot:append>
              <span class="font-weight-medium">{{ businessInfo.memberSince }}</span>
            </template>
          </v-list-item>
        </v-list>

        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn variant="outlined" prepend-icon="mdi-pencil">Edit Profile</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
.tight-heading {
  margin-bottom: -6px;
}
</style>
