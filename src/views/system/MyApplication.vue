<script setup>
import { ref } from 'vue'

const showStatusDialog = ref(false) // Controls the visibility of the status dialog
const applicationDetails = ref({
  name: 'John Doe',
  lineOfBusiness: 'Food & Beverage',
  email: 'johndoe@example.com',
  boothNumber: '421',
  status: 'Approved',
})

function checkStatus() {
  showStatusDialog.value = true // Show the status dialog when the button is clicked
}

function cancelApplication() {
  alert('Application has been canceled.') // Replace with actual logic
}

function acceptSlot() {
  alert('Slot has been accepted.') // Replace with actual logic
}
</script>

<template>
  <v-container fluid>
    <br /><br />
    <br /><br />

    <v-container class="pa-8">
      <v-row>
        <v-col cols="3"></v-col>

        <v-col cols="7" class="text-h4 font-weight-bold mb-8"> <h1>My Application</h1></v-col>
        <v-col cols="2"></v-col>
      </v-row>

      <v-card class="mx-auto mb-6" max-width="600px" rounded="lg" elevation="3">
        <v-img src="/public/images/UpcomingBackground.jpg" height="150" cover class="rounded-t-lg">
          <div class="text-overlay pa-3">
            <span class="text-h5 font-weight-bold text-white"></span>
          </div>
        </v-img>

        <v-card-text class="py-3">
          <div class="d-flex align-center">
            <v-icon icon="mdi-calendar" size="small" class="me-2" label="Date input"></v-icon>
            <span class="text-body-2">May 11, 2023 - June 15, 2024</span>
          </div>
        </v-card-text>

        <v-date-input label="Date input"></v-date-input>
        <v-card-actions class="justify-center pa-4">
          <v-btn
            color="green-darken-4"
            variant="elevated"
            rounded="pill"
            class="px-6 text-white"
            width="180"
            @click="checkStatus"
          >
            CHECK STATUS
          </v-btn>
        </v-card-actions>
      </v-card>

      <div class="d-flex justify-center">
        <v-date-input
          v-model="model"
          :display-format="format"
          max-width="368"
          prefix="ISO Date:"
        ></v-date-input>
      </div>

      <!-- Status Dialog -->
      <v-dialog v-model="showStatusDialog" max-width="500">
        <v-card>
          <v-card-title class="text-h5 font-weight-bold">Application Status</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                variant="outlined"
                v-model="applicationDetails.name"
                label="Name"
                outlined
                class="mb-3"
              ></v-text-field>
              <v-text-field
                variant="outlined"
                v-model="applicationDetails.lineOfBusiness"
                label="Line of Business"
                outlined
                class="mb-3"
              ></v-text-field>
              <v-text-field
                variant="outlined"
                v-model="applicationDetails.email"
                label="Email"
                outlined
                class="mb-3"
              ></v-text-field>
              <v-text-field
                variant="outlined"
                v-model="applicationDetails.boothNumber"
                label="Booth #"
                outlined
                class="mb-3"
              ></v-text-field>

              <v-text-field
                variant="outlined"
                v-model="applicationDetails.status"
                label="Status"
                outlined
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions class="d-flex justify-between mb-5">
            <v-btn
              color="red-darken-4"
              variant="elevated"
              rounded="pill"
              class="px-6 text-white mx-2"
              width="180"
              @click="cancelApplication"
            >
              CANCEL APPLICATION
            </v-btn>
            <v-btn
              color="blue-darken-4"
              variant="elevated"
              rounded="pill"
              class="px-6 text-white mx-2"
              width="180"
              @click="acceptSlot"
            >
              ACCEPT SLOT
            </v-btn>
            <v-btn color="primary" text @click="showStatusDialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-container>
</template>

<style scoped></style>
