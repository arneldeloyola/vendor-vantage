<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const eventId = ref(null)

// All events data - in a real app this would come from an API or store
const eventsData = [
  {
    id: 1,
    name: 'Summer Craft Fair',
    description: 'Annual summer craft fair featuring local artisans and vendors.',
    date: 'July 15, 2025',
    location: 'Central Park, New York',
    price: '$150',
    deadline: 'June 30, 2025',
  },
  {
    id: 2,
    name: 'Winter Market',
    description: 'Holiday themed market with handcrafted gifts and seasonal items.',
    date: 'December 5, 2025',
    location: 'Convention Center, Chicago',
    price: '$200',
    deadline: 'November 15, 2025',
  },
  {
    id: 3,
    name: 'Spring Festival',
    description: 'Celebrate spring with this outdoor festival featuring food, crafts, and music.',
    date: 'April 20, 2025',
    location: 'Riverfront Park, Portland',
    price: '$175',
    deadline: 'March 25, 2025',
  },
]

// Event details - will be loaded based on the ID
const eventDetails = ref({
  name: '',
  description: '',
  date: '',
  location: '',
  price: '',
  deadline: '',
})

// Available booths data - in a real app, this would be fetched from an API based on eventId
const boothsData = {
  1: [
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
  ],
  2: [
    {
      id: 'W1',
      location: 'Winter Wonderland',
      size: '10×10',
      price: '$200',
      features: ['Corner', 'Electricity', 'Heating'],
      status: 'Available',
    },
    {
      id: 'W2',
      location: 'Holiday Section',
      size: '12×12',
      price: '$250',
      features: ['Premium', 'Corner', 'Electricity', 'Heating'],
      status: 'Available',
    },
    {
      id: 'W3',
      location: 'Holiday Section',
      size: '8×8',
      price: '$150',
      features: ['Electricity', 'Heating'],
      status: 'Booked',
    },
  ],
  3: [
    {
      id: 'S1',
      location: 'Garden Area',
      size: '10×10',
      price: '$175',
      features: ['Corner', 'Electricity', 'Water'],
      status: 'Available',
    },
    {
      id: 'S2',
      location: 'Garden Area',
      size: '10×10',
      price: '$175',
      features: ['Electricity', 'Water'],
      status: 'Available',
    },
    {
      id: 'S3',
      location: 'Food Court',
      size: '8×8',
      price: '$150',
      features: ['Electricity', 'Water'],
      status: 'Booked',
    },
  ],
}

const booths = ref([])

// Load event details and booths based on the ID
onMounted(() => {
  eventId.value = parseInt(route.params.id)

  // Find the event data
  const event = eventsData.find((e) => e.id === eventId.value)
  if (event) {
    eventDetails.value = event
  }

  // Load booths for this event
  if (boothsData[eventId.value]) {
    booths.value = boothsData[eventId.value]
  }
})

// Function to book a booth
const bookBooth = (boothId) => {
  const booth = booths.value.find((b) => b.id === boothId)
  if (booth && booth.status === 'Available') {
    // In a real app, this would trigger a booking process/API call
    alert(`Booking booth #${boothId} for event ${eventDetails.value.name}`)
  }
}
</script>

<template>
  <v-container class="mt-8">
    <h1 class="text-h3 font-weight-bold">{{ eventDetails.name }}</h1>
    <div class="text-subtitle-1 mb-6">Select and book a booth for this event</div>

    <!-- Event Details Card -->
    <v-card class="mb-6">
      <v-card-title class="text-h5">Event Details</v-card-title>
      <v-card-text>
        <p>{{ eventDetails.description }}</p>

        <v-row class="mt-4">
          <v-col cols="12" md="6">
            <div class="d-flex align-center mb-4">
              <v-icon color="primary" class="mr-2">mdi-calendar</v-icon>
              <div>
                <div class="text-subtitle-2">Event Date</div>
                <div>{{ eventDetails.date }}</div>
              </div>
            </div>

            <div class="d-flex align-center">
              <v-icon color="primary" class="mr-2">mdi-currency-usd</v-icon>
              <div>
                <div class="text-subtitle-2">Booth Price</div>
                <div>Starting at {{ eventDetails.price }}</div>
              </div>
            </div>
          </v-col>

          <v-col cols="12" md="6">
            <div class="d-flex align-center mb-4">
              <v-icon color="primary" class="mr-2">mdi-map-marker</v-icon>
              <div>
                <div class="text-subtitle-2">Location</div>
                <div>{{ eventDetails.location }}</div>
              </div>
            </div>

            <div class="d-flex align-center">
              <v-icon color="primary" class="mr-2">mdi-calendar-clock</v-icon>
              <div>
                <div class="text-subtitle-2">Registration Deadline</div>
                <div>{{ eventDetails.deadline }}</div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Available Booths Section -->
    <h2 class="text-h4 font-weight-bold mb-4">Available Booths</h2>

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
                  color="primary-lighten-4"
                  text-color="primary-darken-1"
                >
                  {{ feature }}
                </v-chip>
              </div>
            </div>
          </v-card-text>

          <v-card-actions class="pa-4 pt-0">
            <v-btn
              block
              color="primary"
              variant="flat"
              :disabled="booth.status !== 'Available'"
              @click="bookBooth(booth.id)"
            >
              {{ booth.status === 'Available' ? 'Book This Booth' : 'Already Booked' }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
