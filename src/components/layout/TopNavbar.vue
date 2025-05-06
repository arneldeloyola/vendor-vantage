<script setup>
import { ref } from 'vue'
import LoginForm from '../auth/LoginForm.vue'
import RegisterForm from '../auth/RegisterForm.vue'

const loginDialog = ref(false)
const registerDialog = ref(false)
</script>

<template>
  <v-app-bar :elevation="2" class="pr-10 mb-16 pl-8">
    <router-link to="/"
      ><img src="../../../public/images/VendorVantage.png" alt="" height="70px"
    /></router-link>
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
    <v-dialog v-model="loginDialog" width="800px">
      <v-card color="grey-lighten-1" flat>
        <v-card-title class="text-h6">Log In</v-card-title>
        <v-card-text>
          <LoginForm />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="loginDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Register Dialog -->
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
  </v-app-bar>
</template>
