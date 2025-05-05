<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const formData = ref({
  applicantName: '',
  status: '',
  storeName: '',
  category: 'food',
})

const showEventDialog = ref(false) // Controls the visibility of the event dialog
const showSuccessDialog = ref(false) // Controls the visibility of the success dialog

const events = ref([
  {
    id: 1,
    name: 'LSG days 2025',
    date: 'March 15, 2025',
    image: '/public/images/vendo1.jpg',
    available: true,
  },
  {
    id: 2,
    name: 'Hugyaw Fair 2025',
    date: 'April 10, 2025',
    image: '/public/images/vendo2.jpg',
    available: false,
  },
  {
    id: 3,
    name: 'Sangka 2025',
    date: 'May 5, 2025',
    image: '/public/images/vendo3.jpg',
    available: true,
  },
  {
    id: 4,
    name: 'Hinang Days 2024',
    date: 'May 5, 2024',
    image: '/public/images/vendo4.jpg',
    available: true,
  },
])

const openEventDialog = () => {
  showEventDialog.value = true
}

const selectEvent = (event) => {
  alert(`You selected: ${event.name}`)
  showEventDialog.value = false
  showSuccessDialog.value = true
}

const goToMyApplication = () => {
  router.push({ name: 'MyApplication' }) // Navigates to MyApplication.vue
}

const submitForm = () => {
  console.log('Form submitted:', formData.value)
}
</script>

<template>
  <br /><br />
  <br /><br />
  <v-container class="application-form">
    <v-row>
      <v-col cols="12" class="py-5">
        <h1 class="text-h4 font-weight-bold">APPLICATION FORM</h1>
      </v-col>
    </v-row>

    <v-form @submit.prevent="submitForm">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="formData.applicantName"
            prepend-inner-icon="mdi-account"
            label="Name of Applicant"
            variant="outlined"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="formData.status"
            prepend-inner-icon="mdi-account-check"
            label="Status(owner/employee, etc.)"
            variant="outlined"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="formData.storeName"
            prepend-inner-icon="mdi-store"
            label="Name of Store"
            variant="outlined"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-radio-group v-model="formData.category">
            <div class="text-subtitle-1 mb-2"><b>Line of Business</b></div>
            <v-radio label="Food with Drinks" value="food"></v-radio>
            <v-radio label="Coffee and Beverages" value="coffee"></v-radio>
            <v-radio label="Handcrafts" value="handcrafts"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" class="text-end">
          <v-btn color="success" size="large" class="mt-4" @click="openEventDialog">
            Choose Event
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>

  <!-- Event Dialog -->
  <v-dialog v-model="showEventDialog" max-width="800">
    <v-card>
      <v-card-title class="text-h5 font-weight-bold pt-5"><h2>Available Events</h2></v-card-title>
      <v-card-text>
        <v-row>
          <v-col v-for="event in events" :key="event.id" cols="12" md="6">
            <v-card class="m-4">
              <v-img
                :src="event.image"
                height="300px"
                width="500px"
                contain
                class="mt-3 mx-2"
              ></v-img>
              <v-card-text>
                <div class="text-h6 font-weight-bold">{{ event.name }}</div>
                <div class="text-body-2">Date: {{ event.date }}</div>
                <div class="text-body-2">
                  Slot:
                  <span :class="event.available ? 'text-success' : 'text-error'">
                    {{ event.available ? 'Available' : 'Not Available' }}
                  </span>
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn :disabled="!event.available" color="primary" @click="selectEvent(event)">
                  <b> Select</b>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary mb-5" text @click="showEventDialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Success Dialog -->
  <v-dialog v-model="showSuccessDialog" max-width="500">
    <v-card>
      <v-card-title class="text-h5 font-weight-bold">Application Submitted</v-card-title>
      <v-card-text>
        Your application has been successfully submitted! Please check
        <v-btn text color="primary" @click="goToMyApplication">My Application</v-btn>
        for updates.
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary " text @click="showSuccessDialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.application-form {
  background-color: #f4f4f2;
  padding: 2rem;
  border-radius: 8px;
  max-width: 1000px;
  margin: 0 auto;
  box-shadow: 0 25px 33px rgba(0, 0, 0, 0.2);
}
.text-success {
  color: green;
}
.text-error {
  color: red;
}
</style>
