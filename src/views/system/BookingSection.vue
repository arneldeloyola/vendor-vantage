<script setup>
import { ref } from 'vue'

const bookings = ref([
  {
    id: 1,
    eventName: 'Summer Craft Fair',
    boothNumber: 'A12',
    boothSize: '10×10',
    eventDate: 'July 15, 2025',
    location: 'Central Park, New York',
    amount: '$150',
    bookingDate: 'May 20, 2025',
    isPaid: true,
  },
  {
    id: 2,
    eventName: 'Spring Festival',
    boothNumber: 'B05',
    boothSize: '8×8',
    eventDate: 'April 20, 2025',
    location: 'Riverfront Park, Portland',
    amount: '$175',
    bookingDate: 'February 15, 2025',
    isPaid: false,
  },
])

const viewDetails = (booking) => {
  console.log('Viewing details for', booking.eventName)
}

const downloadReceipt = (booking) => {
  console.log('Downloading receipt for', booking.eventName)
}

const completePayment = (booking) => {
  console.log('Completing payment for', booking.eventName)
}
</script>

<template>
  <div class="mx-4 mt-n11">
    <v-sheet :elevation="6" height="auto" width="auto" class="pb-10 px-2 pt-3" rounded>
      <div class="px-5 mb-6">
        <h1 class="text-h3 font-weight-bold">My Bookings</h1>
        <span class="text-caption text-grey-darken-1">Manage your booth bookings</span>
      </div>
      <div>
        <v-row class="d-flex justify-center">
          <v-col cols="12" md="12">
            <v-card class="pa-4" elevation="2" rounded>
              <v-card-title class="text-h6 font-weight-bold">
                <div class="d-flex align-center justify-space-between w-100">
                  <span>{{ bookings[0].eventName }}</span>
                  <v-chip
                    color="success"
                    text-color="white"
                    size="small"
                    class="font-weight-medium"
                  >
                    Paid
                  </v-chip>
                </div>
              </v-card-title>

              <v-card-subtitle class="text-caption">
                <p>Booth #{{ bookings[0].boothNumber }} ({{ bookings[0].boothSize }})</p>
              </v-card-subtitle>

              <v-card-text class="pt-0">
                <div class="d-flex align-center mb-2">
                  <v-icon size="small" color="teal" class="mr-2">mdi-calendar</v-icon>
                  <span class="text-caption">Event Date: {{ bookings[0].eventDate }}</span>
                </div>

                <div class="d-flex align-center mb-2">
                  <v-icon size="small" color="teal" class="mr-2">mdi-map-marker</v-icon>
                  <span class="text-caption">{{ bookings[0].location }}</span>
                </div>

                <div class="d-flex align-center mb-2">
                  <v-icon size="small" color="teal" class="mr-2">mdi-currency-usd</v-icon>
                  <span class="text-caption">Amount: {{ bookings[0].amount }}</span>
                </div>

                <div class="text-caption text-grey mt-3">
                  Booked on: {{ bookings[0].bookingDate }}
                </div>
              </v-card-text>

              <v-card-actions class="justify-space-between">
                <v-btn
                  size="small"
                  variant="outlined"
                  color="black"
                  @click="viewDetails(bookings[0])"
                  >View Details</v-btn
                >
                <v-btn
                  size="small"
                  variant="outlined"
                  color="teal"
                  @click="downloadReceipt(bookings[0])"
                  >Download Receipt</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>

          <v-col cols="12" md="12">
            <v-card class="pa-4" elevation="2" rounded>
              <v-card-title class="text-h6 font-weight-bold">
                <div class="d-flex align-center justify-space-between w-100">
                  <span>{{ bookings[1].eventName }}</span>
                  <v-chip
                    color="warning"
                    text-color="black"
                    size="small"
                    class="font-weight-medium"
                  >
                    Payment Pending
                  </v-chip>
                </div>
              </v-card-title>

              <v-card-subtitle class="text-caption">
                <p>Booth #{{ bookings[1].boothNumber }} ({{ bookings[1].boothSize }})</p>
              </v-card-subtitle>

              <v-card-text class="pt-0">
                <div class="d-flex align-center mb-2">
                  <v-icon size="small" color="teal" class="mr-2">mdi-calendar</v-icon>
                  <span class="text-caption">Event Date: {{ bookings[1].eventDate }}</span>
                </div>

                <div class="d-flex align-center mb-2">
                  <v-icon size="small" color="teal" class="mr-2">mdi-map-marker</v-icon>
                  <span class="text-caption">{{ bookings[1].location }}</span>
                </div>

                <div class="d-flex align-center mb-2">
                  <v-icon size="small" color="teal" class="mr-2">mdi-currency-usd</v-icon>
                  <span class="text-caption">Amount: {{ bookings[1].amount }}</span>
                </div>

                <div class="text-caption text-grey mt-3">
                  Booked on: {{ bookings[1].bookingDate }}
                </div>
              </v-card-text>

              <v-card-actions class="justify-space-between">
                <v-btn
                  size="small"
                  variant="outlined"
                  color="black"
                  @click="viewDetails(bookings[1])"
                  >View Details</v-btn
                >
                <v-btn
                  size="small"
                  variant="elevated"
                  color="teal"
                  @click="completePayment(bookings[1])"
                  >Complete Payment</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-sheet>
  </div>
</template>

<style scoped>
.tight-heading {
  margin-bottom: -6px;
}
</style>
