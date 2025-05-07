<script setup>
import { ref } from 'vue'
import LoginForm from '../auth/LoginForm.vue'
import RegisterForm from '../auth/RegisterForm.vue'

const loginDialog = ref(false)
const registerDialog = ref(false)
</script>

<template>
  <v-app-bar :elevation="2" class="pr-10 mb-16 pl-8">
    <router-link to="/">
      <img src="../../../public/images/VendorVantage.png" alt="Vendor Vantage Logo" height="70" />
    </router-link>

    <v-spacer></v-spacer>

    <router-link class="mx-2 text-decoration-none text-black" to="/event">Events</router-link>
    <router-link class="mx-2 text-decoration-none text-black" to="/about">About</router-link>
    <router-link class="mx-2 text-decoration-none text-black" to="/contact">Contact</router-link>

    <v-btn @click="loginDialog = true" color="green-lighten-1" class="ml-2 mr-3" variant="outlined">
      Log In
    </v-btn>
    <v-btn @click="registerDialog = true" color="green-darken-3" variant="outlined">
      Register
    </v-btn>

    <!-- Log In Dialog -->
    <v-dialog v-model="loginDialog" width="800">
      <v-card color="grey-lighten-5" flat>
        <v-card-actions class="justify-end">
          <v-btn icon @click="loginDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-actions>

        <v-card-title class="text-h3 text-center text-green-darken-4 mt-n14">
          Vendor Vantage
        </v-card-title>

        <v-card-text>
          <p class="text-center text-grey mt-n10 mb-8">Sign in to your account</p>
          <LoginForm />
        </v-card-text>

        <v-card-actions class="justify-center">
          <p>
            Don't have an account?
            <v-btn
              variant="text"
              color="green"
              @click="
                () => {
                  loginDialog = false
                  registerDialog = true
                }
              "
            >
              Sign up
            </v-btn>
          </p>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Register Dialog -->
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
  </v-app-bar>
</template>
