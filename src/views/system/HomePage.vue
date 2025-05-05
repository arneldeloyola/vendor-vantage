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
        <v-sheet color="grey-lighten-4" class="pa-6" width="100%">
          <v-row class="pt-16">
            <v-col cols="12" md="6" class="pl-10 pt-16">
              <h1>Register Your Vendor Booth on Campus</h1>
              <p class="text-grey-darken-1">
                Join campus events, showcase your business, and connect with students. Our platform
                makes it easy to find and book available slots for upcoming events.
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
              <v-dialog v-model="registerDialog" width="800px">
                <v-card color="grey-lighten-1" flat>
                  <v-card-title class="text-h6">Register</v-card-title>
                  <v-card-text>
                    <RegisterForm />
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="registerDialog = false">Close</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-btn @click="Events = true" color="white mx-4" elavation="16" class="mt-4">
                Browse Event
              </v-btn>
            </v-col>

            <v-col cols="12" md="6" class="d-flex justify-center pr-16 mb-10"
              ><img src="../../../public/images/EventPoster2.jpeg" alt="" height="400px"
            /></v-col>
          </v-row>
        </v-sheet>

        <!-- Divider -->
        <v-divider class="my-0" />

        <!-- Section 2 -->
        <v-sheet class="pa-6 pt-16" width="100%"> </v-sheet>

        <!-- Divider -->
        <v-divider class="my-0" />

        <!-- Section 3 -->
        <v-sheet color="grey-lighten-4" class="pa-6" width="100%"> </v-sheet>
      </v-container>
    </v-main>
  </v-app>
</template>
