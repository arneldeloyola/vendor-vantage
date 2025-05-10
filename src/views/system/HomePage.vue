<script setup>
import { ref } from 'vue'
import TopNavbar from '../../components/layout/TopNavbar.vue'
import RegisterForm from '../../components/auth/RegisterForm.vue'

const registerDialog = ref(false)
</script>

<template>
  <v-app>
    <TopNavbar />

    <v-main>
      <v-container fluid class="pa-0">
        <!-- Section 1 -->

        <v-sheet
          class="pa-6"
          width="100%"
          style="
            background-image: url('../public/images/v-background.jpg');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
          "
        >
          <v-card style="background-color: rgba(228, 224, 226, 0.8)">
            <v-row class="pt-16">
              <v-col cols="12" md="1"></v-col>
              <v-col cols="12" md="5" class="pl-16 pt-16"
                ><br />
                <h1>Register Your Vendor Booth on Campus</h1>
                <p class="grey--text text-subtitle-4">
                  Join campus events, showcase your business, and connect with students. Our
                  platform makes it easy to find and book available slots for upcoming events.
                </p>
                <v-btn
                  @click="registerDialog = true"
                  color="black"
                  elavation="16"
                  class="mt-4"
                  append-icon="mdi-arrow-right"
                >
                  Register Now
                </v-btn>
                <v-dialog v-model="registerDialog" width="800">
                  <v-card color="grey-lighten-5" flat>
                    <v-card-actions class="justify-end">
                      <v-btn icon @click="registerDialog = false">
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </v-card-actions>

                    <v-card-title class="text-h3 text-center text-green-darken-4 mt-n14">
                      Vendor Vantage
                    </v-card-title>

                    <v-card-text>
                      <p class="text-center text-grey mt-n10 mb-8">Create your account</p>
                      <RegisterForm />
                    </v-card-text>

                    <v-card-actions class="justify-center">
                      <p>
                        Already have an account?
                        <v-btn
                          variant="text"
                          color="green"
                          @click="
                            () => {
                              registerDialog = false
                              loginDialog = true
                            }
                          "
                        >
                          Sign in
                        </v-btn>
                      </p>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-btn @click="Events = true" color="white mx-4" elevation="16" class="mt-4">
                  Browse Event
                </v-btn>
              </v-col>

              <v-col cols="12" md="6" class="d-flex justify-center pr-16 mb-10">
                <img src="../public/images/EventPoster2.jpeg" alt="" height="400px" />
              </v-col>
              ><br /><br />
              ><br /><br /> </v-row
          ></v-card>
        </v-sheet>

        <!-- Divider -->
        <v-divider class="my-0" />

        <!-- Section 2 -->
        <v-sheet class="pa-6 pt-16" width="100%">
          <h1 class="d-flex justify-center">Upcoming Events</h1>
          <p class="d-flex justify-center text-grey-lighten-1 text-subtitle-1">
            Discover the latest campus events with available vendor slots
          </p>
          <v-row>
            <v-col cols="12" md="4"
              ><v-card class="mx-auto my-4" max-width="400" elevation="10">
                <v-img
                  class="align-end text-white"
                  height="200"
                  src="../public/images/UpcomingBackground.jpg"
                  cover
                ></v-img>
                <v-card-title class="text-h6 font-weight-bold">Kumbati 2024</v-card-title>

                <v-card-subtitle class="pb-0">
                  <v-icon class="mr-2">mdi-calendar</v-icon>May 15, 2025<br />
                  <v-icon class="mr-2">mdi-map-marker</v-icon> Csu Main Campus
                </v-card-subtitle>

                <v-card-text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam minus corporis
                  asperiores a quos omnis eum quae autem inventore eius officia quisquam, veritatis
                  sit molestiae facere illo perspiciatis, provident repudiandae.
                </v-card-text>

                <v-card-actions class="px-4">
                  <span class="font-weight-medium text-green-darken-2">
                    <v-icon class="mr-2">mdi-store</v-icon>12 booths available</span
                  >
                  <v-spacer></v-spacer>
                  <v-btn variant="outlined" color="black">View Details</v-btn>
                </v-card-actions>
              </v-card></v-col
            >
            <v-col cols="12" md="4"
              ><v-card class="mx-auto my-4" max-width="400" elevation="10">
                <v-img
                  class="align-end text-white"
                  height="200"
                  src="../public/images/dagyaw.jpg"
                  cover
                ></v-img>
                <v-card-title class="text-h6 font-weight-bold">Dagyaw 2025</v-card-title>

                <v-card-subtitle class="pb-0">
                  <v-icon class="mr-2">mdi-calendar</v-icon>March 31 - April 21, 2025<br />
                  <v-icon class="mr-2">mdi-map-marker</v-icon>Csu Main Campus
                </v-card-subtitle>

                <v-card-text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis suscipit incidunt
                  nobis sit voluptas iusto. Odio eveniet ratione commodi iste ex ab, optio amet sed
                  deleniti veritatis, laudantium nostrum harum?
                </v-card-text>

                <v-card-actions class="px-4">
                  <span class="font-weight-medium text-green-darken-2">
                    <v-icon class="mr-2">mdi-store</v-icon>8 booths available</span
                  >
                  <v-spacer></v-spacer>
                  <v-btn variant="outlined" color="black">View Details</v-btn>
                </v-card-actions>
              </v-card></v-col
            >
            <v-col cols="12" md="4"
              ><v-card class="mx-auto my-4" max-width="400" elevation="10">
                <v-img
                  class="align-end text-white"
                  height="200"
                  src="../public/images/entrada2024.jpg"
                  cover
                ></v-img>
                <v-card-title class="text-h6 font-weight-bold">Entrada 2024</v-card-title>

                <v-card-subtitle class="pb-0">
                  <v-icon class="mr-2">mdi-calendar</v-icon> August 12, 2024<br />
                  <v-icon class="mr-2">mdi-map-marker</v-icon>Csu Main Campus
                </v-card-subtitle>

                <v-card-text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed voluptate aliquam
                  eligendi quod cumque. Numquam deserunt repellat molestiae ipsum quia neque,
                  veritatis, aspernatur nostrum quos laboriosam, magni tempora
                </v-card-text>

                <v-card-actions class="px-4">
                  <span class="font-weight-medium text-green-darken-2">
                    <v-icon class="mr-2">mdi-store</v-icon>15 booths available</span
                  >
                  <v-spacer></v-spacer>
                  <v-btn variant="outlined" color="black">View Details</v-btn>
                </v-card-actions>
              </v-card></v-col
            >
          </v-row>
        </v-sheet>

        <!-- Divider -->
        <v-divider class="my-0" />

        <!-- Section 3 -->
        <v-sheet color="grey-lighten-4" class="pa-6" width="100%">
          <v-row>
            <v-col cols="12" md="7">
              <h1>How it Works</h1>
              <v-row justify="center" align="center" spacing="4">
                <!-- Step 1 -->

                <v-col cols="12" md="12" class="d-flex align-center">
                  <v-btn
                    class="d-flex align-center justify-center"
                    color="black"
                    fab
                    dark
                    tile
                    size="40"
                    :style="{ borderRadius: '50%' }"
                  >
                    <span class="headline">1</span>
                  </v-btn>
                  <div class="ml-4">
                    <p class="headline">Register as a Vendor</p>
                    <p>Create an account with your business details and contact information</p>
                  </div>
                </v-col>

                <!-- Step 2 -->
                <v-col cols="12" md="12" class="d-flex align-center">
                  <v-btn
                    class="d-flex align-center justify-center"
                    color="black"
                    fab
                    dark
                    tile
                    size="40"
                    :style="{ borderRadius: '50%' }"
                  >
                    <span class="headline">2</span>
                  </v-btn>
                  <div class="ml-4">
                    <p class="headline">Browse Available Events</p>
                    <p>Explore upcoming campus events with available vendor slots</p>
                  </div>
                </v-col>

                <!-- Step 3 -->
                <v-col cols="12" md="12" class="d-flex align-center">
                  <v-btn
                    class="d-flex align-center justify-center"
                    color="black"
                    fab
                    dark
                    tile
                    size="40"
                    :style="{ borderRadius: '50%' }"
                  >
                    <span class="headline">3</span>
                  </v-btn>
                  <div class="ml-4">
                    <p class="headline">Book Your Booth</p>
                    <p>Select an available booth and submit your booking request</p>
                  </div>
                </v-col>

                <!-- Step 4 -->
                <v-col cols="12" md="12" class="d-flex align-center">
                  <v-btn
                    class="d-flex align-center justify-center"
                    color="black"
                    fab
                    dark
                    tile
                    size="40"
                    :style="{ borderRadius: '50%' }"
                  >
                    <span class="headline">4</span>
                  </v-btn>
                  <div class="ml-4">
                    <p class="headline">Confirm and Pay</p>
                    <p>Once approved, complete your payment to secure your spot</p>
                  </div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-sheet>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.headline {
  font-size: 18px;
  font-weight: bold;
}
p {
  font-size: 14px;
}
.v-btn {
  transition: background-color 0.3s ease;
}
.v-btn:hover {
  background-color: rgba(0, 0, 0, 0.12);
}
.background-section {
  background-image: url('../public/images/v-background.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
