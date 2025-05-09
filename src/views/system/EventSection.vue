<script setup>
import { ref } from 'vue'
import { inject } from 'vue'

const activeTab = inject('activeTab')

const goToBoothSelection = () => {
  activeTab.value = 'BoothSelection'
}
// Sample events data with image URLs
const events = ref([
  {
    id: 1,
    name: 'Summer Craft Fair',
    description: 'Annual summer craft fair featuring local artisans and vendors.',
    date: 'July 15, 2025',
    location: 'Central Park, New York',
    price: '$150',
    deadline: 'June 30, 2025',
    boothsLeft: '12',
    image: '/public/images/summercrafts.webp', // Path to your image
  },
  {
    id: 2,
    name: 'Winter Market',
    description: 'Holiday themed market with handcrafted gifts and seasonal items.',
    date: 'December 5, 2025',
    location: 'Convention Center, Chicago',
    price: '$200',
    deadline: 'November 15, 2025',
    boothsLeft: '8',
    image: '/public/images/winter.jpg', // Path to your image
  },
  {
    id: 3,
    name: 'Spring Festival',
    description: 'Celebrate spring with this outdoor festival featuring food, crafts, and music.',
    date: 'April 20, 2025',
    location: 'Riverfront Park, Portland',
    price: '$175',
    deadline: 'March 25, 2025',
    boothsLeft: '15',
    image: '/public/images/spring.webp', // Path to your image
  },
])

// // Function to navigate to event details page
// const viewBooths = (eventId) => {
//   router.push(`/event-booths/${eventId}`)
// }

// Fallback image in case the main image fails to load
const handleImageError = (event) => {
  event.target.src = '/images/event-placeholder.jpg'
}
</script>

<!-- UpcomingEvents.vue -->
<template>
  <div class="mx-4 mt-n11">
    <v-sheet :elevation="6" height="auto" width="auto" class="pb-10 px-2 pt-3" rounded>
      <div class="px-5 mb-6">
        <h1 class="text-h3 font-weight-bold">Upcoming Events</h1>
        <span class="text-caption text-grey-darken-1"
          >Browse and book booths for upcoming events</span
        >
      </div>
      <div>
        <v-row>
          <v-col v-for="event in events" :key="event.id" cols="12" md="4">
            <v-card height="100%" class="event-card mx-auto my-4" max-width="450">
              <!-- Image section -->
              <v-img
                :src="event.image"
                height="250"
                cover
                class="event-image"
                @error="handleImageError"
                gradient="to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.5)"
              >
                <template v-slot:placeholder>
                  <v-row class="fill-height ma-0" align="center" justify="center">
                    <v-progress-circular indeterminate color="teal-lighten-5"></v-progress-circular>
                  </v-row>
                </template>
                <!-- Event name overlay on the image (optional) -->
                <div class="image-overlay pa-3">
                  <v-chip color="teal" text-color="black" class="font-weight-medium">
                    {{ event.boothsLeft }} booths left
                  </v-chip>
                </div>
              </v-img>

              <v-card-text>
                <div class="d-flex justify-space-between align-center mb-4">
                  <div>
                    <div class="text-h4 font-weight-bold">{{ event.name }}</div>
                    <div class="text-body-1 text-grey-darken-1">{{ event.description }}</div>
                  </div>
                </div>

                <div class="d-flex align-center my-3">
                  <v-icon color="teal" class="mr-2">mdi-calendar</v-icon>
                  <span class="text-body-1">{{ event.date }}</span>
                </div>

                <div class="d-flex align-center my-3">
                  <v-icon color="teal" class="mr-2">mdi-map-marker</v-icon>
                  <span class="text-body-1">{{ event.location }}</span>
                </div>

                <div class="d-flex align-center my-3">
                  <v-icon color="teal" class="mr-2">mdi-currency-usd</v-icon>
                  <span class="text-body-1">{{ event.price }} per booth</span>
                </div>

                <div class="text-grey-darken-1 mt-4">
                  Registration deadline: {{ event.deadline }}
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

.event-image {
  position: relative;
}

.image-overlay {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;

  justify-content: flex-end;
}

.tight-heading {
  line-height: 1.2;
  margin-bottom: 8px;
}
</style>
