<script setup>
import { ref } from 'vue'
import TopNavbar from '@/components/layout/TopNavbar.vue'

const events = ref([
  {
    id: 1,
    name: 'Spring Festival',
    date: 'May 15, 2025',
    location: 'Main Quad',
    description: 'Annual spring celebration with music, food, and activities',
    availableBooths: 12,
  },
  {
    id: 2,
    name: 'Tech Expo',
    date: 'June 10, 2025',
    location: 'Engineering Building',
    description: 'Showcase of the latest technology innovations from students and local businesses',
    availableBooths: 8,
  },
  {
    id: 3,
    name: 'Welcome Week',
    date: 'September 5, 2025',
    location: 'Student Center',
    description:
      'Orientation event for new students with various activities and information booths',
    availableBooths: 15,
  },
])
</script>

<template>
  <v-app>
    <TopNavbar />

    <v-main>
      <v-container fluid class="py-16 px-4 px-md-16">
        <v-row align="center" class="mb-10" no-gutters>
          <v-col>
            <div>
              <h1 class="text-h5 text-md-h4 font-weight-bold mb-1">Campus Events</h1>
              <p class="text-subtitle-2 text-grey mb-0">
                Find and book vendor booths for upcoming events
              </p>
            </div>
          </v-col>

          <v-col cols="12" md="4" class="ml-auto">
            <v-text-field
              prepend-inner-icon="mdi-magnify"
              placeholder="Search events..."
              density="compact"
              hide-details
              variant="outlined"
              class="search-field mx-2"
              style="max-width: 250px; font-size: 0.85rem"
            ></v-text-field>
          </v-col>
        </v-row>

        <h2 class="text-h5 font-weight-bold mb-6 text-left">All Events</h2>

        <v-row>
          <v-col v-for="event in events" :key="event.id" cols="12" md="6" lg="4" class="mb-6">
            <v-card class="pa-4 text-left">
              <h3 class="text-h6 font-weight-bold mb-1">{{ event.name }}</h3>
              <p class="text-subtitle-2 mb-1">{{ event.date }}</p>
              <p class="text-subtitle-2 text-grey mb-3">{{ event.location }}</p>
              <p class="text-body-2 mb-3">{{ event.description }}</p>
              <p class="text-caption text-grey mb-4">
                {{ event.availableBooths }} booths available
              </p>
              <v-btn color="black" block :to="`/events/${event.id}`">Book Now</v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
