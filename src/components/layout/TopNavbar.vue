<script setup></script>

<template>
  <v-app-bar :elevation="2" class="pr-10 mb-16 pl-8">
    <img src="../../../public/images/VendorVantage.png" alt="" height="70px" />
    <v-spacer></v-spacer>
    <router-link class="mx-2 text-decoration-none text-black" to="/Event">Events</router-link>
    <router-link class="mx-2 text-decoration-none text-black" to="/about">About</router-link>
    <router-link class="mx-2 text-decoration-none text-black" to="/about">Contact</router-link>
    <v-btn color="green-lighten-1" class="ml-2 mr-3" variant="outlined"> Log In </v-btn>
    <v-btn color="green-darken-3" variant="outlined"> Register </v-btn>
  </v-app-bar>
</template>
