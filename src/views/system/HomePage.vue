<script setup>
import { ref } from 'vue'
import TopNavbar from '../../components/layout/TopNavbar.vue'
</script>

<template>
  <v-app>
    <TopNavbar />

    <v-main>
      <v-container fluid class="pa-0">
        <!-- Section 1 -->
        <v-sheet color="grey-lighten-4" class="pa-6" width="100%"> </v-sheet>

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
