<script setup>
import { ref } from 'vue'
import { inject } from 'vue'

const activeTab = inject('activeTab')

const goToBoothSelection = () => {
  activeTab.value = 'BoothSelection'
}

// Sample events data with updated details
const events = ref([
  {
    id: 1,
    name: 'Summer Craft Fair',
    startDate: 'July 15, 2025',
    endDate: 'July 16, 2025',
    location: 'Central Park, New York',
    price: '$150',
    boothsLeft: '12',
    description: 'Annual summer craft fair featuring local artisans and vendors.',
    duration: '2 days',
  },
  {
    id: 2,
    name: 'Winter Market',
    startDate: 'December 5, 2025',
    endDate: 'December 6, 2025',
    location: 'Convention Center, Chicago',
    price: '$200',
    boothsLeft: '8',
    description: 'Holiday themed market with handcrafted gifts and seasonal items.',
    duration: '2 days',
  },
  {
    id: 3,
    name: 'Spring Festival',
    startDate: 'April 20, 2025',
    endDate: 'April 21, 2025',
    location: 'Riverfront Park, Portland',
    price: '$175',
    boothsLeft: '15',
    description: 'Celebrate spring with this outdoor festival featuring food, crafts, and music.',
    duration: '2 days',
  },
])
</script>

<template>
  <div class="mx-4 mt-n11">
    <v-sheet :elevation="6" height="auto" width="auto" class="pb-10 px-2 pt-3" rounded>
      <div class="px-5 mb-6">
        <h1 class="text-h3 font-weight-bold">Upcoming Events</h1>
        <span class="text-caption text-grey-darken-1">
          Browse and book booths for upcoming events
        </span>
      </div>
      <div>
        <v-row>
          <v-col v-for="event in events" :key="event.id" cols="12" md="4">
            <v-card height="100%" class="event-card mx-auto my-4" max-width="450">
              <v-card-text>
                <div class="mb-4">
                  <div class="text-h4 font-weight-bold">{{ event.name }}</div>
                  <div class="text-body-1 text-grey-darken-1">{{ event.description }}</div>
                </div>

                <div class="d-flex align-center my-3">
                  <v-icon color="teal" class="mr-2">mdi-calendar</v-icon>
                  <span class="text-body-1">Start Date: {{ event.startDate }}</span>
                </div>

                <div class="d-flex align-center my-3">
                  <v-icon color="teal" class="mr-2">mdi-calendar-end</v-icon>
                  <span class="text-body-1">End Date: {{ event.endDate }}</span>
                </div>

                <div class="d-flex align-center my-3">
                  <v-icon color="teal" class="mr-2">mdi-map-marker</v-icon>
                  <span class="text-body-1">{{ event.location }}</span>
                </div>

                <div class="d-flex align-center my-3">
                  <v-icon color="teal" class="mr-2">mdi-currency-usd</v-icon>
                  <span class="text-body-1">Booth Price: {{ event.price }}</span>
                </div>

                <div class="d-flex align-center my-3">
                  <v-icon color="teal" class="mr-2">mdi-store</v-icon>
                  <span class="text-body-1">Available Booths: {{ event.boothsLeft }}</span>
                </div>

                <div class="d-flex align-center my-3">
                  <v-icon color="teal" class="mr-2">mdi-timer</v-icon>
                  <span class="text-body-1">Duration: {{ event.duration }}</span>
                </div>
              </v-card-text>

              <v-card-actions class="pa-4 pt-0">
                <v-btn
                  block
                  color="teal"
                  class="text-white"
                  variant="flat"
                  @click="goToBoothSelection"
                >
                  View Booths
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-sheet>
  </div>
</template>

<style scoped>
.event-card {
  transition:
    transform 0.3s,
    box-shadow 0.3s;
  border: 1px solid #e0e0e0;
  overflow: hidden;
}

.event-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}
</style>
