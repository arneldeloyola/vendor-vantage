<script setup>
import { ref } from 'vue'
import { inject } from 'vue'

const activeTab = inject('activeTab')

const goToApplicationForm = () => {
  activeTab.value = 'ApplicationForm'
}

// Event details
const eventDetails = ref({
  name: 'Summer Craft Fair',
  startDate: 'July 15, 2025',
  endDate: 'July 16, 2025',
  location: 'Central Park, New York',
  price: '$150',
  boothsLeft: '12',
  description: 'Annual summer craft fair featuring local artisans and vendors.',
  duration: '2 days',
})

// Available booths data
const booths = ref([
  {
    id: '1',
    status: 'Available',
  },
  {
    id: '2',
    status: 'Available',
  },
  {
    id: '3',
    status: 'Booked',
  },
  {
    id: '4',
    status: 'Available',
  },
])
</script>

<template>
  <div class="mx-4 mt-n11">
    <v-sheet :elevation="6" height="auto" width="auto" class="pb-10 px-2 pt-3" rounded>
      <div class="px-5 mb-6">
        <h1 class="text-h3 font-weight-bold">{{ eventDetails.name }}</h1>
        <span class="text-caption text-grey-darken-1">Select and book a booth for this event</span>
      </div>

      <div>
        <v-card class="mb-6" elevation="3">
          <v-card-title class="text-h5">Event Details</v-card-title>
          <v-card-text>
            <p>{{ eventDetails.description }}</p>

            <v-row class="mt-4">
              <v-col cols="12" md="6">
                <div class="d-flex align-center mb-4">
                  <v-icon color="teal" class="mr-2">mdi-calendar</v-icon>
                  <div>
                    <div class="text-subtitle-2">Start Date</div>
                    <div>{{ eventDetails.startDate }}</div>
                  </div>
                </div>

                <div class="d-flex align-center mb-4">
                  <v-icon color="teal" class="mr-2">mdi-calendar-end</v-icon>
                  <div>
                    <div class="text-subtitle-2">End Date</div>
                    <div>{{ eventDetails.endDate }}</div>
                  </div>
                </div>

                <div class="d-flex align-center">
                  <v-icon color="teal" class="mr-2">mdi-currency-usd</v-icon>
                  <div>
                    <div class="text-subtitle-2">Booth Price</div>
                    <div>{{ eventDetails.price }}</div>
                  </div>
                </div>
              </v-col>

              <v-col cols="12" md="6">
                <div class="d-flex align-center mb-4">
                  <v-icon color="teal" class="mr-2">mdi-map-marker</v-icon>
                  <div>
                    <div class="text-subtitle-2">Location</div>
                    <div>{{ eventDetails.location }}</div>
                  </div>
                </div>

                <div class="d-flex align-center mb-4">
                  <v-icon color="teal" class="mr-2">mdi-store</v-icon>
                  <div>
                    <div class="text-subtitle-2">Available Booths</div>
                    <div>{{ eventDetails.boothsLeft }}</div>
                  </div>
                </div>

                <div class="d-flex align-center">
                  <v-icon color="teal" class="mr-2">mdi-timer</v-icon>
                  <div>
                    <div class="text-subtitle-2">Duration</div>
                    <div>{{ eventDetails.duration }}</div>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <div>
          <h2 class="text-h4 font-weight-bold mb-4">Available Booths</h2>
        </div>

        <div>
          <v-row>
            <v-col v-for="booth in booths" :key="booth.id" cols="12" sm="6" lg="3">
              <v-card height="100%" class="booth-card">
                <div class="d-flex justify-space-between pa-4">
                  <div>
                    <div class="text-h5 font-weight-bold">Booth #{{ booth.id }}</div>
                  </div>
                  <v-chip
                    :color="booth.status === 'Available' ? 'success-lighten-4' : 'grey-lighten-1'"
                    :text-color="booth.status === 'Available' ? 'success' : 'grey-darken-2'"
                    size="small"
                  >
                    {{ booth.status }}
                  </v-chip>
                </div>

                <v-card-actions class="pa-4 pt-0">
                  <v-btn
                    block
                    color="teal"
                    variant="flat"
                    :disabled="booth.status !== 'Available'"
                    @click="goToApplicationForm"
                  >
                    {{ booth.status === 'Available' ? 'Book This Booth' : 'Already Booked' }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </div>
    </v-sheet>
  </div>
</template>

<style scoped>
.booth-card {
  transition:
    transform 0.3s,
    box-shadow 0.3s;
  border: 1px solid #e0e0e0;
}

.booth-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}
</style>
