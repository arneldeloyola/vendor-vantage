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
  description: 'Annual summer craft fair featuring local artisans and vendors.',
  date: 'July 15, 2025',
  location: 'Central Park, New York',
  price: '$150',
  deadline: 'June 30, 2025',
})

// Available booths data
const booths = ref([
  {
    id: 'A1',
    location: 'Main Entrance',
    size: '10×10',
    price: '$150',
    features: ['Corner', 'Electricity'],
    status: 'Available',
  },
  {
    id: 'A2',
    location: 'Main Entrance',
    size: '10×10',
    price: '$150',
    features: ['Electricity'],
    status: 'Available',
  },
  {
    id: 'B1',
    location: 'Food Court',
    size: '8×8',
    price: '$120',
    features: ['Electricity', 'Water'],
    status: 'Booked',
  },
  {
    id: 'C1',
    location: 'Center Stage',
    size: '12×12',
    price: '$200',
    features: ['Premium', 'Corner', 'Electricity'],
    status: 'Available',
  },
])

// // Function to book a booth
// const bookBooth = (boothId) => {
//   const booth = booths.value.find((b) => b.id === boothId)
//   if (booth && booth.status === 'Available') {
//     // In a real app, this would trigger a booking process/API call
//     alert(`Booking booth #${boothId}`)
//   }
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
                    <div class="text-subtitle-2">Event Date</div>
                    <div>{{ eventDetails.date }}</div>
                  </div>
                </div>

                <div class="d-flex align-center">
                  <v-icon color="teal" class="mr-2">mdi-currency-usd</v-icon>
                  <div>
                    <div class="text-subtitle-2">Booth Price</div>
                    <div>Starting at {{ eventDetails.price }}</div>
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

                <div class="d-flex align-center">
                  <v-icon color="teal" class="mr-2">mdi-calendar-clock</v-icon>
                  <div>
                    <div class="text-subtitle-2">Registration Deadline</div>
                    <div>{{ eventDetails.deadline }}</div>
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
                    <div class="text-subtitle-2">{{ booth.location }}</div>
                  </div>
                  <v-chip
                    :color="booth.status === 'Available' ? 'success-lighten-4' : 'grey-lighten-1'"
                    :text-color="booth.status === 'Available' ? 'success' : 'grey-darken-2'"
                    size="small"
                  >
                    {{ booth.status }}
                  </v-chip>
                </div>

                <v-divider></v-divider>

                <v-card-text>
                  <div class="d-flex justify-space-between mb-2">
                    <span class="text-body-1">Size:</span>
                    <span class="text-body-1 font-weight-medium">{{ booth.size }}</span>
                  </div>

                  <div class="d-flex justify-space-between mb-2">
                    <span class="text-body-1">Price:</span>
                    <span class="text-body-1 font-weight-medium">{{ booth.price }}</span>
                  </div>

                  <div class="mb-2">
                    <div class="text-body-1 mb-1">Features:</div>
                    <div class="d-flex flex-wrap gap-1">
                      <v-chip
                        v-for="feature in booth.features"
                        :key="feature"
                        size="x-small"
                        class="mr-1 mb-1"
                        color="teal"
                        text-color="teal"
                      >
                        {{ feature }}
                      </v-chip>
                    </div>
                  </div>
                </v-card-text>

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
