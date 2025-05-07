<script setup></script>

<template>
  <div class="mx-4">
    <v-sheet :elevation="6" height="auto" width="auto" class="pb-10 px-2" rounded>
      <div class="px-5 mb-6">
        <h1 class="tight-heading pt-4">Available Events</h1>
        <span class="text-caption text-grey-darken-1">Browse and book upcoming campus events</span>
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
          <v-col cols="12" md="12">
            <v-card class="pa-4" elevation="2" rounded>
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
                Showcase of the latest technology innovations from students and local businesses
              </v-card-text>
              <!-- Action Buttons -->
              <v-card-actions class="d-flex gap-2">
                <v-btn size="small" variant="elevated" color="black">Book Now</v-btn>
                <v-btn size="small" variant="outlined" color="black">View Details</v-btn>
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
