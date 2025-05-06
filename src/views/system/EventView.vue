<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const eventId = route.params.id

const selectedBooth = ref(null)
const isLoading = ref(false)
const successDialog = ref(false)

const event = {
  id: eventId,
  name: 'Spring Festival',
  date: 'May 15, 2025',
  location: 'Main Quad',
  description:
    'Annual spring celebration with music, food, and activities. Join us for a day of fun, entertainment, and community engagement. This event attracts thousands of students and community members each year.',
  availableBooths: 12,
  booths: [
    { id: '1', number: '1', available: true },
    { id: '2', number: '2', available: true },
    { id: '3', number: '3', available: false },
    { id: '4', number: '4', available: true },
    { id: '5', number: '5', available: true },
    { id: '6', number: '6', available: false },
    { id: '7', number: '7', available: true },
    { id: '8', number: '8', available: true },
    { id: '9', number: '9', available: true },
    { id: '10', number: '10', available: false },
    { id: '11', number: '11', available: true },
    { id: '12', number: '12', available: true },
  ],
  price: 150,
}

const availableBoothsCount = computed(() => event.booths.filter((b) => b.available).length)

const getBoothNumber = (id) => {
  return event.booths.find((b) => b.id === id)?.number || ''
}

const handleBookNow = () => {
  if (!selectedBooth.value) return

  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    successDialog.value = true
  }, 1500)
}

const goToDashboard = () => {
  router.push('/dashboard?tab=bookings')
}
</script>

<template>
  <v-container fluid>
    <v-app-bar flat color="white" class="border-b">
      <v-container class="d-flex align-center justify-space-between">
        <RouterLink to="/" class="d-flex align-center text-decoration-none">
          <v-icon class="mr-2">mdi-store</v-icon>
          <span class="font-weight-bold">CampusVendor</span>
        </RouterLink>
        <div class="d-flex gap-4">
          <RouterLink to="/events" class="text-subtitle-2">Events</RouterLink>
          <RouterLink to="/dashboard" class="text-subtitle-2">Dashboard</RouterLink>
        </div>
      </v-container>
    </v-app-bar>

    <v-main class="py-4">
      <v-container>
        <RouterLink to="/events">
          <v-btn variant="text" prepend-icon="mdi-arrow-left">Back to Events</v-btn>
        </RouterLink>

        <v-row class="mt-6" dense>
          <v-col cols="12" md="8">
            <v-card>
              <v-card-title class="text-h5">{{ event.name }}</v-card-title>
              <v-card-subtitle>
                <v-row class="mb-1">
                  <v-col cols="auto" class="d-flex align-center">
                    <v-icon size="18" class="mr-1">mdi-calendar</v-icon>
                    {{ event.date }}
                  </v-col>
                  <v-col cols="auto" class="d-flex align-center">
                    <v-icon size="18" class="mr-1">mdi-map-marker</v-icon>
                    {{ event.location }}
                  </v-col>
                </v-row>
              </v-card-subtitle>
              <v-card-text>
                <p>{{ event.description }}</p>

                <div class="mt-6">
                  <h3 class="text-subtitle-1 mb-2">Select a Booth</h3>
                  <v-row dense>
                    <v-col
                      v-for="booth in event.booths"
                      :key="booth.id"
                      cols="4"
                      sm="3"
                      md="4"
                      lg="3"
                    >
                      <v-btn
                        :disabled="!booth.available"
                        :color="selectedBooth === booth.id ? 'primary' : 'grey lighten-2'"
                        @click="() => (selectedBooth = booth.id)"
                        block
                      >
                        Booth #{{ booth.number }}
                      </v-btn>
                    </v-col>
                  </v-row>
                  <p class="text-caption mt-2">
                    {{ availableBoothsCount }} booths available out of {{ event.booths.length }}
                  </p>
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card>
              <v-card-title>Booking Summary</v-card-title>
              <v-card-text>
                <v-row dense>
                  <v-col cols="6">Event</v-col>
                  <v-col cols="6" class="text-right">{{ event.name }}</v-col>

                  <v-col cols="6">Date</v-col>
                  <v-col cols="6" class="text-right">{{ event.date }}</v-col>

                  <v-col cols="6" v-if="selectedBooth">Booth</v-col>
                  <v-col cols="6" class="text-right" v-if="selectedBooth">
                    #{{ getBoothNumber(selectedBooth) }}
                  </v-col>

                  <v-col cols="12"><v-divider class="my-2" /></v-col>

                  <v-col cols="6" class="font-weight-bold">Total</v-col>
                  <v-col cols="6" class="text-right font-weight-bold">
                    ${{ event.price }}.00
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  color="primary"
                  block
                  :loading="isLoading"
                  :disabled="!selectedBooth"
                  @click="handleBookNow"
                >
                  Book Now
                </v-btn>
              </v-card-actions>
            </v-card>

            <v-card class="mt-4" outlined>
              <v-card-title class="text-subtitle-1">Booking Information</v-card-title>
              <v-card-text>
                <v-list dense>
                  <v-list-item>
                    <v-chip small outlined>Note</v-chip>
                    <span class="ml-2">Bookings are confirmed after payment</span>
                  </v-list-item>
                  <v-list-item>
                    <v-chip small outlined>Note</v-chip>
                    <span class="ml-2">Cancellations allowed up to 7 days before event</span>
                  </v-list-item>
                  <v-list-item>
                    <v-chip small outlined>Note</v-chip>
                    <span class="ml-2">Setup begins 2 hours before event start</span>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-footer class="border-t pa-4">
      <v-container class="text-center text-caption text-muted">
        © 2025 CampusVendor. All rights reserved.
      </v-container>
    </v-footer>

    <!-- Success Dialog -->
    <v-dialog v-model="successDialog" width="400">
      <v-card>
        <v-card-title class="text-h6">Booking Successful!</v-card-title>
        <v-card-text>
          Your booth has been reserved. Please complete the payment to confirm your booking.
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="goToDashboard">Go to Dashboard</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped>
.text-muted {
  color: #6c757d;
}
</style>
