<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'

import { ref } from 'vue'

const tab = ref('three') // Default tab

// Events data
const events = ref([
  {
    id: 1,
    name: 'Local Student Government Days 2025',
    date: 'April 11-12, and April 14-16, 2025!',
    boothsAvailable: 12,
    description:
      'The USG alomg with the LSGs are opening its doors for sellers for the grandest event of the different college governments of CSU! Sell your foods, goods, or other services while you also get to enjoy the rockin atmosphere of the LSG Days 2025',
    image: '/public/images/vendo1.jpg',
  },
  {
    id: 2,
    name: 'Hugyaw 2025',
    date: 'January 13, 2025',
    boothsAvailable: 8,
    description:
      'We are looking for vendors to bring their magic to our Coachella-inspired tropical paradise for the upcoming Hugyaw 2025. Think vibrant colors, island flair, and unforgettable experiences.',
    image: '/public/images/vendo2.jpg',
  },
  {
    id: 3,
    name: 'Sangka 2025',
    date: 'July 20, 2025',
    boothsAvailable: 5,
    description:
      'The University Student Government, along with the Fiscal and Entrepreneurship Committee is opening its doors for potential vendors for the most-awaited event of the year! You can sell food, apparel, accessories, and many others, while enjoying the festive atmosphere of the University Intramurals!',
    image: '/public/images/vendo3.jpg',
  },
  {
    id: 4,
    name: 'Hinang Days 2024',
    date: 'May 9-10, 2024',
    boothsAvailable: 10,
    description:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: '/public/images/vendo4.jpg',
  },
])

// Bookings data
const bookings = ref([])

// Application form dialog
const showApplicationFormDialog = ref(false)
const selectedEvent = ref(null)

// Form data
const formData = ref({
  applicantName: '',
  storeName: '',
  status: '',
  gcashNumber: '',
  lineOfBusiness: 'food', // Default selection
})

// Open application form
const openApplicationForm = (event) => {
  selectedEvent.value = event
  showApplicationFormDialog.value = true
}

// Submit application
const submitApplication = () => {
  bookings.value.push({
    ...selectedEvent.value,
    applicantName: formData.value.applicantName,
    storeName: formData.value.storeName,
    status: formData.value.status,
    gcashNumber: formData.value.gcashNumber,
    lineOfBusiness: formData.value.lineOfBusiness,
  })
  showApplicationFormDialog.value = false
  formData.value = {
    applicantName: '',
    storeName: '',
    status: '',
    gcashNumber: '',
    lineOfBusiness: 'food',
  }
}
// Cancel booking
const cancelBooking = (bookingIndex) => {
  bookings.value.splice(bookingIndex, 1)
}
</script>

<template>
  <AppLayout>
    <template #content>
      <v-row>
        <!-- Tabs -->
        <v-col cols="12" md="3" class="mt-8 ml-8">
          <v-card class="rounded-lg" flat>
            <div class="d-flex justify-space-evenly bg-grey-lighten-3 rounded-lg pa-1">
              <v-btn
                :color="tab === 'one' ? 'white' : 'grey-lighten-3'"
                :variant="tab === 'one' ? 'elevated' : 'text'"
                :class="[' rounded-lg', tab === 'one' ? 'text-black' : 'text-grey-darken-3']"
                @click="tab = 'one'"
              >
                <span class="text-subtitle-2"><b>Overview</b></span>
              </v-btn>
              <v-btn
                :color="tab === 'two' ? 'white' : 'grey-lighten-3'"
                :variant="tab === 'two' ? 'elevated' : 'text'"
                :class="[' rounded-lg', tab === 'two' ? 'text-black' : 'text-grey-darken-3']"
                @click="tab = 'two'"
              >
                <span class="text-subtitle-2"><b>Bookings</b></span>
              </v-btn>
              <v-btn
                :color="tab === 'three' ? 'white' : 'grey-lighten-3'"
                :variant="tab === 'three' ? 'elevated' : 'text'"
                :class="[' rounded-lg', tab === 'three' ? 'text-black' : 'text-grey-darken-3']"
                @click="tab = 'three'"
              >
                <span class="text-subtitle-2"><b>Events</b></span>
              </v-btn>
            </div>
            <br />
          </v-card>
        </v-col>

        <!-- Overview Section -->
        <v-col cols="12" md="12" v-if="tab === 'one'" class="pa-4">
          <v-row class="mx-5">
            <v-col cols="12" md="3">
              <v-card class="pa-4" elevation="5" rounded>
                <div class="d-flex align-center mb-2">
                  <div class="text-subtitle-2 font-weight-medium"><b>Spring Festival</b></div>
                  <v-icon class="ms-auto" size="small">mdi-calendar-check</v-icon>
                </div>
                <div class="text-h5 font-weight-bold">2</div>
                <div class="text-caption text-grey-darken-1">+1 from last month</div>
              </v-card>
            </v-col>

            <!-- Upcoming Events -->
            <v-col cols="12" md="3">
              <v-card class="pa-4" elevation="5" rounded>
                <div class="d-flex align-center mb-2">
                  <div class="text-subtitle-2 font-weight-medium">
                    <b>Upcoming Events</b>
                  </div>
                  <v-icon class="ms-auto" size="small">mdi-calendar</v-icon>
                </div>
                <div class="text-h5 font-weight-bold">1</div>
                <div class="text-caption text-grey-darken-1">Next event in 5 days</div>
              </v-card>
            </v-col>

            <!-- Pending Payments -->
            <v-col cols="12" md="3">
              <v-card class="pa-4" elevation="5" rounded>
                <div class="d-flex align-center mb-2">
                  <div class="text-subtitle-2 font-weight-medium"><b>Pending Payments</b></div>
                  <v-icon class="ms-auto" size="small">mdi-currency-usd</v-icon>
                </div>
                <div class="text-h5 font-weight-bold">$150</div>
                <div class="text-caption text-grey-darken-1">For Spring Festival</div>
              </v-card>
            </v-col>

            <!-- Profile Status -->
            <v-col cols="12" md="3">
              <v-card class="pa-4" elevation="5" rounded>
                <div class="d-flex align-center mb-2">
                  <div class="text-subtitle-2 font-weight-medium"><b>Profile Status</b></div>
                  <v-icon class="ms-auto" size="small">mdi-account-check</v-icon>
                </div>
                <div class="text-h6 font-weight-bold text-success">Verified</div>
                <div class="text-caption text-grey-darken-1">Last updated 2 days ago</div>
              </v-card>
            </v-col>
          </v-row>

          <v-row class="mx-5">
            <v-col cols="12" md="7">
              <v-card class="pa-4" elevation="5" rounded>
                <div class="d-flex align-center mb-2">
                  <div class="text-subtitle-2 font-weight-medium"><b>Upcoming Bookings</b></div>
                  <v-icon class="ms-auto" size="small">mdi-calendar-check</v-icon>
                </div>
                <div class="text-h5 font-weight-bold">{{ bookings.length }}</div>
                <div class="text-caption text-grey-darken-1">+{{ bookings.length }} this month</div>
              </v-card>
            </v-col>
            <v-col cols="12" md="5">
              <v-card class="elevation-5" rounded>
                <v-card-title class="text-h6 font-weight-bold py-3">
                  <v-icon start class="me-2">mdi-store</v-icon>
                  <b>Your Business</b>
                </v-card-title>

                <v-list density="compact">
                  <v-list-item>
                    <v-list-item-title class="text-grey">Shop Name</v-list-item-title>
                    <template v-slot:append>
                      <span class="font-weight-medium">Kwek Kwek papart</span>
                    </template>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title class="text-grey">Contact</v-list-item-title>
                    <template v-slot:append>
                      <span class="font-weight-medium">+63-917-1234-5678</span>
                    </template>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title class="text-grey">Business Type</v-list-item-title>
                    <template v-slot:append>
                      <v-chip size="small" class="text-capitalize">food</v-chip>
                    </template>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title class="text-grey">Member Since</v-list-item-title>
                    <template v-slot:append>
                      <span class="font-weight-medium">1/15/2025</span>
                    </template>
                  </v-list-item>
                </v-list>

                <v-card-actions class="pa-4">
                  <v-spacer></v-spacer>
                  <v-btn variant="outlined" prepend-icon="mdi-pencil"> Edit Profile </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>

            <v-col>
              <v-card></v-card>
            </v-col>
          </v-row>
        </v-col>

        <!-- Bookings Section -->
        <v-col cols="12" md="12" v-if="tab === 'two'" class="pa-4">
          <v-sheet :elevation="6" height="auto" class="pb-10 px-10" rounded>
            <div class="px-5 mb-6">
              <h1 class="tight-heading pt-4">My Bookings</h1>
              <span class="text-caption text-grey-darken-1">Manage your event bookings</span>
            </div>
            <v-row>
              <v-col cols="12" md="6" v-for="(booking, index) in bookings" :key="index">
                <v-card class="pa-7" elevation="10" rounded>
                  <v-img :src="booking.image" height="300px" width="300px" class="mb-3"></v-img>
                  <v-card-title class="text-h6 font-weight-bold">{{ booking.name }}</v-card-title>
                  <v-card-subtitle class="text-caption">
                    <p>{{ booking.date }}</p>
                    <p>Applicant: {{ booking.applicantName }}</p>
                    <p>Store: {{ booking.storeName }}</p>
                    <p>Gcash#: {{ booking.gcashNumber }}</p>
                  </v-card-subtitle>
                  <v-card-text class="text-caption">
                    Line of Business: {{ booking.lineOfBusiness }}
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="red " variant="outlined" @click="cancelBooking(index)">
                      Cancel Booking
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>

        <!-- Events Section -->
        <v-col cols="12" md="12" v-if="tab === 'three'" class="pa-2">
          <v-sheet :elevation="6" height="auto" width="auto" class="pb-10 px-2" rounded>
            <div class="px-5 mb-6">
              <h1 class="tight-heading pt-2">Available Events</h1>
              <span class="text-caption text-grey-darken-1"
                >Browse and book upcoming campus events</span
              >
            </div>
            <v-row class="px-5">
              <v-col cols="12" md="3" v-for="event in events" :key="event.id">
                <v-card class="pa-4" elevation="10" rounded>
                  <!-- Event Image -->
                  <v-img :src="event.image"></v-img>

                  <!-- Event Content -->
                  <div>
                    <v-card-title class="text-h6 font-weight-bold">{{ event.name }}</v-card-title>
                    <v-card-subtitle class="text-caption">
                      <p>
                        <b>{{ event.date }}</b>
                      </p>
                      <p>{{ event.boothsAvailable }} booths available</p>
                    </v-card-subtitle>
                    <v-card-text class="text-caption">{{ event.description }}</v-card-text>

                    <!-- Action Buttons -->
                    <v-card-actions class="d-flex gap-2 mt-2">
                      <v-btn
                        size="small"
                        variant="elevated"
                        color="black"
                        @click="openApplicationForm(event)"
                      >
                        Book Now
                      </v-btn>
                      <v-btn size="small" variant="outlined" color="black">View Details</v-btn>
                    </v-card-actions>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
      </v-row>

      <!-- Application Form Dialog -->
      <v-dialog v-model="showApplicationFormDialog" max-width="600">
        <v-card>
          <v-card-title class="text-h5 font-weight-bold">Application Form</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="submitApplication">
              <v-text-field
                v-model="formData.applicantName"
                prepend-inner-icon="mdi-account"
                label="Name of Applicant"
                variant="outlined"
                required
                class="mb-3"
              ></v-text-field>
              <v-text-field
                v-model="formData.storeName"
                prepend-inner-icon="mdi-store"
                label="Name of Store"
                variant="outlined"
                required
                class="mb-3"
              ></v-text-field>
              <v-text-field
                v-model="formData.status"
                prepend-inner-icon="mdi-account-check"
                label="Status (owner/employee, etc.)"
                variant="outlined"
                required
                class="mb-3"
              ></v-text-field>
              <v-text-field
                v-model="formData.gcashNumber"
                prepend-inner-icon="mdi-currency-usd"
                label="Payment (Gcash#)"
                variant="outlined"
                required
                class="mb-3"
              ></v-text-field>
              <v-radio-group v-model="formData.lineOfBusiness" class="mb-3">
                <div class="text-subtitle-1 mb-2"><b>Line of Business</b></div>
                <v-radio label="Food with Drinks" value="food"></v-radio>
                <v-radio label="Coffee and Beverages" value="coffee"></v-radio>
                <v-radio label="Handcrafts" value="handcrafts"></v-radio>
              </v-radio-group>
              <v-btn type="submit" color="success" class="mt-4">Submit</v-btn>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="red" @click="showApplicationFormDialog = false">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </AppLayout>
</template>

<style scoped>
.tight-heading {
  margin-bottom: -6px;
}
</style>
