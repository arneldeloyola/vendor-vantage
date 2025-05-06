<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import { ref } from 'vue'

const tab = ref('one')
</script>

<template>
  <AppLayout>
    <template #content>
      <v-row>
        <v-col cols="12" md="3" class="mt-8 ml-5">
          <v-card class="rounded-lg" flat>
            <div class="d-flex justify-space-evenly bg-grey-lighten-3 rounded-lg pa-1">
              <v-btn
                :color="tab === 'one' ? 'white' : 'grey-lighten-3'"
                :variant="tab === 'one' ? 'elevated' : 'text'"
                :class="[' rounded-lg', tab === 'one' ? 'text-black' : 'text-grey-darken-3']"
                @click="tab = 'one'"
              >
                <span class="text-subtitle-2">Overview</span>
              </v-btn>
              <v-btn
                :color="tab === 'two' ? 'white' : 'grey-lighten-3'"
                :variant="tab === 'two' ? 'elevated' : 'text'"
                :class="[' rounded-lg', tab === 'two' ? 'text-black' : 'text-grey-darken-3']"
                @click="tab = 'two'"
              >
                <span class="text-subtitle-2">Bookings</span>
              </v-btn>
              <v-btn
                :color="tab === 'three' ? 'white' : 'grey-lighten-3'"
                :variant="tab === 'three' ? 'elevated' : 'text'"
                :class="[' rounded-lg', tab === 'three' ? 'text-black' : 'text-grey-darken-3']"
                @click="tab = 'three'"
              >
                <span class="text-subtitle-2">Events</span>
              </v-btn>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" md="9"></v-col>
        <v-col cols="12" md="12" class="mt-n4">
          <div v-if="tab === 'one'" class="pa-4">
            <v-row>
              <v-col cols="12" md="3">
                <v-card class="pa-4" elevation="2" rounded>
                  <div class="d-flex align-center mb-2">
                    <div class="text-subtitle-2 font-weight-medium">Spring Festival</div>
                    <v-icon class="ms-auto" size="small">mdi-calendar-check</v-icon>
                  </div>
                  <div class="text-h5 font-weight-bold">2</div>
                  <div class="text-caption text-grey-darken-1">+1 from last month</div>
                </v-card>
              </v-col>

              <!-- Upcoming Events -->
              <v-col cols="12" md="3">
                <v-card class="pa-4" elevation="2" rounded>
                  <div class="d-flex align-center mb-2">
                    <div class="text-subtitle-2 font-weight-medium">Upcoming Events</div>
                    <v-icon class="ms-auto" size="small">mdi-calendar</v-icon>
                  </div>
                  <div class="text-h5 font-weight-bold">1</div>
                  <div class="text-caption text-grey-darken-1">Next event in 5 days</div>
                </v-card>
              </v-col>

              <!-- Pending Payments -->
              <v-col cols="12" md="3">
                <v-card class="pa-4" elevation="2" rounded>
                  <div class="d-flex align-center mb-2">
                    <div class="text-subtitle-2 font-weight-medium">Pending Payments</div>
                    <v-icon class="ms-auto" size="small">mdi-currency-usd</v-icon>
                  </div>
                  <div class="text-h5 font-weight-bold">P150</div>
                  <div class="text-caption text-grey-darken-1">For Spring Festival</div>
                </v-card>
              </v-col>

              <!-- Profile Status -->
              <v-col cols="12" md="3">
                <v-card class="pa-4" elevation="2" rounded>
                  <div class="d-flex align-center mb-2">
                    <div class="text-subtitle-2 font-weight-medium">Profile Status</div>
                    <v-icon class="ms-auto" size="small">mdi-account-check</v-icon>
                  </div>
                  <div class="text-h6 font-weight-bold text-success">Verified</div>
                  <div class="text-caption text-grey-darken-1">Last updated 2 days ago</div>
                </v-card>
              </v-col>
              <v-col cols="12" md="7">
                <v-card class="elevation-2" rounded>
                  <v-card-title class="text-h6 font-weight-bold py-3">
                    <v-icon start class="me-2">mdi-calendar-clock</v-icon>
                    Upcoming Bookings
                  </v-card-title>

                  <v-list lines="two">
                    <v-list-item>
                      <v-list-item-title class="font-weight-bold text-body-2"
                        >Spring Festival</v-list-item-title
                      >
                      <v-list-item-subtitle>
                        <div class="d-flex flex-column">
                          <span class="text-caption">May 15, 2025</span>
                        </div>
                        <v-chip size="x-small"> Booth #12 </v-chip>
                      </v-list-item-subtitle>
                      <template v-slot:append>
                        <v-chip color="success" size="small">Confirmed</v-chip>
                      </template>
                    </v-list-item>

                    <v-divider></v-divider>

                    <v-list-item>
                      <v-list-item-title class="font-weight-bold text-body-2"
                        >Tech Expo</v-list-item-title
                      >
                      <v-list-item-subtitle>
                        <div class="d-flex flex-column">
                          <span class="text-caption">June 10, 2025</span>
                        </div>
                        <v-chip size="x-small"> Booth #5 </v-chip>
                      </v-list-item-subtitle>
                      <template v-slot:append>
                        <v-chip color="warning" size="small">Pending Payment</v-chip>
                      </template>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-col>
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
            </v-row>
          </div>
          <div v-else-if="tab === 'two'" class="pa-4">
            <v-sheet :elevation="6" height="auto" width="auto" class="pb-10 px-2" rounded>
              <div class="px-5 mb-6">
                <h1 class="tight-heading pt-4">My Bookings</h1>
                <span class="text-caption text-grey-darken-1">Manage your event bookings</span>
              </div>
              <div>
                <v-row class="d-flex justify-center">
                  <v-col cols="12" md="12">
                    <v-card class="pa-4" elevation="2" rounded>
                      <!-- Title -->
                      <v-card-title class="text-h6 font-weight-bold">
                        <div class="d-flex align-center justify-space-between w-100">
                          <span>Spring Festival</span>
                          <v-chip color="green" text="black" variant="outlined" size="small"
                            >Confirmed</v-chip
                          >
                        </div>
                      </v-card-title>
                      <!-- Date and Booth -->
                      <v-card-subtitle class="text-caption mb-2">
                        <div class="d-flex align-center justify-space-between w-100">
                          <span> May 15, 2025 </span>
                          <span>Payment Complete</span>
                        </div>
                      </v-card-subtitle>
                      <!-- Booth Chip -->
                      <v-chip size="x-small" class="bg-grey-lighten-2 text-black mb-3 ml-2"
                        >Booth #12</v-chip
                      >
                      <!-- Action Buttons -->
                      <v-card-actions class="d-flex gap-2">
                        <v-btn size="small" variant="outlined" color="black">View Details</v-btn>
                        <v-btn size="small" variant="outlined" color="black"
                          >Download Receipt</v-btn
                        >
                        <v-btn size="small" variant="outlined" color="red">Cancel Booking</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-col>
                  <v-col cols="12" md="12"
                    ><v-card class="pa-4" elevation="2" rounded>
                      <!-- Title -->
                      <v-card-title class="text-h6 font-weight-bold">
                        <div class="d-flex align-center justify-space-between w-100">
                          <span>Tech Expo</span>
                          <v-chip color="black" size="small" variant="outlined"
                            >Pending Payment</v-chip
                          >
                        </div>
                      </v-card-title>
                      <!-- Date and Booth -->
                      <v-card-subtitle class="text-caption mb-2">
                        <div class="d-flex align-center justify-space-between w-100">
                          <span> May 15, 2025 </span>
                          <span>Due P100.00</span>
                        </div>
                      </v-card-subtitle>
                      <!-- Booth Chip -->
                      <v-chip size="x-small" class="bg-grey-lighten-2 text-black mb-3 ml-2"
                        >Booth #12</v-chip
                      >
                      <!-- Action Buttons -->
                      <v-card-actions class="d-flex gap-2">
                        <v-btn size="small" variant="elevated" color="black"
                          >Complete Payment</v-btn
                        >
                        <v-btn size="small" variant="outlined" color="black"
                          >Download Receipt</v-btn
                        >
                        <v-btn size="small" variant="outlined" color="red">Cancel Booking</v-btn>
                      </v-card-actions>
                    </v-card></v-col
                  >
                </v-row>
              </div>
            </v-sheet>
          </div>
          <div v-else-if="tab === 'three'" class="pa-4">
            <v-sheet :elevation="6" height="auto" width="auto" class="pb-10 px-2" rounded>
              <div class="px-5 mb-6">
                <h1 class="tight-heading pt-4">Available Events</h1>
                <span class="text-caption text-grey-darken-1"
                  >Browse and book upcoming campus events</span
                >
              </div>
              <div>
                <v-row class="d-flex justify-center">
                  <v-col cols="12" md="12">
                    <v-card class="pa-4" elevation="2" rounded>
                      <!-- Title -->
                      <v-card-title class="text-h6 font-weight-bold">
                        <div class="d-flex align-center justify-space-between w-100">
                          <span>Spring Festival</span>
                        </div>
                      </v-card-title>

                      <!-- Date and Booth Availability -->
                      <v-card-subtitle class="text-caption">
                        <p>May 15, 2025</p>
                        <p>12 booths available</p>
                      </v-card-subtitle>

                      <!-- Description -->
                      <v-card-text class="text-caption">
                        Annual spring celebration with music, food, and activities
                      </v-card-text>

                      <!-- Action Buttons -->
                      <v-card-actions class="d-flex gap-2">
                        <v-btn size="small" variant="elevated" color="black">Book Now</v-btn>
                        <v-btn size="small" variant="outlined" color="black">View Details</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-col>
                  <v-col cols="12" md="12"
                    ><v-card class="pa-4" elevation="2" rounded>
                      <!-- Title -->
                      <v-card-title class="text-h6 font-weight-bold">
                        <div class="d-flex align-center justify-space-between w-100">
                          <span>Tech Expo</span>
                        </div>
                      </v-card-title>

                      <!-- Date and Booth Availability -->
                      <v-card-subtitle class="text-caption">
                        <p>June 10, 2025</p>
                        <p>8 booths available</p>
                      </v-card-subtitle>

                      <!-- Description -->
                      <v-card-text class="text-caption">
                        Showcase of the latest technology innovations from students and local
                        businesses
                      </v-card-text>

                      <!-- Action Buttons -->
                      <v-card-actions class="d-flex gap-2">
                        <v-btn size="small" variant="elevated" color="black">Book Now</v-btn>
                        <v-btn size="small" variant="outlined" color="black">View Details</v-btn>
                      </v-card-actions>
                    </v-card></v-col
                  >
                </v-row>
              </div>
            </v-sheet>
          </div>
        </v-col>
      </v-row>
    </template>
  </AppLayout>
</template>

<style scoped>
.tight-heading {
  margin-bottom: -6px;
}
</style>
