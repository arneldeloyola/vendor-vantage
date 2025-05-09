<script setup>
import { ref } from 'vue'

// Form validation state
const valid = ref(true)
const form = ref(null)

// Form data
const email = ref('vendor@example.com')
const shopName = ref('')
const contactNumber = ref('')
const lineOfBusiness = ref('')

// Options for dropdown
const businessTypes = ['Food & Beverages', 'Retail', 'Arts & Crafts', 'Services', 'Other']

// Validation rules
const requiredRules = [(v) => !!v || 'This field is required']
const phoneRules = [
  (v) => !!v || 'Contact number is required',
  (v) => /^\+?[0-9\s-]{7,}$/.test(v) || 'Please enter a valid contact number',
]

// Form methods
const saveChanges = () => {
  if (!form.value) return

  const isValid = form.value.validate()
  if (isValid) {
    // Here you would typically send the data to your API
    alert('Profile updated successfully!')

    // For demo purposes, log the data
    console.log({
      email: email.value,
      shopName: shopName.value,
      contactNumber: contactNumber.value,
      lineOfBusiness: lineOfBusiness.value,
    })
  }
}
</script>

<template>
  <v-container fluid class="py-8 px-4 px-md-16">
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card elevation="2" class="rounded-lg">
          <v-card-title class="text-h5 font-weight-bold"> Profile Information </v-card-title>
          <v-card-subtitle> Update your vendor profile information </v-card-subtitle>

          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="email"
                label="Email"
                readonly
                disabled
                hint="Your email cannot be changed"
                persistent-hint
                variant="outlined"
                density="comfortable"
                class="mb-4"
              ></v-text-field>

              <v-text-field
                v-model="shopName"
                label="Shop Name"
                :rules="requiredRules"
                required
                variant="outlined"
                density="comfortable"
                class="mb-4"
              ></v-text-field>

              <v-text-field
                v-model="contactNumber"
                label="Contact Number"
                :rules="phoneRules"
                required
                variant="outlined"
                density="comfortable"
                class="mb-4"
              ></v-text-field>

              <v-select
                v-model="lineOfBusiness"
                :items="businessTypes"
                label="Line of Business"
                :rules="requiredRules"
                required
                variant="outlined"
                density="comfortable"
                class="mb-4"
              ></v-select>
            </v-form>
          </v-card-text>

          <v-card-actions class="pb-6 px-6">
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              :disabled="!valid"
              @click="saveChanges"
              variant="elevated"
              size="large"
            >
              Save Changes
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-card {
  border-radius: 8px;
}
</style>
