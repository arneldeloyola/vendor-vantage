<script setup></script>

<template>
  <div class="mx-2">
    <v-sheet :elevation="6" height="auto" width="auto" class="pb-10 px-2" rounded>
      <div class="px-5 mb-6">
        <h1 class="tight-heading pt-4 mt-n12">My Bookings</h1>
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
                  <v-chip color="green" text-color="black" variant="outlined" size="small"
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
                <v-btn size="small" variant="outlined" color="black">Download Receipt</v-btn>
                <v-btn size="small" variant="outlined" color="red">Cancel Booking</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="12" md="12">
            <v-card class="pa-4" elevation="2" rounded>
              <!-- Title -->
              <v-card-title class="text-h6 font-weight-bold">
                <div class="d-flex align-center justify-space-between w-100">
                  <span>Tech Expo</span>
                  <v-chip color="black" size="small" variant="outlined">Pending Payment</v-chip>
                </div>
              </v-card-title>
              <!-- Date and Booth -->
              <v-card-subtitle class="text-caption mb-2">
                <div class="d-flex align-center justify-space-between w-100">
                  <span> June 10, 2025 </span>
                  <span>Due P100.00</span>
                </div>
              </v-card-subtitle>
              <!-- Booth Chip -->
              <v-chip size="x-small" class="bg-grey-lighten-2 text-black mb-3 ml-2"
                >Booth #5</v-chip
              >
              <!-- Action Buttons -->
              <v-card-actions class="d-flex gap-2">
                <v-btn size="small" variant="elevated" color="black">Complete Payment</v-btn>
                <v-btn size="small" variant="outlined" color="black">View Details</v-btn>
                <v-btn size="small" variant="outlined" color="red">Cancel Booking</v-btn>
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
